

import React from 'react'

export default function RegionInfo(props) {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function renderRegion(key, value, icon) {
        return (
            <div className=" flex flex-col items-center m-5 sm:m-7 md:m-1 w-full max-w-sm bg-white rounded-xl shadow-md ">

                <div>
                    <img className="svg" height="50px" src={icon} />
                </div>
                <div>
                    <p>  {key} </p>
                    <p className="text-3xl text-center"> {numberWithCommas(value)} </p>
                </div>

            </div>)
    }

    // console.log(props.region)

    if (!props.region) {
        return (
            <div className="flex m-4 sm:m-4 md:m-8 flex-1 self-stretch flex-col justify-evenly items-center">
                <div className="p-6 m-5 sm:m-7 md:m-1 w-full max-w-sm bg-white rounded-xl shadow-md ">
                    <p>Clicca su una regione</p>
                </div>

            </div >
        )
    } else {
        return (
            <div className="flex m-4 sm:m-4 md:m-8 flex-1 self-stretch flex-col justify-evenly items-center">
                <p className="text-lg text-center">{props.region.alias}</p>
                {renderRegion('Nuovi Positivi', props.region.nuovi_positivi, "blood-test.svg")}
                {renderRegion('Tamponi Effetuati', props.region.tamponi, "swab.svg")}
                {renderRegion('Positivi Totali', props.region.totale_positivi, "sick.svg")}
                {renderRegion('Terapia intensiva', props.region.terapia_intensiva, "patient.svg")}
                {renderRegion('Dimessi guariti', props.region.dimessi_guariti, "heart.svg")}
                {renderRegion('Deceduti', props.region.deceduti, "human-skull.svg")}

            </div >
        )
    }


    function regionCards() {

        const listItems = Object.entries(props.region).map((element) =>

            // replace the _ with spaces
            // casi_testati => casi testati

            <div key={element[0]} className="p-6 m-5 sm:m-7 md:m-1 w-full max-w-sm bg-white rounded-xl shadow-md ">
                <p>{element[0].replace("_", " ")} : {element[1]}</p>
            </div>
        );

        return listItems;



    }


}
