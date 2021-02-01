import React, { Component } from 'react'
import axios from 'axios'

import { Italy } from './Map/LeafletMap'

import Footer from './Footer'
import PropertyChooser from './PropertyChooser'
import RegionInfo from './RegionInfo'
import RegionChooser from './RegionChooser'

import { MyResponsiveBar } from './Graphs/Bar'
import { MyResponsivePie } from './Graphs/Pie'
import { NationalGraph } from './Graphs/NationalGraph'
import { MyResponsiveCalendar } from './Graphs/Calendar'

import { positiveOrNegative, findExtremes } from './Map/Geojson'

import { DatePicker } from 'antd';

import moment from 'moment'
import findTheme from '../findTheme'
import 'moment/locale/it';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            region: null,
            selectedProperty: 'nuovi_positivi',
            geojson: null,
            lastUpdate: '',
            national: []
        }

        this.setSelectedProperty = this.setSelectedProperty.bind(this)
        this.setRegionFromAlias = this.setRegionFromAlias.bind(this)
        this.prepareDateForNivoBar = this.prepareDateForNivoBar.bind(this)
        this.onChange = this.onChange.bind(this)
        this.disabledDate = this.disabledDate.bind(this)
    }

    componentDidMount() {
        this.getRegions(`${process.env.REACT_APP_SERVER_URL}/latest`)
        this.getNationalData(`${process.env.REACT_APP_SERVER_URL}/nazionale`)
    }

    async getRegions(url) {
        // Make a request for a user with a given ID
        return axios.get(url)
            .then((response) => {
                // console.log(response)
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

                console.log(response.data.features[0])

                this.setState({ geojson: response.data, lastUpdate: response.data.features[0].properties.data })
                // handle success
            })
            .catch((error) => {
                // handle error
                // console.log(error);
            })
            .then(() => {
                // always executed
            });
    }

    async getNationalData(url) {
        // Make a request for a user with a given ID
        return axios.get(url)
            .then((response) => {


                this.setState({ national: response.data })
                // handle success
            })
            .catch((error) => {
                // handle error
                // console.log(error);
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
        const url = `${process.env.REACT_APP_SERVER_URL}/geojson?date=${new_date}`
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

    renderNationalGraph() {

        if (this.state.selectedProperty === "color") {
            return <div> Selezionare un altra proprieta' per visualizzare i grafici </div>
        }

        // let array = this.state.national.slice(Math.max(this.state.national.length - 60, 1))
        let array = this.state.national

        let data_for_line = array.map(day => {
            return {
                "x": day.data,
                "y": day[this.state.selectedProperty]
            }
        })
        let data_for_line_array = [{
            "id": "italy",
            "data": data_for_line,
            "color": "red"
        }]

        // this part gets the data ready for the calendar 
        let calendarData = array.map(day => {
            return {
                "day": moment(day.data).format("YYYY-MM-DD"),
                "value": day[this.state.selectedProperty]
            }
        })

        return (
            <div className="graph_national_container">
                <NationalGraph data={data_for_line_array} />
                <MyResponsiveCalendar data={calendarData} />
            </div>
        )
    }


    prepareDateForNivoBar() {

        if (this.state.selectedProperty === "color") {
            return <div> Selezionare un altra proprieta' per visualizzare i grafici </div>
        }

        if (this.state.geojson) {
            const extremes = findExtremes(this.state.geojson.features, this.state.selectedProperty)

            let data_for_graph = this.state.geojson.features.map(region => {

                return {
                    "id": region.properties.alias,
                    "alias": region.properties.alias,
                    "label": region.properties.alias,
                    "value": region.properties[this.state.selectedProperty],
                    // looks pretty complicated but its just to calculate the intensity
                    "color": this.adjustColorIntensity(positiveOrNegative(this.state.selectedProperty), region.properties[this.state.selectedProperty], extremes.max)
                }
            });

            return (
                <div className="graph_container">
                    <MyResponsivePie data={data_for_graph} />
                    <MyResponsiveBar data={data_for_graph} />
                </div>
            )
        }
    }




    render() {

        let logo_style = { height: "100px" }
        let img_src = 'half-moon.svg'

        if (findTheme() === 'dark') {
            img_src = 'sunny.svg'
            // logo_style = { height: "100px", filter: "invert(1)" }
        }

        return (
            <div className="md:container md:mx-auto">

                <div className="flex justify-end m-8">
                    <button className="shadow-2xl rounded-lg" onClick={() => {
                        if (localStorage.getItem('theme') === 'dark') {
                            localStorage.setItem('theme', 'light')
                            window.document.documentElement.classList.remove('dark')
                            this.setState({ theme: 'dark' })
                        } else {
                            localStorage.setItem('theme', 'dark')
                            window.document.documentElement.classList.add('dark')
                            this.setState({ theme: 'light' })
                        }
                        // window.location.reload()
                    }} >

                        <img alt="darkmode" className="svg" src={img_src} />

                    </button>
                </div>


                <div className="flex justify-center m-8">
                    <img alt="logo" style={logo_style} src="./logo.png" />
                </div>

                <div className="flex flex-col items-center mx-auto m-8">
                    <p className="dark:text-white"> Ultimo aggiornamento : {new Date(this.state.lastUpdate).toLocaleString('it-IT')} </p>
                    <div>
                        <DatePicker inputReadOnly={false} disabledDate={this.disabledDate}
                            onChange={this.onChange} defaultValue={moment()} />

                    </div>
                    <a className="text-blue-400 underline" href={`${process.env.REACT_APP_SERVER_URL}/latest_file`}>Scarica il csv</a>
                </div>

                <div className="flex flex-col" >

                    <div className="flex flex-wrap justify-center">
                        <p className="text-2xl font-mono bold dark:text-white"> Informazioni regionali</p>
                    </div>

                    <div className="flex flex-wrap md:flex-no-wrap">

                        <div className="flex-1 flex-col ">
                            <PropertyChooser setSelectedProperty={this.setSelectedProperty} />
                            <Italy geojson={this.state.geojson} selectedProperty={this.state.selectedProperty} setRegionFromAlias={this.setRegionFromAlias} />
                        </div>

                        <div className="flex-1 flex-col">
                            <RegionChooser region={this.state.region} setRegionFromAlias={this.setRegionFromAlias} />
                            <RegionInfo region={this.state.region} lastUpdate={this.state.lastUpdate} />
                        </div>

                        <div className="hidden lg:flex flex-row w-full justify-center">
                            {this.prepareDateForNivoBar()}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-wrap flex-col items-center justify-center">
                            <p className="text-2xl bold font-mono dark:text-white"> Informazioni nazionali</p>
                            <a className="text-blue-400 underline" href={`${process.env.REACT_APP_SERVER_URL}/latest_file`}>Scarica il csv</a>
                        </div>
                        <div className="flex flex-row">

                            <div className="flex justify-center lg:flex flex-1">


                                {this.state.national && <RegionInfo region={this.state.national[this.state.national.length - 1]} />}

                            </div>


                            <div className="hidden lg:flex flex-1 flex-col w-full">
                                {this.renderNationalGraph()}
                            </div>



                        </div>

                        <Footer />

                    </div>
                </div>
            </div>
        )
    }
}
