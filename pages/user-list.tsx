import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { Box, Modal, Typography } from "@material-ui/core";
import { Button, CloseButton } from 'react-bootstrap';
import { TotPage } from '@app/components/TotPage';
import { Input, Pagination, ProgressLoading, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import 'moment-timezone';
import DatePicker from "react-datepicker";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';

import {
  createUser,
  deleteUser,
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
  getUserCompanies,
  updateUserCompany,
  syncAccess,
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
  getCountries,
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

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  state = {
    ...this.props,
  };

  static getInitialProps = async (args) => {
    let { query: { q, page, queryUserName, queryFirstName, queryLastName, queryPhoneNumber }, asPath, req, initialState } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      options: {
        queryUserName: queryUserName ? queryUserName : undefined,
        queryFirstName: queryFirstName ? queryFirstName : undefined,
        queryLastName: queryLastName ? queryLastName : undefined,
        queryPhoneNumber: queryPhoneNumber ? queryPhoneNumber : undefined,
      },
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
      loggerInUser: initialState.userInfo,
      searchUserName: params.options.queryUserName,
      searchFirstName: params.options.queryFirstName,
      searchLastName: params.options.queryLastName,
      searchPhoneNumber: params.options.queryPhoneNumber,
    };
  }

  componentDidMount() {
    this.setState({ mapKey: Date.now() });
    this.getCompanies();
    this.getCountries();
  }


  async getCompanies() {
    try {
      let rp = await getCompanies();
      this.setState({ companies: rp.response?.results || [] })
    } catch (err) {
    }
  }

  async getCountries() {
    try {
      let rp = await getCountries();
      this.setState({ countries: rp.response?.results || [] })
    } catch (err) {
    }
  }

  async getPayments() {
    try {
      let rp = await getPayments();
      this.setState({ payments: rp.response?.results || [] })
    } catch (err) {
    }
  }

  async getKeys() {
    try {
      let rp = await getKeys();
      this.setState({ keys: rp.response?.results || [] })
    } catch (err) {
    }
  }

  async getKeyGroups() {
    try {
      let rp = await getKeyGroups();
      this.setState({ keyGroups: rp.response?.results || [] })
    } catch (err) {
    }
  }

  async getLockGroups() {
    try {
      let rp = await getLockGroups();
      this.setState({ lockGroups: rp.response?.results || [] })
    } catch (err) {
    }
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Users'}>
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
                  countries={this.state.countries}
                  isEdit={!!this.state.userEdit?.email}
                  onClose={() => {
                    this.setState({ userEdit: null })
                    require('@app/utils/next-routes').Router.pushRoute(window.location.href);
                  }}
                  onSave={() => {
                    window.location.href = window.location.href;
                  }}
                />
                : null
              }
              {!!this.state.userInfo ?
                <UserInfo
                  data={this.state.userInfo}
                  onClose={() => {
                    this.setState({ userInfo: null })
                  }}
                  onSave={() => {
                    window.location.href = window.location.href;
                  }}
                />
                : null
              }
              {!this.state.userEdit && !this.state.userInfo ?
                <>
                  <div style={{
                    padding: '15px',
                    paddingTop: '20px',
                    paddingBottom: '0px',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: '#000000'
                  }}>
                    <span>{'User Management'} <i className="fa fa-caret-right ml-5 mr-5"/> {'Users'}</span>
                    <h5 className="site-title">Users</h5>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '15px',
                      padding: '0px 30px',
                      gap: '15px'
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
                        value={ this.state.searchUserName || '' }
                        placeholder="Search user name..."
                        onChange={event => this.setState({ searchUserName: event.target.value })}
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
                        value={ this.state.searchPhoneNumber || '' }
                        placeholder="Search phone number..."
                        onChange={event => this.setState({ searchPhoneNumber: event.target.value })}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flex: 1
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
                        value={ this.state.searchFirstName || '' }
                        placeholder="Search first name..."
                        onChange={event => this.setState({ searchFirstName: event.target.value })}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flex: 1
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
                        value={ this.state.searchLastName || '' }
                        placeholder="Search last name..."
                        onChange={event => this.setState({ searchLastName: event.target.value })}
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
                          queryUserName: this.state.searchUserName || undefined,
                          queryFirstName: this.state.searchFirstName || undefined,
                          queryLastName: this.state.searchLastName || undefined,
                          queryPhoneNumber: this.state.searchPhoneNumber || undefined,
                        };
                        let pathName = window.location.pathname;
                        if (Object.keys(options)?.length) {
                          pathName = pathName.concat("?");
                          if (!!options.queryUserName) {
                            pathName = pathName.concat(`queryUserName=${options.queryUserName}&`)
                          }
                          if (!!options.queryFirstName) {
                            pathName = pathName.concat(`queryFirstName=${options.queryFirstName}&`)
                          }
                          if (!!options.queryLastName) {
                            pathName = pathName.concat(`queryLastName=${options.queryLastName}&`)
                          }
                          if (!!options.queryPhoneNumber) {
                            pathName = pathName.concat(`queryPhoneNumber=${options.queryPhoneNumber}&`)
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
                          searchLastName: undefined,
                          searchFirstName: undefined,
                          searchUserName: undefined,
                          searchPhoneNumber: undefined,
                        });
                        const pathName = window.location.pathname;
                        require('@app/utils/next-routes').Router.pushRoute(pathName);
                      }}
                    >
                      <span>{'CLEAR'}</span>
                    </div>
                    <div
                      data-tip="Add new user"
                      className="button-btn w-160 mr-10"
                      onClick={() => this.setState({
                        userEdit: {
                          email: null,
                          password: null,
                          firstName: null,
                          lastName: null,
                          phoneNumber: null,
                        }
                      })}
                    >
                      <span>{'ADD NEW USER'}</span>
                    </div>
                    <div
                      data-tip="Add new user"
                      className="button-btn w-160 mr-10"
                      onClick={() => {
                        this.setState({openUploadUser: true});
                      }}
                    >
                      <span>{'IMPORT USER'}</span>
                    </div>
                  </div>

                  <div
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '500px', }}
                    className='doctor-list'>
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', }}>
                      <table className='table'>
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col">User ID</th>
                          <th className="table-th" scope="col">User Name</th>
                          <th className="table-th" scope="col">Phone Number</th>
                          <th className="table-th" scope="col">First Name</th>
                          <th className="table-th" scope="col">Last Name</th>
                          <th className="table-th" scope="col">role</th>
                          <th className="table-th" scope="col">Status</th>
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
                                  <span>{it.username}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.phoneNumber}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.firstName}</span>
                                </td><td className="table-td">
                                  <span>{it.lastName}</span>
                                </td>
                                <td className="table-td">
                                  <span>{((it.roleDescs).map(r => r.desc)).toString().replace('[', '').replace(']', '')}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.status}</span>
                                </td>

                                {!!this.state.loggerInUser.authorities.filter(auth => auth.authority === "SUPER_ADMIN" || auth.authority === (getCookie('app_code') + "_SUPER_ADMIN")).length && (
                                  <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to edit permission"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={() => this.setState({ userInfo: JSON.parse(JSON.stringify(it)) })}
                                      >
                                        <span><i className="fa fa-universal-access"/></span>
                                      </div>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to edit user"
                                        style={{ margin: 'unset', marginLeft: '5px' }}
                                        className="button-icon"
                                        onClick={() => this.setState({ userEdit: JSON.parse(JSON.stringify(it)) })}
                                      >
                                        <span><i className="fa fa-edit"/></span>
                                      </div>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        className="button-icon ml-5"
                                        data-tip="Click to remove user"
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
                                            let rp = await deleteUser({ id: it.id });
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

                  <Modal open={this.state.openUploadUser}>
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
                      <CloseButton className="w-5 h-5" onClick={() => this.setState({openUploadUser: false})}/>
                      <Typography variant="h6" component="h2" style={{marginBottom: '20px'}}>
                        Upload Users CSV file
                      </Typography>
                      <input
                        style={{marginBottom: '5px'}}
                        type="file"
                        placeholder={'File upload'}
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file.name.includes(".csv") || file.name.includes(".xlsx")) {
                            this.setState({userFile: event.target.files[0]});
                          } else {
                            this.setState({userFile: null});
                          };
                        }}
                      />
                      <br/>
                      <a style={{textDecoration: 'underline'}} download href={'/api/upload-user/template'} target='_blank'>Download template</a>
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
                            if (this.state.userFile) {
                              let rp = null;
                              const formData = new FormData();
                              formData.append('file', this.state.userFile, this.state.userFile.name);
                              const url = '/api/user/upload';
                              const method = 'POST';

                              await this.setState({loading: true, openUploadUser: false,});
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
                                    userFile: null,
                                    openUploadUser: false,
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
                                  const fileName = 'import-user-result-' + tag + '.csv';
                                  const url = window.URL.createObjectURL(new Blob([rp]));
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.setAttribute('download', fileName);
                                  document.body.appendChild(link);
                                  link.click();
                                  link.parentNode.removeChild(link);

                                  this.setState({
                                    userFile: null,
                                    openUploadUser: false,
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
                            this.setState({openUploadUser: false});
                          }}
                        >
                          <span>Cancel</span>
                        </div>
                      </div>
                    </Box>
                  </Modal>
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
                zIndex: 3000,
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
        'gender', 'avatar', 'birthDay', 'companyRefId', 'userCompany', 'userCompanyRefId', 'paymentId', 'identification', 'invoiceNo', 'ccName',
        'countryCode', 'lockServerPassword', 'lockServerUsername', 'participant', 'lastLogin', 'token', 'userRegistrationImageName', 'userRegistrationMessage',
        'companyPosition', 'uuidIOS', 'deviceId', 'registeredTime', 'ccValidity', 'ccNum', 'company', 'approved', 'status', 'groupUsers', 'role', 'permissions', 'changePwdRequire',
        'lastPwd', 'lastChangePwd', 'roles', 'loginOtpRequire', 'updatePwd', 'sendLoginToEmail', 'sendLoginToPhone', 'firstLoginOtpRequire', 'hpwd', 'callingCode', 'phoneNumber', 'autoLogoutUIInactive'
      ],
      isEdit: this.props.isEdit,
    };

    if (this.state.displayValue.autoLogoutUIInactive == -1) {
        this.state.displayValue.autoLogoutUIInactive = null;
    }

    if (!!this.state.displayValue.callingCode) {
      let country = (this.props.countries || []).filter(c => (c.callingCode || '').replace(/-/g, '') == this.state.displayValue.callingCode)[0]
      if (country) {
        this.state.countryCode = {value: country.callingCode, label: (country.isoCode || '').split(/ *\/ */g)[0] + ' [+' + country.callingCode.replace(/-/g, '') + ']'}
      }
    }

    if (!this.state.countryCode?.value) {
      this.state.countryCode = {value: '65', label: 'SG [+65]'}
    }
  }

  componentDidMount() {

  }

  handleChange(field, value) {

    // if (field === 'role') {
    //     this.state.displayValue.roles = [value];
    //     this.validate('roles');
    //     this.validate('role');
    // } else
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
    if (field === 'roles' || field === 'role') {
      this.state.validate[field] = !!value && !!value.length;
    } else if (field === 'password') {
      this.state.validate.password = value == null || value == undefined || value.trim().length >= 6 || value.trim().length == 0;
    } else if (field === 'lcPhoneNumber') {
      this.state.validate.lcPhoneNumber = !value || /^(0[1-9][0-9]{1,8})|([1-9][0-9]{1,9})$/g.test(value.toLowerCase().trim());
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
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>{!!this.state.isEdit ? 'Edit user' : 'Add new user'}</span>
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
            User Name :
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
              <small
                className="help-block"
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
            First Name :
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
              <small
                className="help-block"
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
            Last Name :
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
              <small
                className="help-block"
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
            Phone Number :
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
            style={{ position: "relative", paddingRight: "20px", position: 'relative' }}
          >
            <Input
              key={this.state.refreshKey}
              field={{
                name: "phoneNumber"
              }}
              name="phoneNumber"
              type="text"
              value={this.state.displayValue.lcPhoneNumber}
              placeholder={"Ex: 0909123456, 909123456, 12345678"}
              groupstyle={{ margin: "auto" }}
              onChange={value => this.handleChange('lcPhoneNumber', value)}
              style={{
                paddingLeft: '170px',
                height: '38px',
              }}
            />
            {this.state.validate.lcPhoneNumber === false ?
              <small
                className="help-block"
                style={{
                  color: '#eb0000',
                  fontSize: '12px',
                  fontWeight: '400',
                }}
              >
                {(!this.state.displayValue.lcPhoneNumber || !this.state.displayValue.lcPhoneNumber.trim().length) ? 'phoneNumber is required!' : 'phoneNumber invalid!'}
              </small>
              : null}
            <div
              style={{
                position: 'absolute',
                top: 0, bottom: 0,
                width: '150px',
              }}
            >
              <Select
                className="select-vendor"
                components={animatedComponents}
                value={this.state.countryCode || {value: '65', label: 'SG [+65]'}}
                options={(this.props.countries || []).map(c => {
                  return {
                    value: c.callingCode,
                    label: (c.isoCode || '').split(/ *\/ */g)[0] + ' [+' + (c.callingCode || '').replace(/-/g, '') + ']'
                  }
                })}
                onChange={(event) => {
                  this.setState({countryCode: event})
                }}
              />
            </div>
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
            Identification :
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
              <small
                className="help-block"
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
                  Log-off timeout(minutes) :
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
                          name: "autoLogoutUIInactive"
                      }}
                      name="autoLogoutUIInactive"
                      type="number"
                      value={this.state.displayValue.autoLogoutUIInactive}
                      placeholder={"Log-off timeout in minutes"}
                      groupstyle={{ margin: "auto" }}
                      onChange={value => this.handleChange('autoLogoutUIInactive', value)}
                  />
              </div>
          </div>

        {!this.state.displayValue.id && (
        <div className="form-group ml-10">
          <div
            className="col-md-6 input-wrap has-feedback has-success"
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="change-pwd"
                name="change-pwd"
                checked={!!this.state.checkboxChangeSendLoginToPhone}
                value={this.state.checkboxChangeSendLoginToPhone}
                onChange={(event) => {
                  if (!!event.target.checked) {
                    this.setState({
                      checkboxChangeSendLoginToPhone: true,
                    });
                  } else {
                    this.setState({
                      checkboxChangeSendLoginToPhone: false,
                    });
                  }
                }}
              />
              <span style={{ marginLeft: '5px' }}>{'Send user login credentials to phone'}</span>
            </div>
          </div>
          <div
            className="col-md-6 input-wrap has-feedback has-success"
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="change-pwd"
                name="change-pwd"
                checked={!!this.state.checkboxChangeSendLoginToEmail}
                value={this.state.checkboxChangeSendLoginToEmail}
                onChange={(event) => {
                  if (!!event.target.checked) {
                    this.setState({
                      checkboxChangeSendLoginToEmail: true,
                    });
                  } else {
                    this.setState({
                      checkboxChangeSendLoginToEmail: false,
                    });
                  }
                }}
              />
              <span style={{ marginLeft: '5px' }}>{'Send user login credentials to email'}</span>
            </div>
          </div>
        </div>
        )}
        {!!this.state.displayValue.id && (
        <div className="form-group ml-10">
          <div
            className="col-md-6 input-wrap has-feedback has-success"
            style={{ position: "relative", paddingRight: "20px" }}
          >
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="change-pwd"
                name="change-pwd"
                checked={!!this.state.checkboxChangePwd}
                value={this.state.checkboxChangePwd}
                onChange={(event) => {
                  if (!!event.target.checked) {
                    this.setState({
                      checkboxChangePwd: true,
                    });
                  } else {
                    this.setState({
                      checkboxChangePwd: false,
                    });
                  }
                }}
              />
              <span style={{ marginLeft: '5px' }}>{'Change password'}</span>
            </div>
          </div>
        </div>
        )}
        {(!this.state.displayValue.id || !!this.state.checkboxChangePwd) && (<div className="form-group ml-10">
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
            />
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
              <small
                className="help-block"
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
            Enable 2FA login :
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
              className="select-vendor"
              components={animatedComponents}
              value={(this.state.displayValue.loginOtpRequire === true || !!this.state.displayValue.loginOtpRequire?.value) ?
                { value: true, label: "True" } : { value: false, label: "False" }}
              options={[
                { value: true, label: "True" },
                { value: false, label: "False" }
              ]}
              onChange={(event) => {
                this.handleChange('loginOtpRequire', event);
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
                this.state.displayValue.phoneNumber = this.state.displayValue.phoneNumber || null;
                this.state.displayValue.loginOtpRequire = this.state.displayValue.loginOtpRequire?.value || false;
                this.state.displayValue.updatePwd = !!this.state.checkboxChangePwd;
                this.state.displayValue.sendLoginToEmail = !!this.state.checkboxChangeSendLoginToEmail;
                this.state.displayValue.sendLoginToPhone = !!this.state.checkboxChangeSendLoginToPhone;

                if (this.state.displayValue.lcPhoneNumber) {
                  this.state.displayValue.phoneNumber = '+' + (this.state.countryCode?.value || '').replace(/[^0-9]/g, '') + this.state.displayValue.lcPhoneNumber;
                } else {
                  this.state.displayValue.phoneNumber = null;
                }
                let rp = await createUser({
                    ...this.state.displayValue,
                    autoLogoutUIInactive: this.state.displayValue.autoLogoutUIInactive || -1,
                });
                this.setState({loading: false});
                if (rp.success) {
                  Swal.fire({
                    html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                  }).then(() => {
                    if (!this.state.isEdit) {
                      this.props.onSave && this.props.onSave(this.state.displayValue)
                    }
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

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: { ...this.props.data },
      validate: {},
      ignores: [
        'gender', 'avatar', 'birthDay', 'companyRefId', 'userCompany', 'userCompanyRefId', 'paymentId', 'identification', 'invoiceNo', 'ccName',
        'countryCode', 'lockServerPassword', 'lockServerUsername', 'participant', 'lastLogin', 'token', 'userRegistrationImageName', 'userRegistrationMessage',
        'companyPosition', 'uuidIOS', 'deviceId', 'registeredTime', 'ccValidity', 'ccNum', 'company', 'approved', 'phoneNumber', 'status', 'groupUsers', 'role', 'permissions', 'loginOtpRequire', 'autoLogoutUIInactive'
      ],
      showRole: true,
      showGroup: false,
      showPermission: false,
      roleColor: '#c5c6d0',
      nameRoleColor: '#042ee1',
    };
    if (this.state.displayValue.autoLogoutUIInactive == -1) {
        this.state.displayValue.autoLogoutUIInactive = null;
    }
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

  searchCompanies = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit10 || 10,
      offset: this.state.offset10 || 0,
    };
    const rp = await getCompanies(params);
    this.setState({
      companies: rp?.response.results || [],
      totalRecordsCompany: rp?.response.totalRows,
      totalPagesCompany: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexCompany: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeCompany: 10,
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
        userId: this.state.displayValue.id,
      },
    };
    const rp = await getUserRoles(params);
    this.setState({
      roleAdded: rp?.response.results || [],
      selectedRows: rp?.response.results || [],
      totalRecordsUserRole: rp?.response.totalRows,
      totalPagesUserRole: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexUserRole: Math.floor((rp?.response.offset + 9) / 10) + 1,
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

  searchUserCompany = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit9 || 10,
      offset: this.state.offset9 || 0,
      options: {
        userId: this.state.displayValue.id,
      },
    };
    const rp = await getUserCompanies(params);
    this.setState({
      userCompanies: rp?.response.results || [],
      selectedRows: rp?.response.results || [],
      totalRecordsUserCompany: rp?.response.totalRows,
      totalPagesUserCompany: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndexUserCompany: Math.floor((rp?.response.offset + 9) / 10) + 1,
      pageSizeUserCompany: 10,
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
                  this.props.onClose && this.props.onClose();
                  window.location.href = window.location.href;
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
              }}>{'INFORMATION OF USER : '} {this.state.displayValue.email}</span>

              <div style={{ display: "flex", justifyContent: 'flex-end', marginLeft: '15px', }}>
                <div
                  style={{
                    //marginLeft: '800px',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                    width: 'fit-content',
                    padding: '15px',
                  }}
                  className="button-btn-2"
                  onClick={() => {
                    this.setState({
                      openSyncAccess: true,
                    })
                  }}
                >
                  <i className="fa fa-refresh" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                  <span style={{
                    marginLeft: '15px',
                    color: '#042ee1'
                  }}>{'SYNC ACCESS'}</span>
                </div>
              </div>
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
                      showRole: true,
                      showGroup: false,
                      showPermission: false,
                      showPlatforms: false,
                      showProject: false,
                      showCompany: false,
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
                      borderCompanyBottom: '',
                      nameCompanyColor: '',
                    })
                  }}
                >
                  <span
                    style={{ color: !!this.state.nameRoleColor ? this.state.nameRoleColor : '#8b838f', }}>{'ROLES'}</span>
                </div>
                <div
                  style={{
                    borderBottom: !!this.state.borderGroupBottom ? this.state.borderGroupBottom : '2px solid #8b838f',
                  }}
                  className="button-btn-3"
                  onClick={() => {
                    this.searchUserGroup();
                    this.setState({
                      selectedRows: '',
                      showGroup: true,
                      showRole: false,
                      showPermission: false,
                      showPlatforms: false,
                      showProject: false,
                      showCompany: false,
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
                      borderCompanyBottom: '',
                      nameCompanyColor: '',
                    })
                  }}
                >
                  <span
                    style={{ color: !!this.state.nameGroupColor ? this.state.nameGroupColor : '#8b838f', }}>{'GROUPS'}</span>
                </div>
              </div>
              <div
                style={{
                  //backgroundColor: this.state.perColor,
                  borderBottom: !!this.state.borderPerBottom ? this.state.borderPerBottom : '2px solid #8b838f',
                }}
                className="button-btn-3"
                onClick={() => {
                  this.searchEachUserPermission(true);
                  this.setState({
                    showPermission: true,
                    showRole: false,
                    showGroup: false,
                    showProject: false,
                    showPlatforms: false,
                    showCompany: false,
                    perColor: '#c5c6d0',
                    groupColor: '',
                    roleColor: '',
                    namePerColor: '#042ee1',
                    borderPerBottom: '2px solid #042ee1',
                    nameGroupColor: '',
                    nameRoleColor: '',
                    borderRoleBottom: '',
                    borderGroupBottom: '',
                    namePfColor: '',
                    borderPfBottom: '',
                    borderProjectBottom: '',
                    nameProjectColor: '',
                    borderCompanyBottom: '',
                    nameCompanyColor: '',
                  })
                }}
              >
                <span
                  style={{ color: !!this.state.namePerColor ? this.state.namePerColor : '#8b838f', }}>{'PERMISSIONS'}</span>
              </div>

              <div
                style={{
                  //backgroundColor: this.state.perColor,
                  borderBottom: !!this.state.borderPfBottom ? this.state.borderPfBottom : '2px solid #8b838f',
                }}
                className="button-btn-3"
                onClick={async () => {
                  let pfs = {};
                  try {
                    pfs = await getUserPlatforms({ email: this.state.displayValue.email });
                  } catch (err) {
                    pfs = {};
                  }
                  pfs = (pfs.response || []).filter(pf => (!!pf.name/* && pf.name != 'OTHER'*/));
                  this.setState({
                    showPermission: false,
                    showRole: false,
                    showGroup: false,
                    showPlatforms: true,
                    showProject: false,
                    showCompany: false,
                    perColor: '#c5c6d0',
                    groupColor: '',
                    roleColor: '',
                    namePerColor: '',
                    borderPerBottom: '',
                    nameGroupColor: '',
                    nameRoleColor: '',
                    borderRoleBottom: '',
                    borderGroupBottom: '',
                    borderPfBottom: '2px solid #042ee1',
                    namePfColor: '#042ee1',
                    borderProjectBottom: '',
                    nameProjectColor: '',
                    pfs,
                    borderCompanyBottom: '',
                    nameCompanyColor: '',
                  })
                }}
              >
                <span
                  style={{ color: !!this.state.namePfColor ? this.state.namePfColor : '#8b838f', }}>{'PLATFORMS'}</span>
              </div>
              <div
                style={{
                  borderBottom: !!this.state.borderProjectBottom ? this.state.borderProjectBottom : '2px solid #8b838f',
                }}
                className="button-btn-3"
                onClick={async () => {
                  this.searchUserProject();
                  this.setState({
                    showPermission: false,
                    showRole: false,
                    showGroup: false,
                    showPlatforms: false,
                    showProject: true,
                    showCompany: false,
                    perColor: '#c5c6d0',
                    groupColor: '',
                    roleColor: '',
                    namePerColor: '',
                    borderPerBottom: '',
                    nameGroupColor: '',
                    nameRoleColor: '',
                    borderRoleBottom: '',
                    borderGroupBottom: '',
                    borderPfBottom: '',
                    namePfColor: '',
                    borderProjectBottom: '2px solid #042ee1',
                    nameProjectColor: '#042ee1',
                    borderCompanyBottom: '',
                    nameCompanyColor: '',
                  })
                }}
              >
                <span
                  style={{ color: !!this.state.nameProjectColor ? this.state.nameProjectColor : '#8b838f', }}>{'PROJECT TAG'}</span>
              </div>
              {getCookie('app_code') === 'MMS' && (
              <div
                style={{
                  borderBottom: !!this.state.borderCompanyBottom ? this.state.borderCompanyBottom : '2px solid #8b838f',
                }}
                className="button-btn-3"
                onClick={async () => {
                  this.searchUserCompany();
                  this.setState({
                    showPermission: false,
                    showRole: false,
                    showGroup: false,
                    showPlatforms: false,
                    showProject: false,
                    showCompany: true,
                    perColor: '#c5c6d0',
                    groupColor: '',
                    roleColor: '',
                    namePerColor: '',
                    borderPerBottom: '',
                    nameGroupColor: '',
                    nameRoleColor: '',
                    borderRoleBottom: '',
                    borderGroupBottom: '',
                    borderPfBottom: '',
                    namePfColor: '',
                    borderProjectBottom: '',
                    nameProjectColor: '',
                    borderCompanyBottom: '2px solid #042ee1',
                    nameCompanyColor: '#042ee1',
                  })
                }}
              >
                <span
                  style={{ color: !!this.state.nameCompanyColor ? this.state.nameCompanyColor : '#8b838f', }}>{'COMPANY'}</span>
              </div>
              )}
            </div>

            {!!this.state.showRole ?
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
                    }}>{'UPDATE ROLES'}</span>
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
                  {(this.state.roleAdded || [])
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

            {!!this.state.showPermission ?
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
                      this.searchPermission();
                      this.setState({
                        addPermission: this.state.addPermission,
                      })
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                    <span style={{
                      marginLeft: '15px',
                      color: '#042ee1'
                    }}>{'UPDATE PERMISSIONS'}</span>
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
                  {(this.state.permissionAdded || [])
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
                    {this.state.totalRecordsUserPermission > this.state.pageSizeUserPermission && this.state.totalPagesUserPermission >= 2 &&
                    <Pagination
                      //href={this.props.asPath.replace(/\?.*/g, '')}
                      totalRecords={this.state.totalRecordsUserPermission}
                      totalPages={this.state.totalPagesUserPermission}
                      onPageChanged={async (query) => {
                        this.setState({
                          limit6: 10,
                          offset6: (query.pageIndex - 1) * 10,
                        }, () => {
                          this.searchEachUserPermission();
                        })
                      }}
                      pageIndex={this.state.pageIndexUserPermission}
                      pageSize={this.state.pageSizeUserPermission}
                      styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                    />
                    }
                  </div>
                </div>

              </div>

              : null}
            {!!this.state.showPlatforms ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}>
                <table className="table" style={{ width: '100%', marginTop: '10px' }}>
                  <thead className="thead-dark">
                  <tr>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>NAME
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>START TIME
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>END TIME
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>ACTIVE
                    </th>
                    <th className="table-th" scope="col"
                        style={{ textAlign: 'center' }}>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {((this.state.pfs || []))
                    .map((it, index) => {
                      return (
                        <tr
                          key={it.name + '_' + it.startTime + '_' + it.endTime + '_' + it.active}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                            color: '#000000',
                          }}
                        >
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.name)}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(moment(new Date(it.startTime)).format('YYYY/MM/DD HH:mm:ss'))}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(moment(new Date(it.endTime)).format('YYYY/MM/DD HH:mm:ss'))}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            {(it.active === true ? 'TRUE' : 'FALSE')}
                          </td>
                          <td className="table-td" style={{ textAlign: 'center', }}>
                            <div style={{ display: "flex", width: '100%', justifyContent: 'flex-end' }}>
                              <div
                                style={{
                                  //marginLeft: '800px',
                                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                                  width: '150px'
                                }}
                                className="button-btn-2"
                                onClick={() => {
                                  this.setState({
                                    editPf: {
                                      ...it,
                                      tempActive: it.active,
                                      startTimeTemp: it.startTime,
                                      endTimeTemp: it.endTime,
                                    },
                                  })
                                }}
                              >
                                <i className="fa fa-edit" aria-hidden="true"
                                   style={{ color: '#042ee1', marginLeft: '5px' }}/>
                                <span style={{
                                  marginLeft: '15px',
                                  color: '#042ee1'
                                }}>{'UPDATE'}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                <div style={{ display: "flex", width: '100%', justifyContent: 'flex-end' }}>
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
            {!!this.state.showCompany && (
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
                      this.searchCompanies();
                      this.setState({
                        addCompany: true,
                      })
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true" style={{ color: '#042ee1', marginLeft: '5px' }}/>
                    <span style={{
                      marginLeft: '15px',
                      color: '#042ee1'
                    }}>{'UPDATE COMPANIES'}</span>
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
                  {(this.state.userCompanies || [])
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
                    {this.state.totalRecordsUserCompany > this.state.pageSizeUserCompany && this.state.totalPagesUserCompany >= 2 &&
                    <Pagination
                      totalRecords={this.state.totalRecordsUserCompany}
                      totalPages={this.state.totalPagesUserCompany}
                      onPageChanged={async (query) => {
                        this.setState({
                          limit9: 10,
                          offset9: (query.pageIndex - 1) * 10,
                        }, () => {
                          this.searchUserCompany();
                        })
                      }}
                      pageIndex={this.state.pageIndexUserCompany}
                      pageSize={this.state.pageSizeUserCompany}
                      styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                    />
                    }
                  </div>
                </div>
              </div>
            )}
          </div>

          {!!this.state.openSyncAccess && (
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#00000066',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                width: '30%',
                padding: '15px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '15px',
                borderRadius: '5px',
              }}>
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
                  value={ this.state.syncAccessFromUser || '' }
                  placeholder="Sync from user email..."
                  onChange={event => this.setState({ syncAccessFromUser: event.target.value })}
                />
                <div style={{flex: 1}}/>
                <div style={{
                  marginTop: '5px',
                  display: 'flex',
                  float: 'right',
                  marginLeft: '20px',
                  justifyContent: 'flex-end',
                  marginTop: '15px',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    fontStyle: 'italic',
                    fontWeight: '500',
                  }}>
                    <span style={{color: 'green'}}>
                      {'Sync all access with the user email...'}
                    </span>
                  </div>
                  <div
                    style={{ marginLeft: '15px' }}
                    className="button-btn w-80"
                    onClick={async () => {
                      if (!!(this.state.syncAccessFromUser || '').trim()) {
                        let result = await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        });

                        if (!result || !result.isConfirmed) return;

                        let params = {
                          fromUsername: (this.state.syncAccessFromUser || '').trim().toLowerCase(),
                          toUsername: this.props.data.email,
                        };

                        await this.setState({loading: true});
                        let rp = await syncAccess(params);
                        await this.setState({loading: false});
                        console.log(rp);

                        if (rp.success) {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'> Successfully!</p>`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                          })
                          .then(async () => {
                            window.location.href = window.location.href;
                          })
                        } else {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          })
                          this.setState({
                            // openSyncAccess: false,
                          })
                        }
                      }
                    }}
                  >
                    <span>{'SYNC'}</span>
                  </div>
                  <div
                    style={{
                      marginLeft: '15px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                      width: '85px'
                    }}
                    className="button-btn-2"
                    onClick={async () => {
                      this.setState({ openSyncAccess: false, syncAccessFromUser: '' });
                    }}
                  >
                    <span style={{ color: '#042ee1' }}>{'Close'}</span>
                  </div>
                </div>
              </div>
          </div>
          )}
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
          {!!this.state.addCompany && (
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
                      this.setState({ addCompany: '' });
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
                    {(this.state.companies || [])
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
                      {this.state.totalRecordsCompany > this.state.pageSizeCompany && this.state.totalPagesCompany >= 2 &&
                      <Pagination
                        totalRecords={this.state.totalRecordsCompany}
                        totalPages={this.state.totalPagesCompany}
                        onPageChanged={async (query) => {
                          this.setState({
                            limit10: 10,
                            offset10: (query.pageIndex - 1) * 10,
                          }, () => {
                            this.searchCompanies();
                          })
                        }}
                        pageIndex={this.state.pageIndexCompany}
                        pageSize={this.state.pageSizeCompany}
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
                          companies: !!this.state.selectedRows ? this.state.selectedRows.map(row => row.name) : []
                        };

                        let rp = await updateUserCompany(params);
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
                              this.searchUserCompany();
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
                      this.setState({ addCompany: false });
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
