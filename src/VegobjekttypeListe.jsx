import React from 'react';
import { Link } from 'react-router-dom';

import VegobjekttypeListeGroup from './VegobjekttypeListeGroup';


function VegobjekttypeListe ({vegobjekttyper, sort = 'navn'}) {

    vegobjekttyper = JSON.parse(JSON.stringify(vegobjekttyper));

    let isSortedByName = false;

    if (sort === 'navn') {
        isSortedByName = true;

        vegobjekttyper.sort((a, b) => {
            return a.navn.localeCompare(b.navn);
        });
    }

    let groups = {};
    vegobjekttyper.forEach(vegobjekttype => {

        if (isSortedByName) {
            
            if (groups[vegobjekttype.navn[0]]) {
                groups[vegobjekttype.navn[0]].push(vegobjekttype);
            } else {
                groups[vegobjekttype.navn[0]] = [vegobjekttype];
            }

        } else {

            let groupId = 0;
            if (vegobjekttype.id > 99) {
                groupId = vegobjekttype.id.toString()[0];
            }

            if (groups[groupId]) {
                groups[groupId].push(vegobjekttype);
            } else {
                groups[groupId] = [vegobjekttype];
            }

        }

    })

    return [
        <section key="xcx" style={{marginBottom: '6.4rem'}}>
            {isSortedByName ? (
                <ul>
                    <li>Navn</li>
                    <li><Link to={{search: '?sort=nummer'}}>Nummer</Link></li>
                </ul>
            ) : (
                <ul>
                    <li><Link to={{search: '?sort=navn'}}>Navn</Link></li>
                    <li>Nummer</li>
                </ul>
            )}
        </section>,

        <section key="vot-list" className="vot-list">
            {Object.keys(groups).map(groupId => (
                <VegobjekttypeListeGroup key={groupId} vegobjekttyper={groups[groupId]} id={groupId} isSortedByName={isSortedByName} />
            ))}
        </section>
    ];
}

export default VegobjekttypeListe;