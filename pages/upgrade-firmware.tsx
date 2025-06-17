import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { editDevice, getAllDevices, getRelatedLogs, sendCommand, getMeterLogs, getCids, getUploadedFirmware } from '@app/api/log';
import { Pagination, ProgressLoading, SelectCustom } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import ReactTooltip from 'react-tooltip';
import { Chart } from 'react-google-charts';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

const uv4 = () => {
    var h=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var k=['x','x','x','x','x','x','x','x','-','x','x','x','x','-','4','x','x','x','-','y','x','x','x','-','x','x','x','x','x','x','x','x','x','x','x','x'];
    var u='',i=0,rb=Math.random()*0xffffffff|0;
    while(i++<36) {
        var c=k[i-1],r=rb&0xf,v=c=='x'?r:(r&0x3|0x8);
        u+=(c=='-'||c=='4')?c:h[v];rb=i%8==0?Math.random()*0xffffffff|0:rb>>4
    }
    return u
}

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
        overflowY: visible !important;
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
      width: 100%;
      font-size: 18px;
    }
    :global(.table-th) {
      background: #f2f3ff !important;
      color: #000000 !important;
      font-weight: 500 !important;
      fontSize: 14px !important;
      width: 180px;
      maxWidth: 350px !important;
      padding: 10px !important;
      padding-left: 30px !important;
    }
    .w-50 {
      width: 50px important;
    }
    :global(.table-td) {
      padding: 10px !important;
      padding-left: 30px !important;
      padding-right: 30px !important;
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

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {

  static getInitialProps = async (args) => {
    const { query: { q, page, fromDate, toDate, status, querySn, queryMsn, querySnOrCid, cids }, asPath, req, initialState: {} } = args;

    const pageNumber = Number(page) || 1;
    const selectedCids = [];
    const cidsParam = [];
    if (!!cids && cids.length > 0) {
      cids?.split(',')?.forEach((cid) => {
        cidsParam.push(cid);
        const item = {
          value: cid,
          label: cid,
        };
        selectedCids.push(item);
      });
    }
    const params = {
      pageNumber,
      options: {
        status: !!status ? status : undefined,
        fromDate: !!fromDate ? new Date(fromDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        toDate: !!toDate ? new Date(toDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        querySnOrCid: !!querySnOrCid ? querySnOrCid : undefined,
        selectedCids: cidsParam.length > 0 ? cidsParam : undefined,
        cidIsNotNull: true,
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };

    let rp = await getAllDevices(params, req);
    const rpCid = await getCids();
    const cidList = [];
    rpCid?.response?.forEach((cid) => {
      if (!!cid && cid !== 'server.csr') {
        const item = {
          value: cid,
          label: cid,
        };
        cidList.push(item);
      }
    });

    rp = rp || {};
    rp.response = rp.response || {};
    return {
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
      selectedStatus: status,
      fromDate: params.options.fromDate ? moment(params.options.fromDate).format('YYYY-MM-DD') : undefined,
      toDate: params.options.toDate ? moment(params.options.toDate).format('YYYY-MM-DD') : undefined,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      selectedCids,
      cidList,
    };
  }
  state = {
    ...this.props,
    profile: "METER_SG_TATA_PA_B01",
  };
  constructor(props) {
    super(props);
  }

  sendCommand = async (uid, cmd, type, batchId, selectVersion) => {
    const response = await sendCommand({ uid, cmd, type, batchId, options: {selectVersion: selectVersion} });
    this.state.batchs = this.state.batchs || [];
    if (response.success) {
      const mid = response.response;
      let obj = {};
      obj[uid] = mid;
      this.state.batchs.push(obj);
      /*Swal.fire({
        html: `<p style='text-align: center; font-size: 14px;'>${'MID ' + mid + ' is sent successfully. Check process logs for more information.'}</p>`,
        icon: 'success',
        confirmButtonText: 'OK',
      });*/
    } else {
      let obj = {};
      obj[uid] = response.message || ' Has internal error';
      this.state.batchs.push(obj);
      /*this.setState({ loading: false });
      Swal.fire({
        html: `<p style='text-align: center; font-size: 14px;'>${response.errorDescription || response.message}</p>`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      */
    }
  }

  componentDidMount = async () => {

    const params = {
        pageNumber: 1,
        limit: 10000,
        offset: 0,
    };
    let rp = await getUploadedFirmware(params, null);
    rp = rp || {};
    rp.response = rp.response || {};
    let firmwares = {};
    (rp.response.results || []).map(it => {
      firmwares[it.vendor?.name] = firmwares[it.vendor?.name] || [];
      firmwares[it.vendor?.name].push(it);
    })

    Object.keys(firmwares).map(k => {
      let fs = firmwares[k];
      fs.sort((f1, f2) => {
        let v1 = Number(f1.version.replace(/\./g, ''));
        let v2 = Number(f2.version.replace(/\./g, ''));
        if (f2.id > f1.id) {
          return 1;
        }
        return -1;
      })
    })

    this.setState({firmwares})
    console.info('firmwares---->', firmwares);
  }

  render() {
    return (
            <TotPage title={'Firmware OTA'}>
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
                              pointerEvents: (!!this.state.openExportCsv || !!this.state.openEditDialog || !!this.state.showRawMessage) ? 'none' : null,
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
                                        <div style={{ marginLeft: '0px', margin: 'unset' }} className="btn-edit"
                                            onClick={ async () => {
                                              const result = await Swal.fire({
                                                html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
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
                                            <span>{'Save'}</span>
                                        </div>
                                        <div style={{ marginLeft: '5px' }} className="btn-remove"
                                            onClick={() => {
                                              require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                                            }}
                                        >
                                            <span>{'Cancel'}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :null
                            }
                            {!this.state.uploadDeviceCsr ?
                            <>
                              <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                                <span>{'Device Management'} <i className="fa fa-caret-right ml-5 mr-5" /> {'Firmware Management'}</span>
                                <div className="site-title">
                                    <div
                                        onClick={() => {
                                            if (this.props.tab !== 'firmware-upload') {
                                                require('@app/utils/next-routes').Router.pushRoute(window.location.pathname + "?tab=firmware-upload");
                                            }
                                        }}
                                        style={{
                                            cursor: this.props.tab !== 'firmware-upload' ? 'pointer' : undefined,
                                        }}
                                    >
                                        <span style={{ fontWeight: this.props.tab === 'firmware-upload' ? 500 : 300,}}>{'Firmware Upload'}</span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            if (this.props.tab !== 'firmware-ota') {
                                                require('@app/utils/next-routes').Router.pushRoute(window.location.pathname + "?tab=firmware-ota");
                                            }
                                        }}
                                        style={{
                                            cursor: this.props.tab !== 'firmware-ota' ? 'pointer' : undefined,
                                            marginLeft: '20px',
                                            borderLeft: '2px solid #000000',
                                        }}
                                    >
                                        <div style={{marginLeft: '20px',}}>
                                            <span style={{ fontWeight: this.props.tab === 'firmware-ota' ? 500 : 300,}} >{'Firmware OTA'}</span>
                                        </div>
                                    </div>
                                </div>
                              </div>
                                <div
                                  style={{
                                    padding: '30px',
                                    borderBottom: '1px solid #ddd',
                                    paddingTop: '0px',
                                    paddingBottom: '20px',
                                    pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                                  }}
                                >
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
                                      {/*
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <span style={{ width: '80px' }} >{'From date: '}</span>
                                        <input
                                          style={{
                                            border: '1px solid',
                                            borderRadius: '5px',
                                            height: '40px',
                                          }}
                                          type="date"
                                          value={ this.state.fromDate }
                                          onChange={ event => this.setState({ fromDate: event.target.value })}
                                        />
                                      </div>
                                      <div
                                        style={{
                                          marginLeft: '15px',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <span style={{ width: 'max-content' }} >{'To date: '}</span>
                                        <input
                                          style={{
                                            border: '1px solid',
                                            borderRadius: '5px',
                                            marginLeft: '5px',
                                            height: '40px',
                                          }}
                                          type="date"
                                          value={ this.state.toDate }
                                          onChange={ event => this.setState({ toDate: event.target.value })}
                                        />
                                      </div>
                                      <input
                                        style={{
                                          border: '1px solid',
                                          borderRadius: '5px',
                                          outline: 'unset',
                                          height: '40px',
                                          width: '100%',
                                          paddingLeft: '10px',
                                          marginLeft: '30px',
                                          alignSelf: 'center',
                                        }}
                                        value={ this.state.searchSn || '' }
                                        placeholder="Search SN..."
                                        onChange={event => this.setState({ searchSn: event.target.value })}
                                      />
                                      <input
                                        style={{
                                          border: '1px solid',
                                          borderRadius: '5px',
                                          outline: 'unset',
                                          height: '40px',
                                          width: '100%',
                                          paddingLeft: '10px',
                                          marginLeft: '30px',
                                          alignSelf: 'center',
                                        }}
                                        value={ this.state.searchMsn || '' }
                                        placeholder="Search MSN..."
                                        onChange={event => this.setState({ searchMsn: event.target.value })}
                                      />
                                      */}
                                      <input
                                        style={{
                                          border: '1px solid',
                                          borderRadius: '5px',
                                          outline: 'unset',
                                          height: '40px',
                                          width: '100%',
                                          paddingLeft: '10px',
                                          alignSelf: 'center',
                                          marginRight: '10px',
                                        }}
                                        value={ this.state.querySnOrCid || '' }
                                        placeholder="Search by eSIM ID or SN"
                                        onChange={event => this.setState({ querySnOrCid: event.target.value })}
                                      />
                                      <div
                                        className="button-btn w-150"
                                         onClick={async () => {
                                            const selectedCids = [];
                                            this.state.selectedCids?.forEach((cid) => {
                                              selectedCids.push(cid.value);
                                            });
                                            const options = {
                                              status: (!!this.state.selectedStatus && this.state.selectedStatus !== 'select') ? this.state.selectedStatus : '',
                                              fromDate: !!this.state.fromDate ? moment(new Date(this.state.fromDate)).format('DD/MM/YYYY') : '',
                                              toDate: !!this.state.toDate ? moment(new Date(this.state.toDate)).format('DD/MM/YYYY') : '',
                                              querySn: !!this.state.searchSn ? this.state.searchSn : '',
                                              queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : '',
                                              querySnOrCid: !!this.state.querySnOrCid ? this.state.querySnOrCid?.toUpperCase() : '',
                                              listCid: this.state.listCid || selectedCids,
                                              tab: this.props.tab,
                                            };

                                            const pathName = window.location.pathname
                                              + '?tab='   + options.tab
                                              + '&status='   + options.status
                                              + '&fromDate=' + options.fromDate
                                              + '&toDate='   + options.toDate
                                              + '&querySn=' + options.querySn
                                              + '&queryMsn=' + options.queryMsn
                                              + '&querySnOrCid=' + options.querySnOrCid
                                              + '&cids='     + options.listCid;
                                            require('@app/utils/next-routes').Router.pushRoute(pathName);
                                         }}
                                      >
                                        <span>{'SEARCH'}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/*<div style={{ marginTop: '20px', position: 'absolute', width: '100%', paddingRight: '30px' }} >
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        left: '15%',
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '20px',
                                          fontWeight: 400,
                                          width: '84px',
                                        }}
                                      >
                                        {'CID:'}
                                      </span>
                                      <Select
                                        className="multi-select-cid"
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        defaultValue={this.state.selectedCids}
                                        options={this.state.cidList}
                                        onChange={(event) => {
                                          const listCid = [];
                                          event?.forEach(e => listCid.push(e.value));
                                          this.setState({ listCid });
                                        }}
                                      />
                                    </div>
                                  </div>
                                  */}
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignSelf: 'center',
                                      marginTop: '30px',
                                    }}
                                  >
                                    {/*
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Apply filters and search"
                                      style={{
                                        cursor: 'pointer',
                                        height: '40px',
                                        width: '80px',
                                        borderRadius: '5px',
                                        border: '1px solid #a6ca96',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#d5e8d4',
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '16px',
                                          fontWeight: 500,
                                        }}
                                        onClick={() => {
                                          const selectedCids = [];
                                          this.state.selectedCids?.forEach((cid) => {
                                            selectedCids.push(cid.value);
                                          });
                                          const options = {
                                            status: (!!this.state.selectedStatus && this.state.selectedStatus !== 'select') ? this.state.selectedStatus : '',
                                            fromDate: !!this.state.fromDate ? moment(new Date(this.state.fromDate)).format('DD/MM/YYYY') : '',
                                            toDate: !!this.state.toDate ? moment(new Date(this.state.toDate)).format('DD/MM/YYYY') : '',
                                            querySn: !!this.state.searchSn ? this.state.searchSn : '',
                                            queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : '',
                                            listCid: this.state.listCid || selectedCids,
                                          };

                                          const pathName = window.location.pathname
                                            + '?status='   + options.status
                                            + '&fromDate=' + options.fromDate
                                            + '&toDate='   + options.toDate
                                            + '&querySn=' + options.querySn
                                            + '&queryMsn=' + options.queryMsn
                                            + '&cids='     + options.listCid;
                                          require('@app/utils/next-routes').Router.pushRoute(pathName);
                                        }}
                                      >
                                        {'Apply'}
                                      </span>
                                    </div>
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Clear all filters"
                                      style={{
                                        marginLeft: '10px',
                                        cursor: 'pointer',
                                        height: '40px',
                                        width: '80px',
                                        borderRadius: '5px',
                                        border: '1px solid',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f8cecc',
                                      }}
                                      onClick={() => {
                                        this.setState({
                                          status: undefined,
                                          selectedStatus: undefined,
                                          searchSn: undefined,
                                          searchMsn: undefined,
                                          fromDate: undefined,
                                          toDate: undefined,
                                        });
                                        const pathName = window.location.pathname;
                                        require('@app/utils/next-routes').Router.pushRoute(pathName);
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '16px',
                                          fontWeight: 500,
                                        }}
                                      >
                                        {'Clear'}
                                      </span>
                                    </div>
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Export data as a CSV file"
                                      style={{
                                        marginLeft: '10px',
                                        cursor: 'pointer',
                                        height: '40px',
                                        width: '120px',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                      className="btn-edit"
                                      onClick={() => {
                                        this.setState({ openExportCsv: true });
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '16px',
                                          fontWeight: 500,
                                        }}
                                      >
                                        {'Upgrade firmwave'}
                                      </span>
                                    </div>*/}
                                  </div>
                                </div>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }} className="doctor-list">
                                    <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                                        <table className="table">
                                            <thead className="thead-dark">
                                            <tr>
                                                <th className="table-th w-50" scope="col" />
                                                <th className="table-th" scope="col">UID</th>
                                                <th className="table-th" scope="col">MSN</th>
                                                <th className="table-th" scope="col">eSIM ID</th>
                                                <th className="table-th" scope="col">SN</th>
                                                <th className="table-th" scope="col">Version</th>
                                                <th className="table-th" scope="col">Vendor</th>
                                                <th className="table-th" scope="col">Created At</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {(this.props.devices || [])
                                                .map((it, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            style={{
                                                              backgroundColor:  this.state.selectedRow === index ? '#6c6cef' : '#fff',
                                                              color: this.state.selectedRow === index ? '#fff' : 'black',
                                                            }}
                                                        >
                                                            <td
                                                                className="table-td"
                                                                style={{
                                                                  display: 'flex',
                                                                  justifyContent: 'flex-start',
                                                                  alignItems: 'center',
                                                                  cursor: !!it.cid ? 'pointer' : 'unset',
                                                                }}
                                                                onClick={async () => {
                                                                    if (!it.cid) {
                                                                        return;
                                                                    }
                                                                    this.state.selectedRows = this.state.selectedRows || [];
                                                                    let tmp = this.state.selectedRows.filter(o => o.cid == it.cid)[0];
                                                                    let idx = this.state.selectedRows.indexOf(tmp);
                                                                    if (idx === -1) {
                                                                      this.state.selectedRows.push(it);
                                                                    } else {
                                                                      this.state.selectedRows.splice(idx, 1);
                                                                    }
                                                                    console.info('this.state.selectedRows', this.state.selectedRows)
                                                                    this.setState({ selectedRows: [].concat(this.state.selectedRows) });
                                                                }}
                                                            >
                                                                {!!it.cid && (
                                                                    <input style={{marginTop: "4px"}} type="checkbox" checked={!!(this.state.selectedRows || []).filter(o => o.cid == it.cid)[0]}/>
                                                                )}
                                                            </td>
                                                            <td className="table-td">
                                                                {it.uid}
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.msn}</span>
                                                            </td>
                                                            <td className="table-td">
                                                              <span>{it.cid}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.sn}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.ver}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.vendor.name}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.createDate ? moment(new Date(it.createDate)).format('DD/MM/YYYY HH:mm:ss') : ''}</span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
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
                                                    totalRecords={this.props.totalRecords}
                                                    totalPages={this.props.totalPages}
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
                                                    pageIndex={this.props.pageIndex}
                                                    pageSize={this.props.pageSize}
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
                                        padding: '30px',
                                        borderBottom: '1px solid #ddd',
                                        borderTop: '1px solid #ddd',
                                        paddingTop: '20px',
                                        paddingBottom: '20px',
                                        pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                                        display: 'flex',
                                      }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                          <div
                                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '15px', }}
                                          >
                                            <span>
                                              Skip check version
                                            </span>
                                            <input style={{marginLeft: '5px'}} type="checkbox" checked={!!this.state.skipCheckOTAVersion}
                                              onClick={evt => {
                                                this.setState({
                                                  skipCheckOTAVersion: !this.state.skipCheckOTAVersion
                                                })
                                              }}
                                            />
                                          </div>
                                          <div
                                            className="button-btn w-160 mr-30"
                                              onClick={async () => {
                                                const selectedUids = [];
                                                let tmpSelect = {};
                                                this.state.selectedRows?.forEach(o => {
                                                  selectedUids.push(o.uid);
                                                  tmpSelect[o.uid] = o;
                                                });
                                                if (!selectedUids.length) {
                                                    Swal.fire({
                                                      html: `<p style='text-align: center; font-size: 14px;'>Please select data</p>`,
                                                      icon: 'error',
                                                      confirmButtonText: 'OK',
                                                    });
                                                    return;
                                                }
                                                this.state.batchs = [];
                                                this.state.batchId = 'batch_' + Date.now();
                                                let eId = '#' + this.state.batchId;
                                                let uuid = uv4();
                                                for (let i = 0; i < selectedUids.length; i++) {
                                                  if (!document.querySelectorAll(eId).length) {
                                                    Swal.fire({
                                                      html: `<p style='text-align: center; font-size: 14px;' id=${this.state.batchId}></p>`,
                                                      icon: 'success',
                                                      confirmButtonText: 'OK',
                                                    });
                                                    document.querySelectorAll(eId)[0].parentElement.parentElement.parentElement.querySelectorAll('button.swal2-confirm')[0].style.display = 'none'
                                                  }
                                                  document.querySelectorAll(eId)[0].parentElement.parentElement.parentElement.querySelectorAll('button.swal2-confirm')[0].style.display = 'none'
                                                  let html = '';
                                                  this.state.batchs?.map(b => {
                                                      let key = Object.keys(b)[0];
                                                      if (Number(b[key]) > 0) {
                                                        html += (key + ': ' + 'MID ' + b[key] + ' is sent successfully.' + '<br/>')
                                                      } else {
                                                        html += (key + ': ' + b[key] + '<br/>')
                                                      }
                                                  })
                                                  html += (this.state.batchs?.lenth ? '<br/>' : '') + 'Waiting for ' + selectedUids[i];
                                                  document.querySelectorAll(eId)[0].innerHTML = html;
                                                  let selectVersion = tmpSelect[selectedUids[i]].selectVersion;
                                                  await this.sendCommand(selectedUids[i], this.state.skipCheckOTAVersion === true ? 'OTA' : 'INF', null, uuid, selectVersion);
                                                  html = '';
                                                  this.state.batchs?.map(b => {
                                                      let key = Object.keys(b)[0];
                                                      if (Number(b[key]) > 0) {
                                                        html += (key + ': ' + 'MID ' + b[key] + ' is sent successfully.' + '<br/>')
                                                      } else {
                                                        html += (key + ': ' + b[key] + '<br/>')
                                                      }
                                                  })
                                                  document.querySelectorAll(eId)[0].innerHTML = html;
                                                }

                                                let html = '';
                                                this.state.batchs?.map(b => {
                                                    let key = Object.keys(b)[0];
                                                    if (Number(b[key]) > 0) {
                                                      html += (key + ': ' + 'MID ' + b[key] + ' is sent successfully.' + '<br/>')
                                                    } else {
                                                      html += (key + ': ' + b[key] + '<br/>')
                                                    }
                                                })
                                                html += 'Done!';
                                                html += '<br/><a target="_blank" href="/batch-process-logs?search=' + uuid + '">See detail</a>';
                                                document.querySelectorAll(eId)[0].innerHTML = html;
                                                document.querySelectorAll(eId)[0].parentElement.parentElement.parentElement.querySelectorAll('button.swal2-confirm')[0].style.display = null;
                                              }}
                                          >
                                            <span>{'UPGRADE FIRMWARE'}</span>
                                          </div>
                                        </div>
                                        <div
                                          className="flex w-160 align-items-center justify-content-center button-btn"
                                          onClick={async () => {
                                            const selectedUids = [];
                                            this.state.selectedRows?.forEach(o => {
                                              selectedUids.push(o.uid);
                                            });
                                            if (!selectedUids.length) {
                                              Swal.fire({
                                                html: `<p style='text-align: center; font-size: 14px;'>Please select data</p>`,
                                                icon: 'error',
                                                confirmButtonText: 'OK',
                                              });
                                              return;
                                            }
                                            this.state.batchs = [];
                                            this.state.batchId = 'batch_' + Date.now();
                                            let eId = '#' + this.state.batchId;
                                            let uuid = uv4();
                                            for (let i = 0; i < selectedUids.length; i++) {
                                              if (!document.querySelectorAll(eId).length) {
                                                Swal.fire({
                                                  html: `<p style='text-align: center; font-size: 14px;' id=${this.state.batchId}></p>`,
                                                  icon: 'success',
                                                  confirmButtonText: 'OK',
                                                });
                                                document.querySelectorAll(eId)[0].parentElement.parentElement.parentElement.querySelectorAll('button.swal2-confirm')[0].style.display = 'none';
                                              }
                                              document.querySelectorAll(eId)[0].parentElement.parentElement.parentElement.querySelectorAll('button.swal2-confirm')[0].style.display = 'none';
                                              let html = '';
                                              this.state.batchs?.map(b => {
                                                let key = Object.keys(b)[0];
                                                if (Number(b[key]) > 0) {
                                                  html += (key + ': ' + 'MID ' + b[key] + ' is sent successfully.' + '<br/>');
                                                } else {
                                                  html += (key + ': ' + b[key] + '<br/>');
                                                }
                                              });
                                              html += (this.state.batchs?.lenth ? '<br/>' : '') + 'Waiting for ' + selectedUids[i];
                                              document.querySelectorAll(eId)[0].innerHTML = html;
                                              await this.sendCommand(selectedUids[i], 'INF', 'TCM_INFO', uuid);
                                              html = '';
                                              this.state.batchs?.map(b => {
                                                let key = Object.keys(b)[0];
                                                if (Number(b[key]) > 0) {
                                                  html += (key + ': ' + 'MID ' + b[key] + ' is sent successfully.' + '<br/>');
                                                } else {
                                                  html += (key + ': ' + b[key] + '<br/>');
                                                }
                                              });
                                              document.querySelectorAll(eId)[0].innerHTML = html;
                                            }

                                            let html = '';
                                            this.state.batchs?.map(b => {
                                              let key = Object.keys(b)[0];
                                              if (Number(b[key]) > 0) {
                                                html += (key + ': ' + 'MID ' + b[key] + ' is sent successfully.' + '<br/>');
                                              } else {
                                                html += (key + ': ' + b[key] + '<br/>');
                                              }
                                            });
                                            html += 'Done!';
                                            html += '<br/><a target="_blank" href="/batch-process-logs?search=' + uuid + '">See detail</a>';
                                            document.querySelectorAll(eId)[0].innerHTML = html;
                                            document.querySelectorAll(eId)[0].parentElement.parentElement.parentElement.querySelectorAll('button.swal2-confirm')[0].style.display = null;
                                          }}
                                        >
                                          <span>{'GET TCM INFO'}</span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                          display: 'flex',
                                          flex: 1,
                                          flexDirection: 'row',
                                          background: '#fff',
                                          minHeight: '300px',
                                          pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                                          overflow: 'visible',
                                        }}
                                        className="doctor-list"
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'visible', width: '100%' }}>
                                            <table className="table">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="table-th" scope="col">UID</th>
                                                    <th className="table-th" scope="col">MSN</th>
                                                    <th className="table-th" scope="col">eSIM ID</th>
                                                    <th className="table-th" scope="col">SN</th>
                                                    <th className="table-th" scope="col">Version</th>
                                                    <th className="table-th" scope="col">Select version</th>
                                                    <th className="table-th" scope="col">Vendor</th>
                                                    <th className="table-th" scope="col">Created At</th>
                                                    <th className="table-th" scope="col"/>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {(this.state.selectedRows || [])
                                                    .map((it, index) => {
                                                        if (!it.selectVersion && this.state.firmwares[it.vendor?.name][0]) {
                                                          it.selectVersion = this.state.firmwares[it.vendor?.name][0].version;
                                                        }

                                                        return (
                                                            <tr
                                                                key={index}
                                                                style={{
                                                                  //cursor: 'pointer',
                                                                  backgroundColor:  this.state.selectedRow === index ? '#6c6cef' : '#fff',
                                                                  color: this.state.selectedRow === index ? '#fff' : 'black',
                                                                }}
                                                            >
                                                                <td className="table-td">
                                                                    {it.uid}
                                                                </td>
                                                                <td className="table-td">
                                                                    <span>{it.msn}</span>
                                                                </td>
                                                                <td className="table-td">
                                                                  <span>{it.cid}</span>
                                                                </td>
                                                                <td className="table-td">
                                                                    <span>{it.sn}</span>
                                                                </td>
                                                                <td className="table-td">
                                                                    <span>{it.ver}</span>
                                                                </td>
                                                                <td className="table-td">
                                                                    <SelectCustom
                                                                        field={{
                                                                          name: 'selectVersion',
                                                                        }}
                                                                        name="selectVersion"
                                                                        options={[
                                                                          ...(
                                                                                this.state.firmwares[it.vendor?.name] || []
                                                                            ).map(item => ({
                                                                              label: item.version,
                                                                              value: item.version,
                                                                            })),
                                                                        ]}
                                                                        value={it.selectVersion || this.state.firmwares[it.vendor?.name][0].id}
                                                                        onChange={(field, value) => {
                                                                          it.selectVersion = value.value;
                                                                          this.setState({ selectedRows: [].concat(this.state.selectedRows) });
                                                                        }}
                                                                        groupstyle={{ marginBottom: '0px', minWidth: '250px',}}
                                                                    />
                                                                </td>
                                                                <td className="table-td">
                                                                    <span>{it.vendor?.name}</span>
                                                                </td>
                                                                <td className="table-td">
                                                                    <span>{it.createDate ? moment(new Date(it.createDate)).format('DD/MM/YYYY HH:mm:ss') : ''}</span>
                                                                </td>
                                                                <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                                    <div
                                                                        data-tip="Click to unselect"
                                                                        className="button-icon"
                                                                        onClick={async () => {
                                                                            this.state.selectedRows = this.state.selectedRows || [];
                                                                            let tmp = this.state.selectedRows.filter(o => o.cid == it.cid)[0];
                                                                            let idx = this.state.selectedRows.indexOf(tmp);
                                                                            if (idx === -1) {
                                                                              this.state.selectedRows.push(it);
                                                                            } else {
                                                                              this.state.selectedRows.splice(idx, 1);
                                                                            }
                                                                            console.info('this.state.selectedRows', this.state.selectedRows)
                                                                            this.setState({ selectedRows: [].concat(this.state.selectedRows) });
                                                                        }}
                                                                    >
                                                                        <span>
                                                                            <i className={`fa fa-${!(this.state.selectedRows || []).filter(o => o.cid == it.cid)[0] ? 'plus' : 'rotate-left'}`} />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            </> :null}
                        </div>
                      {!!this.state.openEditDialog && (
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
                          <span style={{ fontWeight: '500', fontSize: '18px' }}>
                              {'Edit device'}
                          </span>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '30px', marginBottom: '15px', marginTop: '15px'  }}>
                            <label style={{ fontWeight: '400', fontSize: '16px', width: '60px' }}>
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
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '30px' }}>
                            <label style={{ fontWeight: '400', fontSize: '16px', width: '60px' }}>
                              {'MSN: '}
                            </label>
                            <input
                              style={{ width: '100%', height: '30px', outline: 'unset', border: '0.5px solid', borderRadius: '3px' }}
                              value={this.state.msn}
                              defaultValue={this.state.selectedData.msn}
                              onChange={(event) => {
                                this.setState({ msn: event.target.value });
                              }}
                            />
                          </div>
                          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                              style={{
                                marginRight: '15px',
                                height: '40px',
                                width: '80px',
                                borderRadius: '3px',
                                border: '0.5px solid green',
                                backgroundColor: '#d5e8d4',
                                cursor: 'pointer',
                                color: '#000000',
                              }}
                              onClick = {async () => {
                                const data = {};
                                data.id = this.state.selectedData.id;
                                data.uid = this.state.selectedData.uid;
                                data.msn = (this.state.msn === null || this.state.msn === undefined) ? this.state.selectedData.msn
                                  : (this.state.msn === '' ? null : this.state.msn);

                                const response = await editDevice(data);
                                if (response.success === true) {
                                  Swal.fire(
                                    'Done!',
                                    'Your database has been changed!',
                                    'success',
                                  )
                                    .then(() => {
                                      this.setState({ openEditDialog: false, msn: undefined });
                                      window.location.href = window.location.href;
                                    });
                                } else {
                                  Swal.fire(
                                    'Error!',
                                    response.message || response.errorDescription || '',
                                    'error',
                                  );
                                }
                              }}
                            >
                              {'Save'}
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
                                this.setState({ openEditDialog: false, msn: undefined });
                              }}
                            >
                              {'Cancel'}
                            </button>
                          </div>
                        </div>
                      )}

                      {!!this.state.openWarningDialog && (
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
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ fontWeight: '500', fontSize: '18px' }}>
                              {'Alert'}
                          </span>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '30px', marginBottom: '15px', marginTop: '15px'  }}>
                            <label style={{ fontWeight: '400', fontSize: '16px', }}>
                              {this.state.warningMessage}
                            </label>
                          </div>

                          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                              style={{
                                marginRight: '15px',
                                height: '40px',
                                width: '80px',
                                borderRadius: '3px',
                                border: '0.5px solid green',
                                backgroundColor: '#d5e8d4',
                                cursor: 'pointer',
                                color: '#000000',
                                flex: 1,
                              }}
                              onClick = {async () => {
                                this.setState({openWarningDialog: false})
                              }}
                            >
                              {'Close'}
                            </button>
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
                            border: '1px solid',
                            borderRadius: '3px',
                            padding: '15px 15px 15px 15px',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <span style={{ fontWeight: '500', fontSize: '18px' }}>
                              {'Raw Message'}
                          </span>
                          <span style={{ marginTop: '15px', overflow: 'auto', width: '100%', height: '60%' }}>
                            {this.state.rawMessage}
                          </span>
                          <button
                            style={{
                              height: '40px',
                              width: '80px',
                              borderRadius: '3px',
                              border: '0.5px solid green',
                              backgroundColor: '#f8cecc',
                              cursor: 'pointer',
                              color: '#000000',
                              marginTop: '10%',
                              alignSelf: 'center',
                            }}
                            onClick={() => {
                              this.setState({ showRawMessage: false, rawMessage: undefined })
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
                          </span>*
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
                            <label style={{ fontWeight: 400, fontSize: '16px', width: '120px' }}>
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
                                border: '0.5px solid green',
                                backgroundColor: '#d5e8d4',
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
                  style={{ width: '10%', position: 'relative', fontSize: '16px' }}
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
                  style={{ width: '10%', position: 'relative', fontSize: '16px' }}
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
