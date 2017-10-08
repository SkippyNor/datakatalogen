import React from 'react';
import svvgfx from './gfx/svvgfx.svg'; 

function Footer () {

    return (
        <footer className="footer">
            <img className="footer__gfx" src={svvgfx} alt="" />
            <div className="footer__content">
                <p className="footer__info">
                    Drevet av ferske vegdata fra Nasjonal vegdatabank
                </p>
                <ul className="footer__list">
                    <li className="footer__listitem">
                        <a href="https://www.vegvesen.no" className="footer__link">
                            Statens vegvesen
                        </a>
                    </li>
                    <li className="footer__listitem">
                        <a href="https://www.vegvesen.no/nvdb/apidokumentasjon/" className="footer__link">
                            API-dokumentasjon
                        </a>
                    </li>
                    <li className="footer__listitem">
                        <a href="https://github.com/nvdb-vegdata/datakatalogen" className="footer__link">
                            Kildekode
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;