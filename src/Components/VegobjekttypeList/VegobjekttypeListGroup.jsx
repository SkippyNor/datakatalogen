import React from 'react';
import { Link } from 'react-router-dom';


function makeTitle(id) {

    let title = '';
    if (id === '0') {
        title = '1–99'; 
    } else {
        title = id + '00–' + id + '99';
    }

    return title;
}

function VegobjekttypeListGroup ({vegobjekttyper, id, isSortedByName}) {

    let title = id;
    if (!isSortedByName) {
        title = makeTitle(id);
    }

    return (
        <section className="vot-list__group">
            <h2 className="vot-list__group-title">
                {title}
            </h2>
            <ul className="vot-list__group-list">
                {vegobjekttyper.map(vegobjekttype => {
                    return (
                        <li key={vegobjekttype.id} className="vot-list__group-listitem">
                            <Link to={'/' + vegobjekttype.id + '-' + vegobjekttype.navn} className="vot-list__link">
                                <span className="vot-list__name">{vegobjekttype.navn} </span>
                                <span className="vot-list__id">{vegobjekttype.id}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    )
}

export default VegobjekttypeListGroup;