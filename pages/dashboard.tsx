import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import { PublicFooter } from '@app/components/Footer/PublicFooter';
import { PublicHeader } from '@app/components/Header/PublicHeader';
import { ProgressLoading } from '@app/components/Common';
import { Chart } from "react-google-charts";
import { GoogleMap, Marker, InfoWindow, withGoogleMap } from "react-google-maps";
import { AppointmentTime } from '@app/components/Common/AppointmentTime';
import 'moment-timezone';
import TreeView from 'react-treeview';
import { getLogs, getDevices, getPiUploads, getGatewayDevices, getServerStatus, getRMServers, sendCommand } from '@app/api/log';

const Swal = require('sweetalert2');

const formatMac = (mac) => {
    let tempMac = mac.toUpperCase().replace(/\:/g, '');
    mac = '';
    for (let i = 0; i < tempMac.length; i++) {
        if (i % 2 == 0 && i > 0 && (i != tempMac.length - 1)) {
            mac += ":";
        }
        mac += tempMac[i];
    }

    return mac;
}

const getDeviceType = (type) => {
    if (type === 'SMART_SOCKET') return 'Socket';
    if (type === 'BPL_PLUG') return 'Plug';
    if (type === 'ZWAVE_ZIGBEE_SENSOR') return 'Zwave';
    return 'Unknow';
}

const styles = css`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  :global(body) {
    padding: 0px;
    height: 100%;
  }
  :global(#__next) {
    height: 100%;
  }
  :global(#__next > div) {
    height: 100%;
  }

    :global(.page) {
        display: flex !important;
        flex-direction: column !important;
    }
    :global(.p-card) {
        display: flex !important;
        flex-direction: column !important;
        flex: 1 !important;
    }

  :global(.page-content) {
    padding: 0px;
    padding: 0px;
    height: 101%;
    background: #f3f3f4;
  }
  .dashboard {
    .check-in-box {
      .action{
        a {
          display:block;
          float:left;
        }
        span {
          float:right;
          width:unset;
        }
      }
    }
    .panel-hide {
      opacity: 0;
      visibility: hidden;
    }
    .panel-show {
      opacity: 1;
      visibility: unset;
    }
  }
  :global(.g-info-window h3) {
    margin-top: 10px !important;
  }

  :global(div[data-test='doctor-card-info-rating'] > div) {
    align-items: center !important;
  }
  :global(div[data-test='doctor-card-info-location']) {
    font-size: 17px !important;
    color: #111 !important;
    font-weight: 400 !important;
  }

  :global(a[data-test='doctor-card-info-name'] h3) {
    font-weight: 500 !important;
    font-size: 18px !important;
  }

  *[data-test='doctor-card-info-rating-review'] {
    color: #333;
    font-size: 14px;
  }
  *[data-test='regular-text-section'] {
    width: 90%;
  }

  :global(div[data-test='doctor-card-info-rating-number']) {
    margin-left: 5px !important;
  }

  @include media-breakpoint-down(sm){
    :global(#toast-container) {
      top: 76px;
      left: 10px;
      right: 10px
      & :global(.toast-info) {
        width: 100%;
      }
    }
  }

  .lfZhxT {
      -webkit-box-align: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      font: 13px / 1 sharp-sans-semibold, Arial, sans-serif;
      height: 32px;
      -webkit-box-pack: center;
      justify-content: center;
      padding: 0px;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      animation: 0.1s ease-out 0s 1 normal forwards running ehLtDs;
      cursor: pointer;
      background-color: rgb(255, 240, 75);
      border: 1px solid rgb(255, 240, 75);
      color: rgb(0, 35, 75);
      margin-top: 8px;
      width: 70px;
      margin-left: 5px;
      text-align: center;
  }
    .aqxfE {
        -webkit-box-align: center;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        font: 13px / 1 sharp-sans-semibold, Arial, sans-serif;
        height: 32px;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 0px;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        animation: 0.1s ease-out 0s 1 normal forwards running ehLtDs;
        background-color: rgb(255, 240, 75);
        color: rgb(0, 35, 75);
        border: 0px;
        cursor: pointer;
        width: 100%;
        margin-top: 8px;
    }
    :global(.qDvlK > svg) {
        width: 20px;
        height: 20px;
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        margin-right: 7px;
        vertical-align: middle;
        background-repeat: no-repeat;
        position: initial;
    }
    :global(.qDvlK) {
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(43, 191, 237);
        font: 15px / 24px sharp-sans-semibold, Arial, sans-serif;
    }

    :global(.tree-view_arrow) {
        -moz-transition: all 0.1s;
        -o-transition: all 0.1s;
        -ms-transition: all 0.1s;
        -webkit-transition: all 0.1s;
        transition: all 0.1s;
    }

    :global(.tree-view_arrow-empty) {
      color: yellow;
    }

    :global(.tree-view_arrow) {
        width: 15px !important;
    }

    :global(.tree-view_item > span > i) {
        margin-right: 5px !important;

    }
    :global(.tree-view_item) {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        flex-wrap: nowrap;
        white-space: nowrap;

    }
    :global(.tree-view_children) {
        margin-top: 5px !important;
        margin-left: 20px !important;
    }

    :global(.tree-view_arrow:after) {
        font-size: 22px;
    }
    :global(.btn-link-app) {
        background-color: rgb(38, 166, 154);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 2.5px;
        font-weight: 400;
        cursor: pointer;
        width: 180px;
    }
    :global(.btn-edit) {
        background-color: #2196F3;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 2.5px;
        font-weight: 400;
        cursor: pointer;
        width: 80px;
        margin-right: 5px;
    }
    :global(.btn-remove) {
        background-color: #ec407a;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 2.5px;
        font-weight: 400;
        cursor: pointer;
        width: 100px;
    }
    .chartWithOverlay {
       position: relative;
       width: 700px;
    }
    .overlay {
       width: 200px;
       height: 200px;
       position: absolute;
       top: 60px;   /* chartArea top  */
       left: 180px; /* chartArea left */
    }
    .db-top {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      .db-top-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 30px;
        margin-left: 50px;
        border-left: 3px solid #000;
        padding-left: 15px;
        .label {
          color: #000;
          font-size: 20px;
          font-weight: 500;
        }
        .num {
          color: #000;
          font-size: 60px;
          font-weight: 500;
        }
        .desc {
          color: red;
          font-size: 20px;
          font-weight: 400;
        }
      }
    }
    .db-mid {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      background: #99ccff;
      padding: 15px;
      margin-top: 30px;
      .label {
        color: #005ebd;
        font-size: 20px;
        font-weight: 500;
      }
      .db-mid-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-right: 25px;
        :global(.form-group) {
          margin-bottom: 0;
          width: 100%;
        }
      }
    }
    .db-bottom {
      display: flex;
      flex-direction: row;
      padding: 15px;
      .db-bottom-left {
        flex: 2;
      }
      .db-bottom-right {
        flex: 1;
        min-width: 400px;
        .title {
          color: #000;
          font-size: 20px;
          font-weight: 500;
          border-bottom: 2px solid #aaa;
          width: 100%;
          min-width: 100%;
          margin-top: 20px;
        }
        .note {
          color: #000;
          font-size: 20px;
          font-weight: 500;
          width: 100%;
          min-width: 100%;
          margin-top: 20px;
        }
        .db-bottom-right-item {
          padding-left: 10px;
          .wrap {
            background: #e9ecef;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 25px;
          }
          .label {
            color: #000;
            font-size: 15px;
            font-weight: 500;
            margin-top: 10px;
          }
          .num {
            background: #0085fc;
            color: #fff;
            text-align: center;
            padding: 5px;
            min-width: fit-content;
          }
        }
      }
    }
`;

interface IDashboardPageState {

}

const emptyNode = [
    {
        id: 1000,
        label: "Devices",
        parentId: null,
    },
    {
        id: 2000,
        label: "Gateways",
        parentId: null,
    },
]

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
    constructor(props) {
        super(props);
        this.state.node = {items: []};
        this.state.offset = 0;
        this.state.gs = [];
        this.state.isShowLoadMore = false;
        this.state.results = [];
        this.state.keyword = "";
        this.state.o = {};
        this.state.a = [];
    }


    static getInitialProps = async (args) => {
        let { query: { q, page, gatewayId, type, deviceId}, asPath, req, initialState: {} } = args;

        return {
            namespacesRequired: ['common'],
            asPath,
            useTemplate: true,
            loginRequire: true,
        };
    }
    state = {
        ...this.props,
        topItems: [
          {label: "Total Deployments", num: "63", desc: "26 are offline"},
          {label: "Total Defined IPCs", num: "590", desc: "56 are disabled"},
          {label: "Total ....", num: "999", desc: "20 are ......."},
        ],
        bottomItems: [
          {label: "NO Error", num: "85"},
          {label: "Unable to Connect to dB", num: "10"},
          {label: "Unsupported", num: "1"},
          {label: "Out of Coverage", num: "1"},
        ]
    };

    componentDidMount() {
    }

    componentWillUnmount = () => {
    }

    render() {

        return (
            <TotPage title={'Dashboard'}>
                <style jsx>{styles}</style>
                <div className="db-top">
                    {this.state.topItems.map((it, i) => {
                      return (
                        <div
                          key={i}
                          className="db-top-item"
                        >
                          <span className="label">{it.label}</span>
                          <span className="num">{it.num}</span>
                          <span className="desc">{it.desc}</span>
                        </div>
                      )
                    })}
                </div>
                <div className="db-mid">
                    <div className="db-mid-item">
                      <span className="label">{'GLDB Access Report'}</span>
                    </div>
                    <div className="db-mid-item">
                        <SelectCustom
                            field={{
                                name: "date"
                            }}
                            name="date"
                            options={[
                                ...(
                                    this.state.dates || [
                                        { name: "Last 30 days", value: '-1' },
                                    ]
                                ).map(item => ({
                                    label: item.name,
                                    value: item.value
                                }))
                            ]}
                            value={'-1'}
                            onChange={(field, value) => {}}
                            groupstyle={{  }}
                        />
                    </div>
                    <div className="db-mid-item">
                        <SelectCustom
                            field={{
                                name: "date"
                            }}
                            name="date"
                            options={[
                                ...(
                                    this.state.dates || [
                                        { name: "2021-09-01", value: '-1' },
                                    ]
                                ).map(item => ({
                                    label: item.name,
                                    value: item.value
                                }))
                            ]}
                            value={'-1'}
                            onChange={(field, value) => {}}
                            groupstyle={{  }}
                        />
                    </div>
                    <div className="db-mid-item">
                        <SelectCustom
                            field={{
                                name: "date"
                            }}
                            name="date"
                            options={[
                                ...(
                                    this.state.dates || [
                                        { name: "2021-09-30", value: '-1' },
                                    ]
                                ).map(item => ({
                                    label: item.name,
                                    value: item.value
                                }))
                            ]}
                            value={'-1'}
                            onChange={(field, value) => {}}
                            groupstyle={{  }}
                        />
                    </div>
                </div>
                <div className="db-bottom">
                    <div className="db-bottom-left">
                        <Chart
                          width={'100%'}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                              ['Year', 'Expenses'],
                              ['2004',  400],
                              ['2005',  460],
                              ['2006',  1120],
                              ['2007',  540]
                          ]}
                          options={{
                            title: 'GLDB Read Operations Over Time',
                            legend: { position: 'bottom' },
                            height: 700,
                            hAxis: {
                              slantedText:true,
                              slantedTextAngle:90,
                              marginBottom: '100px',
                            },
                            axes: {
                              x: {
                                0: {side: 'bottom'}
                              }
                            }
                          }}

                        />
                    </div>
                    <div className="db-bottom-right">
                        <div className="title">GLDB Access Errors</div>
                        {this.state.bottomItems.map((it, i) => {
                          return (
                            <div
                              key={i}
                              className="db-bottom-right-item"
                            >
                              <div className="label">{it.label}</div>
                              <div className="wrap">
                                <div className="wrapNum">
                                  <div className="num"
                                    style={{
                                      width: it.num + '%',
                                    }}
                                  >
                                    {it.num + '%'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <div className="note">Note : One bar for each type of error</div>
                    </div>
                </div>
            </TotPage>
        );
    }
}

export default withNamespaces('common')(Homepage);
