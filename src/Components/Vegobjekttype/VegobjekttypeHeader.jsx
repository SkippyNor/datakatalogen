import React from 'react';

import { formatQuantity } from '../../services/format';
import { getVegkartLink } from '../../services/vegkart';


function VegobjekttypeHeader ({statistics, vegobjekttype}) {

    return (
        <header className="vot-header">
            <h2 className="vot-header__name">
                {vegobjekttype.navn}
                <span className="vot-header__id"> {vegobjekttype.id}</span>
            </h2>
            <p className="vot-header__description">
                {vegobjekttype.beskrivelse}
            </p>
            {vegobjekttype.veiledning && (
                <p className="vot-header__guidance">
                    {vegobjekttype.veiledning}
                </p>
            )}
            <dl className="vot-header__statistics-dl">
                <dt className="vot-header__statistics-dt">
                    Antall vegobjekter
                </dt>
                <dd className="vot-header__statistics-dd">
                    <a
                        href={getVegkartLink(vegobjekttype.id)}
                        className="vot-header__statistics-link"
                        target="_blank"> {formatQuantity(statistics)}</a>
                </dd>
            </dl>
        </header>
    )
}

export default VegobjekttypeHeader;