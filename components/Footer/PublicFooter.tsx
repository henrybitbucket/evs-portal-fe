import React from 'react';

class PublicFooter extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="footer">
                <footer role="contentinfo" className="ipvq0g-0 kGcRMP">
                    {!this.props.disableTop ?
                    <nav className="sc-13a0bfj-0 ad6b8g-0 hWPPmH ipvq0g-1 hyFSzC" style={{ display: 'flex', flexDirection: 'row', fontFamily: 'sharp-sans-medium, Arial, sans-serif', minHeight: '50vh', overflowX: 'hidden', boxSizing: 'border-box', WebkitBoxFlex: 1, flexGrow: 1, font: '12px sharp-sans-semibold, Arial, sans-serif', fontSize: '15px', padding: '30px 15px', position: 'relative', backgroundColor: 'rgb(0, 35, 75)', color: '#ffffff', WebkitBoxPack: 'justify', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', flexShrink: 0 }}>
                        <section data-test="zocdoc-link-group">
                            <h3 className="sc-1q37iq0-0 idYHpb" style={{ color: '#ffffff' }}>Consent</h3>
                        </section>
                        <section data-test="discover-link-group">
                            <h3 className="sc-1q37iq0-0 idYHpb" style={{ color: '#ffffff' }}>Discover</h3>
                        </section>
                        <section data-test="cities-link-group">
                            <h3 className="sc-1q37iq0-0 idYHpb" style={{ color: '#ffffff' }}>Insurance Carriers</h3>
                        </section>
                        <section data-test="specialities-link-group">
                            <h3 className="sc-1q37iq0-0 idYHpb" style={{ color: '#ffffff' }}>Top Specialties</h3>
                        </section>
                        <section>
                            <h3 className="sc-1q37iq0-0 idYHpb" style={{ color: '#ffffff' }}>Get the Consent app</h3>
                        </section>
                    </nav>
                    : null}
                    <section className="sc-13a0bfj-0 pkwszy-0 ctWdER" style={{ display: 'flex', flexDirection: 'row', background: '#000000', padding: '15px 50px', alignItems: 'center' }}>
                        <div data-test="footer-legal-custom-content-link-group" className="pkwszy-3 pkwszy-4 eGCsjS" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                            <div className="pkwszy-7 kGAsdh" style={{flex: '1 1 0%', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>

                            </div>
                        </div>
                    </section>
                </footer>
            </div>
        );
    }
}

export {PublicFooter};
