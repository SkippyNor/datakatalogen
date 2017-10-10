import React from 'react';

function VegobjekttypeInfo ({vegobjekttype}) {

    if (vegobjekttype.styringsparametere) {
        Object.keys(vegobjekttype.styringsparametere).forEach(key => {
            if (vegobjekttype.styringsparametere[key] === true) {
                vegobjekttype.styringsparametere[key] = 'Ja';
            } else if (vegobjekttype.styringsparametere[key] === false) {
                vegobjekttype.styringsparametere[key] = 'Nei'
            }
        })
    }

    return (
        <section className="vot-info">
            <h3 className="vot-info__title">Mer informasjon</h3>

            <dl className="vot-info__dl">
                <dt className="vot-info__dt">
                    Stedfesting
                </dt>
                <dd className="vot-info__dd">
                    {vegobjekttype.stedfesting}
                </dd>
            </dl>

            <dl className="vot-info__dl">
                <dt className="vot-info__dt">
                    Sorteringsnummer
                </dt>
                <dd className="vot-info__dd">
                    {vegobjekttype.sorteringsnummer}
                </dd>
            </dl>
            
            {vegobjekttype.sosinvdbnavn && (
                <dl className="vot-info__dl">
                    <dt className="vot-info__dt">
                        Sosinvdbnavn
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.sosinvdbnavn}
                    </dd>
                </dl>
            )}
            
            {vegobjekttype.objektliste_dato && (
                <dl className="vot-info__dl">
                    <dt className="vot-info__dt">
                        Objektlistedato
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.objektliste_dato}
                    </dd>
                </dl>
            )}
            

            {vegobjekttype.styringsparametere && [

                <dl className="vot-info__dl" key="tidsrom_relevant">
                    <dt className="vot-info__dt">
                        Tidsromrelevant
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.tidsrom_relevant}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="sektype_20k">
                    <dt className="vot-info__dt">
                        Sekundærtype 2 OK
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.sektype_20k}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="abstrakt_type">
                    <dt className="vot-info__dt">
                        Abstrakt type
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.abstrakt_type}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="filtrering">
                    <dt className="vot-info__dt">
                        Filtrering
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.filtrering}
                    </dd>
                </dl>,
            
                
                <dl className="vot-info__dl" key="avledet">
                    <dt className="vot-info__dt">
                        Avledet
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.avledet}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="må_ha_mor">
                    <dt className="vot-info__dt">
                        Må ha mor
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.må_ha_mor}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="er_dataserie">
                    <dt className="vot-info__dt">
                        Er dataserie
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.er_dataserie}
                    </dd>
                </dl>,

                <dl className="vot-info__dl" key="overlapp">
                    <dt className="vot-info__dt">
                        Overlapp
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.overlapp}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="kjørefelt_relevant">
                    <dt className="vot-info__dt">
                        Kjørefeltrelevant
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.kjørefelt_relevant}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="sideposisjon_relevant">
                    <dt className="vot-info__dt">
                        Sideposisjonrelevant
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.sideposisjon_relevant}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="høyde_relevant">
                    <dt className="vot-info__dt">
                        Høyderelevant
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.høyde_relevant}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="retning_relevant">
                    <dt className="vot-info__dt">
                        Retningsrelevant
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.retning_relevant}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="flyttbar">
                    <dt className="vot-info__dt">
                        Flyttbar
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.flyttbar}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="ajourhold_i">
                    <dt className="vot-info__dt">
                        Ajourhold i
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.ajourhold_i}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="ajourhold_splitt">
                    <dt className="vot-info__dt">
                        Ajourhold splitt
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.ajourhold_splitt}
                    </dd>
                </dl>,
                
                <dl className="vot-info__dl" key="dekningsgrad">
                    <dt className="vot-info__dt">
                        Dekningsgrad
                    </dt>
                    <dd className="vot-info__dd">
                        {vegobjekttype.styringsparametere.dekningsgrad}
                    </dd>
                </dl>
            ]}

        </section>
    )
}

export default VegobjekttypeInfo;