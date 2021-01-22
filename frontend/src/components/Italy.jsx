


import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents, useMap, GeoJSON } from 'react-leaflet'


function MyGeoJson(props) {

    const map = useMap()


    return props.data.features.map(region => {

        // figure out highs and lows here
        // depending on the properties selected we have to figure out a different style
        // pass the information of all the properties and the one we want to filter
        return <GeoJSON
            attribution="Italian regions"
            data={region}
            eventHandlers={{
                click: (e) => {
                    // map.fitBounds(innerBounds)
                    map.fitBounds(e.layer._bounds);
                    // select first key of the object
                    console.log(e)
                    // console.log(map.getBounds())
                },
            }}
        />
    })

}

// italian bounds
const outerBounds = [
    [47.1770, 20.1796],
    [36.61, 5.39],
]

export function Italy(props) {

    useEffect(() => {
        console.log(props)
    });
    return (
        <div id="italy_map" className="flex flex-1 m-5 md:m-16 sm:m-10 ">

            <MapContainer bounds={outerBounds} className="rounded-lg" id="map_container" scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />


            </MapContainer>
        </div>

    )
}



//########################################################################################

// UTIL PART, FIGURING OUT COLOR AND OPACITY FROM HERE 

//=======================================================================================
/*                                                                                      *
 * // figure out the style based on some property                                       *
 *                                                                                      */
//========================================================================================

// the properties are the values
// the property is the one we are filtering on 
// the extremes are the highest and lowest values

function positiveOrNegative(property) {
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

// find out the color
function styleColorHandler(properties, property, extremes) {
    let key = properties[property]

    let opacity = (key * 1.0 / extremes.max)
    return {
        weight: 2,
        opacity: 1,
        fillColor: positiveOrNegative(property),
        color: 'grey',
        dashArray: '3',
        fillOpacity: opacity
    }

}

function findExtremes(regions, selectedProperty) {
    console.log(regions)
    console.log(selectedProperty)
    let values = []

    regions.forEach(region => {
        values.push(region.properties[selectedProperty])
    });

    let max = Math.max.apply(Math, values);
    let min = Math.min.apply(Math, values);
    return { min: min, max: max }
}



