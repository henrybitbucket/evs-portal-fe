import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { getRelatedLogs, getRelayStatusLogs } from '@app/api/log';
import { DatePicker, Pagination, ProgressLoading } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import makeAnimated from 'react-select/animated';
import { getCookie } from '@app/utils/cookie';
import { tokenName } from '@app/utils/public-config';
import { IoMailUnreadOutline } from "react-icons/io5";
import ReactTooltip from "react-tooltip";

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
  :global(.log) {
    @media(min-width: 900px) {
      width: 19%;
      min-width:  265px;
      >input {
        width: 97% !important;
      }
    }
    @media(max-width: 900px) {
      width: 100%;
      margin-bottom: 10px;
      >input {
        width: 97% !important;
      }
    }
  }
  :global(.box-log) {
    flex-wrap: wrap;
    @media(max-width: 900px) {
      flex-direction: column !important;
      align-items: flex-start !important;
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
        queryFromDate,
        queryToDate,
        queryCommand,
        queryComment,
        queryBatchUuid,
        queryCommandBy,
        queryFilter,
      }, asPath, req, initialState: {}
    } = args;

    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        queryFromDate: !!queryFromDate ? new Date(queryFromDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        queryToDate: !!queryToDate ? (new Date(queryToDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,
        queryCommand: !!queryCommand ? queryCommand : undefined,
        queryComment: !!queryComment ? queryComment : undefined,
        queryBatchUuid: !!queryBatchUuid ? queryBatchUuid : undefined,
        queryCommandBy: !!queryCommandBy ? queryCommandBy : undefined,
        queryFilter: !!queryFilter ? queryFilter : undefined,
      },
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };

    let rp = await getRelayStatusLogs(params, req);

    rp = rp || {};
    rp.response = rp.response || {};
    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      rlsStatusLogs: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      page,
      asPath,
      fromDate: params.options.queryFromDate ? moment(params.options.queryFromDate).format('YYYY-MM-DD') : undefined,
      toDate: params.options.queryToDate ? moment(params.options.queryToDate).format('YYYY-MM-DD') : undefined,
      command: params.options.queryCommand,
      comment: params.options.queryComment,
      batchUuid: params.options.queryBatchUuid,
      commandBy: params.options.queryCommandBy,
      filter: params.options.queryFilter,
    };
  }

  render() {
    return (
      <TotPage title={'Relay Status Command Logs'}>
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
                <h5 className="site-title">Relay Status Command Logs</h5>
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
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <div style={{display: "flex"}}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <span style={{ width: '80px' }}>{'From date: '}</span>
                        <input
                          style={{
                            flex: 1,
                            border: '1px solid',
                            borderRadius: '5px',
                            height: '40px',
                            padding: '0px 5px'
                          }}
                          type="date"
                          value={this.state.fromDate}
                          onChange={event => this.setState({ fromDate: event.target.value })}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          marginLeft: '20px',
                        }}
                      >
                        <span style={{ width: '80px' }}>{'To date: '}</span>
                        <input
                          style={{
                            flex: 1,
                            border: '1px solid',
                            borderRadius: '5px',
                            height: '40px',
                            padding: '0px 5px'
                          }}
                          type="date"
                          value={this.state.toDate}
                          onChange={event => this.setState({ toDate: event.target.value })}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          marginLeft: '20px',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          marginLeft: '20px',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          marginLeft: '20px',
                        }}
                      />

                    </div>
                    <div style={{display: "flex", marginTop: '10px'}}>
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '100%',
                          paddingLeft: '10px',
                          alignSelf: 'center',
                        }}
                        value={this.state.command || ''}
                        placeholder="Search command..."
                        onChange={event => this.setState({ command: event.target.value })}
                      />
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '100%',
                          paddingLeft: '10px',
                          marginLeft: '20px',
                          alignSelf: 'center',
                        }}
                        value={this.state.comment || ''}
                        placeholder="Search comment..."
                        onChange={event => this.setState({ comment: event.target.value })}
                      />
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '100%',
                          paddingLeft: '10px',
                          marginLeft: '20px',
                          alignSelf: 'center',
                        }}
                        value={this.state.commandBy || ''}
                        placeholder="Search command by..."
                        onChange={event => this.setState({ commandBy: event.target.value })}
                      />
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '100%',
                          paddingLeft: '10px',
                          marginLeft: '20px',
                          alignSelf: 'center',
                        }}
                        value={this.state.filter || ''}
                        placeholder="Search filter (UUID, MSN, TYPE...)..."
                        onChange={event => this.setState({ filter: event.target.value })}
                      />
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '100%',
                          paddingLeft: '10px',
                          marginLeft: '20px',
                          alignSelf: 'center',
                        }}
                        value={this.state.batchUuid || ''}
                        placeholder="Search command batch id..."
                        onChange={event => this.setState({ batchUuid: event.target.value })}
                      />
                    </div>
                    <div style={{display: 'flex'}}>
                      <div
                        className="button-btn"
                        onClick={async () => {
                          const options = {
                            queryFromDate: !!this.state.fromDate ? moment(new Date(this.state.fromDate)).format('DD/MM/YYYY') : '',
                            queryToDate: !!this.state.toDate ? moment(new Date(this.state.toDate)).format('DD/MM/YYYY') : '',
                            queryCommand: !!this.state.command ? this.state.command : '',
                            queryComment: !!this.state.comment ? this.state.comment : '',
                            queryCommandBy: !!this.state.commandBy ? this.state.commandBy : '',
                            queryBatchUuid: !!this.state.batchUuid ? this.state.batchUuid : '',
                            queryFilter: !!this.state.filter ? this.state.filter : '',
                          };

                          let pathName = window.location.pathname;
                          if (Object.keys(options).length) {
                            pathName = pathName.concat("?");
                            if (!!options.queryFromDate) {
                              pathName = pathName.concat(`queryFromDate=${options.queryFromDate}&`)
                            }
                            if (!!options.queryToDate) {
                              pathName = pathName.concat(`queryToDate=${options.queryToDate}&`)
                            }
                            if (!!options.queryCommand) {
                              pathName = pathName.concat(`queryCommand=${options.queryCommand}&`)
                            }
                            if (!!options.queryComment) {
                              pathName = pathName.concat(`queryComment=${options.queryComment}&`)
                            }
                            if (!!options.queryCommandBy) {
                              pathName = pathName.concat(`queryCommandBy=${options.queryCommandBy}&`)
                            }
                            if (!!options.queryBatchUuid) {
                              pathName = pathName.concat(`queryBatchUuid=${options.queryBatchUuid}&`)
                            }
                            if (!!options.queryFilter) {
                              pathName = pathName.concat(`queryFilter=${options.queryFilter}&`)
                            }
                          }
                          pathName = pathName.slice(0, pathName.length - 1)
                          require('@app/utils/next-routes').Router.pushRoute(pathName);
                        }}
                        style={{
                          width: 'fit-content',
                          padding: '15px',
                          marginTop: '15px',
                        }}
                      >
                        <span>{'SEARCH'}</span>
                      </div>
                      <div
                        className="button-btn"
                        onClick={() => {
                          this.setState({
                            fromDate: null,
                            toDate: null,
                            command: null,
                            comment: null,
                            commandBy: null,
                            batchUuid: null,
                            filter: null,
                          })
                          require('@app/utils/next-routes').Router.pushRoute(window.location.pathname);
                        }}
                        style={{
                          width: 'fit-content',
                          padding: '15px',
                          marginTop: '15px',
                          marginLeft: '20px'
                        }}
                      >
                        <span>{'CLEAR'}</span>
                      </div>
                    </div>
                    {/*<div*/}
                    {/*  className="button-btn"*/}
                    {/*  onClick={async () => {*/}
                    {/*    const filter = {*/}
                    {/*      options: {*/}
                    {/*        exportCSV: true,*/}
                    {/*        status: this.state.selectedStatus,*/}
                    {/*        fromDate: !!this.state.fromDate ? new Date(this.state.fromDate).getTime() : undefined,*/}
                    {/*        toDate: !!this.state.toDate ? (new Date(this.state.toDate).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,*/}
                    {/*        querySn: this.state.searchSn,*/}
                    {/*        queryMsn: this.state.searchMsn?.toUpperCase(),*/}
                    {/*        userSent: (this.state.searchUserSent || '').toLowerCase(),*/}
                    {/*      },*/}
                    {/*    };*/}
                    {/*    const url = '/api/p1-online-statuses';*/}
                    {/*    const method = 'POST';*/}
                    {/*    const rp = await fetch(url, {*/}
                    {/*      method,*/}
                    {/*      body: JSON.stringify(filter),*/}
                    {/*      headers: {*/}
                    {/*        'Content-Type': 'application/json',*/}
                    {/*        'Authorization': getCookie(tokenName),*/}
                    {/*      },*/}
                    {/*    })*/}
                    {/*      .then((response) => {*/}
                    {/*        return response.blob();*/}
                    {/*      });*/}
                    {/*    if (rp) {*/}
                    {/*      const tag = moment(new Date()).format('YYYYMMDDHHmmss');*/}
                    {/*      const fileName = 'p1-online-status-reports-' + tag + '.csv';*/}
                    {/*      const url = window.URL.createObjectURL(new Blob([rp]));*/}
                    {/*      const link = document.createElement('a');*/}
                    {/*      link.href = url;*/}
                    {/*      link.setAttribute('download', fileName);*/}
                    {/*      document.body.appendChild(link);*/}
                    {/*      link.click();*/}
                    {/*      link.parentNode.removeChild(link);*/}
                    {/*      this.setState({ openExportCsv: false, activateDate: undefined });*/}
                    {/*    } else {*/}
                    {/*      alert('Something went wrong. Please try again!');*/}
                    {/*    }*/}
                    {/*  }}*/}
                    {/*  style={{*/}
                    {/*    width: 'fit-content',*/}
                    {/*    padding: '15px',*/}
                    {/*    marginLeft: '15px',*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <span>{'EXPORT'}</span>*/}
                    {/*</div>*/}
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
                      <th className="table-th" scope="col">COMMAND</th>
                      <th className="table-th" scope="col">COMMAND SEND BY</th>
                      <th className="table-th" scope="col">COMMENT</th>
                      <th className="table-th" scope="col">CREATED DATE</th>
                      <th className="table-th" scope="col">COMMAND BATCH ID</th>
                      <th className="table-th" scope="col">FILTERS</th>
                      <th className="table-th" scope="col">PROCESSED DEVICES</th>
                      <th className="table-th" scope="col">ERROR COUNT</th>
                      <th className="table-th" scope="col">TOTAL DEVICES</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.rlsStatusLogs || [])
                      .map((it, index) => {
                        return (
                          <tr
                            key={index}
                            onClick={async () => {
                              this.setState({
                                selectedRow: index,
                                selectedData: it,
                                loading: true,
                              });

                              const params = {
                                options: {
                                  rlsBatchUuid: it.batchUuid,
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
                                loading: false,
                              });
                            }}
                            style={{
                              cursor: 'pointer',
                              alignItems: 'center',
                              backgroundColor:  this.state.selectedRow === index ? '#d8d8d8' : '#fff',
                              color: '#000000',
                            }}
                          >
                            <td className="table-td">
                              {it.command}
                            </td>
                            <td className="table-td">
                              <span>{it.commandSendBy}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.comment}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.createDate ? moment(new Date(it.createDate)).format('YYYY/MM/DD HH:mm:ss') : ''}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.batchUuid}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.filters}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.currentCount}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.errorCount}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.totalCount}</span>
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
                </div>
              </div>
              <div>
                <div
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #ddd',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                  }}
                >
                  <div
                    className={`site-title flex-column align-items-start justify-content-center ${!!this.state.selectedData && 'h-80'}`}
                    style={{ transition: 'all 0.2s' }}
                  >
                    <span>{'Process Log'}</span>
                    <span style={{ color: '#000000', fontSize: '14px', fontWeight: 300, display: this.state.selectedData ? 'flex' : 'none' }}>
                      {'Selected UUID: ' + this.state.selectedData?.batchUuid || ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
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
                          value={this.state.proFromDate}
                          onChange={event => this.setState({ proFromDate: event.target.value })}
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
                          value={this.state.proToDate}
                          onChange={event => this.setState({ proToDate: event.target.value })}
                        />
                      </div>
                      <div
                        style={{display: 'flex'}}
                        className="log"
                      >
                        <input
                          style={{
                            border: '1px solid',
                            borderRadius: '5px',
                            outline: 'unset',
                            height: '40px',
                            paddingLeft: '10px',
                            marginLeft: '30px',
                            alignSelf: 'center',
                          }}
                          type="text"
                          value={ this.state.searchUid || '' }
                          placeholder="Search UID..."
                          onChange={event => this.setState({ searchUid: event.target.value })}
                        />
                      </div>
                      <div
                        style={{display: 'flex'}}
                        className="log"
                      >
                        <input
                          style={{
                            border: '1px solid',
                            borderRadius: '5px',
                            outline: 'unset',
                            height: '40px',
                            paddingLeft: '10px',
                            marginLeft: '30px',
                            alignSelf: 'center',
                          }}
                          type="text"
                          value={ this.state.searchTopic || '' }
                          placeholder="Search TOPIC..."
                          onChange={event => this.setState({ searchTopic: event.target.value })}
                        />
                      </div>
                      <div
                        style={{display: 'flex'}}
                        className="log"
                      >
                        <input
                          style={{
                            border: '1px solid',
                            borderRadius: '5px',
                            outline: 'unset',
                            height: '40px',
                            paddingLeft: '10px',
                            marginLeft: '30px',
                            alignSelf: 'center',
                          }}
                          type="number"
                          value={ this.state.searchMid || '' }
                          placeholder="Search MID..."
                          onChange={event => this.setState({ searchMid: event.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div
                      style={{
                        display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'inherit' : 'none',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '100%',
                        transition: 'all 0.2s ease',
                        width: 'calc(100% - 215px)',
                        marginTop: '20px',
                        marginBottom: '20px'
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
                              uid: this.state.searchUid,
                              batchId: this.state.selectedData.batchUuid,
                              mid:  this.state.searchMid,
                              topic: this.state.searchTopic,
                              fromDate: !!this.state.proFromDate ? moment(this.state.proFromDate.toLocaleDateString()).startOf('day').valueOf() : undefined,
                              toDate: !!this.state.proToDate ? moment(this.state.proToDate.toLocaleDateString()).endOf('day').valueOf() : undefined,
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
                        }}
                        onClick={async () => {
                          const params = {
                            options: {
                              batchId: this.state.selectedData.batchUuid,
                            },
                            limit: 20,
                            offset: 0,
                          };
                          const rp = await getRelatedLogs(params);
                          this.setState({
                            searchMid: undefined,
                            searchCommand: undefined,
                            search: true,
                            proFromDate: undefined,
                            proToDate: undefined,
                            searchUid: undefined,
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
                              downloadCsv: true,
                              batchId: this.state.selectedData.batchUuid,
                              mid:  this.state.searchMid,
                              ptype: this.state.searchCommand,
                              fromDate: !!this.state.proFromDate ? moment(this.state.proFromDate.toLocaleDateString()).startOf('day').valueOf() : undefined,
                              toDate: !!this.state.proToDate ? moment(this.state.proToDate.toLocaleDateString()).endOf('day').valueOf() : undefined,
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
                              'Content-Type' : 'application/json',
                            },
                          })
                            .then((response) => {
                              return response.blob();
                            });
                          if (rp) {
                            const tag =  moment(new Date()).format('YYYYMMDDHHmmss');
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
                        {'EXPORT CSV'}
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
                        <th className="table-th" scope="col">MCU UUID</th>
                        <th className="table-th" scope="col">MSN</th>
                        <th className="table-th" scope="col">TIME</th>
                        <th className="table-th" scope="col">TYPE</th>
                        <th className="table-th" scope="col">TOPIC</th>
                        <th className="table-th" scope="col">MID</th>
                        <th className="table-th" scope="col">COMMAND</th>
                        <th className="table-th" scope="col">VIEW MESSAGE</th>
                        {/*<th className="table-th" scope="col">HANDLE DESC</th>*/}
                        {/*<th className="table-th" scope="col">STATUS</th>*/}
                      </tr>
                      </thead>
                      <tbody>
                      {(this.state.relatedLogs || [])
                        .map((it, index) => {
                          try {
                            it.rawObj = JSON.parse(it.raw);
                          } catch(err) {}
                          return (
                            <tr
                              key={index}
                              style={{
                                cursor: 'pointer',
                                backgroundColor:  this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
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
                                {it.uid}
                              </td>
                              <td className="table-td">
                                {it.msn}
                              </td>
                              <td className="table-td">
                                {moment(it.createDate).format('YY-MM-DD HH:mm:ss')}
                              </td>
                              <td className="table-td">
                                {it.type}
                              </td>
                              <td className="table-td">
                                {it.topic}
                              </td>
                              <td className="table-td">
                                <span>{it.mid || it.oid || it.rmid || it?.rawObj?.header?.oid || it?.rawObj?.header?.mid}</span>
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
                                  <IoMailUnreadOutline />
                                </div>
                              </td>
                              {/*<td style={{ padding: '3px', paddingLeft: '30px' }}>*/}
                              {/*  {(!!it.handleSubscribeDesc && it.type === 'SUBSCRIBE') && (*/}
                              {/*    <>*/}
                              {/*      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>*/}
                              {/*      <div*/}
                              {/*        className="button-icon ml-15"*/}
                              {/*        data-tip="Click to see handle subscribe description"*/}
                              {/*        onClick={() => {*/}
                              {/*          if (!this.state.handleSubscribeDesc) {*/}
                              {/*            this.setState({*/}
                              {/*              handleSubscribeDesc: it.handleSubscribeDesc,*/}
                              {/*            });*/}
                              {/*          }*/}
                              {/*        }}*/}
                              {/*      >*/}
                              {/*        <IoMailUnreadOutline />*/}
                              {/*      </div>*/}
                              {/*    </>*/}
                              {/*  )}*/}

                              {/*</td>*/}
                              {/*<td className="table-td">*/}
                              {/*  <div>*/}
                              {/*    { it.status === 0 ? 'OK'*/}
                              {/*      : it.status === 1 ? 'Invalid Format'*/}
                              {/*        : it.status === 2 ? 'Invalid Command'*/}
                              {/*          : it.status === 3 ? 'Invalid Signature'*/}
                              {/*            : it.status === 4 ? 'Decryption Failed'*/}
                              {/*              : it.status === 5 ? 'Invalid Configuration'*/}
                              {/*                : it.status === 8 ? 'Failed send to device (Gateway)'*/}
                              {/*                  : it.status === 9 ? 'General Error'*/}
                              {/*                    : (it.type === 'PUBLISH' && !!it.statusDesc && it.status !== null) ? (it.statusDesc === 'OK' ? 'OK' : (*/}
                              {/*                        <div*/}
                              {/*                          className="button-icon"*/}
                              {/*                          data-tip="Click to see status"*/}
                              {/*                          style={{marginLeft: '-7.5px'}}*/}
                              {/*                          onClick={async () => {*/}
                              {/*                            await this.setState({loading: true})*/}
                              {/*                            this.setState({*/}
                              {/*                              publishStatus: it.statusDesc,*/}
                              {/*                              loading: false,*/}
                              {/*                            });*/}
                              {/*                          }}*/}
                              {/*                        >*/}
                              {/*                          <IoMailUnreadOutline />*/}
                              {/*                        </div>*/}
                              {/*                      ))*/}
                              {/*                      : ((it.type === 'SUBSCRIBE' && it.ptype === 'MDT'*/}
                              {/*                        && moment(it.createDate).toDate().getTime() > 1637589664227)*/}
                              {/*                        ? (*/}
                              {/*                          it.repStatus === 1*/}
                              {/*                            ?*/}
                              {/*                            'OK'*/}
                              {/*                            :*/}
                              {/*                            <div*/}
                              {/*                              className="button-icon"*/}
                              {/*                              data-tip="Click to see status"*/}
                              {/*                              style={{marginLeft: '-7.5px'}}*/}
                              {/*                              // onClick={async () => {*/}
                              {/*                              //   await this.setState({loading: true})*/}
                              {/*                              //   let rp = await getPiLogs({msn: it.msn, mid: it.mid})*/}
                              {/*                              //   this.setState({*/}
                              {/*                              //     mdtPiStatus: rp?.response || [],*/}
                              {/*                              //     loading: false,*/}
                              {/*                              //   });*/}
                              {/*                              // }}*/}
                              {/*                            >*/}
                              {/*                              <IoMailUnreadOutline />*/}
                              {/*                            </div>*/}
                              {/*                        )*/}
                              {/*                        : null)}*/}
                              {/*  </div>*/}
                              {/*</td>*/}
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
                          pointerEvents: 'all'
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
                  </div>
                </div>
              </div>
            </div>
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

export default withNamespaces('common')(Homepage);
