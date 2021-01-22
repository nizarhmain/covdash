import React, { Component } from 'react'


import './../../node_modules/react-vis/dist/style.css';
import { RadialChart, XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';


export default class MyRadial extends Component {
    render() {
        const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }]

        return (
            <div>
                <RadialChart
                    showLabels
                    data={myData}
                    width={300}
                    height={300} />

            </div>
        )
    }
}
