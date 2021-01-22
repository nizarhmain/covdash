
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvent, useMap, GeoJSON } from 'react-leaflet'
import { Button } from 'antd'



function MyGeoJson(props) {

    //########################################################################################

    function click(e, region) {
        console.log(e)
        props.setRegion(region.properties)
        map.fitBounds(e.layer._bounds);
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
            <Button onClick={ () => map.fitBounds(outerBounds)}>Ripristina</Button>
        </div>)

}


const outerBounds = [
    [47.1330, 18.54],
    [36.61, 5.9],
]

export function Italy(props) {

    useEffect(() => {
        console.log(props)
    });
    return (
        <div id="italy_map" className="flex flex-1 m-5 md:m-16 sm:m-10 ">

            <MapContainer bounds={outerBounds} doubleClickZoom={false} className="rounded-lg shadow-2xl" id="map_container" scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {props.geojson !== null && <MyGeoJson data={props.geojson} selectedProperty={props.selectedProperty} setRegion={props.setRegion} />}

                <ResetViewButton />
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

