import React from 'react';
import { Link } from 'react-router-dom';

function RelasjonstypeDetails ({relasjonstype}) {

    return (
        <div className="rt-details">

            <p className="rt-details__description">
                <Link to={'/' + relasjonstype.type.id + '-' + relasjonstype.type.navn} className="rt-details__link">
                    Gå til vegobjekttype
                </Link>
            </p>

            <dl className="rt-details__dl">
                <dt className="rt-details__dt">
                    Relasjonstype
                </dt>
                <dd className="rt-details__dd">
                    {relasjonstype.relasjonstype}
                </dd>
            </dl>

            <dl className="rt-details__dl">
                <dt className="rt-details__dt">
                    Id
                </dt>
                <dd className="rt-details__dd">
                    {relasjonstype.id}
                </dd>
            </dl>

            {relasjonstype.innenfor_mor && (
                <dl className="rt-details__dl">
                    <dt className="rt-details__dt">
                        Innenfor mor
                    </dt>
                    <dd className="rt-details__dd">
                        {relasjonstype.innenfor_mor}
                    </dd>
                </dl>
            )}

            {relasjonstype.type.objektliste_dato && (
                <dl className="rt-details__dl">
                    <dt className="rt-details__dt">
                        Objektlistedato
                    </dt>
                    <dd className="rt-details__dd">
                        {relasjonstype.type.objektliste_dato}
                    </dd>
                </dl>
            )}

        </div>
    )
}

export default RelasjonstypeDetails;