import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { Button, CloseButton } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Box, Modal, Typography } from "@material-ui/core";
import { TotPage } from '@app/components/TotPage';
import { Pagination, ProgressLoading } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import 'moment-timezone';
import moment from 'moment';
import makeAnimated from 'react-select/animated';
import {
  getBlockOfBuilding,
  getBuilding,
  getBuildingUnits,
  getDMSLockVendors,
  getFloorLevels,
  getPASLocks,
  linkLocationLock,
  syncLocks,
  unLinkLocationLock,
} from '@app/api/log';
import ReactTooltip from "react-tooltip";
import Select from 'react-select';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';

const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

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

  :global(.button-btn-2) {
      display: flex;
      border-radius: 5px;
      height: 40px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      background-color: #FFFFFF;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      width: 230px;
      transition: 0.2s;

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
    logFontWeight: '500',
    fileFontWeight: '300',
  };

  static getInitialProps = async (args) => {
    const {
      query: {
        q,
        page,
        queryVendor,
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
      },
      asPath,
      req,
      initialState: {}
    } = args;

    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        queryVendor: queryVendor ? queryVendor : undefined,
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };

    const rp = await getPASLocks(params, req);

    const rpVendors = await getDMSLockVendors(req);
    const vendors = [];
    rpVendors?.response?.forEach((res) => {
      const vendor = {
        value: res.id,
        label: res.name,
        description: res.description,
      };
      vendors.push(vendor);
    });

    let slVendor;
    if (!!queryVendor) {
      const result = vendors.filter(vendor => vendor.value === parseInt(queryVendor));
      if (result.length > 0) {
        slVendor = result[0];
      }
    }

    const buildings = await getBuilding({limit: 10000}, req);
    let searchBuilding = (buildings.results || []).filter(bd => bd.id == queryBuilding)[0];
    if (searchBuilding) {
      searchBuilding = {value: searchBuilding.id, label: searchBuilding.id + ' - ' + searchBuilding.name};
    }

    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
      totalRecords: rp.response?.totalRows || 0,
      totalPages: Math.floor(((rp.response?.totalRows || 0) + 19) / 20),
      pageIndex: pageNumber,
      pageSize: 20,
      page,
      locks: rp?.response?.results || [],
      vendors,
      searchVendor: slVendor,
      params,
      buildings,
      searchBuilding,
    };
  }

  async componentDidMount() {
    await this.setState({loading: true});
    let buildings = this.props.buildings;
    let searchBuilding = (buildings.results || []).filter(bd => bd.id == this.props?.params?.options?.queryBuilding)[0];
    if (searchBuilding) {
      let buildingId = searchBuilding.id;
      searchBuilding = {value: searchBuilding.id, label: searchBuilding.id + ' - ' + searchBuilding.name};

      this.state.blocks = await getBlockOfBuilding({limit: 10000, options: {buildingId: buildingId}});
      let searchBlock = (this.state.blocks?.results || []).filter(bd => bd.id == this.props.params.options.queryBlock)[0];
      let blockId = searchBlock?.id;
      this.state.searchBlock = !searchBlock ? undefined : {value: searchBlock?.id, label: searchBlock?.id + ' - ' + searchBlock?.name};

      this.state.floorLevels = await getFloorLevels({limit: 10000, options: {buildingId, blockId}});
      let searchFloorLevel = (this.state.floorLevels?.results || []).filter(bd => bd.id == this.props.params.options.queryFloorLevel)[0];
      if (searchFloorLevel) {
        this.state.buildingUnits = await getBuildingUnits({limit: 10000, options: {floorLevelId: searchFloorLevel.id}});
        this.state.searchFloorLevel = {value: searchFloorLevel.id, label: searchFloorLevel.id + ' - ' + searchFloorLevel.name};
        let searchBuildingUnit = (this.state.buildingUnits?.results || []).filter(bd => bd.id == this.props.params.options.queryBuildingUnit)[0];
        if (searchBuildingUnit) {
          this.state.searchBuildingUnit = {value: searchBuildingUnit.id, label: searchBuildingUnit.id + ' - ' + searchBuildingUnit.name};
        }
      }
    }
    this.setState({
      buildings,
      searchBuilding,
      loading: false,
      buildingsOptions: buildings.results || [],
    });
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'DMS Locks'}>
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
                    <h5 className="site-title">{'DMS Locks'}</h5>
                  </div>
                  <div
                    style={{
                      padding: '0px 30px',
                      // borderBottom: '1px solid #ddd',
                      overflow: "inherit",
                      paddingBottom: '30px',
                      pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                    }}
                  >
                    <div style={{ marginTop: '20px', width: '100%' }}>
                      <div
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'center',
                          gap: '10px',
                          flexDirection: 'column',
                        }}
                        className="box-item"
                      >
                        <div
                          style={{
                            display: 'flex',
                            width: '24%'
                          }}
                          className="item"
                        >
                          <Select
                            className="select-vendor w-full"
                            components={animatedComponents}
                            value={this.state.searchVendor || { value: '', label: "Select vendor" }}
                            options={this.state.vendors || []}
                            onChange={(event) => {
                              if (!event.value) {
                                this.setState({
                                  searchVendor: undefined,
                                });
                              } else {
                                this.setState({
                                  searchVendor: event
                                });
                              }
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-between',
                            gap: '25px'
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
                              field={{
                                name: 'buildingId',
                              }}
                              className="multi-select-address"
                              components={animatedComponents}
                              value={this.state.searchBuilding || {value: '', label: "Select building" }}
                              options={[{
                                id: '',
                                name: "Select building"
                              }].concat(this.state.buildingsOptions).map(bd => {
                                bd = bd || {id: 100, name: 'lol'};
                                return {
                                  value: bd.id,
                                  label: bd.id + ' - ' + bd.name
                                }
                              })}
                              onChange={async (event) => {
                                if (!event.value) {
                                  this.setState({
                                    searchBuilding: undefined,
                                    searchBlock: undefined,
                                    searchFloorLevel: undefined,
                                    searchBuildingUnit: undefined,
                                    blocks: [],
                                    floorLevels: [],
                                    buildingUnits: [],
                                  });
                                } else {
                                  this.setState({ searchBuilding: event });
                                  let blocks = [];
                                  blocks = await getBlockOfBuilding({ limit: 10000, options: { buildingId: event.value } });

                                  let floorLevels = [];
                                  floorLevels = await getFloorLevels({ limit: 10000, options: { buildingId: event.value } });
                                  this.setState({
                                    blocks,
                                    floorLevels,
                                    buildingUnits: [],
                                    selectedBlock: undefined,
                                    searchBlock: undefined,
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
                              key={this.state.refreshAddressKey}
                              field={{
                                name: 'blockId',
                              }}
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
                                    searchFloorfLevel: undefined,
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
                              key={this.state.refreshAddressKey}
                              field={{
                                name: 'flvId',
                              }}
                              className="multi-select-address"
                              components={animatedComponents}
                              value={this.state.searchFloorLevel || { value: '', label: "Select floorLevel" }}
                              options={[{
                                id: '',
                                name: "Select floorLevel"
                              }].concat(this.state.floorLevels?.results || []).map(bd => ({
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
                                    searchFloorLevel: event,
                                    refreshAddressKey: Date.now(),
                                  });
                                  let buildingUnits = await getBuildingUnits({
                                    limit: 10000,
                                    options: { floorLevelId: event.value }
                                  });
                                  this.setState({
                                    buildingUnits,
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
                              field={{
                                name: 'bunId',
                              }}
                              className="multi-select-address"
                              components={animatedComponents}
                              value={this.state.searchBuildingUnit || { value: '', label: "Select buildingUnit" }}
                              options={[{
                                id: '',
                                name: "Select buildingUnit"
                              }].concat(this.state.buildingUnits?.results || []).map(bd => ({
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
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: '15px'
                      }}
                    >
                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                      <div
                        data-tip="Apply filters and search"
                        className="button-btn w-80"
                      >
                        <span
                          onClick={() => {
                            const options = {
                              queryVendor: this.state.searchVendor?.value || undefined,
                              queryBuilding: this.state.searchBuilding?.value || undefined,
                              queryBlock: this.state.searchBlock?.value || undefined,
                              queryFloorLevel: this.state.searchFloorLevel?.value || undefined,
                              queryBuildingUnit: this.state.searchBuildingUnit?.value || undefined,
                            };
                            let pathName = window.location.pathname;

                            if (Object.keys(options).length) {
                              pathName = pathName.concat("?");

                              if (!!options.queryVendor) {
                                pathName = pathName.concat(`queryVendor=${options.queryVendor}&`)
                              }
                              if (!!options.queryBuilding) {
                                pathName = pathName.concat(`queryBuilding=${options.queryBuilding}&`)
                              }
                              if (!!options.queryBlock) {
                                pathName = pathName.concat(`queryBlock=${options.queryBlock}&`)
                              }
                              if (!!options.queryFloorLevel) {
                                pathName = pathName.concat(`queryFloorLevel=${options.queryFloorLevel}&`)
                              }
                              if (!!options.queryBuildingUnit) {
                                pathName = pathName.concat(`queryBuildingUnit=${options.queryBuildingUnit}&`)
                              }
                              pathName = pathName.slice(0, pathName.length - 1)
                              require('@app/utils/next-routes').Router.pushRoute(pathName);
                            }
                          }}
                        >
                          {'SEARCH'}
                        </span>
                      </div>
                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                      <div
                        data-tip="Clear all filters"
                        className="button-btn w-80 ml-10"
                        onClick={() => {
                          this.setState({
                            searchVendor: undefined,
                            searchBuilding: undefined,
                            searchBlock: undefined,
                            searchFloorLevel: undefined,
                            searchBuildingUnit: undefined,
                          });
                          const pathName = window.location.pathname;
                          require('@app/utils/next-routes').Router.pushRoute(pathName);
                        }}
                      >
                        <span>{'CLEAR'}</span>
                      </div>
                      <div
                        data-tip="Sync locks"
                        className="button-btn w-120 ml-10"
                        onClick={() => {
                          if (!this.state.searchVendor?.value) {
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>Select vendor before sync locks</p>`,
                              icon: 'error',
                              confirmButtonText: 'OK',
                            });
                            return;
                          }
                          syncLocks({ vendor: this.state.searchVendor.value });
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>Synchronize request was sent successfully. It is taking time, please refresh page later !</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          });
                        }}
                      >
                        <span>{'SYNC LOCKS'}</span>
                      </div>
                      <div
                        data-tip="Import lock"
                        className="button-btn w-120 ml-10"
                        onClick={() => {
                          this.setState({openUploadLock: true});
                        }}
                      >
                        <span>{'IMPORT LOCK'}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }}
                    className="doctor-list">
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                      <table className="table">
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col">ID</th>
                          <th className="table-th" scope="col">LOCK NAME</th>
                          <th className="table-th" scope="col">LOCK ESN</th>
                          <th className="table-th" scope="col">LOCK NUMBER</th>
                          <th className="table-th" scope="col">LOCK BID</th>
                          <th className="table-th" scope="col">VENDOR</th>
                          <th className="table-th" scope="col">Location</th>
                          <th className="table-th" scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.locks || [])
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
                                onClick={() => {
                                  this.setState({
                                    selectedRow: {...it},
                                  })
                                }}
                              >
                                <td className="table-td">
                                  {it.originalId}
                                </td>
                                <td className="table-td">
                                  {it.lockName}
                                </td>
                                <td className="table-td">
                                  {it.lockEsn}
                                </td>
                                <td className="table-td">
                                  {it.lockNumber || it.lock_number}
                                </td>
                                <td className="table-td">
                                  {it.lockBid || it.bid}
                                </td>
                                <td className="table-td">
                                  {it?.vendor?.name}
                                </td>
                                <td className="table-td">
                                  {it?.homeAddress}
                                </td>
                                  <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                      {/*<ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>*/}
                                      {/*<div
                                        data-tip="Click to edit site location, user group"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={() => this.setState({ rowData: JSON.parse(JSON.stringify(it)) })}
                                      >
                                        <span><i className="fa fa-universal-access"/></span>
                                      </div>*/}
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to update location"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={() => {
                                          this.setState({
                                            updateLocation: true,
                                            selectedRow: {...it},
                                          })
                                        }}
                                      >
                                        <span><i className="fa fa-edit"/></span>
                                      </div>
                                      {/*<ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>*/}
                                      {/*<div
                                        className="button-icon ml-5"
                                        data-tip="Click to remove site"
                                        onClick={async () => {
                                          let result = await Swal.fire({
                                            html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                                            icon: 'question',
                                            confirmButtonText: 'OK',
                                            cancelButtonText: 'Cancel',
                                            showCancelButton: true,
                                          });
                                          if (result && result.isConfirmed) {
                                            let rp = await deleteDMSLock({ id: it.id });
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
                                        <span><i className="fa fa-trash-o"/></span>
                                      </div>*/}
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
                          {this.state.totalRecords > 1 && this.state.totalPages >= 2 &&
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

                  <Modal open={this.state.openUploadLock}>
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
                      <CloseButton className="w-5 h-5" onClick={() => this.setState({openUploadLock: false})}/>
                      <Typography variant="h6" component="h2" style={{marginBottom: '20px'}}>
                        Upload Locks CSV file
                      </Typography>
                      <input
                        style={{marginBottom: '5px'}}
                        type="file"
                        placeholder={'File upload'}
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file.name.includes(".csv") || file.name.includes(".xlsx")) {
                            this.setState({lockFile: event.target.files[0]});
                          } else {
                            this.setState({lockFile: null});
                          };
                        }}
                      />
                      <br/>
                      <a style={{textDecoration: 'underline'}} download href={'/api/upload-dmslock/template'} target='_blank'>Download template</a>
                      <br/>
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <div
                          className="button-btn"
                          style = {{
                            cursor: 'pointer', display: 'flex',
                            justifyContent: 'center', alignItems: 'center',
                            borderRadius: '5px', border: '0.5px solid #007bff',
                            width: '100px', height: '40px', marginRight: '10px',
                            fontSize: '20px',
                          }}
                          onClick = {async () => {
                            if (this.state.lockFile) {
                              let rp = null;
                              const formData = new FormData();
                              formData.append('file', this.state.lockFile, this.state.lockFile.name);
                              const url = '/api/dms-lock/upload';
                              const method = 'POST';

                              await this.setState({loading: true, openUploadLock: false,});
                              rp = await fetch(url,
                                {
                                  method,
                                  headers: {
                                    'A_C': getCookie('app_code'),
                                    'Authorization': getCookie('access_token'),
                                  },
                                  body: formData,
                                },
                              )
                                .then(response => response.blob())
                                .then(response => rp = response)
                                .catch((error) => {
                                  console.error('Error:', error);
                                  this.setState({
                                    lockFile: null,
                                    openUploadLock: false,
                                    loading: false,
                                  });
                                });

                                await this.setState({loading: false});
                                if (rp) {
                                  try {
                                    let jsonRP = JSON.parse(await rp.text());
                                    if (jsonRP.success === false) {

                                      Swal.fire({
                                        html: `<p style='text-align: center; font-size: 14px;'>${jsonRP?.errorDescription || jsonRP?.message || 'Error'}</p>`,
                                        icon: 'error',
                                        confirmButtonText: 'OK',
                                      });
                                      return;
                                    }
                                  } catch(error) {

                                  }
                                  const tag =  moment(new Date()).format('YYYYMMDDHHmmss');
                                  const fileName = 'import-lock-result-' + tag + '.csv';
                                  const url = window.URL.createObjectURL(new Blob([rp]));
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.setAttribute('download', fileName);
                                  document.body.appendChild(link);
                                  link.click();
                                  link.parentNode.removeChild(link);

                                  this.setState({
                                    lockFile: null,
                                    openUploadLock: false,
                                  });
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
                                }
                            }
                          }}
                        >
                          <span>Upload</span>
                        </div>
                        <div
                          className="button-btn"
                          style = {{
                            cursor: 'pointer', display: 'flex',
                            justifyContent: 'center', alignItems: 'center',
                            borderRadius: '5px', border: '0.5px solid #007bff',
                            width: '100px', height: '40px',
                            fontSize: '20px',
                          }}
                          onClick = {() => {
                            this.setState({openUploadLock: false});
                          }}
                        >
                          <span>Cancel</span>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </>
                : null}

          {!!this.state.updateLocation && (
            <PEdit
              buildingsOptions={this.state.buildingsOptions || []}
              selectedRow={this.state.selectedRow}
              setParentState={s => this.setState({...s})}
            />
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

class PEdit extends React.Component {

  state = {
    ...this.props,
  }

  async componentDidMount() {

    let it = this.state.selectedRow || {};
    this.setState({
      building: !!it.building?.id ? {value: it.building.id, label: it.building.id + ' - ' + it.building.name} : undefined,
      block: !!it.block?.id ? {value: it.block.id, label: it.block.id + ' - ' + it.block.name} : undefined,
      floorLevel: !!it.floorLevel?.id ? {value: it.floorLevel.id, label: it.floorLevel.id + ' - ' + it.floorLevel.name} : undefined,
      buildingUnit: !!it.buildingUnit?.id ? {value: it.buildingUnit.id, label: it.buildingUnit.id + ' - ' + it.buildingUnit.name} : undefined,
      linkLockLocationId: it.linkLockLocationId,
    }, async () => {
      let blocks = [];
      if (!!it.building?.id) {
        blocks = await getBlockOfBuilding({ limit: 10000, options: { buildingId: it.building?.id } })
      }
      let floorLevels = [];
      if (!!it.block?.id) {
        floorLevels = await getFloorLevels({limit: 10000, options: { blockId: it.block?.id}});
      }
      let buildingUnits = [];
      if (!!it.floorLevel?.id) {
        buildingUnits = await getBuildingUnits({limit: 10000, options: { floorLevelId: it.floorLevel?.id }});
      }
      this.setState({
        blocks,
        floorLevels,
        buildingUnits,
      })
    })
  }

  render() {

    return (
            <div
              style={{
                backgroundColor: 'transparent',
                position: 'fixed',
                width: '100%',
                height: '100%',
                zIndex: 10,
                borderRadius: '5px',
                padding: '0px 30px 15px 30px',
                color: '#000000',
                justifyContent: 'space-between',
                top: '0',
                marginTop: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'auto',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '600px',
                padding: '30px 30px 30px 0px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
              }}>

                <div style={{
                  display: 'flex',
                  justifyContent: 'between',
                  alignItems: 'center',
                  marginLeft: '20px'
                }}>
                  <button
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%', border: '2px',
                      borderColor: 'transparent', border: 'unset',
                      outline: 'unset',
                    }}
                    onClick={() => {
                      this.setState({ updateLocation: '' });
                      this.props.setParentState && this.props.setParentState({updateLocation: ''})
                    }}
                  >
                    <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
                  </button>
                  <span style={{fontWeight: '500', marginLeft: '15px'}}>Update</span>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  // width: '100%',
                  marginTop: '20px',
                  marginLeft: '25px'
                }}>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '10px',
                      }}
                      className="item"
                    >
                      <span>Lock name: </span>
                      <input
                        style={{
                          outline: 'none',
                          paddingLeft: '10px',
                          paddingRight: '10px',
                          border: '1px solid #cccccc',
                          borderRadius: '4px',
                          minHeight: '38px',
                          color: '#333333',
                        }}
                        value={this.state.selectedRow?.lockName}
                        onChange={evt => {
                          this.setState({
                            selectedRow: {
                              ...this.state.selectedRow,
                              lockName: evt.target.value,
                            }
                          })
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '10px',
                      }}
                      className="item"
                    >
                      <span>Building: </span>
                      <Select
                        field={{
                          name: 'buildingId',
                        }}
                        className="multi-select-address"
                        components={animatedComponents}
                        value={this.state.building || {value: '', label: "Select building" }}
                        options={[{
                          id: '',
                          name: "Select building"
                        }].concat(this.state.buildingsOptions).map(bd => {
                          bd = bd || {id: 100, name: 'lol'};
                          return {
                            value: bd.id,
                            label: bd.id + ' - ' + bd.name
                          }
                        })}
                        onChange={async (event) => {
                          if (!event.value) {
                            this.setState({
                              building: undefined,
                              block: undefined,
                              floorLevel: undefined,
                              buildingUnit: undefined,
                              blocks: [],
                              floorLevels: [],
                              buildingUnits: [],
                            });
                          } else {
                            this.setState({ building: event });
                            let blocks = [];
                            blocks = await getBlockOfBuilding({ limit: 10000, options: { buildingId: event.value } });

                            let floorLevels = [];
                            floorLevels = await getFloorLevels({ limit: 10000, options: { buildingId: event.value } });
                            this.setState({
                              blocks,
                              floorLevels,
                              buildingUnits: [],
                              selectedBlock: undefined,
                              block: undefined,
                              floorLevel: undefined,
                              buildingUnit: undefined,
                            });
                          }
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '10px',
                      }}
                      className="item"
                    >
                      <span>Block: </span>
                      <Select
                        key={this.state.refreshAddressKey}
                        field={{
                          name: 'blockId',
                        }}
                        className="multi-select-address"
                        components={animatedComponents}
                        value={this.state.block || { value: '', label: "Select block" }}
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
                              block: undefined,
                              floorLevel: undefined,
                              buildingUnit: undefined,
                              floorLevels: [],
                              buildingUnits: [],
                            });
                          } else {
                            this.setState({
                              block: event
                            });
                            let floorLevels = [];
                            floorLevels = await getFloorLevels({
                              limit: 10000,
                              options: { blockId: event.value, buildingId: this.state.searchBuilding?.id }
                            });
                            this.setState({
                              floorLevels,
                              buildingUnits: [],
                              floorLevel: undefined,
                              buildingUnit: undefined,
                            });
                          }
                        }}
                      />
                   </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '10px',
                      }}
                      className="item"
                    >
                      <span>Floor: </span>
                      <Select
                        key={this.state.refreshAddressKey}
                        field={{
                          name: 'flvId',
                        }}
                        className="multi-select-address"
                        components={animatedComponents}
                        value={this.state.floorLevel || { value: '', label: "Select floorLevel" }}
                        options={[{
                          id: '',
                          name: "Select floorLevel"
                        }].concat(this.state.floorLevels?.results || []).map(bd => ({
                          value: bd.id,
                          label: bd.id + ' - ' + bd.name
                        }))}
                        onChange={async (event) => {
                          if (!event.value) {
                            this.setState({
                              floorLevel: undefined,
                              buildingUnit: undefined,
                              buildingUnits: [],
                            });
                          } else {
                            this.setState({
                              floorLevel: event,
                              refreshAddressKey: Date.now(),
                            });
                            let buildingUnits = await getBuildingUnits({
                              limit: 10000,
                              options: { floorLevelId: event.value }
                            });
                            this.setState({
                              buildingUnits,
                              buildingUnit: undefined
                            });
                          }
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '10px',
                      }}
                      className="item"
                    >
                      <span>Building Unit: </span>
                      <Select
                        field={{
                          name: 'bunId',
                        }}
                        className="multi-select-address"
                        components={animatedComponents}
                        value={this.state.buildingUnit || { value: '', label: "Select buildingUnit" }}
                        options={[{
                          id: '',
                          name: "Select buildingUnit"
                        }].concat(this.state.buildingUnits?.results || []).map(bd => ({
                          value: bd.id,
                          label: bd.id + ' - ' + bd.name
                        }))}
                        onChange={(event) => {
                          if (!event.value) {
                            this.setState({
                              buildingUnit: undefined,
                            });
                          } else {
                            this.setState({
                              buildingUnit: event
                            });
                          }
                        }}
                      />
                    </div>

                </div>
                <div style={{
                  marginTop: '5px',
                  display: 'flex',
                  float: 'right',
                  marginLeft: '20px'
                }}>

                  {!!this.state.selectedRow?.linkLockLocationId && (
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn"
                    onClick={async () => {

                      console.info('this.state.selectedRow ', this.state.selectedRow);

                      if (!this.state.selectedRow?.lockName || !this.state.selectedRow?.lockName.trim().length) {
                        Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>${'lockName invalid'}</p>`,
                          icon: 'error',
                          confirmButtonText: 'OK',
                        })
                        return;
                      }
                      if (!!this.state.selectedRow?.id) {
                        let result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });

                        if (!result || !result.isConfirmed) return;

                        let params = {
                          lockId: this.state.selectedRow?.id,
                          lockName: this.state.selectedRow?.lockName,
                          linkLockLocationId: this.state.selectedRow?.linkLockLocationId,
                        };

                        let rp = await unLinkLocationLock(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              require('@app/utils/next-routes').Router.pushRoute(window.location.href);
                            })
                        } else {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          })
                          this.setState({
                            showEditRole: false,
                          })
                        }
                      }
                    }}
                  >
                    <span>{'Clear'}</span>
                  </div>
                  )}

                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn"
                    onClick={async () => {

                      console.info('this.state.selectedRow ', this.state.selectedRow);
                      if (!this.state.selectedRow?.lockName || !this.state.selectedRow?.lockName.trim().length) {
                        Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>${'lockName invalid'}</p>`,
                          icon: 'error',
                          confirmButtonText: 'OK',
                        })
                        return;
                      }
                      if (!!this.state.selectedRow?.id) {

                        if (!this.state.buildingUnit?.value) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${'Unit is required!'}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          })
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

                        let params = {
                          lockId: this.state.selectedRow?.id,
                          lockName: this.state.selectedRow?.lockName,
                          buildingId: this.state.building?.value,
                          blockId: this.state.block?.value,
                          floorLevelId: this.state.floorLevel?.value,
                          buildingUnitId: this.state.buildingUnit?.value,
                        };

                        let rp = await linkLocationLock(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              require('@app/utils/next-routes').Router.pushRoute(window.location.href);
                            })
                        } else {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          })
                          this.setState({
                            showEditRole: false,
                          })
                        }
                      }
                    }}
                  >
                    <span>{'Update'}</span>
                  </div>
                  <div
                    style={{
                      marginLeft: '15px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                      width: '85px'
                    }}
                    className="button-btn-2"
                    onClick={async () => {
                      this.setState({ updateLocation: '' });
                      this.props.setParentState && this.props.setParentState({updateLocation: ''})
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
            </div>
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
