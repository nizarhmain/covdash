

import React from 'react'
import { GeoJSON } from 'react-leaflet'

export default function MyGeojson({ data, selectedProperty, setRegionFromAlias }) {

    //########################################################################################

    const click = (e, region) => { setRegionFromAlias(region.properties.alias) }


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


    // find out the color
    function styleColorHandler(properties, property, extremes) {
        let key = properties[property]

        if (property === "color") {

            if (key === "giallo") {
                return {
                    weight: 0,
                    opacity: 1,
                    fillColor: 'yellow',
                    color: 'grey',
                    dashArray: '3',
                    fillOpacity: 0.7 
                }
            }
            if (key === "arancione") {
                return {
                    weight: 0,
                    opacity: 1,
                    fillColor: 'orange',
                    color: 'grey',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }

            if (key === "rosso") {
                return {
                    weight: 0,
                    opacity: 1,
                    fillColor: 'red',
                    color: 'grey',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }
        }
        // calculate opacity
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





    //########################################################################################
    let extremes = findExtremes(data.features, selectedProperty)

    return data.features.map(region => {

        // figure out highs and lows here
        // depending on the properties selected we have to figure out a different style
        // pass the information of all the properties and the one we want to filter
        let custom_style = styleColorHandler(region.properties, selectedProperty, extremes);
        return <GeoJSON
            key={selectedProperty + region.properties.reg_istat_code_num + region.properties.nuovi_positivi}
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


export function findExtremes(regions, selectedProperty) {
    // console.log(regions)
    // console.log(selectedProperty)
    let values = []

    regions.forEach(region => {
        values.push(region.properties[selectedProperty])
    });

    let max = Math.max.apply(Math, values);
    let min = Math.min.apply(Math, values);
    return { min: min, max: max }
}


// the properties are the values
// the property is the one we are filtering on 
// the extremes are the highest and lowest values

export function positiveOrNegative(property) {
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

        case "color":
            return 'yellow'

        default:
            return 'red'
    }

}




