import React, { Component } from 'react'
import MyRadial from './RadialChart'
import ItalyMap from './ItalyMap'
import PropertyChooser from './PropertyChooser'
import SimplePlot from './SimplePlot'

import axios from 'axios'

import { MyMapComponent } from './TestMap'

import Footer from './Footer'
import SelectProperty from './SelectProperty'
import RegionInfo from './RegionInfo'


export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            region: '',
            selectedProperty: 'deceduti',
            geojson: null
        }

        this.setSelectedProperty = this.setSelectedProperty.bind(this)
        this.setRegion = this.setRegion.bind(this)
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


    render() {
        return (
            <div className="md:container md:mx-auto">
                <div className="flex justify-center m-8">
                    <img style={{ height: "100px" }} src="./logo.png" />
                </div>

                <div className="flex flex-wrap flex-col" >


                    <SelectProperty setSelectedProperty={this.setSelectedProperty} />

                    <div className="flex flex-wrap flex-row">
{/* 
                        <ItalyMap selectedProperty={this.state.selectedProperty} setRegion={this.setRegion} />
                         */}
                        <MyMapComponent geojson={this.state.geojson} selectedProperty={this.state.selectedProperty} setRegion={this.setRegion} />

                        <RegionInfo region={this.state.region} />
                    </div>


                    <Footer />

                </div>

            </div>
        )
    }
}
