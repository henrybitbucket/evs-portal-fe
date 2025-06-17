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

import { addDeviceGroup, editSchedule, getDeviceGroups, getGroupTask, pingPi, deleteSchedule, getCommand, createSchedule } from '@app/api/log';
import ReactTooltip from "react-tooltip";
import { Form, Input , Button } from 'reactstrap';

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
      const rp = await getGroupTask(params);
      this.setState({
          relatedMeterPis: rp?.response.results || [],
          totalRecordsRelatedMeterPi: rp?.response.totalRows,
          totalPagesRelatedMeterPi: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
          pageIndexRelatedMeterPi: (rp?.response.offset + 19) / 20,
          pageSizeRelatedMeterPi: 20
      });
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Task Schedule Management'}>
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
              {!this.state.piAdd && !this.state.PEdit ?
                <>
                  <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                    <h5 className="site-title">{'Task Schedule Management'}</h5>
                  </div>
                  <div style={{ display: 'flex', padding: '30px', borderBottom: '1px solid #ddd', paddingTop: '20px', paddingBottom: '20px' }}>
                    <div
                      className="w-200 button-btn"
                       onClick={() => this.setState({
                         piAdd: {},
                       })}
                    >
                      <span >{'ADD NEW SCHEDULE'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }} className="doctor-list">
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                      <table className="table">
                          <thead className="thead-dark">
                              <tr>
                                  <th className="table-th" scope="col">TASK ID</th>
                                  <th className="table-th" scope="col">GROUP ID</th>
                                  <th className="table-th" scope="col">GROUP NAME</th>
                                  <th className="table-th" scope="col">START TIME</th>
                                  <th className="table-th" scope="col">TYPE</th>
                                  <th className="table-th" scope="col">COMMAND</th>
                                  <th className="table-th" scope="col">ACTION</th>
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
                                        <td className="table-td">
                                            <a href={'/batch-process-logs?groupTaskId=' + it.id} target="_blank">
                                              {it.id}
                                            </a>
                                        </td>
                                        <td className="table-td">
                                            {(it.groupId )}
                                        </td>
                                        <td className="table-td">
                                            {(it.groupName )}
                                        </td>
                                        <td className="table-td">
                                            {moment(new Date(it.startTime)).tz('Asia/Singapore').format(it.type == 'ONE_TIME' ? 'YYYY-MM-DD HH:mm:ss' :
                                            (it.type == 'WEEKLY' ? 'ddd HH:mm:ss' : (it.type == 'MONTHLY' ? '[XXXX]-[XX]-DD HH:mm:ss' : 'HH:mm:ss')))}
                                        </td>
                                        <td className="table-td ">
                                            {(it.type )}
                                        </td>
                                        <td className="table-td ">
                                            {(it.command )}
                                        </td>
                                        <td className="table-td " style={{display: 'flex'}}>
                                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                            <div
                                                data-tip="Click to edit shedule"
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

                                                        let rp = await deleteSchedule(params);
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
      typeTask: this.props.data?.type,
      groupTask: this.props.data?.group?.id,
      commandTask: this.props.data?.command,
      dateTask: moment(new Date(this.props.data?.startTime || new Date())).tz('Asia/Singapore').format('YYYY-MM-DD'),
      timeTask: this.props.data?.startTime ? moment(new Date(this.props.data?.startTime)).tz('Asia/Singapore').format('HH:mm') : "",
      dayOfWeek: this.props.data?.startTime ? moment(new Date(this.props.data?.startTime)).tz('Asia/Singapore').toDate().getDay() : "",
      dayOfMonth: this.props.data?.startTime ? moment(new Date(this.props.data?.startTime)).tz('Asia/Singapore').toDate().getDate() : "",
      validate: {},
      ignores: [
      ],
    };
  }

  componentDidMount() {
     this.loadListGroup();
     this.loadListCommand();
  }

    loadListGroup = async () => {
        const params = {
            limit: this.state.limit || 20,
            offset: this.state.offset || 0,
        };
        const rp = await getDeviceGroups(params);
        this.setState({
            deviceGroups: rp.response.results || [],
            totalRecords: rp.response.totalRows || 0,
            totalPagesRelatedGroup: Math.floor(((rp.totalRows || 0) + 19) / 20),
            pageIndexRelatedGroup: (rp?.offset + 19) / 20,
            pageSizeRelatedGroup: 20
        });
    }

    loadListCommand = async () => {
        const params = {
            limit: this.state.limit || 20,
            offset: this.state.offset || 0,
        };
        const rp = await getCommand(params);
        this.setState({
            commandList: rp || []
        });
        console.log( "loadListCommand", this.state.CommandList)
    }

    checkInput = () => {
        if (this.state.groupTask == null || this.state.groupTask == "") {
            return false;
        }
        if (this.state.typeTask == null || this.state.typeTask == "") {
            return false;
        }
        if (this.state.commandTask == null || this.state.commandTask == "") {
            return false;
        }
        if (this.state.dateTask == null || this.state.dateTask == "") {
            return false;
        }
        if (this.state.timeTask == null || this.state.timeTask == "") {
            return false;
        }
        return true;
    }


  render() {
    return (
        <div style={{ padding: '15px', maxWidth: '600px', width: '100%' }}>
            <div className="form-group">
                <div style={{ justifyContent: "center", padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                    <h5 style={{ justifyContent: "center",}} className="site-title">{!this.props.data.id ? 'Add Schedule' : 'Edit Schedule'}</h5>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px"
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
                    <span style={{width: '120px', color : "#000000"}}>GROUP</span>
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <Input type="select" name="select"
                            value={this.state.groupTask}
                            onChange={(event) => {
                                if (event.target.value != null) {
                                    this.setState({errorTypeTask: ""})
                                }
                                this.setState({groupTask: event.target.value})
                            }}
                        >
                            <option value=""></option>
                            {(this.state.deviceGroups || []).map((it, index) => {
                                return <option key={index} value={it.id}>{it.id +" - "+ (it.name ? it.name : "Group name empty")}</option>
                            })}
                        </Input>
                        <span style = {{display: this.state.errorGroupTask != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                            {!this.state.groupTask ? this.state.errorGroupTask : ''}
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
                    <span style={{width: '120px', color : "#000000"}}>COMMAND</span>
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <Input
                        type="select"
                        name="select"
                        value={this.state.commandTask}
                        onChange={(event) => {
                            if (event.target.value != null) {
                                this.setState({errorTimeTask: ""})
                            }
                            this.setState({commandTask: event.target.value})
                        }}
                    >
                        <option value=""></option>
                        {(this.state.commandList || []).map((it, index) => {
                                return <option key={index} defaultValue="" value={it}>{it}</option>
                            })}
                    </Input>
                        <span style = {{display: this.state.errorCommandTask != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                            {!this.state.commandTask ? this.state.errorCommandTask : ''}
                        </span>
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
                                <Input type="select" name="select"
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
                                <span style = {{display: this.state.errorTypeTask != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                    {!this.state.typeTask ? this.state.errorTypeTask : ''}
                                </span>
                            </div>
                        </div>
                    )}
                    <div
                        style={{
                            display: "flex", width: this.state.typeTask != "DAILY" ? "50%" : "100%",
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

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}>
                    <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                        onClick={async () => {
                            if (this.checkInput()) {
                                this.setState({errorGroupTask: ""});
                                this.setState({errorTypeTask: ""});
                                this.setState({errorCommandTask: ""});
                                this.setState({errorTimeTask: ""});
                                this.setState({errorDateTask: ""});

                                let params = {
                                    id: this.props.data.id,
                                    groupId: this.state.groupTask,
                                    type: this.state.typeTask,
                                    command: this.state.commandTask,
                                    date: this.state.typeTask == "ONE_TIME" ? this.state.dateTask : null,
                                    time: this.state.timeTask,
                                    dayOfWeek: this.state.dayOfWeek,
                                    dayOfMonth: this.state.dayOfMonth,
                                };
                                console.log(JSON.stringify(params));
                                let rp = await createSchedule(params);
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
                                if (this.state.groupTask == null || this.state.groupTask == "") {
                                    this.setState({errorGroupTask: "Group can not be empty"});
                                } else {
                                    this.setState({errorGroupTask: ""});
                                }
                                if (this.state.typeTask == null || this.state.typeTask == "") {
                                    this.setState({errorTypeTask: "Type can not be empty"});
                                }
                                if (this.state.commandTask == null || this.state.commandTask == "") {
                                    this.setState({errorCommandTask: "Command can not be empty"});
                                }
                                if (this.state.timeTask == null || this.state.timeTask == "") {
                                    this.setState({errorTimeTask: "Time can not be empty"});
                                }
                                if (this.state.dateTask == null || this.state.dateTask == "") {
                                    this.setState({errorDateTask: "Date can not be empty"});
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
