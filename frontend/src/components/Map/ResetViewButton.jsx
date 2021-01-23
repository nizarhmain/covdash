import React from 'react'
import { useMap } from 'react-leaflet'
import { Button } from 'antd'

export default function ResetViewButton() {

    const outerBounds = [
        [47.1330, 18.54],
        [36.61, 5.9],
    ]

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
