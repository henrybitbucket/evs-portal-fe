import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import {
  getDeviceGroups,
  getPiClients,
  getRelatedLogs,
  markViewAll
} from '@app/api/log';
import moment from 'moment';
import 'moment-timezone';
import ReactTooltip from 'react-tooltip';
import { IoMailUnreadOutline } from 'react-icons/io5';
import makeAnimated from 'react-select/animated';
import { Pagination, ProgressLoading, SelectCustom } from '@app/components/Common';
import { getUserPermissions } from "@app/api/user";

const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

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
    :global(.box-filter) {
        @media (max-width: 1024px) {
           display: flex !important;
           flex-direction: column !important;
           align-items: flex-start !important;
        }
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
.db-top-head {
    background: #f1f1f1;
    height: 50px;
    margin: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    font-size: 17px;
    font-weight: 400;
}
.db-top-content {
    width: 100%;
    height: auto;
    margin: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 15px;
    font-size: 17px;
    font-weight: 400;
     @media (max-width: 1024px) {
           height: auto;
           flex-wrap: wrap;
        }
    .db-top-item {
        flex: 1;
        border-left: 3.5px solid #000;
        padding: 0px 15px;
        display: flex;
        flex-direction: column;
        color: #000;
        .db-top-item-title {
            font-size: 17px;
        }
        .db-top-item-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 37px;
            font-weight: 600;
            padding: 10px 0px;
        }
        .db-top-item-desc {
            font-size: 14px;
        }
        &.db-top-item-1 .db-top-item-content {
        }
        &.db-top-item-2 .db-top-item-content {
            color: #00cc66;
        }
        &.db-top-item-3 .db-top-item-content {
            color: #00cc66;
        }
        &.db-top-item-4 .db-top-item-content {
        }
        &.db-top-item-5 {
            .db-top-item-bt {
                flex: 1;
                padding-right: 25px;
                white-space: nowrap;
                font-size: 13px;
                &.odd {
                    color: #00cc66;
                }
            }
            .db-top-item-desc {
                display: flex;
                flex-direction: row;
            }
        }
    }
}
.db-mid-head {
    background: #cce7fe;
    color: #1c4a83;
    height: 50px;
    margin: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 15px;
    font-size: 25px;
    font-weight: 500;
    align-items: center;
}
.db-mid-content {
    //background: #ffe6cc;
    //color: #1c4a83;
    display: flex;
    flex-direction: column;
    //padding: 15px;
    font-size: 15px;
    //font-weight: 500;
    margin: 15px;
    //border: 2px solid #e5b548;
    border-radius: 2px;
    min-height: 250px;
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
    :global(.selected) {
        background-color: coral;
    }
    :global(.multi-select-cid) {
      width: 49%;
      font-size: 14px;
    }
    :global(.checkbox-container) {
      display: flex;
      flexDirection: row;
      align-items: center;
      margin-right: 30px;
      color: #282828;
      >input {
        height: 16px;
        width: 16px;
      }
      >span {
        font-size: 14px;
        font-weight: 500;
      }
    }
  :global(.table-th) {
    background: #f2f3ff !important;
    color: #000000 !important;
    font-weight: 500 !important;
    fontSize: 14px !important;
    width: 180px !important;
    maxWidth: 350px !important;
    padding: 10px !important;
    padding-left: 30px !important;
  }
  :global(.table-td) {
    padding: 10px !important;
    padding-left: 30px !important;
    vertical-align: middle !important;
  }
  :global(.site-title) {
    color: #000000;
    font-size: 20px;
    margin: 15px;
    background: aliceblue;
    height: 60px;
    align-items: center;
    display: flex;
    border-radius: 10px;
    padding-left: 15px;
    font-weight: 500;
  }
  :global(.button-btn) {
    border: unset;
    outline: unset;
    display: flex;
    border-radius: 5px;
    height: 40px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-color: #042ee1;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    width: 150px;
    text-transform: uppercase;
    transition: 0.2s;
    &:hover {
      background-color: #03114e;
      color: #fffe00;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: 0.2s;
    }
  }
  :global(.mark-btn) {
      outline: unset;
      border: unset;
      white-space: nowrap;
      width: 180px !important;
      border: unset;
      outline: unset;
      display: flex;
      border-radius: 5px;
      height: 40px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      background-color: #042ee1;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      width: 150px;
      text-transform: uppercase;
      transition: 0.2s;
  }
  :global(.box-select) {
      flex-direction: row;
      @media(max-width: 768px) {
        flex-direction: column;
        width: 100%;
      }
  }
  :global(.Status) {
      @media(max-width: 768px) {
        margin-bottom: 10px;
      }
  }
  :global(.button-icon) {
    display: flex;
    height: 40px;
    width: 40px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-size: 25px;
    color: #000000;
    border-radius: 50%;
    transition: 0.15s;
    &:hover {
      border-radius: 50%;
      color: #fffe00;
      background: #03114e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: 0.15s;
    }
  }
:global(.pi-status) {
    width: 100px;
    color: #fff;
    background: green;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    padding: 2.5px;
}
:global(.pi-action-td) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 50px !important;
    font-size: 20px;
}
:global(.device-stats-wrapper) {
  display: flex;
  transition: transform 0.4s ease, opacity 0.4s ease;
  will-change: transform;
}

:global(.slide-in) {
  width: auto;
  flex: 2;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

:global(.slide-out) {
  width: 0px;
  overflow: hidden;
  transition: transform 0.4s ease, opacity 0.4s ease;
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
];

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  state = {
    ...this.props,
    alarmKey: Date.now(),
  };

  static getInitialProps = async (args) => {
    const { query: { q, page }, asPath, req, initialState: {} } = args;

    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
    };
  }

  componentDidMount() {
    this.searchGroup();
  }

  searchGroup = async () => {
    const params = {};
    const rp = await getUserPermissions(params);
    this.setState({
      permissions: rp?.response?.results[0]?.permissions || [],
    });
    console.log("permissions", this.state.permissions);
    if (this.state.permissions != null) {
      this.state.permissions.map((p, id) => {
        if (p.name === 'PAGE_DASHBOARD_PERM') {
          this.setState({ dashboardPer: true });
        }
      })
    } else {
      console.log("permissions null");
    }
  }

  render() {
    return (
      <TotPage title={'Dashboard'}>
        {this.state.dashboardPer == true ?
          <>
            <style jsx>{styles}</style>
            <div className="db-top-head">
              <span>Dashboard</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '10px'
              }}
            >
              <div className="db-top-content">
                {/*<div className="db-top-item db-top-item-1">*/}
                {/*  <span className="db-top-item-title">Up time</span>*/}
                {/*  <span className="db-top-item-content">*/}
                {/*    {this.props.uptime > 1 ? this.props.uptime + ' days' : this.props.uptime === 1 ? this.props.uptime + ' day' : ''}*/}
                {/*  </span>*/}
                {/*  <span className="db-top-item-desc">{'Last reboot on: '}{this.props.systemStart?.value || ''}</span>*/}
                {/*</div>*/}
                <div className="db-top-item db-top-item-2">
                  <span className="db-top-item-title">App Server Check</span>
                  <span
                    className="db-top-item-content"
                    style={{ color: this.props.appServerCheck?.status === 'NOT_OK' ? 'red' : '' }}
                  >
                    {this.props.appServerCheck?.status || ''}
                  </span>
                  <span className="db-top-item-desc">
                    {'Disk space (Free): '}{this.props.appServerCheck?.value ? this.props.appServerCheck?.value + ' GB' : 'N/A'}
                  </span>
                  <span className="db-top-item-desc">
                    {'Disk space (Jan 1): '}{this.props.appServerCheck?.prevValue ? this.props.appServerCheck?.prevValue + ' GB' : 'N/A'}
                  </span>
                  <span className="db-top-item-desc">
                    {'IP Address: '}{this.props.appServerCheck?.ipAddress || 'N/A'}
                  </span>
                  <span className="db-top-item-desc" style={{ color: this.props.appServerCheck?.valueCpu > 80 ? 'red' : '' }}>
                    {'CPU: '}{(this.props.appServerCheck?.valueCpu || 0) + '%'}
                  </span>
                  <span className="db-top-item-desc">
                    {'LastUp On: '}{this.props.appServerCheck?.lastUpTime ? moment(this.props.appServerCheck?.lastUpTime).format('YYYY-MM-DD HH:mm:ss') : "N/A"}
                  </span>
                  <span className="db-top-item-desc">
                    {'LastDown On: '}{this.props.appServerCheck?.lastDownTime ? moment(this.props.appServerCheck?.lastDownTime).format('YYYY-MM-DD HH:mm:ss') : "N/A"}
                  </span>
                </div>
                <div className="db-top-item db-top-item-2">
                  <span className="db-top-item-title">Database Check</span>
                  <span
                    className="db-top-item-content"
                    style={{ color: this.props.dbCheck?.status === 'NOT_OK' ? 'red' : '' }}
                  >
                    {this.props.dbCheck?.status || ''}
                  </span>
                  <span className="db-top-item-desc">
                    {'DB Size: '}{!!this.props.dbCheck?.value ? this.props.dbCheck?.value + ' MB' : ''}
                  </span>
                  <span className="db-top-item-desc">
                    {'Disk space (Free): '}{this.props.appServerCheck?.value ? this.props.appServerCheck?.value + ' GB' : 'N/A'}
                  </span>
                  <span className="db-top-item-desc">
                    {'Disk space (LM): '}{this.props.dbCheck?.prevValue ? this.props.dbCheck?.prevValue + ' GB' : 'N/A'}
                  </span>
                  <span className="db-top-item-desc">
                    {'IP Address: '}{this.props.dbCheck?.ipAddress || 'N/A'}
                  </span>
                  <span className="db-top-item-desc" style={{ color: this.props.appServerCheck?.valueCpu > 80 ? 'red' : '' }}>
                    {'CPU: '}{(this.props.appServerCheck?.valueCpu || 0) + '%'}
                  </span>
                  <span className="db-top-item-desc">
                    {'LastUp On: '}{this.props.dbCheck?.lastUpTime ? moment(this.props.dbCheck?.lastUpTime).format('YYYY-MM-DD HH:mm:ss') : "N/A"}
                  </span>
                  <span className="db-top-item-desc">
                    {'LastDown On: '}{this.props.dbCheck?.lastDownTime ? moment(this.props.dbCheck?.lastDownTime).format('YYYY-MM-DD HH:mm:ss') : "N/A"}
                  </span>
                </div>
                <div className="db-top-item db-top-item-3" style={{flex: 'unset', minWidth: '360px'}}>
                  <span className="db-top-item-title">MQTT Broker Check</span>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <span
                      className="db-top-item-content"
                      style={{ color: (!this.props.mqttStatus?.value || this.props.mqttStatus?.value === 'DOWN') ? 'red' : '' }}
                    >
                      {this.props.mqttStatus?.value || "DOWN"}
                    </span>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <div className="db-top-item-desc" style={{fontSize: '12px'}}>
                        {'Last UP on: '}{this.props.mqttStatus?.lastUpTime ? moment(this.props.mqttStatus?.lastUpTime).format('YYYY-MM-DD HH:mm:ss') : ""}
                      </div>
                      <div className="db-top-item-desc" style={{fontSize: '12px'}}>
                        {'Last DOWN on: '}{this.props.mqttStatus?.lastDownTime ? moment(this.props.mqttStatus?.lastDownTime).format('YYYY-MM-DD HH:mm:ss') : ""}
                      </div>
                    </div>
                  </div>
                  <span className="db-top-item-desc">{'MQTT address: '}{this.props.mqttAddress || ""}</span>
                </div>
                {this.state.isMoreDetails && (
                  <div className={`device-stats-wrapper ${this.state.isMoreDetails ? 'slide-in' : 'slide-out'}`}>
                    <div className="db-top-item db-top-item-4">
                      <span className="db-top-item-title">Alarms</span>
                      <span className="db-top-item-content">{this.props.alarms || 0}</span>
                      <span className="db-top-item-desc">0 are critical</span>
                    </div>
                    <div className="db-top-item db-top-item-5">
                      <div
                        style={{ display: 'flex', flexDirection: 'row' }}
                      >
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span className="db-top-item-title">Total Devices</span>
                          <span className="db-top-item-content">{this.props.countDevices?.totalDevices || 0}</span>
                        </div>
                        <div
                          style={{ display: 'flex', flexDirection: 'column', marginLeft: '25px', }}
                        >
                        <span className="db-top-item-title"
                              style={{ marginBottom: '15px', }}>{'MCU: ' + (this.props.countDevices?.totalDevices || 0)}</span>
                          <span className="db-top-item-title"
                                style={{ fontSize: '12px', }}>{'P2 Coupled: ' + (this.props.countDevices?.COUPLED || 0)}</span>
                          <span className="db-top-item-title" style={{
                            fontSize: '12px',
                            color: '#00cc66'
                          }}>{'Online: ' + (this.props.countDevices?.ONLINE || 0)}</span>
                          <span className="db-top-item-title" style={{
                            fontSize: '12px',
                            color: '#ed4c4c'
                          }}>{'Offline: ' + (this.props.countDevices?.OFFLINE || 0)}</span>
                        </div>
                        <div
                          style={{ display: 'flex', flexDirection: 'column', marginLeft: '25px', }}
                        >
                        <span className="db-top-item-title"
                              style={{ marginBottom: '15px', }}>{'Meter: ' + (this.props.countDevices?.totalMeters || 0)}</span>
                          <span className="db-top-item-title"
                                style={{ fontSize: '12px', }}>{'P3 Coupled: ' + (this.props.countDevices?.totalMeterP3Couples || 0)}</span>
                          <span className="db-top-item-title" style={{
                            fontSize: '12px',
                            color: '#ed4c4c'
                          }}>{'Offline: ' + ((this.props.countDevices?.totalMeters || 0) - (this.props.countDevices?.ONLINE || 0))}</span>
                        </div>
                      </div>

                      {/*
                <div className="db-top-item-desc">
                  <div className="db-top-item-bt odd">
                    <span>{'NOT COUPLED:'}</span>
                    <span className="ml-10">{this.props.countDevices?.NOT_COUPLED}</span>
                  </div>
                  <div className="db-top-item-bt">
                    <span>{'COUPLED:'}</span>
                    <span className="ml-10">{this.props.countDevices?.COUPLED}</span>
                  </div>
                  <div className="db-top-item-bt odd">
                    <span>{'ONLINE:'}</span>
                    <span className="ml-10">{this.props.countDevices?.ONLINE}</span>
                  </div>
                  <div className="db-top-item-bt">
                    <span>{'OFFLINE:'}</span>
                    <span className="ml-10">{this.props.countDevices?.OFFLINE}</span>
                  </div>
                </div>
                */}
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'end',
                  width: '130px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "center"
                  }}
                >
                  <i
                    style={{
                      cursor: 'pointer',
                      fontSize: '30px',
                      marginRight: '5px',
                      color: this.state.isMoreDetails ? 'green' : '',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      transform: this.state.isMoreDetails ? 'scale(1.1)' : 'scale(1)'
                    }}
                    className={`${this.state.isMoreDetails ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}`}
                    onClick={() => {
                      this.setState({
                        isMoreDetails: !this.state.isMoreDetails
                      })
                    }}
                  />
                  <div>{'More details'}</div>
                </div>
              </div>
            </div>
            <div className="db-mid-head">
              <span style={{ flex: 1 }}>Alarms</span>
              <button
                className="w-80 ml-15 mark-btn"
                style={{
                  outline: 'unset',
                  border: 'unset',
                }}
                onClick={async () => {
                  const result = await Swal.fire({
                    html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                    icon: 'question',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                  });
                  if (!result || !result.isConfirmed) return;
                  await this.setState({ loading: true })
                  const rp = await markViewAll();
                  await this.setState({ loading: false })
                  await this.fetchData();
                  this.setState({
                    loading: false,
                    alarmKey: Date.now(),
                  });
                }}
              >
                {'Mark View All'}
              </button>
            </div>
            <div className="db-mid-content">
              <AlarmView {...this.props} key={this.state.alarmKey}/>
            </div>
          </>
          : null}

        {/*<div className="db-mid-head">
                    <span>{'Devices'}</span>
                </div>
                <div className="db-mid-content min-height-200">
                    <div
                        className="h-40 flex-row align-items-center font-size-20 font-weight-600"
                        style={{ display: 'flex' }}
                    >
                        <span>{'TOTAL DEVICES:'}</span>
                        <span className="ml-10">{this.state.countDevices?.totalDevices}</span>
                    </div>
                    <div className="h-40 flex-row align-items-center" style={{ display: 'flex' }}>
                        <span>{'NOT COUPLED:'}</span>
                        <span className="ml-10">{this.state.countDevices?.NOT_COUPLED}</span>
                    </div>
                    <div className="h-40 flex-row align-items-center" style={{ display: 'flex' }}>
                        <span>{'COUPLED:'}</span>
                        <span className="ml-10">{this.state.countDevices?.COUPLED}</span>
                    </div>
                    <div className="h-40 flex-row align-items-center" style={{ display: 'flex' }}>
                        <span>{'ONLINE:'}</span>
                        <span className="ml-10">{this.state.countDevices?.ONLINE}</span>
                    </div>
                    <div className="h-40 flex-row align-items-center" style={{ display: 'flex' }}>
                        <span>{'OFFLINE:'}</span>
                        <span className="ml-10">{this.state.countDevices?.OFFLINE}</span>
                    </div>
                </div>*/}
        {this.state.loading ?
          <ProgressLoading
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#00000024',
              transform: 'unset',
            }}
          />
          : null}
      </TotPage>
    );
  }
}


class AlarmView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {

    this.fetchGroup();
    const params = {
      options: {
        repStatus: -999,
        markView: this.state.markView,
        groupId: this.state.groupId,
      },
      limit: 20,
      offset: 0,
    };
    const rp = await getRelatedLogs(params);

    this.setState({
      relatedLogs: rp?.response?.results || [],
      totalRecordsRelatedLog: rp?.response?.totalRows,
      totalPagesRelatedLog: Math.floor(((rp?.response?.totalRows || 0) + 19) / 20),
      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
      pageSizeRelatedLog: 20,
      search: true,
    });
  }

  fetchGroup = async () => {
    const rpGroup = await getDeviceGroups();
    const rpDeviceGroups = [];
    rpGroup?.response?.results.forEach((rp) => {
      const item = {
        value: rp.id,
        label: rp.name,
        remark: rp.remark,
      };
      rpDeviceGroups.push(item);
    });
    this.setState({ rpDeviceGroups })
  }

  render() {
    return (
      <>
        <div
          style={{
            padding: '15px',
            borderBottom: '1px solid #ddd',
            paddingTop: '20px',
            paddingBottom: '20px',
            pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'flex' : 'none',
                flexDirection: 'row',
                alignItems: 'center',
                height: '100%',
                transition: 'all 0.2s ease',
                width: '100%',
                flexWrap: 'wrap'
              }}
              className="box-filter"
            >
              <div
                style={{
                  display: 'flex',
                  marginBottom: '10px',
                  alignItems: 'center'
                }}
              >
                <span style={{ marginLeft: '20px' }}>{'From date:'}</span>
                <input
                  style={{
                    border: '1px solid #e1e1e1',
                    borderRadius: '5px',
                    outline: 'unset',
                    height: '40px',
                    width: 'auto',
                    paddingLeft: '10px',
                    marginLeft: '10px',
                    alignSelf: 'center',
                  }}
                  key={this.state.key1}
                  type="date"
                  value={this.state.searchFromDate}
                  onChange={event => this.setState({ searchFromDate: event.target.value })}
                />
                <span style={{ marginLeft: '20px' }}>{'To date:'}</span>
                <input
                  style={{
                    border: '1px solid #e1e1e1',
                    borderRadius: '5px',
                    outline: 'unset',
                    height: '40px',
                    width: 'auto',
                    paddingLeft: '10px',
                    marginLeft: '10px',
                    alignSelf: 'center',
                  }}
                  key={this.state.key2}
                  type="date"
                  min={this.state.searchFromDate}
                  value={this.state.searchToDate}
                  onChange={event => this.setState({ searchToDate: event.target.value })}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  marginBottom: '10px'
                }}
                className="box-select"
              >
                <SelectCustom
                  field={{
                    name: "Status"
                  }}
                  name="Status"
                  options={[
                    ...(
                      [
                        { name: "NEW", value: '' },
                        { name: "VIEWED", value: 1 },
                      ]
                    ).map(item => ({
                      label: item.name,
                      value: item.value
                    }))
                  ]}
                  className="box-Status"
                  value={this.state.markView || ''}
                  onChange={(field, value) => this.setState({ 'markView': value.value })}
                  groupstyle={{ minWidth: '250px', marginBottom: 'unset', marginLeft: '15px', }}
                />

                <SelectCustom
                  field={{
                    name: "group"
                  }}
                  name="group"
                  key={this.state.rpDeviceGroupsKey}
                  options={[
                    ...(
                      [{ label: 'Select group', value: '' }].concat((this.state.rpDeviceGroups || [])).map(rdg => (
                        { name: rdg.label || ('Group ' + rdg.value), value: rdg.value }
                      ))
                    ).map(item => ({
                      label: item.name,
                      value: item.value
                    }))
                  ]}
                  value={this.state.groupId || ''}
                  onChange={(field, value) => this.setState({ 'groupId': value.value })}
                  groupstyle={{ minWidth: '250px', marginBottom: 'unset', marginLeft: '15px', }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  marginBottom: '10px'
                }}
              >
                <button
                  className="button-btn w-80 ml-15"
                  style={{
                    outline: 'unset',
                    border: 'unset',
                  }}
                  onClick={async () => {
                    const params = {
                      options: {
                        fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                        toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,
                        repStatus: -999,
                        markView: this.state.markView,
                        groupId: this.state.groupId,
                      },
                      limit: 20,
                      offset: 0,
                    };
                    const rp = await getRelatedLogs(params);
                    this.setState({
                      relatedLogs: rp?.response?.results || [],
                      totalRecordsRelatedLog: rp?.response?.totalRows,
                      totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
                      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                      pageSizeRelatedLog: 20,
                      search: true,
                    });
                  }}
                >
                  {'SEARCH'}
                </button>
                <button
                  className="button-btn w-80 ml-15"
                  style={{
                    outline: 'unset',
                    border: 'unset',
                    marginLeft: '15px'
                  }}
                  onClick={async () => {
                    const params = {
                      options: {
                        repStatus: -999,
                        fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                        toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,
                        markView: this.state.markView,
                        groupId: this.state.groupId,
                      },
                      limit: 20,
                      offset: 0,
                    };
                    const rp = await getRelatedLogs(params);
                    this.setState({
                      groupId: '',
                      searchMid: undefined,
                      search: true,
                      searchFromDate: undefined,
                      searchToDate: undefined,
                      relatedLogs: rp?.response?.results || [],
                      totalRecordsRelatedLog: rp?.response?.totalRows,
                      totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
                      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                      pageSizeRelatedLog: 20,
                      key1: Math.random(),
                      key2: Math.random(),
                    });
                  }}
                >
                  {'CLEAR'}
                </button>

                <button
                  className="button-btn w-80 ml-15"
                  style={{
                    outline: 'unset',
                    border: 'unset',
                    minWidth: '150px',
                  }}
                  onClick={async () => {
                    const params = {
                      options: {
                        fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                        toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,
                        repStatus: -999,
                        downloadCsv: true,
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        markView: this.state.markView,
                        groupId: this.state.groupId,
                      },
                      limit: 20,
                      offset: 0,
                    };
                    const url = 'api/logs';
                    const method = 'POST';
                    const rp = await fetch(url, {
                      method,
                      body: JSON.stringify(params),
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    })
                      .then((response) => {
                        return response.blob();
                      });
                    if (rp) {
                      const tag = moment(new Date()).format('YYYYMMDDHHmmss');
                      const fileName = 'logs-' + tag + '.csv';
                      const url = window.URL.createObjectURL(new Blob([rp]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', fileName);
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode.removeChild(link);
                      this.setState({ openExportCsv: false, activateDate: undefined });
                    } else {
                      alert('Something went wrong. Please try again!');
                    }
                  }}
                >
                  {'DOWNLOAD CSV'}
                </button>
              </div>
            </div>
            {!!this.state.totalRecordsRelatedLog &&
            <div style={{ paddingTop: '25px', fontWeight: 500 }}>
              <span>{'Totals: ' + this.state.totalRecordsRelatedLog}</span>
            </div>
            }
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            background: '#fff',
            pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
          }}
          className="doctor-list"
        >
          <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
            <table className="table">
              <thead className="thead-dark">
              <tr>
                <th className="table-th" scope="col">TIME</th>
                <th className="table-th" scope="col">TYPE</th>
                <th className="table-th" scope="col">TOPIC</th>
                <th className="table-th" scope="col">MID</th>
                <th className="table-th" scope="col">MSN</th>
                <th className="table-th" scope="col">SN</th>
                <th className="table-th" scope="col">GROUP</th>
                <th className="table-th" scope="col">COMMAND</th>
                <th className="table-th" scope="col">VIEW MESSAGE</th>
                <th className="table-th" scope="col">STATUS</th>
              </tr>
              </thead>
              <tbody>
              {(this.state.relatedLogs || [])
                .map((it, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                        color: '#000000',
                      }}
                      onClick={() => {
                        if (!this.state.showRawMessage) {
                          this.setState({ selectedLog: index });
                        }
                      }}
                    >
                      <td className="table-td">
                        {moment(it.createDate).format('DD-MM-YY HH:mm:ss')}
                      </td>
                      <td className="table-td">
                        {it.type}
                      </td>
                      <td className="table-td">
                        {it.topic}
                      </td>
                      <td className="table-td">
                        <span>{it.mid || it.oid || it.rmid}</span>
                      </td>
                      <td className="table-td">
                        {it.msn}
                      </td>
                      <td className="table-td">
                        {it.sn}
                      </td>
                      <td className="table-td">
                        {it.group?.id ? (it.group.name || ('Group ' + it.group.id)) : ''}
                      </td>
                      <td className="table-td">
                        <span>{it.ptype}</span>
                      </td>
                      <td style={{ padding: '3px', paddingLeft: '30px' }}>
                        <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                        <div
                          className="button-icon ml-15"
                          data-tip="Click to see raw message"
                          onClick={() => {
                            if (!this.state.showRawMessage) {
                              this.setState({
                                showRawMessage: true,
                                rawMessage: it.raw,
                              });
                            }
                          }}
                        >
                          <IoMailUnreadOutline/>
                        </div>
                      </td>
                      <td className="table-td">
                        <span>
                          {it.repStatus === 0 ? 'OK'
                            : it.repStatus === 1 ? 'Invalid Format'
                              : it.repStatus === 2 ? 'Invalid Command'
                                : it.repStatus === 3 ? 'Invalid Signature'
                                  : it.repStatus === 4 ? 'Decryption Failed'
                                    : it.repStatus === 5 ? 'Invalid Configuration'
                                      : it.repStatus === 8 ? 'Failed send to device (Gateway)'
                                        : it.repStatus === 9 ? 'General Error'
                                          : 'NO RESPONSE'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              className="row mt-3"
              style={{
                marginLeft: '0px',
                marginRight: '0px',
              }}
            >
              <div className="col-sm-12 col-md-5">
              </div>
              <div
                className="col-sm-12 col-md-7 pagination"
                style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
              >
                {this.state.totalRecordsRelatedLog > this.state.pageSizeRelatedLog && this.state.totalPagesRelatedLog >= 2 &&
                <Pagination
                  href={this.props.asPath.replace(/\?.*/g, '')}
                  totalRecords={this.state.totalRecordsRelatedLog}
                  totalPages={this.state.totalPagesRelatedLog}
                  onPageChanged={async (query) => {
                    const params = {
                      options: {
                        fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                        toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,
                        repStatus: -999,
                        markView: this.state.markView,
                        groupId: this.state.groupId,
                      },
                      limit: 20,
                      offset: (query.pageIndex - 1) * 20,
                    };
                    const rp = await getRelatedLogs(params);
                    this.setState({
                      relatedLogs: rp?.response?.results || [],
                      totalRecordsRelatedLog: rp?.response?.totalRows,
                      totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
                      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                      pageSizeRelatedLog: 20,
                      search: true,
                    });
                  }}
                  pageIndex={this.state.pageIndexRelatedLog}
                  pageSize={this.state.pageSizeRelatedLog}
                  styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                />
                }
              </div>
            </div>
          </div>
        </div>
        {!!this.state.showRawMessage && (
          <div
            style={{
              backgroundColor: '#fff',
              position: 'fixed',
              top: '30%',
              left: '35%',
              zIndex: 10,
              width: '30%',
              height: '40%',
              borderRadius: '5px',
              padding: '30px 30px 15px 30px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
              color: '#000000',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontWeight: 500, fontSize: '18px' }}>{'Raw Message'}</span>
            <span style={{ overflow: 'auto', width: '100%', height: '60%' }}>{this.state.rawMessage}</span>
            <button
              className="button-btn w-80"
              style={{
                alignSelf: 'center',
                border: 'unset',
                outline: 'unset',
              }}
              onClick={() => {
                this.setState({ showRawMessage: false, rawMessage: undefined });
              }}
            >
              {'Close'}
            </button>
          </div>
        )}
      </>
    )
  }
}

class MeterClientView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // this.search();
    // this.intv = setInterval(async () => {
    //   this.search();
    // }, 1500)
  }

  componentWillUnmount() {
    clearInterval(this.intv);
  }

  search = async () => {
    const params = {
      limit: this.state.limit || 20,
      offset: this.state.offset || 0,
    };
    const rp = await getPiClients(params);
    this.setState({
      relatedLogs: rp?.results || [],
      totalRecordsRelatedLog: rp?.totalRows,
      totalPagesRelatedLog: Math.floor(((rp.totalRows || 0) + 19) / 20),
      pageIndexRelatedLog: Math.floor((rp?.offset + 19) / 20) + 1,
      pageSizeRelatedLog: 20
    });
  }

  render() {
    return (
      <>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            background: '#fff',
            pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
          }}
          className="doctor-list"
        >
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
            <table className="table">
              <thead className="thead-dark">
              <tr>
                <th className="table-th" scope="col">IP Address</th>
                <th className="table-th" scope="col">Public IP Address</th>
                <th className="table-th" scope="col">STATUS</th>
                <th className="table-th" scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {(this.state.relatedLogs || [])
                .map((it, index) => {
                  let off = (Date.now() - (it.lastPing || 0)) > (3 * 60 * 1000);
                  return (
                    <tr
                      key={index}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                        color: '#000000',
                      }}
                      onClick={() => {
                        if (!this.state.showRawMessage) {
                          this.setState({ selectedLog: index });
                        }
                      }}
                    >
                      <td className="table-td">
                        {(it.uuid || '').split('-')[0]}
                      </td>
                      <td className="table-td">
                        {(it.uuid || '').split('-')[1]}
                      </td>
                      <td className="table-td">
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                          <div className='pi-status' style={{ background: !off ? 'green' : 'red' }}>
                            <span>{off ? 'Offline' : 'Online'}</span>
                          </div>
                          {<span style={{ marginLeft: '10px', fontSize: '12px', }}>
                            {'Last seen ' + moment(it.lastPing).format('DD-MM-YY HH:mm:ss')}
                          </span>}
                        </div>
                      </td>
                      <td className="table-td pi-action-td">
                        {off && <div
                          className="fa fa-trash"
                          data-tip="Click to hide"
                          onClick={async () => {
                            this.props.pingPi(it.uuid);
                          }}
                        >
                        </div>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              className="row mt-3"
              style={{
                marginLeft: '0px',
                marginRight: '0px',
              }}
            >
              <div className="col-sm-12 col-md-5">
              </div>
              <div
                className="col-sm-12 col-md-7 pagination"
                style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
              >
                {this.state.totalRecordsRelatedLog > this.state.pageSizeRelatedLog && this.state.totalPagesRelatedLog >= 2 &&
                <Pagination
                  href={this.props.asPath.replace(/\?.*/g, '')}
                  totalRecords={this.state.totalRecordsRelatedLog}
                  totalPages={this.state.totalPagesRelatedLog}
                  onPageChanged={async (query) => {
                    this.setState({
                      limit: 20,
                      offset: (query.pageIndex - 1) * 20,
                    }, () => {
                      this.search();
                    })
                  }}
                  pageIndex={this.state.pageIndexRelatedLog}
                  pageSize={this.state.pageSizeRelatedLog}
                  styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                />
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

Homepage = require('react-redux').connect((state, ownProps) => {

    const systemStart = state.header?.systemInformation?.find(f => f.key === 'SYSTEM_START');
    const dbCheck = state.header?.systemInformation?.find(f => f.key === 'DB_CHECK');
    const serverCertificate = state.header?.systemInformation?.find(f => f.key === 'SERVER_CERTIFICATE');
    const uptime = Math.round((new Date().getTime() - new Date(systemStart?.value).getTime()) / (24 * 60 * 60 * 1000)) + 1
    const appServerCheck = state.header?.systemInformation?.find(f => f.key === 'APP_SERVER_STATUS');

    return {
      alarms: state.header?.alarms || 0,
      mqttStatus: state.header?.mqttStatus,
      mqttAddress: state.header?.mqttAddress,
      systemStart: systemStart,
      dbCheck: dbCheck,
      serverCertificate: serverCertificate,
      uptime: uptime,
      countDevices: state.header?.countDevices,
      appServerCheck,
    }
  },
  (dispatch) => ({
    dispatch
  }))(Homepage);
export default withNamespaces('common')(Homepage);
