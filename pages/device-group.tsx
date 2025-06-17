import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination} from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import { ProgressLoading, Input } from '@app/components/Common';
import 'moment-timezone';
const Swal = require('sweetalert2');

import { addDeviceGroup, deleteDeviceGroup, getDeviceGroups, getDevicesInGroup, sendCommand } from '@app/api/log';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

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
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  static getInitialProps = async (args) => {
    const { query: { q, page }, asPath, req, initialState: {} } = args;

    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };

    let rp = await getDeviceGroups(params, req);
    rp = rp || {};
    rp.response = rp.response || {};
    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
      deviceGroups: rp.response.results || [],
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
  }

  sendCommand = async (uid, cmd, type) => {
    const response = await sendCommand({ uid, cmd, type });
    this.state.batchs = this.state.batchs || [];
    if (response.success) {
      const mid = response.response;
      let obj = {};
      obj[uid] = mid;
      this.state.batchs.push(obj);
    } else {
      let obj = {};
      obj[uid] = response.message || ' Has internal error';
      this.state.batchs.push(obj);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Device Group'}>
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
              {!!this.state.deviceGroupEdit ?
                <PEdit
                  data={this.state.deviceGroupEdit}
                  onClose={() => {
                    this.setState({ deviceGroupEdit: null });
                  }}
                  onSave={() => {
                    window.location.href = window.location.href;
                  }}
                />
                :null
              }
              {!this.state.deviceGroupEdit ?
                <>
                  <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                    <span>{'Device Management'} <i className="fa fa-caret-right ml-5 mr-5" /> {'Device Group'}</span>
                    <h5 className="site-title">{'Device Group'}</h5>
                  </div>
                  <div style={{ padding: '30px', borderBottom: '1px solid #ddd', paddingTop: '20px', paddingBottom: '20px' }}>
                    <div
                      className="w-200 button-btn"
                       onClick={() => this.setState({
                         deviceGroupEdit: {
                           name: null,
                           remark: null,
                         },
                       })}
                    >
                      <span>{'ADD NEW DEVICE GROUP'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }} className="doctor-list">
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                      <table className="table">
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th w-50" scope="col" />
                          <th className="table-th" scope="col">Group ID</th>
                          <th className="table-th" scope="col">Group Name</th>
                          <th className="table-th" scope="col">Group Remark</th>
                          <th className="table-th" scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.deviceGroups || [])
                          .map((it, index) => {
                            return (
                              <tr
                                key={index}
                                style={{
                                  alignItems: 'center',
                                  backgroundColor: '#FFFFFF',
                                  color: '#000000',
                                }}
                              >
                                <td
                                  className="table-td"
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    cursor: !!it.id ? 'pointer' : 'unset',
                                  }}
                                  onClick={async () => {
                                    if (!it.id) {
                                      return;
                                    }
                                    this.state.selectedRows = this.state.selectedRows || [];
                                    let tmp = this.state.selectedRows.filter(o => o.id == it.id)[0];
                                    let idx = this.state.selectedRows.indexOf(tmp);
                                    if (idx === -1) {
                                      this.state.selectedRows.push(it);
                                    } else {
                                      this.state.selectedRows.splice(idx, 1);
                                    }
                                    this.setState({ selectedRows: [].concat(this.state.selectedRows), loading: true });
                                    const listGroupId = this.state.selectedRows.map(row => row.id);
                                    let deviceByGroup = [];
                                    if (!!listGroupId && listGroupId.length > 0) {
                                      const rp = await getDevicesInGroup(listGroupId);
                                      if (!!rp.success) {
                                        deviceByGroup = rp.response.results;
                                      }
                                    }
                                    this.setState({ deviceByGroup: deviceByGroup.filter(device => !device.uid.includes('server')), loading: false });
                                  }}
                                >
                                  {!!it.id && (
                                    <input style={{ marginTop: '4px', cursor: 'pointer' }} type="checkbox" checked={!!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}/>
                                  )}
                                </td>
                                <td className="table-td">
                                  {it.id}
                                </td>
                                <td className="table-td">
                                  <span>{it.name}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.remark}</span>
                                </td>
                                <td style={{ display: 'flex', padding: '3px', paddingLeft: '30px' }}>
                                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                  <div
                                      data-tip="Click to edit device group"
                                      className="button-icon"
                                      onClick={() => {
                                        this.setState({
                                          deviceGroupEdit: {...it}
                                        })
                                      }}
                                  >
                                    <span>
                                      <i className="fa fa-edit" />
                                    </span>
                                  </div>

                                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                  <div
                                    data-tip="Click to remove device group"
                                    className="button-icon"
                                    onClick={async () => {
                                      const result = await Swal.fire({
                                       html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                                       icon: 'question',
                                       confirmButtonText: 'OK',
                                       cancelButtonText: 'Cancel',
                                       showCancelButton: true,
                                      });
                                      if (result && result.isConfirmed) {
                                       const rp = await deleteDeviceGroup({ id: it.id });
                                       if (rp.success) {
                                         await Swal.fire({
                                           html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                           icon: 'success',
                                           confirmButtonText: 'OK',
                                         });
                                         window.location.href = window.location.href;
                                       } else {
                                         Swal.fire({
                                           html: `<p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>`,
                                           icon: 'error',
                                           confirmButtonText: 'OK',
                                         });
                                       }
                                      }
                                  }}
                                  >
                                    <span>
                                      <i className="fa fa-trash-o" />
                                    </span>
                                  </div>
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
                          { this.state.totalRecords > 1 && this.state.totalPages >= 2 &&
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
                        padding: '30px',
                        borderBottom: '1px solid #ddd',
                        borderTop: '1px solid #ddd',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                        display: 'flex',
                      }}
                    >
                      <div
                        className="flex w-160 align-items-center justify-content-center button-btn mr-30"
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
                          if (!!selectedUids.length && !this.state.deviceByGroup.length) {
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>There no devices in selected group</p>`,
                              icon: 'error',
                              confirmButtonText: 'OK',
                            });
                            return;
                          }
                          this.state.batchs = [];
                          this.state.batchId = 'batch_' + Date.now();
                          let eId = '#' + this.state.batchId;
                          for (let i = 0; i < this.state.deviceByGroup.length; i++) {
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
                            html += (this.state.batchs?.lenth ? '<br/>' : '') + 'Waiting for ' + this.state.deviceByGroup[i]?.uid;
                            document.querySelectorAll(eId)[0].innerHTML = html;
                            await this.sendCommand(this.state.deviceByGroup[i]?.uid, 'INF', 'TCM_INFO');
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
                      }}
                      className="doctor-list"
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                        <table className="table">
                          <thead className="thead-dark">
                          <tr>
                            <th className="table-th" scope="col">MCU SN</th>
                            <th className="table-th" scope="col">MCU UUID</th>
                            <th className="table-th" scope="col">ESIM ID</th>
                            <th className="table-th" scope="col">MSN</th>
                            <th className="table-th" scope="col">STATUS</th>
                            <th className="table-th" scope="col">VERSION</th>
                            <th className="table-th" style={{ width: '300px' }} scope="col">LAST SEEN</th>
                            <th className="table-th" scope="col">GROUP</th>
                          </tr>
                          </thead>
                          <tbody>
                          {(this.state.deviceByGroup || [])
                            .map((it, index) => {
                              return (
                                <tr
                                  key={index}
                                  style={{
                                    alignItems: 'center',
                                    backgroundColor:  '#fff',
                                    color: '#000000',
                                  }}
                                >
                                  <td className="table-td">
                                    {it.sn}
                                  </td>
                                  <td className="table-td">
                                    <span>{it.uid}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.cid}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.msn}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.status}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.ver}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>
                                      {it.lastSubscribeDatetime ? moment(new Date(it.lastSubscribeDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}
                                    </span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.group?.id}</span>
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
                </>
                :null}
            </div>
          </PageContent>

          {this.state.loading && (
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
            />)}
        </div>
      </TotPage>
    );
  }
}

class PEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: { ...this.props.data },
      validate: {},
      ignores: [
        'gender', 'avatar', 'birthDay', 'companyRefId', 'userCompany', 'userCompanyRefId', 'paymentId', 'identification', 'invoiceNo', 'ccName',
        'countryCode', 'lockServerPassword', 'lockServerUsername', 'participant', 'lastLogin', 'token', 'userRegistrationImageName', 'userRegistrationMessage',
        'companyPosition', 'uuidIOS', 'deviceId', 'registeredTime', 'ccValidity', 'ccNum', 'company', 'approved',
      ],
    };
  }

  componentDidMount() {
  }

  handleChange(field, value) {

    if (field === 'role') {
      this.state.displayValue.roles = [value];
      this.validate('roles');
    } else if (field === 'company') {
      this.state.displayValue.company = { companyID: value };
      this.validate('roles');
    } else {
      this.state.displayValue[field] = value;
      this.validate(field);
    }

    this.setState({ displayValue: { ...this.state.displayValue } });
  }

  validate(field) {

    if (this.state.ignores.indexOf(field) > -1) {
      return true;
    }

    const value = this.state.displayValue[field];
    if (field === 'password') {
      this.state.validate.password = value == null || value == undefined || value.trim().length >= 8 || value.trim().length == 0;
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
      console.info('Field error: ' + field);
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
      <div style={{ paddingTop: '15px' }}>
        <div style={{ justifyContent: "center", padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, width: '890px' ,fontSize: '18px', color: '#000000' }}>
          <h5 style={{ justifyContent: "center",}} className="site-title">{!this.props.data.id ? 'Add ' : 'Edit '}</h5>
        </div>
        <div className="form-group">
          <label
            htmlFor="telephone"
            className="col-md-6 control-label visible-lg-block"
            style={{
              fontSize: '12px',
              textAlign: 'left',
              fontWeight: 500,
              color: '#222222',
            }}
          >
            Name :
            <span
              style={{
                marginLeft: '3px',
                marginTop: '2px',
                color: 'red',
              }}
            />
          </label>
          <div
            className="col-md-6 input-wrap has-feedback has-success"
            style={{ position: 'relative', paddingRight: '20px' }}
          >
            <Input
              key={this.state.refreshKey}
              field={{
                name: 'name',
              }}
              name="name"
              type="text"
              value={this.state.displayValue.name}
              placeholder={'Group Name'}
              groupstyle={{ margin: 'auto' }}
              onChange={value => this.handleChange('name', value)}
            />
            {this.state.validate.name === false ?
              <small className="help-block"
                 style={{
                   color: '#eb0000',
                   fontSize: '12px',
                   fontWeight: '400',
                 }}
              >
                {(!this.state.displayValue.name || !this.state.displayValue.name.trim().length) ? 'Name is required!' : 'Name invalid!'}
              </small>
              : null}
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="telephone"
            className="col-md-6 control-label visible-lg-block"
            style={{
              fontSize: '12px',
              textAlign: 'left',
              fontWeight: 500,
              color: '#222222',
            }}
          >
            Remark :
            <span
              style={{
                marginLeft: '3px',
                marginTop: '2px',
                color: 'red',
              }}
            />
          </label>
          <div
            className="col-md-6 input-wrap has-feedback has-success"
            style={{ position: 'relative', paddingRight: '20px' }}
          >
            <Input
              key={this.state.refreshKey}
              field={{
                name: 'remark',
              }}
              name="remark"
              type="text"
              value={this.state.displayValue.remark}
              placeholder={'Group Remark'}
              groupstyle={{ margin: 'auto' }}
              onChange={value => this.handleChange('remark', value)}
            />
            {this.state.validate.remark === false ?
              <small
                className="help-block"
                style={{
                  color: '#eb0000',
                  fontSize: '12px',
                  fontWeight: '400',
                }}
              >
                {(!this.state.displayValue.remark || !this.state.displayValue.remark.trim().length) ? 'Remark is required!' : 'Remark invalid!'}
              </small>
              : null}
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-6 input-wrap has-feedback has-success" style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
               onClick={ async () => {
                 if (!this.validates()) {
                   this.setState({});
                   return;
                 }
                 const result = await Swal.fire({
                   html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                   icon: 'question',
                   confirmButtonText: 'OK',
                   cancelButtonText: 'Cancel',
                   showCancelButton: true,
                 });
                 if (!result || !result.isConfirmed) return;
                 const params = this.state.displayValue;
                 const rp = await addDeviceGroup(params);
                 if (rp?.success) {
                   const result = await Swal.fire({
                     html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                     icon: 'success',
                     confirmButtonText: 'OK',
                   });
                   if (result || result.isConfirmed) {
                     this.props.onSave && this.props.onSave(this.state.displayValue);
                   }
                 } else {
                   Swal.fire({
                     html: ` <p style='text-align: center; font-size: 14px;'>${rp?.errorDescription || rp?.message}</p>`,
                     icon: 'error',
                     confirmButtonText: 'OK',
                   });
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
