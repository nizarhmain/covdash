
import React from 'react'

export default function RegionColor({ color }) {

    const getColor = (color) => {
        if (color === "giallo") {
            return 'yellow-200';
        }

        if (color === "arancione") {
            return 'yellow-500';
        }

        if (color === "rosso") {
            return 'red-500';
        }
    }

    return (
        <div className=" flex flex-row justify-around items-center pl-8 pr-8 m-5 max-w-sm bg-white rounded-xl shadow-md dark:bg-gray-800 dark:text-white">

            <div className={`rounded-full bg-${getColor(color)} border-2 flex p-3 relative`}>
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
