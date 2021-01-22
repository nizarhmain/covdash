import React, { Component } from 'react'

export default class PropertyChooser extends Component {


    constructor(props) {
        super(props)

        this.state = {

        }
        this.changeProperty = this.changeProperty.bind(this)
    }


    changeProperty() {

        console.log("this was clicked")

    }



    render() {
        return (
            <div className="flex m-4 sm:m-4 md:m-8 flex-1 self-stretch flex-col justify-evenly items-center">


                <button onClick={this.changeProperty} class="p-6 m-5 bg-gray-900 sm:m-7 md:m-1 w-full max-w-sm bg-white rounded-xl shadow-md ">
                    <div class="text-xl font-medium text-white">Totale deceduti</div>
                </button>


                <button onClick={this.changeProperty} class="p-6 m-5 bg-red-400 sm:m-7 md:m-1 w-full max-w-sm bg-white rounded-xl shadow-md ">
                    <div class="text-xl font-medium text-white">Totale positivi</div>
                </button>


                <button onClick={this.changeProperty} class="p-6 bg-purple-600  m-5 sm:m-7 md:m-1 w-full max-w-sm bg-white rounded-xl shadow-md ">
                    <div class="text-xl font-medium text-white">Dimessi/guariti</div>
                </button>


                <button onClick={this.changeProperty} class="p-6 bg-green-500 m-5 sm:m-7 md:m-1 w-full max-w-sm  bg-white rounded-xl shadow-md">
                    <div class="text-xl font-medium text-white">Tamponi</div>
                </button>

                <button onClick={this.changeProperty} class="p-6 bg-yellow-300 m-5 sm:m-7 md:m-1 w-full max-w-sm  bg-white rounded-xl shadow-md ">
                    <div class="text-xl font-medium text-yellow-900">Casi testati</div>
                </button>


                <button onClick={this.changeProperty} class="p-6 bg-gray-300  m-5 sm:m-7 md:m-1 w-full max-w-sm  bg-white rounded-xl shadow-md ">
                    <div class="text-xl font-medium text-gray-900">Totale casi</div>
                </button>


                <button onClick={this.changeProperty} class="p-6 m-5 bg-red-300 sm:m-7 md:m-1 w-full max-w-sm  bg-white rounded-xl shadow-md ">
                    <div class="text-xl font-medium text-white">Ingressi in terapia</div>
                </button>

            </div>
        )
    }
}
