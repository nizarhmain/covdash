
import { LayersControl, TileLayer } from 'react-leaflet'
import findTheme from '../../findTheme'

import React from 'react'

export default function MyLayersControl() {

    // there is surely a way to do this more elegantly
    // TODO fix it later

    function activeTheme() {
        if (findTheme() === "dark") {
            return (
                <div>
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                            <TileLayer
                                url={`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`}
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                            <TileLayer
                                url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`}
                            />
                        </LayersControl.BaseLayer>
                    </LayersControl>
                </div>
            )
        } else {

            return (
                <div>
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                            <TileLayer
                                url={`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`}
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked name="OpenStreetMap.BlackAndWhite">
                            <TileLayer
                                url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`}
                            />
                        </LayersControl.BaseLayer>
                    </LayersControl>
               </div>
            )

        }
    }

    return activeTheme()



}
