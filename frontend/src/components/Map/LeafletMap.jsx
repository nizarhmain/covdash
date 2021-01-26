
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import ResetViewButton from './ResetViewButton'
import MyGeojson from './Geojson'


//########################################################################################

// UTIL PART, FIGURING OUT COLOR AND OPACITY FROM HERE 
const outerBounds = [
    [47.1330, 18.54],
    [36.61, 5.9],
]


// if we are using the phone, disable the phone scrolling

export function Italy(props) {

    return (
        <div id="italy_map" className="flex flex-1 m-5 md:m-16 sm:m-10 ">

            <MapContainer maxBounds={outerBounds} bounds={outerBounds} doubleClickZoom={false} className="rounded-lg shadow-2xl" id="map_container" scrollWheelZoom={false} minZoom={6}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {props.geojson !== null && <MyGeojson data={props.geojson} selectedProperty={props.selectedProperty} setRegionFromAlias={props.setRegionFromAlias} />}

                <ResetViewButton />
            </MapContainer>
        </div>

    )
}



