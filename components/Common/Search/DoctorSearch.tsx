import React from 'react';
import Highlighter from 'react-highlight-words';
import css from 'styled-jsx/css';
import { IBasicComponentProps } from '@app/components/Types';
import { styleForSuggestions } from './styles';
import moment from 'moment';
import ModernDatepicker from 'react-modern-datepicker';
import { SelectCustom } from '@app/components/Common';

import { getSpecialities, getInsuranceCarriers } from '@app/api/common';

const styles = css`
    :global(.select-custom) {
        height: 100%;
    }
    :global(.select-custom option) {
        padding-left: 15px;
    }
    :global(.select-custom div[class*='IndicatorsContainer']) {
        display: none !important;
    }
    :global(.select-custom div[class*='container']) {
        height: 100%;
    }
    :global(div[class*='container'] div[class*='-menu']) {
        margin-top: 0px;
        border-radius: 0;
        z-index: 2;
    }
    :global(.select-custom div[class*='-control'] > *) {
        border: none !important;
        margin-left: 35px;
        font-weight: 500 !important;
        color: #757575 !important;
    }
    :global(.select-custom div[class*='-control'] > * input)  {
        opacity: 1 !important;
    }
    :global(.select-custom div[class*='-control']) {
        border: none !important;
        height: 100%;
    }
    :global(.select-custom div[class*='-placeholder']) {
        white-space: nowrap !important;
    }
    :global(.select-custom span[class*='-indicatorSeparator']) {
        display: none !important;
    }
    :global(.select-custom div[class*='-indicatorContainer']) {
        display: none !important;
    }
    :global(.div-appointment-date > div > div) {
        box-shadow: 0 0 11px 0.5px rgba(0,0,0,0.1);
        z-index: 2;
    }
    :global(.div-appointment-date > div > input) {
        height: 46px;
        border: none;
        padding-left: 45px;
        font-weight: 500;
        color: #757575;
    }
    @media only screen and (max-width: 600px) {
        .search-bar-form {
            flex-direction: column !important;
        }
        .search-bar-form-button {
            width: unset !important;
        }

        section {
            padding: 15px !important;
        }
    }
`

const insurances = [
    {
        label: 'popular carriers',
        options: [
            {label: 'Aetna', value: 'Aetna'},
            {label: 'Blue Cross Blue Shield (BCBS)', value: 'Blue Cross Blue Shield (BCBS)'},
            {label: 'Cigna', value: 'Cigna'},
            {label: 'First Choice Health', value: 'First Choice Health'},
            {label: 'Tricare', value: 'Tricare'},
            {label: 'UnitedHealthcare', value: 'UnitedHealthcare'},
            {label: 'VSP', value: 'VSP'},
        ]
    },
    {
        label: 'common visit reasons',
        options: [
            {label: 'Annual Physical', value: 'Annual Physical'},
            {label: 'Dermatology Consultation', value: 'Dermatology Consultation'},
            {label: 'Annual Pap Smear / GYN Exam', value: 'Annual Pap Smear / GYN Exam'},
            {label: 'Dental Cleaning', value: 'Dental Cleaning'},
            {label: 'General Eye Consultation', value: 'General Eye Consultation'},
        ]
    },
]

const specialties = [
    {
        label: 'popular specialties',
        options: [
            {label: 'Primary Care Physician (PCP)', value: 'Primary Care Physician (PCP)'},
            {label: 'Dentist', value: 'Dentist'},
            {label: 'Dermatologist', value: 'Dermatologist'},
            {label: 'OB-GYN (Obstetrician-Gynecologist)', value: 'OB-GYN (Obstetrician-Gynecologist)'},
            {label: 'Eye Doctor', value: 'Eye Doctor'},
        ]
    },
    {
        label: 'common visit reasons',
        options: [
            {label: 'Annual Physical', value: 'Annual Physical'},
            {label: 'Dermatology Consultation', value: 'Dermatology Consultation'},
            {label: 'Annual Pap Smear / GYN Exam', value: 'Annual Pap Smear / GYN Exam'},
            {label: 'Dental Cleaning', value: 'Dental Cleaning'},
            {label: 'General Eye Consultation', value: 'General Eye Consultation'},
        ]
    },
    {
        label: 'more specialties (a-z)',
        options: [
            {label: 'Acupuncturist', value: 'Acupuncturist'},
            {label: 'Allergist (Immunologist)', value: 'Allergist (Immunologist)'},
            {label: 'Audiologist', value: 'Audiologist'},
            {label: 'Cardiologist (Heart Doctor)', value: 'Cardiologist (Heart Doctor)'},
            {label: 'Cardiothoracic Surgeon', value: 'Cardiothoracic Surgeon'},
            {label: 'Chiropractor', value: 'Chiropractor'},
            {label: 'Colorectal Surgeon', value: 'Colorectal Surgeon'},
            {label: 'Dentist', value: 'Dentist'},
            {label: 'Dermatologist', value: 'Dermatologist'},
            {label: 'Dietitian / Nutritionist', value: 'Dietitian / Nutritionist'},
            {label: 'Ear, Nose & Throat Doctor (ENT / Otolaryngologist)', value: 'Ear, Nose & Throat Doctor (ENT / Otolaryngologist)'},
            {label: 'Endocrinologist (incl Diabetes Specialists)', value: 'Endocrinologist (incl Diabetes Specialists)'},
            {label: 'Eye Doctor', value: 'Eye Doctor'},
            {label: 'Gastroenterologist', value: 'Gastroenterologist'},
            {label: 'Geriatrician', value: 'Geriatrician'},
            {label: 'Hearing Specialist', value: 'Hearing Specialist'},
            {label: 'Hematologist (Blood Specialist)', value: 'Hematologist (Blood Specialist)'},
            {label: 'Infectious Disease Specialist', value: 'Infectious Disease Specialist'},
            {label: 'Infertility Specialist', value: 'Infertility Specialist'},
            {label: 'Midwife', value: 'Midwife'},
            {label: 'Naturopathic Doctor', value: 'Naturopathic Doctor'},
            {label: 'Nephrologist (Kidney Specialist)', value: 'Nephrologist (Kidney Specialist)'},
            {label: 'Neurologist (incl Headache Specialists)', value: 'Neurologist (incl Headache Specialists)'},
            {label: 'Neurosurgeon', value: 'Neurosurgeon'},
            {label: 'OB-GYN (Obstetrician-Gynecologist)', value: 'OB-GYN (Obstetrician-Gynecologist)'},
            {label: 'Oncologist', value: 'Oncologist'},
            {label: 'Ophthalmologist', value: 'Ophthalmologist'},
            {label: 'Optometrist', value: 'Optometrist'},
            {label: 'Oral Surgeon', value: 'Oral Surgeon'},
            {label: 'Orthodontist', value: 'Orthodontist'},
            {label: 'Orthopedic Surgeon (Orthopedist)', value: 'Orthopedic Surgeon (Orthopedist)'},
            {label: 'Pain Management Specialist', value: 'Pain Management Specialist'},
            {label: 'Pediatric Dentist', value: 'Pediatric Dentist'},
            {label: 'Pediatrician', value: 'Pediatrician'},
            {label: 'Physiatrist (Physical Medicine)', value: 'Physiatrist (Physical Medicine)'},
            {label: 'Physical Therapist', value: 'Physical Therapist'},
            {label: 'Plastic Surgeon', value: 'Plastic Surgeon'},
            {label: 'Podiatrist (Foot and Ankle Specialist)', value: 'Podiatrist (Foot and Ankle Specialist)'},
            {label: 'Primary Care Physician (PCP)', value: 'Primary Care Physician (PCP)'},
            {label: 'Prosthodontist', value: 'Prosthodontist'},
            {label: 'Psychiatrist', value: 'Psychiatrist'},
            {label: 'Psychologist', value: 'Psychologist'},
            {label: 'Pulmonologist (Lung Doctor)', value: 'Pulmonologist (Lung Doctor)'},
            {label: 'Radiologist', value: 'Radiologist'},
            {label: 'Rheumatologist', value: 'Rheumatologist'},
            {label: 'Sleep Medicine Specialist', value: 'Sleep Medicine Specialist'},
            {label: 'Sports Medicine Specialist', value: 'Sports Medicine Specialist'},
            {label: 'Surgeon', value: 'Surgeon'},
            {label: 'Therapist / Counselor', value: 'Therapist / Counselor'},
            {label: 'Urgent Care Specialist', value: 'Urgent Care Specialist'},
            {label: 'Urological Surgeon', value: 'Urological Surgeon'},
            {label: 'Urologist', value: 'Urologist'},
            {label: 'Vascular Surgeon', value: 'Vascular Surgeon'},
        ]
    },

]

class DoctorSearch extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
        appointmentDate: new Date(),
        specialties: [],
        insurances: [],
        specialityOrName: this.props.specialityOrName || '',
        city: this.props.city || '',
        lat: this.props.lat || null,
        lng: this.props.lng || null,
        insurance: this.props.insurance || '',
    };
  }
  componentDidMount() {

    this.inV = setInterval(() => {
        if (window.google) {
            clearInterval(this.inV);
            let cityEle = this.cityEle;
            const autocomplete = new google.maps.places.Autocomplete(cityEle);
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                this.state.city = cityEle.value;
                if (place && place.geometry && place.geometry.location) {
                    this.state.lng = place.geometry.location.lng();
                    this.state.lat = place.geometry.location.lat();
                }
            })
        }
    }, 200)
    let params = new URL(window.location.href).searchParams;
    let appointmentDate = params.get('appointmentDate');
    console.info(appointmentDate);
    if (!appointmentDate) {
        appointmentDate = new Date();
    }
    appointmentDate = new Date(appointmentDate);
    if (isNaN(appointmentDate.getDate())) {
        appointmentDate = new Date();
    }
    this.setState({
        appointmentDate: appointmentDate,
        specialityOrName: params.get('specialityOrName') || '',
        city: params.get('city') || '',
        lat: Number(params.get('lat')) || null,
        lng: Number(params.get('lng')) || null,
        insurance: params.get('insurance') || '',
    }, async () => {
        console.info('->', this.state);
        let specs = await getSpecialities();
        let ins = await getInsuranceCarriers();
        this.setState({
            specialties: specs.response || [],
            insurances: ins.response || [],
        })
    });
  }

  componentWillUnmount() {
    clearInterval(this.inV);
  }

  render() {
    return (
        <section className="sc-13a0bfj-0 kq342h-1 grxhuE" style={{
            padding: '0px 50px',
            paddingBottom: '20px',
            borderBottom: '1px solid #e1e1e1',
            overflow: 'unset',
        }}>
            <style jsx>{styles}</style>
            <div elementtiming="Search Bar" data-test="search-bar">

                <div data-test="search-bar-form" action="#" className="sc-1vvvv1f-0 goOWki kq342h-2 kUICvz search-bar-form"
                    style={{ display: 'flex', flexDirection: 'row', }}
                >
                    <div className="row" style={{ margin: '0px', flex: 1, }}>
                        <div className="sc-1vvvv1f-2 sc-1vvvv1f-5 kHjjqx col-md-4"
                            style={{ marginBottom: '5px', background: 'rgb(255, 255, 255)', position: 'relative', height: '46px', borderLeft: '0.5px solid #e9e9e9', borderRight: '0.5px solid #e9e9e9', padding: '0px' }}>
                            <div style={{ flex: 1, height: '100%' }}>
                                <div data-dropdown-active="true" data-test="pps-wrapper" className="sc-AxjAm iUsXjw" style={{ height: '100%' }}>
                                    <div className="sc-AxhUy fxWvvr" style={{ position: 'absolute', zIndex: 1, top: '14px', left: '16px', display: 'inline-block' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={19} viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M7.486 2.493c-3.176 0-5.76 2.576-5.76 5.743 0 3.167 2.584 5.743 5.76 5.743 3.175 0 5.759-2.576 5.759-5.743 0-3.167-2.584-5.743-5.76-5.743m6.05 9.997l4.547 4.566-1.788 1.796-4.555-4.575a7.377 7.377 0 0 1-4.253 1.343c-4.083 0-7.404-3.313-7.404-7.384C.082 4.164 3.403.852 7.486.852s7.404 3.312 7.404 7.384a7.33 7.33 0 0 1-1.355 4.254z" /></svg>
                                    </div>
                                    <div className="sc-fzokOt jjHueB" style={{ height: '100%', position: 'relative' }}>
                                        <SelectCustom
                                            field={{
                                                name: "specialityOrName"
                                            }}
                                            name="specialityOrName"
                                            options={this.state.specialties || specialties}
                                            value={this.state.specialityOrName}
                                            inputValue={this.state.specialityOrName}
                                            onChange={(field, value) => {
                                                //console.info(this.state);
                                                //this.setState({specialityOrName: value.value});
                                            }}
                                            onInputChange={(value, ac) => {
                                                if (ac.action === 'input-change') {
                                                    this.setState({specialityOrName: value}, () => console.info(this.state));
                                                }
                                            }}
                                            onBlur={() => {}}
                                            placeholder={"condition, procedure, doctor name..."}
                                            groupstyle={{ margin: "auto", height: '100%' }}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sc-1vvvv1f-2 sc-1vvvv1f-1-styled-div sc-1vvvv1f-6 hEqVFo col-md-4"
                            style={{ padding: '0px', marginBottom: '5px', background: 'rgb(255, 255, 255)', position: 'relative', height: '46px', borderLeft: '0.5px solid #e9e9e9', borderRight: '0.5px solid #e9e9e9' }}>
                            <div data-test="search-bar-location" data-uem-id="location-dropdown" className="s5og22-0 bGHqkD sc-1vvvv1f-4 dLmQZl">

                                <div data-dropdown-active="false" data-test="takeover-input" className="sc-1j3nrry-3 dudtOP">
                                    <div className="sc-1j3nrry-4 KNBcg">
                                        <div className="sc-1j3nrry-5 dPTl" style={{ height: '46px', }}>
                                            <div data-test="location-icon" style={{ position: 'absolute', zIndex: 1, top: '14px', left: '16px', display: 'inline-block' }} className="u4kqa7-0 cHaJHX"><svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} viewBox="0 0 12 20"><path fill="currentColor" fillRule="evenodd" d="M5.888 9.205c-1.87 0-3.387-1.501-3.387-3.353 0-1.851 1.516-3.352 3.387-3.352 1.87 0 3.386 1.501 3.386 3.352 0 1.852-1.516 3.353-3.386 3.353M5.986 0C2.68 0 0 2.653 0 5.926 0 7.682.799 9.35 1.17 10.17L5.488 20h.998l4.316-9.829c.372-.821 1.171-2.427 1.171-4.183C11.972 2.715 9.292 0 5.986 0" /></svg></div>
                                            <input
                                                ref={ref => {this.cityEle = ref}}
                                                value={this.state.city}
                                                onChange={evt => {
                                                    this.setState({city: evt.target.value});
                                                }}
                                                type="text" autoComplete="off" data-test="takeover-input-input" data-uem-id="takeover-input-input" name="location-picker-input" placeholder="zip code or city" className="sc-1j3nrry-6 mMSUn"
                                                style={{ border: 'none', width: '100%', height: '100%', padding: '0px 45px', fontWeight: 500, color: '#757575', outline: 'none', }}
                                            />
                                            <svg data-test="takeover-input-clear-button" hidden className="sc-14oxdvn-0 sc-1ekcas7-0 fxkoKe sc-1j3nrry-7 dsuUvz" viewBox="0 0 40 40"><polygon fill="#00234B" points="40,4 36,0 20,16 4,0 0,4 16,20 0,36 4,40 20,24 36,40 40,36 24,20" /></svg>
                                        </div>
                                        <div hidden className="sc-1j3nrry-8 hYHMkQ" />
                                        <div data-test="takeover-input-cancel-button" hidden className="sc-1j3nrry-9 bhfAqw">
                                            Cancel
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div data-test="insurance-search-field-wrapper" className="sc-1vvvv1f-2 sc-1vvvv1f-1-styled-div sc-1vvvv1f-9 kdMwuv col-md-4"
                            style={{ marginBottom: '5px', background: 'rgb(255, 255, 255)', position: 'relative', height: '46px', borderLeft: '0.5px solid #e9e9e9', borderRight: '0.5px solid #e9e9e9', padding: 0, }}
                        >
                            <div className="ret2d2-0 bBUbAN" data-uem-id="insurance-picker-wrapper">
                                <div data-test="textbox-wrapper" className="f9jwpk-0 jkeClL" style={{ height: '46px', }}>
                                    <div className="f9jwpk-2 hwTuyd" style={{ position: 'absolute', zIndex: 1, top: '14px', left: '16px', display: 'inline-block' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={14} viewBox="0 0 20 14" style={{ marginTop: '4px' }}>
                                            <g fill="currentColor" fillRule="nonzero"><path stroke="currentColor" d="M19.087 1c.228 0 .413.185.413.413v11.565a.413.413 0 0 1-.413.413H.913a.413.413 0 0 1-.413-.413V1.413C.5 1.185.685 1 .913 1h18.174zm-.413.826H1.326v10.74h17.348V1.825z" /><path stroke="currentColor" strokeWidth=".5" d="M10.781 5.13h5.154c.203 0 .368-.184.368-.413 0-.228-.165-.413-.368-.413H10.78c-.203 0-.368.185-.368.413 0 .229.165.413.368.413zM10.781 7.609h5.154c.203 0 .368-.185.368-.413 0-.228-.165-.413-.368-.413H10.78c-.203 0-.368.185-.368.413 0 .228.165.413.368.413zM10.781 10.087h5.154c.203 0 .368-.185.368-.413 0-.228-.165-.413-.368-.413H10.78c-.203 0-.368.185-.368.413 0 .228.165.413.368.413z" /><path d="M6.808 6.458h1.19a.34.34 0 0 1 .34.339v.844a.34.34 0 0 1-.34.34h-1.19v1.23a.34.34 0 0 1-.34.339h-1.01a.34.34 0 0 1-.338-.34V7.98H3.927a.34.34 0 0 1-.34-.339v-.844a.34.34 0 0 1 .34-.34H5.12V5.14a.34.34 0 0 1 .339-.339h1.01a.34.34 0 0 1 .339.34v1.318z" /></g></svg>
                                    </div>
                                    <SelectCustom
                                        field={{
                                            name: "insurance"
                                        }}
                                        name="insurance"
                                        options={this.state.insurances || insurances}
                                        value={this.state.insurance}
                                        onChange={(field, value) => {
                                            console.info(this.state);
                                            this.setState({insurance: value.value});
                                        }}
                                        onBlur={() => {}}
                                        placeholder={"insurance carrier"}
                                        groupstyle={{ margin: "auto", height: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="search-bar-form-button sc-1vvvv1f-1 jHRSnh" style={{ width: '46px', height: '46px', border: 'none', cursor: 'pointer' }}
                        onClick={() => {
                            require('@app/utils/next-routes').Router.pushRoute(`/search?specialityOrName=${this.state.specialityOrName || ''}&insurance=${this.state.insurance || ''}&city=${this.state.city || ''}&lat=${this.state.lat || ''}&lng=${this.state.lng || ''}`)
                        }}
                    >
                        <button data-test="search-bar-search-button" title="Search for doctors" type="submit" className="sc-1vvvv1f-15 VCOyI" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', background: '#fff04b' }}><svg data-test="icon-magnifying-glass" className="sc-14oxdvn-0 inkugi-0 dMtPZB sc-1vvvv1f-16 kzXsYS" viewBox="0 0 38 40" style={{ flex: 1, width: '25px', height: '25px' }}><path d="M37.6,36L26.8,24.7c2.2-2.6,3.6-6,3.6-9.7c0-8.3-6.7-15-15-15s-15,6.7-15,15c0,8.3,6.7,15,15,15c2.5,0,4.8-0.6,6.8-1.7L33.4,40L37.6,36z M4.1,15c0-6.2,5.1-11.3,11.3-11.3S26.7,8.7,26.7,15s-5.1,11.3-11.3,11.3S4.1,21.2,4.1,15z" fill="currentColor" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

export { DoctorSearch };
