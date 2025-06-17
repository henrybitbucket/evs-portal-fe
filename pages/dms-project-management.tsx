import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Input, Pagination, ProgressLoading, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import DatePicker from "react-datepicker";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { getCookie } from '@app/utils/cookie';

import {
  getEachUserPermissions,
  getUserGroups,
  getUserPlatforms,
  getUserProjects,
  updatePermission,
  updateUserGroup,
  updateUserPlatform,
  updateUserProject,
  getUsers,
} from '@app/api/user';
import {
  deleteDMSSite,
  getBlockOfBuilding,
  getBuilding,
  getBuildingUnits,
  getDMSSiteLocations,
  getDMSSites,
  getDMSSiteWorkOrders,
  getFloorLevels,
  getGroupUsers,
  getPermission,
  getProjectTags,
  getRoles,
  linkLocationSite,
  saveDMSSite,
  unLinkLocationSite,
  getDMSProjects,
  saveDMSProject,
  deleteDMSProject,
  linkProjectSite,
  getDMSPicUsers,
  linkProjectPicUser,
} from '@app/api/log';
import ReactTooltip from 'react-tooltip';

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
    overflow: visible;
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

  :global(.input-wrap>div>div>input) {
    width: 100%;
    outline: none;
    border: 1px solid #e1e1e1;
    border-radius: 3px;
    padding-left: 10px;
  }

  :global(.input-wrap>div) {
    width: 100%;
  }

  :global(.input-wrap>div>div) {
    width: 100%;
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
    :global(.date-picker) {
        min-height: 36px;
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
      &:hover {
        background-color: #c5c6d0;
        color: #c5c6d0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        transition: 0.2s;
    }
  }
  :global(.button-btn-3) {
      display: flex;
      border-radius: 0px;
      height: 40px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      background-color: #FFFFFF;
      font-size: 14px; 
      font-weight: 500;
      color: #FFFFFF;
      width: 120px;
      transition: 0.2s;
      &:hover {
       
    }
  }
    :global(.checkbox-container) {
      display: flex;
      flexDirection: row;
      align-items: center;
      margin-right: 30px;
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
        font-weight: 500;
      }
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
  };

  static getInitialProps = async (args) => {
    let {
      query: {
        q,
        page,
        queryName,
        queryDisplayName,
      }, asPath,
      req,
      initialState
    } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      options: {
        queryName,
        queryDisplayName,
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };
    let rp = await getDMSProjects(params, req);
    rp = rp || {};

    const buildings = {};//await getBuilding({limit: 10000}, req);
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

      users: rp.results || [],
      totalRecords: rp.totalRows || 0,
      totalPages: Math.floor(((rp.totalRows || 0) + 19) / 20),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.totalRows || 0) + 19) / 20),
      loggerInUser: initialState.userInfo,
      searchName: params.options.queryDisplayName,
      searchDisplayName: params.options.queryDisplayName,
      params,
      buildings,
      searchBuilding,
    };
  }

  async componentDidMount() {
    this.setState({ mapKey: Date.now() });

    /*
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
    */
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Project Management'}>
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
              {!!this.state.itemEdit ?
                <PEdit
                  data={this.state.itemEdit}
                  companies={this.state.companies || []}
                  payments={this.state.payments || []}
                  keys={this.state.keys || []}
                  keyGroups={this.state.keyGroups || []}
                  lockGroups={this.state.lockGroups || []}
                  isEdit={!!this.state.itemEdit?.id}
                  onClose={() => {
                    this.setState({ itemEdit: null })
                    require('@app/utils/next-routes').Router.pushRoute(window.location.href);
                  }}
                  onSave={() => {
                    window.location.href = window.location.href;
                  }}
                />
                : null
              }
              {!!this.state.rowData ?
                <RowInfo
                  key={this.state.refreshEditKey || Date.now()}
                  data={this.state.rowData}
                  onClose={() => {
                    this.setState({ rowData: null })
                  }}
                  onSave={() => {
                    window.location.href = window.location.href;
                  }}
                />
                : null
              }
              {!this.state.itemEdit && !this.state.rowData ?
                <>
                  <div style={{
                    padding: '15px',
                    paddingTop: '20px',
                    paddingBottom: '0px',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: '#000000'
                  }}>
                    <h5 className="site-title">Project Management</h5>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: '15px',
                      padding: '0px 30px',
                      gap: '15px',
                      overflow: "inherit",
                    }}
                    className="box-item"
                  >
                    <div
                      style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '25px',
                      width: '100%',
                    }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flex: 1
                        }}
                        className="item">
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
                          value={ this.state.searchName || '' }
                          placeholder="Search name..."
                          onChange={event => this.setState({ searchName: event.target.value })}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flex: 1
                        }}
                        className="item">
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
                          value={ this.state.searchDisplayName || '' }
                          placeholder="Search display name..."
                          onChange={event => this.setState({ searchDisplayName: event.target.value })}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flex: 1
                        }}
                        className="item">
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flex: 1
                        }}
                        className="item">
                      </div>
                    </div>
                    {/*
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
                    */}
                  </div>
                  <div style={{
                    padding: '30px',
                    borderBottom: '1px solid #ddd',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    display: 'flex'
                  }}>
                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                    <div
                      data-tip="Apply filters and search"
                      className="button-btn w-80 mr-10"
                      onClick={() => {
                        const options = {
                          queryName: this.state.searchName || undefined,
                          queryDisplayName: this.state.searchDisplayName || undefined,
                        };
                        let pathName = window.location.pathname;
                        if (Object.keys(options)?.length) {
                          pathName = pathName.concat("?");
                          if (!!options.queryName) {
                            pathName = pathName.concat(`queryName=${options.queryName}&`)
                          }
                          if (!!options.queryDisplayName) {
                            pathName = pathName.concat(`queryDisplayName=${options.queryDisplayName}&`)
                          }
                          pathName = pathName.slice(0, pathName.length - 1);
                          require('@app/utils/next-routes').Router.pushRoute(pathName);
                        }
                      }}
                    >
                      <span>{'SEARCH'}</span>
                    </div>
                    <div
                      data-tip="Clear all filters"
                      className="button-btn w-80 mr-10"
                      onClick={() => {
                        this.setState({
                          searchName: undefined,
                          searchSite: undefined,
                          searchGroup: undefined,
                        });
                        const pathName = window.location.pathname;
                        require('@app/utils/next-routes').Router.pushRoute(pathName);
                      }}
                    >
                      <span>{'CLEAR'}</span>
                    </div>
                    <div
                      data-tip="Add new project"
                      className="button-btn w-160 mr-30"
                      onClick={() => this.setState({
                        itemEdit: {
                          name: null,
                          start: Date.now(),
                          end: Date.now(),
                        }
                      })}
                    >
                      <span>{'ADD NEW PROJECT'}</span>
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '500px', }}
                    className='doctor-list'>
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', }}>
                      <table className='table'>
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col">ID</th>
                          <th className="table-th" scope="col">Name</th>
                          <th className="table-th" scope="col">Display Name</th>
                          <th className="table-th" scope="col">PIC User</th>
                          <th className="table-th" scope="col">Start</th>
                          <th className="table-th" scope="col">End</th>
                          {!!this.state.loggerInUser.authorities.filter(auth => auth.authority === "SUPER_ADMIN" || auth.authority === (getCookie('app_code') + "_SUPER_ADMIN")).length && (
                            <th className="table-th" scope="col">Action</th>
                          )}
                        </tr>
                        </thead>

                        <tbody>
                        {(this.state.users || [])
                          .map((it, index) => {
                            return (
                              <tr key={index}>
                                <td className="table-td">
                                  {it.id}
                                </td>
                                <td className="table-td">
                                  <span>{it.name}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.displayName}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.picUser}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.start ? moment(new Date(it.start)).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.end ? moment(new Date(it.end)).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                                </td>
                                {!!this.state.loggerInUser.authorities.filter(auth => auth.authority === "SUPER_ADMIN" || auth.authority === (getCookie('app_code') + "_SUPER_ADMIN")).length && (
                                  <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to edit site, pic user"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={async () => {
                                          let params = {
                                            options: {
                                              projectId: it.id,
                                            },
                                            limit: 1,
                                            offset: 0,
                                          };
                                          let rp = await getDMSProjects(params, null);
                                          this.setState({
                                            rowData: JSON.parse(JSON.stringify(rp?.results[0])),
                                          })
                                        }}
                                      >
                                        <span><i className="fa fa-universal-access"/></span>
                                      </div>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to edit project"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={async () => {
                                          let params = {
                                            options: {
                                              projectId: it.id,
                                            },
                                            limit: 1,
                                            offset: 0,
                                          };
                                          let rp = await getDMSProjects(params, null);
                                          this.setState({
                                            itemEdit: JSON.parse(JSON.stringify(rp?.results[0])),
                                          })
                                        }}
                                      >
                                        <span><i className="fa fa-edit"/></span>
                                      </div>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
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
                                            this.setState({loading: true});
                                            let rp = await deleteDMSProject({ id: it.id });
                                            this.setState({loading: false});
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
                                      </div>
                                    </div>
                                  </td>
                                )}
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
                          {this.state.totalRecords > 1 && this.state.totalPages >= 2 && (
                            <Pagination
                              href={this.props.asPath.replace(/\?.*/g, '')}
                              totalRecords={this.state.totalRecords}
                              totalPages={this.state.totalPages}
                              onPageChanged={(query) => {

                                let pathname = window.location.pathname;
                                let search = window.location.search
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
        'description',
        'radius',
        'remark',
        'picUser',
        'subPicUsers',
      ],
      isEdit: this.props.isEdit,
    };
  }

  async componentDidMount() {
    const params = {
      options: {
      },
      limit: 10000,
      offset: 0,
    };
    const rp = await getDMSPicUsers(params);
    this.setState({
      picUsers: rp?.response?.results || [],
    })
  }

  handleChange(field, value) {

    if (field === 'company') {
      this.state.displayValue.company = { companyID: value };
      this.validate('roles');
    } else {
      this.state.displayValue[field] = value;
      this.validate(field);
    }

    this.setState({ displayValue: { ...this.state.displayValue } })
  }

  validate(field) {

    if (this.state.ignores.indexOf(field) > -1) {
      return true;
    }

    let value = this.state.displayValue[field];
    if (field === 'lng' || field === 'lat') {
      this.state.validate[field] = !value || !isNaN(Number((value + '').toLowerCase().trim()))
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
    console.log("this.state.displayValue", this.state.displayValue)
    return (
      <div style={{ paddingTop: '15px', flex: 1 }}>
        <div className="col-md-6">
          <div
            style={{
              height: '50px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#eff1f3',
              borderRadius: '5px',
              marginBottom: '10px',
              padding: '5px'
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>{!!this.state.isEdit ? 'Edit project' : 'Add new project'}</span>
            <button
              type="button"
              className="button-btn w-80"
              onClick={() => {
                this.props.onClose && this.props.onClose();
              }}
            >
              <span>{'BACK'}</span>
            </button>
          </div>
        </div>
        <div className="form-group ml-10">
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
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <Input
              key={this.state.refreshKey}
              field={{
                name: "name"
              }}
              name="label"
              value={this.state.displayValue.name}
              placeholder={"Name"}
              groupstyle={{ margin: "auto" }}
              onChange={value => this.handleChange('name', value)}
            />
            {this.state.validate.name === false ?
              <small
                className="help-block"
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

        {!!this.state.displayValue.id && (
        <div className="form-group ml-10">
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
            Display Name :
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
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <Input
              key={this.state.refreshKey}
              field={{
                name: "displayName"
              }}
              name="label"
              disabled={!!this.state.displayValue.id}
              value={this.state.displayValue.displayName}
              placeholder={"Display Name"}
              groupstyle={{ margin: "auto", pointerEvents: 'none' }}
            />
          </div>
        </div>
        )}
        <div className="form-group ml-10">
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
            PIC User :
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
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <SelectCustom
              field={{
                name: 'chartStyle',
              }}
              name="chartStyle"
              options={[
                ...(
                  this.state.picUsers?.filter(pic => !(this.state.displayValue?.subPicUsers?.map(sub => sub.value))?.includes(pic.email)) || [
                  ]
                ).map(item => ({
                  label: item.email,
                  value: item.email,
                })),
              ]}
              value={this.state.displayValue.picUser}
              onChange={(field, value) => {
                this.setState({
                  displayValue: {
                    ...this.state.displayValue,
                    picUser: value.value,
                  }
                });
              }}
            />
          </div>
        </div>
        <div className="form-group ml-10">
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
            Sub PIC Users :
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
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <Select
              className="select-vendor w-full"
              components={animatedComponents}
              value={this.state.displayValue.subPicUsers?.map(sub => {
                return {
                  value: sub?.value ? sub.value : sub,
                  label: sub?.label ? sub.label : sub,
                }
              })}
              options={[
                ...(
                  this.state.picUsers?.filter(user => user.email !== this.state.displayValue?.picUser) || [
                  ]
                ).map(item => ({
                  label: item.email,
                  value: item.email,
                })),
              ]}
              onChange={(event) => {
                this.setState({
                  displayValue: {
                    ...this.state.displayValue,
                    subPicUsers: event,
                  }
                });
              }}
              isMulti
            />
          </div>
        </div>
        <div className="form-group ml-10">
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
            Start :
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
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <DatePicker
              className="date-picker"
              dateFormat="yyyy-MM-dd HH:mm:ss"
              selected={this.state.displayValue.start > 0 ? new Date(this.state.displayValue.start) : null}
              timeFormat="HH:mm:ss"
              placeholderText={"yyyy-MM-dd HH:mm:ss"}
              showTimeSelect
              onChange={(date: Date) => {
                if (!!date) {
                  this.setState({
                    displayValue: {
                      ...this.state.displayValue,
                      start: date.getTime()
                    }
                  })
                }
              }}
            />
          </div>
        </div>

        <div className="form-group ml-10">
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
            End :
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
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <DatePicker
              className="date-picker"
              dateFormat="yyyy-MM-dd HH:mm:ss"
              selected={this.state.displayValue.end > 0 ? new Date(this.state.displayValue.end) : null}
              timeFormat="HH:mm:ss"
              placeholderText={"yyyy-MM-dd HH:mm:ss"}
              showTimeSelect
              onChange={(date: Date) => {
                if (!!date) {
                  this.setState({
                    displayValue: {
                      ...this.state.displayValue,
                      end: date.getTime()
                    }
                  })
                }
              }}
            />
          </div>
        </div>

        <div className="form-group ml-10">
          <div
            className="col-md-6 input-wrap has-feedback has-success"
            style={{ display: 'flex', flexDirection: 'row', }}
          >
            <div
              style={{ marginLeft: '0px', margin: 'unset' }}
              className="button-btn w-80"
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
                this.setState({loading: true});

                window._state = this.state;
                const params = {
                  ...this.state.displayValue,
                  subPicUsers: this.state.displayValue.subPicUsers ? this.state.displayValue.subPicUsers.map(sub => (typeof sub === 'string') ? sub : sub.value) : undefined,
                }

                let rp = await saveDMSProject(params);
                this.setState({loading: false});
                if (rp.success) {
                  Swal.fire({
                    html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                  }).then(() => {
                    this.props.onSave && this.props.onSave(this.state.displayValue)
                  });
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
            <div
              style={{ marginLeft: '5px' }}
              className="button-btn w-80"
              onClick={() => {
                this.props.onClose && this.props.onClose();
              }}
            >
              <span>{'CANCEL'}</span>
            </div>
          </div>
        </div>
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
    )
  }
}

class RowInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: { ...this.props.data },
      validate: {},
      ignores: [
        'gender', 'avatar', 'birthDay', 'companyRefId', 'userCompany', 'userCompanyRefId', 'paymentId', 'identification', 'invoiceNo', 'ccName',
        'countryCode', 'lockServerPassword', 'lockServerUsername', 'participant', 'lastLogin', 'token', 'userRegistrationImageName', 'userRegistrationMessage',
        'companyPosition', 'uuidIOS', 'deviceId', 'registeredTime', 'ccValidity', 'ccNum', 'company', 'approved', 'phoneNumber', 'status', 'groupUsers', 'role', 'permissions', 'loginOtpRequire',
        'picUser'
      ],
      showPicUser: true,
      showGroup: false,
      showPermission: false,
      namePicUserColor: '#042ee1',
      borderPicUserBottom: '2px solid #042ee1',
    };
  }

  componentDidMount() {
    // this.searchBuilding();
    this.searchDMSPicUserInRow();
  }

  searchBuilding = async () => {
    const buildings = await getBuilding({ limit: 10000 });
    this.setState({
      buildingsOptions: buildings.results || [],
    })
  }

  searchGroup = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit1 || 10,
      offset: this.state.offset1 || 0,
    };
    const rp = await getGroupUsers(params);
    this.setState({
      addGroup: rp?.response.results || [],
      totalRecordsGroup: rp?.response.totalRows,
      totalPagesGroup: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexGroup: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeGroup: 10,
      loading: false
    });
  }

  searchRoles = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit2 || 10,
      offset: this.state.offset2 || 0,
    };
    const rp = await getRoles(params);
    this.setState({
      addRole: rp?.response.results || [],
      totalRecordsRoles: rp?.response.totalRows,
      totalPagesRoles: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexRoles: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeRoles: 10,
      loading: false
    });
  }

  searchPermission = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit3 || 10,
      offset: this.state.offset3 || 0,
    };
    const rp = await getPermission(params);
    this.setState({
      addPermission: rp?.response.results || [],
      totalRecordsPermission: rp?.response.totalRows,
      totalPagesPermission: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexPermission: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizePermission: 10,
      loading: false
    });
  }

  searchDMSSite = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limitDMSSite || 10,
      offset: this.state.offsetDMSSite || 0,
    };
    const rp = await getDMSSites(params);
    this.setState({
      addDMSSite : rp?.results || [],
      totalRecordsDMSSite: rp?.totalRows,
      totalPagesDMSSite: Math.floor(((rp.totalRows || 0) + 9) / 10),
      pageIndexDMSSite: Math.floor((rp?.offset + 9) / 10) + 1,
      pageSizeDMSSite: 10,
      loading: false
    });
  }

  searchProjects = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit8 || 10,
      offset: this.state.offset8 || 0,
    };
    const rp = await getProjectTags(params);
    this.setState({
      projects: rp?.response.results || [],
      totalRecordsProjects: rp?.response.totalRows,
      totalPagesProjects: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexProjects: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeProjects: 10,
      loading: false
    });
  }

  searchUserRole = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit4 || 10,
      offset: this.state.offset4 || 0,
      options: {
        siteId: this.state.displayValue.id,
      },
    };
    const rp = await getDMSSiteLocations(params);
    this.setState({
      roleAdded: rp?.results || [],
      selectedRows: rp?.results || [],
      totalRecordsUserRole: rp?.totalRows,
      totalPagesUserRole: Math.floor(((rp.totalRows || 0) + 9) / 10),
      pageIndexUserRole: Math.floor((rp?.offset + 9) / 10) + 1,
      pageSizeUserRole: 10,
      loading: false
    });
  }

  searchUserGroup = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      options: {
        userId: this.state.displayValue.id,
      },
      limit: this.state.limit5 || 10,
      offset: this.state.offset5 || 0,
    };
    const rp = await getUserGroups(params);
    this.setState({
      groupAdded: rp?.response.results || [],
      selectedRows: rp?.response.results || [],
      totalRecordsGroup: rp?.response.totalRows,
      totalPagesGroup: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexGroup: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeGroup: 10,
      loading: false
    });
  }

  searchDMSSiteWorkOrders = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      options: {
        siteId: this.state.displayValue.id,
      },
      limit: this.state.limit5 || 10,
      offset: this.state.offset5 || 0,
    };
    const rp = await getDMSSiteWorkOrders(params);
    this.setState({
      groupAdded: rp?.results || [],
      selectedRows: rp?.results || [],
      totalRecordsGroup: rp?.totalRows,
      totalPagesGroup: Math.floor(((rp.totalRows || 0) + 9) / 10),
      pageIndexGroup: Math.floor((rp?.offset + 9) / 10) + 1,
      pageSizeGroup: 10,
      loading: false
    });
  }


  searchEachUserPermission = async reset => {
    await this.setState({
      loading: true
    })
    this.state.offset6 = !!reset ? 0 : this.state.offset6;
    const params = {
      options: {
        userId: this.state.displayValue.id,
        allIn: !!reset,
      },
      limit: this.state.limit6 || 10,
      offset: this.state.offset6 || 0,
    };
    const rp = await getEachUserPermissions(params);
    this.setState({
      permissionAdded: rp?.response.results || [],
      selectedRows: (rp?.response?.options?.allIn?.length ? rp?.response?.options?.allIn : null) || (rp?.response?.options?.fixed ? rp?.response.results : null) || this.state.selectedRows || [],
      totalRecordsUserPermission: rp?.response.totalRows,
      totalPagesUserPermission: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexUserPermission: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeUserPermission: 10,
      loading: false
    });
  }

  searchDMSSiteInRow = async reset => {
    await this.setState({
      loading: true
    })
    this.state.offsetDMSSiteInRow = !!reset ? 0 : this.state.offsetDMSSiteInRow;
    const params = {
      options: {
        projectId: this.state.displayValue.id,
      },
      limit: this.state.limitDMSSiteInRow || 10,
      offset: this.state.offsetDMSSiteInRow || 0,
    };
    const rp = await getDMSSites(params);
    this.setState({
      addedDMSSite: rp?.results || [],
      selectedRows: rp?.results || [],
      totalRecordsDMSSiteInRow: rp?.totalRows,
      totalPagesDMSSiteInRow: Math.floor(((rp.totalRows || 0) + 9) / 10),
      pageIndexDMSSiteInRow: Math.floor((rp?.offset + 9) / 10) + 1,
      pageSizeDMSSiteInRow: 10,
      loading: false
    });
  }


  searchDMSPicUserInRow = async reset => {
    await this.setState({
      loading: true
    })
    this.state.offsetDMSPicUserInRow = !!reset ? 0 : this.state.offsetDMSPicUserInRow;
    const params = {
      options: {
        projectId: this.state.displayValue.id,
      },
      limit: this.state.limitDMSPicUserInRow|| 10,
      offset: this.state.offsetDMSPicUserInRow || 0,
    };
    const rp = await getDMSPicUsers(params);
    this.setState({
      addedDMSPicUserInRow: rp?.response?.results || [],
      selectedRows: rp?.response?.results || [],
      totalRecordsDMSPicUserInRow: rp?.response?.totalRows,
      totalPagesDMSPicUserInRow: Math.floor(((rp.response?.totalRows || 0) + 9) / 10),
      pageIndexDMSPicUserInRow: Math.floor((rp?.response?.offset + 9) / 10) + 1,
      pageSizeDMSPicUserInRow: 10,
      loading: false
    });
  }

  searchDMSPicUser = async reset => {
    await this.setState({
      loading: true
    })
    this.state.offsetDMSPicUser = !!reset ? 0 : this.state.offsetDMSPicUser;
    const params = {
      options: {

      },
      limit: this.state.limitDMSPicUser|| 10,
      offset: this.state.offsetDMSPicUser || 0,
    };
    const rp = await getDMSPicUsers(params);
    this.setState({
      addDMSPicUser: rp?.response?.results || [],
      totalRecordsDMSPicUser: rp?.response?.totalRows,
      totalPagesDMSPicUser: Math.floor(((rp.response?.totalRows || 0) + 9) / 10),
      pageIndexDMSPicUser: Math.floor((rp?.response?.offset + 9) / 10) + 1,
      pageSizeDMSPicUser: 10,
      loading: false
    });
  }

  searchUserProject = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit7 || 10,
      offset: this.state.offset7 || 0,
      options: {
        userId: this.state.displayValue.id,
      },
    };
    const rp = await getUserProjects(params);
    this.setState({
      userProjects: rp?.response.results || [],
      selectedRows: rp?.response.results || [],
      totalRecordsUserProject: rp?.response.totalRows,
      totalPagesUserProject: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexUserProject: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeUserProject: 10,
      loading: false
    });
  }

  handleChange(field, value) {

    if (field === 'role') {
      this.state.displayValue.roles = [value];
      this.validate('roles');
      this.validate('role');
    } else if (field === 'company') {
      this.state.displayValue.company = { companyID: value };
      this.validate('roles');
    } else {
      this.state.displayValue[field] = value;
      this.validate(field);
    }

    this.setState({ displayValue: { ...this.state.displayValue } })
  }

  validate(field) {

    if (this.state.ignores.indexOf(field) > -1) {
      return true;
    }

    let value = this.state.displayValue[field];
    if (field === 'roles' || field === 'role') {
      this.state.validate[field] = !!value && !!value.length;
    } else if (field === 'password') {
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
      <div style={{ paddingTop: '15px', flex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
        }}>
          <div className="form-group" style={{ width: '100%' }}>
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
                  this.props.onClose && this.props.onClose()
                }}
              >
                <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
              </button>
              <span style={{
                marginLeft: '10px',
                fontWeight: 500,
                fontSize: '18px',
                display: 'flex',
                textAlign: 'center'
              }}>{'INFORMATION OF PROJECT : '} {this.state.displayValue.name + ' - ' + this.state.displayValue.displayName}</span>
            </div>
            <div style={{ display: 'flex', marginTop: '20px', marginLeft: '20px' }}>
              <div style={{ display: 'flex', }}>
                <span style={{
                  marginLeft: '10px',
                  fontWeight: 200,
                  fontSize: '18px',
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center'
                }}>{'View by : '}</span>
                <div
                  style={{
                    marginLeft: '10px',
                    borderBottom: !!this.state.borderPicUserBottom ? this.state.borderPicUserBottom : '2px solid #8b838f',
                  }}
                  className="button-btn-3"
                  onClick={() => {
                    this.searchDMSPicUserInRow();
                    this.setState({
                      showPicUser: true,
                      showGroup: false,
                      showDMSSite: false,
                      selectedRows: '',
                      perColor: '',
                      groupColor: '',
                      roleColor: '#c5c6d0',
                      namePicUserColor: '#042ee1',
                      borderPicUserBottom: '2px solid #042ee1',
                      nameGroupColor: '',
                      namePerColor: '',
                      borderGroupBottom: '',
                      borderPerBottom: '',
                      namePfColor: '',
                      borderPfBottom: '',
                      borderProjectBottom: '',
                      nameProjectColor: '',
                      nameDMSSiteColor: '',
                      borderDMSSiteBottom: '',
                    })
                  }}
                >
                  <span
                    style={{ color: !!this.state.namePicUserColor ? this.state.namePicUserColor : '#8b838f', }}>{'SUB PIC USERS'}</span>
                </div>
                <div
                  style={{
                    borderBottom: !!this.state.borderDMSSiteBottom ? this.state.borderDMSSiteBottom : '2px solid #8b838f',
                  }}
                  className="button-btn-3"
                  onClick={() => {
                    this.searchDMSSiteInRow();
                    this.setState({
                      selectedRows: '',
                      showGroup: false,
                      showDMSSite: true,
                      showPicUser: false,
                      perColor: '',
                      groupColor: '#c5c6d0',
                      roleColor: '',
                      nameGroupColor: '',
                      nameDMSSiteColor: '#042ee1',
                      borderDMSSiteBottom: '2px solid #042ee1',
                      namePerColor: '',
                      nameRoleColor: '',
                      borderRoleBottom: '',
                      borderPerBottom: '',
                      namePfColor: '',
                      borderPfBottom: '',
                      borderProjectBottom: '',
                      namePicUserColor: '',
                      borderPicUserBottom: '',
                    })
                  }}
                >
                  <span
                    style={{ color: !!this.state.nameDMSSiteColor ? this.state.nameDMSSiteColor : '#8b838f', }}>{'SITES'}</span>
                </div>
              </div>
            </div>
            {!!this.state.showDMSSite ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
                <div style={{ display: "flex", width: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      //marginLeft: '800px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                    }}
                    className="button-btn-2"
                    onClick={() => {
                      this.searchDMSSite();
                      this.setState({
                        addDMSSite: this.state.addDMSSite,
                      })
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                    <span style={{
                      marginLeft: '15px',
                      color: '#042ee1'
                    }}>{'UPDATE SITES'}</span>
                  </div>
                </div>

                <table className="table" style={{ width: '100%', marginTop: '10px' }}>
                  <thead className="thead-dark">
                  <tr>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>ID
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>LABEL
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>DESCRIPTION
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {(this.state.addedDMSSite || [])
                    .map((it, index) => {
                      return (
                        <tr
                          key={index}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                            color: '#000000',
                          }}
                        >
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.id)}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.label)}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.description)}
                          </td>
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
                  <div
                    className="col-sm-12 col-md-7 pagination"
                    style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                  >
                    {this.state.totalRecordsDMSSiteInRow > this.state.pageSizeDMSSiteInRow && this.state.totalPagesDMSSiteInRow >= 2 &&
                    <Pagination
                      //href={this.props.asPath.replace(/\?.*/g, '')}
                      totalRecords={this.state.totalRecordsDMSSiteInRow}
                      totalPages={this.state.totalPagesDMSSiteInRow}
                      onPageChanged={async (query) => {
                        this.setState({
                          limitDMSSite: 10,
                          offset6: (query.pageIndex - 1) * 10,
                        }, () => {
                          this.searchDMSSiteInRow();
                        })
                      }}
                      pageIndex={this.state.pageIndexDMSSiteInRow}
                      pageSize={this.state.pageSizeDMSSiteInRow}
                      styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                    />
                    }
                  </div>
                </div>

              </div>

              : null}
            {!!this.state.showPicUser ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
                <div style={{ display: "flex", width: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      //marginLeft: '800px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                    }}
                    className="button-btn-2"
                    onClick={() => {
                      this.searchDMSPicUser();
                      this.setState({
                        addDMSPicUser: this.state.addDMSPicUser,
                        refreshEditKey: Date.now(),
                      })
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                    <span style={{
                      marginLeft: '15px',
                      color: '#042ee1'
                    }}>{'UPDATE PIC USERS'}</span>
                  </div>
                </div>
                <table className="table" style={{ width: '100%', marginTop: '10px' }}>
                  <thead className="thead-dark">
                      <tr>
                        <th className="table-th" scope="col">User ID</th>
                        <th className="table-th" scope="col">User Name</th>
                        <th className="table-th" scope="col">First Name</th>
                        <th className="table-th" scope="col">Last Name</th>
                        <th className="table-th" scope="col">role</th>
                      </tr>
                  </thead>
                  <tbody>
                  {(this.state.addedDMSPicUserInRow || [])
                    .map((it, index) => {
                      return (
                          <tr key={index}>
                            <td className="table-td">
                              {it.id}
                            </td>
                            <td className="table-td">
                              <span>{it.username}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.firstName}</span>
                            </td><td className="table-td">
                              <span>{it.lastName}</span>
                            </td>
                            <td className="table-td">
                              <span>{((it.roleDescs).map(r => r.desc)).toString().replace('[', '').replace(']', '')}</span>
                            </td>

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
                  <div
                    className="col-sm-12 col-md-7 pagination"
                    style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                  >
                    {this.state.totalRecordsDMSPicUserInRow > this.state.pageSizeDMSPicUserInRow && this.state.totalPagesDMSPicUserInRow >= 2 &&
                    <Pagination
                      //href={this.props.asPath.replace(/\?.*/g, '')}
                      totalRecords={this.state.totalRecordsDMSPicUserInRow}
                      totalPages={this.state.totalPagesDMSPicUserInRow}
                      onPageChanged={async (query) => {
                        this.setState({
                          limitDMSPicUserInRow: 10,
                          offsetDMSPicUserInRow: (query.pageIndex - 1) * 10,
                        }, () => {
                          this.searchDMSPicUserInRow()
                        })
                      }}
                      pageIndex={this.state.pageIndexDMSPicUserInRow}
                      pageSize={this.state.pageSizeDMSPicUserInRow}
                      styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                    />
                    }
                  </div>
                </div>
              </div>
              : null}
          </div>


          {!!this.state.addLocation && (
            <div
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 10,
                borderRadius: '5px',
                padding: '0px 30px 15px 30px',
                color: '#000000',
                justifyContent: 'space-between',
                top: '10%',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '30%',
                padding: '30px 30px 60px 0px',
                marginLeft: '600px',
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
                      this.setState({
                        addLocation: '',
                      });
                    }}
                  >
                    <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
                  </button>
                  <span style={{fontWeight: '500', marginLeft: '15px'}}>Add location</span>
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
                      <span>Building: </span>
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
                              searchBuildingUnit: undefined
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
                <div style={{
                  marginTop: '5px',
                  display: 'flex',
                  float: 'right',
                  marginLeft: '20px'
                }}>
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn"
                    onClick={async () => {
                      if (!!this.state.selectedRows) {

                        if (!this.state.searchBuildingUnit?.value) {
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

                        console.info('this.props--', this.props);
                        console.info('this.state--', this.state);
                        let params = {
                          siteId: this.props.data?.id,
                          buildingId: this.state.searchBuilding?.value,
                          blockId: this.state.searchBlock?.value,
                          floorLevelId: this.state.searchFloorLevel?.value,
                          buildingUnitId: this.state.searchBuildingUnit?.value,
                        };

                        let rp = await linkLocationSite(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              await this.setState({
                                createTask: {
                                  create: false,
                                  data: null
                                }, showEditRole: false
                              })
                              this.searchUserRole();
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
                    <span>{'Add location'}</span>
                  </div>
                  <div
                    style={{
                      marginLeft: '15px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                      width: '85px'
                    }}
                    className="button-btn-2"
                    onClick={async () => {
                      this.setState({ addLocation: '' });
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!!this.state.addGroup && (
            <div
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 10,
                borderRadius: '5px',
                padding: '0px 30px 15px 30px',
                color: '#000000',
                justifyContent: 'space-between',
                top: '10%',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '30%',
                padding: '30px 30px 60px 0px',
                marginLeft: '600px',
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
                      this.setState({ addRole: '' });
                    }}
                  >
                    <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
                  </button>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',
                  marginTop: '20px',
                  marginLeft: '20px'
                }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th w-20" scope="col"/>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>ID
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>NAME
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>DESCRIPTION
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.addGroup || [])
                      .map((it, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
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
                                const tmp = this.state.selectedRows.filter(o => o.id == it.id)[0];
                                const idx = this.state.selectedRows.indexOf(tmp);
                                if (idx === -1) {
                                  this.state.selectedRows.push(it);
                                } else {
                                  this.state.selectedRows.splice(idx, 1);
                                }
                                console.info('this.state.selectedRows', this.state.selectedRows);
                                console.info('this.state.selectedRows length : ', this.state.selectedRows.length);
                                this.setState({
                                  selectedRows: [].concat(this.state.selectedRows),
                                  loop: [].concat(this.state.selectedRows),
                                  count: this.state.selectedRows.length
                                });
                              }}
                            >
                              {!!it.id && (
                                <input
                                  style={{ marginTop: '4px' }}
                                  type="checkbox"
                                  checked={!!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}
                                />
                              )}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.id)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.name)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.description)}
                            </td>
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
                    <div
                      className="col-sm-12 col-md-7 pagination"
                      style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                    >
                      {this.state.totalRecordsGroup > this.state.pageSizeGroup && this.state.totalPagesGroup >= 2 &&
                      <Pagination
                        //href={this.props.asPath.replace(/\?.*/g, '')}
                        totalRecords={this.state.totalRecordsGroup}
                        totalPages={this.state.totalPagesGroup}
                        onPageChanged={async (query) => {
                          this.setState({
                            limit1: 10,
                            offset1: (query.pageIndex - 1) * 10,
                          }, () => {
                            this.searchGroup();
                          })
                        }}
                        pageIndex={this.state.pageIndexGroup}
                        pageSize={this.state.pageSizeGroup}
                        styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                      />
                      }
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: '5px',
                  display: 'flex',
                  float: 'right',
                  marginLeft: '20px'
                }}>
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn w-80"
                    onClick={async () => {
                      if (!!this.state.selectedRows) {
                        let result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });

                        if (!result || !result.isConfirmed) return;

                        let params = {
                          id: this.props.data.id,
                          name: '',
                          description: '',
                          groupUsers: !!this.state.selectedRows ? this.state.selectedRows : []
                        };

                        let rp = await updateUserGroup(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              await this.setState({
                                createTask: {
                                  create: false,
                                  data: null
                                }, showEditRole: false
                              })
                              this.searchUserGroup();
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
                      this.setState({ addGroup: '' });
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!!this.state.editPf?.id && (
            <div
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 10,
                borderRadius: '5px',
                padding: '0px 30px 15px 30px',
                color: '#000000',
                justifyContent: 'space-between',
                top: '10%',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '300px',
                padding: '30px 30px 60px 0px',
                marginLeft: 'calc(50% - 150px)',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                paddingLeft: '15px',
                paddingRight: '15px',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',
                }}>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <label
                      htmlFor="telephone"
                      className="control-label visible-lg-block"
                      style={{
                        fontSize: "12px",
                        textAlign: "left",
                        fontWeight: 500,
                        color: "#222222"
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
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      {this.state.editPf.name}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',
                  marginTop: '20px',
                }}>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <label
                      htmlFor="telephone"
                      className="control-label visible-lg-block"
                      style={{
                        fontSize: "12px",
                        textAlign: "left",
                        fontWeight: 500,
                        color: "#222222"
                      }}
                    >
                      Start Time :
                      <span
                        style={{
                          marginLeft: '3px',
                          marginTop: '2px',
                          color: 'red',
                        }}
                      />
                    </label>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <DatePicker
                        className="date-picker"
                        dateFormat="yyyy-MM-dd"
                        selected={new Date(this.state.editPf.startTimeTemp)}
                        placeholderText={"YYYY-MM-DD"}
                        onChange={(date: Date) => !!date && this.setState({
                          editPf: {
                            ...this.state.editPf,
                            startTimeTemp: date.getTime()
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',
                  marginTop: '20px',
                }}>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <label
                      htmlFor="telephone"
                      className="control-label visible-lg-block"
                      style={{
                        fontSize: "12px",
                        textAlign: "left",
                        fontWeight: 500,
                        color: "#222222"
                      }}
                    >
                      End Time :
                      <span
                        style={{
                          marginLeft: '3px',
                          marginTop: '2px',
                          color: 'red',
                        }}
                      />
                    </label>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <DatePicker
                        className="date-picker"
                        dateFormat="yyyy-MM-dd"
                        selected={new Date(this.state.editPf.endTimeTemp)}
                        placeholderText={"YYYY-MM-DD"}
                        onChange={(date: Date) => {
                          if (!!date) {
                            this.setState({
                              editPf: {
                                ...this.state.editPf,
                                endTimeTemp: date.getTime()
                              }
                            })
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',
                  marginTop: '20px',
                }}>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="telephone"
                      className="control-label visible-lg-block"
                      style={{
                        fontSize: "12px",
                        textAlign: "left",
                        fontWeight: 500,
                        color: "#222222"
                      }}
                    >
                      Active :
                      <span
                        style={{
                          marginLeft: '3px',
                          marginTop: '2px',
                          color: 'red',
                        }}
                      />
                    </label>
                    <SelectCustom
                      field={{
                        name: 'chartStyle',
                      }}
                      name="chartStyle"
                      options={[
                        ...(
                          this.state.optionsStyle || [
                            { name: 'TRUE', value: 'true' },
                            { name: 'FALSE', value: 'false' },
                          ]
                        ).map(item => ({
                          label: item.name,
                          value: item.value,
                        })),
                      ]}
                      value={this.state.editPf.tempActive === true ? 'true' : 'false'}
                      onChange={(field, value) => {
                        this.setState({
                          editPf: {
                            ...this.state.editPf,
                            tempActive: value.value === 'true' ? true : false
                          }
                        });
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
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn w-80"
                    onClick={async () => {
                      if (!!this.state.selectedRows) {

                        let result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });
                        if (!result || !result.isConfirmed) return;

                        let params = {
                          name: this.state.editPf.name,
                          email: this.state.editPf.email,
                          startTime: this.state.editPf.startTimeTemp,
                          endTime: this.state.editPf.endTimeTemp,
                          active: this.state.editPf.tempActive,
                        };

                        let rp = await updateUserPlatform(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              let pfs = await getUserPlatforms({ email: this.state.editPf.email })
                              pfs = (pfs.response || []).filter(pf => (!!pf.name/* && pf.name != 'OTHER'*/));
                              await this.setState({
                                editPf: null,
                                pfs,
                              })

                            })
                        } else {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          })
                        }
                      }
                    }}
                  >
                    <span>{'UPDATE'}</span>
                  </div>
                  <div
                    style={{
                      marginLeft: '15px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                      width: '85px'
                    }}
                    className="button-btn-2"
                    onClick={async () => {
                      this.setState({ editPf: null });
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!!this.state.addDMSSite && (
            <div
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 10,
                borderRadius: '5px',
                padding: '0px 30px 15px 30px',
                color: '#000000',
                justifyContent: 'space-between',
                top: '10%',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '70%',
                padding: '30px 30px 60px 0px',
                marginLeft: '300px',
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
                      this.setState({ addDMSSite: '' });
                    }}
                  >
                    <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
                  </button>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',
                  marginTop: '20px',
                  marginLeft: '20px'
                }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th w-20" scope="col"/>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>ID
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>LABEL
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.addDMSSite || [])
                      .map((it, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              cursor: !!this.state.selectedRows[0]?.fixed ? 'not-allowed' : 'pointer',
                              pointerEvents: !!this.state.selectedRows[0]?.fixed ? 'none' : undefined,
                              backgroundColor: this.state.selectedRows[0]?.fixed ? '#00000011' : this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
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
                                const tmp = this.state.selectedRows.filter(o => o.id == it.id)[0];
                                const idx = this.state.selectedRows.indexOf(tmp);
                                if (idx === -1) {
                                  this.state.selectedRows.push(it);
                                } else {
                                  this.state.selectedRows.splice(idx, 1);
                                }
                                this.setState({
                                  selectedRows: [].concat(this.state.selectedRows),
                                  loop: [].concat(this.state.selectedRows),
                                  count: this.state.selectedRows.length
                                });
                              }}
                            >
                              {!!it.id && (
                                <input
                                  style={{ marginTop: '4px' }}
                                  type="checkbox"
                                  checked={this.state.selectedRows[0]?.fixed || !!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}
                                />
                              )}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.id)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.label)}
                            </td>
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
                    <div
                      className="col-sm-12 col-md-7 pagination"
                      style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                    >
                      {this.state.totalRecordsDMSSite > this.state.pageSizeDMSSite && this.state.totalPagesDMSSite >= 2 &&
                      <Pagination
                        //href={this.props.asPath.replace(/\?.*/g, '')}
                        totalRecords={this.state.totalRecordsDMSSite}
                        totalPages={this.state.totalPagesDMSSite}
                        onPageChanged={async (query) => {
                          this.setState({
                            limitDMSSite: 10,
                            offsetDMSSite: (query.pageIndex - 1) * 10,
                          }, () => {
                            this.searchDMSSite();
                          })
                        }}
                        pageIndex={this.state.pageIndexDMSSite}
                        pageSize={this.state.pageSizeDMSSite}
                        styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                      />
                      }
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: '5px',
                  display: 'flex',
                  float: 'right',
                  marginLeft: '20px'
                }}>
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn w-80"
                    onClick={async () => {
                      if (!!this.state.selectedRows) {

                        let result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });
                        if (!result || !result.isConfirmed) return;

                        let params = {
                          projectId: this.props.data.id,
                          id: this.props.data.id,
                          sites: !!this.state.selectedRows ? this.state.selectedRows : []
                        };

                        let rp = await linkProjectSite(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              this.searchDMSSiteInRow(true);
                            })
                        } else {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          })
                          this.setState({
                            showDMSSite: false,
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
                      this.setState({ addDMSSite: '' });
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!!this.state.addDMSPicUser && (
            <div
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 10,
                borderRadius: '5px',
                padding: '0px 30px 15px 30px',
                color: '#000000',
                justifyContent: 'space-between',
                top: '10%',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '70%',
                padding: '30px 30px 60px 0px',
                marginLeft: '300px',
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
                      this.setState({ addDMSPicUser: '' });
                    }}
                  >
                    <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
                  </button>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',
                  marginTop: '20px',
                  marginLeft: '20px'
                }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th w-20" scope="col"/>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>ID
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>EMAIL
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>FIRST NAME
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>LAST NAME
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.addDMSPicUser || [])
                      .map((it, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              cursor: !!this.state.selectedRows[0]?.fixed ? 'not-allowed' : 'pointer',
                              pointerEvents: !!this.state.selectedRows[0]?.fixed ? 'none' : undefined,
                              backgroundColor: this.state.selectedRows[0]?.fixed ? '#00000011' : this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
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
                                const tmp = this.state.selectedRows.filter(o => o.id == it.id)[0];
                                const idx = this.state.selectedRows.indexOf(tmp);
                                if (idx === -1) {
                                  this.state.selectedRows.push(it);
                                } else {
                                  this.state.selectedRows.splice(idx, 1);
                                }
                                this.setState({
                                  selectedRows: [].concat(this.state.selectedRows),
                                  loop: [].concat(this.state.selectedRows),
                                  count: this.state.selectedRows.length
                                });
                              }}
                            >
                              {!!it.id && (
                                <input
                                  style={{ marginTop: '4px' }}
                                  type="checkbox"
                                  checked={this.state.selectedRows[0]?.fixed || !!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}
                                />
                              )}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.id)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.email)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.firstName)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.lastName)}
                            </td>
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
                    <div
                      className="col-sm-12 col-md-7 pagination"
                      style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                    >
                      {this.state.totalRecordsDMSPicUser > this.state.pageSizeDMSPicUser && this.state.totalPagesDMSPicUser >= 2 &&
                      <Pagination
                        //href={this.props.asPath.replace(/\?.*/g, '')}
                        totalRecords={this.state.totalRecordsDMSPicUser}
                        totalPages={this.state.totalPagesDMSPicUser}
                        onPageChanged={async (query) => {
                          this.setState({
                            limitDMSPicUser: 10,
                            offsetDMSPicUser: (query.pageIndex - 1) * 10,
                          }, () => {
                            this.searchDMSSite();
                          })
                        }}
                        pageIndex={this.state.pageIndexDMSPicUser}
                        pageSize={this.state.pageSizeDMSPicUser}
                        styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                      />
                      }
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: '5px',
                  display: 'flex',
                  float: 'right',
                  marginLeft: '20px'
                }}>
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn w-80"
                    onClick={async () => {
                      if (!!this.state.selectedRows) {

                        let result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });
                        if (!result || !result.isConfirmed) return;

                        let params = {
                          projectId: this.props.data.id,
                          id: this.props.data.id,
                          users: !!this.state.selectedRows ? this.state.selectedRows : []
                        };

                        let rp = await linkProjectPicUser(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              this.searchDMSPicUserInRow(true);
                            })
                        } else {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          })
                          this.setState({
                            addDMSPicUser: false,
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
                      this.setState({ addDMSPicUser: '' });
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!!this.state.addProject && (
            <div
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 10,
                borderRadius: '5px',
                padding: '0px 30px 15px 30px',
                color: '#000000',
                justifyContent: 'space-between',
                top: '10%',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '30%',
                padding: '30px 30px 60px 0px',
                marginLeft: '600px',
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
                      this.setState({ addProject: '' });
                    }}
                  >
                    <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
                  </button>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  width: '100%',
                  marginTop: '20px',
                  marginLeft: '20px'
                }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th w-20" scope="col"/>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>ID
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>NAME
                      </th>
                      <th className="table-th" scope="col"
                          style={{ textAlign: 'center' }}>DESCRIPTION
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.projects || [])
                      .map((it, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
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
                                const tmp = this.state.selectedRows.filter(o => o.id == it.id)[0];
                                const idx = this.state.selectedRows.indexOf(tmp);
                                if (idx === -1) {
                                  this.state.selectedRows.push(it);
                                } else {
                                  this.state.selectedRows.splice(idx, 1);
                                }
                                console.info('this.state.selectedRows', this.state.selectedRows);
                                console.info('this.state.selectedRows length : ', this.state.selectedRows.length);
                                this.setState({
                                  selectedRows: [].concat(this.state.selectedRows),
                                  loop: [].concat(this.state.selectedRows),
                                  count: this.state.selectedRows.length
                                });
                              }}
                            >
                              {!!it.id && (
                                <input
                                  style={{ marginTop: '4px' }}
                                  type="checkbox"
                                  checked={!!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}
                                />
                              )}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.id)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.name)}
                            </td>
                            <td className="table-td" style={{ textAlign: 'center', }}>
                              {(it.description)}
                            </td>
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
                    <div
                      className="col-sm-12 col-md-7 pagination"
                      style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                    >
                      {this.state.totalRecordsProjects > this.state.pageSizeProjects && this.state.totalPagesProjects >= 2 &&
                      <Pagination
                        totalRecords={this.state.totalRecordsProjects}
                        totalPages={this.state.totalPagesProjects}
                        onPageChanged={async (query) => {
                          this.setState({
                            limit8: 10,
                            offset8: (query.pageIndex - 1) * 10,
                          }, () => {
                            this.searchProjects();
                          })
                        }}
                        pageIndex={this.state.pageIndexProjects}
                        pageSize={this.state.pageSizeProjects}
                        styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                      />
                      }
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: '5px',
                  display: 'flex',
                  float: 'right',
                  marginLeft: '20px'
                }}>
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn w-80"
                    onClick={async () => {
                      if (!!this.state.selectedRows) {

                        let result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });

                        if (!result || !result.isConfirmed) return;

                        let params = {
                          id: this.props.data.id,
                          name: '',
                          description: '',
                          projects: !!this.state.selectedRows ? this.state.selectedRows.map(row => row.name) : []
                        };

                        let rp = await updateUserProject(params);
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                            .then(async () => {
                              await this.setState({
                                createTask: {
                                  create: false,
                                  data: null
                                }, showEditRole: false
                              })
                              this.searchUserProject();
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
                      this.setState({ addProject: false });
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withNamespaces('common')(Homepage);
