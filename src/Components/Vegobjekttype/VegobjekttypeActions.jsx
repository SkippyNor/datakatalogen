import React from 'react';

import { getStatisticsEt, getStatisticsTv } from '../../services/server';


function VegobjekttypeActions ({expandAll, setStatistics, toggleExpand, vegobjekttype}) {

    const handleChange = (e) => {
        toggleExpand(e.target.checked);
    }

    const getStatistics = () => {

        vegobjekttype.egenskapstyper.forEach(egenskapstype => {

            let statistics = {};

            let tillatte_verdier = [];
            if (egenskapstype.tillatte_verdier) {
                tillatte_verdier = egenskapstype.tillatte_verdier;
            }

            Promise.all(tillatte_verdier.map(tillatt_verdi => {

                return getStatisticsTv(vegobjekttype.id, egenskapstype.id, tillatt_verdi.id).then(json => {
                    statistics[tillatt_verdi.id] = json.antall;
                });


            }))
            .then(() => {

                getStatisticsEt(vegobjekttype.id, egenskapstype.id).then(json => {
                    statistics.sum = json.antall;

                    setStatistics(egenskapstype.id, statistics);

                });
            })
        });
    }

    return (
        <ul className="vot-actions" key="vot-actions">
            <li className="vot-actions__action">
                <button className="vot-actions__statistics-button" type="button" onClick={getStatistics}>
                    <span className="vot-actions__statistics-title">
                        Hent statistikk
                    </span>
                </button>
            </li>
            <li className="vot-actions__action">
                <label className={expandAll ? 'vot-actions__details-label vot-actions__details-label--expanded' : 'vot-actions__details-label'}>
                    <input className="vot-actions__details-toggle" type="checkbox" checked={expandAll} onChange={handleChange}  />
                    <span className="vot-actions__details-title">
                        {expandAll ? 'Skjul detaljer' : 'Se detaljer' }
                    </span>
                </label>
            </li>
        </ul>
    )
}

export default VegobjekttypeActions;