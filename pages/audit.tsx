import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import { ProgressLoading, Input } from '@app/components/Common';
import 'moment-timezone';
const Swal = require('sweetalert2');

import { getUsers, createUser, deleteUser } from '@app/api/user';

import {getBatchLogs, searchBatchLog, searchLogs, searchLinkMSN} from '@app/api/log';
import ReactTooltip from 'react-tooltip';
import moment from "moment";

const styles = css`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  :global(body) {
    padding: 0px;
    height: 100%;


  }
  :global(.page) {
    display: flex;
    flex-direction: column;
    :global(.p-card) {
      flex: 1;
    }
  }
  :global(#__next) {
    height: 100%;
  }
  :global(#__next > div) {
    height: 100%;
  }
  :global(.page-content) {
    padding: 0px;
    padding: 0px;
    height: 101%;
    background: #f3f3f4;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .dashboard {
    display: flex;
    flex-direction: column;
    flex: 1;
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
    :global(.box-item) {
    @media(max-width: 900px) {
      flex-direction: column !important;
      align-items: flex-start;
      width: 100%;
    }
  }
   :global(.item) {
    @media(min-width: 900px) {
      width: 20%;
      margin-bottom: 10px;
      min-width: 300px;
      >input {
        width: 97% !important;
      }
    }
    @media(max-width: 900px) {
      width: 97%;
      margin-bottom: 10px;
      >input {
        width: 70% !important;
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
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
    static getInitialProps = async (args) => {
        let { query: { q, page, }, asPath, req, initialState: {} } = args;

        let pageNumber = Number(page) || 1;
        let params = {
            pageNumber: pageNumber,
            limit: 20,
            offset: (pageNumber - 1) * 20,
        };

        let rp = await getUsers(params, req);
        rp = rp || {};
        rp.response = rp.response || {};
        return {
            namespacesRequired: ['common'],
            asPath,
            key: Date.now(),
            useTemplate: true,
            loginRequire: true,
            users: rp.response.results || [],
            totalRecords: rp.response.totalRows || 0,
            totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
            pageIndex: pageNumber,
            pageSize: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
        };
    }
    state = {
        ...this.props,
    };
    componentDidMount() {
        this.setState({mapKey: Date.now()})
    }

    searchProcessBatch = async () => {
        this.setState({
            loading: true
        })
        const params = {
            limit: this.state.limit || 20,
            offset: this.state.offset || 0,
            options: {
                userName: !!this.state.searchUser ? this.state.searchUser : null,
                fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).startOf('day').valueOf() : undefined,
            }
        };
        const rp = await searchBatchLog(params);
        this.setState({
            loading: false
        })
        console.log("rp?.totalRows", rp?.response.totalRows);
        this.setState({
            relatedMeterPis: rp?.response.results || [],
            totalRecordsRelatedMeterPi: rp?.response.totalRows,
            totalPagesRelatedMeterPi: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
            pageIndexRelatedMeterPi: Math.floor((rp?.response.offset + 19) / 20) + 1,
            pageSizeRelatedMeterPi: 20
        });
    }

    searchCommand = async () => {
        this.setState({
            loading: true
        })
        const params = {
            limit: this.state.limit || 20,
            offset: this.state.offset || 0,
            options: {
                userName: !!this.state.searchUser ? this.state.searchUser : null,
                fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).startOf('day').valueOf() : undefined,
            }
        };
        const rp = await searchLogs(params);
        this.setState({
            loading: false
        })
        this.setState({
            logs: rp?.response.results || [],
            totalRecordsRelatedMeterPi: rp?.response.totalRows,
            totalPagesRelatedMeterPi: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
            pageIndexRelatedMeterPi: Math.floor((rp?.response.offset + 19) / 20) + 1,
            pageSizeRelatedMeterPi: 20
        });
    }

    searchLinkMSN = async () => {
        this.setState({
            loading: true
        })
        const params = {
            limit: this.state.limit || 20,
            offset: this.state.offset || 0,
            options: {
                userName: !!this.state.searchUser ? this.state.searchUser : null,
                fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).startOf('day').valueOf() : undefined,
            }
        };
        const rp = await searchLinkMSN(params);
        this.setState({
            loading: false
        })
        this.setState({
            linkMSN: rp?.response.results || [],
            totalRecordsRelatedMeterPi: rp?.response.totalRows,
            totalPagesRelatedMeterPi: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
            pageIndexRelatedMeterPi: Math.floor((rp?.response.offset + 19) / 20) + 1,
            pageSizeRelatedMeterPi: 20
        });
    }

    checkInput = () => {
        if (this.state.selectedType == null || this.state.selectedType == "") {
            return false;
        }
        return true;
    }

    render() {
        const { t } = this.props;
        return (
            <TotPage title={'Audit Management'}>
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
                            {!!this.state.userEdit ?
                                <PEdit
                                    data={this.state.userEdit}
                                    companies={this.state.companies || []}
                                    payments={this.state.payments || []}
                                    keys={this.state.keys || []}
                                    keyGroups={this.state.keyGroups || []}
                                    lockGroups={this.state.lockGroups || []}
                                    onClose={() => {
                                        this.setState({userEdit: null})
                                    }}
                                    onSave={() => {
                                        window.location.href = window.location.href;
                                    }}
                                />
                            :null
                            }
                            {!this.state.userEdit ?
                            <>
                              <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                                <h5 className="site-title">Audit Management</h5>
                              </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            height: '70px',
                                            transition: 'all 0.2s ease',
                                            width: '100%',
                                            flexWrap: 'wrap',
                                            marginTop: '10px',
                                        }}
                                        className="box-item"
                                    >
                                      <div style={{display:'flex', alignItems: 'center'}} className="item">
                                        <span style={{ marginLeft: '20px', width: '100px' }}>{'From date:'}</span>
                                        <input
                                          style={{
                                            border: '1px solid #e1e1e1',
                                            borderRadius: '5px',
                                            outline: 'unset',
                                            height: '40px',
                                            // width: '10%',
                                            paddingLeft: '10px',
                                            marginLeft: '5px',
                                            alignSelf: 'center',
                                          }}
                                          key={this.state.key1}
                                          type="date"
                                          value={this.state.searchFromDate}
                                          onChange={event => this.setState({ searchFromDate: event.target.value })}
                                        />
                                      </div>

                                      <div style={{display:'flex', alignItems: 'center'}} className="item">
                                        <span style={{ marginLeft: '20px', width: '100px' }}>{'To date:'}</span>
                                        <input
                                          style={{
                                            border: '1px solid #e1e1e1',
                                            borderRadius: '5px',
                                            outline: 'unset',
                                            height: '40px',
                                            // width: '10%',
                                            paddingLeft: '10px',
                                            marginLeft: '5px',
                                            alignSelf: 'center',
                                          }}
                                          key={this.state.key2}
                                          type="date"
                                          min={this.state.searchFromDate}
                                          value={this.state.searchToDate}
                                          onChange={event => this.setState({ searchToDate: event.target.value })}
                                        />
                                      </div>

                                        <div style={{display:'flex', alignItems: 'center'}} className="item">
                                          <span style={{ marginLeft: '20px',  width: '100px' }}>{'User :'}</span>
                                          <input
                                            style={{
                                              border: '1px solid #e1e1e1',
                                              borderRadius: '5px',
                                              outline: 'unset',
                                              height: '40px',
                                              // width: '10%',
                                              paddingLeft: '10px',
                                              marginLeft: '5px',
                                              alignSelf: 'center',
                                            }}
                                            type="text"
                                            value={this.state.searchUser}
                                            onChange={event => this.setState({ searchUser: event.target.value })}
                                          />
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column", marginLeft: "20px", alignItems: 'center'}} className="item">
                                          <select
                                            style={{ outline: 'unset', width: '250px', height: '40px', borderColor: '#e5e5e5', borderRadius: '4px' }}
                                            className="select-installer-user"
                                            name="Building"
                                            value={this.state.selectedType}
                                            onChange={async(event) => {
                                                this.setState({
                                                    selectedType: event.target.value,
                                                });
                                            }}
                                          >
                                            <option value="">{'Type select'}</option>
                                            <option value="LINK MSN">{'LINK MSN'}</option>
                                            <option value="SEND COMMAND">{'SEND COMMAND'}</option>
                                            <option value="PROCESS BATCH">{'PROCESS BATCH'}</option>
                                          </select>
                                          {this.state.errorSelectedType && (
                                            <span style = {{display: this.state.errorSelectedType != '' ? 'flex' : 'none', color: 'red', fontSize: '12px', marginTop: '5px'}}>
                                              {!this.state.selectedType ? this.state.errorSelectedType : ''}
                                          </span>
                                          )}
                                        </div>
                                        <div style={{display: 'flex'}}>
                                          <button
                                            className="button-btn w-80 ml-15"
                                            style={{
                                              outline: 'unset',
                                              border: 'unset',
                                            }}
                                            onClick={() => {
                                              if (this.checkInput()) {
                                                this.setState({errorSelectedType: ""});
                                                if (this.state.selectedType == "PROCESS BATCH") {
                                                  this.searchProcessBatch();
                                                  this.setState({
                                                    logs: '',
                                                    linkMSN: '',
                                                  })
                                                }
                                                if (this.state.selectedType == "SEND COMMAND") {
                                                  this.searchCommand();
                                                  this.setState({
                                                    relatedMeterPis: '',
                                                    linkMSN: '',
                                                  })
                                                }

                                                if (this.state.selectedType == "LINK MSN") {
                                                  this.searchLinkMSN();
                                                  this.setState({
                                                    logs: '',
                                                    relatedMeterPis: '',
                                                  })
                                                }
                                              } else {
                                                if (this.state.selectedType == null || this.state.selectedType == "") {
                                                  this.setState({errorSelectedType: "Type can not be empty"});
                                                }
                                              }
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
                                              this.setState({
                                                selectedType: "",
                                                searchUser: "",
                                                searchFromDate: '',
                                                searchToDate: ''
                                              });
                                            }}
                                          >
                                            {'REFRESH'}
                                          </button>
                                        </div>


                                    </div>
                                    {!!this.state.totalRecordsRelatedLog &&
                                    <div style={{paddingTop: '25px', fontWeight: 500}}>
                                        <span>{'Totals: ' + this.state.totalRecordsRelatedLog}</span>
                                    </div>
                                    }
                                </div>
                                <div style={{display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '500px',  marginTop: '20px'}} className='doctor-list'>
                                        {!!this.state.relatedMeterPis ?
                                            <div style={{display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%',}}>
                                            <table className='table'>
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="table-th" scope="col">ID</th>
                                                    <th className="table-th" scope="col">CREATE DATE</th>
                                                    <th className="table-th" scope="col">UUID</th>
                                                    <th className="table-th" scope="col">USER NAME</th>
                                                    <th className="table-th" scope="col">EMAIL</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {(this.state.relatedMeterPis || [])
                                                    .map((it, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="table-td">
                                                                    {it.id}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.createDate}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.uuid}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.userName}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.userEmail}
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
                                                                    this.searchProcessBatch();
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
                                            : null}

                                    {!!this.state.logs ?
                                        <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%',}}>
                                            <table className='table'>
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="table-th" scope="col">ID</th>
                                                    <th className="table-th" scope="col">UID</th>
                                                    <th className="table-th" scope="col">PID</th>
                                                    <th className="table-th" scope="col">MSN</th>
                                                    <th className="table-th" scope="col">USER NAME</th>
                                                    <th className="table-th" scope="col">EMAIL</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {(this.state.logs || [])
                                                    .map((it, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="table-td">
                                                                    {it.id}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.uid}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.pid}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.msn}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.userName}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.userEmail}
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
                                                                this.searchProcessBatch();
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
                                        : null}

                                    {!!this.state.linkMSN ?
                                        <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%',}}>
                                            <table className='table'>
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="table-th" scope="col">ID</th>
                                                    <th className="table-th" scope="col">UID</th>
                                                    <th className="table-th" scope="col">MSN</th>
                                                    <th className="table-th" scope="col">STATUS</th>
                                                    <th className="table-th" scope="col">GROUP</th>
                                                    <th className="table-th" scope="col">USER NAME</th>
                                                    <th className="table-th" scope="col">EMAIL</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {(this.state.linkMSN || [])
                                                    .map((it, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="table-td">
                                                                    {it.id}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.uid}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.msn}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.status}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.group}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.installerName}
                                                                </td>
                                                                <td className="table-td">
                                                                    {it.installerEmail}
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
                                                                this.searchProcessBatch();
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
                                        : null}
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

class PEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: {...this.props.data},
            validate: {},
            ignores: [
                'gender', 'avatar', 'birthDay', 'companyRefId', 'userCompany', 'userCompanyRefId', 'paymentId', 'identification', 'invoiceNo', 'ccName',
                'countryCode', 'lockServerPassword', 'lockServerUsername', 'participant', 'lastLogin', 'token', 'userRegistrationImageName', 'userRegistrationMessage',
                'companyPosition', 'uuidIOS', 'deviceId', 'registeredTime', 'ccValidity', 'ccNum', 'company', 'approved', 'phoneNumber', 'status',
            ]
        };
    }

    componentDidMount() {

    }

    handleChange(field, value) {

        if (field === 'role') {
            this.state.displayValue.roles = [value];
            this.validate('roles');
        } else if (field === 'company') {
            this.state.displayValue.company = {companyID: value};
            this.validate('roles');
        } else {
            this.state.displayValue[field] = value;
            this.validate(field);
        }

        this.setState({displayValue: {...this.state.displayValue}})
    }

    validate(field) {

        if (this.state.ignores.indexOf(field) > -1) {
            return true;
        }

        let value = this.state.displayValue[field];
        if (field === 'password') {
            this.state.validate.password = value == null || value == undefined || value.trim().length >= 6 || value.trim().length == 0;
        } else if (field === 'email') {
            this.state.validate.email = !!value && !!value.trim().length && (/^([a-z0-9_\-]+\.){0,}[a-z0-9_\-]+@([a-z0-9_\-]+\.){1,}[a-z0-9_\-]+$/g.test(value.toLowerCase().trim()));
        } else if (typeof value === 'number') {
            this.state.validate[field] = value > -1;
        } else if (typeof value === 'string') {
            this.state.validate[field] = !!value && !!value.trim().length;
        } else {
            this.state.validate[field] = !!value;
        }

        if (!this.state.validate[field]) {
            console.info('Field error: ' + field)
        }
        return this.state.validate[field];
    }

    validates() {
        let rs = true;
        Object.keys(this.state.displayValue || {})
        .map(field => rs &= this.validate(field));
        return rs;
    }

    render() {
        return (
            <div style={{paddingTop: '15px', flex: 1}}>
                <div className="form-group">
                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: "12px",
                            textAlign: "left",
                            fontWeight: 500,
                            color: "#222222"
                        }}
                    >
                        Email :
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
                        style={{ position: "relative", paddingRight: "20px" }}
                    >
                        <Input
                            key={this.state.refreshKey}
                            field={{
                                name: "email"
                            }}
                            name="email"
                            type="email"
                            disabled={!!this.state.displayValue.id}
                            value={this.state.displayValue.email}
                            placeholder={"Email"}
                            groupstyle={{ margin: "auto" }}
                            onChange={value => this.handleChange('email', value)}
                        />
                        {this.state.validate.email === false ?
                        <small className="help-block"
                            style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.email || !this.state.displayValue.email.trim().length) ? 'Email is required!' : 'Email invalid!'}
                        </small>
                        : null}
                    </div>
                </div>

                <div className="form-group">
                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: "12px",
                            textAlign: "left",
                            fontWeight: 500,
                            color: "#222222"
                        }}
                    >
                        First Name :
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
                        style={{ position: "relative", paddingRight: "20px" }}
                    >
                        <Input
                            key={this.state.refreshKey}
                            field={{
                                name: "firstName"
                            }}
                            name="firstName"
                            type="text"
                            value={this.state.displayValue.firstName}
                            placeholder={"First name"}
                            groupstyle={{ margin: "auto" }}
                            onChange={value => this.handleChange('firstName', value)}
                        />
                        {this.state.validate.firstName === false ?
                        <small className="help-block"
                            style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.firstName || !this.state.displayValue.firstName.trim().length) ? 'firstName is required!' : 'firstName invalid!'}
                        </small>
                        : null}
                    </div>
                </div>

                <div className="form-group">
                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: "12px",
                            textAlign: "left",
                            fontWeight: 500,
                            color: "#222222"
                        }}
                    >
                        Last Name :
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
                        style={{ position: "relative", paddingRight: "20px" }}
                    >
                        <Input
                            key={this.state.refreshKey}
                            field={{
                                name: "lastName"
                            }}
                            name="firstName"
                            type="text"
                            value={this.state.displayValue.lastName}
                            placeholder={"Last name"}
                            groupstyle={{ margin: "auto" }}
                            onChange={value => this.handleChange('lastName', value)}
                        />
                        {this.state.validate.lastName === false ?
                        <small className="help-block"
                            style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.lastName || !this.state.displayValue.lastName.trim().length) ? 'lastName is required!' : 'lastName invalid!'}
                        </small>
                        : null}
                    </div>
                </div>

                <div className="form-group">
                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: "12px",
                            textAlign: "left",
                            fontWeight: 500,
                            color: "#222222"
                        }}
                    >
                        Identification :
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
                        style={{ position: "relative", paddingRight: "20px" }}
                    >
                        <Input
                            key={this.state.refreshKey}
                            field={{
                                name: "identification"
                            }}
                            name="identification"
                            type="text"
                            value={this.state.displayValue.identification}
                            placeholder={"Identification"}
                            groupstyle={{ margin: "auto" }}
                            onChange={value => this.handleChange('identification', value)}
                        />
                        {this.state.validate.identification === false ?
                        <small className="help-block"
                            style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.identification || !this.state.displayValue.identification.trim().length) ? 'identification is required!' : 'identification invalid!'}
                        </small>
                        : null}
                    </div>
                </div>

                <div className="form-group">
                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: "12px",
                            textAlign: "left",
                            fontWeight: 500,
                            color: "#222222"
                        }}
                    >
                        Role :
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
                        style={{ position: "relative", paddingRight: "20px" }}
                    >
                        <SelectCustom
                            field={{
                                name: "role"
                            }}
                            name="role"
                            options={[
                                ...(
                                    this.state.roles || [
                                        { name: "Select role", value: '-1' },
                                        { name: "Visitor", value: 'VISITOR' },
                                        { name: "SubAdmin", value: 'SUB_ADMIN' },
                                        { name: "Staff", value: 'STAFF' },
                                        { name: "Super Admin", value: 'SUPER_ADMIN' },
                                        { name: "Owner - Admin Company", value: 'OWNER_ADMIN_COMPANY' },
                                        { name: "Admin (Adminstrative from Admin Company)", value: 'ADMINSTRATIVE_ADMIN_COMPANY' },
                                        { name: "Contractor", value: 'CONTRACTOR' },
                                        { name: "Installer", value: 'INSTALLER' },
                                        { name: "Factory Staff", value: 'FACTORY_STAFF' },
                                    ]
                                ).map(item => ({
                                    label: item.name,
                                    value: item.value
                                }))
                            ]}
                            value={(this.state.displayValue.roles || [])[0]}
                            onChange={(field, value) => this.handleChange('role', value.value)}
                            groupstyle={{  }}
                        />
                        {this.state.validate.role === false ?
                        <small className="help-block"
                            style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.role || !this.state.displayValue.role.trim().length) ? 'role is required!' : 'role invalid!'}
                        </small>
                        : null}
                    </div>
                </div>

                <div className="form-group">
                    <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                            fontSize: "12px",
                            textAlign: "left",
                            fontWeight: 500,
                            color: "#222222"
                        }}
                    >
                        Password :
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
                        style={{ position: "relative", paddingRight: "20px" }}
                    >
                        <Input
                            key={this.state.refreshKey}
                            field={{
                                name: "password"
                            }}
                            name="password"
                            type="password"
                            value={this.state.displayValue.password}
                            placeholder={"Password"}
                            groupstyle={{ margin: "auto" }}
                            onChange={value => this.handleChange('password', value)}
                        />
                        {this.state.validate.password === false ?
                        <small className="help-block"
                            style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.password || !this.state.displayValue.password.trim().length) ? 'password is required!' : 'password invalid!'}
                        </small>
                        : null}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-6 input-wrap has-feedback has-success" style={{display: 'flex', flexDirection: 'row',}}>
                        <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                            onClick={async () => {
                                if (!this.validates()) {
                                    this.setState({});
                                    return;
                                }
                                let result = await Swal.fire({
                                    html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                                    icon: 'question',
                                    confirmButtonText: 'OK',
                                    cancelButtonText: 'Cancel',
                                    showCancelButton: true,
                                });
                                if (!result || !result.isConfirmed) return;

                                let rp = await createUser(this.state.displayValue);
                                if (rp.success) {
                                    Swal.fire({
                                        html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                         icon: 'success',
                                         confirmButtonText: 'OK',
                                    });
                                    this.props.onSave && this.props.onSave(this.state.displayValue)
                                } else {
                                    Swal.fire({
                                        html: `<p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>`,
                                        icon: 'error',
                                        confirmButtonText: 'OK',
                                    });
                                }
                            }}
                        >
                          <span>{'SAVE'}</span>
                        </div>
                        <div style={{marginLeft: '5px'}} className="button-btn w-80"
                            onClick={() => {this.props.onClose && this.props.onClose()}}
                        >
                          <span>{'CANCEL'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNamespaces('common')(Homepage);
