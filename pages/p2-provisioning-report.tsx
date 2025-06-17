import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import { Pagination, ProgressLoading, SelectCustom} from '@app/components/Common';

import 'moment-timezone';
import {
  getAllDevices,
  getFiles,
  getRelatedLogs,
  editDevice,
  linkMsn,
  getLastSubmit,
  saveBulkMeterCommissionSubmit,
  getP2Jobs,
  validateLoginPwd,
  deleteP2Report,
  getP2WorkerByManager,
  getP2Managers,
  getMyGroupUsers,
  getUserOfSubGroups,
} from "@app/api/log";

import { getUserPermissions } from '@app/api/user';

import moment from "moment";

import makeAnimated from 'react-select/animated';
import ReactTooltip from "react-tooltip";

const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

const styles = css`
  @import "static/styles/scss-in-theme/bootstrap/functions";
  @import "static/styles/scss-in-theme/bootstrap/variables";
  @import "static/styles/scss-in-theme/mixins";

  :global(.force-hide) {
    max-width: 0px !important;
    max-height: 0px !important;
    opacity: 0 !important;
    overflow: hidden !important;
    pointer-events: none !important;
    padding: 0 !important;
    visibility: collapse !important;
  }
  :global(.fix) {
    position: fixed;
    background-color: #111111c9;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    padding: 150px;
    z-index: 1000;
    overflow: auto;
    justify-content: center;
    align-items: center;
    padding-top: 300px;
  }
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
    flex: 1;
  }
  :global(.p-card) {
    display: flex;
    flex: 1;
  }
  :global(.dashboard) {
    display: flex;
    flex: 1;
  }
  :global(.page-content) {
    display: flex;
    flex: 1;
  }
  :global(.page-content > div) {
    max-width: 100%;
  }
  :global(.page-content) {
    padding: 0px;
    padding: 0px;
    height: 101%;
    background: #f3f3f4;
    max-width: 100%;
  }
  :global(.table-wrap) {
    max-width: 100%;
    min-width: 100%;
    overflow: auto;
    flex: 1;
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
  th {
    border: none !important;
  }
  :global(.box-setting) {
    @media(max-width: 800px) {
      width: 85% !important;
    }
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
  :global(.btn-item) {
    background-color: #042ee1;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-width: 5px;
    border-style: thin;
    border-radius: 5px;
    border-color: #042ee1;
    font-weight: 400;
    cursor: pointer;
    height: 30px;
    width: 150px;
  }
  :global(.btn-item:hover) {
    background-color: #2f077c;
    color: #f9f32e;
  }
  :global(.btn-item-disabled) {
    background-color: #848899;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-width: 5px;
    border-style: thin;
    border-radius: 5px;
    border-color: #042ee1;
    font-weight: 400;
    cursor: pointer;
    height: 30px;
    width: 150px;
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
  :global(.table-th) {
    background: #f2f3ff !important;
    color: #000000 !important;
    font-weight: 500 !important;
    fontSize: 14px !important;
    width: 180px !important;
    maxWidth: 350px !important;
    padding: 10px !important;
    padding-left: 15px !important;
  }
  :global(.table-th-first) {
    background: #f2f3ff !important;
    color: #000000 !important;
    font-weight: 500 !important;
    fontSize: 14px !important;
    width: 50px !important;
    maxWidth: 350px !important;
    padding: 10px !important;
    padding-left: 15px !important;
  }
  :global(.table-td-50) {
    width: 50px !important;
  }
  :global(.table-th-50) {
    width: 50px !important;
  }
  :global(.table-wrap td) {
    vertical-align: middle !important;
  }
  :global(.table thead th) {
    vertical-align: bottom;
    border-bottom: 2px solid #e4eaec !important;
  }
  :global(.btn-text) {
    color: #3e8ef7 !important;
    text-decoration: underline;
    cursor: pointer;
  }
  :global(.btn-text-disabled) {
    color: #919eab !important;
    text-decoration: underline;
    pointer-events: none;
  }
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  state = {
    ...this.props,
    styles: {
      enabledText: { color: 'white', textAlign: 'center', fontSize: '16' },
      enabledButton: {
        backgroundColor: '#BD2228', borderColor: '#BD2228', borderRadius: '5px', borderWidth: '1px', marginTop: '56px',
        width: '160px', height: '41px', justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        height: '40px',
      },
    },
    pageSize: 5,
    job: {},
  };

  constructor(props) {
    super(props);
    this.state.setFormPosition = "none";
  }

  static getInitialProps = async (args) => {
    let { query: { q, page,}, asPath, req, initialState: {} } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };
    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
    };
  }

  addRemoveJOb = async (index) => {
    this.state.job = this.state.job || {};
    this.state.job.items = this.state.job.items || [];

    let remove = false;
    if ((index !== null && index !== undefined) && index >= this.state.job.items.length) {
      this.state.job.items.push({});
    } else if ((index !== null && index !== undefined) && index >= 0) {
      remove = true;
      console.info('remove')
      this.state.job.items.splice(index, 1);
    }
    this.state.pageSize = this.state.pageSize || 10;
    let totalPages = Math.floor(((this.state.job.items.length || 0) + (this.state.pageSize - 1)) / this.state.pageSize);
    window.job = this.state.job;
    window.totalPages = totalPages;
    console.info('index >= 0', index, index >= 0)
    window._this = this;
    this.setState({
      job: {...this.state.job},
      totalRecords: this.state.job.items.length,
      totalPages: totalPages,
      pageIndex: remove === true ? (this.state.pageIndex || 1) : totalPages, // got last
      pageSize: this.state.pageSize || 10,
      keyRefresh: Date.now(),
    }, () => {
      if (this.state.pageIndex > totalPages) {
        this.setState({pageIndex: totalPages})
      }
    })
  }

  reloadReport = async (jobNo) => {
    this.state.job.items = [];
    await this.setState({action: "RELOAD", job: {}})
    this.setState({isLoading: true});
    let rp = await getP2Jobs({jobNo: jobNo, hasSubmitReport: true, p2Worker: this.state.selected?.worker?.email});
    this.setState({isLoading: false});
    if (!rp?.response?.name) {
      Swal.fire(
        'Error!',
        rp?.message || 'Not found!',
        'error',
      );
      return;
    }
    console.info('reload0', rp?.response)
    this.state.job = rp?.response || {};
    this.state.job.items = this.state.job.items || [];
    this.state.jobName = this.state.job.name;
    this.state.jobBy = this.state.job.jobBy || this.state.selected?.worker?.email;
    this.setState({isLoading: false});
    console.info('reload', !this.state.job.items?.length ? 0 : null)
    await this.addRemoveJOb(!this.state.job.items?.length ? 0 : null)

    for (let i = 0; i < this.state.job.items?.length; i++) {
      this.state.job.items[i]._ref.setCheckCoupleTimeout();
      await new Promise((rs, rj) => {
        setTimeout(async () => {
          console.info("rs sleep 2ms " + i)
          rs();
        }, 200)
      })
    }
  }

  async getP2Worker() {

    let rp = await getUserOfSubGroups({options: {subGroupId: this.state.selected.p2Group.id}});
    rp = rp || {};
    rp.response = rp.response || {};

    let workers = (rp.response.results || []).filter(us => us.roles?.indexOf('P2_WORKER') > -1)

    // get worker in company
    console.info('this.state.selected', this.state.selected, this.state.userInfo)
    if (!this.state.selected.isPAStaff && !!this.state.selected.isManager) {

      let manager = (rp.response.results || []).filter(it => it.email === this.state.userInfo?.email)[0];
      let managerCompany = manager?.companies || [];
      // filter matchCompany
      workers = workers.filter(it => {
        let memberCpn = it.companies || [];
        if (managerCompany?.length === 0 && memberCpn?.length === 0) {
          return true;
        }
        if (memberCpn?.length > 0 && memberCpn.indexOf('ALL') > -1) {
          return true;
        }
        if (managerCompany?.length > 0 && managerCompany.indexOf('ALL') > -1) {
          return true;
        }
        return !!memberCpn.filter(cpn => managerCompany.indexOf(cpn) > -1)[0];
      });
    }

    await this.setState({
      keyRefreshWorkers: Date.now(),
      selected: {
        ...this.state.selected,
        workers: workers,
      },
    });
  }

  async componentDidMount() {

    const params = {};

    let isPAStaff = !!this.state.userInfo?.authorities?.filter(r => r.authority === 'STAFF')[0];
    const inSubGroups = await getMyGroupUsers({options: {email: this.state.userInfo?.email, groupType: 'P2_GROUP'}});
    let p2SubGroups =(inSubGroups?.response?.results || []).filter(sg => sg.groupType === 'P2_GROUP');
    let isManager = !!p2SubGroups.filter(gr => {
      return gr.roles.indexOf('P2_MANAGER') > -1
    })[0];
    let isWorker = !!p2SubGroups.filter(gr => {
      return gr.roles.indexOf('P2_WORKER') > -1
    })[0];

    let workers = [];
    if (!isManager && !isPAStaff && !!isWorker) {
      workers = [{...this.state.userInfo}]
    }

    await this.setState({
      keyRefreshWorkers: Date.now(),
      selected: {
        ...this.state.selected,
        p2SubGroups,
        isManager,
        isWorker,
        isPAStaff,
        workers,
        worker: workers[0],
        manager: null,
      }
    });

    window.authorities = this.state.userInfo?.authorities;

    console.info('componentDidMount state.selected', this.state.selected)

    if (this.state.selected?.worker?.email) {
      let allP2Jobs = await getP2Jobs({jobNo: "all", msn: this.state.searchMSNALL, p2Worker: this.state.selected?.worker.email, contractOrder: this.state.searchContractOrder, hasSubmitReport: true});
      this.setState({ mapKey: Date.now(), allP2Jobs: allP2Jobs?.response || [] })
    }

    const queryString = this.props.asPath || "";
    const match = queryString.match(/jobNo=(\d+)/);
    const jobNo = match ? match[1] : null;
    if (!!jobNo) {
      // this.reloadReport(jobNo)
    }
  }

  render() {
    return (
      <TotPage title={'P2 Provisioning Job Sheet Report'}>
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
                position: 'relative',
              }}
            >
              <div style={{
                padding: '15px',
                borderBottom: '1px solid #ddd',
                paddingTop: '20px',
                paddingBottom: '20px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  pointerEvents: !!this.state.openSubmitReport ? 'none' : null,
                }}>
                  <span style={{fontWeight: 400, fontSize: '18px', color: '#000000',}} className="site-title">{'P2 Provision'} <i className="fa fa-caret-right ml-5 mr-5"/> {'P2 Provisioning Job Sheet Report'}</span>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px'}}>
                    <div>
                      <table>
                        {(!!this.state.selected?.isManager || !!this.state.selected?.isPAStaff) && (
                        <tr>
                          <td>
                            <span>P2 Group: </span>
                          </td>
                          <td>
                            <SelectCustom
                              field={{
                                  name: "job-select"
                              }}
                              key={this.state.keyRefreshWorkers || Date.now()}
                              name="job-select"
                              options={[
                                ...(
                                    this.state.selected?.p2SubGroups || [

                                    ]
                                ).map(item => ({
                                    label: item.name,
                                    value: item.name,
                                }))
                              ]}
                              value={this.state.selected?.p2Group?.name}
                              onChange={async (field, value) => {

                                let p2Group = (this.state.selected?.p2SubGroups || []).filter(ug => ug.name === value.value)[0];
                                await this.setState({
                                  selected: {
                                    ...this.state.selected,
                                    p2Group: p2Group,
                                    isManager: p2Group.roles?.indexOf('P2_MANAGER') > -1 || p2Group.permissions?.indexOf('P_P2_MANAGER') > -1,
                                    isWorker: p2Group.roles?.indexOf('P2_WORKER') > -1 || p2Group.permissions?.indexOf('P_P2_WORKER') > -1,
                                  }
                                })

                                console.info('change is isWorker', this.state.selected.isWorker, p2Group)
                                if (this.state.selected.isPAStaff || this.state.selected.isManager) {
                                  await this.getP2Worker();
                                }
                                console.info('p2 state selected', this.state.selected)
                              }}
                              groupstyle={{ marginLeft: '15px', marginBottom: '0px', width: '300px', marginBottom: '10px'}}
                            />
                          </td>
                        </tr>
                        )}

                        {(this.state.selected?.isManager || this.state.selected?.isPAStaff) && (
                        <tr>
                          <td>
                            <span>P2 worker: </span>
                          </td>
                          <td>
                            <SelectCustom
                              field={{
                                  name: "job-select"
                              }}
                              key={this.state.keyRefreshWorkers || Date.now()}
                              name="job-select"
                              options={[
                                ...(
                                    this.state.selected?.workers || [

                                    ]
                                ).map(item => ({
                                    label: item.email,
                                    value: item.email,
                                }))
                              ]}
                              value={this.state.selected?.worker?.email}
                              onChange={async (field, value) => {
                                let p2Worker = (this.state.selected?.workers || []).filter(ug => ug.email === value.value)[0];
                                await this.setState({
                                  selected: {
                                    ...this.state.selected,
                                    worker: p2Worker,
                                    manager: this.state.userInfo?.email !== p2Worker.email ? this.state.userInfo?.email : null,
                                  }
                                })
                                let allP2Jobs = await getP2Jobs({jobNo: "all", msn: this.state.searchMSNALL, p2Worker: this.state.selected?.worker?.email, hasSubmitReport: true});
                                await this.setState({ allP2Jobs: allP2Jobs?.response || [] });
                                if ((this.state.searchMSNALL || '').trim().length) {
                                  await this.setState({searchTBMSN: this.state.searchMSNALL.trim()});
                                  this.searchTBMSN();
                                }
                              }}
                              groupstyle={{ marginLeft: '15px', marginBottom: '0px', width: '300px', marginBottom: '10px'}}
                            />
                          </td>
                        </tr>
                        )}
                        <tr>
                          <td>
                            <span>Submit report by:</span>
                          </td>
                          <td>
                            <input
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                height: '40px',
                                width: '300px',
                                paddingLeft: '10px',
                                marginLeft: '15px',
                              }}
                              value={this.state.job?.managerSubmit || this.state.job?.userSubmit || ""}
                              disabled={true}
                              placeholder={'Submit report by'}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{paddingTop: '10px'}}>
                            <span>Submit report time:</span>
                          </td>
                          <td style={{paddingTop: '10px'}}>
                            <input
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                height: '40px',
                                width: '300px',
                                paddingLeft: '10px',
                                marginLeft: '15px',
                              }}
                              value={this.state.job?.timeSubmit ? moment(new Date(this.state.job?.timeSubmit)).format("YYYY-MM-DD HH:mm:ss") : ""}
                              disabled={true}
                              placeholder={'Submit report time'}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{paddingTop: '10px'}}>
                            <span>Submit report comment:</span>
                          </td>
                          <td style={{paddingTop: '10px'}}>
                            <textarea
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                maxHeight: '100px',
                                width: '600px',
                                paddingLeft: '10px',
                                marginLeft: '15px',
                                overflow: 'auto'
                              }}
                              value={this.state.job?.commentSubmit}
                              disabled={true}
                              placeholder={'Submit report comment'}
                              rows={4}
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div>
                      <table>
                        <tr>
                          <td>
                            <span>Job sheet no:</span>
                          </td>
                          <td>
                            {/*<input
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                height: '40px',
                                width: '300px',
                                paddingLeft: '10px',
                                marginLeft: '15px',
                              }}
                              value={this.state.jobName || ""}
                              onChange={(event) => {
                                this.setState({ jobName: event.target.value });
                              }}
                              placeholder={'Job sheet no'}
                            />*/}
                            <SelectCustom
                              field={{
                                  name: "job-select"
                              }}
                              name="job-select"
                              key={this.state.refreshListJob}
                              options={[
                                  ...(
                                      this.state.allP2Jobs || [

                                      ]
                                  ).map(item => ({
                                      label: item.name,
                                      value: item.name
                                  }))
                              ]}
                              value={this.state.jobName}
                              onChange={(field, value) => {
                                  this.setState({ jobName: value.value }, () => {
                                    this.reloadReport(this.state.jobName);
                                  });
                              }}
                              groupstyle={{ marginLeft: '15px', marginBottom: '0px', }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{paddingTop: '10px'}}>
                            <span>Contract Order:</span>
                          </td>
                          <td style={{paddingTop: '10px'}}>
                            <input
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                height: '40px',
                                width: '300px',
                                paddingLeft: '10px',
                                marginLeft: '15px',
                              }}
                              key={this.state.refreshListJob}
                              value={this.state.job?.contractOrder}
                              disabled={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{paddingTop: '10px'}}>
                            <span>Job time:</span>
                          </td>
                          <td style={{paddingTop: '10px'}}>
                            <input
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                height: '40px',
                                width: '300px',
                                paddingLeft: '10px',
                                marginLeft: '15px',
                              }}
                              key={this.state.refreshListJob}
                              value={this.state.job?.title}
                              disabled={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{paddingTop: '10px'}}>
                            <span>Job By:</span>
                          </td>
                          <td style={{paddingTop: '10px'}}>
                            <input
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                height: '40px',
                                width: '300px',
                                paddingLeft: '10px',
                                marginLeft: '15px',
                              }}
                              key={this.state.refreshListJob}
                              value={this.state.jobBy || this.state.selected?.worker?.email}
                              onChange={(event) => {
                                this.setState({ jobBy: event.target.value });
                              }}
                              placeholder={'Job sheet no'}
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="table-wrap">
                  <table className="table" style={{marginTop: '15px', pointerEvents: !!this.state.openSubmitReport ? 'none' : null,}}>
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th-first">Seq</th>
                      <th className="table-th">Meter SN</th>
                      <th className="table-th">MCU SN</th>
                      <th className="table-th">RESULT</th>
                      <th className="table-th">DETAIL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.job.items || [])
                      .map((it, idx) => {
                        let activeIndexFrom = ((this.state.pageIndex || 0) - 1) * (this.state.pageSize || 10);
                        let activeIndexTo = activeIndexFrom + (this.state.pageSize || 10) - 1;
                        let idxAll = idx;
                        return (
                          <ItemCheck
                            {...this.props}
                            isManager={this.state.selected?.isManager}
                            isWorker={this.state.selected?.isWorker}
                            isPAStaff={this.state.selected?.isPAStaff}
                            hide={!(idx >= activeIndexFrom && idx <= activeIndexTo)}
                            seq={idxAll + 1}
                            ref={ref => it._ref = ref}
                            data={it}
                            job={this.state.job}
                            size={this.state.job.items.length}
                            key={(this.state.keyRefresh || '') + '_' + idxAll}
                            currentLoggedIn={this.state.userInfo?.email}
                            currentWorker={this.state.selected?.worker?.email}
                            setStateParent={(st) => {
                              console.info('setStateParent', st)
                              this.setState({...st});
                              if (!this.state.job.title && !!st.timeSubmit) {
                                this.state.job.title = moment(new Date(st.timeSubmit)).format('YYYY-MM-DD HH:mm:ss')
                              }
                            }}
                            onParentNextAction={async (event) => {
                              if (event.type === "keypress" && event.key === "Enter") {
                                if (!this.state.job.items[idxAll + 1]) {
                                  await this.addRemoveJOb(this.state.job.items.length);
                                }
                                if (this.state.job.items[idxAll + 1]._ref) {
                                  this.state.job.items[idxAll + 1]._ref.focus();
                                }
                              }
                            }}
                            removeItem={() => {
                              this.addRemoveJOb(idx);
                            }}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
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
                    {this.state.totalRecords > 1 && this.state.totalPages >= 2 &&
                    <Pagination
                      href={this.props.asPath.replace(/\?.*/g, '')}
                      totalRecords={this.state.totalRecords}
                      totalPages={this.state.totalPages}
                      onPageChanged={(query) => {
                        this.setState({pageIndex: query.pageIndex});
                      }}
                      pageIndex={this.state.pageIndex}
                      pageSize={this.state.pageSize}
                      styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                    />
                    }
                  </div>
                </div>
              </div>

              {/*bottom button*/}
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '15px', justifyContent: 'center', pointerEvents: !!this.state.openSubmitReport ? 'none' : null }}>
                {!this.state.selected?.isPAStaff && (
                <>
                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                  <div
                    data-tip="Click to submit report"
                    className="button-btn w-160 ml-10"
                    onClick={() => {
                      if (!this.state.jobName) {
                        Swal.fire(
                          'Error!',
                          'Please input Job sheet no!',
                          'error',
                        );
                        return;
                      }
                      this.setState({openSubmitReport: true, submitTime: new Date()});
                    }}
                  >
                    <span>{'SUBMIT REPORT'}</span>
                  </div>
                </>
                )}
                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                <div
                  data-tip="Click to get existed job"
                  className="button-btn w-160 ml-10"
                  onClick={async () => {
                    if (!this.state.jobName) {
                      Swal.fire(
                        'Error!',
                        'Please input Job sheet no!',
                        'error',
                      );
                      return;
                    }
                    this.reloadReport(this.state.jobName);
                  }}
                >
                  <span>{'RELOAD'}</span>
                </div>
                {!this.state.selected?.isPAStaff && (
                <>
                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                  <div
                    data-tip="Click to delete job"
                    className="button-btn w-160 ml-10"
                    onClick={() => {
                      if (!!this.state.jobName) {
                        this.setState({openEnterPassword: true})
                      } else {
                        Swal.fire(
                          'Error!',
                          'Please input Job sheet no!',
                          'error',
                        );
                        return;
                      }
                    }}
                  >
                    <span>{'DELETE'}</span>
                  </div>
                </>
                )}
                </div>

              {!!this.state.openSubmitReport && (
                <div
                  style={{
                    backgroundColor: '#fff',
                    position: 'fixed',
                    top: '30%',
                    left: '35%',
                    zIndex: 10,
                    width: '30%',
                    height: '36%',
                    borderRadius: '5px',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                    color: '#000000',
                    justifyContent: 'space-between',
                    minHeight: '320px',
                    minWidth: '333px'
                  }}
                >
                  <span style={{ fontWeight: 500, fontSize: '18px' }}>
                    {'Submit report'}
                  </span>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                      <div style={{width: '135px'}}>{'Submit by:'}</div>
                      <input
                        style={{
                          border: '1px solid #00000020',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '300px',
                          paddingLeft: '10px',
                          flex: 1
                        }}
                        value={this.state.submitBy || this.state.selected?.worker?.email || ""}
                        onChange={(event) => {
                          this.setState({ submitBy: event.target.value });
                        }}
                        placeholder={'Submit by'}
                      />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                      <div style={{width: '135px'}}>{'Submit Timestamp:'}</div>
                      <input
                        style={{
                          border: '1px solid #00000020',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '300px',
                          paddingLeft: '10px',
                          flex: 1
                        }}
                        value={moment(this.state.submitTime).format('YYYY-MM-DD HH:mm:ss')}
                        disabled={true}
                      />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                      <div style={{width: '135px'}}>{'Submit comment:'}</div>
                      <input
                        style={{
                          border: '1px solid #00000020',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '300px',
                          paddingLeft: '10px',
                          flex: 1
                        }}
                        value={this.state.submitComment || ""}
                        onChange={(event) => {
                          this.setState({ submitComment: event.target.value });
                        }}
                        placeholder={'Submit comment'}
                      />
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <button
                      className="button-btn w-80"
                      style={{
                        alignSelf: 'center',
                        border: 'unset',
                        outline: 'unset',
                        marginRight: '10px'
                      }}
                      onClick={async () => {
                        let bulkSubmit = [];
                        for (let i = 0; i < this.state.job.items?.length; i++) {
                          let it = this.state.job.items[i];
                          let obj = it._ref.collectDataSubmit();
                          obj.timeSubmit = new Date(this.state.submitTime || new Date()).getTime();
                          obj.commentSubmit = this.state.submitComment;
                          obj.jobSheetNo = this.state.jobName;
                          obj.jobBy = this.state.submitBy || this.state.selected?.worker?.email || "";
                          obj.status = obj.status || null;
                          obj.managerSubmit = this.state.manager;
                          obj.userSubmit = this.state.selected?.worker?.email;

                          bulkSubmit.push(obj);
                        }
                        console.info("bulkSubmit", bulkSubmit)
                        const result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Submit only with device that exists when sending "OnBoarding Check", continue?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });
                        if (!result || !result.isConfirmed) {
                          return;
                        }
                        // bulkSubmit = bulkSubmit.filter(it => it.runOnBoardingCheck === true);

                        let res = await saveBulkMeterCommissionSubmit(bulkSubmit)
                        if (res && res.success) {
                          Swal.fire(
                            'Information!',
                            'Report has been save successfully!',
                            'success',
                          );
                          this.reloadReport(this.state.jobName);
                        } else {
                          Swal.fire(
                            'Error!',
                            res?.message || res?.errorDescription || 'System error!',
                            'error',
                          );
                        }
                        await this.setState({
                          isLoading: false,
                          check: null,
                          openSubmitReport: false,
                          submitTime: null,
                          submitComment: null,
                          submitBy: null
                        });
                      }}
                    >
                      {'Submit'}
                    </button>
                    <button
                      className="button-btn w-80"
                      style={{
                        alignSelf: 'center',
                        border: 'unset',
                        outline: 'unset',
                      }}
                      onClick={() => {
                        this.setState({
                          openSubmitReport: false,
                          submitTime: null,
                          submitComment: null,
                          submitBy: null
                        });
                      }}
                    >
                      {'Close'}
                    </button>
                  </div>
                </div>
              )}
              {!!this.state.openEnterPassword && (
                <div
                  style={{
                    backgroundColor: '#fff',
                    position: 'fixed',
                    top: '30%',
                    left: '35%',
                    zIndex: 10,
                    width: '30%',
                    height: '36%',
                    borderRadius: '5px',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                    color: '#000000',
                    justifyContent: 'space-between',
                    minHeight: '320px',
                    minWidth: '333px'
                  }}
                >
                  <span style={{ fontWeight: 500, fontSize: '18px' }}>
                    {'Enter login password to confirm delete'}
                  </span>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                      <div style={{width: '135px'}}>{'Password:'}</div>
                      <input
                        style={{
                          border: '1px solid #00000020',
                          borderRadius: '5px',
                          outline: 'unset',
                          height: '40px',
                          width: '300px',
                          paddingLeft: '10px',
                          flex: 1
                        }}
                        type="password"
                        value={this.state.password || ""}
                        onChange={(event) => {
                          this.setState({ password: event.target.value });
                        }}
                        placeholder={'Password'}
                      />
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <button
                      className="button-btn w-80"
                      style={{
                        alignSelf: 'center',
                        border: 'unset',
                        outline: 'unset',
                        marginRight: '10px'
                      }}
                      onClick={async () => {
                        if (!this.state.password) {
                          Swal.fire(
                            'Error!',
                            'Please enter login password to confirm delete',
                            'error',
                          );
                          return;
                        }
                        const res = await validateLoginPwd({ password: this.state.password });

                        if (res && res.success === true) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this report?</p>`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No'
                          }).then(async (result) => {
                            if (result.value) {
                              let param = {
                                jobNo: this.state.jobName
                              }
                              let response = await deleteP2Report(param)
                              if (response.success == true) {
                                Swal.fire(
                                  'Deleted!',
                                  'Your report has been deleted.',
                                  'success'
                                )
                                  .then(async () => {
                                    window.location.reload();
                                  })
                              } else {
                                Swal.fire(
                                  'Error!',
                                  response.message || response.errorDescription || '',
                                  'error'
                                )
                              }
                            } else {
                              await this.setState({
                                isLoading: false,
                                openEnterPassword: false,
                                password: null,
                              });
                            }
                          })
                        } else {
                          Swal.fire(
                            'Error!',
                            'Wrong password',
                            'error',
                          );
                          return;
                        }
                      }}
                    >
                      {'Delete'}
                    </button>
                    <button
                      className="button-btn w-80"
                      style={{
                        alignSelf: 'center',
                        border: 'unset',
                        outline: 'unset',
                      }}
                      onClick={() => {
                        this.setState({
                          openEnterPassword: false,
                        });
                      }}
                    >
                      {'Cancel'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </PageContent>

          {!!this.state.isLoading && (
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
          )}
        </div>
      </TotPage>
    );
  }
}

class ItemCheck extends React.Component {

  state = {
    ...this.props,
    ...(this.props.data.tempDataChecks || {}),
    check: this.props.data.tempDataChecks?.isPassed === true ? 'pass' : this.props.data.tempDataChecks?.isPassed === false ? 'fail' : null,
    sn: this.props.data.sn || '',
    msn: this.props.data.msn || '',
    styles: {
      enabledText: { color: 'white', textAlign: 'center', fontSize: '16' },
      enabledButton: {
        backgroundColor: '#BD2228', borderColor: '#BD2228', borderRadius: '5px', borderWidth: '1px', marginTop: '56px',
        width: '160px', height: '41px', justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        height: '40px',
      },
    },
    device: {...this.props.data.tempDataChecks},
    meterData: !!this.props.data.tempDataChecks?.pf ? [this.props.data.tempDataChecks] : [],
    piFileUpLoads: this.props.data?.tempDataChecks?.piFileUpLoads || [],
    isCoupled: this.props.data?.tempDataChecks?.isCoupled === undefined ? null : this.props.data?.tempDataChecks?.isCoupled,
  };

  constructor(props) {
    super(props);
    this.state.setFormPosition = "none";
  }

  componentDidMount() {
    this.setState({ mapKey: Date.now() })
  }

  componentWillUnmount() {
    clearTimeout(this.checkCoupleTimeout);
  }

  setCheckCoupleTimeout() {
    clearTimeout(this.checkCoupleTimeout);
    if (!this.state.sn || !this.state.msn) {
      this.setState({isCoupled: null})
      return;
    }
    this.checkCoupleTimeout = setTimeout(async () => {
      if (!!this.state.sn && !!this.state.msn) {
        let deviceDetail = await getAllDevices({
          options: {
            querySn: this.state.sn,
            queryAllDate: "true"
          },
        });

        let device = deviceDetail?.response?.results?.length ? deviceDetail.response.results[0] : {};
        console.info('check couple for sn: ' + this.state.sn, device.sn)
        if (!!device.id && this.state.msn === device.msn && this.state.sn === device.sn) {
          this.setState({isCoupled: true})
        } else if (!!device.id && this.state.sn === device.sn && this.state.msn !== device.msn) {
          this.setState({isCoupled: false})
        } else {
          this.setState({isCoupled: null})
        }
      }
    }, 500);
  }

  onboardingCheck = async () => {
    if (this.state.action == 'onboardingCheck') {
      this.props.setStateParent && this.props.setStateParent({isLoading: false, timeSubmit: Date.now()})
    }
    await this.setState({
      isLoading: true,
      device: this.state.action == 'onboardingCheck' ? null : this.state.device,
      check: this.state.action == 'onboardingCheck' ? null : this.state.check,
      piFileUpLoads: [],
      showLastSubmit: null,
      errorMessage: this.state.action == 'onboardingCheck' ? null : this.state.errorMessage,
      runOnBoardingCheck: this.state.action == 'onboardingCheck' || !!this.state.runOnBoardingCheck
    });
    this.state.msn = (this.state.msn || '').trim();
    this.state.sn = (this.state.sn || '').trim();
    if (!this.state.msn && !this.state.sn) {
      this.state.action != 'onboardingCheck' &&
      Swal.fire(
        'Error!',
        'Please input MCU SN or Meter SN',
        'error',
      );
      await this.setState({ isLoading: false, errorMessage: 'Please input MCU SN or Meter SN' });
      return;
    }
    this.props.setStateParent && this.props.setStateParent({isLoading: true})
    let deviceDetail = await getAllDevices({
      options: {
        querySn: this.state.sn,
        queryMsn: !this.state.sn ? this.state.msn: '',
        queryAllDate: "true"
      },
    });
    let device = deviceDetail?.response?.results?.length ? deviceDetail.response.results[0] : {};

    // https://powerautomationsg.atlassian.net/browse/MMS-143
    if (!!device.id && (!!this.state.msn && this.state.msn != device.msn)) {
      this.state.action != 'onboardingCheck' &&
      Swal.fire(
        'Error!',
        'the MCU and Meter ID searched are not coupled with each other, pls help to double check',
        'error',
      );
      await this.setState({ isLoading: false, check: null, errorMessage: 'the MCU and Meter ID searched are not coupled with each other, pls help to double check' });
      this.props.setStateParent && this.props.setStateParent({isLoading: false})
      return;
    }

    if (device.id) {
      if (!device.msn) {
        this.state.action != 'onboardingCheck' &&
        Swal.fire(
          'Error!',
          'Please link MSN for this device and try again !',
          'error',
        );
        await this.setState({ isLoading: false, errorMessage: 'Please link MSN for this device and try again !' });
        this.props.setStateParent && this.props.setStateParent({isLoading: false})
        return;
      }
      await this.getMeterDataLogs(device.uid);
      if (this.state.action == 'onboardingCheck') {
        await this.setState({check: (!!this.state.meterData?.length && device.status === 'ONLINE') ? 'pass' : 'fail'})
      }
      await this.getFiles({ uid: device.uid, type: 'MMS_P2_TEST' });
      await this.setState({ device: device });
    } else {
      this.state.action != 'onboardingCheck' &&
      Swal.fire(
        'Error!',
        'Device doesn\'t exists!',
        'error',
      );
      await this.setState({ isLoading: false, errorMessage: 'Device doesn\'t exists!' });
      this.props.setStateParent && this.props.setStateParent({isLoading: false})
      return;
    }
  }

  onStatusCheck = async () => {
    await this.onboardingCheck();
    if (this.state.device?.id) {
      await this.setState({isLoading: true});
      this.props.setStateParent && this.props.setStateParent({isLoading: true})
      let res = await getLastSubmit({uid: this.state.device.uid || '', msn: this.state.device.msn || ''});
      if (res && res.success) {
        let uris = (res.response?.meterPhotos?.split(",") || []).filter(p => !!p);
        let piFileUpLoads = uris.map((uri, idx) => {
          return {
            uri: uri.startsWith('http') ? uri : window.location.origin + uri,
            title: uri.startsWith('http') ? uri : window.location.origin + uri,
            text: (idx + 1) + '/' + uris.length
          }
        })
        await this.setState({showLastSubmit: {data: res.response}, piFileUpLoads, piFileUpLoadCurrentIndex: 0, show: true});

      } else {
        await this.setState({showLastSubmit: {data: {...this.state.device, timeSubmit: null, piFileUpLoads: []}}, show: true});
      }
      await this.setState({loading: false});
      this.props.setStateParent && this.props.setStateParent({isLoading: false})
    }
  }

  coupleDevice = async () => {
    await this.setState({ isLoading: true, showLastSubmit: null});
    this.state.msn = (this.state.msn || '').trim();
    this.state.sn = (this.state.sn || '').trim();
    if (!this.state.sn || !this.state.msn) {
      Swal.fire(
        'Error!',
        (!this.state.msn ? 'Meter SN ' : 'MCU SN ') + 'is required!',
        'error',
      );
      this.setState({isLoading: false})
      return
    }

    this.props.setStateParent && this.props.setStateParent({isLoading: true})
    let deviceDetail = await getAllDevices({
      options: {
        querySn: (this.state.sn || '').trim(),
        queryAllDate: "true"
      },
      offset: 0,
      limit: 1,
    });
    let device = deviceDetail?.response?.results?.length ? deviceDetail.response.results[0] : {};

    if (!!device.id && !device.msn) {
      const params = {
        msn: this.state.msn,
        sn: device.sn,
        groupId: device?.group?.id || 1,
      }
      let rp = await linkMsn(params);
      await this.setState({ isLoading: false });
      if (rp.success) {
        Swal.fire(
          'Information!',
          rp.success == true ? 'Link Msn Successfully!' : (rp.message || rp.errorDescription),
          'success',
        );
      } else {
        Swal.fire(
          'Error!',
          rp.message || rp.errorDescription,
          'error',
        );
      }
    } else {
      Swal.fire(
        'Error!',
        !!device.id ? 'the MCU and Meter ID searched are coupled with each other, pls help to double check' : 'Device doesn\'t exists!',
        'error',
      );
      await this.setState({ isLoading: false });
      this.props.setStateParent && this.props.setStateParent({isLoading: false})
      return;
    }
    await this.setState({ isLoading: false });
    this.props.setStateParent && this.props.setStateParent({isLoading: false})
  }

  deCoupleDevice = async () => {
    await this.setState({ isLoading: true, showLastSubmit: null});
    this.state.msn = (this.state.msn || '').trim();
    this.state.sn = (this.state.sn || '').trim();
    if (!this.state.sn || !this.state.msn) {
      Swal.fire(
        'Error!',
        (!this.state.msn ? 'Meter SN ' : 'MCU SN ') + 'is required!',
        'error',
      );
      this.setState({isLoading: false})
      return
    }

    this.props.setStateParent && this.props.setStateParent({isLoading: true})
    let deviceDetail = await getAllDevices({
      options: {
        querySn: (this.state.sn || '').trim(),
        queryAllDate: "true"
      },
      offset: 0,
      limit: 1,
    });
    let device = deviceDetail?.response?.results?.length ? deviceDetail.response.results[0] : {};

    if (!!device.id && device.msn === this.state.msn && device.sn === this.state.sn) {
      const updatedDevice = {
        msn: null,
        id: device.id,
        sn: device.sn,
        uid: device.uid
      }
      let rp = await editDevice(updatedDevice);
      if (rp.success) {
        Swal.fire(
          'Information!',
          rp.success == true ? 'Device de-couple successfully!' : (rp.message || rp.errorDescription),
          'success',
        );
      } else {
        Swal.fire(
          'Error!',
          rp.message || rp.errorDescription,
          'error',
        );
      }
    } else {
      Swal.fire(
        'Error!',
        !!device.id ? 'the MCU and Meter ID searched are not coupled with each other, pls help to double check' : 'Device doesn\'t exists!',
        'error',
      );
      await this.setState({ isLoading: false });
      this.props.setStateParent && this.props.setStateParent({isLoading: false})
      return;
    }
    await this.setState({ isLoading: false });
    this.props.setStateParent && this.props.setStateParent({isLoading: false})
  }

  getFiles = async (params) => {
    await this.setState({ isLoading: true })
    this.props.setStateParent && this.props.setStateParent({isLoading: true})
    let rp = await getFiles({ ...params });
    await this.setState({ isLoading: false });
    this.props.setStateParent && this.props.setStateParent({isLoading: false})
    let piFileUpLoads = (rp?.response || []).map((it, index) => {
      return {
        uri: window.location.origin + '/api/file/' + it.uid + '/' + it.id,
        title: it.altName,
        text: ('Uploaded By: ' + (it.uploadedBy || 'System')) + ' (' + moment(it.createdDate).format("YYYY-MM-DD HH:mm:ss") + ') ' + '(' + (index + 1) + '/' + ((rp?.response || []).length) + ')'
      }
    });
    this.setState({ piFileUpLoads: piFileUpLoads || [], showPhotoP1Test: true, piFileUpLoadCurrentIndex: 0 });
  }

  getMeterDataLogs = async (uid) => {
    uid = (uid || this.state.device?.uid).trim();
    this.setState({ isLoading: true })
    let rp = await getRelatedLogs(
      {
        options: {
          uid: uid/*'BIE2IEYAAMAEYABJAA'*/,
          msn: this.state.device?.msn,
          ptype: "MDT",
          type: "SUBSCRIBE",
        },
        offset: 0,
        limit: 1,
      }
    );
    let data = [];
    for (let i = 0; i < rp?.response?.results.length; i++) {
      if (rp?.response?.results[i].ptype === 'MDT') {
        const raw = JSON.parse(rp?.response?.results[i].raw);
        (raw?.payload?.data || []).forEach(r => {
          data.push(r);
        });
      }
    }
    await this.setState({
      meterData: data,
      isLoading: false,
    })
  }

  focus = async () => {
    this.firstInput && this.firstInput.focus();
  }

  collectDataSubmit = () => {
    return {
      uid: this.state.device?.uid || '',
      sn: this.state.device?.sn || '',
      cid: this.state.device?.cid || '',
      msn: this.state.device?.msn || '',
      isPassed: this.state?.check === 'pass' ? true : this.state?.check === 'fail' ? false : null,
      kwh: !!this.state.meterData?.length ? this.state.meterData[0].kwh : '',
      kw: !!this.state.meterData?.length ? this.state.meterData[0].kw : '',
      i: !!this.state.meterData?.length ? this.state.meterData[0].i : '',
      v: !!this.state.meterData?.length ? this.state.meterData[0].v : '',
      pf: !!this.state.meterData?.length ? this.state.meterData[0].pf : '',
      dt: !!this.state.meterData?.length ? new Date(this.state.meterData[0].dt).getTime() : null,
      meterPhotos: (this.state.piFileUpLoads || []).map(file => file.uri).join(","),
      status: this.state.device?.status || '',
      type: this.state.device?.type || null,
      lastOBRDate: this.state.device?.lastOBRDate,
      installer: this.state.device?.installer?.userId || null,
      coupledUser: this.state.device?.coupledUser,
      // installer: this.props.profile?.userId || this.props.profile?.id || null,
      userSubmit: this.props.userInfo?.email,
      timeSubmit: this.state.device?.timeSubmit || Date.now(),
      errorMessage: this.state.errorMessage,
      runOnBoardingCheck: this.state.runOnBoardingCheck,
      piFileUpLoads: this.state.piFileUpLoads || [],
      isCoupled: this.state.isCoupled,
    }
  }

  render() {
    let tempStyles = this.state.styles;
    if (this.state.device?.uid) {
      this.state.device.timeSubmit = this.state.device.timeSubmit || Date.now();
    }
    return (
      <tr style={{ flexDirection: 'row', width: '100%', padding: '15px', alignItems: 'center', borderBottom: '1px solid #eeeeee' }} className={this.props.hide === true ? 'force-hide' : ''}>
        <td>
          <span style={{marginRight: '15px', fontSize: '500', minWidth: '20px', maxWidth: '20px', paddingLeft: '15px'}}>{this.props.seq}</span>
        </td>
        <td>
          <span>{this.state.msn}</span>
        </td>
        <td>
          <span>{this.state.sn || ""}</span>
        </td>
        <td>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', minWidth: '170px'}}>
            {(!!this.state.runOnBoardingCheck) && (
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
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                  {(!!this.state.device?.uid && this.state.check === 'pass') && (
                    <div
                      disabled={false}
                      onClick={() => {
                        //this.setState({check: 'pass'});
                      }}
                      style={{
                        ...tempStyles.enabledButton,
                        backgroundColor: this.state.check === 'pass' ? '#68c9c3' : '#125e8c',
                        borderColor: this.state.check === 'pass' ? '#68c9c3' : '#125e8c',
                        width: '80px',
                        marginTop: '5px',
                        marginRight: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={tempStyles.enabledText}>{"PASS"}</div>
                    </div>
                  )}
                  {(!!this.state.device?.uid && this.state.check === 'fail') && (
                    <div
                      disabled={false}
                      onClick={() => {
                        //this.setState({check: 'fail'});
                      }}
                      style={{
                        ...tempStyles.enabledButton,
                        backgroundColor: this.state.check === 'fail' ? '#68c9c3' : '#8c1212',
                        borderColor: this.state.check === 'fail' ? '#68c9c3' : '#8c1212',
                        width: '80px',
                        marginTop: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={tempStyles.enabledText}>{"FAIL"}</div>
                    </div>
                  )}
                  {!this.state.device?.uid && !!this.state.errorMessage && (
                    <div
                      disabled={true}
                      style={{
                        ...tempStyles.enabledButton,
                        backgroundColor: '#898989',
                        borderColor: '#898989',
                        width: '80px',
                        marginTop: '5px',
                      }}
                    >
                      <div style={tempStyles.enabledText}>{"NONE"}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </td>
        <td>
          {!!this.state.runOnBoardingCheck && (
            <div
              className="btn-text ml-10"
              onClick={async () => {
                this.state.device = this.state.device || {};
                /*if (!this.state.device?.uid) {
                  Swal.fire(
                    'Error!',
                    this.state.errorMessage || '',
                    'error',
                  );
                  return;
                }*/
                this.setState({action: 'onboardingCheck', show: true, showPhotoP1Test: true, piFileUpLoadCurrentIndex: 0});
              }}
            >
              <span>{'DETAIL'}</span>
            </div>
          )}
        </td>

        {(/*!!this.state.device?.uid && */!!this.state.show) && (
          <div className="fix" style={{paddingTop: '0px', paddingBottom: '0px', overflow: 'hidden'}}>
            <div style={{display: 'flex', flexDirection: 'row', flex: 1, backgroundColor: '#ffffff', borderRadius: '5px', padding: '30px', position: 'relative', overflow: 'auto', height: 'calc(100% - 200px)'}}>
              <div
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  width: '30px',
                  height: '30px',
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  this.setState({show: false})
                }}
              >
                <i className="fa fa-close" style={{fontSize: '28px'}}/>
              </div>
              <div style={{flex: 1, height: 'fit-content'}}>
                {(/*this.state.device?.uid && */this.state.action === 'onboardingCheck') && (
                  <table className="table" style={{ border: '1px solid #e4eaec' }}>
                    <tbody>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'MCU Profile'}</td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`MCU SN:`}</div>
                          <div>{this.state.device.sn}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`MCU UUID:`}</div>
                          <div>{this.state.device.uid}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`ESIM ID:`}</div>
                          <div>{this.state.device.cid}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`STATUS:`}</div>
                          <div>{this.state.device.status}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`COUPLED STATE:`}</div>
                          <div>{this.state.device.type || 'N/A'}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`COUPLED USER:`}</div>
                          <div>{this.state.device.coupledUser}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'Meter SN'}</td>
                      <td style={{ padding: '15px', borderBottom: '1px solid #e4eaec', }}>
                        <div style={{ display: 'flex' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`Meter SN:`}</div>
                          <div>{this.state.device.msn}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`Onboarding Time:`}</div>
                          <div>{this.state.device.lastOBRDate > 0 ? moment(this.state.device.lastOBRDate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'Meter Data'}</td>
                      {!!this.state.meterData?.length && (
                        <td style={{ padding: '15px' }}>
                          <div>{`Kwh: ${this.state.meterData[0].kwh || ''}`}</div>
                          <div>{`Kw: ${this.state.meterData[0].kw || ''}`}</div>
                          <div>{`I: ${this.state.meterData[0].i || ''}`}</div>
                          <div>{`V: ${this.state.meterData[0].v || ''}`}</div>
                          <div>{`PF: ${this.state.meterData[0].pf || ''}`}</div>
                          <div>{`DTime: ${this.state.meterData[0].dt ? moment(this.state.meterData[0].dt).format("YYYY-MM-DD HH:mm:ss") : ""} (Meter Time)`}</div>
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'P2Submit user'}</td>
                      <td style={{ padding: '15px', borderTop: '1px solid #e4eaec', }}>
                        <div>{this.props.userInfo?.email || ''}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'P2Checking time:'}</td>
                      <td style={{ padding: '15px', borderTop: '1px solid #e4eaec', }}>
                        <div>{!!this.state.device?.timeSubmit ? moment(new Date(this.state.device?.timeSubmit)).format("YYYY-MM-DD HH:mm:ss") : ''}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px',
                        whiteSpace: 'nowrap',
                      }}>{'P2Checking Result:'}</td>
                      <td style={{ padding: '15px', borderTop: '1px solid #e4eaec', }}>
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
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                            {this.state.check === 'pass' && (
                              <div
                                disabled={false}
                                onClick={() => {
                                  //this.setState({check: 'pass'});
                                }}
                                style={{
                                  ...tempStyles.enabledButton,
                                  backgroundColor: this.state.check === 'pass' ? '#68c9c3' : '#125e8c',
                                  borderColor: this.state.check === 'pass' ? '#68c9c3' : '#125e8c',
                                  width: '80px',
                                  marginTop: '5px',
                                  marginRight: '10px',
                                  //cursor: 'pointer',
                                }}
                              >
                                <div style={tempStyles.enabledText}>{"PASS"}</div>
                              </div>
                            )}
                            {this.state.check === 'fail' && (
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div
                                  disabled={false}
                                  onClick={() => {
                                    //this.setState({check: 'fail'});
                                  }}
                                  style={{
                                    ...tempStyles.enabledButton,
                                    backgroundColor: this.state.check === 'fail' ? '#68c9c3' : '#8c1212',
                                    borderColor: this.state.check === 'fail' ? '#68c9c3' : '#8c1212',
                                    width: '80px',
                                    marginTop: '5px',
                                    //cursor: 'pointer',
                                  }}
                                >
                                  <div style={tempStyles.enabledText}>{"FAIL"}</div>
                                </div>
                                <span style={{marginTop: '15px', color: 'red',}}>{this.state.errorMessage}</span>
                              </div>
                            )}
                            {this.state.check === null && (
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div
                                  disabled={false}
                                  onClick={() => {
                                    //this.setState({check: 'fail'});
                                  }}
                                  style={{
                                    ...tempStyles.enabledButton,
                                    backgroundColor: '#898989',
                                    borderColor: '#898989',
                                    width: '80px',
                                    marginTop: '5px',
                                  }}
                                >
                                  <div style={tempStyles.enabledText}>{"NONE"}</div>
                                </div>
                                <span style={{marginTop: '15px', color: 'red',}}>{this.state.errorMessage}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                )}
                {((!!this.state.showLastSubmit?.data?.id) && this.state.action == 'onStatusCheck') && (
                  <table className="table" style={{ border: '1px solid #e4eaec' }}>
                    <tbody>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'MCU Profile'}</td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`MCU SN:`}</div>
                          <div>{this.state.showLastSubmit?.data?.sn}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`MCU UUID:`}</div>
                          <div>{this.state.showLastSubmit?.data?.uid}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`ESIM ID:`}</div>
                          <div>{this.state.showLastSubmit?.data?.cid}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`STATUS:`}</div>
                          <div>{this.state.showLastSubmit?.data?.status}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`COUPLED STATE:`}</div>
                          <div>{this.state.showLastSubmit?.data?.type || 'N/A'}</div>
                        </div>
                        <div style={{ display: 'flex', padding: '2px 0px' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`COUPLED USER:`}</div>
                          <div>{this.state.showLastSubmit?.data?.coupledUser}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'Meter SN'}</td>
                      <td style={{ padding: '15px', borderBottom: '1px solid #e4eaec', }}>
                        <div style={{ display: 'flex' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`Meter SN:`}</div>
                          <div>{this.state.showLastSubmit?.data?.msn}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <div style={{ fontWeight: '500', width: '140px', color: '#000' }}>{`Onboarding Time:`}</div>
                          <div>{this.state.showLastSubmit?.data?.lastOBRDate > 0 ? moment(this.state.showLastSubmit?.data?.lastOBRDate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'Meter Data'}</td>
                      <td style={{ padding: '15px' }}>
                        <div>{`Kwh: ${this.state.showLastSubmit?.data?.kwh || ''}`}</div>
                        <div>{`Kw: ${this.state.showLastSubmit?.data?.kw || ''}`}</div>
                        <div>{`I: ${this.state.showLastSubmit?.data?.i || ''}`}</div>
                        <div>{`V: ${this.state.showLastSubmit?.data?.v || ''}`}</div>
                        <div>{`PF: ${this.state.showLastSubmit?.data?.pf || ''}`}</div>
                        <div>{`DTime: ${this.state.showLastSubmit?.data?.dt ? (moment(this.state.showLastSubmit?.data?.dt).format("YYYY-MM-DD HH:mm:ss") + " (Meter Time)") : ""}`}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'P2Submit user'}</td>
                      <td style={{ padding: '15px', borderTop: '1px solid #e4eaec', }}>
                        <div>{this.state.showLastSubmit?.data?.userSubmit || ''}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px'
                      }}>{'P2Checking time:'}</td>
                      <td style={{ padding: '15px', borderTop: '1px solid #e4eaec', }}>
                        <div>{!!this.state.showLastSubmit?.data?.timeSubmit ? moment(new Date(this.state.showLastSubmit?.data?.timeSubmit)).format("YYYY-MM-DD HH:mm:ss") : ''}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        fontWeight: '500',
                        width: '140px',
                        color: '#000',
                        borderRight: '1px solid #e4eaec',
                        padding: '15px',
                        whiteSpace: 'nowrap',
                      }}>{'P2Checking Result:'}</td>
                      <td style={{ padding: '15px', borderTop: '1px solid #e4eaec', }}>
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
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                            {this.state.showLastSubmit?.data?.isPassed === true && (
                              <div
                                disabled={true}
                                style={{
                                  ...tempStyles.enabledButton,
                                  backgroundColor: this.state.check === 'pass' ? '#68c9c3' : '#125e8c',
                                  borderColor: this.state.check === 'pass' ? '#68c9c3' : '#125e8c',
                                  width: '80px',
                                  marginTop: '5px',
                                  marginRight: '10px',
                                }}
                              >
                                <div style={tempStyles.enabledText}>{"PASS"}</div>
                              </div>
                            )}
                            {this.state.showLastSubmit?.data?.isPassed === false && (
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div
                                  disabled={true}
                                  style={{
                                    ...tempStyles.enabledButton,
                                    backgroundColor: this.state.check === 'fail' ? '#68c9c3' : '#8c1212',
                                    borderColor: this.state.check === 'fail' ? '#68c9c3' : '#8c1212',
                                    width: '80px',
                                    marginTop: '5px',
                                  }}
                                >
                                  <div style={tempStyles.enabledText}>{"FAIL"}</div>
                                </div>
                                <span style={{marginTop: '15px', color: 'red',}}>{this.state.errorMessage}</span>
                              </div>
                            )}
                            {(this.state.showLastSubmit?.data?.isPassed === null || this.state.showLastSubmit?.data?.isPassed === undefined) && (
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div
                                  disabled={true}
                                  style={{
                                    ...tempStyles.enabledButton,
                                    backgroundColor: '#898989',
                                    borderColor: '#898989',
                                    width: '80px',
                                    marginTop: '5px',
                                  }}
                                >
                                  <div style={tempStyles.enabledText}>{"NONE"}</div>
                                </div>
                                <span style={{marginTop: '15px', color: 'red',}}>{this.state.errorMessage}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                )}
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1.5}}>
                {(
                  (!!this.state.showPhotoP1Test || !!this.state.showPhotoP2Test)
                  && (this.state.action == 'onboardingCheck' && !!this.state.piFileUpLoads?.length || this.state.action == 'onStatusCheck' && !!this.state.piFileUpLoads?.length && this.state.showLastSubmit?.data?.uid)
                )&& (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ fontWeight: '500', color: '#000', }}>{'Meter Photo'}</div>
                    <div style={{ position: 'relative', minHeight: '400px', backgroundColor: '#ffffff' }}>
                      <img
                        src={this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].uri}
                        key={this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].uri}
                        style={{
                          width: '500px',
                          maxWidth: '500px',
                          objectFit: 'cover',
                          minHeight: '500px',
                        }}
                      />
                      <div
                        style={{
                          width: '500px',
                          maxWidth: '500px',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '20px',
                        }}
                      >
                      <span style={{
                        fontSize: 15,
                        marginTop: 5,
                        fontWeight: '500',
                        marginBottom: '15px',
                      }}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].title || 'Title'}</span>
                        <span
                          style={{}}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].text || 'Text'}</span>
                      </div>
                      {this.state.piFileUpLoads?.length > 1 && (
                        <div
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
                            this.setState({ piFileUpLoadCurrentIndex })
                          }}
                        >
                          <i className="fa fa-arrow-left" style={{}}/>
                        </div>)}
                      {this.state.piFileUpLoads?.length > 1 && (
                        <div
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
                            this.setState({ piFileUpLoadCurrentIndex })
                          }}
                        >
                          <i className="fa fa-arrow-right" style={{}}/>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </tr>
    )
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