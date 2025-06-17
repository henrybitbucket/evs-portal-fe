import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Input, Pagination, ProgressLoading, SelectCustom } from '@app/components/Common';
import DatePicker from "react-datepicker";
import { IBasicPageProps } from '@app/components/Types';
import 'moment-timezone';
import makeAnimated from 'react-select/animated';

import ReactTooltip from "react-tooltip";
import { Box, Link, Modal, Typography } from "@material-ui/core";
import { CloseButton } from "react-bootstrap";
import { addAccessPermission, getAccessPermission } from "@app/api/log";
import { createUser } from "@app/api/user";
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
  :global(.date-picker) {
    outline: unset;
    border-radius: 4px;
    height: 30px;
    width: 180px;
    padding-left: 5px;
    border: 1px solid #00000020;
  }
  :global(.custom-swal-container) {
    z-index: 9999 !important;
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
    let { query: { q, page, queryFullName, queryPhoneNumber, queryEmail }, asPath, req } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      options: {
        queryFullName: queryFullName ? queryFullName : undefined,
        queryPhoneNumber: queryPhoneNumber ? queryPhoneNumber : undefined,
        queryEmail: queryEmail ? queryEmail : undefined,
      },
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };

    let rp = await getAccessPermission(params, req);
    rp = rp || {};

    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,

      laps: rp?.response?.results || [],
      totalRecords: rp?.response?.totalRows || 0,
      totalPages: Math.floor(((rp?.response?.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp?.response?.totalRows || 0) + 9) / 10),
      searchFullName: params.options?.queryFullName ? params.options?.queryFullName : undefined,
      searchPhoneNumber: params.options?.queryPhoneNumber ? params.options?.queryPhoneNumber : undefined,
      searchEmail: params.options?.queryEmail ? params.options?.queryEmail : undefined,
      displayValue: {
        fullName: "",
        phoneNumber: "",
        email: "",
        groupName: "",
        startDate: "",
        startHour: "",
        startMinute: "",
        endDate: "",
        endHour: "",
        endMinute: "",
      },
      ignores: [],
      validate: {
        fullName: true,
        phoneNumber: true,
        email: true,
        groupName: true,
        startDate: true,
        startHour: true,
        startMinute: true,
        endDate: true,
        endHour: true,
        endMinute: true,
      },
    };
  }

  async componentDidMount() {
    this.setState({ mapKey: Date.now() });
  }

  handleChange(field, value) {
    this.state.displayValue[field] = value;
    this.validate(field);

    this.setState({ displayValue: { ...this.state.displayValue } })
  }

  validate(field) {
    if (this.state.ignores.indexOf(field) > -1) {
      return true;
    }

    let value = this.state.displayValue[field];
    if (field === 'phoneNumber') {
      this.state.validate.phoneNumber = !!value && /^(0[1-9][0-9]{1,8})|([1-9][0-9]{1,9})$/g.test(value.toLowerCase().trim());
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
    this.setState({
      validate: {
        ...this.state.validate,
        [field]: this.state.validate[field]
      }
    })
    return this.state.validate[field];
  }

  validates() {
    let rs = true;
    Object.keys(this.state.displayValue || {})
      .map(field => rs &= this.validate(field));
    console.log(rs)
    return rs;
  }


  render() {
    const { t } = this.props;
    return (
      <TotPage title={'DMS LOCKS ACCESS PERMISSION'}>
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
              <>
                <div style={{
                  padding: '15px',
                  paddingTop: '20px',
                  paddingBottom: '0px',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: '#000000'
                }}>
                  <h5 className="site-title">{'DMS LOCKS ACCESS PERMISSION'}</h5>
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
                      value={this.state.searchFullName || ''}
                      placeholder="Search user full name..."
                      onChange={event => this.setState({ searchFullName: event.target.value })}
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
                      value={this.state.searchPhoneNumber || ''}
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
                      value={this.state.searchEmail || ''}
                      placeholder="Search email..."
                      onChange={event => this.setState({ searchEmail: event.target.value })}
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
                        queryFullName: this.state.searchFullName || undefined,
                        queryEmail: this.state.searchEmail || undefined,
                        queryPhoneNumber: this.state.searchPhoneNumber || undefined,
                      };
                      let pathName = window.location.pathname;
                      if (Object.keys(options)?.length) {
                        pathName = pathName.concat("?");
                        if (!!options.queryFullName) {
                          pathName = pathName.concat(`queryFullName=${options.queryFullName}&`)
                        }
                        if (!!options.queryEmail) {
                          pathName = pathName.concat(`queryEmail=${options.queryEmail}&`)
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
                        searchFullName: undefined,
                        searchEmail: undefined,
                        searchPhoneNumber: undefined,
                      });
                      const pathName = window.location.pathname;
                      require('@app/utils/next-routes').Router.pushRoute(pathName);
                    }}
                  >
                    <span>{'CLEAR'}</span>
                  </div>
                  {/*<div*/}
                  {/*  data-tip="Add new access permission"*/}
                  {/*  className="button-btn w-250 mr-10"*/}
                  {/*  onClick={() => {*/}
                  {/*    this.setState({*/}
                  {/*      isAddNewAccessPermission: true*/}
                  {/*    })*/}
                  {/*    console.log(this.state.displayValue)*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <span>{'ADD NEW ACCESS PERMISSION'}</span>*/}
                  {/*</div>*/}

                </div>
                <div
                  style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '500px', }}
                  className='doctor-list'>
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', }}>
                    <table className='table'>
                      <thead className="thead-dark">
                      <tr>
                        <th className="table-th" scope="col">Full Name</th>
                        <th className="table-th" scope="col">Phone Number</th>
                        <th className="table-th" scope="col">Email</th>
                        <th className="table-th" scope="col">Start date</th>
                        <th className="table-th" scope="col">Start hour</th>
                        <th className="table-th" scope="col">Start minute</th>
                        <th className="table-th" scope="col">End date</th>
                        <th className="table-th" scope="col">End hour</th>
                        <th className="table-th" scope="col">End minute</th>
                        <th className="table-th" scope="col">URL</th>
                      </tr>
                      </thead>

                      <tbody>
                      {(this.state.laps || [])
                        .map((it, index) => {
                          return (
                            <tr key={index}>
                              <td className="table-td">
                                {it.fullName}
                              </td>
                              <td className="table-td">
                                <span>{it.phoneNumber}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.email}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.startDate}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.startHour}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.startMinute}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.endDate}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.endHour}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.endMinute}</span>
                              </td>
                              <td className="table-td">
                                <Link href={it.url} rel="noopener noreferrer" target="_blank">{it.url}</Link>
                              </td>
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

                <Modal open={this.state.isAddNewAccessPermission}>
                  <Box
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 700,
                      backgroundColor: '#fff',
                      borderRadius: '4px',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                      padding: '20px',
                      zIndex: 1
                    }}
                  >
                    <CloseButton
                      className="w-5 h-5"
                      onClick={() => {
                        this.setState({
                          isAddNewAccessPermission: false,
                          displayValue: {
                            fullName: "",
                            phoneNumber: "",
                            email: "",
                            groupName: "",
                            startDate: "",
                            startHour: "",
                            startMinute: "",
                            endDate: "",
                            endHour: "",
                            endMinute: "",
                          },
                          validate: {
                            fullName: true,
                            phoneNumber: true,
                            email: true,
                            groupName: true,
                            startDate: true,
                            startHour: true,
                            startMinute: true,
                            endDate: true,
                            endHour: true,
                            endMinute: true,
                          },
                        });
                      }}
                    />
                    <Typography variant="h6" component="h2" style={{ marginBottom: '20px' }}>
                      Add new Access Permission
                    </Typography>

                    <div className="form-group ml-10 flex-row align-items-center" style={{ display: 'flex' }}>
                      <label
                        htmlFor="telephone"
                        className="control-label visible-lg-block"
                        style={{
                          fontSize: "12px",
                          textAlign: "left",
                          fontWeight: 500,
                          color: "#222222",
                          marginBottom: '0px',
                          width: '20%',
                        }}
                      >
                        Full Name :
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
                        style={{ position: "relative", paddingRight: "20px", width: '80%' }}
                      >
                        <Input
                          key={this.state.refreshKey}
                          field={{
                            name: "fullName"
                          }}
                          name="fullName"
                          type="text"
                          value={this.state.displayValue?.fullName || ""}
                          placeholder={"Full name"}
                          groupstyle={{ margin: "auto" }}
                          onChange={value => this.handleChange('fullName', value)}
                        />
                        {this.state.validate?.fullName === false ?
                          <small
                            className="help-block"
                            style={{
                              color: '#eb0000',
                              fontSize: '12px',
                              fontWeight: '400',
                            }}
                          >
                            {(!this.state.displayValue?.fullName || !this.state.displayValue?.fullName.trim().length) ? 'Full name is required!' : 'Full name is invalid!'}
                          </small>
                          : null}
                      </div>
                    </div>
                    <div className="form-group ml-10 flex-row align-items-center" style={{ display: 'flex' }}>
                      <label
                        htmlFor="telephone"
                        className="control-label visible-lg-block"
                        style={{
                          fontSize: "12px",
                          textAlign: "left",
                          fontWeight: 500,
                          color: "#222222",
                          marginBottom: '0px',
                          width: '20%',
                        }}
                      >
                        Email :
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
                        style={{ position: "relative", paddingRight: "20px", width: '80%' }}
                      >
                        <Input
                          key={this.state.refreshKey}
                          field={{
                            name: "email"
                          }}
                          name="email"
                          type="email"
                          value={this.state.displayValue?.email || ""}
                          placeholder={"Email"}
                          groupstyle={{ margin: "auto" }}
                          onChange={value => this.handleChange('email', value)}
                        />
                        {this.state.validate?.email === false ?
                          <small
                            className="help-block"
                            style={{
                              color: '#eb0000',
                              fontSize: '12px',
                              fontWeight: '400',
                            }}
                          >
                            {(!this.state.displayValue?.email || !this.state.displayValue?.email.trim().length) ? 'Email is required!' : 'Email is invalid!'}
                          </small>
                          : null}
                      </div>
                    </div>
                    <div className="form-group ml-10 flex-row align-items-center" style={{ display: 'flex' }}>
                      <label
                        htmlFor="telephone"
                        className="control-label visible-lg-block"
                        style={{
                          fontSize: "12px",
                          textAlign: "left",
                          fontWeight: 500,
                          color: "#222222",
                          marginBottom: '0px',
                          width: '20%',
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
                        className="input-wrap has-feedback has-success"
                        style={{ position: "relative", paddingRight: "20px", width: '80%' }}
                      >
                        <Input
                          key={this.state.refreshKey}
                          field={{
                            name: "phoneNumber"
                          }}
                          name="phoneNumber"
                          type="text"
                          value={this.state.displayValue?.phoneNumber || ""}
                          placeholder={"Phone Number"}
                          groupstyle={{ margin: "auto" }}
                          onChange={value => this.handleChange('phoneNumber', value)}
                        />
                        {this.state.validate?.phoneNumber === false ?
                          <small
                            className="help-block"
                            style={{
                              color: '#eb0000',
                              fontSize: '12px',
                              fontWeight: '400',
                            }}
                          >
                            {(!this.state.displayValue?.phoneNumber || !this.state.displayValue?.phoneNumber.trim().length) ? 'Phone number is required!' : 'Phone number is invalid!'}
                          </small>
                          : null}
                      </div>
                    </div>
                    <div className="form-group ml-10 flex-row align-items-center" style={{ display: 'flex' }}>
                      <label
                        htmlFor="telephone"
                        className="control-label visible-lg-block"
                        style={{
                          fontSize: "12px",
                          textAlign: "left",
                          fontWeight: 500,
                          color: "#222222",
                          marginBottom: '0px',
                          width: '20%',
                        }}
                      >
                        Group name :
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
                        style={{ position: "relative", paddingRight: "20px", width: '80%' }}
                      >
                        <Input
                          key={this.state.refreshKey}
                          field={{
                            name: "groupName"
                          }}
                          name="groupName"
                          type="text"
                          value={this.state.displayValue?.groupName || ""}
                          placeholder={"Group name"}
                          groupstyle={{ margin: "auto" }}
                          onChange={value => this.handleChange('groupName', value)}
                        />
                        {this.state.validate?.groupName === false ?
                          <small
                            className="help-block"
                            style={{
                              color: '#eb0000',
                              fontSize: '12px',
                              fontWeight: 400,
                            }}
                          >
                            {(!this.state.displayValue?.groupName || !this.state.displayValue?.groupName.trim().length) ? 'Group name is required!' : 'Group name is invalid!'}
                          </small>
                          : null}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: '20px'
                      }}
                      className="box-date form-group ml-10"
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: ' #282828',
                            fontSize: '12px',
                            fontWeight: 500,
                            marginBottom: '20px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ marginRight: '10px', width: '70px' }}>{'Start date:'}</span>
                          <DatePicker
                            groupstyle={{ marginBottom: '0' }}
                            className="date-picker mb-0"
                            dateFormat="yyyy-MM-dd"
                            selected={!!this.state.displayValue.startDate ? new Date(this.state.displayValue.startDate) : ''}
                            placeholderText={"YYYY-MM-DD"}
                            onChange={(date: Date) => this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                startDate: date
                              }
                            })}
                          />
                          {this.state.validate?.startDate === false ?
                            <small
                              className="help-block"
                              style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                                position: 'absolute',
                                left: '80px',
                                bottom: '-20px'
                              }}
                            >
                              {!this.state.displayValue?.startDate ? 'Start date is required!' : 'Start date is invalid!'}
                            </small>
                            : null}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: ' #282828',
                            fontSize: '12px',
                            fontWeight: 500,
                            marginBottom: '20px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ marginRight: '10px', width: '70px' }}>{'Start hour:'}</span>
                          <SelectCustom
                            groupstyle={{ marginBottom: '0', width: '90px' }}
                            field={{
                              name: 'startHour',
                            }}
                            name="Start hour"
                            options={Array.from({ length: 24 }, (_, i) => i).map(number => ({
                              value: number,
                              label: number
                            }))}
                            value={this.state.displayValue.startHour || {value: "", label: "Select..."}}
                            onChange={(field, value) => this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                startHour: value
                              }
                            })}
                          />
                          {this.state.validate?.startHour === false ?
                            <small
                              className="help-block"
                              style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                                position: 'absolute',
                                left: '80px',
                                bottom: '-20px'
                              }}
                            >
                              {!this.state.displayValue?.startHour ? 'Start hour is required!' : 'Start hour is invalid!'}
                            </small>
                            : null}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: ' #282828',
                            fontSize: '12px',
                            fontWeight: 500,
                            position: 'relative'
                          }}
                        >
                          <span style={{ marginRight: '10px', width: '70px' }}>{'Start minute:'}</span>
                          <SelectCustom
                            groupstyle={{ marginBottom: '0', width: '90px' }}
                            field={{
                              name: 'startMinute',
                            }}
                            name="Start minute"
                            options={Array.from({ length: 60 }, (_, i) => i).filter(num => num % 5 === 0).map(number => ({
                              value: number,
                              label: number
                            }))}
                            value={this.state.displayValue.startMinute || {value: "", label: "Select..."}}
                            onChange={(field, value) => this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                startMinute: value
                              }
                            })}
                          />
                          {this.state.validate?.startMinute === false ?
                            <small
                              className="help-block"
                              style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                                position: 'absolute',
                                left: '80px',
                                bottom: '-20px'
                              }}
                            >
                              {!this.state.displayValue?.startMinute ? 'Start minute is required!' : 'Start minute is invalid!'}
                            </small>
                            : null}
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: ' #282828',
                            fontSize: '12px',
                            fontWeight: 500,
                            marginBottom: '20px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ marginRight: '10px', width: '70px' }}>{'End date:'}</span>
                          <DatePicker
                            groupstyle={{ marginBottom: '0' }}
                            className="date-picker mb-0"
                            dateFormat="yyyy-MM-dd"
                            selected={!!this.state.displayValue.endDate ? new Date(this.state.displayValue.endDate) : ''}
                            placeholderText={"YYYY-MM-DD"}
                            onChange={(date: Date) => this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                endDate: date
                              }
                            })}
                          />
                          {this.state.validate?.endDate === false ?
                            <small
                              className="help-block"
                              style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                                position: 'absolute',
                                left: '80px',
                                bottom: '-20px'
                              }}
                            >
                              {!this.state.displayValue?.endDate ? 'End date is required!' : 'End date is invalid!'}
                            </small>
                            : null}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: ' #282828',
                            fontSize: '12px',
                            fontWeight: 500,
                            marginBottom: '20px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ marginRight: '10px', width: '70px' }}>{'End hour:'}</span>
                          <SelectCustom
                            groupstyle={{ marginBottom: '0', width: '90px' }}
                            field={{
                              name: 'endHour',
                            }}
                            name="End hour"
                            options={Array.from({ length: 24 }, (_, i) => i).map(number => ({
                              value: number,
                              label: number
                            }))}
                            value={this.state.displayValue.endHour || {value: "", label: "Select..."}}
                            onChange={(field, value) => this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                endHour: value
                              }
                            })}
                          />
                          {this.state.validate?.endHour === false ?
                            <small
                              className="help-block"
                              style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                                position: 'absolute',
                                left: '80px',
                                bottom: '-20px'
                              }}
                            >
                              {!this.state.displayValue?.endHour ? 'End hour is required!' : 'End hour is invalid!'}
                            </small>
                            : null}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: ' #282828',
                            fontSize: '12px',
                            fontWeight: 500,
                            position: 'relative'
                          }}
                        >
                          <span style={{ marginRight: '10px', width: '70px' }}>{'End minute:'}</span>
                          <SelectCustom
                            groupstyle={{ marginBottom: '0', width: '90px' }}
                            field={{
                              name: 'endMinute',
                            }}
                            name="End minute"
                            options={Array.from({ length: 60 }, (_, i) => i).filter(num => num % 5 === 0).map(number => ({
                              value: number,
                              label: number
                            }))}
                            value={this.state.displayValue.endMinute || {value: "", label: "Select..."}}
                            onChange={(field, value) => this.setState({
                              displayValue: {
                                ...this.state.displayValue,
                                endMinute: value
                              }
                            })}
                          />
                          {this.state.validate?.endMinute === false ?
                            <small
                              className="help-block"
                              style={{
                                color: '#eb0000',
                                fontSize: '12px',
                                fontWeight: '400',
                                position: 'absolute',
                                left: '80px',
                                bottom: '-20px'
                              }}
                            >
                              {!this.state.displayValue?.endMinute ? 'End minute is required!' : 'End minute is invalid!'}
                            </small>
                            : null}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <div
                        className="button-btn mr-10"
                        onClick={async () => {
                          if (!this.validates()) {
                            return;
                          }
                          this.setState({loading: true});

                          const params = {
                            fullName: this.state.displayValue.fullName,
                            phoneNumber: this.state.displayValue.phoneNumber,
                            groupName: this.state.displayValue.groupName,
                            startDate: moment(this.state.displayValue.startDate).format("MM/DD/YYYY"),
                            endDate: moment(this.state.displayValue.endDate).format("MM/DD/YYYY"),
                            startHour: this.state.displayValue.startHour.value,
                            startMinute: this.state.displayValue.startMinute.value,
                            endHour: this.state.displayValue.endHour.value,
                            endMinute: this.state.displayValue.endMinute.value,
                            email: this.state.displayValue.email,
                          }

                          let rp = await addAccessPermission(params);
                          this.setState({loading: false});
                          if (rp.success) {
                            Swal.fire({
                              html: `<div style='display: flex; flex-direction: column; align-items: center; justify-content: center'>
                                        <p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>
                                        <a style="width: 100%" href=${rp.response} rel="noopener noreferrer" target="_blank" >${rp.response}</a>
                                    </div>`,
                              icon: 'success',
                              confirmButtonText: 'OK',
                              customClass: {
                                container: "custom-swal-container"
                              }
                            }).then(() => {
                              this.setState({
                                isAddNewAccessPermission: false,
                                displayValue: {
                                  fullName: "",
                                  phoneNumber: "",
                                  email: "",
                                  groupName: "",
                                  startDate: "",
                                  startHour: "",
                                  startMinute: "",
                                  endDate: "",
                                  endHour: "",
                                  endMinute: "",
                                },
                                validate: {
                                  fullName: true,
                                  phoneNumber: true,
                                  email: true,
                                  groupName: true,
                                  startDate: true,
                                  startHour: true,
                                  startMinute: true,
                                  endDate: true,
                                  endHour: true,
                                  endMinute: true,
                                },
                              });
                              window.location.href = window.location.href;
                            });
                          } else {
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>`,
                              icon: 'error',
                              confirmButtonText: 'OK',
                              customClass: {
                                container: "custom-swal-container"
                              }
                            });
                          }
                        }}
                      >
                        <span>Add</span>
                      </div>
                      <div
                        className="button-btn"
                        onClick={() => {
                          this.setState({
                            isAddNewAccessPermission: false,
                            displayValue: {
                              fullName: "",
                              phoneNumber: "",
                              email: "",
                              groupName: "",
                              startDate: "",
                              startHour: "",
                              startMinute: "",
                              endDate: "",
                              endHour: "",
                              endMinute: "",
                            },
                            validate: {
                              fullName: true,
                              phoneNumber: true,
                              email: true,
                              groupName: true,
                              startDate: true,
                              startHour: true,
                              startMinute: true,
                              endDate: true,
                              endHour: true,
                              endMinute: true,
                            },
                          });
                        }}
                      >
                        <span>Cancel</span>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </>
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

export default withNamespaces('common')(Homepage);
