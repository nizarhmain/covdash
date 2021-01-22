
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvent, useMap, GeoJSON } from 'react-leaflet'
import { Button } from 'antd'



function MyGeoJson(props) {

    //########################################################################################

    function click(e, region) {
        console.log(e)
        console.log(region)
        props.setRegion(region.properties)
        // map.fitBounds(e.layer._bounds);
        console.log(e)
    }


    function resetHighlight(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 0,
            color: 'grey',
            dashArray: '3',
        });
    }

    function highlightFeature(e) {
        const layer = e.target;
        layer.setStyle({
            weight: 1,
            color: 'black',
            dashArray: '3',
        });

        layer.bringToFront();
    }

    //########################################################################################


    const map = useMap()
    let extremes = findExtremes(props.data.features, props.selectedProperty)

    return props.data.features.map(region => {

        // figure out highs and lows here
        // depending on the properties selected we have to figure out a different style
        // pass the information of all the properties and the one we want to filter
        let custom_style = styleColorHandler(region.properties, props.selectedProperty, extremes);
        return <GeoJSON
            key={props.selectedProperty + region.properties.reg_istat_code_num}
            style={custom_style}
            data={region}
            eventHandlers={{
                click: (e) => click(e, region),
                mouseover: highlightFeature,
                mouseout: resetHighlight
            }}
        />
    })

}



function ResetViewButton() {

    const map = useMap()

    return (
        <div class="leaflet-control ml-16 mt-5">
            <Button onClick={() => map.fitBounds(outerBounds)}>
                <div className="flex flex-row align-center justify-between">
                    <svg height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg> Ripristina </div>
            </Button>
        </div>)

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

    let opacity = (key * 0.8 / extremes.max)
    return {
        weight: 0,
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


const outerBounds = [
    [47.1330, 18.54],
    [36.61, 5.9],
]


// if we are using the phone, disable the phone scrolling

export function Italy(props) {

    useEffect(() => {
        console.log(props)
    });
    return (
        <div id="italy_map" className="flex flex-1 m-5 md:m-16 sm:m-10 ">

            <MapContainer bounds={outerBounds} doubleClickZoom={false} className="rounded-lg shadow-2xl" id="map_container" scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {props.geojson !== null && <MyGeoJson data={props.geojson} selectedProperty={props.selectedProperty} setRegion={props.setRegion} />}

                <ResetViewButton />
            </MapContainer>
        </div>

    )
}



