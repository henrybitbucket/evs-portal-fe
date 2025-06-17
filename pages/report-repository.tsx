import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import { ProgressLoading, Input } from '@app/components/Common';
import 'moment-timezone';
import moment from 'moment';
import makeAnimated from 'react-select/animated';
import { IoMailUnreadOutline } from 'react-icons/io5';
const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

import { addDeviceGroup, deleteDeviceGroup, getDeviceGroups, getBatchLogs, pingPi, getRelatedLogs, getReportFile } from '@app/api/log';
import ReactTooltip from "react-tooltip";
import {getCookie} from "@app/utils/cookie";
import {tokenName} from "@app/utils/public-config";

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
    const { query: { q, page, search, reportTaskId }, asPath, req, initialState: {} } = args;

    return {
      namespacesRequired: ['common'],
      asPath,
      search, reportTaskId,
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
      console.log("ok")
      const params = {
          limit: this.state.limit || 20,
          offset: this.state.offset || 0,
          search: this.state.search,
          reportTaskId: this.state.reportTaskId,
      };
      const rp = await getReportFile(params);
      this.setState({
          relatedMeterPis: rp?.response.results || [],
          totalRecordsRelatedMeterPi: rp?.response.totalRows,
          totalPagesRelatedMeterPi: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
          pageIndexRelatedMeterPi: Math.floor((rp?.response.offset + 19) / 20) + 1,
          pageSizeRelatedMeterPi: 20
      });
      console.log("rp",rp);
      console.log("rp.response.results",rp.response.results);
      console.log("results",this.state.relatedMeterPis);
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Report Repository'}>
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
              {!!this.state.piEdit ?
                <PEdit
                  data={this.state.piEdit}
                  onClose={() => {
                    this.setState({ piEdit: null });
                  }}
                  onSave={() => {
                    window.location.href = window.location.href;
                  }}
                />
                :null
              }
              {!this.state.piEdit ?
                <>
                  <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                    <h5 className="site-title">{'Report Repository'}</h5>
                  </div>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }} className="doctor-list">
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                      <table className="table">
                          <thead className="thead-dark">
                              <tr>
                                  <th className="table-th" scope="col">ID</th>
                                  <th className="table-th" scope="col">REPORT </th>
                                  <th className="table-th" scope="col">REPORT TASK ID</th>
                                  <th className="table-th" scope="col">CREATED TIME</th>
                                  <th className="table-th" scope="col">FILE DOWNLOAD</th>
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
                                            {(it.id || '')}
                                        </td>
                                        <td className="table-td">
                                            {(it.reportId || '')}
                                        </td>
                                        <td className="table-td">
                                            {(it.reportTaskId || '')}
                                        </td>
                                        <td className="table-td">
                                            {(it.createDate || '')}
                                        </td>
                                        <td className="table-td">
                                                <div
                                                     style={{ color: '#2374e1',}}
                                                    onClick={async() => {
                                                        let token = getCookie(tokenName, null);
                                                        if (!token || token === 'null') token = undefined;
                                                        const url = '/api/schedule/report-file/download/' + it.id ;
                                                        const method = 'POST';
                                                        const rp = await fetch(url, {
                                                            method,
                                                            reportTaskId:  it.id,
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'Authorization': token,
                                                            },
                                                        }).then((response) => {
                                                            return response.blob();
                                                        });
                                                        console.log("header", rp.headers);
                                                        if (rp) {
                                                            const fileName = it.fileName + "." + it.fileFormat.toLowerCase();
                                                            const url = window.URL.createObjectURL(new Blob([rp]));
                                                            const link = document.createElement('a');
                                                            link.href = url;
                                                            link.setAttribute('download', fileName);
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            link.parentNode.removeChild(link);
                                                        } else {
                                                            alert('Something went wrong. Please try again!');
                                                        }
                                                    }}
                                                >
                                                    {(it.fileName || '')}
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
                  {this.state.relatedLogs &&
                  <PiLog key={this.state.piLogKey} {...this.state}/>
                  }
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
      displayValue: { ...this.props.data },
      validate: {},
      ignores: [
      ],
    };
  }

  componentDidMount() {
  }

  handleChange(field, value) {

    this.state.displayValue[field] = value;
    this.validate(field);

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
            IP Address :
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
                name: 'ip',
              }}
              name="ip"
              type="text"
              value={this.state.displayValue.ip}
              placeholder={'192.168.2.100'}
              groupstyle={{ margin: 'auto' }}
              onChange={value => this.handleChange('ip', value)}
            />
            {this.state.validate.ip === false ?
              <small className="help-block"
                 style={{
                   color: '#eb0000',
                   fontSize: '12px',
                   fontWeight: '400',
                 }}
              >
                {(!this.state.displayValue.ip || !this.state.displayValue.ip.trim().length) ? 'Ip is required!' : 'Ip invalid!'}
              </small>
              : null}
          </div>
        </div>

        {/*<div className="form-group">
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
        </div>*/}
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
                 const params = {...this.state.displayValue, hide: undefined, uuid: this.state.displayValue.ip};
                 const rp = await pingPi(params);
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

class PiLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props};
    }

    componentDidMount() {
    }

    render() {
        return(
        <>
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
                    {this.state.selectedData ? 'Selected ' : ''}
                    {this.state.selectedData?.uuid ? 'Batch: ' + this.state.selectedData?.uuid : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <div
                    className="button-btn w-150 ml-15"
                       onClick={async () => {
                         if (this.state.selectedData) {
                           const params = {
                             options: {
                               uid: this.state.selectedData.uid,
                               msn: this.state.selectedData.msn,
                               batchId: this.state.selectedData.uuid,
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
                           });
                         }
                       }}
                  >
                    <span>{'REFRESH'}</span>
                  </div>
                  <div
                    style={{
                      display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'inherit' : 'none',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: '100px',
                      height: '100%',
                      transition: 'all 0.2s ease',
                      width: 'calc(100% - 215px)',
                    }}
                  >
                    <span style={{ marginLeft: '20px' }}>{'From date:'}</span>
                    <input
                      style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        outline: 'unset',
                        height: '40px',
                        width: '10%',
                        paddingLeft: '10px',
                        marginLeft: '5px',
                        alignSelf: 'center',
                      }}
                      key={this.state.key1}
                      type="date"
                      value={this.state.searchFromDate}
                      onChange={event => this.setState({ searchFromDate: event.target.value })}
                    />
                    <span style={{ marginLeft: '20px' }}>{'To date:'}</span>
                    <input
                      style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        outline: 'unset',
                        height: '40px',
                        width: '10%',
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
                    <input
                      style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        outline: 'unset',
                        height: '40px',
                        width: '30%',
                        paddingLeft: '10px',
                        marginLeft: '30px',
                        alignSelf: 'center',
                      }}
                      type="number"
                      value={ this.state.searchMid || '' }
                      placeholder="Search MID..."
                      onChange={event => this.setState({ searchMid: event.target.value })}
                    />
                    <button
                      className="button-btn w-80 ml-15"
                      style={{
                        outline: 'unset',
                        border: 'unset',
                      }}
                      onClick={async () => {
                        const params = {
                          options: {
                            uid: this.state.selectedData.uid,
                            msn: this.state.selectedData.msn,
                            mid: this.state.searchMid,
                            batchId: this.state.selectedData.uuid,
                            fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                            toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,
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
                            uid: this.state.selectedData.uid,
                            msn: this.state.selectedData.msn,
                            batchId: this.state.selectedData.uuid,
                          },
                          limit: 20,
                          offset: 0,
                        };
                        const rp = await getRelatedLogs(params);
                        this.setState({
                          searchMid: undefined,
                          search: true,
                          searchFromDate: undefined,
                          searchToDate: undefined,
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
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th className="table-th" scope="col">TIME</th>
                                <th className="table-th" scope="col">TYPE</th>
                                <th className="table-th" scope="col">TOPIC</th>
                                <th className="table-th" scope="col">MID</th>
                                <th className="table-th" scope="col">COMMAND</th>
                                <th className="table-th" scope="col">VIEW MESSAGE</th>
                                <th className="table-th" scope="col" style={{textAlign: 'center',}}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(this.state.relatedLogs || [])
                            .map((it, index) => {
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
                                          {moment(it.createDate).format('DD-MM-YY HH:mm:ss')}
                                      </td>

                                      <td className="table-td">
                                          {it.type}
                                      </td>
                                      <td className="table-td">
                                          {it.topic}
                                      </td>
                                      <td className="table-td">
                                          <span>{it.mid || it.oid || it.rmid}</span>
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
                                      <td className="table-td">
                                        <div>
                                          { it.status === 0 ? 'OK'
                                          : it.status === 1 ? 'Invalid Format'
                                          : it.status === 2 ? 'Invalid Command'
                                          : it.status === 3 ? 'Invalid Signature'
                                          : it.status === 4 ? 'Decryption Failed'
                                          : it.status === 5 ? 'Invalid Configuration'
                                          : it.status === 8 ? 'Failed send to device (Gateway)'
                                          : it.status === 9 ? 'General Error'
                                          : ((it.type === 'PUBLISH' && it.ptype === 'MDT'
                                              && moment(it.createDate).toDate().getTime() > 1637589664227)
                                              ? (
                                                  it.repStatus === 1
                                                  ?
                                                  'OK'
                                                  :
                                                  <div
                                                      className="button-icon"
                                                      data-tip="Click to see status"
                                                      style={{marginLeft: '-7.5px'}}
                                                      onClick={async () => {
                                                          await this.setState({loading: true})
                                                          let rp = await getPiLogs({msn: it.msn, mid: it.mid})
                                                          this.setState({
                                                              mdtPiStatus: rp?.response || [],
                                                              loading: false,
                                                          });
                                                      }}
                                                  >
                                                    <IoMailUnreadOutline />
                                                  </div>
                                              )

                                          : null)}
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
                                batchId: this.state.selectedData.uuid,
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
        </>
        )
    }
}

export default withNamespaces('common')(Homepage);
