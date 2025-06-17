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
import { toastrs } from '@app/utils/toastr';

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
  getDMSApplications,
  getDMSApplicationUsers,
  saveDMSApplication,
  preLogin,
  updateDMSApplication,
  rejectDMSApplication,
  approveDMSApplication,
  deleteDMSApplication,
  terminateDMSApplication,
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
  :global(.form-c-row-none svg) {
    display: none;
    max-width: 0px;
  }
  :global(.form-c-row-none .select-multi) {
    pointer-events: none;
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

const part30MinutesTime = time => {
  let date = time > 0 ? new Date(time) : new Date();
  let m = date.getMinutes();
  let h = date.getHours();
  if (m > 30) {
      h = h + 1;
      m = 0;
  } else {
      m = 30;
  }
  date.setHours(h);
  date.setMinutes(m);
  date.setSeconds(0);
  return new Date(Math.floor(date.getTime() / 1000) * 1000);
}

const toStringTimePeriod = x => {
    if (x.override === false) return '';
    let str = '[Dates]: ';
    if (x.timePeriodDatesIsAlways === true) {
        str += 'Always, '
    } else {
        str += moment(new Date(x.timePeriodDatesStart)).format('YYYY-MM-DD HH:mm:ss') + ' - ' + moment(new Date(x.timePeriodDatesEnd)).format('YYYY-MM-DD HH:mm:ss') + ', '
    }
    str += '[Day of Week]: '
    if (x.timePeriodDayInWeeksIsAlways === true) {
        str += 'All days, '
    } else {
        let tmpStr = '';
        if (x.timePeriodDayInWeeksIsMon === true) tmpStr += 'MON/';
        if (x.timePeriodDayInWeeksIsTue === true) tmpStr += 'TUE/';
        if (x.timePeriodDayInWeeksIsWed === true) tmpStr += 'WED/';
        if (x.timePeriodDayInWeeksIsThu === true) tmpStr += 'THU/';
        if (x.timePeriodDayInWeeksIsFri === true) tmpStr += 'FRI/';
        if (x.timePeriodDayInWeeksIsSat === true) tmpStr += 'SAT/';
        if (x.timePeriodDayInWeeksIsSun === true) tmpStr += 'SUN/';
        str += tmpStr.replace(/\/$/g, '') + ', ';
    }
    str += '[Hours]: ';
    if (x.timePeriodTimeInDayIsAlways === true) {
        str += 'All hours '
    } else {
        str += (x.timePeriodTimeInDayHourStart || 0) + ':' + (x.timePeriodTimeInDayMinuteStart || 0) + ' - ';
        str += (x.timePeriodTimeInDayHourEnd || 0) + ':' + (x.timePeriodTimeInDayMinuteEnd || 0);
    }
    return str;
}
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
        queryCreatedBy,
      }, asPath,
      req,
      initialState
    } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      options: {
        queryName,
        queryCreatedBy,
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };
    let rp = await getDMSApplications(params, req);
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
      searchName: params.options.queryName,
      searchCreatedBy: params.options.queryCreatedBy,
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
      <TotPage title={'PTW Application Management'}>
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
                  loggerInUser={this.state.loggerInUser}
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
                    <h5 className="site-title">PTW Application Management</h5>
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
                          value={ this.state.searchCreatedBy || '' }
                          placeholder="Search created by..."
                          onChange={event => this.setState({ searchCreatedBy: event.target.value })}
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
                          queryCreatedBy: this.state.searchCreatedBy || undefined,
                        };
                        let pathName = window.location.pathname;
                        if (Object.keys(options)?.length) {
                          pathName = pathName.concat("?");
                          if (!!options.queryName) {
                            pathName = pathName.concat(`queryName=${options.queryName}&`)
                          }
                          if (!!options.queryCreatedBy) {
                            pathName = pathName.concat(`queryCreatedBy=${options.queryCreatedBy}&`)
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
                      data-tip="Add new PTW application"
                      className="button-btn mr-30"
                      style={{
                        width: 'unset',
                        padding: '15px',
                      }}
                      onClick={() => this.setState({
                        itemEdit: {
                          name: null,
                          start: Date.now(),
                          end: Date.now(),
                          timePeriod: {
                            label: 'All selected site',
                            override: true,
                            timePeriodDatesIsAlways: true,
                            timePeriodDatesStart: part30MinutesTime(Date.now()).getTime(),
                            timePeriodDatesEnd: part30MinutesTime(Date.now()).getTime(),
                            timePeriodDayInWeeksIsAlways: true,
                            timePeriodDayInWeeksIsMon: true,
                            timePeriodDayInWeeksIsTue: true,
                            timePeriodDayInWeeksIsWed: true,
                            timePeriodDayInWeeksIsThu: true,
                            timePeriodDayInWeeksIsFri: true,
                            timePeriodDayInWeeksIsSat: true,
                            timePeriodDayInWeeksIsSun: true,
                            timePeriodTimeInDayIsAlways: true,
                            timePeriodTimeInDayHourStart: 0,
                            timePeriodTimeInDayMinuteStart: 0,
                            timePeriodTimeInDayHourEnd: 23,
                            timePeriodTimeInDayMinuteEnd: 59,
                          }
                        }
                      })}
                    >
                      <span>{'ADD NEW PTW APPLICATION'}</span>
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
                          <th className="table-th" scope="col">Project</th>
                          <th className="table-th" scope="col">Created By</th>
                          <th className="table-th" scope="col">Approval By</th>
                          <th className="table-th" scope="col">Reject By</th>
                          <th className="table-th" scope="col">Terminated By</th>
                          <th className="table-th" scope="col">Status</th>
                          <th className="table-th" scope="col">Created Date</th>
                          <th className="table-th" scope="col">Action</th>
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
                                  <span>{!!it.project?.displayName ? (it.project?.name + ' ' + it.project?.displayName) : ''}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.createdBy}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.approvalBy}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.rejectBy}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.terminatedBy}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.status}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.createDate ? moment(new Date(it.createDate)).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                                </td>
                                {
                                (this.state.loggerInUser?.phoneNumber === it.createdBy ||
                                !!this.state.loggerInUser.authorities.filter(

                                  auth =>
                                  auth.authority === "DMS_R_REJECT_APPLICATION" ||
                                  auth.authority === 'DMS_R_REJECT_APPLICATION'
                                ).length) && (
                                  <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                      {/*
                                      <>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to edit site, user"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={async () => {
                                          this.setState({
                                            rowData: JSON.parse(JSON.stringify(it)),
                                          })
                                        }}
                                      >
                                        <span><i className="fa fa-universal-access"/></span>
                                      </div>
                                      </>
                                      */}
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to edit PTW application"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={async () => {
                                          let params = {
                                            options: {
                                              applicationId: it.id,
                                            },
                                            limit: 1,
                                            offset: 0,
                                          };
                                          let rp = await getDMSApplications(params);
                                          this.setState({
                                            itemEdit: {...rp?.results[0]},
                                          })
                                        }}
                                      >
                                        <span><i className={"fa fa-edit"}/></span>
                                      </div>
                                      {/*
                                      <>
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
                                      </>
                                      */}
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
        'timePeriodDatesIsAlways',
        'timePeriodDayInWeeksIsAlways',
        'timePeriodTimeInDayIsAlways',
        'timePeriodDayInWeeksIsMon',
        'timePeriodDayInWeeksIsTue',
        'timePeriodDayInWeeksIsWed',
        'timePeriodDayInWeeksIsThu',
        'timePeriodDayInWeeksIsFri',
        'timePeriodDayInWeeksIsSat',
        'timePeriodDayInWeeksIsSun',
        'status',
        'label',
        'applicationEmail',
        'name',
        'site',
        'timePeriod',
        'approvalBy',
        'rejectBy',
        'isGuest',
        'allHis',
        'timeTerminate',
        'terminatedBy',
      ],
      isEdit: this.props.isEdit,
      siteGuests: [
      ],
      siteUsers: [
      ],
    };

    this.state.siteTimePeriodMap = {};
    // this.state.editTimePeriodSiteData = this.state.displayValue?.timePeriod || {};
    window._siteTimePeriodMap = this.state.siteTimePeriodMap;
    if (this.state.displayValue?.sites?.length) {
      this.state.sitesSelected = this.state.displayValue?.sites.map((s, idx) => {
        this.state.siteTimePeriodMap[s.siteId] = {...s, label: s.siteLabel};
        return {
          value: s.siteId,
          label: s.siteLabel,
        }
      })
    }


    if (this.state.displayValue?.users?.length) {
      this.state.dmsUsersSelected = [];
      this.state.displayValue?.users.filter(us => us.type === 'dms_user')
      .map(us => {
        this.state.dmsUsersSelected.push({
          value: us.email,
          phone: us.phoneNumber,
          label: us.name + ' [' + us.phoneNumber + ']',
        })
      })
      this.state.siteGuests = [];
      this.state.displayValue?.users.filter(us => us.type === 'guest')
      .map(us => {
        this.state.siteGuests.push({
          name: us.name,
          phone: us.phoneNumber,
          email: us.email,
          createNewUser: !!us.isRequestCreateNew,
        })
      })
    }


    this.state.showFirstTimePeriodSites = {};
    console.info('this.state', this.state)
    console.info('this.props.data', this.props.data)
  }

  isChangePeriod(p1, p2) {
    if (p2.siteId === 10) {
      console.info('lol');
    }
    if (!p1 || !p2) {
      return false;
    }

    if (!!p1.siteId && !!p2.siteId && p1.siteId === p2.siteId && p2.override !== p2.override) {
      return true;
    }

    if ((!p1.siteId && !p2.siteId || (p1.siteId === p2.siteId && (!!p2.override || !!p2.override)))) {
      let rs = p1.timePeriodDatesEnd != p2.timePeriodDatesEnd
      || p1.timePeriodDatesIsAlways != p2.timePeriodDatesIsAlways
      || p1.timePeriodDatesStart != p2.timePeriodDatesStart
      || p1.timePeriodDayInWeeksIsAlways != p2.timePeriodDayInWeeksIsAlways
      || p1.timePeriodDayInWeeksIsFri != p2.timePeriodDayInWeeksIsFri
      || p1.timePeriodDayInWeeksIsMon != p2.timePeriodDayInWeeksIsMon
      || p1.timePeriodDayInWeeksIsSat != p2.timePeriodDayInWeeksIsSat
      || p1.timePeriodDayInWeeksIsSun != p2.timePeriodDayInWeeksIsSun
      || p1.timePeriodDayInWeeksIsThu != p2.timePeriodDayInWeeksIsThu
      || p1.timePeriodDayInWeeksIsTue != p2.timePeriodDayInWeeksIsTue
      || p1.timePeriodDayInWeeksIsWed != p2.timePeriodDayInWeeksIsWed
      || p1.timePeriodTimeInDayHourStart != p2.timePeriodTimeInDayHourStart
      || p1.timePeriodTimeInDayHourEnd != p2.timePeriodTimeInDayHourEnd
      || p1.timePeriodTimeInDayHourStart != p2.timePeriodTimeInDayHourStart
      || p1.timePeriodTimeInDayMinuteEnd != p2.timePeriodTimeInDayMinuteEnd
      || p1.timePeriodTimeInDayMinuteStart != p2.timePeriodTimeInDayMinuteStart
      return rs;
    }



    return false;
  }

  componentDidMount() {

    let length = this.state.displayValue?.allHis?.length;
    if (!!length) {

      this.state.firstHis = JSON.parse(this.state.displayValue.allHis[length - 1].content);
      this.state.lastHis = JSON.parse(this.state.displayValue.allHis[0].content);
      this.state.firstHis.siteIds = (this.state.firstHis?.sites || []).map(s => s.id);
      let isSiteChange = (this.state.firstHis?.sites || []).map(s => s.id).sort((o1, o2) => (o1 < o2 ? 1 : -1)).toString()
                          != (this.state.lastHis?.sites || []).map(s => s.id).sort((o1, o2) => (o1 < o2 ? 1 : -1)).toString();
      this.state.isSiteChange = !!isSiteChange;

      let isUserPhoneChange = (this.state.firstHis?.userPhones || []).map(s => s).sort((o1, o2) => o1.localeCompare(o2)).toString()
                          != (this.state.lastHis?.userPhones || []).map(s => s).sort((o1, o2) => o1.localeCompare(o2)).toString();

      this.state.isUserPhoneChange = !!isUserPhoneChange;

      let isGuestChange = JSON.stringify((this.state.firstHis?.guests || []).map(s => ({phone: s.phone, email: s.email, name: s.name})).sort((o1, o2) => o1.phone.localeCompare(o2.phone)))
                          != JSON.stringify((this.state.lastHis?.guests || []).map(s => ({phone: s.phone, email: s.email, name: s.name})).sort((o1, o2) => o1.phone.localeCompare(o2.phone)))

      this.state.isGuestChange = !!isGuestChange;

      window._firstHis = JSON.parse(this.state.displayValue.allHis[length - 1].content);
      window._lastHis = JSON.parse(this.state.displayValue.allHis[0].content);
    }

    this.getDMSProjects();
    this.getUsers();
  }

  getDMSProjects = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit1 || 10000,
      offset: this.state.offset1 || 0,
    };
    const rp = await getDMSProjects(params);

    this.setState({
      dmsProjects: (rp?.results || []).filter(p => !this.state.displayValue?.id || p.id === this.state.displayValue?.id),
      loading: false,
    }, () => {
      if (this.state.displayValue?.project?.id) {
        this.getDMSSites();
      }
    });
  }

  getUsers = async () => {
    let params = {
      options: {
        hasPhone: true,
      },
      limit: 100000,
      offset: 0,
    };
    let rp = await getUsers(params);
    this.setState({
      dmsUsers: rp.response.results || [],
    })
  }

  getDMSSites = async () => {
    if (!this.state.displayValue?.project?.id) {
      this.setState({
        dmsSites: [],
        displayValue: {
          ...this.state.displayValue,
          site: null
        }
      })
      return;
    }
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit1 || 10000,
      offset: this.state.offset1 || 0,
      options: {
        projectId: this.state.displayValue?.project?.id,
      }
    };
    const rp = await getDMSSites(params);

    this.setState({
      dmsSites: rp?.results || [],
      loading: false,
    }, () => {
      console.info('dmsSites --->', this.state.dmsSites);
    });
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
      this.state.validate[field] = !value || !isNaN(Number(value.toLowerCase().trim()))
    } else {
      this.state.validate[field] = !!value;
    }

    if (field === 'timePeriodTimeInDayHourStart') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 23
    }
    if (field === 'timePeriodTimeInDayHourEnd') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 23
    }
    if (field === 'timePeriodTimeInDayMinuteStart') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 59
    }
    if (field === 'timePeriodTimeInDayMinuteEnd') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 59
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
    console.info('this.state.displayValue?.site', this.state.displayValue?.site)
    window._state = this.state;
    let isPIC = this.state.displayValue?.currentUserIsPICUser === true;
    let editable = !this.state.displayValue?.id || (this.state.displayValue.status === 'NEW' && !!isPIC);
    return (
      <div style={{ paddingTop: '15px', flex: 1, overflow: 'visible', display: 'flex', flexDirection: 'row', }}>

        <div className="col-md-6" style={{position: 'relative', paddingTop: '15px',}}>
          <div className="col-md-12">
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
              <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>{!!this.state.isEdit ? ('PTW Application ' + this.state.displayValue.id) : 'Add new PTW application'}</span>
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
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px', borderTop: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Project :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5}}>
                <Select
                  className="select-vendor"
                  components={animatedComponents}
                  value={(!!this.state.displayValue?.project?.id) ? { value: this.state.displayValue?.project.id, label: (this.state.displayValue?.project.name + ' - ' + this.state.displayValue?.project.displayName) } : { value: '', label: "Select project" }}
                  options={(this.state.dmsProjects || []).map(item => {
                    return {
                      value: item.id,
                      label: item.name + ' - ' + item.displayName,
                    }
                  })}
                  onChange={(event) => {
                    let project = (this.state.dmsProjects || []).filter(gr => gr.id == event.value)[0]
                    if (project?.id !== this.state.displayValue?.project?.id) {
                      this.state.sitesSelected = [];
                      this.state.displayValue.site = null;
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          project: {...project},
                        }
                      }, () => {
                        this.getDMSSites();
                      })
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Site :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5,
              }}
                className={'form-c-row' + (!!editable ? '' : '-none')}
              >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Select
                    isClearable={!!editable}
                    className="select-vendor select-multi"
                    components={animatedComponents}
                    value={
                      this.state.sitesSelected
                    }
                    options={(this.state.dmsSites || []).map(item => {
                      return {
                        value: item.id,
                        //label: <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><span style={{marginRight: '15px'}}>{item.label}</span></div>,
                        label: item.label,
                      }
                    })}
                    isMulti
                    onChange={(event) => {
                      this.setState({ sitesSelected: event });
                      /*let site = (this.state.dmsSites || []).filter(gr => gr.id == event.value)[0]
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          site: {...site},
                        }
                      })*/
                    }}
                  />
                  {(!!this.state.isSiteChange) && (
                    <div style={{textAlign: 'right', marginTop: '10px'}}>
                      <span style={{textDecoration: 'underline', flex: 1, color: 'red', marginTop: '10px', cursor: 'pointer',}}
                        onClick={() => {
                          this.setState({
                            showFirstSubmitSites: !this.state.showFirstSubmitSites,
                          })
                        }}
                      >
                        {this.state.showFirstSubmitSites === true ? 'Hide' : 'Site has been changed, show first submit'}
                      </span>
                    </div>
                  )}
                  {(!!this.state.isSiteChange && this.state.showFirstSubmitSites === true) && (
                    <div style={{position: 'relative'}}>
                      <Select
                        isClearable={!!editable}
                        className="select-vendor"
                        components={animatedComponents}
                        value={(this.state.dmsSites || [])
                          .filter(s => {
                            return this.state.firstHis.siteIds.indexOf(s.id) > -1;
                          })
                          .map(item => {
                          return {
                            value: item.id,
                            //label: <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><span style={{marginRight: '15px'}}>{item.label}</span></div>,
                            label: item.label,
                          }
                        })}
                        options={(this.state.dmsSites || [])
                          .filter(s => {
                            return this.state.firstHis.siteIds.indexOf(s.id) > -1;
                          })
                          .map(item => {
                          return {
                            value: item.id,
                            //label: <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><span style={{marginRight: '15px'}}>{item.label}</span></div>,
                            label: item.label,
                          }
                        })}
                        isMulti
                      />
                      <div style={{
                        position: 'absolute',
                        top: '-3px', left: '-3px', right: '-3px', bottom: '-3px',
                        backgroundColor: '#00800026',
                      }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!!this.state.sitesSelected?.length && (
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Site Time period :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5, display: 'flex', flexDirection: 'column'}}>
                {this.state.sitesSelected.map((it, idx) => {
                  this.state.siteTimePeriodMap = this.state.siteTimePeriodMap || {};
                  let site = (this.state.dmsSites || []).filter(gr => gr.id == it.value)[0] || {};
                  this.state.siteTimePeriodMap[site.id] = this.state.siteTimePeriodMap[site.id] || {
                    siteId: site.id,
                    label: site.label,
                    override: false,
                    timePeriodDatesIsAlways: true,
                    timePeriodDatesStart: part30MinutesTime(Date.now()).getTime(),
                    timePeriodDatesEnd: part30MinutesTime(Date.now()).getTime(),
                    timePeriodDayInWeeksIsAlways: true,
                    timePeriodDayInWeeksIsMon: true,
                    timePeriodDayInWeeksIsTue: true,
                    timePeriodDayInWeeksIsWed: true,
                    timePeriodDayInWeeksIsThu: true,
                    timePeriodDayInWeeksIsFri: true,
                    timePeriodDayInWeeksIsSat: true,
                    timePeriodDayInWeeksIsSun: true,
                    timePeriodTimeInDayIsAlways: true,
                    timePeriodTimeInDayHourStart: 0,
                    timePeriodTimeInDayMinuteStart: 0,
                    timePeriodTimeInDayHourEnd: 23,
                    timePeriodTimeInDayMinuteEnd: 59,
                  };
                  return <div key={idx} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                      <span style={{textDecoration: 'underline', flex: 1, color: 'blue',}}>{it.label + ': '}</span>
                      <i style={{cursor: 'pointer',}} className={(!!editable) ? "fa fa-edit" : "fa fa-eye"}
                        onClick={() => {
                          if (this.state.siteTimePeriodMap[site.id].override === false) {
                            this.state.siteTimePeriodMap[site.id] = {
                              ...this.state.displayValue.timePeriod,
                              override: false,
                              siteId: site.id,
                              label: site.label,
                            }
                          }
                          this.setState({editTimePeriodSiteData: {...this.state.siteTimePeriodMap[site.id]}})
                        }}
                      />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '25px',}}>
                      {(toStringTimePeriod(this.state.siteTimePeriodMap[site.id].override === true ? this.state.siteTimePeriodMap[site.id] : /*this.state.displayValue.timePeriod*/{override: false})
                      .match(/(\[[^\[\]]+\][^\[\]]+)/g) || []).map((wodIt, wodIdx) => {
                        return <span key={idx + '_' + wodIdx}>{(wodIt || '').replace(/, *$/g, '')}</span>
                      })}
                    </div>

                     {(!!this.state.firstHis && this.state.lastHis && this.isChangePeriod({...this.state.firstHis.sites.filter(s => s.id === site.id)[0]?.timePeriod}, {...this.state.lastHis.sites.filter(s => s.id === site.id)[0]?.timePeriod})) && (
                        <div style={{textAlign: 'right', marginTop: '10px'}}>
                          <span style={{textDecoration: 'underline', flex: 1, color: 'red', marginTop: '10px', cursor: 'pointer',}}
                            onClick={() => {
                              this.state.showFirstTimePeriodSites = this.state.showFirstTimePeriodSites || {};
                              this.state.showFirstTimePeriodSites[site.id] = !this.state.showFirstTimePeriodSites[site.id];
                              this.setState({
                                showFirstTimePeriodSites: {...this.state.showFirstTimePeriodSites},
                              })
                            }}
                          >
                            {(!!this.state.showFirstTimePeriodSites && this.state.showFirstTimePeriodSites[site.id] === true) ? 'Hide' : 'Site time period been changed, show first submit'}
                          </span>
                        </div>
                      )}

                     {((!!this.state.firstHis && this.state.lastHis && this.isChangePeriod({...this.state.firstHis.sites.filter(s => s.id === site.id)[0]?.timePeriod}, {...this.state.lastHis.sites.filter(s => s.id === site.id)[0]?.timePeriod}))
                        && !!this.state.showFirstTimePeriodSites && this.state.showFirstTimePeriodSites[site.id] === true) && (
                        <div style={{position: 'relative'}}>
                          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                            <span style={{textDecoration: 'underline', flex: 1, color: 'blue',}}>{this.state.firstHis.sites.filter(s => s.id === site.id)[0]?.timePeriod?.siteLabel + ': '}</span>
                          </div>
                          <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '25px',}}>
                            {(toStringTimePeriod(this.state.firstHis.sites.filter(s => s.id === site.id)[0]?.timePeriod || {}).match(/(\[[^\[\]]+\][^\[\]]+)/g) || []).map((wodIt, wodIdx) => {
                              return <span key={wodIdx}>{(wodIt || '').replace(/, *$/g, '')}</span>
                            })}
                          </div>
                          <div style={{
                            position: 'absolute',
                            top: '-3px', left: '-3px', right: '-3px', bottom: '-3px',
                            backgroundColor: '#00800026',
                          }}></div>
                        </div>
                     )}


                  </div>
                })}
              </div>
            </div>
          </div>
          )}
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Time period :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5, display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                    <span style={{textDecoration: 'underline', flex: 1, color: 'blue',}}>{'All selected site: '}</span>
                    <i style={{cursor: 'pointer',}} className={(!!editable) ? "fa fa-edit" : "fa fa-eye"}
                      onClick={() => {
                        this.setState({editTimePeriodSiteData: {...this.state.displayValue.timePeriod, label: 'All selected site'}})
                      }}
                    />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '25px',}}>
                    {(toStringTimePeriod(this.state.displayValue.timePeriod || {}).match(/(\[[^\[\]]+\][^\[\]]+)/g) || []).map((wodIt, wodIdx) => {
                      return <span key={wodIdx}>{(wodIt || '').replace(/, *$/g, '')}</span>
                    })}
                  </div>

                  {(!!this.state.firstHis && this.state.lastHis && this.isChangePeriod({...this.state.firstHis.timePeriod, siteId: null, override: false}, {...this.state.lastHis.timePeriod, siteId: null, override: false})) && (
                    <div style={{textAlign: 'right', marginTop: '10px'}}>
                      <span style={{textDecoration: 'underline', flex: 1, color: 'red', marginTop: '10px', cursor: 'pointer',}}
                        onClick={() => {
                          this.setState({
                            showFirstTimePeriod: !this.state.showFirstTimePeriod,
                          })
                        }}
                      >
                        {this.state.showFirstTimePeriod === true ? 'Hide' : 'Time period been changed, show first submit'}
                      </span>
                    </div>
                  )}

                  {((!!this.state.firstHis && this.state.lastHis && this.isChangePeriod({...this.state.firstHis.timePeriod, siteId: null, override: false}, {...this.state.lastHis.timePeriod, siteId: null, override: false})) && this.state.showFirstTimePeriod === true) && (
                    <div style={{position: 'relative'}}>
                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                        <span style={{textDecoration: 'underline', flex: 1, color: 'blue',}}>{'All selected site: '}</span>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '25px',}}>
                        {(toStringTimePeriod(this.state.firstHis.timePeriod || {}).match(/(\[[^\[\]]+\][^\[\]]+)/g) || []).map((wodIt, wodIdx) => {
                          return <span key={wodIdx}>{(wodIt || '').replace(/, *$/g, '')}</span>
                        })}
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '-3px', left: '-3px', right: '-3px', bottom: '-3px',
                        backgroundColor: '#00800026',
                      }}></div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Users :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5,}}
                className={'form-c-row' + (!!editable ? '' : '-none')}
              >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Select
                    isClearable={!!editable}
                    className="select-vendor select-multi"
                    components={animatedComponents}
                    value={
                      this.state.dmsUsersSelected || []
                    }
                    options={(this.state.dmsUsers || []).map(item => {
                      return {
                        value: item.email,
                        label: item.firstName + ' ' + item.lastName + ' [' + item.phoneNumber + ']',
                        phone: item.phoneNumber,
                      }
                    })}
                    isMulti
                    onChange={(event) => {
                      this.setState({ dmsUsersSelected: event });
                    }}
                  />
                  {(!!this.state.isUserPhoneChange) && (
                    <div style={{textAlign: 'right', marginTop: '10px'}}>
                      <span style={{textDecoration: 'underline', flex: 1, color: 'red', marginTop: '10px', cursor: 'pointer',}}
                        onClick={() => {
                          this.setState({
                            showFirstSubmitUserPhones: !this.state.showFirstSubmitUserPhones,
                          })
                        }}
                      >
                        {this.state.showFirstSubmitUserPhones === true ? 'Hide' : 'User has been changed, show first submit'}
                      </span>
                    </div>
                  )}

                  {(!!this.state.isUserPhoneChange && this.state.showFirstSubmitUserPhones === true) && (
                    <div style={{position: 'relative'}}>
                      <Select
                        isClearable={!!editable}
                        className="select-vendor"
                        components={animatedComponents}
                        value={(this.state.dmsUsers || [])
                          .filter(s => {
                            return this.state.firstHis.userPhones.indexOf(s.phoneNumber) > -1;
                          })
                          .map(item => {
                          return {
                            value: item.email,
                            label: item.firstName + ' ' + item.lastName + ' [' + item.phoneNumber + ']',
                            phone: item.phoneNumber,
                          }
                        })}
                        options={(this.state.dmsUsers || [])
                          .filter(s => {
                            return this.state.firstHis.userPhones.indexOf(s.phoneNumber) > -1;
                          })
                          .map(item => {
                          return {
                            value: item.email,
                            label: item.firstName + ' ' + item.lastName + ' [' + item.phoneNumber + ']',
                            phone: item.phoneNumber,
                          }
                        })}
                        isMulti
                      />
                      <div style={{
                        position: 'absolute',
                        top: '-3px', left: '-3px', right: '-3px', bottom: '-3px',
                        backgroundColor: '#00800026',
                      }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Guests :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5, display: 'flex', flexDirection: 'column'}}
                className={'form-c-row' + (!!editable ? '' : '-none')}
              >
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>

                  {(!!editable) && (
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                    <div style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center',
                            marginBottom: '5px',
                            paddingBottom: '5px'
                    }}>
                      <Input
                        key={'g_name_' + this.state.refreshKey}
                        field={{
                          name: "Name"
                        }}
                        name="name"
                        value={this.state.tempGuestName}
                        placeholder={"Name, ex: John Smith"}
                        groupstyle={{ margin: "0", marginRight: '5px', minWidth: '200px', flex: 1}}
                        onChange={value => {
                          this.setState({
                            tempGuestName: value,
                          })
                        }}
                      />
                      <Input
                        key={'g_phone_' + this.state.refreshKey}
                        field={{
                          name: "Phone"
                        }}
                        name="name"
                        value={this.state.tempGuestPhone}
                        placeholder={"Phone, ex: +06500001111"}
                        groupstyle={{ margin: "0", marginLeft: '5px', minWidth: '200px', flex: 1}}
                        onChange={value => {
                          this.setState({
                            tempGuestPhone: value,
                          })
                        }}
                      />
                    </div>
                    {(!!this.state.checkboxCreateNewUser) && (
                    <div style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                    }}>
                      <Input
                        key={'g_email_' + this.state.refreshKey}
                        field={{
                          name: "Email"
                        }}
                        name="email"
                        value={this.state.tempGuestEmail}
                        placeholder={"Email, ex: example@example.com"}
                        groupstyle={{ margin: "0", marginRight: '5px', minWidth: '200px', flex: 1}}
                        onChange={value => {
                          this.setState({
                            tempGuestEmail: value,
                          })
                        }}
                      />
                      <Input
                        key={'g_password_' + this.state.refreshKey}
                        field={{
                          name: "Password"
                        }}
                        name="password"
                        value={this.state.tempGuestPassword}
                        placeholder={'Password'}
                        groupstyle={{ margin: "0", marginLeft: '5px', minWidth: '200px', flex: 1}}
                        type='password'
                        onChange={value => {
                          this.setState({
                            tempGuestPassword: value,
                          })
                        }}
                      />
                    </div>
                    )}
                    <div style={{display: 'flex', marginTop: '10px',
                      borderBottom: !!this.state.siteGuests?.length ? '0.75px solid rgb(187, 187, 187)' : undefined,
                      marginBottom: '5px',
                      paddingBottom: '5px'
                    }}>
                      <div style={{flex: 1}}>
                        <div className="checkbox-container">
                          <input
                            type="checkbox"
                            id="change-pwd"
                            name="change-pwd"
                            checked={!!this.state.checkboxCreateNewUser}
                            value={this.state.checkboxCreateNewUser}
                            onChange={(event) => {
                              if (!!event.target.checked) {
                                this.setState({
                                  checkboxCreateNewUser: true,
                                });
                              } else {
                                this.setState({
                                  checkboxCreateNewUser: false,
                                });
                              }
                            }}
                          />
                          <span style={{ marginLeft: '5px' }}>{'Create new user'}</span>
                        </div>
                      </div>

                      <div
                        style={{ marginLeft: '5px', width: 'fit-content', padding: '10px', }}
                        className="button-btn"
                        onClick={async () => {

                          if (!(this.state.tempGuestName || '').trim().length) {
                            toastrs.show('error', 'Name invalid!');
                            return;
                          }
                          if (!(this.state.tempGuestPhone || '').trim().length || !/^\+[1-9][0-9]{7,}$/g.test(this.state.tempGuestPhone.trim())) {
                            toastrs.show('error', 'Phone invalid!');
                            return;
                          }

                          window._preLogin = preLogin;
                          window._tempGuestPhone = this.state.tempGuestPhone;
                          await this.setState({loading: true});
                          let checkPhone = await preLogin({ username: (this.state.tempGuestPhone || '').trim() });
                          await this.setState({loading: false});
                          if (!!checkPhone.success && !!checkPhone.response?.app.length && checkPhone.response?.app.indexOf('DMS') > -1) {
                            toastrs.show('error', 'Phone already exists!');
                            return;
                          }

                          window._state = this.state;
                          if (!!this.state.checkboxCreateNewUser) {
                            let email = this.state.tempGuestEmail || '';
                            if (!/^([a-z0-9_\-]+\.){0,}[a-z0-9_\-]+@([a-z0-9_\-]+\.){1,}[a-z0-9_\-]+$/g.test(email.toLowerCase().trim())) {
                              toastrs.show('error', 'Email invalid!');
                              return;
                            }
                            await this.setState({loading: true});
                            let checkEmail = await preLogin({ username: (email || '').toLowerCase().trim() });
                            await this.setState({loading: false});
                            if (!!checkEmail.success && !!checkEmail.response?.app.length && checkEmail.response?.app.indexOf('DMS') > -1) {
                              toastrs.show('error', 'Email already exists!');
                              return;
                            }
                            let pwd = (this.state.tempGuestPassword || '').trim();

                            if (pwd.length < 8 || !/.*[a-z].*/g.test(pwd) || !/.*[A-Z].*/g.test(pwd) || !/.*[0-9].*/g.test(pwd) || !/.*[!@#\\$%^&*\(\)\|\[\]].*/g.test(pwd)) {
                              toastrs.show('error', "password invalid(password must contain lowercase, uppercase, numeric, special characters and at least 8 characters, ex: aA1!@#$%^&*()[])!");
                              return;
                            }
                          }
                          let exists = this.state.siteGuests.filter(g => !!g.phone && g.phone === (this.state.tempGuestPhone || '').trim())[0];
                          if (!!exists) {
                            toastrs.show('error', 'Phone already exist!');
                            return;
                          }
                          exists = this.state.siteGuests.filter(g => !!g.email && g.email.toLowerCase().trim() === (this.state.tempGuestEmail || '').toLowerCase().trim())[0];
                          if (!!exists) {
                            toastrs.show('error', 'Email already exist!');
                            return;
                          }

                          if (!!exists || !(this.state.tempGuestName || '').trim().length || !(this.state.tempGuestPhone || '').trim().length) {
                            return
                          } else {
                            this.state.siteGuests.push({
                              name: this.state.tempGuestName.trim(),
                              phone: this.state.tempGuestPhone.trim(),
                              email: (!!this.state.checkboxCreateNewUser && this.state.tempGuestEmail?.length > 0) ? this.state.tempGuestEmail.toLowerCase().trim() : null,
                              password: this.state.tempGuestPassword?.length > 0 ? this.state.tempGuestPassword.trim() : null,
                              createNewUser: !!this.state.checkboxCreateNewUser,
                            })
                            this.setState({
                              tempGuestName: '',
                              tempGuestPhone: '',
                              tempGuestEmail: '',
                              tempGuestPassword: '',
                              refreshKey: Date.now(),
                            })
                            toastrs.show('success', "Added.")
                          }
                        }}
                      >
                        <span>{'ADD GUEST'}</span>
                      </div>
                    </div>
                  </div>
                  )}
                  <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                    pointerEvents: (!!editable) ? undefined : 'none',
                  }}>
                    {this.state.siteGuests.map((wodIt, wodIdx) => {
                      return (
                        <div
                          key={wodIt.name + ' ' + '[' + wodIt.phone + ']'}
                          style={{color: 'rgb(51, 51, 51)', fontSize: '85%', overflow: 'hidden', padding: '3px 6px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', backgroundColor: 'rgb(230, 230, 230)', borderRadius: '2px', display: 'flex', margin: '2px', minWidth: '0px', boxSizing: 'border-box', width: 'fit-content', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          <span>{wodIt.name + ' ' + '[' + wodIt.phone + ']' + (wodIt.email?.length > 1 ? ' [' + wodIt.email + ']' : '')}</span>
                          <svg
                            onClick={() => {
                              if (this.state.siteGuests[wodIdx].phone === wodIt.phone) {
                                this.state.siteGuests.splice(wodIdx, 1);
                                this.setState({
                                  siteGuests: [].concat(this.state.siteGuests),
                                })
                              }
                            }}
                            height={14} width={14} viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg" style={{color: '#76838f', marginLeft: '10px', cursor: 'pointer'}}><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
                          </svg>
                        </div>
                      )
                    })}
                  </div>
                  {(!!this.state.isGuestChange) && (
                    <div style={{textAlign: 'right', marginTop: '10px'}}>
                      <span style={{textDecoration: 'underline', flex: 1, color: 'red', marginTop: '10px', cursor: 'pointer',}}
                        onClick={() => {
                          this.setState({
                            showFirstSubmitGuests: !this.state.showFirstSubmitGuests,
                          })
                        }}
                      >
                        {this.state.showFirstSubmitGuests === true ? 'Hide' : 'Guest has been changed, show first submit'}
                      </span>
                    </div>
                  )}

                  {(!!this.state.isGuestChange && this.state.showFirstSubmitGuests === true) && (
                    <div style={{position: 'relative'}}>
                      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                        pointerEvents: (!!editable) ? undefined : 'none',
                      }}>
                        {this.state.firstHis.guests.map((wodIt, wodIdx) => {
                          return (
                            <div
                              key={wodIt.name + ' ' + '[' + wodIt.phone + ']'}
                              style={{color: 'rgb(51, 51, 51)', fontSize: '85%', overflow: 'hidden', padding: '3px 6px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', backgroundColor: 'rgb(230, 230, 230)', borderRadius: '2px', display: 'flex', margin: '2px', minWidth: '0px', boxSizing: 'border-box', width: 'fit-content', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                              <span>{wodIt.name + ' ' + '[' + wodIt.phone + ']' + (wodIt.email?.length > 1 ? ' [' + wodIt.email + ']' : '')}</span>
                              <svg
                                onClick={() => {

                                }}
                                height={14} width={14} viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg" style={{color: '#76838f', marginLeft: '10px', cursor: 'pointer'}}><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
                              </svg>
                            </div>
                          )
                        })}
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '-3px', left: '-3px', right: '-3px', bottom: '-3px',
                        backgroundColor: '#00800026',
                      }}></div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
          {(!!this.state.displayValue?.id) && (
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>

            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Time terminate :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5}} className='input-wrap'>
                {(isPIC && !!editable) ?
                <DatePicker
                  className="date-picker"
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                  selected={this.state.displayValue.timeTerminate > 0 ? new Date(this.state.displayValue.timeTerminate) : null}
                  timeFormat="HH:mm:ss"
                  placeholderText={"yyyy-MM-dd HH:mm:ss"}
                  showTimeSelect
                  onChange={(date: Date) => {
                    if (!!date) {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timeTerminate: date.getTime()
                        }
                      })
                    }
                  }}
                />
                :
                <span>
                  {this.state.displayValue.timeTerminate > 0 ? moment(new Date(this.state.displayValue.timeTerminate)).format("YYYY-MM-DD HH:mm:ss") : null}
                </span>
                }
              </div>
            </div>
          </div>
          )}

          <div className="form-group ml-10" style={{marginTop: '15px'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ display: 'flex', flexDirection: 'row', }}
            >
              {!!editable && (
              <div
                style={{ marginLeft: '0px', margin: 'unset' }}
                className="button-btn w-80"
                onClick={async () => {
                  if (!this.validates()) {
                    this.setState({});
                    return;
                  }
                  if (!this.state.displayValue?.project?.id) {
                    Swal.fire({
                      html: `<p style='text-align: center; font-size: 14px;'>${'Project is required!'}</p>`,
                      icon: 'error',
                      confirmButtonText: 'OK',
                    });
                    return;
                  }
                  console.info('_this.state', this.state);
                  this.state.displayValue.projectId = this.state.displayValue?.project?.id;
                  this.state.displayValue.sites = [];

                  (this.state.sitesSelected || []).map(obj => {
                    let siteId = obj.value;
                    if (!siteId || siteId === 'undefined') {
                      return;
                    }
                    let tmpTimePeriod = {...this.state.siteTimePeriodMap[siteId]};

                    delete tmpTimePeriod.label;
                    delete tmpTimePeriod.siteId;
                    delete tmpTimePeriod.siteLabel;
                    this.state.displayValue.sites.push({
                      id: siteId,
                      timePeriod: tmpTimePeriod.override !== true ? null : {...tmpTimePeriod},
                    });
                  })

                  this.state.displayValue.userPhones = [];
                  (this.state.dmsUsersSelected || []).map((us) => {
                    this.state.displayValue.userPhones.push(us.phone);
                  })

                  this.state.displayValue.guests = this.state.siteGuests || []

                  let result = await Swal.fire({
                    html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                    icon: 'question',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                  });
                  if (!result || !result.isConfirmed) return;
                  this.setState({loading: true});
                  let payload = {...this.state.displayValue};
                  delete payload.project;
                  delete payload.allHis;
                  delete payload.approvalBy;
                  delete payload.createdBy;
                  delete payload.status;
                  delete payload.createDate;
                  delete payload.isGuest;
                  delete payload.rejectBy;
                  delete payload.rejectBy;
                  delete payload.users;
                  delete payload.name;
                  delete payload.site;
                  delete payload.start;
                  delete payload.end;
                  if (payload.timePeriod) {
                    payload.timePeriod = {...payload.timePeriod}
                    delete payload.timePeriod.label;
                    delete payload.timePeriod.siteId;
                    delete payload.timePeriod.siteLabel;
                  }
                  let rp = null;
                  if (!!payload.id) {
                    rp = await updateDMSApplication(payload);
                  } else {
                    rp = await saveDMSApplication(payload);
                  }
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
              )}
              {(!!isPIC && this.state.displayValue?.status === 'NEW' && !!this.state.displayValue?.id) && (
              <div
                style={{ marginLeft: '5px' }}
                className="button-btn w-80"
                onClick={async () => {
                  let result = await Swal.fire({
                    html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                    icon: 'question',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                  });
                  if (!result || !result.isConfirmed) return;
                  this.setState({loading: true});
                  let rp = await approveDMSApplication({id: this.state.displayValue.id});
                  this.setState({loading: false});
                  if (rp.success) {
                    Swal.fire({
                      html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                      icon: 'success',
                      confirmButtonText: 'OK',
                    }).then(() => {
                      this.props.onClose && this.props.onClose(this.state.displayValue)
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
                <span>{'APPROVE'}</span>
              </div>
              )}
              {(!!isPIC && this.state.displayValue?.status === 'NEW' && !!this.state.displayValue?.id) && (
              <div
                style={{ marginLeft: '5px' }}
                className="button-btn w-80"
                onClick={async () => {
                  let result = await Swal.fire({
                    html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                    icon: 'question',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                  });
                  if (!result || !result.isConfirmed) return;
                  this.setState({loading: true});
                  let rp = await rejectDMSApplication({id: this.state.displayValue.id});
                  this.setState({loading: false});
                  if (rp.success) {
                    Swal.fire({
                      html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                      icon: 'success',
                      confirmButtonText: 'OK',
                    }).then(() => {
                      this.props.onClose && this.props.onClose(this.state.displayValue)
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
                <span>{'REJECT'}</span>
              </div>
              )}
              {(!!isPIC && this.state.displayValue?.status === 'APPROVAL' && !!this.state.displayValue?.id) && (
              <div
                style={{ marginLeft: '5px' }}
                className="button-btn w-120"
                onClick={async () => {
                  let result = await Swal.fire({
                    html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                    icon: 'question',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                  });
                  if (!result || !result.isConfirmed) return;
                  this.setState({loading: true});
                  let rp = await terminateDMSApplication({id: this.state.displayValue.id});
                  this.setState({loading: false});
                  if (rp.success) {
                    Swal.fire({
                      html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                      icon: 'success',
                      confirmButtonText: 'OK',
                    }).then(() => {
                      this.props.onClose && this.props.onClose(this.state.displayValue)
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
                <span>{'TERMINATE'}</span>
              </div>
              )}
              {((this.state.displayValue.createdBy === this.props.loggerInUser.phoneNumber) && this.state.displayValue?.status === 'NEW' && !!this.state.displayValue?.id) && (
              <div
                style={{ marginLeft: '5px' }}
                className="button-btn w-80"
                onClick={async () => {
                  let result = await Swal.fire({
                    html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                    icon: 'question',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                  });
                  if (!result || !result.isConfirmed) return;
                  this.setState({loading: true});
                  let rp = await deleteDMSApplication({id: this.state.displayValue.id});
                  this.setState({loading: false});
                  if (rp.success) {
                    Swal.fire({
                      html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                      icon: 'success',
                      confirmButtonText: 'OK',
                    }).then(() => {
                      this.props.onClose && this.props.onClose(this.state.displayValue)
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
                <span>{'DELETE'}</span>
              </div>
              )}
              {!!editable && (
              <div
                style={{ marginLeft: '5px' }}
                className="button-btn w-80"
                onClick={() => {
                  this.props.onClose && this.props.onClose();
                }}
              >
                <span>{'CANCEL'}</span>
              </div>
              )}
            </div>
          </div>
          {!!this.state.editTimePeriodSiteData?.label && (
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#00000055'}}></div>
          )}
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

          {!!this.state.editTimePeriodSiteData?.label && (
          <div className="col-md-6">
            <TimePeriodPopup data={this.state.editTimePeriodSiteData}
              editable={!!editable}
              onSave={(siteTimePeriod) => {
                siteTimePeriod.override = true;
                if (!siteTimePeriod.siteId && siteTimePeriod.label === 'All selected site') {
                  this.state.displayValue.timePeriod = siteTimePeriod;
                } else {
                  this.state.siteTimePeriodMap[siteTimePeriod.siteId] = siteTimePeriod;
                }
                this.setState({editTimePeriodSiteData: null})
              }}
              onClose={() => {
                this.setState({editTimePeriodSiteData: null})
              }}
            />
          </div>
          )}
      </div>
    )
  }
}

class TimePeriodPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: { ...this.props.data },
      validate: {},
      ignores: [
        'timePeriodDatesIsAlways',
        'timePeriodDayInWeeksIsAlways',
        'timePeriodTimeInDayIsAlways',
        'timePeriodDayInWeeksIsMon',
        'timePeriodDayInWeeksIsTue',
        'timePeriodDayInWeeksIsWed',
        'timePeriodDayInWeeksIsThu',
        'timePeriodDayInWeeksIsFri',
        'timePeriodDayInWeeksIsSat',
        'timePeriodDayInWeeksIsSun',
        'status',
        'label',
        'applicationEmail',
        'siteId',
        'siteLabel',
        'override',
      ],
      isEdit: this.props.isEdit,
    };

    console.info('this.props.data', this.props.data)
  }

  componentDidMount() {

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
      this.state.validate[field] = !value || !isNaN(Number(value.toLowerCase().trim()))
    } else {
      this.state.validate[field] = !!value;
    }

    if (field === 'timePeriodTimeInDayHourStart') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 23
    }
    if (field === 'timePeriodTimeInDayHourEnd') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 23
    }
    if (field === 'timePeriodTimeInDayMinuteStart') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 59
    }
    if (field === 'timePeriodTimeInDayMinuteEnd') {
      this.state.validate[field] = /[0-9]{1,2}/g.test(value) && Number(value) >= 0 && Number(value) <= 59
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
    console.info('this.state.displayValue?.site', this.state.displayValue?.site)
    return (
      <div style={{ paddingTop: '15px', flex: 1, overflow: 'visible' }}>

        <div className="col-md-12">
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
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>{'Time period for: ' + this.props.data?.label}</span>
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

        <div style={{pointerEvents: !!this.props.editable ? true : 'none'}}>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>

            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Dates :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5}}>
                <div className="checkbox-container" style={{paddingBottom: '15px',}}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDatesIsAlways}
                    value={this.state.displayValue.timePeriodDatesIsAlways}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDatesIsAlways: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Always'}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',

                  opacity: !this.state.displayValue.timePeriodDatesIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDatesIsAlways ? undefined : 'none',
                }}>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <span style={{  }}>{'Start Date:'}</span>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <DatePicker
                        className="date-picker"
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        selected={this.state.displayValue.timePeriodDatesStart > 0 ? new Date(this.state.displayValue.timePeriodDatesStart) : null}
                        placeholderText={"yyyy-MM-dd HH:mm:ss"}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                        onChange={(date: Date) => {
                          if (!!date) {
                            this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                timePeriodDatesStart: date.getTime()
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

                  opacity: !this.state.displayValue.timePeriodDatesIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDatesIsAlways ? undefined : 'none',
                }}>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <span style={{  }}>{'End Date:'}</span>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <DatePicker
                        className="date-picker"
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        selected={this.state.displayValue.timePeriodDatesEnd > 0 ? new Date(this.state.displayValue.timePeriodDatesEnd) : null}
                        placeholderText={"yyyy-MM-dd HH:mm:ss"}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                        onChange={(date: Date) => {
                          if (!!date) {
                            this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                timePeriodDatesEnd: date.getTime()
                              }
                            })
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Days :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5}}>
                <div className="checkbox-container" style={{paddingBottom: '15px',}}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsAlways}
                    value={this.state.displayValue.timePeriodDayInWeeksIsAlways}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsAlways: !!event.target.checked,
                        }
                      }, () => {
                        if (!!this.state.displayValue.timePeriodDayInWeeksIsAlways) {
                          this.setState({
                            displayValue: {
                              ...this.state.displayValue,
                              timePeriodDayInWeeksIsMon: true,
                              timePeriodDayInWeeksIsTue: true,
                              timePeriodDayInWeeksIsWed: true,
                              timePeriodDayInWeeksIsThu: true,
                              timePeriodDayInWeeksIsFri: true,
                              timePeriodDayInWeeksIsSat: true,
                              timePeriodDayInWeeksIsSun: true,
                            }
                          });
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'All days'}</span>
                </div>
                <div className="checkbox-container" style={{
                  opacity: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : 'none',
                }}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsMon}
                    value={this.state.displayValue.timePeriodDayInWeeksIsMon}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsMon: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Mon'}</span>
                </div>
                <div className="checkbox-container" style={{
                  opacity: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : 'none',
                }}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsTue}
                    value={this.state.displayValue.timePeriodDayInWeeksIsTue}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsTue: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Tue'}</span>
                </div>
                <div className="checkbox-container" style={{
                  opacity: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : 'none',
                }}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsWed}
                    value={this.state.displayValue.timePeriodDayInWeeksIsWed}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsWed: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Wed'}</span>
                </div>
                <div className="checkbox-container" style={{
                  opacity: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : 'none',
                }}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsThu}
                    value={this.state.displayValue.timePeriodDayInWeeksIsThu}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsThu: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Thu'}</span>
                </div>
                <div className="checkbox-container" style={{
                  opacity: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : 'none',
                }}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsFri}
                    value={this.state.displayValue.timePeriodDayInWeeksIsFri}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsFri: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Fri'}</span>
                </div>
                <div className="checkbox-container" style={{
                  opacity: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : 'none',
                }}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsSat}
                    value={this.state.displayValue.timePeriodDayInWeeksIsSat}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsSat: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Sat'}</span>
                </div>
                <div className="checkbox-container" style={{
                  opacity: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodDayInWeeksIsAlways ? undefined : 'none',
                }}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodDayInWeeksIsSun}
                    value={this.state.displayValue.timePeriodDayInWeeksIsSun}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodDayInWeeksIsSun: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'Sun'}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
                <label
                  htmlFor="telephone"
                  className="col-md-12 control-label visible-lg-block"
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    fontWeight: 500,
                    color: "#222222"
                  }}
                >
                  Hours :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div style={{flex: 2.5}}>
                <div className="checkbox-container" style={{paddingBottom: '15px',}}>
                  <input
                    type="checkbox"
                    id="change-pwd"
                    name="change-pwd"
                    checked={!!this.state.displayValue.timePeriodTimeInDayIsAlways}
                    value={this.state.displayValue.timePeriodTimeInDayIsAlways}
                    style={{width: 'unset'}}
                    onChange={(event) => {
                      this.setState({
                        displayValue: {
                          ...this.state.displayValue,
                          timePeriodTimeInDayIsAlways: !!event.target.checked,
                        }
                      });
                    }}
                  />
                  <span style={{ marginLeft: '5px' }}>{'All hours'}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  width: '100%',

                  opacity: !this.state.displayValue.timePeriodTimeInDayIsAlways ? undefined : '0.5',
                  pointerEvents: !this.state.displayValue.timePeriodTimeInDayIsAlways ? undefined : 'none',
                }}>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <span style={{  }}>{'Start hour:'}</span>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <Input
                        key={this.state.refreshKey}
                        field={{
                          name: "Name"
                        }}
                        name="name"
                        value={this.state.displayValue.timePeriodTimeInDayHourStart === 0 ? '0' : this.state.displayValue.timePeriodTimeInDayHourStart}
                        placeholder={"0"}
                        groupstyle={{ margin: "auto" }}
                        onChange={value => this.handleChange('timePeriodTimeInDayHourStart', value)}
                      />
                      {this.state.validate.timePeriodTimeInDayHourStart === false ?
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: '400',
                          }}
                        >
                          {(!this.state.displayValue.timePeriodTimeInDayHourStart || !this.state.displayValue.timePeriodTimeInDayHourStart.trim().length) ? 'Start hour is required!' : 'Start hour invalid!'}
                        </small>
                        : null}
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <span style={{  }}>{'Start minute:'}</span>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <Input
                        key={this.state.refreshKey}
                        field={{
                          name: "timePeriodTimeInDayMinuteStart"
                        }}
                        name="timePeriodTimeInDayMinuteStart"
                        value={this.state.displayValue.timePeriodTimeInDayMinuteStart === 0 ? '0' : this.state.displayValue.timePeriodTimeInDayMinuteStart}
                        placeholder={"0"}
                        groupstyle={{ margin: "auto" }}
                        onChange={value => this.handleChange('timePeriodTimeInDayMinuteStart', value)}
                      />
                      {this.state.validate.timePeriodTimeInDayMinuteStart === false ?
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: '400',
                          }}
                        >
                          {(!this.state.displayValue.timePeriodTimeInDayMinuteStart || !this.state.displayValue.timePeriodTimeInDayMinuteStart.trim().length) ? 'Start minute is required!' : 'Start minute invalid!'}
                        </small>
                        : null}
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <span style={{  }}>{'End hour:'}</span>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <Input
                        key={this.state.refreshKey}
                        field={{
                          name: "Name"
                        }}
                        name="name"
                        value={this.state.displayValue.timePeriodTimeInDayHourEnd === 0 ? '0' : this.state.displayValue.timePeriodTimeInDayHourEnd}
                        placeholder={"23"}
                        groupstyle={{ margin: "auto" }}
                        onChange={value => this.handleChange('timePeriodTimeInDayHourEnd', value)}
                      />
                      {this.state.validate.timePeriodTimeInDayHourEnd === false ?
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: '400',
                          }}
                        >
                          {(!this.state.displayValue.timePeriodTimeInDayHourEnd || !this.state.displayValue.timePeriodTimeInDayHourEnd.trim().length) ? 'End hour is required!' : 'End hour invalid!'}
                        </small>
                        : null}
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "unset" }}>
                    <span style={{  }}>{'End minute:'}</span>
                    <div
                      className="input-wrap has-feedback has-success"
                      style={{ position: "relative" }}
                    >
                      <Input
                        key={this.state.refreshKey}
                        field={{
                          name: "timePeriodTimeInDayMinuteEnd"
                        }}
                        name="timePeriodTimeInDayMinuteEnd"
                        value={this.state.displayValue.timePeriodTimeInDayMinuteEnd === 0 ? '0' : this.state.displayValue.timePeriodTimeInDayMinuteEnd}
                        placeholder={"59"}
                        groupstyle={{ margin: "auto" }}
                        onChange={value => this.handleChange('timePeriodTimeInDayMinuteEnd', value)}
                      />
                      {this.state.validate.timePeriodTimeInDayMinuteEnd === false ?
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: '400',
                          }}
                        >
                          {(!this.state.displayValue.timePeriodTimeInDayMinuteEnd || !this.state.displayValue.timePeriodTimeInDayMinuteEnd.trim().length) ? 'End minute is required!' : 'End minute invalid!'}
                        </small>
                        : null}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="form-group ml-10" style={{marginTop: '15px',
            visibility: !!this.props.editable ? undefined : 'hidden',
            pointerEvents: !!this.props.editable ? undefined : 'none',
          }}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', }}
            >
              <div
                style={{ marginLeft: '0px', margin: 'unset' }}
                className="button-btn w-80"
                onClick={async () => {
                  if (this.validates()) {
                    this.props.onSave && this.props.onSave(this.state.displayValue)
                  }
                }}
              >
                <span>{'SAVE'}</span>
              </div>
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
        applicationId: this.state.displayValue.id,
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
        applicationId: this.state.displayValue.id,
      },
      limit: this.state.limitDMSPicUserInRow|| 10,
      offset: this.state.offsetDMSPicUserInRow || 0,
    };
    const rp = await getDMSApplicationUsers(params);
    this.setState({
      addedAppUserInRow: rp?.results || [],
      selectedRows: rp?.results || [],
      totalRecordsDMSPicUserInRow: rp?.totalRows,
      totalPagesDMSPicUserInRow: Math.floor(((rp?.totalRows || 0) + 9) / 10),
      pageIndexDMSPicUserInRow: Math.floor((rp?.offset + 9) / 10) + 1,
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
              }}>{'INFORMATION OF APPLICATION : '} {this.state.displayValue.name}</span>
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
                    style={{ color: !!this.state.namePicUserColor ? this.state.namePicUserColor : '#8b838f', }}>{'APP USERS'}</span>
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
                {/*
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
                */}

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
                {/*
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
                    }}>{'UPDATE USERS'}</span>
                  </div>
                </div>
                */}
                <table className="table" style={{ width: '100%', marginTop: '10px' }}>
                  <thead className="thead-dark">
                      <tr>
                        <th className="table-th" scope="col">User ID</th>
                        <th className="table-th" scope="col">Email</th>
                        <th className="table-th" scope="col">Phone</th>
                        <th className="table-th" scope="col">Name</th>
                      </tr>
                  </thead>
                  <tbody>
                  {(this.state.addedAppUserInRow || [])
                    .map((it, index) => {
                      return (
                          <tr key={index}>
                            <td className="table-td">
                              {it.userId || 'Guest'}
                            </td>
                            <td className="table-td">
                              <span>{it.email}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.phoneNumber}</span>
                            </td><td className="table-td">
                              <span>{it.name}</span>
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
                          applicationId: this.props.data.id,
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
                          applicationId: this.props.data.id,
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
