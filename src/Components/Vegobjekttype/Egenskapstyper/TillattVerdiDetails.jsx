import React from 'react';

function TillattVerdiDetails ({tillatt_verdi}) {

    return (
        <div className="tv-details">

            {tillatt_verdi.beskrivelse && (
                <p className="tv-details__description">
                    {tillatt_verdi.beskrivelse}
                </p>
            )}

            {tillatt_verdi.kortnavn && (
                <dl className="tv-details__dl">
                    <dt className="tv-details__dt">
                        Kortnavn
                    </dt>
                    <dd className="tv-details__dd">
                        {tillatt_verdi.kortnavn}
                    </dd>
                </dl>
            )}

            {tillatt_verdi.objektliste_dato && (
                <dl className="tv-details__dl">
                    <dt className="tv-details__dt">
                        Objektlistedato
                    </dt>
                    <dd className="tv-details__dd">
                        {tillatt_verdi.objektliste_dato}
                    </dd>
                </dl>
            )}

            {tillatt_verdi.sorteringsnummer && (
                <dl className="tv-details__dl">
                    <dt className="tv-details__dt">
                        Sorteringsnummer
                    </dt>
                    <dd className="tv-details__dd">
                        {tillatt_verdi.sorteringsnummer}
                    </dd>
                </dl>
            )}

            {tillatt_verdi.standardverdi && (
                <dl className="tv-details__dl">
                    <dt className="tv-details__dt">
                        Standardverdi
                    </dt>
                    <dd className="tv-details__dd">
                        {tillatt_verdi.standardverdi}
                    </dd>
                </dl>
            )}

        </div>
    )
}

export default TillattVerdiDetails;