import React, { Component } from 'react'
import axios from 'axios'

import { Italy } from './Italy'

export default class Dashboard extends Component {


    // for the logo to be inverted, check if the html tag contains the tag dark
    // then apply filter: invert(1) accordingly

    constructor(props) {
        super(props)

        this.state = {
            geojson: null
        }

    }

    componentDidMount() {
        console.log('dashboard mounted')
        this.getRegions()
    }

    async getRegions() {
        console.log('fetching regions')
        // Make a request for a user with a given ID
        // replace this with the real backend
        axios.get("regions.json")
            .then((response) => {
                console.log(response.data)
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


    render() {
        return (
            <div className="md:container md:mx-auto">
                <div className="flex justify-center ml-8 mr-8 mb-8">
                    <img style={{ height: "100px" }} src="./logo.png" />
                </div>




                <div className="flex flex-wrap flex-col" >

                    <p> hey there test </p>

                    <div className="flex flex-wrap flex-row">
                        <Italy geojson={this.state.geojson} />


                    <p> hey there test </p>
                    </div>

                </div>


            </div>
        )
    }
}
