
import React from 'react'

export default function RegionColor({ color }) {

    let style = {}

    const getColor = (color) => {
        if (color === "giallo") {
            style = { backgroundColor: 'yellow' };
        }

        if (color === "arancione") {
            style = { backgroundColor: 'orange' };
        }

        if (color === "rosso") {
            style = { backgroundColor: 'red' };
        }
    }

    getColor(color)

    return (
        <div className=" flex flex-row justify-around items-center pl-8 pr-8 m-5 max-w-sm bg-white rounded-xl shadow-md dark:bg-gray-800 dark:text-white">

            <div style={style} className={`rounded-full border-2 flex p-3 relative`}>
                <div className="absolute top-5 left-8">
                </div>
            </div>

            <div>
                <p> Colore </p>
                <p className="text-3xl text-center">
                    {color}
                </p>
            </div>
        </div>)
}
