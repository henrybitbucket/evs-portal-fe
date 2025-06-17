import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import { ProgressLoading, Input } from '@app/components/Common';
import UpgradeFirmware from './upgrade-firmware';
import 'moment-timezone';
const Swal = require('sweetalert2');
import makeAnimated from 'react-select/animated';

import {uploadFirmware, getAllDevices, deleteFirmware, getUploadedFirmware, getBuildingUnits, getVendors, getCids} from '@app/api/log';
import ReactTooltip from "react-tooltip";
import Select from 'react-select';
const animatedComponents = makeAnimated();

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
    const { query: { q, page, tab, fromDate, toDate, status, querySn, queryMsn, querySnOrCid, cids }, asPath, req, initialState: {} } = args;

    let tabN = tab === 'firmware-ota' ? 'firmware-ota' : 'firmware-upload';

    if (tabN === 'firmware-upload') {
      const pageNumber = Number(page) || 1;
      const params = {
          pageNumber,
          limit: 20,
          offset: (pageNumber - 1) * 20,
        };

      let rp = await getUploadedFirmware(params, req);
      rp = rp || {};
      rp.response = rp.response || {};
      return {
          namespacesRequired: ['common'],
          asPath,
          key: Date.now(),
          useTemplate: true,
          loginRequire: true,
          files: rp.response.results || [],
          totalRecords: rp.response.totalRows || 0,
          totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
          pageIndex: pageNumber,
          pageSize: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
          tab: tabN,
        };
    } else {
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
        tab: tabN,
      };
    }
  }
  state = {
    ...this.props,
  };
  componentDidMount() {
  }

  render() {
    const { t } = this.props;
    if (this.props.tab === 'firmware-ota') {
      return <UpgradeFirmware {...this.props}/>
    }
    return (
          <TotPage title={'Firmware Manage'}>
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
                          {!!this.state.firmwareEdit ?
                              <PEdit
                                  data={this.state.firmwareEdit}
                                  onClose={() => {
                                    this.setState({ firmwareEdit: null });
                                  }}
                                  onSave={() => {
                                    window.location.href = window.location.href;
                                  }}
                              />
                          :null
                          }
                          {!this.state.firmwareEdit ?
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
                              <div style={{ padding: '30px', borderBottom: '1px solid #ddd', paddingTop: '20px', paddingBottom: '20px' }}>
                                  <div
                                    className="button-btn w-160 mr-30"
                                    onClick={() => this.setState({
                                      firmwareEdit: {
                                          version: null,
                                          hashCode: null,
                                          file: null,
                                        },
                                    })}
                                  >
                                      <span>{'UPLOAD FIRMWARE'}</span>
                                  </div>
                              </div>
                              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '500px' }} className="doctor-list">
                                  <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                                      <table className="table">
                                          <thead className="thead-dark">
                                              <tr>
                                                  <th className="table-th" scope="col">ID</th>
                                                  <th className="table-th" scope="col">Version</th>
                                                  <th className="table-th" scope="col">Vendor</th>
                                                  <th className="table-th" scope="col">Hash code</th>
                                                  <th className="table-th" scope="col">File name</th>
                                                  <th className="table-th" scope="col">Action</th>
                                              </tr>
                                          </thead>

                                          <tbody>
                                          {(this.state.files || [])
                                              .map((it, index) => {
                                                  return (
                                                      <tr key={index}>
                                                          <td className="table-td">
                                                              {it.id}
                                                          </td>
                                                          <td className="table-td">
                                                              <span>{it.version}</span>
                                                          </td>
                                                          <td className="table-td">
                                                              <span>{it.vendor.name}</span>
                                                          </td>
                                                          <td className="table-td">
                                                              <span>{it.hashCode}</span>
                                                          </td>
                                                          <td className="table-td">
                                                              <span>{it.fileName}</span>
                                                          </td>
                                                          <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                                              <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                              <div
                                                                  data-tip="Click to remove firmware"
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
                                                                          const rp = await deleteFirmware({ id: it.id });
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
        displayValue: { ...this.props.data, vendor: null },
        validate: {},
        ignores: [
            'gender', 'avatar', 'birthDay', 'companyRefId', 'userCompany', 'userCompanyRefId', 'paymentId', 'identification', 'invoiceNo', 'ccName',
            'countryCode', 'lockServerPassword', 'lockServerUsername', 'participant', 'lastLogin', 'token', 'userRegistrationImageName', 'userRegistrationMessage',
            'companyPosition', 'uuidIOS', 'deviceId', 'registeredTime', 'ccValidity', 'ccNum', 'company', 'approved',
          ],
      };
  }

  componentDidMount = async () => {
      const vendors = [];
      const response = await getVendors();
      if (response?.response?.length) {
          response?.response.forEach((res) => {
              const vendor = {
                  value: res.id,
                  label: res.name,
              };
              vendors.push(vendor);
          });
      }
      this.setState({vendors: vendors});
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
      } else if (field === 'vendor') {
          this.state.validate.vendor = !!value?.value;
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
            <div style={{ paddingTop: '15px', overflow: 'visible', }}>
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
                        Version :
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
                            key={this.state.refreshKey}
                            field={{
                              name: 'version',
                            }}
                            name="version"
                            type="text"
                            // disabled={!!this.state.displayValue.id}
                            value={this.state.displayValue.version}
                            placeholder={'Version'}
                            groupstyle={{ margin: 'auto' }}
                            onChange={value => this.handleChange('version', value)}
                        />
                        {this.state.validate.version === false ?
                        <small className="help-block"
                            style={{
                              color: '#eb0000',
                              fontSize: '12px',
                              fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.version || !this.state.displayValue.version.trim().length) ? 'Version is required!' : 'Version invalid!'}
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
                        Hash code :
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
                            key={this.state.refreshKey}
                            field={{
                              name: 'hashCode',
                            }}
                            name="hashCode"
                            type="text"
                            value={this.state.displayValue.hashCode}
                            placeholder={'Hash code'}
                            groupstyle={{ margin: 'auto' }}
                            onChange={value => this.handleChange('hashCode', value)}
                        />
                        {this.state.validate.hashCode === false ?
                        <small className="help-block"
                            style={{
                              color: '#eb0000',
                              fontSize: '12px',
                              fontWeight: '400',
                            }}
                        >
                            {(!this.state.displayValue.hashCode || !this.state.displayValue.hashCode.trim().length) ? 'Hash code is required!' : 'Hash code invalid!'}
                        </small>
                        : null}
                    </div>
                </div>

                <div className="form-group col-md-6">
                    <label
                        htmlFor="vendor"
                        className="control-label visible-lg-block"
                        style={{
                            fontSize: '12px',
                            textAlign: 'left',
                            fontWeight: 500,
                            color: '#222222',
                        }}
                    >
                        Vendor :
                        <span
                            style={{
                                marginLeft: '3px',
                                marginTop: '2px',
                                color: 'red',
                            }}
                        />
                    </label>
                    <Select
                        className="select-vendor"
                        components={animatedComponents}
                        value={this.state.displayValue.vendor || { value: '', label: "Select vendor" }}
                        options={this.state.vendors || []}
                        onChange={(event) => {
                            this.handleChange('vendor', event);
                        }}
                    />
                    {this.state.validate.vendor === false ?
                        <small className="help-block"
                           style={{
                               color: '#eb0000',
                               fontSize: '12px',
                               fontWeight: '400',
                           }}
                        >
                            {!this.state.displayValue.vendor?.value ? 'Vendor is required' : ''}
                        </small>
                    : null}
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
                        Select file :
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
                        <input
                            type="file"
                            placeholder={'File upload'}
                            onChange={(event) => {
                              this.handleChange('file', event.target.files[0]);
                            }}
                        />
                        {this.state.validate.file === false ?
                            <small
                                className="help-block"
                                style={{
                                    color: '#eb0000',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                }}
                            >
                                {(!this.state.displayValue.file || !this.state.displayValue.file.trim().length) ? 'File is required!' : 'File invalid!'}
                            </small>
                            : null}
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-6 input-wrap has-feedback has-success" style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                            style={{ marginLeft: '0px', margin: 'unset' }}
                            className="button-btn w-80"
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
                              let rp = null;
                              const params = this.state.displayValue;
                              const formData = new FormData();
                              formData.append('file', params.file, params.file.name);

                              const url = !!this.props.data.id ? '/api/firm-ware/upload/' + this.props.data.id + '/'  : '/api/firm-ware/upload/';
                              const method = !!this.props.data.id ? 'PUT' : 'POST';
                              await fetch(url + params.version + '/' + params.hashCode + '/' + params.vendor.value,
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
                                      this.props.onSave && this.props.onSave(this.state.displayValue);
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
                        <div
                            style={{ marginLeft: '5px' }}
                            className="button-btn w-80"
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
