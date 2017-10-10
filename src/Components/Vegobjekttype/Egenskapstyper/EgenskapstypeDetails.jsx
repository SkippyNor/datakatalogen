import React from 'react';

function EgenskapstypeDetails ({egenskapstype}) {


    if (egenskapstype.styringsparametere) {
        Object.keys(egenskapstype.styringsparametere).forEach(key => {
            if (egenskapstype.styringsparametere[key] === true) {
                egenskapstype.styringsparametere[key] = 'Ja';
            } else if (egenskapstype.styringsparametere[key] === false) {
                egenskapstype.styringsparametere[key] = 'Nei'
            }
        })
    }

    return (
        <div className="et-details">
            {egenskapstype.beskrivelse && (
                <p className="et-details__description">
                    {egenskapstype.beskrivelse}
                </p>
            )}

            {egenskapstype.veiledning && (
                <p className="et-details__guidance">
                    {egenskapstype.veiledning}
                </p>
            )}

            <dl className="et-details__dl">
                <dt className="et-details__dt">Datatype</dt>
                <dd  className="et-details__dd">
                    {egenskapstype.datatype_tekst}
                    <span className="et-details__id"> {egenskapstype.datatype}</span>
                </dd>
            </dl>

            <dl className="et-details__dl">
                <dt className="et-details__dt">Sensitivitet</dt>
                <dd  className="et-details__dd">{egenskapstype.sensitivitet}</dd>
            </dl>

            <dl className="et-details__dl">
                <dt className="et-details__dt">Sorteringsnummer</dt>
                <dd  className="et-details__dd">{egenskapstype.sorteringsnummer}</dd>
            </dl>

            <dl className="et-details__dl">
                <dt className="et-details__dt">Viktighet</dt>
                <dd  className="et-details__dd">
                    {egenskapstype.viktighet_tekst}
                    <span className="et-details__id"> {egenskapstype.viktighet}</span>
                </dd>
            </dl>


            {egenskapstype.sosinvdbnavn && (
                <dl className="et-details__dl">
                    <dt className="et-details__dt">Sosinvdbnavn</dt>
                    <dd  className="et-details__dd">{egenskapstype.sosinvdbnavn}</dd>
                </dl>
            )}

            {egenskapstype.sosinavn && (
                <dl className="et-details__dl">
                    <dt className="et-details__dt">Sosinavn</dt>
                    <dd  className="et-details__dd">{egenskapstype.sosinavn}</dd>
                </dl>
            )}

            {egenskapstype.objektliste_dato && (
                <dl className="et-details__dl">
                    <dt className="et-details__dt">Objektlistedato</dt>
                    <dd  className="et-details__dd">{egenskapstype.objektliste_dato}</dd>
                </dl>
            )}

            {egenskapstype.feltengde && (
                <dl className="et-details__dl">
                    <dt className="et-details__dt">Feltlengde</dt>
                    <dd  className="et-details__dd">{egenskapstype.feltengde}</dd>
                </dl>
            )}

            {egenskapstype.styringsparametere && [

                <dl className="et-details__dl" key="avledet">
                    <dt className="et-details__dt">Avledet</dt>
                    <dd  className="et-details__dd">{egenskapstype.styringsparametere.avledet}</dd>
                </dl>,

                <dl className="et-details__dl" key="obligatorisk_verdi">
                    <dt className="et-details__dt">Obligatorisk verdi</dt>
                    <dd  className="et-details__dd">{egenskapstype.styringsparametere.obligatorisk_verdi}</dd>
                </dl>  
            ]}


        </div>
    )
}

export default EgenskapstypeDetails;