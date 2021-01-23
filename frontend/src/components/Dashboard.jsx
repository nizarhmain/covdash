import React, { Component } from 'react'
import axios from 'axios'

import { Italy } from './Map/LeafletMap'

import Footer from './Footer'
import PropertyChooser from './PropertyChooser'
import RegionInfo from './RegionInfo'
import RegionChooser from './RegionChooser'

import { MyResponsiveBar } from './Bar'

import { positiveOrNegative, findExtremes } from './Map/Geojson'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            region: null,
            selectedProperty: 'deceduti',
            geojson: null
        }

        this.setSelectedProperty = this.setSelectedProperty.bind(this)
        this.setRegion = this.setRegion.bind(this)
        this.setRegionFromAlias = this.setRegionFromAlias.bind(this)
        this.prepareDateForNivoBar = this.prepareDateForNivoBar.bind(this)
    }

    componentDidMount() {
        this.getRegions()
    }

    async getRegions() {
        // Make a request for a user with a given ID
        axios.get("http://localhost:5000/latest")
            .then((response) => {
                // console.log(response.data);
                // could simplify the code but leaving it like this for clarity
                this.setState({ geojson: response.data })
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


    setRegion(region) {
        this.setState({ region })
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

        if(type === 'green') {
            green_or_red = '114'
        } else {
            green_or_red = '0'
        }

        return `hsl(${green_or_red}, 50%, ${inverted}%)`
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

                <div className="flex flex-wrap flex-col" >

                    <div className="flex flex-wrap justify-evenly flex-row ">

                        <div className="flex-1 flex-col ">
                            <PropertyChooser setSelectedProperty={this.setSelectedProperty} />
                            <Italy geojson={this.state.geojson} selectedProperty={this.state.selectedProperty} setRegion={this.setRegion} />
                        </div>

                        <div className="flex-2 flex-col">
                            <RegionChooser region={this.state.region} setRegionFromAlias={this.setRegionFromAlias} />
                            <RegionInfo region={this.state.region} />

                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center flex-row graph_container">
                    <PropertyChooser setSelectedProperty={this.setSelectedProperty} />
                    {this.prepareDateForNivoBar()}
                    <Footer />
                </div>
            </div>
        )
    }
}
