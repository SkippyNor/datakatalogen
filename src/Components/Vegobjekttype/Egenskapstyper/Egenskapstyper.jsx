import React from 'react';

import Egenskapstype from './Egenskapstype';

function Egenskapstyper ({state, vegobjekttype}) {


    if (!vegobjekttype.egenskapstyper) {
        return null;
    }

    return (
        <section className="et-section">
            <h3 className="et-section__title">Egenskapstyper</h3>

            <ul className="et-section__list">
                {vegobjekttype.egenskapstyper.map(egenskapstype => (

                    <Egenskapstype 
                        key={egenskapstype.id} 
                        vegobjekttypeId={vegobjekttype.id} 
                        egenskapstype={egenskapstype} 
                        expandAll={state.expandAll} 
                        statistics={state[egenskapstype.id]} 
                    />

                ))}
            </ul>

        </section>
    )
}

export default Egenskapstyper;