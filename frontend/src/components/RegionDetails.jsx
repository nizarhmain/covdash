import React from 'react'
import AnimatedNumber from "animated-number-react";


const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const formatValue = (value) => numberWithCommas(value.toFixed(0));

const formatExtraValue = (value) => value > 0 ? <span className="text-red-600">+{value}</span> : <span className="text-green-400"> {value} </span> 

export default function RegionDetails({ label, value, extra_value, icon }) {

    return (
        <div className=" flex flex-row justify-around items-center pl-8 pr-8 m-5 max-w-sm bg-white rounded-xl shadow-md dark:bg-gray-800 dark:text-white">

            <div>
                <img alt="region_icon" className="svg" src={icon} />
            </div>
            <div>
                <p> {label} </p>
                <p className="text-3xl text-center">
                    <AnimatedNumber
                        value={value}
                        formatValue={formatValue}
                    />
                </p>
                <p className="text-3xl text-center">
                    {extra_value && formatExtraValue(extra_value)}
                </p>
            </div>
        </div>)
}
