

import React from 'react'

import { Select } from 'antd';

const { Option } = Select;



export default function SelectProperty(props) {


    function onChange(value) {
        console.log(`selected ${value}`);
        props.setSelectedProperty(value)
    }

    function onBlur() {
        // console.log('blur');
    }

    function onFocus() {
        // console.log('focus');
    }

    function onSearch(val) {
        // console.log('search:', val);
    }


    return (
        <div className="mx-auto p-7 m-7 shadow-2xl rounded-lg">

            <Select
                showSearch
                size="large"
                placeholder="Scegli un dato"
                style={{ width: "300px" }}
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                defaultValue="nuovi_positivi"
            >
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
