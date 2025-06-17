import React from 'react';
import css from 'styled-jsx/css';
import {withNamespaces} from '@app/i18nnext';

import {PageContent} from '@app/components/PageContent';
import {TotPage} from '@app/components/TotPage';
import {Pagination, SelectCustom} from '@app/components/Common';
import {IBasicPageProps} from '@app/components/Types';
import {ProgressLoading} from '@app/components/Common';
import 'moment-timezone';
import moment from 'moment';
import makeAnimated from 'react-select/animated';
import {IoMailUnreadOutline} from 'react-icons/io5';

const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

import {
  createUser,
  deleteUser,
  getEachUserPermissions,
  getUserGroups,
  getUserPlatforms,
  getUserRoles,
  getUsers,
  updatePermission,
  updateUserGroup,
  updateUserPlatform,
  updateUserRole,
} from '@app/api/user';

import {
    getRoles,
    getMyGroupUsers,
    createSubGroupUser,
    addUserToSubGroup,
    updateGroupUser,
    deleteSubGroupUser,
    getUserOfSubGroups,
    removeUserFromSubGroup,
    getRoleOfMemberSubGroup,
    addRoleToSubGroupMember,
} from '@app/api/log';
import ReactTooltip from "react-tooltip";
import {Form, Input, Button} from 'reactstrap';
import {getCookie} from "@app/utils/cookie";
import {tokenName} from "@app/utils/public-config";
import {Json} from "enzyme-to-json";

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
      width: 250px;
      margin: 1px;
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
    static getInitialProps = async (args) => {
        const {query: {q, page}, asPath, req, initialState: {}} = args;

        return {
            namespacesRequired: ['common'],
            asPath,
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

    getUserOfGroup = async (params) => {

      let rp = await getUserOfSubGroups(params);
      rp = rp || {};
      rp.response = rp.response || {};
      this.setState({
        users: rp.response.results || [],
        totalRecords: rp.response.totalRows || 0,
        totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
        pageIndex: 1,
        pageSize: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
      });
    }

    componentWillUnmount() {
        clearInterval(this.intv);
    }

    search = async () => {

        let isPaStaff = (this.state.userInfo?.authorities || []).some(au => au.authority === 'STAFF')
        const params = {
            limit: this.state.limit || 20,
            offset: this.state.offset || 0,
            options: {isOwner: !isPaStaff},
        };
        const rp = await getMyGroupUsers(params);
        this.setState({
            relatedMeterPis: rp?.response.results || [],
            isPaStaff,
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
            limit: this.state.limit || 10,
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
        if (this.state.desc == null || this.state.desc == "") {
            return false;
        }
        return true;
    }

    render() {
        const {t} = this.props;
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
                            {(!this.state.viewUserList && !this.state.viewUserItem) ?
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
                                                        style={{textAlign: 'center'}}> ID
                                                    </th>
                                                    <th className="table-th" scope="col"
                                                        style={{textAlign: 'center'}}> NAME
                                                    </th>
                                                    {(!!this.state.isPaStaff || true) && (
                                                        <th className="table-th" scope="col"
                                                            style={{textAlign: 'center'}}> CREATED BY
                                                        </th>
                                                    )}
                                                    <th className="table-th" scope="col"
                                                        style={{textAlign: 'center'}}> GROUP TYPE
                                                    </th>
                                                    <th className="table-th" scope="col"
                                                        style={{textAlign: 'center'}}> DESCRIPTION
                                                    </th>
                                                    <th className="table-th" scope="col"
                                                        style={{textAlign: 'center'}}>ACTION
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
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {(it.id)}
                                                                </td>
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {(it.name)}
                                                                </td>
                                                                {(!!this.state.isPaStaff || true) && (
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {(it.owner)}
                                                                </td>
                                                                )}
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {it.groupType || ''}
                                                                </td>
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {(it.desc)}
                                                                </td>
                                                                <td className="table-td " style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                }}>
                                                                    <ReactTooltip globalEventOff="click" place="bottom"
                                                                                  type="info" effect="solid"/>
                                                                    <div
                                                                        data-tip="Click to view users"
                                                                        style={{marginLeft: '20px'}}
                                                                        className="button-icon"
                                                                        onClick={async () => {
                                                                            await this.getUserOfGroup({options: {subGroupId: it.id}});
                                                                            this.setState({
                                                                                selectGroup: {...it},
                                                                                viewUserList: true,
                                                                            })
                                                                        }}
                                                                    >
                                                                        <span>
                                                                          <i className="fa fa-eye"/>
                                                                        </span>
                                                                    </div>
                                                                    {/*
                                                                    <>
                                                                    <ReactTooltip globalEventOff="click" place="bottom"
                                                                                  type="info" effect="solid"/>
                                                                    <div
                                                                        data-tip="Click to edit group"
                                                                        style={{marginLeft: '20px'}}
                                                                        className="button-icon"
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                roleAdded: [],
                                                                                roleId: it.id,
                                                                                groupName: it.name,
                                                                                desc: it.desc || it.desc,
                                                                                showEditRole: true
                                                                            })
                                                                        }}
                                                                    >
                                                                        <span>
                                                                          <i className="fa fa-edit"/>
                                                                        </span>
                                                                    </div>
                                                                    </>*/}
                                                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                                    <div
                                                                        data-tip="Click to remove group"
                                                                        className="button-icon"
                                                                        style={{marginLeft: '20px'}}
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
                                                                                let rp = await deleteSubGroupUser(params);
                                                                                console.log(rp);

                                                                                if (rp.success) {
                                                                                    Swal.fire({
                                                                                        html: `
                                                                                          <p style='text-align: center; font-size: 14px;'>Delete successfully!</p>
                                                                                       `,
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
                                                                                        html: `
                                                                                          <p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>
                                                                                       `,
                                                                                        icon: 'error',
                                                                                        confirmButtonText: 'OK',
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
                                                                        }
                                                                    >
                                                                      <span>
                                                                        <i className="fa fa-trash-o"/>
                                                                      </span>
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
                                                     style={{justifyContent: 'flex-end', marginBottom: '25px'}}>
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
                                                        styleItemActive={{backgroundColor: 'green', color: '#ffffff'}}
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
                                                    this.setState({showAddRole: false});
                                                }}
                                            >
                                                <i className="fa fa-arrow-left" style={{color: '#042ee1'}}></i>
                                            </button>
                                            <span style={{
                                                marginLeft: '10px',
                                                fontWeight: 500,
                                                fontSize: '18px',
                                                display: 'flex',
                                                textAlign: 'center'
                                            }}>
                                                {'ADD GROUP USER'}
                                            </span>
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
                                                ></span>
                                            </label>

                                            <div
                                                className="col-md-6 input-wrap has-feedback has-success"
                                                style={{position: 'relative', paddingRight: '20px'}}
                                            >
                                                <Input type="input" name="input"
                                                       value={this.state.groupName}
                                                       style={{width: '670px'}}
                                                       onChange={(event) => {
                                                           if (event.target.value != null) {
                                                               this.setState({errorGroupName: ""})
                                                           }

                                                           this.setState({groupName: event.target.value})
                                                       }}
                                                >
                                                </Input>
                                                <span style={{
                                                    display: this.state.errorGroupName != '' ? 'flex' : 'none',
                                                    color: 'red',
                                                    fontSize: '12px',
                                                    marginTop: '5px'
                                                }}>
                                                    {!this.state.groupName ? this.state.errorGroupName : ''}
                                                </span>

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
                                                Group Type :
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
                                                style={{position: 'relative', paddingRight: '20px'}}
                                            >
                                                <SelectCustom
                                                    field={{
                                                        name: "job-select"
                                                    }}
                                                    key={this.state.keyRefreshWorkers || Date.now()}
                                                    name="job-select"
                                                    options={[
                                                        ...(
                                                            /*this.props.userInfo?.groups || */[
                                                                'P2_GROUP'
                                                            ]
                                                        ).map(item => ({
                                                            label: item,
                                                            value: item,
                                                        }))
                                                    ]}
                                                    value={this.state.groupType}
                                                    onChange={async (field, value) => {
                                                        this.setState({ groupType: value.value });
                                                    }}
                                                    groupstyle={{ marginLeft: '0px', marginBottom: '0px', width: '670px'}}
                                                />
                                                <span style={{
                                                    display: this.state.errorGroupType != '' ? 'flex' : 'none',
                                                    color: 'red',
                                                    fontSize: '12px',
                                                    marginTop: '5px'
                                                }}>
                                                    {!this.state.groupType ? this.state.errorGroupType : ''}
                                                </span>

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
                                                ></span>
                                            </label>

                                            <div
                                                className="col-md-6 input-wrap has-feedback has-success"
                                                style={{position: 'relative', paddingRight: '20px'}}
                                            >
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                                          value={this.state.desc}
                                                          style={{width: '670px'}}
                                                          onChange={(event) => {
                                                              if (event.target.value != null) {
                                                                  this.setState({errorRemark: ""})
                                                              }

                                                              this.setState({desc: event.target.value})
                                                          }}
                                                >
                                                </textarea>
                                                <span style={{
                                                    display: this.state.errorRemark != '' ? 'flex' : 'none',
                                                    color: 'red',
                                                    fontSize: '12px',
                                                    marginTop: '5px'
                                                }}>
                                                    {!this.state.desc ? this.state.errorRemark : ''}
                                                </span>

                                            </div>
                                        </div>
                                        <div style={{marginTop: '20px', marginLeft: '40px'}}>
                                            <div style={{marginLeft: '15px'}} className="button-btn w-80"
                                                 onClick={async () => {
                                                     if (this.checkInput()) {
                                                         this.setState({errorGroupName: ""});
                                                         this.setState({errorRemark: ""});

                                                         let params = {
                                                             name: this.state.groupName,
                                                             desc: this.state.desc,
                                                             groupType: this.state.groupType,
                                                         };
                                                         let rp = await createSubGroupUser(params);
                                                         console.log(rp);

                                                         if (rp.success) {
                                                             Swal.fire({
                                                                 html: `
                                                    <p style='text-align: center; font-size: 14px;'> Successfully!</p>
                                                 `,
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
                                                                 html: `
                                                    <p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>
                                                 `,
                                                                 icon: 'error',
                                                                 confirmButtonText: 'OK',
                                                             })
                                                             this.setState({
                                                                 showAddRole: false,
                                                             })
                                                         }
                                                     } else {
                                                         if (this.state.groupName == null || this.state.groupName == "") {
                                                             this.setState({errorGroupName: "Role name can not be empty"});
                                                         }
                                                         if (this.state.desc == null || this.state.desc == "") {
                                                             this.setState({errorRemark: "Desc can not be empty"});
                                                         }
                                                     }
                                                 }
                                                 }
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
                                                    this.setState({showEditRole: false});
                                                }}
                                            >
                                                <i className="fa fa-arrow-left" style={{color: '#042ee1'}}></i>
                                            </button>
                                            <span style={{
                                                marginLeft: '10px',
                                                fontWeight: 500,
                                                fontSize: '18px',
                                                display: 'flex',
                                                textAlign: 'center'
                                            }}>
                              {'UPDATE GROUP USER'}
                            </span>
                                        </div>
                                        <div style={{width: '100%', marginTop: '5%', marginLeft: '40px'}}>
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
                                                ></span>
                                            </label>

                                            <div
                                                className="col-md-6 input-wrap has-feedback has-success"
                                                style={{position: 'relative', paddingRight: '20px'}}
                                            >
                                                <Input type="input" name="input"
                                                       value={this.state.groupName}
                                                       style={{width: '624px'}}
                                                       onChange={(event) => {
                                                           if (event.target.value != null) {
                                                               this.setState({errorGroupName: ""})
                                                           }

                                                           this.setState({groupName: event.target.value})
                                                       }}
                                                >
                                                </Input>
                                                <span style={{
                                                    display: this.state.errorGroupName != '' ? 'flex' : 'none',
                                                    color: 'red',
                                                    fontSize: '12px',
                                                    marginTop: '5px'
                                                }}>
                                                    {!this.state.groupName ? this.state.errorGroupName : ''}
                                                </span>

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
                                                ></span>
                                            </label>

                                            <div
                                                className="col-md-6 input-wrap has-feedback has-success"
                                                style={{position: 'relative', paddingRight: '20px'}}
                                            >
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                                      value={this.state.desc}
                                                      style={{width: '624px'}}
                                                      onChange={(event) => {
                                                          if (event.target.value != null) {
                                                              this.setState({errorRemark: ""})
                                                          }

                                                          this.setState({description: event.target.value})
                                                      }}
                                                >
                                            </textarea>
                                                <span style={{
                                                    display: this.state.errorRemark != '' ? 'flex' : 'none',
                                                    color: 'red',
                                                    fontSize: '12px',
                                                    marginTop: '5px'
                                                }}>
                                                    {!this.state.desc ? this.state.errorRemark : ''}
                                                </span>

                                            </div>

                                            <div style={{display: 'flex', marginTop: '10px'}}>
                                                <div style={{
                                                    marginLeft: '15px',
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
                                                    <i className="fa fa-edit" aria-hidden="true"
                                                       style={{color: '#042ee1', marginLeft: '5px'}}></i>
                                                    <span style={{
                                                        marginLeft: '15px',
                                                        color: '#042ee1'
                                                    }}>{'UPDATE ROLES'}</span>
                                                </div>

                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'hidden',
                                                width: '92%',
                                                marginTop: '20px'
                                            }}>
                                                <table className="table" style={{marginTop: '20px'}}>
                                                    <thead className="thead-dark">
                                                    <tr>
                                                        <th className="table-th w-20" scope="col"/>
                                                        <th className="table-th" scope="col"
                                                            style={{textAlign: 'center'}}>ID
                                                        </th>
                                                        <th className="table-th" scope="col"
                                                            style={{textAlign: 'center'}}>NAME
                                                        </th>
                                                        <th className="table-th" scope="col"
                                                            style={{textAlign: 'center'}}>DESCRIPTION
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {(this.state.roleAdded || [])
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
                                                                            this.setState({selectedRows: [].concat(this.state.selectedRows)});
                                                                        }}
                                                                    >
                                                                        {!!it.id && (
                                                                            <input style={{marginTop: '4px'}}
                                                                                   type="checkbox"
                                                                                   checked={!!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}/>
                                                                        )}
                                                                    </td>
                                                                    <td className="table-td"
                                                                        style={{textAlign: 'center',}}>
                                                                        {(it.id)}
                                                                    </td>
                                                                    <td className="table-td"
                                                                        style={{textAlign: 'center',}}>
                                                                        {(it.name)}
                                                                    </td>
                                                                    <td className="table-td"
                                                                        style={{textAlign: 'center',}}>
                                                                        {(it.desc)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}


                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row mt-3"
                                                 style={{
                                                     marginLeft: '0px',
                                                     marginRight: '0px',
                                                 }}
                                            >
                                                <div className="col-sm-12 col-md-5">
                                                </div>
                                                <div className="col-sm-12 col-md-7 pagination"
                                                     style={{justifyContent: 'flex-end', marginBottom: '25px'}}>
                                                    {this.state.totalRecordsAdded > this.state.pageSizeAdded && this.state.totalPagesAdded >= 2 &&
                                                    <Pagination
                                                        href={this.props.asPath.replace(/\?.*/g, '')}
                                                        totalRecords={this.state.totalRecordsAdded}
                                                        totalPages={this.state.totalPagesAdded}
                                                        onPageChanged={async (query) => {
                                                            // console.log("pageIndexAdded", this.state.pageIndexAdded);
                                                            // console.log("oldPage", this.state.oldPage);
                                                            // console.log("pageSizeAdded", this.state.pageSizeAdded);
                                                            // console.log("pageIndex", query.pageIndex);
                                                            // if(query.pageIndex >= 0 && query.pageIndex < this.state.oldPage) {
                                                            //     let newFrom = this.state.to - 5;
                                                            //     let newTo = this.state.to - 1;
                                                            //     this.setState({
                                                            //         from: newFrom,
                                                            //         to: newTo,
                                                            //     })
                                                            //     console.log("from", this.state.from);
                                                            //     console.log("to", this.state.to);
                                                            // } else {
                                                            //     this.setState({
                                                            //         from: this.state.to + 1,
                                                            //         to: this.state.to + 5,
                                                            //     })
                                                            // }
                                                            // console.log("from", this.state.from);
                                                            // console.log("to", this.state.to);
                                                            // this.state.array = []
                                                            // this.state.allPermissionAdded.slice(this.state.from, this.state.to).map((it, index) => {
                                                            //     console.log("index", index);
                                                            //     this.state.array.push(it);
                                                            // });
                                                            // console.log("array", this.state.array);
                                                            // this.setState({
                                                            //     roleAdded: this.state.array,
                                                            //     oldPage: query.pageIndex
                                                            // })
                                                        }}
                                                        pageIndex={this.state.pageIndexAdded}
                                                        pageSize={this.state.pageSizeAdded}
                                                        styleItemActive={{backgroundColor: 'green', color: '#ffffff'}}
                                                    />
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{ display: 'flex', marginTop: '15px', marginLeft: '25px'}}>
                                            <div style={{marginLeft: '15px'}} className="button-btn w-80"
                                                 onClick={async () => {
                                                     if (this.checkInput()) {
                                                         this.setState({errorGroupName: ""});
                                                         this.setState({errorRemark: ""});

                                                         let params = {
                                                             id: this.state.roleId,
                                                             name: this.state.groupName,
                                                             description: this.state.desc,
                                                             roles: !!this.state.selectedRows ? this.state.selectedRows : []
                                                         };

                                                         let rp = await updateGroupUser(params);
                                                         console.log(rp);

                                                         if (rp.success) {
                                                             Swal.fire({
                                                                 html: `
                                                    <p style='text-align: center; font-size: 14px;'> Successfully!</p>
                                                 `,
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
                                                                 html: `
                                                    <p style='text-align: center; font-size: 14px;'>${rp.errorRemark || rp.message}</p>
                                                 `,
                                                                 icon: 'error',
                                                                 confirmButtonText: 'OK',
                                                             })
                                                             this.setState({
                                                                 showEditRole: false,
                                                             })
                                                         }
                                                     } else {
                                                         if (this.state.groupName == null || this.state.groupName == "") {
                                                             this.setState({errorGroupName: "Role name can not be empty"});
                                                         }
                                                         if (this.state.desc == null || this.state.desc == "") {
                                                             this.setState({errorRemark: "Description can not be empty"});
                                                         }
                                                     }
                                                 }
                                                 }
                                            >
                                                <span>{'UPDATE'}</span>
                                            </div>
                                            <div style={{
                                                marginLeft: '15px',
                                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                                                width: '85px'
                                            }} className="button-btn-2"
                                                 onClick={async () => {
                                                     this.setState({showEditRole: false});
                                                 }}
                                            >
                                                <span style={{color: '#042ee1'}}>{'Close'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!!this.state.addRole && (
                                <div
                                    style={{
                                        backgroundColor: 'transparent',
                                        position: 'fixed',
                                        width: '100%',
                                        height: '100%',
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
                                                    this.setState({addRole: ''});
                                                }}
                                            >
                                                <i className="fa fa-arrow-left" style={{color: '#042ee1'}}></i>
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
                                                        style={{textAlign: 'center'}}>ID
                                                    </th>
                                                    <th className="table-th" scope="col"
                                                        style={{textAlign: 'center'}}>NAME
                                                    </th>
                                                    <th className="table-th" scope="col"
                                                        style={{textAlign: 'center'}}>REMARK
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
                                                                        <input style={{marginTop: '4px'}}
                                                                               type="checkbox"
                                                                               checked={!!(this.state.selectedRows || []).filter(o => o.id == it.id)[0]}/>
                                                                    )}
                                                                </td>
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {(it.id)}
                                                                </td>
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {(it.name)}
                                                                </td>
                                                                <td className="table-td" style={{textAlign: 'center',}}>
                                                                    {(it.desc)}
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
                                                     style={{justifyContent: 'flex-end', marginBottom: '25px'}}>
                                                    {this.state.totalRecordsRoles > this.state.pageSizeRoles && this.state.totalPagesRoles >= 2 &&
                                                    <Pagination
                                                        href={this.props.asPath.replace(/\?.*/g, '')}
                                                        totalRecords={this.state.totalRecordsRoles}
                                                        totalPages={this.state.totalPagesRoles}
                                                        onPageChanged={async (query) => {
                                                            this.setState({
                                                                limit: 10,
                                                                offset: (query.pageIndex - 1) * 10,
                                                            }, () => {
                                                                this.searchRoles();
                                                            })
                                                        }}
                                                        pageIndex={this.state.pageIndexRoles}
                                                        pageSize={this.state.pageSizeRoles}
                                                        styleItemActive={{backgroundColor: 'green', color: '#ffffff'}}
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
                                            <div style={{marginLeft: '15px'}} className="button-btn w-80"
                                                 onClick={async () => {
                                                     this.state.array = []
                                                     this.state.loop.slice(0, 5).map((it, index) => {
                                                         console.log("index", index);
                                                         this.state.array.push(it);
                                                     });
                                                     console.log("array", this.state.array);
                                                     this.setState({
                                                         from : 6,
                                                         to : 10,
                                                     })
                                                     this.setState({
                                                         roleAdded: [].concat(this.state.selectedRows),
                                                         allPermissionAdded: [].concat(this.state.selectedRows),
                                                         totalRecordsAdded: this.state.count,
                                                         totalPagesAdded: Math.floor(((this.state.count || 0) + 4) / 5),
                                                         pageIndexAdded: Math.floor((this.state.count + 4) / 5) + 1,
                                                         pageSizeAdded: 5,
                                                     });
                                                     console.log("count : ", this.state.count);
                                                 }}
                                            >
                                                <span>{'Add'}</span>
                                            </div>
                                            <div style={{
                                                marginLeft: '15px',
                                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.40)',
                                                width: '85px'
                                            }} className="button-btn-2"
                                                 onClick={async () => {
                                                     this.setState({addRole: ''});
                                                 }}
                                            >
                                                <span style={{color: '#042ee1'}}>{'Close'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(!!this.state.viewUserList && !!this.state.selectGroup?.id && !this.state.selectedUser?.id) ?
                              <>
                                <div
                                style={{
                                  flexDirection: 'row',
                                  width: '300px',
                                  margin: '1px', background: 'aliceblue', height: '60px', alignItems: 'center', display: 'flex', borderRadius: '10px', paddingLeft: '15px', fontWeight: 500, marginLeft: '20px',
                                  marginTop: '20px',
                                }}
                                >
                                  <button
                                    style={{
                                      width: '40px', height: '40px', borderRadius: '50%', border: '2px',
                                      borderColor: 'transparent', border: 'unset',
                                      outline: 'unset',
                                    }}
                                    onClick={() => {
                                      this.setState({viewUserList: false, selectGroup: null})
                                    }}
                                  >
                                    <i className="fa fa-arrow-left" style={{ color: '#042ee1' }}/>
                                  </button>
                                  <h5 className="site-title">Users</h5>
                                </div>
                                <div style={{
                                  padding: '30px',
                                  borderBottom: '1px solid #ddd',
                                  paddingTop: '20px',
                                  paddingBottom: '20px',
                                }}>
                                  <div
                                    className="button-btn w-160 mr-30"
                                    onClick={() => this.setState({
                                      showAddUser: true,
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
                                        <th className="table-th" scope="col">Company</th>
                                        <th className="table-th" scope="col">role</th>
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
                                                <span>{it.username}</span>
                                              </td>
                                              <td className="table-td">
                                                <span>{((it.companies || [] ).map(r => r)).toString().replace('[', '').replace(']', '')}</span>
                                              </td>
                                              <td className="table-td">
                                                <span>{((it.roleDescs).map(r => r.desc)).toString().replace('[', '').replace(']', '')}</span>
                                              </td>
                                              {true && (
                                                <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                    <div
                                                      data-tip="Click to edit permission"
                                                      style={{ margin: 'unset', marginLeft: '5px' }}
                                                      className="button-icon"
                                                      onClick={() => this.setState({ selectedUser: JSON.parse(JSON.stringify(it)) })}
                                                    >
                                                      <span><i className="fa fa-universal-access"/></span>
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
                                                          let rp = await removeUserFromSubGroup({ name: this.state.selectGroup.name, members: [it.email] });
                                                          if (rp.success) {
                                                            await Swal.fire({
                                                              html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                                              icon: 'success',
                                                              confirmButtonText: 'OK',
                                                            });
                                                            await this.getUserOfGroup({options: {subGroupId: this.state.selectGroup.id}});
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
                              {!!this.state.selectedUser ?
                                <UserInfo
                                  data={this.state.selectedUser}
                                  group={this.state.selectGroup}
                                  onClose={() => {
                                    this.setState({ selectedUser: null })
                                  }}
                                  onSave={() => {
                                    window.location.href = window.location.href;
                                  }}
                                />
                                : null
                              }
                            {!!this.state.showAddUser && (
            
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
                                                    this.setState({showAddUser: false});
                                                }}
                                            >
                                                <i className="fa fa-arrow-left" style={{color: '#042ee1'}}></i>
                                            </button>
                                            <span style={{
                                                marginLeft: '10px',
                                                fontWeight: 500,
                                                fontSize: '18px',
                                                display: 'flex',
                                                textAlign: 'center'
                                            }}>
                                          {'ADD MEMBER'}
                                        </span>
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
                                                Email :
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
                                                style={{position: 'relative', paddingRight: '20px'}}
                                            >
                                                <input type="input" name="input"
                                                   value={this.state.userEmail || ''}
                                                   style={{width: '670px', height: '35px', border: '1px #e1e1e1 solid', borderRadius: '2.5px', outline: 'none', padding: '0px 10px',}}
                                                   onChange={(event) => {
                                                       if (event.target.value != null) {
                                                           this.setState({erroruserEmail: ""})
                                                       }
                                                       this.setState({userEmail: event.target.value})
                                                   }}
                                                >
                                                </input>
                                                <span style={{
                                                    display: this.state.errorRoleName != '' ? 'flex' : 'none',
                                                    color: 'red',
                                                    fontSize: '12px',
                                                    marginTop: '5px'
                                                }}>
                                                {!this.state.userEmail ? this.state.erroruserEmail : ''}
                                            </span>
                                            </div>
                                        </div>
                                        <div style={{marginTop: '20px', marginLeft: '40px'}}>
                                            <div style={{marginLeft: '15px'}} className="button-btn w-80"
                                                 onClick={async () => {
                                                     if (!!this.state.userEmail && !!this.state.userEmail.trim().length) {
                                                         this.setState({erroruserEmail: ""});
            
                                                         let params = {
                                                             name: this.state.selectGroup?.name,
                                                             members: [this.state.userEmail],
                                                         };
            
                                                         let rp = await addUserToSubGroup(params);
            
                                                         if (rp.success) {
                                                             Swal.fire({
                                                                 html: `
                                                                <p style='text-align: center; font-size: 14px;'> Successfully!</p>
                                                             `,
                                                                 icon: 'success',
                                                                 confirmButtonText: 'OK',
                                                             })
                                                             .then(async () => {
                                                                 await this.setState({
                                                                     showAddUser: false
                                                                 })
                                                                 await this.getUserOfGroup({options: {subGroupId: this.state.selectGroup.id}});
                                                             })
                                                         } else {
                                                             Swal.fire({
                                                                 html: `
                                                            <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
                                                         `,
                                                                 icon: 'error',
                                                                 confirmButtonText: 'OK',
                                                             })
                                                             this.setState({
                                                                 showAddUser: false,
                                                             })
                                                         }
                                                     } else {
                                                         this.setState({errorRoleName: "Worker email can not be empty"});
                                                     }
                                                 }
                                                 }
                                            >
                                                <span>{'SAVE'}</span>
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

class UserInfo extends React.Component {
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
      showRole: true,
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

  searchUserRole = async () => {
    await this.setState({
      loading: true
    })
    const params = {
      limit: this.state.limit4 || 10,
      offset: this.state.offset4 || 0,
      options: {
        userId: this.state.displayValue.id,
        memberEmail: this.state.displayValue.email,
        groupId: this.props.group?.id,
      },
    };
    const rp = await getRoleOfMemberSubGroup(params);
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
              }}>{'INFORMATION OF USER : '} {this.state.displayValue.email}</span>
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
                      showRole: true,
                      showGroup: false,
                      showPermission: false,
                      showPlatforms: false,
                    })
                  }}
                >
                  <span
                    style={{ color: !!this.state.nameRoleColor ? this.state.nameRoleColor : '#8b838f', }}>{'ROLES'}</span>
                </div>
              </div>
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
                          name: this.props.group.name,
                          member: this.props.data.email,
                          roles: (!!this.state.selectedRows ? this.state.selectedRows : []).map(r => r.name),
                        };

                        let rp = await addRoleToSubGroupMember(params);
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
                      this.searchUserRole();
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
