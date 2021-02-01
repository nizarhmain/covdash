

import React from 'react'

import { Select } from 'antd';

const { Option } = Select;



export default function PropertyChooser( {setSelectedProperty} ) {


    function onChange(value) {
        console.log(`selected ${value}`);
        setSelectedProperty(value)
    }

    function onBlur() {
        // console.log('blur');
    }

    function onFocus() {
        // console.log('focus');
    }


    return (
        <div className="flex mx-auto p-7 m-7 justify-center">

            <Select
                size="large"
                placeholder="Scegli un dato"
                style={{ width: "300px" }}
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                defaultValue="nuovi_positivi"
            >
                <Option value="color">Zone</Option>
                <Option value="casi_testati">Casi testati</Option>
                <Option value="deceduti">Deceduti</Option>
                <Option value="dimessi_guariti">Dimessi guariti</Option>
                <Option value="nuovi_positivi">Nuovi Positivi</Option>
                <Option value="tamponi">Tamponi</Option>
                <Option value="tamponi_test_antigenico_rapido">Tamponi Rapidi</Option>
                <Option value="tamponi_test_molecolare">Tamponi Test molecolari</Option>
                <Option value="totale_casi">Casi totali</Option>
                <Option value="totale_ospedalizzati">Totale ospedalizzati</Option>
                <Option value="totale_positivi">Totale positivi</Option>
                <Option value="variazione_totale_positivi">Variazione totale positivi</Option>
            </Select>
        </div>

    )
}
