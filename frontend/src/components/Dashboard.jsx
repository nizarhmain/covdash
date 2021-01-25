import React, { Component } from 'react'
import axios from 'axios'

import { Italy } from './Map/LeafletMap'

import Footer from './Footer'
import PropertyChooser from './PropertyChooser'
import RegionInfo from './RegionInfo'
import RegionChooser from './RegionChooser'

import { MyResponsiveBar } from './Graphs/Bar'

import { positiveOrNegative, findExtremes } from './Map/Geojson'

import { DatePicker } from 'antd';

import moment from 'moment'



export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            region: null,
            selectedProperty: 'deceduti',
            geojson: null,
            lastUpdate: ''
        }

        this.setSelectedProperty = this.setSelectedProperty.bind(this)
        this.setRegionFromAlias = this.setRegionFromAlias.bind(this)
        this.prepareDateForNivoBar = this.prepareDateForNivoBar.bind(this)
        this.onChange = this.onChange.bind(this)
        this.disabledDate = this.disabledDate.bind(this)
    }

    componentDidMount() {
        this.getRegions("http://localhost:5000/latest")
        // this.getRegions("http://localhost:5000/geojson?date=20200316")
    }

    async getRegions(url) {
        // Make a request for a user with a given ID
        // const url = "http://localhost:5000/latest"
        return axios.get(url)
            .then((response) => {
                console.log(response)
                // console.log(response.data);
                // could simplify the code but leaving it like this for clarity
                // set the lastUpdate date 
                //select a random region every time

                // first load
                if (!this.state.region) {
                    // create a random index
                    const random_region_index = Math.floor(Math.random() * response.data.features.length);
                    // select a random region
                    const random_region = response.data.features[random_region_index].properties
                    this.setState({ region: random_region })
                }

                this.setState({ geojson: response.data, lastUpdate: response.data.features[0].properties.data })
                // handle success
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    }


    setSelectedProperty(selectedProperty) {
        this.setState({ selectedProperty })
    }


    setRegionFromAlias(alias) {
        this.state.geojson.features.forEach(region => {
            if (region.properties.alias === alias) {
                this.setState({ region: region.properties })
            }
        });
    }

    adjustColorIntensity(type, value, max) {

        // max = 100%
        let computed = value * 60 / max
        // invert it, so use abs value here
        let inverted = 100 - Math.abs(computed.toFixed(0))

        let green_or_red = ''

        if (type === 'green') {
            green_or_red = '114'
        } else {
            green_or_red = '0'
        }

        return `hsl(${green_or_red}, 50%, ${inverted}%)`
    }

    onChange(date, dateString) {
        // this only happens if this.state.region is not empty

        // setRegoinFromAlias is triggered from LeafletMap -> GeoJson triggers it
        // we then remember the name of the region that was selected
        // then we reset it from when it was set

        // forcing the rerender of the region information
        const new_date = dateString.replace(/-/g, '')
        const url = `http://localhost:5000/geojson?date=${new_date}`
        this.getRegions(url).then(() => {
            console.log(this.state.region.alias)
            console.log(this.state.region.nuovi_positivi)
            const current_alias = this.state.region.alias
            console.log(current_alias)
            this.setRegionFromAlias(current_alias)
        })

    }

    disabledDate(current) {
        // Can not select days before today and today
        // return current && current < moment().endOf('day');
        return current < moment("20200301", "YYYYMMDD") || current > moment().endOf('day');
    }


    prepareDateForNivoBar() {


        if (this.state.geojson) {
            const extremes = findExtremes(this.state.geojson.features, this.state.selectedProperty)

            let data_for_graph = this.state.geojson.features.map(region => {

                return {
                    "alias": region.properties.alias,
                    "value": region.properties[this.state.selectedProperty],
                    // looks pretty complicated but its just to calculate the intensity
                    "color": this.adjustColorIntensity(positiveOrNegative(this.state.selectedProperty), region.properties[this.state.selectedProperty], extremes.max)
                }
            });
            return <MyResponsiveBar data={data_for_graph} />
        }

    }


    render() {

        return (
            <div className="md:container md:mx-auto">

                <div className="flex justify-center m-8">
                    <img alt="logo" style={{ height: "100px" }} src="./logo.png" />

                </div>



                <div className="flex flex-col items-center mx-auto m-8">
                    <p> Ultimo aggiornamento il {new Date(this.state.lastUpdate).toLocaleString('it-IT')} </p>
                    <div>
                        <DatePicker disabledDate={this.disabledDate}
                            onChange={this.onChange} defaultValue={moment()} />
                    </div>
                </div>

                <div className="flex flex-wrap flex-col" >

                    <div className="flex flex-wrap justify-evenly flex-row ">

                        <div className="flex-1 flex-col ">
                            <PropertyChooser setSelectedProperty={this.setSelectedProperty} />
                            <Italy geojson={this.state.geojson} selectedProperty={this.state.selectedProperty} setRegionFromAlias={this.setRegionFromAlias} />
                        </div>

                        <div className="flex-2 flex-col">
                            <RegionChooser region={this.state.region} setRegionFromAlias={this.setRegionFromAlias} />
                            <RegionInfo region={this.state.region} lastUpdate={this.state.lastUpdate} />

                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center flex-row graph_container mx-auto">
                    {this.prepareDateForNivoBar()}
                    <Footer />
                </div>
            </div>
        )
    }
}
