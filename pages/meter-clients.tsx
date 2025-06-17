import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Input, Pagination, ProgressLoading } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import 'moment-timezone';
import moment from 'moment';
import makeAnimated from 'react-select/animated';
import { IoMailUnreadOutline } from 'react-icons/io5';
import {
  getAllDevices,
  getBlockOfBuilding,
  getBuilding,
  getBuildingUnits,
  getDeviceFilters,
  getDeviceGroups,
  getFloorLevels,
  getMeterFileDatas,
  getPiClients,
  getRelatedLogs,
  getSettingByKey,
  getVendors,
  pingPi, updateDevicesNode
} from '@app/api/log';
import ReactTooltip from "react-tooltip";
import { getUserPermissions, getUsers } from "@app/api/user";
import Select from 'react-select';

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
    :global(.button-btn-disabled) {
      background-color: #848899;
      border: unset;
      outline: unset;
      display: flex;
      border-radius: 5px;
      height: 40px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      width: 150px;
      text-transform: uppercase;
      transition: 0.2s;
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
    :global(.multi-select-address) {
      width: 100%;
      font-size: 14px;
    }
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  state = {
    ...this.props,
    buildings: [],
    floorLevels: [],
    buildingUnits: [],
  };

  constructor(props) {
    super(props);
  }

  static getInitialProps = async (args) => {
    const {
      query: {
        q,
        page,
      },
      asPath, req, initialState: {},
    } = args;

    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      page,
      asPath,
    };
  }

  async componentDidMount() {
    this.search();
    const buildings = await getBuilding({ limit: 10000 });
    this.setState({buildings})
    this.getPiTime();
    this.intv = setInterval(async () => {
      this.search();
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.intv);
  }

  pingPi = async (ieiId, uuid, location, hide, isEdit) => {
    const result = await Swal.fire({
      html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
      icon: 'question',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    });
    if (!result || !result.isConfirmed) return;
    await this.setState({ loading: true })
    let rp = await pingPi({ ieiId, uuid, location, hide, isEdit })
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
    const rp = await getPiClients(params);
    this.setState({
      relatedMeterPis: rp?.results || [],
      totalRecordsRelatedMeterPi: rp?.totalRows,
      totalPagesRelatedMeterPi: Math.floor(((rp.totalRows || 0) + 19) / 20),
      pageIndexRelatedMeterPi: (rp?.offset + 19) / 20,
      pageSizeRelatedMeterPi: 20
    });
  }

  getPiTime = async () => {
    const params = { key: 'TIME_CHECK_PI_ONLINE' };
    const rp = await getSettingByKey(params);
    const time = 30 * 1000;
    if (typeof rp?.response?.value !== 'number' || Number(rp?.response?.value) < 0) {
      this.setState({ piTime: time });
    }
    this.setState({ piTime: rp?.response?.value * 1000 });
  }

  getDevices = async () => {
    console.log("this.state", this.state)
    const pageNumber = Number(this.state.page) || 1;
    let params = {
      options: {
        querySn: this.state.searchSn,
        queryMsn: this.state.searchMsn,
        queryBuilding: this.state.searchBuilding ? this.state.searchBuilding?.value.toString() : undefined,
        queryBlock: this.state.searchBlock ? this.state.searchBlock?.value.toString() : undefined,
        queryFloorLevel: this.state.searchFloorLevel ? this.state.searchFloorLevel?.value.toString() : undefined,
        queryBuildingUnit: this.state.searchBuildingUnit ? this.state.searchBuildingUnit?.value.toString() : undefined,
        queryRemarkMCU: this.state.searchRemarkMCU,
        queryRemarkMeter: this.state.searchRemarkMeter,
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };
    let rp = await getAllDevices(params);
    rp = rp || {};
    rp.response = rp.response || {};
    this.setState({
      devices: rp.response.results?.filter(device => device.uid !== 'server.csr'),
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
      pageIndex: pageNumber,
      pageSize: 20,
      currentDeviceFilter: {...params},
    })
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'IEI Node Management'}>
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
                : null
              }
              {!this.state.piEdit ?
                <>
                  <div style={{
                    padding: '15px',
                    paddingTop: '20px',
                    paddingBottom: '0px',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: '#000000'
                  }}>
                    <h5 className="site-title">{'IEI Node Management'}</h5>
                  </div>
                  <div style={{
                    padding: '30px',
                    borderBottom: '1px solid #ddd',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                  }}>
                    <div
                      className="w-200 button-btn"
                      onClick={() => this.setState({
                        piEdit: {
                          ip: null,
                          ieiId: null,
                        },
                      })}
                    >
                      <span>{'ADD NEW IEI'}</span>
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }}
                    className="doctor-list">
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                      <table className="table">
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col">IEI ID</th>
                          <th className="table-th" scope="col">Location</th>
                          <th className="table-th" scope="col">IP Address</th>
                          <th className="table-th" scope="col">Distribute</th>
                          <th className="table-th" scope="col">STATUS</th>
                          <th className="table-th" scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.relatedMeterPis || [])
                          .map((it, index) => {
                            let off = (Date.now() - (it.lastPing || 0)) > this.state.piTime;
                            return (
                              <tr
                                key={index}
                                style={{
                                  cursor: 'pointer',
                                  backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                                  color: '#000000',
                                }}
                                onClick={async () => {
                                  if (!this.state.openEditDialog && !this.state.openSetTimeIntervalDialog) {
                                    await this.setState({
                                      selectedRow: index, selectedLog: index,
                                      selectedData: it,
                                      loading: true,
                                    });
                                    if (this.state.processLog === undefined && this.state.fileManagement === undefined) {
                                      await this.setState({
                                        processLog: it,
                                        fileManagement: '',
                                      });
                                    }
                                    if (!!this.state.processLog) {
                                      await this.getDevices();
                                    }
                                    if (!!this.state.fileManagement) {
                                      let paramsMeterFileData = {
                                        options: {
                                          piId: this.state.selectedData.id,
                                        },
                                        limit: 20,
                                        offset: 0,
                                      };
                                      let rpMeterFileData = await getMeterFileDatas(paramsMeterFileData);
                                      this.setState({
                                        meterFileData: rpMeterFileData?.response?.results || [],
                                        totalRecordsMeterFileData: rpMeterFileData?.response?.totalRows,
                                        totalPagesMeterFileData: Math.floor(((rpMeterFileData.response.totalRows || 0) + 19) / 20),
                                        pageIndexMeterFileData: Math.floor((rpMeterFileData?.response?.offset + 19) / 20) + 1,
                                        pageSizeMeterFileData: 20,
                                        piLogKey: Date.now(),

                                      });
                                    }

                                    this.setState({
                                      loading: false,
                                    });
                                  }
                                }}
                              >
                                <td className="table-td">
                                  {it.ieiId}
                                </td>
                                <td className="table-td">
                                  {it.location}
                                </td>
                                <td className="table-td">
                                  {(it.uuid || '').split('-')[0]}
                                </td>
                                <td className="table-td">
                                  {it.distributeFlag === true ? "TRUE" : "FALSE"}
                                </td>
                                <td className="table-td">
                                  <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                    <div className='pi-status' style={{ background: !off ? 'green' : 'red' }}>
                                      <span>{off ? 'Offline' : 'Online'}</span>
                                    </div>
                                    {<span style={{ marginLeft: '10px', fontSize: '12px', }}>
                                                    {'Last seen ' + moment(it.lastPing).format('YY-MM-DD HH:mm:ss')}
                                                </span>}
                                  </div>
                                </td>
                                <td className="table-td pi-action-td flex flex-row">
                                  <div
                                    className="button-icon"
                                    data-tip="Click to edit"
                                    onClick={() => this.setState({
                                      piEdit: { ...it },
                                    })}
                                  >
                                    <i className="fa fa-edit"/>
                                  </div>
                                  {off && (
                                    <div
                                      className="button-icon"
                                      data-tip="Click to hide"
                                      onClick={async () => {
                                        this.pingPi(it.ieiId, it.uuid, it.location, true, true);
                                      }}
                                    >
                                      <i className="fa fa-trash"/>
                                    </div>
                                  )}
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
                        <div className="col-sm-12 col-md-7 pagination"
                             style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
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
                                this.search();
                              })
                            }}
                            pageIndex={Math.floor(this.state.pageIndexRelatedMeterPi)}
                            pageSize={this.state.pageSizeRelatedMeterPi}
                            styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                          />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {!!this.state.processLog &&
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
                        <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', }}>
                          <div
                            onClick={() => {
                              this.setState({
                                processLog: this.state.selectedData,
                                fileManagement: ''
                              }, async () => {
                                if (!!this.state.processLog) {
                                  this.setState({
                                    logFontWeight: '500',
                                    fileFontWeight: '300',
                                    loading: true,
                                  })
                                  const params = {
                                    options: {
                                      uid: this.state.selectedData.uid,
                                      msn: this.state.selectedData.msn,
                                      piId: this.state.selectedData.id,
                                    },
                                    limit: 20,
                                    offset: 0,
                                  };
                                  const rp = await getRelatedLogs(params);
                                  this.setState({
                                    relatedLogs: rp?.response?.results || [],
                                    totalRecordsRelatedLog: rp?.response?.totalRows,
                                    totalPagesRelatedLog: Math.floor(((rp?.response?.totalRows || 0) + 19) / 20),
                                    pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20 + 1),
                                    pageSizeRelatedLog: 20,
                                    piLogKey: Date.now(),
                                    loading: false,
                                  })
                                }
                              })
                            }}>
                            <span style={{ fontWeight: this.state.logFontWeight, }}>{'Process Log'}</span>
                            <span style={{
                              color: '#000000',
                              fontSize: '14px',
                              fontWeight: 300,
                              display: this.state.selectedData ? 'flex' : 'none'
                            }}>
                            {this.state.selectedData ? 'Selected ' : ''}
                              {this.state.selectedData?.ieiId ? 'PI: ' + this.state.selectedData?.ieiId : ''}
                          </span>
                          </div>
                          <div
                            style={{ marginLeft: '20px', borderLeft: '2px solid #000000', cursor: 'pointer', }}
                            onClick={() => {
                              this.setState({
                                fileManagement: this.state.selectedData,
                                processLog: ''
                              }, async () => {
                                if (!!this.state.fileManagement) {
                                  this.setState({
                                    fileFontWeight: '500',
                                    logFontWeight: '300',
                                    processLog: undefined,
                                    loading: true,
                                  })
                                  let paramsMeterFileData = {
                                    options: {
                                      piId: this.state.selectedData.id,
                                    },
                                    limit: 20,
                                    offset: 0,
                                  };
                                  let rpMeterFileData = await getMeterFileDatas(paramsMeterFileData);
                                  this.setState({
                                    meterFileData: rpMeterFileData?.response?.results || [],
                                    totalRecordsMeterFileData: rpMeterFileData?.response?.totalRows,
                                    totalPagesMeterFileData: Math.floor(((rpMeterFileData.response.totalRows || 0) + 19) / 20),
                                    pageIndexMeterFileData: Math.floor((rpMeterFileData?.response?.offset + 19) / 20) + 1,
                                    pageSizeMeterFileData: 20,
                                    loading: false,
                                  })
                                }
                              })
                            }}
                          >
                            <div style={{ marginLeft: '20px', }}>
                              <span style={{ fontWeight: this.state.fileFontWeight, }}>{'File management'}</span>
                              <span style={{
                                color: '#000000',
                                fontSize: '14px',
                                fontWeight: 300,
                                display: this.state.selectedData ? 'flex' : 'none'
                              }}>
                                {this.state.selectedData ? 'Selected ' : ''}
                                {this.state.selectedData?.ieiId ? 'PI: ' + this.state.selectedData?.ieiId : ''}
                                </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '30px',
                          pointerEvents: (!!this.state.openSetTimeIntervalDialog || !!this.state.openSaveFilters) ? 'none' : 'all',
                        }}
                      >
                        <div
                          className="font-size-18"
                          style={{
                            cursor: 'pointer',
                            color: 'blue',
                            marginBottom: '20px',
                            width: 'max-content'
                          }}
                          onClick={() => {
                            this.setState({
                              openAdvancedSearch: !this.state.openAdvancedSearch,
                            })
                          }}
                        >
                          {'Advanced Search'}
                          {!!this.state.openAdvancedSearch ? (
                            <i className="fa fa-search-minus ml-5"/>
                          ) : (
                            <i className="fa fa-search-plus ml-5"/>
                          )}
                        </div>

                        {!!this.state.openAdvancedSearch && (
                          <div style={{ marginTop: '20px', width: '96%' }}>

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '15px',
                                gap: '10px',
                              }}
                              className="box-item"
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <input
                                  style={{
                                    border: '1px solid #00000020',
                                    borderRadius: '5px',
                                    outline: 'unset',
                                    height: '40px',
                                    width: '100%',
                                    paddingLeft: '10px',
                                    alignSelf: 'center',
                                  }}
                                  value={this.state.searchMsn || ''}
                                  placeholder="Search MSN..."
                                  onChange={event => this.setState({ searchMsn: event.target.value })}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <input
                                  style={{
                                    border: '1px solid #00000020',
                                    borderRadius: '5px',
                                    outline: 'unset',
                                    height: '40px',
                                    width: '100%',
                                    paddingLeft: '10px',
                                    alignSelf: 'center',
                                  }}
                                  value={this.state.searchSn || ''}
                                  placeholder="Search MCU SN..."
                                  onChange={event => this.setState({ searchSn: event.target.value })}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  marginBottom: '0px',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <input
                                  style={{
                                    border: '1px solid #00000020',
                                    borderRadius: '5px',
                                    outline: 'unset',
                                    height: '40px',
                                    width: '100%',
                                    paddingLeft: '10px',
                                    alignSelf: 'center',
                                  }}
                                  value={this.state.searchRemarkMCU || ''}
                                  placeholder="Search remark MCU..."
                                  onChange={event => this.setState({ searchRemarkMCU: event.target.value })}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  marginBottom: '0px',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <input
                                  style={{
                                    border: '1px solid #00000020',
                                    borderRadius: '5px',
                                    outline: 'unset',
                                    height: '40px',
                                    width: '100%',
                                    paddingLeft: '10px',
                                    alignSelf: 'center',
                                  }}
                                  value={this.state.searchRemarkMeter || ''}
                                  placeholder="Search remark Meter..."
                                  onChange={event => this.setState({ searchRemarkMeter: event.target.value })}
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between',
                                marginBottom: '15px',
                                gap: '10px',
                                marginTop: '10px',
                              }}
                              className="box-item"
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <Select
                                  className="multi-select-address"
                                  components={animatedComponents}
                                  value={this.state.searchBuilding || { value: '', label: "Select building" }}
                                  options={[{
                                    id: '',
                                    name: "Select building"
                                  }].concat(this.state.buildings.results || []).map(bd => ({
                                    value: bd.id,
                                    label: bd.id + ' - ' + bd.name
                                  }))}
                                  onChange={async (event) => {
                                    if (!event.value) {
                                      this.setState({
                                        searchBuilding: undefined,
                                        searchFloorLevel: undefined,
                                        searchBuildingUnit: undefined,
                                        blocks: [],
                                        floorLevels: [],
                                        buildingUnits: [],
                                      });
                                    } else {
                                      this.setState({ searchBuilding: event });
                                      let blocks = [];
                                      blocks = await getBlockOfBuilding({
                                        limit: 10000,
                                        options: { buildingId: event.value }
                                      });

                                      let floorLevels = [];
                                      floorLevels = await getFloorLevels({
                                        limit: 10000,
                                        options: { buildingId: event.value }
                                      });
                                      this.setState({
                                        blocks,
                                        floorLevels,
                                        buildingUnits: [],
                                        selectedBlock: undefined,
                                        searchFloorLevel: undefined,
                                        searchBuildingUnit: undefined,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <Select
                                  className="multi-select-address"
                                  components={animatedComponents}
                                  value={this.state.searchBlock || { value: '', label: "Select block" }}
                                  options={[{
                                    id: '',
                                    name: "Select block"
                                  }].concat(this.state.blocks?.results || []).map(bd => ({
                                    value: bd.id,
                                    label: bd.id + ' - ' + bd.name
                                  }))}
                                  onChange={async (event) => {
                                    if (!event.value) {
                                      this.setState({
                                        searchBlock: undefined,
                                        searchFloorLevel: undefined,
                                        searchBuildingUnit: undefined,
                                        floorLevels: [],
                                        buildingUnits: [],
                                      });
                                    } else {
                                      this.setState({
                                        searchBlock: event
                                      });
                                      let floorLevels = [];
                                      floorLevels = await getFloorLevels({
                                        limit: 10000,
                                        options: { blockId: event.value, buildingId: this.state.searchBuilding?.id }
                                      });
                                      this.setState({
                                        floorLevels,
                                        buildingUnits: [],
                                        searchFloorLevel: undefined,
                                        searchBuildingUnit: undefined,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <Select
                                  className="multi-select-address"
                                  components={animatedComponents}
                                  value={this.state.searchFloorLevel || { value: '', label: "Select floorLevel" }}
                                  options={[{
                                    id: '',
                                    name: "Select floorLevel"
                                  }].concat(this.state.floorLevels.results || []).map(bd => ({
                                    value: bd.id,
                                    label: bd.id + ' - ' + bd.name
                                  }))}
                                  onChange={async (event) => {
                                    if (!event.value) {
                                      this.setState({
                                        searchFloorLevel: undefined,
                                        searchBuildingUnit: undefined,
                                        buildingUnits: [],
                                      });
                                    } else {
                                      this.setState({
                                        searchFloorLevel: event
                                      });
                                      let buildingUnits = await getBuildingUnits({
                                        limit: 10000,
                                        options: { floorLevelId: event.value }
                                      });
                                      this.setState({
                                        buildingUnits,
                                        searchBuildingUnit: undefined
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flex: 1,
                                }}
                                className="item"
                              >
                                <Select
                                  className="multi-select-address"
                                  components={animatedComponents}
                                  value={this.state.searchBuildingUnit || { value: '', label: "Select buildingUnit" }}
                                  options={[{
                                    id: '',
                                    name: "Select buildingUnit"
                                  }].concat(this.state.buildingUnits.results || []).map(bd => ({
                                    value: bd.id,
                                    label: bd.id + ' - ' + bd.name
                                  }))}
                                  onChange={(event) => {
                                    if (!event.value) {
                                      this.setState({
                                        searchBuildingUnit: undefined,
                                      });
                                    } else {
                                      this.setState({
                                        searchBuildingUnit: event
                                      });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                          <div
                            data-tip="Apply filters and search"
                            className="button-btn w-80"
                          >
                            <div
                              onClick={async () => {
                                this.state.page = 1;
                                await this.getDevices();
                              }}
                            >
                              {'SEARCH'}
                            </div>
                          </div>
                          <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                          <div
                            data-tip="Clear all filters"
                            className="button-btn w-80 ml-10"
                            onClick={async () => {
                              await this.setState({
                                searchSn: undefined,
                                searchMsn: undefined,
                                searchBlock: undefined,
                                searchBuilding: undefined,
                                searchBuildingUnit: undefined,
                                searchFloorLevel: undefined,
                                searchRemarkMCU: undefined,
                                searchRemarkMeter: undefined,
                              }, async () => {
                                this.state.page = 1;
                                await this.getDevices();
                              });
                            }}
                          >
                            <span>{'CLEAR'}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', background: '#fff' }}
                           className="doctor-list">
                        <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontWeight: 500, textAlign: 'center', margin: '10px', fontSize: '15px' }}>
                            <div style={{display: 'flex'}}>
                              <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                              <div
                                data-tip={`${this.state.selectedData?.distributeFlag ? 'Clear all founded devices to selected IEI Node' : 'Selected IEI Node is not allowed to distribute/un-distribute'}`}
                                className={`${this.state.selectedData?.distributeFlag ? 'button-btn' : 'button-btn-disabled'} w-160 ml-10`}
                                onClick={async () => {
                                  if (this.state.selectedData?.distributeFlag) {
                                    this.setState({loading: true});
                                    const params = {
                                      deviceIds: this.state.devices.map(dv => dv.id),
                                      ieiNode: this.state.selectedData.ieiId,
                                      isDistributed: false,
                                      filter: {...this.state.currentDeviceFilter}
                                    };
                                    await updateDevicesNode(params);
                                    await this.getDevices();
                                    this.setState({loading: false});
                                  }
                                }}
                              >
                                <span>{'Set all to No'}</span>
                              </div>
                              <div
                                data-tip={`${this.state.selectedData?.distributeFlag ? 'Apply all founded devices to selected IEI Node' : 'Selected IEI Node is not allowed to distribute/un-distribute'}`}
                                className={`${this.state.selectedData?.distributeFlag ? 'button-btn' : 'button-btn-disabled'} w-160 ml-10`}
                                onClick={async () => {
                                  if (this.state.selectedData?.distributeFlag) {
                                    this.setState({loading: true});
                                    let deviceIds = [];
                                    this.state.devices.forEach(dv => {
                                      if (!dv.deviceIEINodes.map(node => node.ieiId).includes(this.state.selectedData.ieiId)) {
                                        deviceIds.push(dv.id);
                                      }
                                    })
                                    const params = {
                                      deviceIds: deviceIds,
                                      ieiNode: this.state.selectedData.ieiId,
                                      isDistributed: true,
                                      filter: {...this.state.currentDeviceFilter}
                                    };
                                    await updateDevicesNode(params);
                                    await this.getDevices();
                                    this.setState({loading: false});
                                  }
                                }}
                              >
                                <span>{'Set all to Yes'}</span>
                              </div>
                            </div>
                            <span>{'Total: ' + this.state.totalRecords}</span>
                          </div>
                          <table className="table">
                            <thead className="thead-dark">
                            <tr>
                              <th className="table-th" scope="col">MCU SN</th>
                              <th className="table-th" scope="col">MCU UUID</th>
                              <th className="table-th" scope="col">MSN</th>
                              <th className="table-th" scope="col">RLS STATUS</th>
                              <th className="table-th" scope="col">STATUS</th>
                              <th className="table-th" scope="col">P2 COUPLE STATE</th>
                              <th className="table-th" scope="col">VERSION</th>
                              <th className="table-th" scope="col">VENDOR</th>
                              <th className="table-th" style={{ width: '300px' }} scope="col">LAST SEEN</th>
                              <th className="table-th" scope="col">GROUP</th>
                              <th className="table-th" scope="col">Enroll</th>
                              <th className="table-th" scope="col">Send data to Pi</th>
                              <th className="table-th" scope="col">Distribute to IEI</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.state.devices || []).map((it, index) => {
                              it.rlsStatus = '';
                              if (it.logs && it.logs[0]) {
                                try {
                                  let rlsLog = JSON.parse(it.logs[0]);
                                  it.rlsStatus = rlsLog.payload.data;
                                  if (it.rlsStatus === '0') {
                                    it.rlsStatus = 'OFF';
                                  }
                                  if (it.rlsStatus === '1') {
                                    it.rlsStatus = 'ON';
                                  }
                                } catch (err) {
                                }
                              }
                              return (
                                <tr
                                  key={index}
                                  style={{
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
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
                                    <span>{it.msn}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.rlsStatus}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.status}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.type}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.ver}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it?.vendor?.name}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.lastSubscribeDatetime ? moment(new Date(it.lastSubscribeDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.group?.id}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.enrollmentDatetime ? moment(new Date(it.enrollmentDatetime)).format('YYYY/MM/DD HH:mm:ss') : ''}</span>
                                  </td>
                                  <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip={`${it.sendMDTToPi === 1 ? 'Click to set "Do not send data to the pi"' : 'Click to set "To send data to the pi"'}`}
                                    >
                                      <i
                                        style={{
                                          cursor: 'pointer',
                                          fontSize: '30px',
                                          marginRight: '10px',
                                          color: it.sendMDTToPi === 1 ? 'green' : 'gray',
                                        }}
                                        className={`${it.sendMDTToPi === 1 ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}`}
                                        onClick={async () => {
                                          if (this.state.selectedData?.id) {

                                            this.setState({loading: true});
                                            const isDistributed = it?.deviceIEINodes.filter(node => node.ieiId === this.state.selectedData.ieiId)?.length;
                                            let filter = {...this.state.currentDeviceFilter};
                                            filter.options = {...filter.options, deviceId: it.id};

                                            const params = {
                                              deviceIds: [it.id],
                                              ieiNode: this.state.selectedData.ieiId,
                                              isDistributed,
                                              sendMDTToPi: it.sendMDTToPi === 1 ? 2 : 1,
                                              filter: {...filter},
                                            };
                                            await updateDevicesNode(params);
                                            await this.getDevices();
                                            this.setState({loading: false});
                                          }
                                        }}
                                      />
                                    </div>
                                  </td>
                                  <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip={`${this.state.selectedData?.distributeFlag ? 'Click to distribute/un-distribute to IEI' : 'Selected IEI Node is not allowed to distribute/un-distribute'}`}
                                    >
                                      <i
                                        style={{
                                          cursor: 'pointer',
                                          fontSize: '30px',
                                          marginRight: '10px',
                                          color: (this.state.selectedData?.distributeFlag && it?.deviceIEINodes.filter(node => node.ieiId === this.state.selectedData.ieiId)?.length) ? 'green' : (!this.state.selectedData?.distributeFlag ? 'gray' : ''),
                                        }}
                                        className={`${it?.deviceIEINodes.filter(node => node.ieiId === this.state.selectedData.ieiId)?.length ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}`}
                                        onClick={async () => {
                                          if (this.state.selectedData?.distributeFlag) {
                                            this.setState({loading: true});
                                            const isDistributed = it?.deviceIEINodes.filter(node => node.ieiId === this.state.selectedData.ieiId)?.length;
                                            let filter = {...this.state.currentDeviceFilter};
                                            filter.options = {...filter.options, deviceId: it.id};

                                            const params = {
                                              deviceIds: [it.id],
                                              ieiNode: this.state.selectedData.ieiId,
                                              isDistributed: !isDistributed,
                                              filter: {...filter},
                                            };
                                            await updateDevicesNode(params);
                                            await this.getDevices();
                                            this.setState({loading: false});
                                          }
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                            }
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
                          <div
                            className="col-sm-12 col-md-7 pagination"
                            style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                          >
                            {this.state.totalRecords > this.state.pageSize && this.state.totalPages >= 2 &&
                            <Pagination
                              href={this.props.asPath.replace(/\?.*/g, '')}
                              totalRecords={this.state.totalRecords}
                              totalPages={this.state.totalPages}
                              onPageChanged={async (query) => {
                                await this.setState({
                                  page: query.pageIndex
                                }, async () => {
                                  await this.getDevices();
                                })
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
                  }
                </>
                : null}
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
        "createDate",
        "createdBy",
        "email",
        "hide",
        "lastPing",
        "location",
        "modifyDate",
        "name",
        "updatedBy",
        "uuid",
        "ip",
        "distributeFlag",
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
    if (field === 'ieiId') {
      this.state.validate.ieiId = !!value && /^[0-9a-zA-Z-_]+$/.test(value);
      this.state.validate.ieiIdError = {
        hasError: !value || !/^[0-9a-zA-Z-_]+$/.test(value),
        error: "Invalid IEI ID",
      };
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
            IEI ID:
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
                name: 'ieiId',
              }}
              name="ieiId"
              type="text"
              value={this.state.displayValue.ieiId}
              placeholder={'IEI ID'}
              groupstyle={{ margin: 'auto' }}
              onChange={value => this.handleChange('ieiId', value)}
              disabled={this.props.data?.ieiId || this.props.data?.uuid}
            />
            {!!this.state.validate.ieiIdError?.hasError ?
              <small className="help-block"
                     style={{
                       color: '#eb0000',
                       fontSize: '12px',
                       fontWeight: '400',
                     }}
              >
                {this.state.validate.ieiIdError?.error}
              </small>
              : null}
          </div>

          {/*<label*/}
          {/*  htmlFor="telephone"*/}
          {/*  className="col-md-6 control-label visible-lg-block"*/}
          {/*  style={{*/}
          {/*    fontSize: '12px',*/}
          {/*    textAlign: 'left',*/}
          {/*    fontWeight: 500,*/}
          {/*    color: '#222222',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  IP Address :*/}
          {/*  <span*/}
          {/*    style={{*/}
          {/*      marginLeft: '3px',*/}
          {/*      marginTop: '2px',*/}
          {/*      color: 'red',*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</label>*/}
          {/*<div*/}
          {/*  className="col-md-6 input-wrap has-feedback has-success"*/}
          {/*  style={{ position: 'relative', paddingRight: '20px' }}*/}
          {/*>*/}
          {/*  <Input*/}
          {/*    key={this.state.refreshKey}*/}
          {/*    field={{*/}
          {/*      name: 'ip',*/}
          {/*    }}*/}
          {/*    name="ip"*/}
          {/*    type="text"*/}
          {/*    value={this.state.displayValue.ip || this.state.displayValue.uuid}*/}
          {/*    placeholder={'192.168.2.100'}*/}
          {/*    groupstyle={{ margin: 'auto' }}*/}
          {/*    onChange={value => this.handleChange('ip', value)}*/}
          {/*  />*/}
          {/*  {this.state.validate.ip === false ?*/}
          {/*    <small className="help-block"*/}
          {/*       style={{*/}
          {/*         color: '#eb0000',*/}
          {/*         fontSize: '12px',*/}
          {/*         fontWeight: '400',*/}
          {/*       }}*/}
          {/*    >*/}
          {/*      {(!this.state.displayValue.ip || !this.state.displayValue.ip.trim().length) ? 'Ip is required!' : 'Ip invalid!'}*/}
          {/*    </small>*/}
          {/*    : null}*/}
          {/*</div>*/}
          <label
            htmlFor="telephone"
            className="col-md-6 control-label visible-lg-block"
            style={{
              fontSize: '12px',
              textAlign: 'left',
              fontWeight: 500,
              color: '#222222',
              marginTop: '10px',
            }}
          >
            Location:
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
                name: 'location',
              }}
              name="location"
              type="text"
              value={this.state.displayValue.location}
              placeholder={'Location'}
              groupstyle={{ margin: 'auto' }}
              onChange={value => this.handleChange('location', value)}
            />
          </div>
          <div
            className="col-md-6 input-wrap has-feedback has-success"
            style={{ position: "relative", paddingRight: "20px", marginTop: '10px', }}
          >
            <div className="checkbox-container" style={{ display: 'flex', }}>
              <input
                type="checkbox"
                id="change-pwd"
                name="change-pwd"
                checked={!!this.state.displayValue.distributeFlag}
                value={!!this.state.displayValue.distributeFlag}
                onChange={(event) => {
                  if (!!event.target.checked) {
                    this.setState({
                      displayValue: {
                        ...this.state.displayValue,
                        distributeFlag: true,
                      }
                    });
                  } else {
                    this.setState({
                      displayValue: {
                        ...this.state.displayValue,
                        distributeFlag: false,
                      }
                    });
                  }
                }}
              />
              <span
                style={{
                  marginLeft: '3px',
                  marginTop: '15px',
                  color: 'red',
                }}
              />
              <span style={{ marginLeft: '5px', color: '#000', fontWeight: '400', }}>{'Distribute'}</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-6 input-wrap has-feedback has-success"
               style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                 onClick={async () => {
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
                   const params = {
                     ...this.state.displayValue,
                     hide: undefined,
                     ieiId: this.state.displayValue.ieiId,
                     location: this.state.displayValue.location,
                     isEdit: !!this.props.data?.ieiId || !!this.props.data?.uuid,
                   };
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
                     this.state.validate.ieiIdError = { hasError: true, error: rp?.errorDescription || rp?.message };
                   }
                 }}
            >
              <span>{'SAVE'}</span>
            </div>
            <div style={{ marginLeft: '5px' }} className="button-btn w-80"
                 onClick={() => {
                   this.props.onClose && this.props.onClose();
                 }}
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
    this.state = { ...props };
    this.state.logFontWeight = '500';
    this.state.fileFontWeight = '300';
  }

  componentDidMount() {
  }

  render() {
    return (
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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div onClick={() => {
                this.setState({
                  processLog: this.state.selectedData,
                  fileManagement: ''
                }, () => {
                  if (!!this.state.processLog) {
                    this.setState({
                      logFontWeight: '500',
                      fileFontWeight: '300',
                    })
                  }
                })
              }}>
                <span style={{ fontWeight: this.state.logFontWeight, }}>{'Process Log'}</span>
                <span style={{
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: 300,
                  display: this.state.selectedData ? 'flex' : 'none'
                }}>
                            {this.state.selectedData ? 'Selected ' : ''}
                  {this.state.selectedData?.uuid ? 'PI: ' + this.state.selectedData?.uuid : ''}
                          </span>
              </div>
              <div style={{ marginLeft: '20px', borderLeft: '2px solid #000000' }}
                   onClick={() => {
                     this.setState({
                       fileManagement: this.state.selectedData,
                       processLog: ''
                     }, () => {
                       if (!!this.state.fileManagement) {
                         this.setState({
                           fileFontWeight: '500',
                           logFontWeight: '300',
                         })
                       }
                     })
                   }}
              >
                <div style={{ marginLeft: '20px', }}>
                  <span style={{ fontWeight: this.state.fileFontWeight, }}>{'File management'}</span>
                  <span style={{
                    color: '#000000',
                    fontSize: '14px',
                    fontWeight: 300,
                    display: this.state.selectedData ? 'flex' : 'none'
                  }}>
                                {this.state.selectedData ? 'Selected ' : ''}
                    {this.state.selectedData?.uuid ? 'PI: ' + this.state.selectedData?.uuid : ''}
                                </span>
                </div>
              </div>
            </div>
          </div>
          {!!this.state.processLog && (

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div
                className="button-btn w-150 ml-15"
                onClick={async () => {
                  if (this.state.selectedData) {
                    const params = {
                      options: {
                        uid: this.state.selectedData.uid,
                        msn: this.state.selectedData.msn,
                        piId: this.state.selectedData.id,
                      },
                      limit: 20,
                      offset: 0,
                    };
                    const rp = await getRelatedLogs(params);
                    this.setState({
                      relatedLogs: rp?.response?.results || [],
                      totalRecordsRelatedLog: rp?.response?.totalRows,
                      totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
                      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20 + 1),
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
                  value={this.state.searchMid || ''}
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
                        piId: this.state.selectedData.id,
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
                      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20 + 1),
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
                        piId: this.state.selectedData.id,
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
                      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20 + 1),
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

          )}
        </div>
        {!!this.state.processLog && (
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
                  <th className="table-th" scope="col">MSN</th>
                  {/*<th className="table-th" scope="col">TYPE</th>
                                <th className="table-th" scope="col">TOPIC</th>
                                <th className="table-th" scope="col">MID</th>
                                <th className="table-th" scope="col">COMMAND</th>*/}
                  <th className="table-th" scope="col">VIEW MESSAGE</th>
                  <th className="table-th" scope="col" style={{ textAlign: 'center', }}>STATUS</th>
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
                          {moment(it.createDate).format('YY-MM-DD HH:mm:ss')}
                        </td>
                        <td className="table-td">
                          {it.msn}
                        </td>
                        {/*
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
                                      */}
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
                            <IoMailUnreadOutline/>
                          </div>
                        </td>
                        <td className="table-td" style={{ textAlign: 'center', }}>
                          <div>
                            {it.ftpResStatus}
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
                <div className="col-sm-12 col-md-7 pagination"
                     style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
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
                          piId: this.state.selectedData.id,
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
                        pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20 + 1),
                        pageSizeRelatedLog: 20,
                        search: true,
                      });
                    }}
                    pageIndex={Math.floor(this.state.pageIndexRelatedLog)}
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
        )}

        {!!this.state.fileManagement && (

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
                  <th className="table-th" scope="col">Created Date</th>
                  <th className="table-th" scope="col">File Name</th>
                  <th className="table-th" scope="col">Ftp Respone Status</th>
                </tr>
                </thead>
                <tbody>
                {(this.state.meterFileData || [])
                  .map((it, index) => {
                    return (
                      <tr
                        key={index}
                      >
                        <td className="table-td">
                          {!!it.createdDate ? moment(it.createdDate).format('YY-MM-DD HH:mm:ss') : ''}
                        </td>
                        <td className="table-td">
                          {it.filename}
                        </td>
                        <td className="table-td">
                          {it.ftpResStatus}
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
                <div className="col-sm-12 col-md-7 pagination"
                     style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                  {this.state.totalRecordsMeterFileData > this.state.pageSizeMeterFileData && this.state.totalPagesMeterFileData >= 2 &&
                  <Pagination
                    href={this.props.asPath.replace(/\?.*/g, '')}
                    totalRecords={this.state.totalRecordsMeterFileData}
                    totalPages={this.state.totalPagesMeterFileData}
                    onPageChanged={async (query) => {
                      let paramsMeterFileData = {
                        options: {
                          piId: this.state.selectedData.id,
                        },
                        limit: 20,
                        offset: (query.pageIndex - 1) * 20,
                      };
                      let rpMeterFileData = await getMeterFileDatas(paramsMeterFileData);
                      this.setState({
                        meterFileData: rpMeterFileData?.response?.results || [],
                        totalRecordsMeterFileData: rpMeterFileData?.response?.totalRows,
                        totalPagesMeterFileData: Math.floor(((rpMeterFileData.response.totalRows || 0) + 19) / 20),
                        pageIndexMeterFileData: Math.floor((rpMeterFileData?.response?.offset + 19) / 20) + 1,
                        pageSizeMeterFileData: 20,
                      });
                    }}
                    pageIndex={this.state.pageIndexMeterFileData}
                    pageSize={this.state.pageSizeMeterFileData}
                    styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                  />
                  }
                </div>
              </div>

            </div>
          </div>
        )}
      </>
    )
  }
}

export default withNamespaces('common')(Homepage);
