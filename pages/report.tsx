import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import { ProgressLoading } from '@app/components/Common';
import 'moment-timezone';
import moment from 'moment';
import makeAnimated from 'react-select/animated';
import { IoMailUnreadOutline } from 'react-icons/io5';
const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

import {
    getReport,
    pingPi,
    deleteReport,
    getParameter,
    createSchedule,
    getCommand,
    createReportSchedule,
    getReportSchedule,
    getReportFileSchedule,
    deleteReportTask,
} from '@app/api/log';
import ReactTooltip from "react-tooltip";
import { Form, Input , Button } from 'reactstrap';
import {getCookie} from "@app/utils/cookie";
import {tokenName} from "@app/utils/public-config";
import {Json} from "enzyme-to-json";

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
    display: flex;
  }
  :global(.p-card) {
    flex: 1;
    padding-bottom: 5px;
  }
  :global(.page-content) {
    padding: 0px;
    padding: 0px;
    height: 101%;
    background: #f3f3f4;
  }
  .dashboard {
    flex: 1;
    max-height: calc(100% - 5px);
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
        margin: auto;
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
      padding: 10px;
      padding-left: 30px !important;
      vertical-align: middle !important;
    }
    :global(.site-title) {
      color: #000000;
      font-size: 20px;
      width: 250px;
      margin: 1px;
      background: aliceblue;
      height: 60px;
      align-items: center;
      display: flex;
      border-radius: 10px;
      padding-left: 15px;
      font-weight: 500;
    }
    :global(.reposite-title-report) {
      color: #000000;
      font-size: 20px;
      width: 550px;
      margin: 1px;
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
:global(.table-td) {
  padding: 10px !important;
  padding-left: 30px !important;
  vertical-align: middle !important;
}
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
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
  state = {
    ...this.props,
  };
  async componentDidMount() {
      this.search();
  }

  componentWillUnmount() {
    clearInterval(this.intv);
  }

  pingPi = async (uuid, hide) => {
      const result = await Swal.fire({
          html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
          icon: 'question',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
      });
      if (!result || !result.isConfirmed) return;
      await this.setState({loading: true})
      let rp = await pingPi({uuid, hide})
      this.setState({
          loading: false,
          meterKey: Date.now(),
          relatedLogs: null,
      });
  }

  search = async () => {
      const params = {
          limit: this.state.limit || 20,
          offset: this.state.offset || 0,
      };
      const rp = await getReport(params);
      this.setState({
          relatedMeterPis: rp?.response.results || [],
          totalRecordsRelatedMeterPi: rp?.totalRows,
          totalPagesRelatedMeterPi: Math.floor(((rp.totalRows || 0) + 19) / 20),
          pageIndexRelatedMeterPi: (rp?.offset + 19) / 20,
          pageSizeRelatedMeterPi: 20
      });
  }

    searchTask = async (id) => {
        console.log("ok");
        await this.setState({loading: true});
        const params = {
            limit: this.state.limit || 20,
            offset: this.state.offset || 0,
            id: id ? id : null
        };
        const rp = await getReportSchedule(params);
        this.setState({
            showSchedule: rp?.response.results || [],
            reportId: id,
            loading: false,
            totalRecordsRelatedMeterPi: rp?.response.totalRows,
            totalPagesRelatedMeterPi: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
            pageIndexRelatedMeterPi: (rp?.response.offset + 19) / 20,
            pageSizeRelatedMeterPi: 20
        });
    }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Report Management'}>
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
              }}
            >
              {!!this.state.piAdd ?
                <PAdd
                  data={this.state.piAdd}
                  onClose={(success) => {
                    this.setState({ piAdd: null });
                    if (success) {
                        this.search();
                    }
                  }}
                />
                : null
              }

                {!!this.state.param ?
                    <Parameter
                        data={this.state.param}
                        listParameters={this.state.paramList}
                        listObject={this.state.paramList1}

                        onClose={() => {
                            this.setState({ param: null });
                        }}
                    />
                    : null
                }

                {!!this.state.task ?
                    <CreateTask
                        data={this.state.task}
                        listParameters={this.state.paramList}
                        listObject={this.state.paramList1}

                        onClose={() => {
                            this.setState({task: null});
                        }}
                    />
                    : null
                }

              {!this.state.piAdd && !this.state.param && !this.state.task ?
                <>
                  <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                    <h5 className="site-title">{'Report Management'}</h5>
                  </div>
                  <div style={{ display: 'flex', padding: '30px', borderBottom: '1px solid #ddd', paddingTop: '20px', paddingBottom: '20px' }}>
                    <div
                      className="w-200 button-btn"
                       onClick={() => this.setState({
                         piAdd: {},
                       })}
                    >
                      <span >{'ADD NEW REPORT'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }} className="doctor-list">
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                      <table className="table">
                          <thead className="thead-dark">
                              <tr>
                                  <th className="table-th" scope="col" style={{textAlign: 'center'}}>REPORT ID</th>
                                  <th className="table-th" scope="col" style={{textAlign: 'center'}}>REPORT NAME</th>
                                  <th className="table-th" scope="col" style={{textAlign: 'center'}}>ACTION</th>
                              </tr>
                          </thead>
                          <tbody>
                          {(this.state.relatedMeterPis || [])
                              .map((it, index) => {
                                let off = (Date.now() - (it.lastPing || 0)) > (3 * 60 * 1000);
                                return (
                                    <tr
                                        key={index}
                                        style={{
                                          cursor: 'pointer',
                                          backgroundColor:  this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                                          color: '#000000',
                                        }}
                                    >
                                        <td className="table-td" style={{ textAlign: 'center',}}>
                                            {(it.id )}
                                        </td>
                                        <td className="table-td" style={{ textAlign: 'center',}}>
                                            {(it.reportName )}
                                        </td>
                                        <td className="table-td " style={{display: 'flex', justifyContent: 'center',}}>
                                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                            <div
                                                data-tip="Report task list"
                                                style={{marginLeft: '20px'}}
                                                className="button-icon"
                                                onClick={() => {
                                                    this.searchTask(it.id);
                                                }}
                                            >
                                                <span>
                                                  <i className="fa fa-list-ul" />
                                                </span>
                                            </div>
                                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                            <div
                                                data-tip="Click to create report schedule"
                                                style={{marginLeft: '20px'}}
                                                className="button-icon"
                                                onClick={async() => {
                                                    await this.setState({loading: true});

                                                    const params = {
                                                        id: it.id ? it.id : null
                                                    };
                                                    const rp = await getParameter(params);
                                                    this.setState({
                                                        listParameters: rp?.response || [],
                                                        loading: false
                                                    });

                                                    this.setState({
                                                        task: {...it},
                                                        paramList: this.state.listParameters,
                                                        paramList1: this.state.listParameters,
                                                    })
                                                }}
                                            >
                                                <span>
                                                  <i className="fa fa-clock-o" />
                                                </span>
                                            </div>
                                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                            <div
                                                data-tip="Execute"
                                                style={{marginLeft: '20px'}}
                                                className="button-icon"
                                                onClick={async() => {
                                                    await this.setState({loading: true});

                                                    const params = {
                                                        id: it.id ? it.id : null
                                                    };
                                                    const rp = await getParameter(params);
                                                    this.setState({
                                                        listParameters: rp?.response || [],
                                                        loading: false
                                                    });


                                                    this.setState({
                                                        param: {...it},
                                                        paramList: this.state.listParameters,
                                                        paramList1: this.state.listParameters,
                                                    })
                                                }}
                                            >
                                                <span>
                                                  <i className="fa fa-play-circle-o" />
                                                </span>
                                            </div>
                                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                            <div
                                                data-tip="Click to edit shedule"
                                                style={{marginLeft: '20px'}}
                                                className="button-icon"
                                                onClick={() => {
                                                     this.setState({
                                                         piAdd: {...it},
                                                    })
                                                }}
                                            >
                                                <span>
                                                  <i className="fa fa-edit" />
                                                </span>
                                            </div>
                                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                            <div
                                                data-tip="Click to remove shedule"
                                                className="button-icon"
                                                style={{marginLeft: '20px'}}
                                                onClick={async() => {
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

                                                        let rp = await deleteReport(params);
                                                        console.log(rp);

                                                        if (rp.success) {
                                                            Swal.fire({
                                                                html: `
                                                    <p style='text-align: center; font-size: 14px;'>Delete successfully!</p>
                                                 `,
                                                                icon: 'success',
                                                                confirmButtonText: 'OK',
                                                            })
                                                                .then(() => {
                                                                    this.setState({createTask: {create: false, data: null}})
                                                                    this.search();
                                                                })
                                                        } else {
                                                            Swal.fire({
                                                                html: `
                                                    <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
                                                 `,
                                                                icon: 'error',
                                                                confirmButtonText: 'OK',
                                                            })
                                                        }
                                                    }}
                                                }
                                            >
                                                <span>
                                                  <i className="fa fa-trash-o" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                              })}
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
                          { this.state.totalRecordsRelatedMeterPi > this.state.pageSizeRelatedMeterPi && this.state.totalPagesRelatedMeterPi >= 2 &&
                          <Pagination
                            href={this.props.asPath.replace(/\?.*/g, '')}
                            totalRecords={this.state.totalRecordsRelatedMeterPi}
                            totalPages={this.state.totalPagesRelatedMeterPi}
                            onPageChanged={async (query) => {
                              this.setState({
                                  limit: 20,
                                  offset: (query.pageIndex - 1) * 20,
                              }, () => {
                                  this.search();
                              })
                            }}
                            pageIndex={this.state.pageIndexRelatedMeterPi}
                            pageSize={this.state.pageSizeRelatedMeterPi}
                            styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                          />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                :null}
                {!!this.state.showSchedule && (
                    <div
                        style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '25%',
                            left: '30%',
                            zIndex: 10,
                            width: '40%',
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
                      {'LIST REPORT TASK'}
                  </span>
                <div style={{ overflow: 'auto', width: '100%', height: '60%' }}>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th className="table-th" scope="col">ID</th>
                            <th className="table-th" scope="col">TYPE</th>
                            <th className="table-th" scope="col">START TIME</th>
                            <th className="table-th" scope="col">ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.showSchedule.map((r, index) => {
                                return (
                                    <tr
                                        key={index}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: '#fff',
                                            color: '#000000',
                                        }}
                                    >
                                        <td className="table-td"
                                            style={{ justifyContent: 'center',}}
                                        >
                                            <a href={'/report-repository?reportTaskId=' + r.id} target="_blank">
                                                {r.id}
                                            </a>
                                        </td>
                                        <td className="table-td"
                                            style={{ justifyContent: 'center',}}
                                        >
                                            {r.type}
                                        </td>
                                        <td className="table-td"
                                            style={{ justifyContent: 'center',}}
                                        >
                                            {moment(new Date(r.startTime)).tz('Asia/Singapore').format(r.type == 'ONE_TIME' ? 'DD/MM/YYYY HH:mm:ss' : 'HH:mm:ss')}
                                        </td>
                                        <td className="table-td"
                                             style={{ justifyContent: 'center',}}
                                        >
                                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                            <div
                                                data-tip="Click to edit shedule"
                                                style={{marginLeft: '10px'}}
                                                className="button-icon"
                                                onClick={ async() => {
                                                    const params = {
                                                        id: r.id ? r.id : null
                                                    };
                                                    const rp = await deleteReportTask(params);

                                                    if (rp.success) {
                                                        Swal.fire({
                                                            html: `
                                                    <p style='text-align: center; font-size: 14px;'>Delete successfully!</p>
                                                 `,
                                                            icon: 'success',
                                                            confirmButtonText: 'OK',
                                                        })
                                                            .then(() => {
                                                                this.setState({createTask: {create: false, data: null}})
                                                                this.searchTask(this.state.reportId);
                                                            })
                                                    } else {
                                                        Swal.fire({
                                                            html: `
                                                    <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
                                                 `,
                                                            icon: 'error',
                                                            confirmButtonText: 'OK',
                                                        })
                                                    }
                                                }}
                                            >
                                                <span>
                                                  <i className="fa fa-trash-o" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
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
                        <div className="col-sm-12 col-md-7 pagination"
                             style={{justifyContent: 'flex-end', marginBottom: '25px'}}>
                            {this.state.totalRecordsRelatedMeterPi > this.state.pageSizeRelatedMeterPi && this.state.totalPagesRelatedMeterPi >= 2 &&
                            <Pagination
                                href={this.props.asPath.replace(/\?.*/g, '')}
                                totalRecords={this.state.totalRecordsRelatedMeterPi}
                                totalPages={this.state.totalPagesRelatedMeterPi}
                                onPageChanged={async (query) => {
                                    this.setState({
                                        limit: 20,
                                        offset: (query.pageIndex - 1) * 20,
                                    }, () => {
                                        this.searchTask();
                                    })
                                }}
                                pageIndex={this.state.pageIndexRelatedMeterPi}
                                pageSize={this.state.pageSizeRelatedMeterPi}
                                styleItemActive={{backgroundColor: 'green', color: '#ffffff'}}
                            />
                            }
                        </div>
                    </div>
                </div>
                <button
                    className="button-btn w-80"
                    style={{
                        alignSelf: 'center',
                        border: 'unset',
                        outline: 'unset',
                    }}
                    onClick={() => {
                        this.setState({ showSchedule: undefined });
                    }}
                >
                    {'Close'}
                </button>
            </div>
                )}
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

class PAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: { ...this.props.data },
      reportName: this.props.data?.reportName,
      validate: {},
      ignores: [
      ],
    };
  }

  componentDidMount() {
  }

    checkInput = () => {
        if (this.state.reportName == null || this.state.reportName == "") {
            return false;
        }
        if (this.state.file == null || this.state.file == "") {
            return false;
        }
        return true;
    }


  render() {
    return (

        <div style={{ padding: '15px', maxWidth: '600px', width: '100%' }}>
            <div className="form-group">
                <div style={{ justifyContent: "center", padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 200, fontSize: '18px', color: '#000000' }}>
                    <h3 style={{ justifyContent: "center",}} className="site-title">{!this.props.data.id ? 'Add Report' : 'Edit Report'}</h3>
                </div>

                <label
                    htmlFor="telephone"
                    className="col-md-6 control-label visible-lg-block"
                    style={{
                        fontSize: '15px',
                        textAlign: 'left',
                        fontWeight: 500,
                        color: '#222222',
                    }}
                >
                    Report name :
                    <span
                        style={{
                            marginLeft: '3px',
                            marginTop: '2px',
                            color: 'red',
                        }}
                    ></span>
                </label>

                <div
                    className="col-md-6 input-wrap has-feedback has-success"
                    style={{ position: 'relative', paddingRight: '20px' }}
                >
                    <Input type="input" name="input"
                           value={this.state.reportName}
                           onChange={(event) => {
                               if (event.target.value != null) {
                                   this.setState({errorActionTask: ""})
                               }

                               this.setState({reportName: event.target.value})
                           }}
                    >
                    </Input>
                    <span style = {{display: this.state.errorReportName != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                            {!this.state.reportName ? this.state.errorReportName : ''}
                        </span>

                </div>

                <label
                    htmlFor="telephone"
                    className="col-md-6 control-label visible-lg-block"
                    style={{
                        fontSize: '15px',
                        textAlign: 'left',
                        fontWeight: 500,
                        color: '#222222',
                    }}
                >
                    Report file :
                    <span
                        style={{
                            marginLeft: '3px',
                            marginTop: '2px',
                            color: 'red',
                        }}
                    ></span>
                </label>

                <div
                    className="col-md-6 input-wrap has-feedback has-success"
                    style={{ position: 'relative', paddingRight: '20px' }}
                >
                    <Input
                        type="file"
                        name="file"
                        label="Upload"
                        placeholder={'File upload'}
                        onChange={(event) => {
                            this.setState({ file: event.target.files[0] });
                        }}
                    />

                    <span style = {{display: this.state.errorFile != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                            {!this.state.file ? this.state.errorFile : ''}
                        </span>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                    marginLeft: '15px'
                }}>
                    <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                        onClick={async () => {
                                if (this.checkInput()) {
                                    this.setState({errorReportName: ""});
                                    this.setState({errorFile: ""});

                                    let token = getCookie(tokenName, null);
                                    if (!token || token === 'null') token = undefined;

                                    let rp = null;

                                    const formData = new FormData();
                                    formData.append('file', this.state.file, this.state.file.name);
                                    if(!this.props.data.id) {
                                        const url = 'api/report/' + this.state.reportName + '/create';
                                        const method = 'POST';
                                        await fetch(url,
                                            {
                                                method,
                                                headers: new Headers({
                                                    'Authorization': token,
                                                }),
                                                body: formData,
                                            },
                                        )
                                            .then(response => response.json())
                                            .then(response => rp = response)
                                            .catch((error) => {
                                                console.error('Error:', error);
                                            });
                                    } else {
                                        const url = 'api/report/' + this.props.data.id + '/' + this.state.reportName + '/update';
                                        const method = 'PUT';
                                        await fetch(url,
                                            {
                                                method,
                                                headers: new Headers({
                                                    'Authorization': token,
                                                }),
                                                body: formData,
                                            },
                                        )
                                            .then(response => response.json())
                                            .then(response => rp = response)
                                            .catch((error) => {
                                                console.error('Error:', error);
                                            });
                                    }
                                    if (rp.success) {
                                        Swal.fire({
                                            html: `
                                                    <p style='text-align: center; font-size: 14px;'> Successfully!</p>
                                                 `,
                                            icon: 'success',
                                            confirmButtonText: 'OK',
                                        })
                                        .then(async () => {
                                            await this.setState({createTask: {create: false, data: null}})
                                            this.props.onClose && this.props.onClose(true)
                                        })
                                    } else {
                                        Swal.fire({
                                            html: `
                                                    <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
                                                 `,
                                            icon: 'error',
                                            confirmButtonText: 'OK',
                                        })
                                        this.props.onClose && this.props.onClose(false)
                                    }
                                } else {
                                    if (this.state.reportName == null || this.state.reportName == "") {
                                        this.setState({errorReportName: "Report name can not be empty"});
                                    }
                                    if (this.state.fileTask == null || this.state.fileTask == "") {
                                        this.setState({errorFile: "File can not be empty"});
                                    }
                                }
                            }
                         }
                    >
                        <span>{'SAVE'}</span>
                    </div>
                    <div style={{ marginLeft: '5px' }} className="button-btn w-80"
                         onClick={() => {this.props.onClose && this.props.onClose(); }}
                    >
                        <span>{'CANCEL'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

class Parameter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: { ...this.props.add},
            listParameters: { ...this.props.listParameters },
            listObject:  { ...this.props.listObject },
            sang : []
        };

        console.log("listParameters" ,this.props.listParameters);
        console.log("listObject" ,this.props.listObject);
        console.log("add" ,this.props.add);

        console.log("a" ,this.state.listParameters);
        console.log("b" ,this.state.listObject);
    }

    componentDidMount() {

    }


    checkInput = () => {
        let check = true;
        this.props.listObject.map((it, index) => {
            if(it.type === "INTEGER" || it.type === "LONG" || it.type === "BIGDECIMAL" || it.type === "DOUBLE" || it.type === "SHORT" || it.type === "BYTE") {
                if (this.state.valueNumber == null || this.state.valueNumber == "") {
                    check = false;
                }
            } else if (it.type === "STRING" || it.type === "COLLECTION") {
                if (this.state.valueText == null || this.state.valueText == "") {
                    check = false;
                }
            } else if (it.type === "TIMESTAMP") {
                if (this.state.valueTime == null || this.state.valueTime == "") {
                    check = false;
                }
                if (this.state.valueDateTimeStamp == null || this.state.valueDateTimeStamp == "") {
                    check = false;
                }
            // } else if (it.type === "BOOLEAN") {
            //     if (this.state.checkFalse == null || this.state.checkFalse == "" && this.state.checkTrue == null || this.state.checkTrue == "" ) {
            //         check = false;
            //     }
            } else if (it.type === "DATE") {
                if (this.state.valueDate == null || this.state.valueDate == "") {
                    check = false;
                }
            }
        })

        if(check === false) {
            return false;
        }
        return true;
    }


    render() {
        return (
            <div style={{ padding: '15px', maxWidth: '600px', width: '100%' }}>
                <div className="form-group">

                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', marginTop: '20px' }}>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th className="table-th" scope="col" style={{textAlign: 'center'}}>PARAMETER NAME</th>
                            <th className="table-th" scope="col" style={{textAlign: 'center'}}>PARAMETER TYPE</th>
                            <th className="table-th" scope="col" style={{textAlign: 'center'}}>INPUT VALUE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.props.listParameters || [])
                            .map((it, index) => {
                                let off = (Date.now() - (it.lastPing || 0)) > (3 * 60 * 1000);
                                return (
                                    <tr
                                        key={index}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor:  this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                                            color: '#000000',
                                        }}
                                    >
                                        <td className="table-td" style={{ textAlign: 'center',}}>
                                            {(it.name )}
                                        </td>
                                        <td className="table-td" style={{ textAlign: 'center',}}>
                                            {(it.type )}
                                        </td>
                                        <td className="table-td" style={{ textAlign: 'center',}}>

                                            {
                                                it.type === "INTEGER" || it.type === "LONG" || it.type === "BIGDECIMAL" || it.type === "DOUBLE" || it.type === "SHORT" || it.type === "BYTE"?
                                                    <>
                                                        <Input type='number'
                                                                name="input"
                                                                onChange={(event) => {
                                                                    if (event.target.value != null) {
                                                                        this.props.listObject.map((a, index) => {
                                                                            if (a.name === it.name){
                                                                                a.value = event.target.value
                                                                            }
                                                                        })
                                                                    }
                                                                    this.setState({
                                                                        valueNumber: event.target.value,
                                                                    })
                                                                }}
                                                        >
                                                        </Input>
                                                        <span style = {{display: this.state.errorValueNumber != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueNumber ? this.state.errorValueNumber : ''}
                                                            </span>
                                                    </>
                                                : it.type === "STRING" || it.type === "COLLECTION" ?
                                                    <>
                                                        <Input type='text'
                                                               name="input"
                                                               onChange={(event) => {
                                                                   if (event.target.value != null) {
                                                                       this.props.listObject.map((a, index) => {
                                                                           if (a.name === it.name){
                                                                               a.value = event.target.value
                                                                           }
                                                                       })
                                                                   }
                                                                   this.setState({
                                                                       valueText: event.target.value,
                                                                   })
                                                               }}
                                                        >
                                                        </Input>
                                                        <span style = {{display: this.state.errorValueText != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueText ? this.state.errorValueText : ''}
                                                            </span>
                                                    </>
                                                    : it.type === "TIMESTAMP" ?
                                                        <>
                                                                <Input type='date'
                                                                       name="input"
                                                                       onChange={(event) => {
                                                                           if (event.target.value != null) {

                                                                           }
                                                                           this.setState({valueDateTimeStamp: event.target.value})
                                                                       }}
                                                                >
                                                                </Input>
                                                                <span style = {{display: this.state.errorDateTimeStamp != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueDateTimeStamp ? this.state.errorDateTimeStamp : ''}
                                                                    </span>
                                                                <Input type='time'
                                                                       name="input"
                                                                       onChange={(event) => {
                                                                           if (event.target.value != null) {

                                                                           }
                                                                           this.setState({valueTime: event.target.value})
                                                                       }}
                                                                >
                                                                </Input>
                                                                <span style = {{display: this.state.errorValueTime != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueTime ? this.state.errorValueTime : ''}
                                                                    </span>
                                                            {
                                                                this.props.listObject.map((a, index) => {
                                                                    if (a.name === it.name){
                                                                        a.value = a.value = this.state.valueDateTimeStamp + ' ' + this.state.valueTime;
                                                                    }
                                                                })
                                                            }
                                                        </>
                                                        : it.type === "BOOLEAN" ?
                                                            <>
                                                                <Input type='checkbox'
                                                                       name="input"
                                                                       checked={!!this.state.checkbox?.checkTrue}
                                                                       value={this.state.checkbox?.checkTrue}
                                                                       onChange={(event) => {
                                                                           if (!!event.target.checked) {
                                                                               this.setState({checkbox: {
                                                                                       ...this.state.checkbox,
                                                                                       checkTrue: true,
                                                                                       checkFalse: false,
                                                                                   }});
                                                                           } else {
                                                                               this.setState({checkbox: {
                                                                                       ...this.state.checkbox,
                                                                                       checkTrue: false,
                                                                                   }});
                                                                           }
                                                                           this.props.listObject.map((a, index) => {
                                                                               if (a.name === it.name){
                                                                                   a.value = this.state.checkTrue === true ? '' : 'true';
                                                                               }
                                                                           })
                                                                       }}
                                                                />
                                                                <span style={{ marginLeft: '5px' }}>{'True'}</span>
                                                                <Input type='checkbox'
                                                                       name="input"
                                                                       style={{ marginLeft: '10px' }}
                                                                       checked={!!this.state.checkbox?.checkFalse}
                                                                       value={this.state.checkbox?.checkFalse}
                                                                       onChange={(event) => {
                                                                           if (!!event.target.checked) {
                                                                               this.setState({checkbox: {
                                                                                       ...this.state.checkbox,
                                                                                       checkFalse: true,
                                                                                       checkTrue: false,
                                                                                   }});
                                                                           } else {
                                                                               this.setState({checkbox: {
                                                                                       ...this.state.checkbox,
                                                                                       checkFalse: false,
                                                                                   }});
                                                                           }
                                                                           this.props.listObject.map((a, index) => {
                                                                               if (a.name === it.name){
                                                                                   a.value = this.state.checkFalse === true ? '' : 'false';
                                                                               }
                                                                           })
                                                                       }}
                                                                />
                                                                <span style={{ marginLeft: '35px' }}>{'False'}</span>
                                                                {/*<span style = {{display: this.state.errorCheckBox != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>*/}
                                                                {/*    {!this.state.checkFalse && !this.state.checkTrue ? this.state.errorCheckBox : ''}*/}
                                                                {/*    </span>*/}
                                                            </>
                                                            :
                                                            <>
                                                                <Input type='date'
                                                                       name="input"
                                                                       onChange={(event) => {
                                                                           if (event.target.value != null) {
                                                                               this.props.listObject.map((a, index) => {
                                                                                   if (a.name === it.name){
                                                                                       a.value = event.target.value
                                                                                   }
                                                                               })
                                                                           }
                                                                           this.setState({valueDate: event.target.value})
                                                                       }}
                                                                >
                                                                </Input>
                                                                <span style = {{display: this.state.errorValueDate != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueDate ? this.state.errorValueDate : ''}
                                                                    </span>
                                                            </>
                                                }

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    </div>

                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: '15px',
                            textAlign: 'left',
                            fontWeight: 500,
                            color: '#222222',
                        }}
                    >
                        Choose type of file to export :
                        <span
                            style={{
                                marginLeft: '3px',
                                marginTop: '2px',
                                color: 'red',
                            }}
                        ></span>
                    </label>
                    <div
                        className="col-md-6 input-wrap has-feedback has-success"
                        style={{ position: 'relative', paddingRight: '20px' }}
                    >
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="enrollment-date"
                            name="enrollment-date"
                            //checked={!!this.state.checkbox?.pdf}
                            checked={
                                this.state.checkbox?.pdf === 'false' || this.state.checkbox?.pdf === false ? false : true
                            }
                            value={this.state.checkbox?.pdf}
                            onChange={(event) => {
                                if (!!event.target.checked) {
                                    this.setState({checkbox: {
                                            ...this.state.checkbox,
                                            pdf: true,
                                            xlsx: false,
                                            csv: false,
                                        }});
                                }
                            }}
                        />
                        <span style={{ marginLeft: '5px' }}>{'PDF'}</span>

                        <input
                            type="checkbox"
                            style={{marginLeft: "20px"}}
                            id="enrollment-date"
                            name="enrollment-date"
                            checked={!!this.state.checkbox?.xlsx}
                            value={this.state.checkbox?.xlsx}
                            onChange={(event) => {
                                if (!!event.target.checked) {
                                    this.setState({checkbox: {
                                            ...this.state.checkbox,
                                            xlsx: true,
                                            csv: false,
                                            pdf: false,
                                        }});
                                }
                            }}
                        />
                        <span style={{ marginLeft: '5px' }}>{'XLSX'}</span>
                        <input
                            type="checkbox"
                            id="enrollment-date"
                            style={{marginLeft: "20px"}}
                            name="enrollment-date"
                            checked={!!this.state.checkbox?.csv}
                            value={this.state.checkbox?.csv}
                            onChange={(event) => {
                                if (!!event.target.checked) {
                                    this.setState({checkbox: {
                                            ...this.state.checkbox,
                                            csv: true,
                                            xlsx: false,
                                            pdf: false,
                                        }});
                                }
                            }}
                        />
                        <span style={{ marginLeft: '5px' }}>{'CSV'}</span>
                    </div>
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        marginTop: "20px",
                        marginBottom: "20px",
                        marginLeft: '10px'
                    }}>
                        <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                             onClick = {async() => {
                                 console.log("value listObject: ", this.state.listObject);
                                 if (this.checkInput()) {
                                         console.log("value listObject: ", this.state.listObject);
                                         let listParams = [];
                                         this.props.listObject.map((a, index) => {
                                             listParams.push({
                                                 name: a.name,
                                                 type: a.type,
                                                 value: a.value
                                             })
                                         })
                                         console.log("listParams: ", listParams);
                                         let formatFile = '';
                                         if (this.state.checkbox?.csv == '' && this.state.checkbox?.pdf == '' && this.state.checkbox?.xlsx == '') {
                                             this.setState({
                                                 checkbox: {
                                                     ...this.state.checkbox,
                                                     pdf: true,
                                                 }
                                             });
                                             formatFile = 'PDF';
                                         } else {
                                             formatFile = this.state.checkbox?.csv == true ? 'CSV' : this.state.checkbox?.pdf == true ? 'PDF' : this.state.checkbox?.xlsx == true ? 'XLSX' : 'PDF';
                                         }

                                         let token = getCookie(tokenName, null);
                                         if (!token || token === 'null') token = undefined;

                                         const filter = {
                                             reportId: this.props.data.id,
                                             format: formatFile,
                                             parameters: listParams
                                         };

                                         console.log("Json: ", JSON.stringify(filter));

                                         const url = '/api/report/execute';
                                         const method = 'POST';
                                         const rp = await fetch(url, {
                                             method,
                                             body: JSON.stringify(filter),
                                             headers: {
                                                 'Content-Type': 'application/json',
                                                 'Authorization': token,
                                             },
                                         }).then((response) => {
                                             return response.blob();
                                         });
                                         if (rp) {
                                             const tag = moment(new Date()).format('YYYYMMDD');
                                             const fileName = this.props.data.reportName + tag + '.' + formatFile.toLowerCase();
                                             const url = window.URL.createObjectURL(new Blob([rp]));
                                             const link = document.createElement('a');
                                             link.href = url;
                                             link.setAttribute('download', fileName);
                                             document.body.appendChild(link);
                                             link.click();
                                             link.parentNode.removeChild(link);
                                             this.setState({openExportCsv: false, activateDate: undefined});
                                         } else {
                                             alert('Something went wrong. Please try again!');
                                         }
                                 } else {
                                     if (this.state.valueText == null || this.state.valueText == "") {
                                         this.setState({errorValueText: "Can not be empty"});
                                     }
                                     if (this.state.valueNumber == null || this.state.valueNumber == "") {
                                         this.setState({errorValueNumber: "Can not be empty"});
                                     }
                                     if (this.state.valueTime == null || this.state.valueTime == "") {
                                         this.setState({errorValueTime: "Can not be empty"});
                                     }
                                     if (this.state.valueDateTimeStamp == null || this.state.valueDateTimeStamp == "") {
                                         this.setState({errorDateTimeStamp: "Can not be empty"});
                                     }
                                     // if (this.state.checkFalse == null || this.state.checkFalse == "" && this.state.checkTrue == null || this.state.checkTrue == "" ) {
                                     //     this.setState({errorCheckBox: "Can not be empty"});
                                     // }
                                     if (this.state.valueDate == null || this.state.valueDate == "") {
                                         this.setState({errorValueDate: "Can not be empty"});
                                     }
                                 }
                             }}
                        >
                            <span>{'EXPORT'}</span>
                        </div>

                        <div style={{ marginLeft: '15px' }} className="button-btn w-80"
                             onClick={() => {this.props.onClose && this.props.onClose(); }}
                        >
                            <span>{'CANCEL'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: { ...this.props.data},
            dateTask: moment(new Date(this.props.data?.startTime || new Date())).tz('Asia/Singapore').format('YYYY-MM-DD'),
            timeTask: this.props.data?.startTime ? moment(new Date(this.props.data?.startTime)).tz('Asia/Singapore').format('HH:mm') : "",
            listParameters: { ...this.props.listParameters },
            listObject:  { ...this.props.listObject },
        };
    }

    componentDidMount() {
    }

    checkInput = () => {
        let check = true;
        this.props.listObject.map((it, index) => {
            if(it.type === "INTEGER" || it.type === "LONG" || it.type === "BIGDECIMAL" || it.type === "DOUBLE" || it.type === "SHORT" || it.type === "BYTE") {
                if (this.state.valueNumber == null || this.state.valueNumber == "") {
                    check = false;
                }
            } else if (it.type === "STRING" || it.type === "COLLECTION") {
                if (this.state.valueText == null || this.state.valueText == "") {
                    check = false;
                }
            } else if (it.type === "TIMESTAMP") {
                if (this.state.valueTime == null || this.state.valueTime == "") {
                    check = false;
                }
                if (this.state.valueDateTimeStamp == null || this.state.valueDateTimeStamp == "") {
                    check = false;
                }
            //}
            // else if (it.type === "BOOLEAN") {
            //     if (this.state.checkFalse == null || this.state.checkFalse == "" && this.state.checkTrue == null || this.state.checkTrue == "" ) {
            //         check = false;
            //     }
            } else if (it.type === "DATE") {
                if (this.state.valueDate == null || this.state.valueDate == "") {
                    check = false;
                }
            }
        })

        if (this.state.typeTask == null || this.state.typeTask == "") {
            return false;
        }
        if (this.state.dateTask == null || this.state.dateTask == "") {
            return false;
        }
        if (this.state.timeTask == null || this.state.timeTask == "") {
            return false;
        }
        if (this.state.dateTask == null || this.state.dateTask == "") {
            return false;
        }
        if (this.state.timeTask == null || this.state.timeTask == "") {
            return false;
        }
        if (this.state.typeTask == "WEEKLY") {
            if (this.state.dayOfWeek == null || this.state.dayOfWeek == "") {
                return false;
            }
        } else {
            if (this.state.dayOfMonth == null || this.state.dayOfMonth == "") {
                return false;
            }
        }

        if(check === false) {
            return false;
        }
        return true;
    }


    render() {
        return (
            <div style={{ padding: '15px', maxWidth: '600px', width: '100%' }}>
                <div className="form-group">
                    <div style={{ justifyContent: "center", padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 200, fontSize: '18px', color: '#000000' }}>
                        <h3 style={{ justifyContent: "center",}} className="reposite-title-report">{'Create Report Schedule'}</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', marginTop: '20px' }}>
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th className="table-th" scope="col" style={{textAlign: 'center'}}>PARAMETER NAME</th>
                                <th className="table-th" scope="col" style={{textAlign: 'center'}}>PARAMETER TYPE</th>
                                <th className="table-th" scope="col" style={{textAlign: 'center'}}>INPUT VALUE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.props.listParameters || [])
                                .map((it, index) => {
                                    let off = (Date.now() - (it.lastPing || 0)) > (3 * 60 * 1000);
                                    return (
                                        <tr
                                            key={index}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor:  this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                                                color: '#000000',
                                            }}
                                        >
                                            <td className="table-td" style={{ textAlign: 'center',}}>
                                                {(it.name )}
                                            </td>
                                            <td className="table-td" style={{ textAlign: 'center',}}>
                                                {(it.type )}
                                            </td>
                                            <td className="table-td" style={{ textAlign: 'center',}}>

                                                {
                                                    it.type === "INTEGER" || it.type === "LONG" || it.type === "BIGDECIMAL" || it.type === "DOUBLE" || it.type === "SHORT" || it.type === "BYTE"?
                                                        <>
                                                            <Input type='number'
                                                                   name="input"
                                                                   onChange={(event) => {
                                                                       if (event.target.value != null) {
                                                                           this.props.listObject.map((a, index) => {
                                                                               if (a.name === it.name){
                                                                                   a.value = event.target.value
                                                                               }
                                                                           })
                                                                       }
                                                                       this.setState({
                                                                           valueNumber: event.target.value,
                                                                       })
                                                                   }}
                                                            >
                                                            </Input>
                                                            <span style = {{display: this.state.errorValueNumber != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueNumber ? this.state.errorValueNumber : ''}
                                                            </span>
                                                        </>
                                                        : it.type === "STRING" || it.type === "COLLECTION" ?
                                                        <>
                                                            <Input type='text'
                                                                   name="input"
                                                                   onChange={(event) => {
                                                                       if (event.target.value != null) {
                                                                           this.props.listObject.map((a, index) => {
                                                                               if (a.name === it.name){
                                                                                   a.value = event.target.value
                                                                               }
                                                                           })
                                                                       }
                                                                       this.setState({
                                                                           valueText: event.target.value,
                                                                       })
                                                                   }}
                                                            >
                                                            </Input>
                                                            <span style = {{display: this.state.errorValueText != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueText ? this.state.errorValueText : ''}
                                                            </span>
                                                        </>
                                                        : it.type === "TIMESTAMP" ?
                                                            <>
                                                                <Input type='date'
                                                                       name="input"
                                                                       onChange={(event) => {
                                                                           if (event.target.value != null) {

                                                                           }
                                                                           this.setState({valueDateTimeStamp: event.target.value})
                                                                       }}
                                                                >
                                                                </Input>
                                                                <span style = {{display: this.state.errorDateTimeStamp != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueDateTimeStamp ? this.state.errorDateTimeStamp : ''}
                                                                    </span>
                                                                <Input type='time'
                                                                       name="input"
                                                                       onChange={(event) => {
                                                                           if (event.target.value != null) {

                                                                           }
                                                                           this.setState({valueTime: event.target.value})
                                                                       }}
                                                                >
                                                                </Input>
                                                                <span style = {{display: this.state.errorValueTime != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueTime ? this.state.errorValueTime : ''}
                                                                    </span>
                                                                {
                                                                    this.props.listObject.map((a, index) => {
                                                                        if (a.name === it.name){
                                                                            a.value = a.value = this.state.valueDateTimeStamp + ' ' + this.state.valueTime;
                                                                        }
                                                                    })
                                                                }
                                                            </>
                                                            : it.type === "BOOLEAN" ?
                                                                <>
                                                                    <Input type='checkbox'
                                                                           name="input"
                                                                           checked={!!this.state.checkbox?.checkTrue}
                                                                           value={this.state.checkbox?.checkTrue}
                                                                           onChange={(event) => {
                                                                               if (!!event.target.checked) {
                                                                                   this.setState({checkbox: {
                                                                                           ...this.state.checkbox,
                                                                                           checkTrue: true,
                                                                                           checkFalse: false,
                                                                                       }});
                                                                               } else {
                                                                                   this.setState({checkbox: {
                                                                                           ...this.state.checkbox,
                                                                                           checkTrue: false,
                                                                                       }});
                                                                               }
                                                                               this.props.listObject.map((a, index) => {
                                                                                   if (a.name === it.name){
                                                                                       a.value = this.state.checkTrue === true ? '' : 'true';
                                                                                   }
                                                                               })
                                                                           }}
                                                                    />
                                                                    <span style={{ marginLeft: '5px' }}>{'True'}</span>
                                                                    <Input type='checkbox'
                                                                           name="input"
                                                                           style={{ marginLeft: '10px' }}
                                                                           checked={!!this.state.checkbox?.checkFalse}
                                                                           value={this.state.checkbox?.checkFalse}
                                                                           onChange={(event) => {
                                                                               if (!!event.target.checked) {
                                                                                   this.setState({checkbox: {
                                                                                           ...this.state.checkbox,
                                                                                           checkFalse: true,
                                                                                           checkTrue: false,
                                                                                       }});
                                                                               } else {
                                                                                   this.setState({checkbox: {
                                                                                           ...this.state.checkbox,
                                                                                           checkFalse: false,
                                                                                       }});
                                                                               }
                                                                               this.props.listObject.map((a, index) => {
                                                                                   if (a.name === it.name){
                                                                                       a.value = this.state.checkFalse === true ? '' : 'false';
                                                                                   }
                                                                               })
                                                                           }}
                                                                    />
                                                                    <span style={{ marginLeft: '35px' }}>{'False'}</span>
                                                                    {/*<span style = {{display: this.state.errorCheckBox != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>*/}
                                                                    {/*{!this.state.checkFalse   && !this.state.checkTrue   ? this.state.errorCheckBox : ''}*/}
                                                                    {/*</span>*/}
                                                                </>
                                                                :
                                                                <>
                                                                    <Input type='date'
                                                                           name="input"
                                                                           onChange={(event) => {
                                                                               if (event.target.value != null) {
                                                                                   this.props.listObject.map((a, index) => {
                                                                                       if (a.name === it.name){
                                                                                           a.value = event.target.value
                                                                                       }
                                                                                   })
                                                                               }
                                                                               this.setState({valueDate: event.target.value})
                                                                           }}
                                                                    >
                                                                    </Input>
                                                                    <span style = {{display: this.state.errorValueDate != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                                    {!this.state.valueDate ? this.state.errorValueDate : ''}
                                                                    </span>
                                                                </>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                        marginTop: "5px"
                    }}>
                        <span style={{width: '120px', color : "#000000"}}>TYPE</span>
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Input type="select" name="select"
                                   value={this.state.typeTask}
                                   onChange={(event) => {
                                       if (event.target.value != null) {
                                           this.setState({errorActionTask: ""})
                                       }

                                       if (event.target.value === "ONE_TIME" && this.props.data?.startTime) {
                                           let tmp = moment(new Date(this.props.data?.startTime || new Date())).toDate();
                                           if (tmp.getTime() < Date.now()) {
                                               this.state.dateTask = moment(new Date(new Date())).tz('Asia/Singapore').format('YYYY-MM-DD');
                                           }
                                       }

                                       this.setState({typeTask: event.target.value})
                                   }}
                            >
                                <option value=""></option>
                                <option value="ONE_TIME">ONE_TIME</option>
                                <option value="DAILY">DAILY</option>
                                <option value="WEEKLY">WEEKLY</option>
                                <option value="MONTHLY">MONTHLY</option>
                            </Input>
                            <span style = {{display: this.state.errorTypeTask != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                            {!this.state.typeTask ? this.state.errorTypeTask : ''}
                        </span>
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}>
                        <span style={{width: '120px', color : "#000000"}}>REPORT</span>
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Input readOnly value={this.props.data.id + " - " +this.props.data.reportName}>
                            </Input>
                        </div>
                    </div>

                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: "20px"}}>
                        <span style={{width: '96px', color : "#000000"}}>START</span>
                        {this.state.typeTask == "ONE_TIME" && (
                            <div
                                style={{
                                    display: "flex", width: "50%",
                                    height: "50px", marginLeft: "20px",
                                    flexDirection: "column", justifyContent: "center",
                                    alignItems: "left",
                                }}
                            >
                                <Input
                                    type="date"
                                    name="date"
                                    placeholder="Date"
                                    value={this.state.dateTask || ""}
                                    onChange={(event) => {
                                        if (event.target.value != null) {
                                            this.setState({errorDateTask: ""})
                                        }
                                        this.setState({dateTask: event.target.value})
                                    }}
                                />
                                <span style = {{display: this.state.errorDateTask != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                {!this.state.dateTask ? this.state.errorDateTask : ''}
                            </span>
                            </div>
                        )}

                        {(this.state.typeTask == "WEEKLY" || this.state.typeTask == "MONTHLY") && (
                            <div
                                style={{
                                    display: "flex", width: "50%",
                                    height: "50px", marginLeft: "20px",
                                    flexDirection: "column", justifyContent: "center",
                                    alignItems: "left",
                                }}
                            >
                                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                    <Input
                                        type="select" name="select"
                                           value={this.state.typeTask == "WEEKLY" ? this.state.dayOfWeek : this.state.dayOfMonth}
                                           onChange={(event) => {
                                               if (this.state.typeTask == "WEEKLY") {
                                                   this.setState({dayOfWeek: !!event.target.value ? Number(event.target.value) : null})
                                               } else {
                                                   this.setState({dayOfMonth: !!event.target.value ? Number(event.target.value) : null})
                                               }
                                           }}
                                    >
                                        {this.state.typeTask == "WEEKLY" ?
                                            <>
                                                <option value="">Day of week</option>
                                                <option value="0">SUN</option>
                                                <option value="1">MON</option>
                                                <option value="2">TUE</option>
                                                <option value="3">WEB</option>
                                                <option value="4">THU</option>
                                                <option value="5">FRI</option>
                                                <option value="6">SAT</option>
                                            </>
                                            :
                                            (() => {
                                                let dates = [];
                                                for (let i = 0; i < 28; i++) {
                                                    dates.push(i);
                                                }
                                                return [<option value="" key={0}>Day of month</option>].concat(dates.map(date => {
                                                    return <option value={"" + (date + 1)} key={date + 1}>{date + 1}</option>
                                                }))
                                            })()
                                        }
                                    </Input>
                                    {this.state.typeTask == "WEEKLY" ?
                                        <span style = {{display: this.state.errorDayOfWeek != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                            { !this.state.dayOfWeek ? this.state.errorDayOfWeek : ''}
                                        </span>
                                        :
                                        <span style = {{display: this.state.errorDayOfMonth != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                                {!this.state.dayOfMonth ? this.state.errorDayOfMonth : ''}
                                        </span>
                                    }

                                </div>
                            </div>
                        )}

                        <div
                            style={{
                                display: "flex", width: this.state.typeTask  != "DAILY" ? "50%" : "100%",
                                height: "50px", marginLeft: "20px",
                                flexDirection: "column", justifyContent: "center",
                                alignItems: "left",
                            }}
                        >
                            <Input
                                type="time"
                                name="time"
                                placeholder="Time"
                                value={this.state.timeTask || ""}
                                onChange={(event) => {
                                    if (event.target.value != null) {
                                        this.setState({errorTimeTask: ""})
                                    }
                                    this.setState({timeTask: event.target.value})
                                }}
                            />
                            <span style = {{display: this.state.errorTimeTask != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                    {!this.state.timeTask ? this.state.errorTimeTask : ''}
                            </span>
                        </div>
                    </div>

                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: '15px',
                            textAlign: 'left',
                            fontWeight: 500,
                            color: '#222222',
                        }}
                    >
                        Choose type of file to export :
                        <span
                            style={{
                                marginLeft: '3px',
                                marginTop: '2px',
                                color: 'red',
                            }}
                        ></span>
                    </label>
                    <div
                        className="col-md-6 input-wrap has-feedback has-success"
                        style={{ position: 'relative', paddingRight: '20px' }}
                    >
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="enrollment-date"
                                name="enrollment-date"
                                //checked={!!this.state.checkbox?.pdf}
                                checked={
                                    this.state.checkbox?.pdf === 'false' || this.state.checkbox?.pdf === false ? false : true
                                }
                                value={this.state.checkbox?.pdf}
                                onChange={(event) => {
                                    if (!!event.target.checked) {
                                        this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                pdf: true,
                                                xlsx: false,
                                                csv: false,
                                            }});
                                    }
                                }}
                            />
                            <span style={{ marginLeft: '5px' }}>{'PDF'}</span>

                            <input
                                type="checkbox"
                                style={{marginLeft: "20px"}}
                                id="enrollment-date"
                                name="enrollment-date"
                                checked={!!this.state.checkbox?.xlsx}
                                value={this.state.checkbox?.xlsx}
                                onChange={(event) => {
                                    if (!!event.target.checked) {
                                        this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                xlsx: true,
                                                csv: false,
                                                pdf: false,
                                            }});
                                    }
                                }}
                            />
                            <span style={{ marginLeft: '5px' }}>{'XLSX'}</span>
                            <input
                                type="checkbox"
                                id="enrollment-date"
                                style={{marginLeft: "20px"}}
                                name="enrollment-date"
                                checked={!!this.state.checkbox?.csv}
                                value={this.state.checkbox?.csv}
                                onChange={(event) => {
                                    if (!!event.target.checked) {
                                        this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                csv: true,
                                                xlsx: false,
                                                pdf: false,
                                            }});
                                    }
                                }}
                            />
                            <span style={{ marginLeft: '5px' }}>{'CSV'}</span>
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}>
                        <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                             onClick={async () => {
                                 console.log("ok");
                                 if (this.checkInput()) {
                                     this.setState({errorTypeTask: ""});
                                     this.setState({errorTimeTask: ""});
                                     this.setState({errorDateTask: ""});
                                     console.log("value listObject: ", this.state.listObject);
                                     let listParams = [];
                                     this.props.listObject.map((a, index) => {
                                         listParams.push({
                                             name: a.name,
                                             type: a.type,
                                             value: a.value
                                         })
                                     });

                                     let formatFile = '';
                                     if (this.state.checkbox?.csv == '' && this.state.checkbox?.pdf == '' && this.state.checkbox?.xlsx == '') {
                                         this.setState({
                                             checkbox: {
                                                 ...this.state.checkbox,
                                                 pdf: true,
                                             }
                                         });
                                         formatFile = 'PDF';
                                     } else {
                                         formatFile = this.state.checkbox?.csv == true ? 'CSV' : this.state.checkbox?.pdf == true ? 'PDF' : this.state.checkbox?.xlsx == true ? 'XLSX' : 'PDF';
                                     }

                                     let params = {
                                         id: this.props.data.id,
                                         reportId: this.props.data.id,
                                         type: this.state.typeTask,
                                         date: this.state.typeTask == "ONE_TIME" ? this.state.dateTask : null,
                                         time: this.state.timeTask,
                                         dayOfWeek: this.state.dayOfWeek,
                                         dayOfMonth: this.state.dayOfMonth,
                                         parameter: JSON.stringify(listParams),
                                         format: formatFile
                                     };
                                     console.log(JSON.stringify(params));
                                     let rp = await createReportSchedule(params);
                                     console.log(params);
                                     console.log(rp);

                                     if (rp.success) {
                                         Swal.fire({
                                             html: `
                                                <p style='text-align: center; font-size: 14px;'> Successfully!</p>
                                             `,
                                             icon: 'success',
                                             confirmButtonText: 'OK',
                                         })
                                             .then(async () => {
                                                 await this.setState({createTask: {create: false, data: null}})
                                                 this.props.onClose && this.props.onClose(true)
                                             })
                                     } else {
                                         Swal.fire({
                                             html: `
                                                <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
                                             `,
                                             icon: 'error',
                                             confirmButtonText: 'OK',
                                         })
                                         this.props.onClose && this.props.onClose(false)
                                     }
                                 } else {
                                     if (this.state.typeTask == null || this.state.typeTask == "") {
                                         this.setState({errorTypeTask: "Type can not be empty"});
                                     }
                                     if (this.state.timeTask == null || this.state.timeTask == "") {
                                         this.setState({errorTimeTask: "Time can not be empty"});
                                     }
                                     if (this.state.dateTask == null || this.state.dateTask == "") {
                                         this.setState({errorDateTask: "Date can not be empty"});
                                     }
                                     if (this.state.valueText == null || this.state.valueText == "") {
                                         this.setState({errorValueText: "Can not be empty"});
                                     }
                                     if (this.state.valueNumber == null || this.state.valueNumber == "") {
                                         this.setState({errorValueNumber: "Can not be empty"});
                                     }
                                     if (this.state.valueTime == null || this.state.valueTime == "") {
                                         this.setState({errorValueTime: "Can not be empty"});
                                     }
                                     if (this.state.valueDateTimeStamp == null || this.state.valueDateTimeStamp == "") {
                                         this.setState({errorDateTimeStamp: "Can not be empty"});
                                     }
                                     // if (this.state.checkFalse == null || this.state.checkFalse == "" && this.state.checkTrue == null || this.state.checkTrue == "" ) {
                                     //     this.setState({errorCheckBox: "Can not be empty"});
                                     // }
                                     if (this.state.valueDate == null || this.state.valueDate == "") {
                                         this.setState({errorValueDate: "Can not be empty"});
                                     }
                                     if (this.state.dayOfWeek == null || this.state.dayOfWeek == "") {
                                         this.setState({errorDayOfWeek: "Day of week dan not be empty"});
                                         console.log("Day of week dan not be empty");
                                     }
                                     if (this.state.dayOfMonth == null || this.state.dayOfMonth == "") {
                                         this.setState({errorDayOfMonth: "Day of month can not be empty"});
                                         console.log("ay of month can not be empty");
                                     }
                                 }
                             }}
                        >
                            <span>{'SAVE'}</span>
                        </div>
                        <div style={{ marginLeft: '5px' }} className="button-btn w-80"
                             onClick={() => {this.props.onClose && this.props.onClose(); }}
                        >
                            <span>{'CANCEL'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNamespaces('common')(Homepage);
