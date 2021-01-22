import React, { Component } from 'react'
import axios from 'axios'

import { Italy } from './LeafletMap'

import Footer from './Footer'
import PropertyChooser from './PropertyChooser'
import RegionInfo from './RegionInfo'
import RegionChooser from './RegionChooser'


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


    render() {
        return (
            <div className="md:container md:mx-auto">
                <div className="flex justify-center m-8">
                    <img style={{ height: "100px" }} src="./logo.png" />
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


                    <Footer />

                </div>

            </div>
        )
    }
}
