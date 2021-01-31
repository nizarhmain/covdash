

import React from 'react'
import RegionDetails from './RegionDetails'



export default function RegionInfo({ region, lastUpdate }) {
    // gets the icon for the region
    const findIcon = (region_alias) => {

        if (region_alias !== undefined) {
            return <img alt="region_icon" className="rounded-lg shadow-2xl region_flag" height="200px" src={`region_icons/${region_alias.replace('/', '_')}.svg`} />
        } else {
            return <img alt="region_icon" className="rounded-lg shadow-2xl region_flag" height="200px" src={`region_icons/Italy.svg`} />
        }


    }

    console.log(region)


    if (!region) {
        return (
            <div className="flex m-4 sm:m-4 md:m-8 flex-1 self-stretch flex-col justify-evenly items-center">
                <div className="p-6 m-5 sm:m-7 md:m-1 w-full max-w-sm bg-white">
                    <p className="text-lg"> Seleziona o clicca su una regione</p>
                </div>

            </div >
        )
    } else {
        return (
            <div className="flex flex-col items-center">
                <div className="flex flex-col justify-evenly items-center text-lg dark:text-white"> {findIcon(region.alias)} {region.alias}</div>

                <div className="flex flex-wrap justify-around">
                    <div>
                        <RegionDetails label='Nuovi Positivi' value={region.nuovi_positivi} icon="blood-test.svg" />
                        <RegionDetails label='Tamponi Effetuati' value={region.tamponi} icon="swab.svg" />
                        <RegionDetails label='Positivi Totali' value={region.totale_positivi} extra_value={region.variazione_totale_positivi} icon="sick.svg" />
                        <RegionDetails label='Dimessi guariti' value={region.dimessi_guariti} icon="heart.svg" />
                        <RegionDetails label='deceduti' value={region.deceduti} icon="human-skull.svg" />
                    </div>
                    <div>
                        <RegionDetails label='Ospedalizzati' value={region.totale_ospedalizzati} icon="hospital.svg" />
                        <RegionDetails label='Isolamento domicil.' value={region.isolamento_domiciliare} icon="home.svg" />
                        <RegionDetails label='Terapia intensiva' value={region.terapia_intensiva} extra_value={region.ingressi_terapia_intensiva} icon="patient.svg" />
                        <RegionDetails label='Ricoverati con sintomi' value={region.ricoverati_con_sintomi} icon="patient.svg" />
                    </div>
                    {region.note && <p className="text-xl m-8  dark:text-white"> {region.note}</p>}
                    {region.note_casi && <p className="text-xl m-8 text-yellow-600 dark:text-white"> {region.note_casi}</p>}
                </div>

            </div >
        )
    }

}
