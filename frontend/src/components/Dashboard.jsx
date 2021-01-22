

import React, { Component } from 'react'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div className="md:mx-auto">

                <div className="flex justify-center ml-8 mr-8 mb-8">
                    <img style={{ height: "100px" }} src="./logo.png" />
                </div>

                <button className="shadow-2xl dark:bg-red"> hey there </button>

            </div>
        )
    }
}
