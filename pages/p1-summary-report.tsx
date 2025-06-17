import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { deleteP1Report, getP1Report } from '@app/api/log';
import { Pagination, ProgressLoading } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import makeAnimated from 'react-select/animated';
import { getCookie } from '@app/utils/cookie';
import { tokenName } from '@app/utils/public-config';
import { Box, Modal, Typography } from "@material-ui/core";
import { CloseButton } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { IoMailUnreadOutline } from 'react-icons/io5';

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

  state = {
    ...this.props,
  };

  constructor(props) {
    super(props);
  }

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
        userSent,
        queryUid,
        searchFileName,
      }, asPath, req, initialState: {}
    } = args;

    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        status: !!status ? status : undefined,
        fromDate: !!fromDate ? new Date(fromDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        toDate: !!toDate ? (new Date(toDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        userSent: !!userSent ? userSent : undefined,
        searchFileName: !!searchFileName ? searchFileName : undefined,
        queryUid: !!queryUid ? queryUid : undefined,
      },
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };

    let rp = await getP1Report(params, req)

    rp = rp || {};
    rp.response = rp.response || {};
    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      statuses: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      page,
      asPath,
      selectedStatus: status,
      fromDate: params.options.fromDate ? moment(params.options.fromDate).format('YYYY-MM-DD') : undefined,
      toDate: params.options.toDate ? moment(params.options.toDate).format('YYYY-MM-DD') : undefined,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      searchUid: params.options.queryUid,
      searchUserSent: params.options.userSent,
      searchFileName: params.options.searchFileName,

    };
  }

  componentDidMount() {
    window._p1_test_json_template_import = '{"categories":[{"title":"Test Summary","items":[{"label":"Purpose","value":"","description":""},{"label":"Project Name","value":"","description":""},{"label":"Version Number","value":"","description":""},{"label":"Total MCU","value":"","description":""},{"label":"Tested by","value":"","description":""},{"label":"Datetime","value":"","description":""},{"label":"Summary Test Result","value":"","description":""}]},{"title":"Test Items Summary","items":[{"mcuTestedInfo":[{"label":"Tested MCU SN","value":"202206000057","description":""},{"label":"MCU module on 4G.","value":"","description":""},{"label":"MCU module on Wifi.","value":"","description":""},{"label":"MCU module on Bluetooth","value":"","description":""},{"label":"MCU on meter data","value":"","description":""},{"label":"MCU on Buttons","value":"","description":""},{"label":"MCU on LEDs","value":"","description":""},{"label":"MCU on MQTT","value":"","description":""},{"label":"MCU on Echo test*","value":"","description":""},{"label":"Additional Item:","value":"","description":""},{"label":"LogReport filename","value":"P1QA_MCU_[YYYYMMDD]_[MCUSN].pdf","description":""}]}]},{"title":"Additional  Info","items":[{"label":"Company","value":"","description":""},{"label":"Phone","value":"","description":""},{"label":"Email","value":"","description":""},{"label":"Comments","value":"","description":""}]}]}';
  }

  render() {
    return (
      <TotPage title={'P1 Provisioning MCU QA Summary Report'}>
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
              <div style={{
                padding: '15px',
                paddingTop: '20px',
                paddingBottom: '0px',
                fontWeight: 400,
                fontSize: '18px',
                color: '#000000'
              }}>
                <h5 className="site-title">P1 Provisioning MCU QA Summary Report</h5>
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
                      <span style={{ width: '80px' }}>{'From date: '}</span>
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          height: '40px',
                          width: '140px',
                          padding: '0px 5px'
                        }}
                        type="date"
                        value={this.state.fromDate}
                        onChange={event => this.setState({ fromDate: event.target.value })}
                      />
                    </div>
                    <div
                      style={{
                        marginLeft: '15px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ width: 'max-content' }}>{'To date: '}</span>
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          marginLeft: '5px',
                          height: '40px',
                          width: '140px',
                          padding: '0px 5px'
                        }}
                        type="date"
                        value={this.state.toDate}
                        onChange={event => this.setState({ toDate: event.target.value })}
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
                      value={this.state.searchSn || ''}
                      placeholder="Search MCU SN..."
                      onChange={event => this.setState({ searchSn: event.target.value })}
                    />
                    {/*
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
                      value={this.state.searchMsn || ''}
                      placeholder="Search MSN..."
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
                      value={this.state.searchUid || ''}
                      placeholder="Search UID..."
                      onChange={event => this.setState({ searchUid: event.target.value })}
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
                        marginLeft: '30px',
                        alignSelf: 'center',
                      }}
                      value={this.state.searchFileName || ''}
                      placeholder="Search file name..."
                      onChange={event => this.setState({ searchFileName: event.target.value })}
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
                      value={this.state.searchUserSent || ''}
                      placeholder="Search User..."
                      onChange={event => this.setState({ searchUserSent: event.target.value })}
                    />
                    <div
                      className="button-btn"
                      onClick={async () => {
                        const options = {
                          status: (!!this.state.selectedStatus && this.state.selectedStatus !== 'select') ? this.state.selectedStatus : '',
                          fromDate: !!this.state.fromDate ? moment(new Date(this.state.fromDate)).format('DD/MM/YYYY') : '',
                          toDate: !!this.state.toDate ? moment(new Date(this.state.toDate)).format('DD/MM/YYYY') : '',
                          querySn: !!this.state.searchSn ? this.state.searchSn : '',
                          queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : '',
                          queryUid: !!this.state.searchUid ? this.state.searchUid : '',
                          userSent: (this.state.searchUserSent || '').toLowerCase(),
                          searchFileName: (this.state.searchFileName || '').toLowerCase(),
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
                          if (!!options.queryUid) {
                            pathName = pathName.concat(`queryUid=${options.queryUid}&`)
                          }
                          if (!!options.userSent) {
                            pathName = pathName.concat(`userSent=${options.userSent}&`)
                          }
                          if (!!options.searchFileName) {
                            pathName = pathName.concat(`searchFileName=${options.searchFileName}&`)
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
                    <div
                      className="button-btn"
                      style={{
                        width: 'fit-content',
                        padding: '15px',
                        marginLeft: '15px',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => {
                        this.setState({ openUploadP1Report: true });
                      }}
                    >
                      <span>{'UPLOAD P1 TEST REPORT'}</span>
                    </div>
                    {/*
                    <div
                      className="button-btn"
                      onClick={async () => {
                        const filter = {
                          options: {
                            exportCSV: true,
                            status: this.state.selectedStatus,
                            fromDate: !!this.state.fromDate ? new Date(this.state.fromDate).getTime() : undefined,
                            toDate: !!this.state.toDate ? (new Date(this.state.toDate).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,
                            querySn: this.state.searchSn,
                            queryMsn: this.state.searchMsn?.toUpperCase(),
                            userSent: (this.state.searchUserSent || '').toLowerCase(),
                          },
                        };
                        const url = '/api/p1-online-statuses';
                        const method = 'POST';
                        const rp = await fetch(url, {
                          method,
                          body: JSON.stringify(filter),
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': getCookie(tokenName),
                          },
                        })
                          .then((response) => {
                            return response.blob();
                          });
                        if (rp) {
                          const tag = moment(new Date()).format('YYYYMMDDHHmmss');
                          const fileName = 'p1-online-status-reports-' + tag + '.csv';
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
                    */}
                  </div>
                </div>
              </div>
              <div
                style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }}
                className="doctor-list"
              >
                <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th" scope="col">File Name</th>
                      <th className="table-th" scope="col">SUBMIT BY</th>
                      <th className="table-th" scope="col">SUBMIT TIME</th>
                      <th className="table-th" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.statuses || [])
                      .map((it, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              backgroundColor: this.state?.selectedRow === index ? '#d8d8d8' : '#fff',
                            }}
                            onClick={async () => {
                              await this.setState({
                                selectedRow: index,
                                selectedData: it,
                                loading: true,
                              });

                              const params = {
                                options: {
                                  itemsList: true,
                                  p1ReportId: it.id,
                                },
                                limit: 20,
                                offset: 0,
                              };
                              const rp = await getP1Report(params);
                              this.setState({
                                selectedLog: null,
                                relatedLogs: rp?.response?.results || [],
                                totalRecordsRelatedLog: rp?.response?.totalRows,
                                totalPagesRelatedLog: Math.floor(((rp?.response?.totalRows || 0) + 19) / 20),
                                pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                                pageSizeRelatedLog: 20,
                                loading: false,
                              });
                            }}
                          >
                            <td className="table-td">
                              {it.fileName}
                            </td>
                            <td className="table-td">
                              <span>{it.userSubmit}</span>
                            </td>
                            <td className="table-td">
                              <span>{moment(new Date(it.timeSubmit)).format('YYYY/MM/DD HH:mm:ss')}</span>
                            </td>
                            <td className="table-td " style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}>
                              {true ?
                                <>
                                  <ReactTooltip globalEventOff="click" place="bottom"
                                                type="info" effect="solid"/>
                                  <div
                                    data-tip="Click to remove"
                                    className="button-icon"
                                    style={{ marginLeft: '20px' }}
                                    onClick={async () => {
                                      const result = await Swal.fire({
                                        html: `<p style='text-align: center; font-size: 14px;'>Are you sure ?</p>`,
                                        icon: 'question',
                                        confirmButtonText: 'OK',
                                        cancelButtonText: 'Cancel',
                                        showCancelButton: true,
                                      });
                                      if (result && result.isConfirmed) {
                                        let params = {
                                          id: it.id
                                        };

                                        let rp = await deleteP1Report(params);
                                        console.log(rp);

                                        if (rp.success) {
                                          Swal.fire({
                                            html: `
                                                          <p style='text-align: center; font-size: 14px;'>Delete successfully!</p>
                                                       `,
                                            icon: 'success',
                                            confirmButtonText: 'OK',
                                          })
                                          require('@app/utils/next-routes').Router.pushRoute(window.location.href);
                                        } else {
                                          Swal.fire({
                                            html: `
                                                        <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
                                                     `,
                                            icon: 'error',
                                            confirmButtonText: 'OK',
                                          })
                                        }
                                      }
                                    }
                                    }
                                  >
                                    <span>
                                      <i className="fa fa-trash-o"/>
                                    </span>
                                  </div>
                                </>
                                : null
                              }
                            </td>
                          </tr>
                        );
                      })
                    }
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
                      {this.state.totalRecords > this.state.pageSize && this.state.totalPages >= 2 &&
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

                  {!!this.state.selectedData?.id && (
                    <>
                      <div
                        style={{
                          borderBottom: '1px solid #ddd',
                          pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                        }}
                      >
                        <div
                          className={`site-title flex-column align-items-start justify-content-center ${!!this.state.selectedData && 'h-80'}`}
                          style={{ transition: 'all 0.2s' }}
                        >
                          <span>{'Test Items Summary'}</span>
                          <span style={{
                            color: '#000000',
                            fontSize: '14px',
                            fontWeight: 300,
                            display: this.state.selectedData ? 'flex' : 'none'
                          }}>
                              {this.state.selectedData ? 'Selected ' : ''}
                            {this.state.selectedData?.fileName ? 'File Name: ' + this.state.selectedData?.fileName + ', ' : ''}
                            {this.state.selectedData?.userSubmit ? ' SUBMIT BY: ' + this.state.selectedData?.userSubmit : ''}
                            {this.state.selectedData?.timeSubmit ? ' SUBMIT TIME: ' + moment(this.state.selectedData?.timeSubmit).format('YYYY-MM-DD HH:mm:ss') : ''}
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <div
                            style={{
                              display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'flex' : 'none',
                              flexDirection: 'row',
                              alignItems: 'center',
                              height: '100%',
                              transition: 'all 0.2s ease',
                              width: 'calc(100%)',
                            }}
                            className="box-log"
                          >
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                              className="log"
                            >
                              <div
                                style={{ display: 'flex' }}
                                className="log"
                              >
                                <input
                                  style={{
                                    border: '1px solid',
                                    borderRadius: '5px',
                                    outline: 'unset',
                                    height: '40px',
                                    width: '250px', minWidth: '250px', maxWidth: '250px',
                                    paddingLeft: '10px',
                                    marginLeft: '30px',
                                    alignSelf: 'center',
                                  }}
                                  type="text"
                                  value={this.state.searchSN || ''}
                                  placeholder="Search MCU SN..."
                                  onChange={event => this.setState({ searchSN: event.target.value })}
                                />
                                <input
                                  style={{
                                    border: '1px solid',
                                    borderRadius: '5px',
                                    outline: 'unset',
                                    height: '40px',
                                    width: '250px', minWidth: '250px', maxWidth: '250px',
                                    paddingLeft: '10px',
                                    marginLeft: '30px',
                                    alignSelf: 'center',
                                  }}
                                  type="text"
                                  value={this.state.searchLFN || ''}
                                  placeholder="Search Log Filename"
                                  onChange={event => this.setState({ searchLFN: event.target.value })}
                                />
                                <input
                                  style={{
                                    border: '1px solid',
                                    borderRadius: '5px',
                                    outline: 'unset',
                                    height: '40px',
                                    width: '250px', minWidth: '250px', maxWidth: '250px',
                                    paddingLeft: '10px',
                                    marginLeft: '30px',
                                    alignSelf: 'center',
                                  }}
                                  type="text"
                                  value={this.state.searchTS || ''}
                                  placeholder="Search Test Summary"
                                  onChange={event => this.setState({ searchTS: event.target.value })}
                                />
                              </div>
                            </div>
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '20px',
                            marginBottom: '20px'
                          }}>
                            <div
                              style={{
                                display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'inherit' : 'none',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: '100%',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                marginRight: '30px',
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
                                      p1ReportId: this.state.selectedData.id,
                                      querySn: this.state.searchSN,
                                      searchLogFileName: this.state.searchLFN,
                                      searchTestSummary: this.state.searchTS,
                                      mid: this.state.searchMid
                                    },
                                    limit: 20,
                                    offset: 0,
                                  };
                                  const rp = await getP1Report(params);
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
                                }}
                                onClick={async () => {
                                  await this.setState({
                                    searchSN: undefined,
                                    searchLFN: undefined,
                                    searchTS: undefined,
                                  });
                                  const params = {
                                    options: {
                                      p1ReportId: this.state.selectedData.id,
                                      querySn: this.state.searchSN,
                                      mid: this.state.searchMid
                                    },
                                    limit: 20,
                                    offset: 0,
                                  };
                                  const rp = await getP1Report(params);
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
                                {'CLEAR'}
                              </button>
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
                          <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                            <table className="table">
                              <thead className="thead-dark">
                              <tr>
                                <th className="table-th" scope="col">MCU SN</th>
                                <th className="table-th" scope="col">SUBMIT TIME</th>
                                <th className="table-th" scope="col">SUBMIT BY</th>
                                <th className="table-th" scope="col">VIEW DETAIL</th>
                              </tr>
                              </thead>
                              <tbody>
                              {(this.state.relatedLogs || [])
                                .map((it, index) => {

                                  try {
                                    it.rawObj = JSON.parse(it.raw);
                                  } catch (err) {
                                  }
                                  // it.rawObj = it.rawObj || {};
                                  // it.rawObj.header = it.rawObj.header || {};
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
                                        {it.sn}
                                      </td>
                                      <td className="table-td">
                                        {moment(it.timeSubmit).format('YY-MM-DD HH:mm:ss')}
                                      </td>
                                      <td className="table-td">
                                        {it.userSubmit}
                                      </td>
                                      <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                        <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                        <div
                                          className="button-icon ml-15"
                                          data-tip="Click to see raw message"
                                          onClick={() => {
                                            if (!this.state.showRawMessage) {
                                              let rawObj = JSON.parse(it.rawContent);
                                              let list = [];
                                              if (rawObj.mcuTestedInfo) {
                                                list = rawObj.mcuTestedInfo;
                                              } else {
                                                Object.keys(rawObj).map(k => {
                                                  if (!k.startsWith('_')) {
                                                    let propItem = {};
                                                    propItem['label'] = k;
                                                    propItem['value'] = rawObj[k];
                                                    list.push(propItem);
                                                  }
                                                })
                                              }
                                              this.setState({
                                                showRawMessage: true,
                                                rawMessage: list,
                                              });
                                            }
                                          }}
                                        >
                                          <IoMailUnreadOutline/>
                                        </div>
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
                                        uid: this.state.selectedData.uid,
                                        msn: this.state.selectedData.msn,
                                        mid: this.state.searchMid,
                                        fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                                        toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,

                                        p1ReportId: this.state.selectedData.id,
                                        querySn: this.state.searchSN,
                                        mid: this.state.searchMid,
                                        searchLogFileName: this.state.searchLFN,
                                        searchTestSummary: this.state.searchTS,
                                      },
                                      limit: 20,
                                      offset: (query.pageIndex - 1) * 20,
                                    };
                                    const rp = await getP1Report(params);
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
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Modal open={this.state.openUploadP1Report}>
                <Box
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                    padding: '20px',
                  }}
                >
                  <CloseButton className="w-5 h-5" onClick={() => this.setState({ openUploadP1Report: false })}/>
                  <Typography variant="h6" component="h2" style={{ marginBottom: '20px' }}>
                    UPLOAD P1 TEST REPORT
                  </Typography>
                  <input
                    style={{ marginBottom: '20px' }}
                    type="file"
                    placeholder={'File upload'}
                    accept=".csv"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file.name.includes(".json") || file.name.includes(".csv")) {
                        this.setState({ p1JsonFile: event.target.files[0] });
                      } else {
                        this.setState({ p1JsonFile: null });
                      }
                      ;
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <div
                      className="button-btn"
                      style={{
                        width: 'fit-content',
                        padding: '15px',
                        marginLeft: '15px',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={async () => {
                        if (this.state.p1JsonFile) {

                          await this.setState({ loading: true, openUploadP1Report: false, });
                          const formData = new FormData();
                          formData.append('file', this.state.p1JsonFile);
                          const url = '/api/bulk-submit-p1-report';
                          const method = 'POST';

                          await this.setState({ loading: true, openUploadAddress: false, });
                          let rp = await fetch(url,
                            {
                              headers: {
                                'Authorization': getCookie(tokenName),
                              },
                              method,
                              body: formData,
                            },
                          );
                          rp = await rp.json();
                          await this.setState({ loading: false });
                          if (rp && !!rp.success) {
                            await Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                              icon: 'success',
                              confirmButtonText: 'OK',
                            }).then(() => {
                              window.location.href = window.location.href;
                            });
                          } else {
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${rp?.errorDescription || rp?.message || 'Error'}</p>`,
                              icon: 'error',
                              confirmButtonText: 'OK',
                            });
                            return;
                          }
                        }
                      }}
                    >
                      <span>Upload</span>
                    </div>
                    <div
                      className="button-btn"
                      style={{
                        width: 'fit-content',
                        padding: '15px',
                        marginLeft: '15px',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => {
                        this.setState({ openUploadP1Report: false });
                      }}
                    >
                      <span>Cancel</span>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>

            {!!this.state.showRawMessage && (
              <div
                style={{
                  backgroundColor: '#fff',
                  position: 'fixed',
                  top: '15%',
                  left: '25%',
                  zIndex: 10,
                  width: '50%',
                  borderRadius: '5px',
                  padding: '30px 30px 15px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                  color: '#000000',
                  justifyContent: 'space-between',
                  overflow: 'auto',
                  maxHeight: '80%',
                }}
              >
                <span style={{ fontWeight: 500, fontSize: '18px', minHeight: '25px' }}>
                    {'Detail'}
                </span>
                <table className="table" style={{ marginTop: '25px', marginBottom: '25px' }}>
                  <thead className="thead-dark">
                  <tr>
                    <th>
                      TITLE
                    </th>
                    <th>
                      VALUE
                    </th>
                    <th>
                      DESCRIPTION
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {(this.state.rawMessage || [])
                    .map((it, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {it.label}
                          </td>
                          <td>
                            {it.value}
                          </td>
                          <td>
                            {it.desc}
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </table>
                <button
                  className="button-btn w-80"
                  style={{
                    alignSelf: 'center',
                    border: 'unset',
                    outline: 'unset',
                    minHeight: '50px'
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

Homepage = require('react-redux').connect((state, ownProps) => {
    return {
      userInfo: state.userInfo || {},
    }
  },
  (dispatch) => ({
    dispatch
  }))(Homepage);
export default withNamespaces('common')(Homepage);
