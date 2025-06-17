import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Input, Pagination, ProgressLoading, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import 'moment-timezone';
import DatePicker from "react-datepicker";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';

import {
  getEachUserPermissions,
  getUserGroups,
  getUserPlatforms,
  getUserProjects,
  getUserRoles,
  getUsers,
  updatePermission,
  updateUserGroup,
  updateUserPlatform,
  updateUserProject,
  updateUserRole,
} from '@app/api/user';
import {
  getCompanies,
  getGroupUsers,
  getKeyGroups,
  getKeys,
  getLockGroups,
  getPayments,
  getPermission,
  getProjectTags,
  getRoles,
  getDMSSites,
  saveDMSSite,
  deleteDMSSite,
  deleteDMSWorkOrders,
  getDMSSiteWorkOrders,
  getDMSSiteLocations,
  saveDMSWorkOrder,
  getDMSApplications,
} from '@app/api/log';
import ReactTooltip from 'react-tooltip';
import moment from "moment";

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
`;

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
    let { query: { q, page, name, siteId, groupId }, asPath, req, initialState } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      limit: 20,
      offset: (pageNumber - 1) * 20,
      options: {
        name,
        siteId,
        groupId
      }
    };
    let rp = await getDMSSiteWorkOrders(params, req);
    rp = rp || {};
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
      searchName: params.options.name,
      querySite: params.options.siteId,
      queryGroup: params.options.groupId,
    };
  }

  componentDidMount() {
    this.setState({ mapKey: Date.now() });
    this.searchGroup();
    this.getDMSSites();
  }

  searchGroup = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit1 || 1000,
      offset: this.state.offset1 || 0,
    };
    const rp = await getGroupUsers(params);

    let slGroup;
    if (!!this.state.queryGroup) {
      const result = (rp?.response?.results || []).filter(site => site.id === parseInt(this.state.queryGroup));
      if (result.length > 0) {
        slGroup = { value: result[0].id, label: result[0].name };
      }
    }

    this.setState({
      dmsUserGroups: rp?.response?.results || [],
      searchGroup: slGroup,
      loading: false,
    }, () => {
      console.info('dmsUserGroups --->', this.state.dmsUserGroups);
    });
  }

  getDMSSites = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit1 || 10000,
      offset: this.state.offset1 || 0,
    };
    const rp = await getDMSSites(params);

    let slSite;
    if (!!this.state.querySite) {
      const result = (rp?.results || []).filter(site => site.id === parseInt(this.state.querySite));
      if (result.length > 0) {
        slSite = { value: result[0].id, label: result[0].label };
      }
    }

    this.setState({
      dmsSites: rp?.results || [],
      searchSite: slSite,
      loading: false,
    }, () => {
      console.info('dmsSites --->', this.state.dmsSites);
    });
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Work Orders Management'}>
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
                  dmsUserGroups={this.state.dmsUserGroups || []}
                  dmsSites={this.state.dmsSites || []}
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
                    <h5 className="site-title">Work Orders Management</h5>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                      className="item"
                    >
                      <Select
                        className="select-vendor w-full"
                        components={animatedComponents}
                        value={this.state.searchSite || { value: '', label: "Select site" }}
                        options={(this.state.dmsSites || []).map(item => {
                          return {
                            value: item.id,
                            label: item.label,
                          }
                        })}
                        onChange={(event) => {
                          if (!event.value) {
                            this.setState({
                              searchSite: undefined,
                            });
                          } else {
                            this.setState({
                              searchSite: event
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div style={{
                    padding: '30px',
                    borderBottom: '1px solid #ddd',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    display: 'flex',
                  }}>
                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                    <div
                      data-tip="Apply filters and search"
                      className="button-btn w-80 mr-10"
                      onClick={() => {
                        const options = {
                          name: this.state.searchName || undefined,
                          siteId: this.state.searchSite?.value || undefined,
                          groupId: this.state.searchGroup?.value || undefined,
                        };
                        let pathName = window.location.pathname;
                        if (Object.keys(options)?.length) {
                          pathName = pathName.concat("?");
                          if (!!options.name) {
                            pathName = pathName.concat(`name=${options.name}&`)
                          }
                          if (!!options.siteId) {
                            pathName = pathName.concat(`siteId=${options.siteId}&`)
                          }
                          if (!!options.groupId) {
                            pathName = pathName.concat(`groupId=${options.groupId}&`)
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
                    {/*
                    <div
                      data-tip="Add new work orders"
                      className="button-btn mr-30"
                      onClick={() => this.setState({
                        itemEdit: {
                          name: null,
                          timePeriodDatesIsAlways: false,
                          timePeriodDatesStart: Date.now(),
                          timePeriodDatesEnd: Date.now(),
                          timePeriodDayInWeeksIsAlways: false,
                          timePeriodDayInWeeksIsMon: false,
                          timePeriodDayInWeeksIsTue: false,
                          timePeriodDayInWeeksIsWed: false,
                          timePeriodDayInWeeksIsThu: false,
                          timePeriodDayInWeeksIsFri: false,
                          timePeriodDayInWeeksIsSat: false,
                          timePeriodDayInWeeksIsSun: false,
                          timePeriodTimeInDayIsAlways: false,
                          timePeriodTimeInDayHourStart: 0,
                          timePeriodTimeInDayHourEnd: 0,
                          timePeriodTimeInDayMinuteStart: 0,
                          timePeriodTimeInDayMinuteEnd: 0,
                        }
                      })}
                      style={{
                        width: 'fit-content',
                        padding: '15px',
                      }}
                    >
                      <span>{'ADD NEW WORK ORDERS'}</span>
                    </div>
                    */}
                  </div>
                  <div
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '500px', }}
                    className='doctor-list'>
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', }}>
                      <table className='table'>
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>ID
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>NAME
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>SITE LABEL
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>PROJECT
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>APPLICATION ID
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>APPLICATION CREATED BY
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>APPROVAL BY
                          </th>
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
                                <td className="table-td" style={{ textAlign: 'center', }}>
                                  {(it.id)}
                                </td>
                                <td className="table-td" style={{ textAlign: 'center', }}>
                                  {(it.name)}
                                </td>
                                <td className="table-td" style={{ textAlign: 'center', }}>
                                  {(it.site?.label)}
                                </td>
                                <td className="table-td" style={{ textAlign: 'center', }}>
                                  {(!!it.app?.project?.name ? (it.app?.project?.name + ' ' + it.app?.project?.displayName) : '')}
                                </td>
                                <td className="table-td" style={{ textAlign: 'center', }}>
                                  {(it.app?.id)}
                                </td>
                                <td className="table-td" style={{ textAlign: 'center', }}>
                                  {(it.app?.createdBy)}
                                </td>
                                <td className="table-td" style={{ textAlign: 'center', }}>
                                  {(it.app?.approvalBy)}
                                </td>

                                {!!this.state.loggerInUser.authorities.filter(auth => auth.authority === "SUPER_ADMIN" || auth.authority === (getCookie('app_code') + "_SUPER_ADMIN")).length && (
                                  <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
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
                                        data-tip="Click to view work order"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={async () => {
                                          let params = {
                                            options: {
                                              applicationId: it.app?.id,
                                            },
                                            limit: 1,
                                            offset: 0,
                                          };
                                          await this.setState({loading: true})
                                          let rp = await getDMSApplications(params);
                                          await this.setState({loading: false})
                                          this.setState({
                                            itemEdit: {
                                              ...(JSON.parse(JSON.stringify(it))),
                                              application: {...rp?.results[0]},
                                            }
                                          })
                                        }}
                                      >
                                        <span><i className="fa fa-eye"/></span>
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
                                              let rp = await deleteDMSWorkOrders({ id: it.id });
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
      ],
      isEdit: this.props.isEdit,
    };

    if (this.state.displayValue?.application?.users?.length) {
      this.state.dmsUsersSelected = [];
      this.state.displayValue?.application?.users.filter(us => us.type === 'dms_user')
      .map(us => {
        this.state.dmsUsersSelected.push({
          value: us.email,
          phone: us.phoneNumber,
          name: us.name,
          label: us.name + ' [' + us.phoneNumber + ']',
        })
      })
      this.state.siteGuests = [];
      this.state.displayValue?.application?.users.filter(us => us.type === 'guest')
      .map(us => {
        this.state.siteGuests.push({
          name: us.name,
          phone: us.phoneNumber,
          email: us.email,
          createNewUser: !!us.isRequestCreateNew,
        })
      })
    }
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
    return (
      <div style={{ paddingTop: '15px', flex: 1, overflow: 'visible' }}>
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
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>{!!this.state.isEdit ? 'Work order' : 'Add new work orders'}</span>
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
        <div style={{pointerEvents: 'none',}}>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>

            <div
              className="col-md-6 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px', borderTop: '0.75px solid #bbbbbb' }}
            >
              <div style={{flex: 1}}>
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
              </div>
              <div style={{flex: 2.5}}>
                <Input
                  key={this.state.refreshKey}
                  field={{
                    name: "Name"
                  }}
                  name="name"
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
          </div>

          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-6 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
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
              <div style={{flex: 2.5}}>
                <Select
                  className="select-vendor"
                  components={animatedComponents}
                  value={(!!this.state.displayValue?.site?.id) ? { value: this.state.displayValue?.site.id, label: this.state.displayValue?.site.label } : { value: '', label: "Select site" }}
                  options={(this.props.dmsSites || []).map(item => {
                    return {
                      value: item.id,
                      label: item.label,
                    }
                  })}
                  onChange={(event) => {
                    let site = (this.props.dmsSites || []).filter(gr => gr.id == event.value)[0]
                    this.setState({
                      displayValue: {
                        ...this.state.displayValue,
                        site: {...site},
                      }
                    })
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-6 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
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
              <div style={{flex: 2.5}}>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                  pointerEvents: 'none',
                }}>
                  {(this.state.dmsUsersSelected || []).map((wodIt, wodIdx) => {
                    return (
                      <div
                        key={wodIt.name + ' ' + '[' + wodIt.phone + ']'}
                        style={{color: 'rgb(51, 51, 51)', fontSize: '85%', overflow: 'hidden', padding: '3px 6px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', backgroundColor: 'rgb(230, 230, 230)', borderRadius: '2px', display: 'flex', margin: '2px', minWidth: '0px', boxSizing: 'border-box', width: 'fit-content', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <span>{wodIt.name + ' ' + '[' + wodIt.phone + ']' + (wodIt.email?.length > 1 ? ' [' + wodIt.email + ']' : '')}</span>
                        <svg
                          style={{color: '#76838f', marginLeft: '10px', cursor: 'pointer', display: 'none'}}
                          onClick={() => {
                            if (this.state.dmsUsersSelected[wodIdx].phone === wodIt.phone) {
                              this.state.dmsUsersSelected.splice(wodIdx, 1);
                              this.setState({
                                dmsUsersSelected: [].concat(this.state.dmsUsersSelected),
                              })
                            }
                          }}
                          height={14} width={14} viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg" ><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
                        </svg>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-6 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
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
              <div style={{flex: 2.5}}>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                  pointerEvents: 'none',
                }}>
                  {(this.state.siteGuests || []).map((wodIt, wodIdx) => {
                    return (
                      <div
                        key={wodIt.name + ' ' + '[' + wodIt.phone + ']'}
                        style={{color: 'rgb(51, 51, 51)', fontSize: '85%', overflow: 'hidden', padding: '3px 6px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', backgroundColor: 'rgb(230, 230, 230)', borderRadius: '2px', display: 'flex', margin: '2px', minWidth: '0px', boxSizing: 'border-box', width: 'fit-content', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <span>{wodIt.name + ' ' + '[' + wodIt.phone + ']' + (wodIt.email?.length > 1 ? ' [' + wodIt.email + ']' : '')}</span>
                        <svg
                          style={{color: '#76838f', marginLeft: '10px', cursor: 'pointer', display: 'none'}}
                          onClick={() => {
                            if (this.state.siteGuests[wodIdx].phone === wodIt.phone) {
                              this.state.siteGuests.splice(wodIdx, 1);
                              this.setState({
                                siteGuests: [].concat(this.state.siteGuests),
                              })
                            }
                          }}
                          height={14} width={14} viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg" ><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
                        </svg>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>

            <div
              className="col-md-6 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
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
              className="col-md-6 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
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
              className="col-md-6 input-wrap has-feedback has-success"
              style={{ position: "relative", paddingRight: "20px", flexDirection: 'row', display: 'flex', borderBottom: '0.75px solid #bbbbbb', padding: '10px' }}
            >
              <div style={{flex: 1}}>
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

          {/*
          <div className="form-group ml-10" style={{marginTop: '15px'}}>
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
                  if (!this.state.displayValue?.site?.id) {
                    Swal.fire({
                      html: `<p style='text-align: center; font-size: 14px;'>${'Site is required!'}</p>`,
                      icon: 'error',
                      confirmButtonText: 'OK',
                    });
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
                  let rp = await saveDMSWorkOrder(this.state.displayValue);
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
          */}
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
        'companyPosition', 'uuidIOS', 'deviceId', 'registeredTime', 'ccValidity', 'ccNum', 'company', 'approved', 'phoneNumber', 'status', 'groupUsers', 'role', 'permissions', 'loginOtpRequire'
      ],
      showLocation: true,
      showGroup: false,
      showPermission: false,
      roleColor: '#c5c6d0',
      nameRoleColor: '#042ee1',
    };
  }

  componentDidMount() {
    this.searchUserRole();
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
              }}>{'INFORMATION OF SITE : '} {this.state.displayValue.label}</span>
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
                    borderBottom: !!this.state.borderRoleBottom ? this.state.borderRoleBottom : '2px solid #8b838f',
                  }}
                  className="button-btn-3"
                  onClick={() => {
                    this.searchUserRole();
                    this.setState({
                      showLocation: true,
                      showGroup: false,

                      selectedRows: '',
                      perColor: '',
                      groupColor: '',
                      roleColor: '#c5c6d0',
                      nameRoleColor: '#042ee1',
                      borderRoleBottom: '2px solid #042ee1',
                      nameGroupColor: '',
                      namePerColor: '',
                      borderGroupBottom: '',
                      borderPerBottom: '',
                      namePfColor: '',
                      borderPfBottom: '',
                      borderProjectBottom: '',
                      nameProjectColor: '',
                    })
                  }}
                >
                  <span
                    style={{ color: !!this.state.nameRoleColor ? this.state.nameRoleColor : '#8b838f', }}>{'LOCATIONS'}</span>
                </div>
                <div
                  style={{
                    borderBottom: !!this.state.borderGroupBottom ? this.state.borderGroupBottom : '2px solid #8b838f',
                  }}
                  className="button-btn-3"
                  onClick={() => {
                    this.searchDMSSiteWorkOrders();
                    this.setState({
                      selectedRows: '',
                      showGroup: true,
                      showLocation: false,
                      perColor: '',
                      groupColor: '#c5c6d0',
                      roleColor: '',
                      nameGroupColor: '#042ee1',
                      borderGroupBottom: '2px solid #042ee1',
                      namePerColor: '',
                      nameRoleColor: '',
                      borderRoleBottom: '',
                      borderPerBottom: '',
                      namePfColor: '',
                      borderPfBottom: '',
                      borderProjectBottom: '',
                      nameProjectColor: '',
                    })
                  }}
                >
                  <span
                    style={{ color: !!this.state.nameGroupColor ? this.state.nameGroupColor : '#8b838f', }}>{'WORK ORDERS'}</span>
                </div>
              </div>
            </div>
            {!!this.state.showLocation ?
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
                      this.searchRoles();
                      this.setState({
                        addRole: this.state.addRole,
                      })
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                    <span style={{
                      marginLeft: '15px',
                      color: '#042ee1'
                    }}>{'UPDATE LOCATIONS'}</span>
                  </div>
                </div>
                <table className="table" style={{ width: '100%', marginTop: '10px' }}>
                  <thead className="thead-dark">
                    <tr>
                      {this.props.appCode === 'MMS' && (
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '250px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">MCU SN
                      </th>
                      )}
                      {this.props.appCode === 'MMS' && (
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '150px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Meter SN
                      </th>
                      )}
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '100px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">City
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '120px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Street
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Postal code
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '120px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Building
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Block
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Level
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Unit
                      </th>
                      {true && (
                        <th style={{
                          backgroundColor: '#f2f3ff',
                          color: '#111',
                          fontWeight: '500',
                          fontSize: '16px',
                          width: '80px',
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                        }} scope="col">Location Tag
                        </th>
                      )}
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Remark
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">UpdatedTime
                      </th>
                      {/*<th style={{backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '80px', maxWidth: '80px', whiteSpace: 'nowrap',textAlign: 'center',}} scope="col"> Action</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                  {(this.state.roleAdded || [])
                    .map((it, index) => {
                      return (
                          <tr key={index}>
                            {this.props.appCode === 'MMS' && (
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{it.address?.coupleSn}</span>
                            </td>
                            )}
                            {this.props.appCode === 'MMS' && (
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{it.address?.coupleMsn}</span>
                            </td>
                            )}
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{it.address?.city}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.street}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.postalCode}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.building}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.block}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.level}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.unitNumber}</span>
                            </td>

                            {true && (
                            <td style={{ textAlign: 'left', }}>
                              <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                              }}>
                                <input
                                  style={{
                                    maxWidth: '200px',
                                    outline: "unset",
                                    color: '#76838f',
                                    border: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'locationTag') ? undefined : "none",
                                  }}
                                  value={this.state.editUnit?.id === it.address?.unitId ? this.state.editUnit?.locationTag : it.address?.locationTag}
                                  onChange={(event) => {
                                    this.setState({
                                      editUnit: {
                                        ...this.state.editUnit,
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address?.unitNumber,
                                        locationTag: event.target.value,
                                      }
                                    })
                                    console.info('this.state.editUnit?.editField', this.state.editUnit?.editField)
                                  }}
                                  onClick={() => {
                                    this.setState({
                                      editUnit: {
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address.unitNumber,
                                        locationTag: it.address?.locationTag,
                                        editField: 'locationTag',
                                      }
                                    })
                                  }}
                                />

                                <div style={{
                                  display: 'flex',
                                  opacity: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'locationTag' && this.state.editUnit?.locationTag != it.address?.locationTag) ? undefined : "0",
                                  pointerEvents: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'locationTag' && this.state.editUnit?.locationTag != it.address?.locationTag) ? undefined : "none",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginLeft: "20px"
                                }}>
                                  <i
                                    className="fa fa-check"
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "10px",
                                      cursor: "pointer"
                                    }}
                                    onClick={async () => {
                                      let unit = {
                                        ...this.state.editUnit,
                                      }
                                      if (unit.id !== it.address.unitId) {
                                        return;
                                      }
                                      let response = await saveBuildingUnit(unit)
                                      if (response.success == true) {
                                        Swal.fire(
                                          'Done!',
                                          'Your database has been changed!',
                                          'success'
                                        ).then(async () => {
                                          it.address.locationTag = unit.locationTag;
                                          this.setState({
                                            editUnit: undefined,
                                          })
                                        })
                                      } else {
                                        Swal.fire(
                                          'Error!',
                                          response.message || response.errorDescription || '',
                                          'error'
                                        )
                                      }
                                    }}
                                  />
                                  <i
                                    className="fa fa-remove"
                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                    onClick={() => {
                                      this.setState({
                                        editUnit: undefined,
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            )}
                            <td style={{ textAlign: 'left', }}>
                              <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                              }}>
                                <input
                                  style={{
                                    maxWidth: '200px',
                                    outline: "unset",
                                    color: '#76838f',
                                    border: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit.editField === 'remark') ? undefined : "none",
                                  }}
                                  value={this.state.editUnit?.id === it.address?.unitId ? this.state.editUnit?.remark : it.address?.remark}
                                  onChange={(event) => {
                                    this.setState({
                                      editUnit: {
                                        ...this.state.editUnit,
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address?.unitNumber,
                                        remark: event.target.value,
                                      }
                                    })
                                  }}
                                  onClick={() => {
                                    this.setState({
                                      editUnit: {
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address.unitNumber,
                                        remark: it.address?.remark,
                                        editField: 'remark',
                                      }
                                    })
                                  }}
                                />

                                <div style={{
                                  display: 'flex',
                                  opacity: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'remark' && this.state.editUnit?.remark != it.address?.remark) ? undefined : "0",
                                  pointerEvents: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'remark' && this.state.editUnit?.remark != it.address?.remark) ? undefined : "none",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginLeft: "20px"
                                }}>
                                  <i
                                    className="fa fa-check"
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "10px",
                                      cursor: "pointer"
                                    }}
                                    onClick={async () => {
                                      let unit = {
                                        ...this.state.editUnit,
                                      }
                                      if (unit.id !== it.address.unitId) {
                                        return;
                                      }
                                      let response = await saveBuildingUnit(unit)
                                      if (response.success == true) {
                                        Swal.fire(
                                          'Done!',
                                          'Your database has been changed!',
                                          'success'
                                        ).then(async () => {
                                          it.address.remark = unit.remark;
                                          this.setState({
                                            editUnit: undefined,
                                          })
                                        })
                                      } else {
                                        Swal.fire(
                                          'Error!',
                                          response.message || response.errorDescription || '',
                                          'error'
                                        )
                                      }
                                    }}
                                  />
                                  <i
                                    className="fa fa-remove"
                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                    onClick={() => {
                                      this.setState({
                                        editUnit: undefined,
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{!!it.address?.coupleTime ? moment(it.address?.coupleTime).format('yyyy-MM-DD HH:mm:ss') : ''}</span>
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
                    {this.state.totalRecordsUserRole > this.state.pageSizeUserRole && this.state.totalPagesUserRole >= 2 &&
                    <Pagination
                      //href={this.props.asPath.replace(/\?.*/g, '')}
                      totalRecords={this.state.totalRecordsUserRole}
                      totalPages={this.state.totalPagesUserRole}
                      onPageChanged={async (query) => {
                        this.setState({
                          limit4: 10,
                          offset4: (query.pageIndex - 1) * 10,
                        }, () => {
                          this.searchUserRole();
                        })
                      }}
                      pageIndex={this.state.pageIndexUserRole}
                      pageSize={this.state.pageSizeUserRole}
                      styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                    />
                    }
                  </div>
                </div>
              </div>
              : null}

            {!!this.state.showGroup ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
                {/*<div style={{ display: "flex", width: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      //marginLeft: '800px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                    }}
                    className="button-btn-2"
                    onClick={() => {
                      this.searchGroup();
                      this.setState({
                        addGroup: this.state.addGroup,
                      })
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                    <span style={{
                      marginLeft: '15px',
                      color: '#042ee1'
                    }}>{'UPDATE GROUPS'}</span>
                  </div>
                </div>*/}

                <table className="table" style={{ width: '100%', marginTop: '10px' }}>
                  <thead className="thead-dark">
                  <tr>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>ID
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>NAME
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>SITE LABEL
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>PROJECT
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>APPLICATION CREATED BY
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>APPROVAL BY
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {(this.state.groupAdded || [])
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
                            {(it.name)}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.site?.label)}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.app?.project?.name)}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.app?.createdBy)}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.app?.approvalBy)}
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
                          limit5: 10,
                          offset5: (query.pageIndex - 1) * 10,
                        }, () => {
                          this.searchUserGroup();
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

              : null}
            {!!this.state.showProject && (
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
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                    }}
                    className="button-btn-2"
                    onClick={() => {
                      this.searchProjects();
                      this.setState({
                        addProject: true,
                      })
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                    <span style={{
                      marginLeft: '15px',
                      color: '#042ee1'
                    }}>{'UPDATE PROJECT TAGS'}</span>
                  </div>
                </div>
                <table className="table" style={{ width: '100%', marginTop: '10px' }}>
                  <thead className="thead-dark">
                  <tr>
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
                  {(this.state.userProjects || [])
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
                    {this.state.totalRecordsUserProject > this.state.pageSizeUserProject && this.state.totalPagesUserProject >= 2 &&
                    <Pagination
                      totalRecords={this.state.totalRecordsUserProject}
                      totalPages={this.state.totalPagesUserProject}
                      onPageChanged={async (query) => {
                        this.setState({
                          limit7: 10,
                          offset7: (query.pageIndex - 1) * 10,
                        }, () => {
                          this.searchUserProject();
                        })
                      }}
                      pageIndex={this.state.pageIndexUserProject}
                      pageSize={this.state.pageSizeUserProject}
                      styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                    />
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
          {!!this.state.addRole && (
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
                    {(this.state.addRole || [])
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
                              {(it.desc)}
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
                      {this.state.totalRecordsRoles > this.state.pageSizeRoles && this.state.totalPagesRoles >= 2 &&
                      <Pagination
                        //href={this.props.asPath.replace(/\?.*/g, '')}
                        totalRecords={this.state.totalRecordsRoles}
                        totalPages={this.state.totalPagesRoles}
                        onPageChanged={async (query) => {
                          this.setState({
                            limit2: 10,
                            offset2: (query.pageIndex - 1) * 10,
                          }, () => {
                            this.searchRoles();
                          })
                        }}
                        pageIndex={this.state.pageIndexRoles}
                        pageSize={this.state.pageSizeRoles}
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
                          role: !!this.state.selectedRows ? this.state.selectedRows : []
                        };

                        let rp = await updateUserRole(params);
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
                      this.setState({ addRole: '' });
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
          {!!this.state.addPermission && (
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
                      this.setState({ addPermission: '' });
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
                    {(this.state.addPermission || [])
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
                                  checked={this.state.selectedRows[0]?.fixed || !!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}
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
                      {this.state.totalRecordsPermission > this.state.pageSizePermission && this.state.totalPagesPermission >= 2 &&
                      <Pagination
                        //href={this.props.asPath.replace(/\?.*/g, '')}
                        totalRecords={this.state.totalRecordsPermission}
                        totalPages={this.state.totalPagesPermission}
                        onPageChanged={async (query) => {
                          this.setState({
                            limit3: 10,
                            offset3: (query.pageIndex - 1) * 10,
                          }, () => {
                            this.searchPermission();
                          })
                        }}
                        pageIndex={this.state.pageIndexPermission}
                        pageSize={this.state.pageSizePermission}
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
                          permissions: !!this.state.selectedRows ? this.state.selectedRows : []
                        };

                        let rp = await updatePermission(params);
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
                              this.searchEachUserPermission(true);
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
                      this.setState({ addPermission: '' });
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
