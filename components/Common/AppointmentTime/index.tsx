import React from 'react';
import Highlighter from 'react-highlight-words';
import css from 'styled-jsx/css';
import { IBasicComponentProps } from '@app/components/Types';
import { styleForSuggestions } from './styles';
import moment from 'moment';
import ModernDatepicker from 'react-modern-datepicker';
import { SelectCustom } from '@app/components/Common';

import { getSpecialities, getInsuranceCarriers } from '@app/api/common';

const formatDate = (date) => {
    date = new Date(date.substring(0, 19));
    let arr = date.toDateString().split(' ');
    let h = date.getHours();
    let m =  date.getMinutes();
    let amOrPm = h >= 12 ? 'pm' : 'am';
    h = h > 12 ? (h - 12) : h;
    return arr[0] + ', ' + arr[1] + ' ' + arr[2] + ' - ' + (h > 9 ? '' : '0') + h + ':' + (m > 9 ? '' : '0') + m + ' ' + amOrPm;
}

const styles = css`
    :global(.time-body-wrap) {
        height: 100%;
        display: flex;
        flex-direction: column;
        max-width: 400px;
        //width: 400px;
        height: 400px;
        background: #ffffff;
        margin: auto;
        margin-top: 50px;
        border-radius: 5px;
        padding: 15px;
        position: relative;
    }
    :global(.time-group-item-header) {
        display: flex;
        flex-direction: column;
        flex: 1;
        color: rgb(0, 35, 75);
        font: 15px / 20px sharp-sans-semibold, Arial, sans-serif;
        text-align: center;
        font-weight: 500;
        margin-bottom: 15px;
        position: relative;
    }
    :global(.time-body-wrap-header) {
        display: flex;
        flex-direction: row;
        position: relative;
    }
    :global(.time-item) {
        text-align: center;
        -webkit-box-align: center;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        font: 13px / 1 sharp-sans-semibold, Arial, sans-serif;
        height: 32px;
        min-height: 32px;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 0px;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        animation: 0.1s ease-out 0s 1 normal forwards running hKJDIw;
        cursor: pointer;
        background-color: rgb(255, 240, 75);
        border: 1px solid rgb(255, 240, 75);
        color: rgb(0, 35, 75);
        margin: 5px;
    }
    .bfeoZU-L {
        -webkit-box-align: center;
        align-items: center;
        background-color: transparent;
        border-radius: 50%;
        border: none;
        display: flex;
        flex: 0 0 36px;
        font-size: 14px;
        height: 36px;
        -webkit-box-pack: center;
        justify-content: center;
        margin: 0px auto;
        outline: none;
        padding: 0px;
        cursor: pointer;
        position: absolute;
        left: -5px;
        z-index: 1;
    }
    .bfeoZU-R {
        -webkit-box-align: center;
        align-items: center;
        background-color: transparent;
        border-radius: 50%;
        border: none;
        display: flex;
        flex: 0 0 36px;
        font-size: 14px;
        height: 36px;
        -webkit-box-pack: center;
        justify-content: center;
        margin: 0px auto;
        outline: none;
        padding: 0px;
        cursor: pointer;
        position: absolute;
        right: -5px;
        z-index: 1;
    }
    .bt-close {
        position: absolute;
        right: -5px;
        top: -5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
        padding-left: 2px;
        padding-bottom: 2px;
    }
    .time-body {
        display: flex;
        flex-direction: row;
        flex: 1;
        overflow: auto;
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
        :global(.time-body-wrap) {
            max-width: calc(100% - 30px);
        }
    }
`

class AppointmentTime extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
        times: [],
        index: 0,
    };

    let data = this.props.availabilities || {'empty': []};
    let dates = Object.keys(data);

    let lastDate = new Date();
    let times = [];
    for (let i = 0; i < dates.length; i = i + 3) {

        let groups = [];
        for (let j = 0; j < 3; j++) {
            let d = dates[i + j];
            if (d) {
                lastDate = new Date(d)
            } else if (lastDate) {
                lastDate.setDate(lastDate.getDate() + 1);
            }
            let arr = new Date(d).toDateString().split(' ');

            let g = {
                dayOfWeek: arr[0],
                month: arr[1],
                day: arr[2],
            }
            g.items = [];
            (data[d] || []).map(it => {
                let date = new Date(it.substring(0, 19));
                let h = date.getHours();
                let m =  date.getMinutes();
                let amOrPm = h >= 12 ? 'pm' : 'am';
                h = h > 12 ? (h - 12) : h;
                g.items.push({
                    label: (h > 9 ? '' : '0') + h + ':' + (m > 9 ? '' : '0') + m + ' ' + amOrPm,
                    value: it,
                })
            })
            groups.push(g);
        }
        times.push({groups})
    }
    this.state.times = times;
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let time = this.state.times[this.state.index || 0] || {};
    return (
        <div className='time-body-wrap'>
            <style jsx>{styles}</style>
            <div className='time-body-wrap-header'>
                {(time.groups || [])
                    .map((g, gIndex) => {
                        return (
                            <div key={gIndex} className='time-group-item-header'>
                                <span>{g.dayOfWeek}</span>
                                <span>{g.month + ' ' + g.day}</span>
                            </div>
                        )
                    })
                }
                <button data-test="desktop-controls-left-arrow" className="bfeoZU-L"
                    onClick={() => {
                        this.state.index = this.state.index || 0;
                        if (this.state.index > 0) {
                            this.setState({
                                index: this.state.index - 1,
                            })
                        }
                    }}
                >
                    <svg style={{width: '10px',}} data-test="icon-arrow-left" className="_base__Icon-sc-14oxdvn-0 Arrow__LeftArrowSVG-kt5wwf-1 bVyuVH DesktopControlsView__StyledArrow-sc-1tiewj-6 ZeKDJ" viewBox="0 0 26 40"><polygon fill="#00234B" points="20.3,40 25.7,34.5 11.2,20 25.7,5.5 20.3,0 0.3,20" /></svg>
                </button>
                <button data-test="desktop-controls-right-arrow" className="bfeoZU-R"
                    onClick={() => {
                        this.state.index = this.state.index || 0;
                        if (this.state.index < (this.state.times || '').length - 1) {
                            this.setState({
                                index: this.state.index + 1,
                            })
                        }
                    }}
                >
                    <svg style={{width: '10px',}} data-test="icon-arrow-right" className="_base__Icon-sc-14oxdvn-0 Arrow__LeftArrowSVG-kt5wwf-1 bVyuVH DesktopControlsView__StyledArrow-sc-1tiewj-6 ejUXe" viewBox="0 0 26 40"><polygon fill="#00234B" points="5.7,40 0.3,34.5 14.8,20 0.3,5.5 5.7,0 25.7,20" /></svg>
                </button>
            </div>
            <div className='time-body'>
                {(time.groups || [])
                    .map((g, gIndex) => {
                        return (
                            <div key={gIndex + '_'} style={{display: 'flex', flexDirection: 'column', flex: 1,}}>
                                {
                                    g.items
                                    .map((it, iIndex) => {
                                        return (
                                            <div key={iIndex} className='time-item'
                                                onClick={() => {
                                                    this.props.onSelect && this.props.onSelect(it);
                                                }}
                                            >
                                                <span>{it.label}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )

                    })
                }
            </div>
            <div className='bt-close'
                onClick={() => {
                    this.props.onClose && this.props.onClose();
                }}
            >
                <i className='fa fa-close'/>
            </div>
        </div>
    );
  }
}

export { AppointmentTime };
