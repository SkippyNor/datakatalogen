import React from 'react';
import { Link } from 'react-router-dom';

import VegobjekttypeListGroup from './VegobjekttypeListGroup';
import Search from '../Search';


function VegobjekttypeList ({vegobjekttyper, history, sort = 'navn'}) {

    vegobjekttyper = JSON.parse(JSON.stringify(vegobjekttyper));

    document.title = 'Nasjonal vegdatabank Datakatalog';

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

        <section className="layout__search-container" key="layout__search-container">
            <Search vegobjekttyper={vegobjekttyper} history={history}/>

            <section key="xcx" className="vot-sort">
                <p className="vot-sort__label">
                    Sorter listen etter
                </p>
                <ul className="vot-sort__list">
                    <li className="vot-sort__listitem">
                        <Link 
                            className={isSortedByName ? 'vot-sort__link vot-sort__link--active' : 'vot-sort__link'}
                            to="/">
                            Navn
                        </Link>
                    </li>
                    <li className="vot-sort__listitem">
                        <Link 
                            className={!isSortedByName ? 'vot-sort__link vot-sort__link--active' : 'vot-sort__link'}
                            to={{search: '?sort=nummer'}}>
                            Nummer
                        </Link>
                    </li>
                </ul>
            </section>

        </section>,

        <section key="vot-list" className="vot-list">
            {Object.keys(groups).map(groupId => (
                <VegobjekttypeListGroup key={groupId} vegobjekttyper={groups[groupId]} id={groupId} isSortedByName={isSortedByName} />
            ))}
        </section>
    ];
}

export default VegobjekttypeList;
