import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, ProgressLoading } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import 'moment-timezone';
import makeAnimated from 'react-select/animated';
import { createGroupUser, deleteGroupUser, getGroupUsers, getRoles, updateGroupUser, } from '@app/api/log';
import ReactTooltip from "react-tooltip";
import { Input } from 'reactstrap';

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
    :global(.reposite-title-report) {
      color: #000000;
      font-size: 20px;
      width: 550px;
      margin: 1px;
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
      width: 200px;
      transition: 0.2s;
      &:hover {
        background-color: #c5c6d0;
        color: #c5c6d0;
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
  state = {
    ...this.props,
  };

  static getInitialProps = async (args) => {
    const { query: { q, page }, asPath, req, initialState: {} } = args;

    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
    };
  }

  async componentDidMount() {
    this.search();
  }

  componentWillUnmount() {
    clearInterval(this.intv);
  }

  search = async () => {
    const params = {
      limit: this.state.limit || 20,
      offset: this.state.offset || 0,
    };
    const rp = await getGroupUsers(params);
    this.setState({
      relatedMeterPis: rp?.response.results || [],
      totalRecordsRelatedMeterPi: rp?.response.totalRows,
      totalPagesRelatedMeterPi: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
      pageIndexRelatedMeterPi: Math.floor((rp?.response.offset + 19) / 20) + 1,
      pageSizeRelatedMeterPi: 20
    });
  }
  searchRoles = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: 10000,
      offset: this.state.offset || 0,
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
  checkInput = () => {
    if (this.state.groupName == null || this.state.groupName == "") {
      return false;
    }
    if (this.state.description == null || this.state.description == "") {
      return false;
    }
    return true;
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Group User'}>
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
              {!this.state.piAdd && !this.state.param && !this.state.task ?
                <>
                  <div style={{
                    padding: '15px',
                    paddingTop: '20px',
                    paddingBottom: '0px',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: '#000000'
                  }}>
                    <h5 className="site-title">{'Group User Management'}</h5>
                  </div>
                  <div style={{
                    display: 'flex',
                    padding: '30px',
                    borderBottom: '1px solid #ddd',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                  }}>
                    <div
                      className="w-200 button-btn"
                      onClick={() => this.setState({
                        showAddRole: true
                      })}
                    >
                      <span>{'ADD NEW GROUP'}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    background: '#fff',
                    minHeight: '300px'
                  }} className="doctor-list">
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      width: '100%'
                    }}>
                      <table className="table">
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}> ID
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}> NAME
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}> DESCRIPTION
                          </th>
                          <th className="table-th" scope="col"
                              style={{ textAlign: 'center' }}>ACTION
                          </th>
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
                                <td className="table-td " style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}>
                                  <ReactTooltip globalEventOff="click" place="bottom"
                                                type="info" effect="solid"/>
                                  <div
                                    data-tip="Click to edit role"
                                    style={{ marginLeft: '20px' }}
                                    className="button-icon"
                                    onClick={() => {
                                      this.searchRoles();
                                      this.setState({
                                        roleAdded: [].concat(it.roles || []),
                                        selectedRows: [].concat(it.roles || []),
                                        roleId: it.id,
                                        groupName: it.name,
                                        description: it.description,
                                        showEditRole: true
                                      })
                                    }}
                                  >
                                    <span><i className="fa fa-edit"/></span>
                                  </div>
                                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                  <div
                                    data-tip="Click to remove role"
                                    className="button-icon"
                                    style={{ marginLeft: '20px' }}
                                    onClick={async () => {
                                      const result = await Swal.fire({
                                        html: `<p style='text-align: center; font-size: 14px;'>Are you sure ?</p>`,
                                        icon: 'question',
                                        confirmButtonText: 'OK',
                                        cancelButtonText: 'Cancel',
                                        showCancelButton: true,
                                      });
                                      if (result && result.isConfirmed) {
                                        let params = {
                                          id: it.id
                                        };
                                        let rp = await deleteGroupUser(params);
                                        console.log(rp);

                                        if (rp.success) {
                                          Swal.fire({
                                            html: `<p style='text-align: center; font-size: 14px;'>Delete successfully!</p>`,
                                            icon: 'success',
                                            confirmButtonText: 'OK',
                                          })
                                            .then(() => {
                                              this.setState({
                                                createTask: {
                                                  create: false,
                                                  data: null
                                                }
                                              })
                                              this.search();
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
                                    <span><i className="fa fa-trash-o"/></span>
                                  </div>
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
                            pageIndex={this.state.pageIndexRelatedMeterPi}
                            pageSize={this.state.pageSizeRelatedMeterPi}
                            styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                          />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                : null}
              {!!this.state.showAddRole && (

                <div
                  style={{
                    backgroundColor: 'transparent',
                    position: 'fixed',
                    zIndex: 10,
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                    padding: '30px 30px 15px 30px',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                    color: '#000000',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{
                    backgroundColor: '#fff',
                    width: '44%',
                    padding: '30px 30px 15px 0px',
                    marginTop: '100px',
                    marginLeft: '450px',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'between',
                      alignItems: 'center',
                      marginLeft: '40px'
                    }}>
                      <button
                        style={{
                          width: '40px', height: '40px', borderRadius: '50%', border: '2px',
                          borderColor: 'transparent', border: 'unset',
                          outline: 'unset',
                        }}
                        onClick={() => {
                          this.setState({ showAddRole: false });
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
                      }}>{'ADD GROUP USER'}</span>
                    </div>
                    <div style={{
                      overflow: 'auto',
                      width: '100%',
                      height: '60%',
                      marginTop: '5%',
                      marginLeft: '40px'
                    }}>
                      <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                          fontSize: '15px',
                          textAlign: 'left',
                          fontWeight: 500,
                          color: '#222222',
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
                        className="col-md-6 input-wrap has-feedback has-success"
                        style={{ position: 'relative', paddingRight: '20px' }}
                      >
                        <Input
                          type="input"
                          name="input"
                          value={this.state.groupName}
                          style={{ width: '670px' }}
                          onChange={(event) => {
                            if (event.target.value != null) {
                              this.setState({ errorGroupName: "" })
                            }

                            this.setState({ groupName: event.target.value })
                          }}
                        >
                        </Input>
                        <span style={{
                          display: this.state.errorGroupName != '' ? 'flex' : 'none',
                          color: 'red',
                          fontSize: '12px',
                          marginTop: '5px'
                        }}>{!this.state.groupName ? this.state.errorGroupName : ''}</span>

                      </div>

                      <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                          fontSize: '15px',
                          textAlign: 'left',
                          fontWeight: 500,
                          color: '#222222',
                          marginTop: '20px'
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
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={this.state.description}
                          style={{ width: '670px' }}
                          onChange={(event) => {
                            if (event.target.value != null) {
                              this.setState({ errorRemark: "" })
                            }

                            this.setState({ description: event.target.value })
                          }}
                        >
                        </textarea>
                        <span style={{
                          display: this.state.errorRemark != '' ? 'flex' : 'none',
                          color: 'red',
                          fontSize: '12px',
                          marginTop: '5px'
                        }}>{!this.state.description ? this.state.errorRemark : ''}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '20px', marginLeft: '40px' }}>
                      <div
                        style={{ marginLeft: '15px' }}
                        className="button-btn w-80"
                        onClick={async () => {
                          if (this.checkInput()) {
                            this.setState({ loading: true });
                            this.setState({ errorGroupName: "" });
                            this.setState({ errorRemark: "" });

                            let params = {
                              name: this.state.groupName,
                              description: this.state.description,
                            };
                            let rp = await createGroupUser(params);
                            this.setState({ loading: false });

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
                                    }, showAddRole: false
                                  })
                                  this.search();
                                })
                            } else {
                              Swal.fire({
                                html: `<p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>`,
                                icon: 'error',
                                confirmButtonText: 'OK',
                              })
                              this.setState({
                                showAddRole: false,
                              })
                            }
                          } else {
                            if (this.state.groupName == null || this.state.groupName == "") {
                              this.setState({ errorGroupName: "Role name can not be empty" });
                            }
                            if (this.state.description == null || this.state.description == "") {
                              this.setState({ errorRemark: "Description can not be empty" });
                            }
                          }
                        }}
                      >
                        <span>{'SAVE'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!!this.state.showEditRole && (
                <div
                  style={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    width: '100%',
                    height: 'auto',
                    minHeight: '100%',
                    zIndex: 10,
                    borderRadius: '5px',
                    padding: '30px 30px 15px 30px',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                    color: '#000000',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{
                    backgroundColor: '#fff',
                    width: '42%',
                    padding: '30px 30px 15px 0px',
                    margin: 'auto',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'between',
                      alignItems: 'center',
                      marginLeft: '20px',
                    }}>
                      <button
                        style={{
                          width: '40px', height: '40px', borderRadius: '50%', border: '2px',
                          borderColor: 'transparent', border: 'unset',
                          outline: 'unset',
                        }}
                        onClick={() => {
                          this.setState({ showEditRole: false });
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
                      }}>{'UPDATE GROUP USER'}</span>
                    </div>
                    <div style={{ width: '100%', marginTop: '5%', marginLeft: '40px' }}>
                      <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                          fontSize: '15px',
                          textAlign: 'left',
                          fontWeight: 500,
                          color: '#222222',
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
                        className="col-md-6 input-wrap has-feedback has-success"
                        style={{ position: 'relative', paddingRight: '20px' }}
                      >
                        <Input
                          type="input"
                          name="input"
                          value={this.state.groupName}
                          style={{ width: '624px', pointerEvents: 'none' }}
                          onChange={(event) => {
                            if (event.target.value != null) {
                              this.setState({ errorGroupName: "" })
                            }

                            this.setState({ groupName: event.target.value })
                          }}
                        >
                        </Input>
                        <span style={{
                          display: this.state.errorGroupName != '' ? 'flex' : 'none',
                          color: 'red',
                          fontSize: '12px',
                          marginTop: '5px'
                        }}>{!this.state.groupName ? this.state.errorGroupName : ''}</span>
                      </div>

                      <label
                        htmlFor="telephone"
                        className="col-md-6 control-label visible-lg-block"
                        style={{
                          fontSize: '15px',
                          textAlign: 'left',
                          fontWeight: 500,
                          color: '#222222',
                          marginTop: '20px'
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
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={this.state.description}
                          style={{ width: '624px' }}
                          onChange={(event) => {
                            if (event.target.value != null) {
                              this.setState({ errorRemark: "" })
                            }

                            this.setState({ description: event.target.value })
                          }}
                        >
                        </textarea>
                        <span style={{
                          display: this.state.errorRemark != '' ? 'flex' : 'none',
                          color: 'red',
                          fontSize: '12px',
                          marginTop: '5px'
                        }}>{!this.state.description ? this.state.errorRemark : ''}</span>
                      </div>

                      <div style={{ display: 'flex', marginTop: '10px' }}>
                      </div>
                      <label
                        htmlFor="telephone"
                        className="control-label visible-lg-block"
                        style={{
                          fontSize: '15px',
                          textAlign: 'left',
                          fontWeight: 500,
                          color: '#222222',
                          marginTop: '20px'
                        }}
                      >
                        Role list :
                        <span
                          style={{
                            marginLeft: '3px',
                            marginTop: '2px',
                            color: 'red',
                          }}
                        />
                      </label>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '92%',
                        maxHeight: '330px',
                        overflow: 'auto'
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
                          {((this.state.roleAdded || []).concat((this.state.addRole || []).filter(item => !(this.state.roleAdded.map(it => it.id) || []).includes(item.id))) || [])
                            .map((it, index) => {
                              let off = (Date.now() - (it.lastPing || 0)) > (3 * 60 * 1000);
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
                                      this.setState({ selectedRows: [].concat(this.state.selectedRows) });
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
                                  <td
                                    className="table-td"
                                    style={{ textAlign: 'center', }}>
                                    {(it.id)}
                                  </td>
                                  <td
                                    className="table-td"
                                    style={{ textAlign: 'center', }}>
                                    {(it.name)}
                                  </td>
                                  <td
                                    className="table-td"
                                    style={{ textAlign: 'center', }}>
                                    {(it.description)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                    </div>
                    <div style={{ display: 'flex', marginTop: '15px', marginLeft: '25px' }}>
                      <div
                        style={{ marginLeft: '15px' }}
                        className="button-btn w-80"
                        onClick={async () => {
                          if (this.checkInput()) {
                            this.setState({ errorGroupName: "" });
                            this.setState({ errorRemark: "" });

                            let params = {
                              id: this.state.roleId,
                              name: this.state.groupName,
                              description: this.state.description,
                              roles: !!this.state.selectedRows ? this.state.selectedRows : []
                            };

                            let rp = await updateGroupUser(params);
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
                                  this.search();
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
                          } else {
                            if (this.state.groupName == null || this.state.groupName == "") {
                              this.setState({ errorGroupName: "Role name can not be empty" });
                            }
                            if (this.state.description == null || this.state.description == "") {
                              this.setState({ errorRemark: "Description can not be empty" });
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
                          this.setState({ showEditRole: false });
                        }}
                      >
                        <span style={{ color: '#042ee1' }}>{'Close'}</span>
                      </div>
                    </div>
                  </div>
                </div>
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

export default withNamespaces('common')(Homepage);
