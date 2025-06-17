import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { editDevice, getAllDevices, getRelatedLogs, sendCommand, getMeterLogs, getCids, getMeterCommissions } from '@app/api/log';
import { Pagination, ProgressLoading, SelectCustom } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import ReactTooltip from 'react-tooltip';
import { Chart } from 'react-google-charts';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getCookie, eraseCookie } from '@app/utils/cookie';
import { tokenName } from '@app/utils/public-config';

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
  :global(.checkbox-container) {
    display: flex;
    flexDirection: row;
    align-items: center;
    margin-right: 15px;
    margin-left: 15px;
    color: #282828;
    @media(max-width: 900px) {
      margin-bottom: 10px !important;
      // width: 5% !important;
      margin-right: 0px;
    }
    >input {
      height: 16px;
      width: 16px;
    }
    >span {
      font-size: 14px;
      white-space: nowrap;
    }
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
  :global(.table-td) {
    padding: 10px;
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
    const { query: { q, page, fromDate, toDate, status, querySn, queryMsn, userSubmit, querySnOrCid, hasSubmission, cids, jobSheetNo, jobBy }, asPath, req, initialState: {} } = args;

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
        toDate: !!toDate ? (new Date(toDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        userSubmit: !!userSubmit ? userSubmit : undefined,
        querySnOrCid: !!querySnOrCid ? querySnOrCid : undefined,
        selectedCids: cidsParam.length > 0 ? cidsParam : undefined,
        hasSubmission: hasSubmission === "true" ? "true" : "false",
        cidIsNotNull: true,
        jobSheetNo: !!jobSheetNo ? jobSheetNo : undefined,
        jobBy: !!jobBy ? jobBy : undefined,
      },
      limit: 5,
      offset: (pageNumber - 1) * 5,
    };

    let rp = await getMeterCommissions(params, req);
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
      hasSubmission: params.options.hasSubmission,
      selectedCids,
      cidList,
      jobSheetNo,
      jobBy,
    };
  }
  state = {
    ...this.props,
    profile: 'METER_SG_TATA_PA_B01',
    tmpStyles: {
      enabledText: { color: 'white', textAlign: 'center', fontSize: '16', lineHeight: 19 },
      enabledButton: {
          backgroundColor: '#BD2228', borderColor: '#BD2228', borderRadius: '5px', borderWidth: '1px', marginTop: '56px',
          width: '160px', height: '41px', justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          fontWeight: '500',
      },
    },
    checkbox: {
      hasSubmission: this.props.hasSubmission === "true",
    }
  };
  constructor(props) {
    super(props);
  }

  sendCommand = async (uid, cmd, type) => {
    const response = await sendCommand({ uid, cmd, type });
    if (response.success) {
      const mid = response.response;
      this.setState({ loading: false });
      const rp = await getRelatedLogs({ uid, msn: this.state.selectedData.msn, ptype: cmd });
      this.setState({ relatedLogs: rp.response || [] });
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

  render() {
    let tmpStyles = this.state.tmpStyles;
    return (
            <TotPage title={'Meter Commissioning Report (P2)'}>
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
                            {!this.state.uploadDeviceCsr ?
                            <>
                                <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                                  <h5 className="site-title">Meter Commissioning Report (P2)</h5>
                                </div>
                                <div
                                  style={{
                                    padding: '30px',
                                    borderBottom: '1px solid #ddd',
                                    pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
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
                                        flexDirection: 'row',
                                        width: '100%',
                                      }}
                                    >
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
                                            padding: '0px 10px',
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
                                            padding: '0px 10px',
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
                                        placeholder="Search MCU SN..."
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
                                        placeholder="Search Meter SN..."
                                        onChange={event => this.setState({ searchMsn: event.target.value })}
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
                                        value={ this.state.userSubmit || '' }
                                        placeholder="Search P2Submit user..."
                                        onChange={event => this.setState({ userSubmit: event.target.value })}
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
                                        value={ this.state.jobSheetNo || '' }
                                        placeholder="Search Job sheet no..."
                                        onChange={event => this.setState({ jobSheetNo: event.target.value })}
                                      />
                                      <div className="checkbox-container">
                                        <input
                                          type="checkbox"
                                          id="enrollment-date"
                                          name="enrollment-date"
                                          checked={!!this.state.checkbox?.hasSubmission}
                                          value={this.state.checkbox?.hasSubmission}
                                          onChange={(event) => {
                                            if (!!event.target.checked) {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                hasSubmission: true,
                                                all: false,
                                              }});
                                            } else {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (!this.state.checkbox?.coupledDate && !this.state.checkbox?.activationDate
                                                    && !this.state.checkbox?.deactivationDate),
                                                hasSubmission: false,
                                              }});
                                            }
                                          }}
                                        />
                                        <span style={{ marginLeft: '5px' }}>{'Has submission'}</span>
                                      </div>
                                      <div className="button-btn"
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
                                              userSubmit: (this.state.userSubmit || '').toLowerCase(),
                                              querySnOrCid: !!this.state.querySnOrCid ? this.state.querySnOrCid?.toUpperCase() : '',
                                              hasSubmission: !!this.state.checkbox?.hasSubmission ? 'true' : 'false',
                                              listCid: this.state.listCid ? selectedCids : '',
                                              jobSheetNo: !!this.state.jobSheetNo ? this.state.jobSheetNo : '',
                                            };

                                           let pathName = window.location.pathname;
                                           if (Object.keys(options).length) {
                                             pathName = pathName.concat("?");
                                             if (!!options.status) {
                                               pathName = pathName.concat(`status=${options.status}&`)
                                             }
                                             if (!!options.fromDate) {
                                               pathName = pathName.concat(`fromDate=${options.fromDate}&`)
                                             }
                                             if (!!options.toDate) {
                                               pathName = pathName.concat(`toDate=${options.toDate}&`)
                                             }
                                             if (!!options.querySn) {
                                               pathName = pathName.concat(`querySn=${options.querySn}&`)
                                             }
                                             if (!!options.queryMsn) {
                                               pathName = pathName.concat(`queryMsn=${options.queryMsn}&`)
                                             }
                                             if (!!options.userSubmit) {
                                               pathName = pathName.concat(`userSubmit=${options.userSubmit}&`)
                                             }
                                             if (!!options.querySnOrCid) {
                                               pathName = pathName.concat(`querySnOrCid=${options.querySnOrCid}&`)
                                             }
                                             if (!!options.hasSubmission) {
                                               pathName = pathName.concat(`hasSubmission=${options.hasSubmission}&`)
                                             }
                                             if (!!options.listCid) {
                                               pathName = pathName.concat(`cids=${options.listCid}&`)
                                             }
                                             if (!!options.jobSheetNo) {
                                               pathName = pathName.concat(`jobSheetNo=${options.jobSheetNo}&`)
                                               pathName = pathName.concat(`jobBy=${this.props.userInfo.email}&`)
                                             }
                                           }
                                           pathName = pathName.slice(0, pathName.length - 1)
                                           require('@app/utils/next-routes').Router.pushRoute(pathName);
                                         }}
                                         style={{
                                           width: 'fit-content',
                                           padding: '15px',
                                           marginLeft: '15px',
                                         }}
                                      >
                                        <span>{'SEARCH'}</span>
                                      </div>
                                      <div className="button-btn"
                                         onClick={async () => {
                                            const selectedCids = [];
                                            this.state.selectedCids?.forEach((cid) => {
                                              selectedCids.push(cid.value);
                                            });
                                            const filter = {
                                              options: {
                                                exportCSV: true,
                                                status: this.state.selectedStatus,
                                                fromDate: !!this.state.fromDate ? new Date(this.state.fromDate).getTime() : undefined,
                                                toDate: !!this.state.toDate ? (new Date(this.state.toDate).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,
                                                querySn: this.state.searchSn,
                                                queryMsn: this.state.searchMsn?.toUpperCase(),
                                                userSubmit: (this.state.userSubmit || '').toLowerCase(),
                                                selectedCids: this.state.listCid || selectedCids,
                                                hasSubmission: !!this.state.checkbox?.hasSubmission ? 'true' : 'false',
                                                activateDate: this.state.activateDate ? new Date(this.state.activateDate).getTime() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
                                              },
                                            };

                                            let jobSheetNo = !!this.state.jobSheetNo ? this.state.jobSheetNo : '';
                                            if (jobSheetNo) {
                                              filter.options.jobSheetNo = jobSheetNo;
                                              filter.options.jobBy = this.props.userInfo.email;
                                            }

                                            const url = '/api/meter-commissions?&timeZone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
                                            const method = 'POST';
                                            const rp = await fetch(url, {
                                              method,
                                              body: JSON.stringify(filter),
                                              headers: {
                                                'Content-Type' : 'application/json',
                                                'Authorization': getCookie(tokenName),
                                              },
                                            })
                                              .then((response) => {
                                                return response.blob();
                                              });
                                            if (rp) {
                                              const tag =  moment(new Date()).format('YYYYMMDDHHmmss');
                                              const fileName = 'meter-commissions-reports-' + tag + '.csv';
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
                                         style={{
                                           width: 'fit-content',
                                           padding: '15px',
                                           marginLeft: '15px',
                                         }}
                                      >
                                        <span>{'EXPORT'}</span>
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
                                        {'Export CSV'}
                                      </span>
                                    </div>*/}
                                  </div>
                                </div>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }} className="doctor-list">
                                    <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                                        <table className="table">
                                            <thead className="thead-dark">
                                            <tr>
                                                <th className="table-th" scope="col">Meter SN</th>
                                                <th className="table-th" scope="col">MCU SN</th>
                                                <th className="table-th" scope="col">MCU Profile</th>
                                                <th className="table-th" scope="col">Meter Data</th>
                                                <th className="table-th" scope="col">P2Submit user</th>
                                                <th className="table-th" scope="col">P2Checking time</th>
                                                <th className="table-th" scope="col">Commit time</th>
                                                <th className="table-th" scope="col">Meter photo</th>
                                                <th className="table-th" scope="col">P2Checking Result</th>
                                                <th className="table-th" scope="col">Job sheet no</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {(this.props.devices || [])
                                                .map((it, index) => {
                                                  let showLastSubmit = {data: it}
                                                  return (
                                                        <tr
                                                            key={index}
                                                            style={{
                                                              // cursor: 'pointer',
                                                              backgroundColor:  this.state.selectedRow === index ? '#6c6cef' : '#fff',
                                                              color: this.state.selectedRow === index ? '#fff' : 'black',
                                                            }}
                                                        >
                                                            <td className="table-td">
                                                                {it.msn}
                                                            </td>
                                                            <td className="table-td">
                                                              <span>{it.sn}</span>
                                                            </td>
                                                            <td className="table-td">
                                                              <div style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                                {!!it.id && (
                                                                <div style={{
                                                                  flex: 1,
                                                                  marginLeft: '15px',
                                                                  marginBottom: '5px',
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  justifyContent: 'flex-start',
                                                                }}>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                                                                    <div style={{marginRight: '10px'}}>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{'MCU SN: '}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{(showLastSubmit?.data?.sn || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    marginBottom: '10px',
                                                                    flexWrap: 'wrap'
                                                                  }}>
                                                                    <div style={{marginRight: '10px'}}>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{'MCU UUID: '}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{(showLastSubmit?.data?.uid || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    marginBottom: '10px',
                                                                    flexWrap: 'wrap'
                                                                  }}>
                                                                    <div style={{marginRight: '10px'}}>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{'ESIM ID: '}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{(showLastSubmit?.data?.cid || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    marginBottom: '10px',
                                                                    flexWrap: 'wrap'
                                                                  }}>
                                                                    <div style={{marginRight: '10px'}}>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{'STATUS: '}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{(showLastSubmit?.data?.status || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    marginBottom: '10px',
                                                                    flexWrap: 'wrap'
                                                                  }}>
                                                                    <div style={{marginRight: '10px'}}>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{'COUPLED STATE: '}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{(showLastSubmit?.data?.type || 'N/A')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    marginBottom: '10px',
                                                                    flexWrap: 'wrap'
                                                                  }}>
                                                                    <div style={{marginRight: '10px'}}>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{'COUPLED USER: '}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{(showLastSubmit?.data?.coupledUser)}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    marginBottom: '10px',
                                                                    flexWrap: 'wrap'
                                                                  }}>
                                                                    <div style={{marginRight: '10px'}}>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{'Onboarding Time: '}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{showLastSubmit?.data?.lastOBRDate > 0 ? moment(showLastSubmit?.data?.lastOBRDate).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                )}
                                                              </div>
                                                            </td>
                                                            <td className="table-td">
                                                              <div style={{
                                                                flex: 1,
                                                                paddingTop: '10px',
                                                                paddingBottom: '5px',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                              }}>
                                                                {!!it.id && (
                                                                <div style={{
                                                                  flex: 1,
                                                                  marginLeft: '15px',
                                                                  marginBottom: '5px',
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  justifyContent: 'flex-start',
                                                                }}>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{'Kwh: ' + (showLastSubmit?.data?.kwh || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{'Kw: ' + (showLastSubmit?.data?.kw || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{'I: ' + (showLastSubmit?.data?.i || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{'V: ' + (showLastSubmit?.data?.v || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{'PF: ' + (showLastSubmit?.data?.pf || '')}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{whiteSpace: 'nowrap'}}>
                                                                        {'DTime: ' + (showLastSubmit?.data?.dt ? moment(showLastSubmit?.data?.dt).format("YYYY-MM-DD HH:mm:ss") : "")}{' (Meter Time)'}
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                )}
                                                              </div>
                                                            </td>
                                                            <td className="table-td">
                                                              <div style={{
                                                                flex: 1,
                                                                paddingTop: '10px',
                                                                marginBottom: '5px',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                              }}>
                                                                <div style={{
                                                                  flex: 1,
                                                                  marginLeft: '15px',
                                                                  marginBottom: '5px',
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  justifyContent: 'flex-start',
                                                                }}>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>
                                                                        {showLastSubmit?.data?.userSubmit || ''}
                                                                      </span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{}}>{''}</span>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </td>
                                                            <td className="table-td">
                                                              <div style={{
                                                                flex: 1,
                                                                paddingTop: '10px',
                                                                marginBottom: '5px',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                              }}>
                                                                {!!it.id && (
                                                                <div style={{
                                                                  flex: 1,
                                                                  marginLeft: '15px',
                                                                  marginBottom: '5px',
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  justifyContent: 'flex-start',
                                                                }}>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{whiteSpace: 'nowrap'}}>
                                                                        {!!showLastSubmit?.data?.timeSubmit ? moment(new Date(showLastSubmit?.data?.timeSubmit)).format("YYYY-MM-DD HH:mm:ss") : ''}
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                )}
                                                              </div>
                                                            </td>
                                                            <td className="table-td">
                                                              <div style={{
                                                                flex: 1,
                                                                paddingTop: '10px',
                                                                marginBottom: '5px',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                              }}>
                                                                {!!it.id && (
                                                                <div style={{
                                                                  flex: 1,
                                                                  marginLeft: '15px',
                                                                  marginBottom: '5px',
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  justifyContent: 'flex-start',
                                                                }}>
                                                                  <div
                                                                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                                                                    <div>
                                                                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                                                                    </div>
                                                                    <div>
                                                                      <span style={{whiteSpace: 'nowrap'}}>
                                                                        {!!showLastSubmit?.data?.createDate ? moment(new Date(showLastSubmit?.data?.createDate)).format("YYYY-MM-DD HH:mm:ss") : ''}
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                )}
                                                              </div>
                                                            </td>
                                                            <td className="table-td">
                                                              <div style={{
                                                                flex: 1,
                                                                paddingTop: '10px',
                                                                marginBottom: '5px',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                              }}>
                                                                {!!it.id && !!showLastSubmit?.data?.meterPhotos && !!(showLastSubmit?.data?.meterPhotos || '').split(",").length && (
                                                                <div style={{
                                                                  flex: 1,
                                                                  marginLeft: '15px',
                                                                  marginBottom: '5px',
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  justifyContent: 'center',
                                                                  alignItems: 'center',
                                                                }}>
                                                                  <i className="fa fa-eye"
                                                                    style={{cursor: 'pointer',}}
                                                                    onClick={() => {

                                                                      let urls = (showLastSubmit?.data?.meterPhotos || '').split(",");
                                                                      let piFileUpLoads = urls
                                                                                          .map((url, idx) => {
                                                                                            return {
                                                                                              uri: url,
                                                                                              title: url,
                                                                                              text: '(' + (idx + 1) + '/' + (urls.length) + ')'
                                                                                            }
                                                                                          })
                                                                      this.setState({
                                                                        piFileUpLoads,
                                                                        piFileUpLoadCurrentIndex: 0,
                                                                      })
                                                                    }}
                                                                  />
                                                                </div>
                                                                )}
                                                              </div>
                                                            </td>
                                                            <td className="table-td">
                                                              <div style={{
                                                                flex: 1,
                                                                paddingTop: '10px',
                                                                marginBottom: '5px',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                              }}>
                                                                {(!!it.id) ? (
                                                                <div style={{
                                                                  flex: 1,
                                                                  marginLeft: '15px',
                                                                  marginBottom: '5px',
                                                                  display: 'flex',
                                                                  flexDirection: 'row',
                                                                  justifyContent: 'flex-start',
                                                                }}>
                                                                  {!!showLastSubmit?.data?.isPassed ? (
                                                                    <div
                                                                      disabled={true}
                                                                      style={{
                                                                        ...tmpStyles.enabledButton,
                                                                        backgroundColor: '#125e8c',
                                                                        borderColor: '#125e8c',
                                                                        width: '80px',
                                                                        marginTop: '5px',
                                                                        marginRight: '10px',
                                                                      }}
                                                                    >
                                                                      <span style={tmpStyles.enabledText}>{"PASS"}</span>
                                                                    </div>
                                                                  ) : (
                                                                    <div
                                                                      disabled={true}
                                                                      style={{
                                                                        ...tmpStyles.enabledButton,
                                                                        backgroundColor: '#8c1212',
                                                                        borderColor: '#8c1212',
                                                                        width: '80px',
                                                                        marginTop: '5px',
                                                                      }}
                                                                    >
                                                                      <span style={tmpStyles.enabledText}>{"FAIL"}</span>
                                                                    </div>
                                                                  )}
                                                                </div>
                                                                ) : 'No Submission'}
                                                              </div>
                                                            </td>
                                                            <td className="table-td">
                                                              <span>{it.jobSheetNo}</span>
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
                            </> :null}
                        </div>

                        {(!!this.state.piFileUpLoads?.length) && (
                        <div
                          style={{
                            backgroundColor: '#111111d6',
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
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div style={{position: 'relative', minHeight: '400px', backgroundColor: '#ffffff', overflow: 'visible'}}>
                            <img src={this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].uri}
                              key={this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].uri}
                              style={{
                                width: '500px',
                                maxWidth: '500px',
                                objectFit: 'cover',
                                minHeight: '500px',
                              }}
                            />
                            <div
                              style={{width: '500px', maxWidth: '500px', backgroundColor: '#ffffff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                              }}
                            >
                              <span style={{fontSize: 15, marginTop: 5,
                                fontWeight: '500',
                                marginBottom: '15px',
                                wordBreak: 'break-word',
                              }}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].title || 'Title'}</span>
                              <span style={{ }}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].text || ''}</span>
                              <button
                                className="button-btn w-80"
                                style={{
                                  alignSelf: 'center',
                                  border: 'unset',
                                  outline: 'unset',
                                  marginTop: '15px',
                                }}
                                onClick={() => {
                                  this.setState({ showPhotoP1Test: false, showPhotoP2Test: false, piFileUpLoads: [] });
                                }}
                              >
                                {'Close'}
                              </button>
                            </div>
                            {this.state.piFileUpLoads?.length > 1 && (<div
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "-22.5px",
                                color: "#ffffff",
                                width: 45,
                                height: 45,
                                borderRadius: "50%",
                                backgroundColor: "#111111",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 20,
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                let piFileUpLoadCurrentIndex = this.state.piFileUpLoadCurrentIndex || 0;
                                piFileUpLoadCurrentIndex--;
                                if (piFileUpLoadCurrentIndex < 0) {
                                  piFileUpLoadCurrentIndex = this.state.piFileUpLoads.length - 1;
                                }
                                this.setState({piFileUpLoadCurrentIndex})
                              }}
                            >
                              <i className="fa fa-arrow-left" style={{}} />
                            </div>)}
                            {this.state.piFileUpLoads?.length > 1 && (<div
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "-22.5px",
                                color: "#ffffff",
                                width: 45,
                                height: 45,
                                borderRadius: "50%",
                                backgroundColor: "#111111",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 20,
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                let piFileUpLoadCurrentIndex = this.state.piFileUpLoadCurrentIndex || 0;
                                piFileUpLoadCurrentIndex++;
                                if (piFileUpLoadCurrentIndex >= this.state.piFileUpLoads.length) {
                                  piFileUpLoadCurrentIndex = 0;
                                }
                                this.setState({piFileUpLoadCurrentIndex})
                              }}
                            >
                              <i className="fa fa-arrow-right" style={{}} />
                            </div>)}
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
                            <label style={{ fontWeight: '400', fontSize: '16px' }}>
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
                                this.setState({ openWarningDialog: false });
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
                              this.setState({ showRawMessage: false, rawMessage: undefined });
                            }}
                          >
                            {'Close'}
                          </button>
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

Homepage = require('react-redux').connect((state, ownProps) => {
    return {
      userInfo: state.userInfo || {},
    }
  },
  (dispatch) => ({
    dispatch
  }))(Homepage);
export default withNamespaces('common')(Homepage);
