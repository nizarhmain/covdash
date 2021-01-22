

import React from 'react'

export default function RegionInfo(props) {

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

                {regionCards()}

            </div >
        )
    }


    function regionCards() {

        const listItems = Object.entries(props.region).map((element) =>

            // replace the _ with spaces
            // casi_testati => casi testati

            <div key={element[0]} className="p-6 m-5 sm:m-7 md:m-1 w-full max-w-sm bg-white rounded-xl shadow-md ">
                <p>{ element[0].replace("_", " ")} : {element[1]}</p>
            </div>
        );

        return listItems;



    }


}
