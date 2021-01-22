
import React from 'react'

import { Select } from 'antd';

const { Option } = Select;


export default function RegionChooser(props) {


    function onChange(value) {
        console.log(value);
        props.setRegionFromAlias(value)
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
        <div className="mx-auto p-7 m-7">

            <Select
                showSearch
                size="large"
                placeholder="Scegli una regione"
                style={{ width: "300px" }}
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
            >
                <Option value="Abruzzo">Abruzzo</Option>
                <Option value="Basilicata">Basilicata</Option>
                <Option value="Calabria">Calabria</Option>
                <Option value="Campania">Campania</Option>
                <Option value="Emilia-Romagna">Emilia-Romagna</Option>
                <Option value="Friuli-Venezia Giulia">Friuli-Venezia Giulia</Option>
                <Option value="Lazio">Lazio</Option>
                <Option value="Liguria">Liguria</Option>
                <Option value="Lombardia">Lombardia</Option>
                <Option value="Marche">Marche</Option>
                <Option value="Molise">Molise</Option>
                <Option value="Piemonte">Piemonte</Option>
                <Option value="Sardegna">Sardegna</Option>
                <Option value="Sicilia">Sicilia</Option>
                <Option value="Trentino-Alto Adige/Südtirol">Trentino-Alto Adige/Südtirol </Option>
                <Option value="Toscana">Toscana</Option>
                <Option value="Umbria">Umbria</Option>
                <Option value="Valle d'Aosta/Vallée d'Aoste"> Valle d'Aosta/Vallée d'Aoste </Option>
                <Option value="Veneto">Veneto</Option>
            </Select>
        </div>

    )
}