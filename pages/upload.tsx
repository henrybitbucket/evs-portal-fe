import React, {useRef} from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import {
  editDevice,
  getAllDevices,
  getRelatedLogs,
  sendCommand,
  getMeterLogs,
  getDeviceGroups,
  editGroup,
  getPiLogs,
  getFloorLevels,
  getBuildingUnits,
  getBuilding,
} from '@app/api/log';
import { Pagination, ProgressLoading, SelectCustom, Radio } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import ReactTooltip from 'react-tooltip';
import { Chart } from 'react-google-charts';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {getUserPermissions, getUsers} from '@app/api/user';
import { IoMailUnreadOutline } from 'react-icons/io5';
import DatePicker from "react-datepicker";
const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

if (typeof window === 'object') {
  window.moment = moment;
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
`;

interface IDashboardPageState {

}

const statusList = [
  { value: '', label: 'Select status...' },
  { value: 'NOT_COUPLED', label: 'NOT COUPLED' },
  { value: 'COUPLED', label: 'COUPLED' },
  { value: 'ONLINE', label: 'ONLINE' },
  { value: 'OFFLINE', label: 'OFFLINE' },
];

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {

  static getInitialProps = async (args) => {
    const {
      query: {
        q,
        page,
        fromDate,
        toDate,
        status,
        querySn,
        queryMsn,
        queryEsimId,
        queryUuid,
        queryGroup,
        queryEnrollmentDate,
        queryCoupledDate,
        queryActivationDate,
        queryDeactivationDate,
        queryAllDate,
      },
      asPath, req, initialState: {},
    } = args;
    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        status: !!status ? status : undefined,
        fromDate: !!fromDate ? new Date(fromDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        toDate: !!toDate ? new Date(toDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        queryEsimId: !!queryEsimId ? queryEsimId : undefined,
        queryUuid: !!queryUuid ? queryUuid : undefined,
        queryGroup: !!queryGroup ? queryGroup : undefined,
        queryEnrollmentDate,
        queryCoupledDate,
        queryActivationDate,
        queryDeactivationDate,
        queryAllDate,
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };

    let rp = await getAllDevices(params, req);
    rp = rp || {};
    rp.response = rp.response || {};

    const rpGroup = await getDeviceGroups();
    const groupList = [{ value: '', label: 'Select group...' }];
    rpGroup?.response?.results?.forEach((gr) => {
      const item = {
        value: gr.id,
        label: gr.name,
      };
      groupList.push(item);
    });
    let slStatus;
    if (!!status) {
      const result = statusList.filter(st => st.value === status);
      if (result.length > 0) {
        slStatus = result[0];
      }
    }
    let slGroup;
    if (queryGroup != null && queryGroup != undefined) {
      const result = groupList.filter(gr => gr.value === parseInt(queryGroup));
      if (result.length > 0) {
        slGroup = result[0];
      }
    }

    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      logs: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
      pageIndex: pageNumber,
      pageSize: 20,
      page,
      devices: rp.response.results?.filter(device => device.uid !== 'server.csr'),
      asPath,
      selectedStatus: slStatus,
      fromDate: params.options.fromDate ? moment(params.options.fromDate).format('YYYY-MM-DD') : undefined,
      toDate: params.options.toDate ? moment(params.options.toDate).format('YYYY-MM-DD') : undefined,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      selectedGroup: slGroup,
      searchUuid: params.options.queryUuid,
      searchEsimId: params.options.queryEsimId,
      checkbox: {
        enrollmentDate: params.options.queryEnrollmentDate,
        coupledDate: params.options.queryCoupledDate,
        activationDate: params.options.queryActivationDate,
        deactivationDate: params.options.queryDeactivationDate,
        all: params.options.queryAllDate,
      },
      groupList,
      statusList,
      loading: false,
    };
  }
  state = {
    ...this.props,
    tempFromDate: '',
    deToDate: '',
    proFromDate: '',
    proToDate: '',
  };
  constructor(props) {
    super(props);
  }

  sendCommand = async (uid, cmd, type) => {
    const response = await sendCommand({ uid, cmd, type });
    if (response.success) {
      const mid = response.response;
      this.setState({ loading: false });
      const params = {
        options: {
          uid,
          msn: this.state.selectedData.msn,
          ptype: cmd,
        },
        limit: 20,
        offset: 0,
      };
      const rp = await getRelatedLogs(params);
      this.setState({
        relatedLogs: rp?.response?.results || [],
        totalRecordsRelatedLog: rp?.response?.totalRows,
        totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
        pageIndexRelatedLog: (rp?.response?.offset + 19) / 20 + 1,
        pageSizeRelatedLog: 20,
      });
      Swal.fire({
        html: `<p style='text-align: center; font-size: 14px;'>${'MID ' + mid + ' is sent successfully. Check process logs for more information.'}</p>`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      this.setState({ loading: false });
      Swal.fire({
        html: `<p style='text-align: center; font-size: 14px;'>${response.errorDescription || response.message}</p>`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  getRemarkValue = (deviceGroups) => {
    let remark = '';
    deviceGroups.forEach(r => {
      if (r.value === this.state.detailsData.group?.id) {
        remark = r.remark;
      }
    });
    return remark;
  }

  componentDidMount(){
    this.searchGroup();
  }

  searchGroup = async () => {
    const params = {
    };
    const rp = await getUserPermissions(params);
    this.setState({
      permissions: rp?.response.results[0].permissions || [],
    });
    console.log("permissions",this.state.permissions);
    if(this.state.permissions != null) {
      this.state.permissions.map((p, id) => {
        if (p.name === 'PAGE_DEVICES_UPLOAD_DEVICE_CSR_BUTTON_PERM') {
          this.setState({deviceCsrButton: true});
        }
        if (p.name === 'PAGE_DEVICES_GET_TCM_INFO_BUTTON_PERM') {
          this.setState({getTcmButton: true});
        }
        if (p.name === 'PAGE_DEVICES_SHOW_METER_CHART_BUTTON_PERM') {
          this.setState({meterChartButton: true});
        }
        if (p.name === 'PAGE_DEVICES_SET_TIME_INTERVAL_BUTTON_PERM') {
          this.setState({timeIntervalButton: true});
        }
        if (p.name === 'PAGE_DEVICES_GET_RELAY_STATUS_BUTTON_PERM') {
          this.setState({relayStatusButton: true});
        }
        if (p.name === 'PAGE_DEVICES_TURN_ON_METER_RELAY_BUTTON_PERM') {
          this.setState({meterRelayOnButton: true});
        }
        if (p.name === 'PAGE_DEVICES_TURN_OFF_METER_RELAY_BUTTON_PERM') {
          this.setState({meterRelayOffButton: true});
        }
      })
    } else {
      console.log("permissions null");
    }
  }

  render() {

    return (
      <TotPage title={'Devices'}>
        <div className="dashboard">
          <style jsx>{styles}</style>
          <PageContent>
            <div
              style={{
                background: 'transparent',
                minHeight: '450px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                flex: 1,
                minHeight: '100%',
                position: 'relative',
                pointerEvents: (!!this.state.openExportCsv || !!this.state.openEditDialog || !!this.state.showRawMessage || this.state.openDetails) ? 'none' : null,
              }}
            >
              {!!this.state.uploadDeviceCsr ?
                <>
                  <div
                    className="col-md-6 input-wrap has-feedback has-success"
                    style={{ position: 'relative', paddingRight: '20px', marginBottom: '25px', marginTop: '25px' }}
                  >
                    <input
                      type="file"
                      placeholder={'File upload'}
                      onChange={(event) => {
                        this.setState({ file: event.target.files[0] });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-md-6 input-wrap has-feedback has-success" style={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                           onClick={ async () => {
                             const result = await Swal.fire({
                               html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                               icon: 'question',
                               confirmButtonText: 'OK',
                               cancelButtonText: 'Cancel',
                               showCancelButton: true,
                             });
                             if (!result || !result.isConfirmed) return;
                             let rp = null;
                             const formData = new FormData();
                             formData.append('file', this.state.file, this.state.file.name);

                             const url = 'api/device-csr/upload';
                             const method = 'POST';
                             await fetch(url,
                               {
                                 method,
                                 body: formData,
                               },
                             )
                               .then(response => response.json())
                               .then(response => rp = response)
                               .catch((error) => {
                                 console.error('Error:', error);
                               });
                             if (rp?.success) {
                               const result = await Swal.fire({
                                 html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                 icon: 'success',
                                 confirmButtonText: 'OK',
                               });
                               if (result || result.isConfirmed) {
                                 require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                               }
                             } else {
                               Swal.fire({
                                 html: `<p style='text-align: center; font-size: 14px;'>${rp?.errorDescription || rp?.message}</p>`,
                                 icon: 'error',
                                 confirmButtonText: 'OK',
                               });
                             }
                           }}
                      >
                        <span>{'SAVE'}</span>
                      </div>
                      <div style={{ marginLeft: '5px' }} className="button-btn w-80"
                           onClick={() => {
                             require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                           }}
                      >
                        <span>{'CANCEL'}</span>
                      </div>
                    </div>
                  </div>
                </>
                :null
              }
              {!this.state.uploadDeviceCsr ?
                <>
                  {/*<div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>*/}
                  {/*  <span>{'Device Management'} <i className="fa fa-caret-right ml-5 mr-5" /> {'Devices'}</span>*/}
                  {/*  <h5 className="site-title">{'Devices'}</h5>*/}
                  {/*</div>*/}
                  <div
                    // style={{
                    //   padding: '30px',
                    //   borderBottom: '1px solid #ddd',
                    //   pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                    // }}
                  >
                    <div
                      // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    >

                      <div className="checkbox-container">

                      </div>

                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '20px',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color:' #282828',
                            fontSize: '14px',
                            fontWeight: 500,
                          }}
                        >

                        </div>
                        <div
                          style={{
                            marginLeft: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            color:' #282828',
                            fontSize: '14px',
                            fontWeight: 500,
                          }}
                        >

                        </div>

                      </div>
                    </div>
                    <div style={{ marginTop: '20px', position: 'absolute', width: '96%' }} >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                      >

                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '20px',
                        }}>

                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}
                    >
                      {this.state.deviceCsrButton == true?
                        <div>
                          <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                          <div
                            data-tip="Click to upload device CSR"
                            className="button-btn w-160 ml-10"
                            onClick={() => this.setState({ uploadDeviceCsr: true })}
                          >
                            <span>{'UPLOAD DEVICE CSR'}</span>
                          </div>
                        </div>
                        :null}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff' }} className="doctor-list">
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>

                      <div className="flex flex-row w-full h-50 align-items-center justify-content-center"
                           style={{ display: 'flex', pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null }}
                      >
                        {!!this.state.showMeterChart && (
                          <div
                            style={{
                              backgroundColor: '#fff',
                              position: 'fixed',
                              top: '0',
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: '#00000066',
                              zIndex: 10000,
                              border: '1px solid',
                              borderRadius: '3px',
                              padding: '30px',
                              overflow: 'auto',
                              display: 'flex',
                              flexDirection: 'column',
                              padding: '15px',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                background: '#ffffff',
                                flex: 1,
                              }}
                            >
                            </div>
                          </div>
                        )}
                      </div>
                      {!!this.state.openSetTimeIntervalDialog && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            zIndex: 10,
                            width: '400px',
                            height: '360px',
                            border: '1px solid',
                            borderRadius: '3px',
                            padding: '15px 15px 15px 15px',
                            top: '30%',
                            left: '40%',
                          }}
                        >
                                          <span style={{ fontWeight: '500', fontSize: '18px' }}>
                                              {'Set Time Interval'}
                                          </span>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '30px',
                              marginBottom: '35px',
                              marginTop: '15px',
                            }}
                          >
                            <label style={{ fontWeight: '400', fontSize: '14px', width: '60px' }}>
                              {'UID: '}
                            </label>
                            <input
                              readOnly
                              value={this.state.selectedData.uid}
                              style={{
                                width: '100%',
                                backgroundColor: 'rgb(238 238 238)',
                                height: '30px',
                                outline: 'unset',
                                border: '0.5px solid',
                                borderRadius: '3px',
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              height: '40px',
                              marginBottom: '35px',
                            }}
                          >
                            <label style={{ fontWeight: '400', fontSize: '14px', width: '60px' }}>
                              {'RDTI: '}
                            </label>
                            <div
                              className="flex flex-row"
                              style={{ width: '100%', position: 'relative' }}
                            >
                              <SelectCustom
                                className="mb-0"
                                field={{
                                  name: 'rdti',
                                }}
                                name="rdti"
                                options={[
                                  ...(
                                    this.state.optionsRdti || [
                                      { name: 'Select', value: '' },
                                      { name: '15 mins', value: '15' },
                                      { name: '30 mins', value: '30' },
                                      { name: '1 hour', value: '60' },
                                    ]
                                  ).map(item => ({
                                    label: item.name,
                                    value: item.value,
                                  })),
                                ]}
                                value={this.state.optionsRdti}
                                onChange={(field, value) => this.setState({ rdti: value.value, rdtiError: !value.value })}
                              />
                              {(this.state.rdtiError) ?
                                <small
                                  className="help-block"
                                  style={{
                                    color: '#eb0000',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    position: 'absolute',
                                    top: '65%',
                                  }}
                                >
                                  {this.state.rdtiError ? 'RDTI is required!' : 'Invalid RDTI'}
                                </small>
                                : null}
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              height: '40px',
                              marginBottom: '35px',
                            }}
                          >
                            <label style={{ fontWeight: '400', fontSize: '14px', width: '60px' }}>
                              {'PDTI: '}
                            </label>
                            <div
                              className="flex flex-row"
                              style={{ width: '100%', position: 'relative' }}
                            >
                              <SelectCustom
                                field={{
                                  name: 'rdti',
                                }}
                                name="rdti"
                                options={[
                                  ...(
                                    this.state.optionsPdti || [
                                      { name: 'Select',  value: '' },
                                      { name: '15 mins', value: '15' },
                                      { name: '30 mins', value: '30' },
                                      { name: '1 hour',  value: '60' },
                                      { name: '6 hour',  value: '360' },
                                      { name: '12 hour', value: '720' },
                                      { name: '24 hour', value: '1440' },
                                    ]
                                  ).map(item => ({
                                    label: item.name,
                                    value: item.value,
                                  })),
                                ]}
                                value={this.state.optionsPdti}
                                onChange={(field, value) => this.setState({ pdti: value.value, pdtiError: !value.value })}
                              />
                              {(this.state.pdtiError) ?
                                <small
                                  className="help-block"
                                  style={{
                                    color: '#eb0000',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    position: 'absolute',
                                    top: '65%',
                                  }}
                                >
                                  {this.state.pdtiError ? 'PDTI is required!' : 'Invalid PDTI!'}
                                </small>
                                : null}
                            </div>
                          </div>
                          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                              className="button-btn w-80 mr-15"
                              style={{
                                outline: 'unset',
                                border: 'unset',
                              }}
                              onClick = {async () => {
                                if (!this.state.rdti || !this.state.pdti) {
                                  if (!this.state.rdti) {
                                    this.setState({ rdtiError: true });
                                  }
                                  if (!this.state.pdti) {
                                    this.setState({ pdtiError: true });
                                  }
                                  return;
                                }
                                if (!!this.state.pdti && !!this.state.rdti) {
                                  this.setState({ loading: true });
                                  const data = {};
                                  data.uid = this.state.selectedData.uid;
                                  data.cmd = 'CFG';
                                  data.data = { rdti: this.state.rdti, pdti: this.state.pdti };

                                  const response = await sendCommand(data);
                                  if (response.success === true) {
                                    const mid = response?.response;
                                    this.setState({ loading: false });
                                    Swal.fire(
                                      'Done!',
                                      'MID ' + mid + ' is sent successfully. Check process logs for more information.',
                                      'success',
                                    )
                                      .then(() => {
                                        this.setState({ openSetTimeIntervalDialog: false });
                                        window.location.href = window.location.href;
                                      });
                                  } else {
                                    this.setState({ loading: false });
                                    Swal.fire(
                                      'Error!',
                                      response.message || response.errorDescription || '',
                                      'error',
                                    );
                                  }
                                } else {
                                  Swal.fire('Oops...', 'Some thing went wrong!', 'error');
                                }
                              }}
                            >
                              {'SAVE'}
                            </button>
                            <button
                              className="button-btn w-80 mr-15"
                              style={{
                                outline: 'unset',
                                border: 'unset',
                              }}
                              onClick={() => {
                                this.setState({ openSetTimeIntervalDialog: false, rdtiError: false, pdtiError: false });
                              }}
                            >
                              {'CANCEL'}
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="row mt-3"
                           style={{
                             marginLeft: '0px',
                             marginRight: '0px',
                           }}
                      >
                        <div className="col-sm-12 col-md-5">
                        </div>
                        <div className="col-sm-12 col-md-7 pagination" style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                          { this.state.totalRecords > this.state.pageSize && this.state.totalPages >= 2 &&
                          <Pagination
                            href={this.props.asPath.replace(/\?.*/g, '')}
                            totalRecords={this.state.totalRecords}
                            totalPages={this.state.totalPages}
                            onPageChanged={(query) => {

                              let pathname = window.location.pathname;
                              const search = window.location.search
                                .replace(/&{0,}((pageSize)|(pageIndex)|(page))=[^\?&]+/g, '');
                              if (!search) {
                                pathname += '?page=' + query.pageIndex;
                              } else {
                                pathname += search + '&page=' + query.pageIndex;
                              }
                              require('@app/utils/next-routes').Router.pushRoute(pathname);
                            }}
                            pageIndex={this.state.pageIndex}
                            pageSize={this.state.pageSize}
                            styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                          />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <div
                          style={{
                            display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'inherit' : 'none',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                            transition: 'all 0.2s ease',
                            width: 'calc(100% - 215px)',
                          }}
                        >
                          <span style={{ marginLeft: '20px' }}>{'From date:'}</span>






                        </div>
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
                      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>

                        <div className="row mt-3"
                             style={{
                               marginLeft: '0px',
                               marginRight: '0px',
                             }}
                        >
                          <div className="col-sm-12 col-md-5">
                          </div>
                          <div className="col-sm-12 col-md-7 pagination" style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                            { this.state.totalRecordsRelatedLog > this.state.pageSizeRelatedLog && this.state.totalPagesRelatedLog >= 2 &&
                            <Pagination
                              href={this.props.asPath.replace(/\?.*/g, '')}
                              totalRecords={this.state.totalRecordsRelatedLog}
                              totalPages={this.state.totalPagesRelatedLog}
                              onPageChanged={async (query) => {
                                const params = {
                                  options: {
                                    uid: this.state.selectedData.uid,
                                    msn: this.state.selectedData.msn,
                                    mid: this.state.searchMid,
                                    fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                                    toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,
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
                  </>
                </> :null}
            </div>
            {!!this.state.openDetails && (
              <div
                style={{
                  backgroundColor: '#fff',
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  zIndex: 10,
                  width: '100%',
                  height: '100%',
                  border: '1px solid',
                  borderRadius: '3px',
                  padding: '60px 15px 0px 100px',
                  overflowY: 'scroll',
                }}
              >
                <div
                  style={{
                    height: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#eff1f3',
                    padding: '10px',
                    borderRadius: '5px',
                  }}
                >
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>
                              {'eSIM Meter Device Details'}
                            </span>
                  <button
                    type="button"
                    className="button-btn w-80"
                    onClick={() => {
                      this.setState({
                        openDetails: false,
                        detailsData: null,
                        updated: undefined,
                        updatedGroup: undefined,
                      });
                    }}
                  >
                    <span>{'BACK'}</span>
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px',}}>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                              <span
                                style={{
                                  backgroundColor: '#cce7fe',
                                  color: '#1b4f8c',
                                  border: '1px solid #c0e0fe',
                                  borderRadius: '5px',
                                  height: '70px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: '18px',
                                  fontWeight: 400,
                                  paddingLeft: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                {'eSIM Details'}
                              </span>
                    <table>
                      <thead>
                      <tr>
                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {'eSIM ID (GID)'}
                        </th>
                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {'Activation date'}
                        </th>
                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {'Deactivation date'}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {this.state.detailsData.cid}
                        </th>
                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {!!this.state.detailsData.activationDate ? moment(new Date(this.state.detailsData.activationDate)).format('DD/MM/YYYY HH:mm:ss') : ''}
                        </th>
                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {!!this.state.detailsData.deactivationDate ? moment(new Date(this.state.detailsData.deactivationDate)).format('DD/MM/YYYY HH:mm:ss') : ''}
                        </th>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{ width: '20%' }}>
                    {(this.state.detailsData.status === 'ONLINE' || this.state.detailsData.status === 'OFFLINE') && (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '80px',
                            width: '80px',
                            borderRadius: '50%',
                            backgroundColor: this.state.detailsData.status === 'ONLINE' ? '#4cdb7e' : '#db4c4c',
                            marginBottom: '10px',
                          }}
                        >
                                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF' }}>
                                      {this.state.detailsData.status}
                                    </span>
                        </div>
                        {!!this.state.detailsData.lastSubscribeDatetime && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '15px', fontWeight: 500, color: '#000000' }}>{'Last seen alive'}</span>
                            <span style={{ fontSize: '15px', fontWeight: 500, color: '#000000'  }}>
                                      {moment(new Date(this.state.detailsData.lastSubscribeDatetime)).format('DD/MM/YYYY HH:mm:ss')}
                                    </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'MCU Module Details'}
                            </span>
                  <table>
                    <thead>
                    <tr>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'MCU UUID'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'MCU SN (QR Code)'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Enrolment date'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Version'}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {this.state.detailsData.uid}
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {this.state.detailsData.sn}
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {!!this.state.detailsData.enrollmentDatetime ? moment(new Date(this.state.detailsData.enrollmentDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {this.state.detailsData.ver}
                      </th>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'Meter Details'}
                            </span>
                  <table>
                    <thead>
                    <tr>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Meter SN (Bar Code)'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Coupled Time'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Group Name'}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <input
                          value={this.state.detailsData.msn}
                          style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                          onChange={(event) => {
                            this.setState({ detailsData: { ...this.state.detailsData, msn: event.target.value }, updated: true });
                          }}
                        />
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', paddingLeft: '10px', border: '1px solid #e6e6e6' }}>
                        {!!this.state.detailsData.coupledDatetime ? moment(new Date(this.state.detailsData.coupledDatetime)).format('DD/MM/YYYY') : ''}
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <select
                          style={{ outline: 'unset', width: '100%', height: '35px' }}
                          className="select-group-device"
                          value={this.state.detailsData.group?.id || ''}
                          onChange={(event) => {
                            this.setState({
                              detailsData: {
                                ...this.state.detailsData,
                                group: {
                                  ...this.state.detailsData.group,
                                  id: !!event.target.value ? parseInt(event.target.value) : null,
                                },
                              },
                              updated: true,
                            }, () => {
                              const remark = this.getRemarkValue(this.state.rpDeviceGroups);
                              this.setState({
                                detailsData: {
                                  ...this.state.detailsData,
                                  group: {
                                    ...this.state.detailsData.group,
                                    remark,
                                  },
                                },
                              });
                            });
                          }}
                        >
                          <option value="">{'Select group'}</option>
                          {this.state.rpDeviceGroups.map(rdg => (
                            <option key={rdg.value} value={rdg.value}>{rdg.label}</option>
                          ))}
                        </select>
                      </th>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'General Details'}
                            </span>
                  <table>
                    <thead>
                    <tr>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Installer Name'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Remark'}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <select
                          style={{ outline: 'unset', width: '100%', height: '35px' }}
                          className="select-installer-user"
                          value={this.state.detailsData.installer?.userId || ''}
                          onChange={(event) => {
                            this.setState({
                              detailsData: { ...this.state.detailsData, installer: { ...this.state.detailsData.installer, userId: !!event.target.value ? parseInt(event.target.value) : null } },
                              updated: true,
                            });
                          }}
                        >
                          <option value="">{'Select installer'}</option>
                          {this.state.rpInstallerUsers.map(rdg => (
                            <option key={rdg.value} value={rdg.value}>{rdg.label}</option>
                          ))}
                        </select>
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <input
                          value={this.state.detailsData.group?.remark}
                          style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                          onChange={(event) => {
                            this.setState({
                              detailsData: { ...this.state.detailsData, group: { ...this.state.detailsData.group, remark: event.target.value } },
                              updatedGroup: true,
                            });
                          }}
                        />
                      </th>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'Address Details'}
                            </span>
                  <div style={{marginTop : '15px', marginBottom : '15px'}}>
                    <Radio
                      field={{
                        name: "radio1"
                      }}
                      name="radio1"
                      className="radio-inline"
                      groupstyle={{ margin: "auto", fontSize: '13px' }}
                      textStyle={{color: '#000', fontWeight: 400}}
                      value={this.state.addressType}
                      options={[
                        ...[
                          { name: "Apartment", id: 'apartment' },
                          { name: "Other", id: 'other' },
                        ].map(item => ({
                          label: item.name,
                          value: item.id
                        }))
                      ]}
                      onClick={(e, option) => {
                        if (!!option) {
                          this.setState({addressType: option.value})
                        }
                      }}
                    />
                  </div>
                  {this.state.addressType === 'apartment' ?
                    <table>
                      <thead>
                      <tr>
                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {'Building'}
                        </th>
                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {'Floor level'}
                        </th>
                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {'Building Unit'}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                          <select
                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                            className="select-installer-user"
                            name="Building"
                            value={this.state.selectedBuilding}
                            onChange={async(event) => {
                              this.setState({
                                selectedBuilding: event.target.value,
                                updated: true
                              });
                              let floorLevels = [];
                              floorLevels = await getFloorLevels({limit: 10000, options: {buildingId: event.target.value}});

                              console.log("floorLevels :", floorLevels.results);
                              this.setState({
                                selectedfloorLevels: floorLevels.results,
                              });

                              console.log("selectedfloorLevels :", this.state.selectedfloorLevels);
                            }}
                          >
                            <option value="">{'Select building'}</option>
                            {(this.state.selectBuilding || []).map((it, index) => (
                              <option key={index} value={it.id}>{it.id + " - " +  it.name}</option>
                            ))}
                          </select>
                        </th>
                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                          <select
                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                            className="select-installer-user"
                            name="floorLevel"
                            value={this.state.selectedFloor}
                            onChange={async(event) => {
                              this.setState({
                                selectedFloor: event.target.value,
                                updated: true
                              });
                              let buildingUnits = [];
                              buildingUnits = await getBuildingUnits({limit: 10000, options: {floorLevelId: event.target.value}});
                              this.setState({
                                selectedBuildingUnit: buildingUnits.results,
                              });

                              console.log("selectedBuildingUnit :", this.state.selectedBuildingUnit);
                            }}
                          >
                            <option value="">{'Select floor'}</option>
                            {(this.state.selectedfloorLevels || []).map((it, index) => (
                              <option key={index} value={it.id}>{it.id + " - " +  it.name}</option>
                            ))}
                          </select>
                        </th>
                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                          <select
                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                            className="select-installer-user"
                            value={this.state.selectedUnit}
                            onChange={(event) => {
                              this.setState({
                                selectedUnit: event.target.value,
                                updated: true
                              });
                            }}
                          >
                            <option value="">{'Select building unit'}</option>
                            {(this.state.selectedBuildingUnit || []).map((it, index) => (
                              <option key={index} value={it.id}>{it.id + " - " +  it.name}</option>
                            ))}
                          </select>
                        </th>
                      </tr>
                      </tbody>
                    </table>
                    :null}
                  {this.state.addressType === 'other' ?
                    <div>
                      <table>
                        <thead>
                        <tr>
                          <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '20%', maxWidth: '9%', padding: '10px', border: '1px solid #e6e6e6' }}>
                            {'Street Number'}
                          </th>
                          <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                            {'Street Name'}
                          </th>
                          <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                            {'Town'}
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                            <input
                              value={this.state.streetNumber}
                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                              onChange={(event) => {
                                this.setState({
                                  streetNumber: event.target.value,
                                  updated: true
                                });
                              }}
                            />
                          </th>
                          <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                            <input
                              value={this.state.streetName}
                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                              onChange={(event) => {
                                this.setState({
                                  streetName: event.target.value,
                                  updated: true
                                });
                              }}
                            />
                          </th>
                          <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                            <input
                              value={this.state.town}
                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                              onChange={(event) => {
                                this.setState({
                                  town: event.target.value,
                                  updated: true
                                });
                              }}
                            />
                          </th>
                        </tr>
                        </tbody>
                      </table>

                      <table>
                        <thead>
                        <tr>
                          <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '20%', maxWidth: '9%', padding: '10px', border: '1px solid #e6e6e6' }}>
                            {'City'}
                          </th>
                          <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                            {'Country'}
                          </th>
                          <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                            {'Postal Code'}
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                            <input
                              value={this.state.city}
                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                              onChange={(event) => {
                                this.setState({
                                  city: event.target.value,
                                  updated: true
                                });
                              }}
                            />
                          </th>
                          <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                            <input
                              value={this.state.country}
                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                              onChange={(event) => {
                                this.setState({
                                  country: event.target.value,
                                  updated: true
                                });
                              }}
                            />
                          </th>
                          <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                            <input
                              value={this.state.postalCode}
                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                              onChange={(event) => {
                                this.setState({
                                  postalCode: event.target.value,
                                  updated: true
                                });
                              }}
                            />
                          </th>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    :null}

                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50px',
                    marginTop: '40px',
                    marginBottom: '30px',
                  }}
                >
                  <div
                    style={{ marginRight: '10px', width: '120px' }}
                    className={!!this.state.updated || !!this.state.updatedGroup ? 'button-btn' : 'btn btn-secondary'}
                    onClick={async () => {
                      if (!!this.state.updated || !!this.state.updatedGroup) {
                        const data = {};
                        const addressObj = {
                          streetNumber : this.state.streetNumber,
                          street : this.state.streetName,
                          town : this.state.town,
                          city : this.state.city,
                          country : this.state.country,
                          postalCode : this.state.postalCode,
                        };
                        const dataGroup = {};
                        if (!!this.state.updated) {
                          data.id = this.state.detailsData.id;
                          data.uid = this.state.detailsData.uid;
                          data.msn = this.state.detailsData.msn;
                          data.group = this.state.detailsData.group?.id;
                          data.installer = this.state.detailsData.installer?.userId;
                          data.buildingId = this.state.selectedBuilding;
                          data.floorLevelId = this.state.selectedFloor;
                          data.buildingUnitId = this.state.selectedUnit;
                          data.address = addressObj;
                        }
                        if (!!this.state.updatedGroup) {
                          dataGroup.id = this.state.detailsData.group.id;
                          dataGroup.remark = this.state.detailsData.group.remark;
                        }
                        const result = await Swal.fire({
                          html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });
                        if (result && result.isConfirmed) {
                          let response = null;
                          if (!!this.state.updated) {
                            response = await editDevice(data);
                          }
                          if (!!this.state.updatedGroup) {
                            response = await editGroup(dataGroup);
                          }
                          if (response.success === true) {
                            Swal.fire(
                              'Done!',
                              'Your database has been changed!',
                              'success',
                            )
                              .then(() => {
                                this.setState({
                                  openDetails: false,
                                  detailsData: null,
                                  updated: undefined,
                                  updatedGroup: undefined,
                                  loading: true,
                                });
                                window.location.href = window.location.href;
                              });
                          } else {
                            Swal.fire(
                              'Error!',
                              response.message || response.errorDescription || '',
                              'error',
                            );
                          }
                        }
                      }
                    }}
                  >
                    <span>{'UPDATE'}</span>
                  </div>
                  <div
                    style={{ marginRight: '10px', width: '120px' }}
                    className="button-btn"
                    onClick={() => {
                      this.setState({
                        openDetails: false,
                        detailsData: null,
                        updated: undefined,
                        updatedGroup: undefined,
                      });
                    }}
                  >
                    <span>{'CANCEL'}</span>
                  </div>
                </div>
              </div>
            )}
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
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Raw Message'}
                          </span>
                <span style={{ overflow: 'auto', width: '100%', height: '60%' }}>
                            {this.state.rawMessage}
                          </span>
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
            {!!this.state.mdtPiStatus && (
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
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Meter client status'}
                          </span>
                <div style={{ overflow: 'auto', width: '100%', height: '60%' }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th" scope="col">IP Address</th>
                      <th className="table-th" scope="col">STATUS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.mdtPiStatus.map((r, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: '#fff',
                              color: '#000000',
                            }}
                          >
                            <td className="table-td">
                              {(r.piUuid || '').split('-')[0]}
                            </td>
                            <td className="table-td">
                              {r.ftpResStatus}
                            </td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                </div>
                <button
                  className="button-btn w-80"
                  style={{
                    alignSelf: 'center',
                    border: 'unset',
                    outline: 'unset',
                  }}
                  onClick={() => {
                    this.setState({ mdtPiStatus: undefined });
                  }}
                >
                  {'Close'}
                </button>
              </div>
            )}
            {!!this.state.openExportCsv && (
              <div
                style={{
                  backgroundColor: '#fff',
                  position: 'fixed',
                  top: '30%',
                  left: '40%',
                  zIndex: 10,
                  width: '400px',
                  height: '230px',
                  border: '1px solid',
                  borderRadius: '3px',
                  padding: '15px 15px 15px 15px',
                }}
              >
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Export CSV'}
                          </span>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '40px',
                    marginBottom: '40px',
                    marginTop: '40px',
                  }}
                >
                  <label style={{ fontWeight: 400, fontSize: '14px', width: '120px' }}>
                    {'Activate date: '}
                  </label>
                  <input
                    style={{
                      border: '1px solid',
                      borderRadius: '5px',
                      height: '40px',
                      width: '60%',
                    }}
                    type="date"
                    value={ this.state.activateDate || moment(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DD') }
                    onChange={ event => this.setState({ activateDate: event.target.value })}
                  />
                </div>
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    style={{
                      marginRight: '15px',
                      height: '40px',
                      width: '80px',
                      borderRadius: '3px',
                      backgroundColor: '#99ccff',
                      cursor: 'pointer',
                      color: '#000000',
                    }}
                    onClick={async () => {
                      const selectedCids = [];
                      this.state.selectedCids?.forEach((cid) => {
                        selectedCids.push(cid.value);
                      });
                      const filter = {
                        options: {
                          downloadCsv: true,
                          status: this.state.selectedStatus,
                          fromDate: !!this.state.fromDate ? new Date(this.state.fromDate).getTime() : undefined,
                          toDate: !!this.state.toDate ? new Date(this.state.toDate).getTime() : undefined,
                          querySn: this.state.searchSn,
                          queryMsn: this.state.searchMsn?.toUpperCase(),
                          selectedCids: this.state.listCid || selectedCids,
                          activateDate: this.state.activateDate ? new Date(this.state.activateDate).getTime() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
                        },
                      };
                      const url = '/api/ca-request-logs';
                      const method = 'POST';
                      const rp = await fetch(url, {
                        method,
                        body: JSON.stringify(filter),
                        headers: {
                          'Content-Type' : 'application/json',
                        },
                      })
                        .then((response) => {
                          return response.blob();
                        });
                      if (rp) {
                        const tag =  moment(new Date()).format('YYYYMMDD');
                        const fileName = 'ca-request-logs-' + tag + '.csv';
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
                    {'Export'}
                  </button>
                  <button
                    style={{
                      marginLeft: '15px',
                      height: '40px',
                      width: '80px',
                      borderRadius: '3px',
                      border: '0.5px solid green',
                      backgroundColor: '#f8cecc',
                      cursor: 'pointer',
                      color: '#000000',
                    }}
                    onClick={() => {
                      this.setState({ openExportCsv: false, activateDate: undefined });
                    }}
                  >
                    {'Cancel'}
                  </button>
                </div>
              </div>
            )}
          </PageContent>

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
        </div>
      </TotPage>
    );
  }
}

class MeterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ chartType: 'time', chartStyle: 'bar' });
    this.load(new Date(moment().startOf('day')).getTime(), new Date(moment().endOf('day')).getTime());
    clearInterval(this.intv);
    this.intv = setInterval(() => {
      if (this.state.chartType === 'time') {
        this.load(new Date(moment().startOf('day')).getTime(), new Date(moment().endOf('day')).getTime());
      } else if (this.state.chartType === 'month') {
        this.load(new Date(moment().startOf('month')).getTime(), new Date(moment().endOf('month')).getTime());
      } else if (this.state.chartType === 'year') {
        this.load(new Date(moment().startOf('year')).getTime(), new Date(moment().endOf('year')).getTime());
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intv);
  }

  load = async (from, to) => {
    const rp = await getMeterLogs({ uid: this.props.uid || 'BIERWXAAA4AFMACLXX', from, to });
    let data = rp.response || [];

    const check = [];
    const timeData = [['Time/Daily', 'Time']];

    const temp = [];
    for (let i = 0; i < data.length; i++) {

      const dt = data[i].dt;
      if (!!check[dt + '']) {
        continue;
      }
      check[dt + ''] = true;
      temp.push(data[i]);
    }

    data = temp;

    const dateData = {};
    const dateTimeData = {};
    for (let i = 0; i < data.length; i++) {
      if (i >= data.length - 20) {
        timeData.push([moment(new Date(data[i].dt)).format('HH:mm:ss DD-MM-YY'), Number(data[i].kwh)]);
      }
      const dateLabel = moment(new Date(data[i].dt)).format(this.state.chartType === 'time' ? 'HH:mm:ss DD-MM-YY'
        : (this.state.chartType === 'month' ? 'DD-MM-YYYY' : 'MM-YYYY'));
      dateData[dateLabel] = (dateData[dateLabel] || 0) + Number(data[i].kwh);
    }

    const dailyChartData = [['Time/Daily', 'Date']];
    Object.keys(dateData).map(it => {
      dailyChartData.push([it, dateData[it]]);
    });

    this.setState({ lineChartData: timeData, dailyChartData, found: !!data.length, newData: !!data.length ? Date.now() : this.state.newData });
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: '30px', marginLeft: '30px', fontSize: '20px', color: '#000' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label style={{ fontWeight: '400', fontSize: '20px', width: '120px' }}>
              {'Chart Style: '}
            </label>
            <div
              className="flex flex-row"
              style={{ width: '10%', position: 'relative', fontSize: '14px' }}
            >
              <SelectCustom
                field={{
                  name: 'chartStyle',
                }}
                name="chartStyle"
                options={[
                  ...(
                    this.state.optionsStyle || [
                      { name: 'Line chart', value: 'line' },
                      { name: 'Bar chart', value: 'bar' },
                    ]
                  ).map(item => ({
                    label: item.name,
                    value: item.value,
                  })),
                ]}
                value={this.state.chartStyle || 'bar'}
                onChange={(field, value) => {
                  this.setState({ chartStyle: value.value });
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label style={{ fontWeight: '400', fontSize: '20px', width: '120px' }}>
              {'Type: '}
            </label>
            <div
              className="flex flex-row"
              style={{ width: '10%', position: 'relative', fontSize: '14px' }}
            >
              <SelectCustom
                field={{
                  name: 'chartType',
                }}
                name="chartType"
                options={[
                  ...(
                    this.state.optionsType || [
                      { name: 'Time', value: 'time' },
                      { name: 'Month', value: 'month' },
                      { name: 'Year', value: 'year' },
                    ]
                  ).map(item => ({
                    label: item.name,
                    value: item.value,
                  })),
                ]}
                value={this.state.chartType || 'month'}
                onChange={(field, value) => {
                  this.setState({ chartType: value.value });
                }}
              />
            </div>
          </div>
        </div>

        {this.state.found === false && <div>Data not found</div>}

        {(this.state.found && this.state.lineChartData && this.state.dailyChartData && this.state.chartStyle === 'line') && (
          <Chart
            key={this.state.newData}
            width={'100%'}
            // height={600}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={this.state.chartType === 'time' ? this.state.lineChartData : this.state.dailyChartData}
            options={{
              title: 'Kwh',
              // curveType: 'function',
              legend: { position: 'bottom' },
              height: 700,
              hAxis: {
                slantedText:true,
                slantedTextAngle:90,
                marginBottom: '100px',
              },
            }}
          />
        )}
        {(this.state.found && this.state.dailyChartData && this.state.chartStyle === 'bar') && (
          <div style={{ marginTop: '50px' }}>
            <Chart
              key={this.state.newData}
              width={'100%'}
              height={300}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={this.state.dailyChartData}
              options={{
                title: 'Kwh',
                curveType: 'function',
                legend: { position: 'bottom' },
              }}
              legendToggle
            />
          </div>
        )}
      </div>
    );
  }
}

export default withNamespaces('common')(Homepage);
