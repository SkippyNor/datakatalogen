import React from 'react';

import Relasjonstype from './Relasjonstype';

function Relasjonstyper ({expandAll, vegobjekttype}) {

    let hasForeldre = false;
    if (vegobjekttype.relasjonstyper && vegobjekttype.relasjonstyper.foreldre.length > 0) {
        hasForeldre = true;
        vegobjekttype.relasjonstyper.foreldre.sort(function(a, b) {
            return a.type.navn.localeCompare(b.type.navn);
        });
    }

    let hasBarn = false;
    if (vegobjekttype.relasjonstyper && vegobjekttype.relasjonstyper.barn.length > 0) {
        hasBarn = true;
        vegobjekttype.relasjonstyper.barn.sort(function(a, b) {
            return a.type.navn.localeCompare(b.type.navn);
        });
    }

    return (
        <div>
        {hasForeldre && (
            <section className="rt-section">
                <h3 className="rt-section__title">Foreldre</h3>

                <ul className="rt-section__list">
                {vegobjekttype.relasjonstyper.foreldre.map(relasjonstype => (
                    <Relasjonstype 
                        key={relasjonstype.id} 
                        expandAll={expandAll} 
                        relasjonstype={relasjonstype} />
                ))}
                </ul>

            </section>

        )} 

        {hasBarn && (
            <section className="rt-section">
                <h3 className="rt-section__title">Barn</h3>

                <ul className="rt-section__list">
                {vegobjekttype.relasjonstyper.barn.map(relasjonstype => (
                    <Relasjonstype 
                        key={relasjonstype.id} 
                        expandAll={expandAll} 
                        relasjonstype={relasjonstype} />
                ))}
                </ul>

            </section>

        )}
        </div>
    )
}

export default Relasjonstyper;