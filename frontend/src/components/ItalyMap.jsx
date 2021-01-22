import React, { Component } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'


import axios from 'axios'


export default class ItalyMap extends Component {

    constructor(props) {
        super(props)

        this.state = {
            geojson: null,
            zoom: 6,
            phone: window.matchMedia("(max-width: 767px)").matches,
            desktop: window.matchMedia("(min-width: 1025px)").matches,
            tablet: window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches
        }

        this.onEachFeature = this.onEachFeature.bind(this)

    }



    componentDidMount() {

        console.log('italy map component')
        window.matchMedia('(max-width: 768px)')
        this.getRegions()


        console.log('is this a phone: ' + this.state.phone);
        console.log('is this a desktop: ' + this.state.desktop);
        console.log('is this a tablet: ' + this.state.tablet);
    }



    async getRegions() {
        // Make a request for a user with a given ID
        axios.get("http://localhost:5000/latest")
            .then((response) => {
                console.log(response.data);
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


    onEachFeature(feature, layer) {
        layer.on({
            // mouseover: this.highlightFeature.bind(this),
            // mouseout: this.resetHighlight.bind(this),
            click: this.clickRegion.bind(this),
            mouseover: this.highlightFeature.bind(this),
            mouseout: this.resetHighlight.bind(this),

        });
    }


    resetHighlight(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 2,
            color: 'grey',
            dashArray: '3',
        });
    }

    highlightFeature(e) {
        const layer = e.target;
        layer.setStyle({
            weight: 2,
            color: 'black',
            dashArray: '3',
        });

        layer.bringToFront();
    }


    clickRegion(e) {
        var layer = e.target;
        // this contains the region
        const region_info = layer.feature.properties;
        this.props.setRegion(region_info)

    }

    //========================================================================================
    /*                                                                                      *
     * // figure out the style based on some property                                       *
     *                                                                                      */
    //========================================================================================

    // the properties are the values
    // the property is the one we are filtering on 
    // the extremes are the highest and lowest values

    positiveOrNegative(property) {
        switch (property) {
            case "casi_testati":
                return 'green'

            case "dimessi_guariti":
                return 'green'

            case "tamponi":
                return 'green'

            case "tamponi_test_antigenico_rapido":
                return 'green'

            case "tamponi_test_molecolare":
                return 'green'
            default:
                return 'red'
        }

    }

    styleColorHandler(properties, property, extremes) {

        // write a switch depending on the current Property we are looking for
        let key = properties[property]

        // if 1.0 is extremes.max
        // and 0.0 is extremes.min
        // calculate the opacity from this value

        // console.log(extremes.max)

        // issue with terapia intensiva

        let opacity = (key * 1.0 / extremes.max)
        // console.log(opacity)

        // the color should be green if the property is good like testing
        // and should be red if it's a negative thing like number of deaths

        return {
            weight: 2,
            opacity: 1,
            fillColor: this.positiveOrNegative(property),
            color: 'grey',
            dashArray: '3',
            fillOpacity: opacity
        }

    }

    // find the highest and lowest values
    findExtremes(regions, selectedProperty) {
        let values = []

        regions.forEach(region => {
            values.push(region.properties[selectedProperty])
        });

        let max = Math.max.apply(Math, values);
        let min = Math.min.apply(Math, values);
        return { min: min, max: max }
    }


    zoomByDevice() {

        if(this.state.phone) {
            return 5.3
        } else {
            return 6.0 
        }

    }




    renderRegions() {

        console.log('render regions functions triggered')
        console.log(this.props.selectedProperty)

        let geojson = this.state.geojson;

        let extremes = {}

        if (geojson !== null) {
            extremes = this.findExtremes(geojson.features, this.props.selectedProperty)
        }

        if (geojson) {
            return geojson.features.map(region => {

                // figure out highs and lows here

                // depending on the properties selected we have to figure out a different style
                // pass the information of all the properties and the one we want to filter
                let custom_style = this.styleColorHandler(region.properties, this.props.selectedProperty, extremes);

                return <GeoJSON
                    key={this.props.selectedProperty + region.properties.reg_istat_code_num}
                    style={custom_style}
                    attribution="Italian regions"
                    data={region}
                    onEachFeature={this.onEachFeature}
                />
            })

        }
    }



    render() {

        const zoomValue = this.zoomByDevice()

        return (
            <div id="italy_map" className="flex flex-1 m-5 md:m-16 sm:m-10 ">

                <MapContainer  zoomSnap={0} dragging={false} doubleClickZoom={false} className="rounded-lg bg-gray-100 shadow-2xl" id="map_container" center={[42.0014, 12.4451]} zoomControl={false} zoom={zoomValue} scrollWheelZoom={false}>
                    {this.renderRegions()}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                 
                </MapContainer>
            </div>
        )
    }
}
