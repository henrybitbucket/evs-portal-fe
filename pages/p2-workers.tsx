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

import { getUserPermissions } from '@app/api/user';

import { addDeviceGroup, deleteDeviceGroup, getDeviceGroups, getSettingByKey, getPiClients, pingPi, getRelatedLogs, getMeterFileDatas, createP2Workers, getP2Managers, getP2WorkerByManager,
  deleteP2Worker,
} from '@app/api/log';

import ReactTooltip from "react-tooltip";

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
    const { query: { q, page }, asPath, req, initialState: {} } = args;

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
      logFontWeight : '500',
      fileFontWeight : '300',
  };

  async componentDidMount() {
      this.search();
  }


  search = async () => {
      const params = {
          limit: this.state.limit || 20,
          offset: this.state.offset || 0,
      };
      const rp = await getP2WorkerByManager(this.props.userInfo.email);
      this.setState({
          workers: rp?.response || []
      });
  }

  render() {
    const { t } = this.props;
    return (
      <TotPage title={'Worker Management'}>
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
                          <h5 className="site-title">{'Worker Management'}</h5>
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
                                  showAddWorker: true
                              })}
                          >
                              <span>{'ADD WORKER'}</span>
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
                                          style={{textAlign: 'center'}}>EMAIL
                                      </th>
                                      <th className="table-th" scope="col"
                                          style={{textAlign: 'center'}}>
                                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%',}}>
                                            ACTION
                                          </div>
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {(this.state.workers || [])
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
                                                  <td className="table-td" style={{textAlign: 'center',}}>
                                                      {(it.email)}
                                                  </td>
                                                  <td className="table-td " style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                  }}>
                                                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%',}}>
                                                          <ReactTooltip globalEventOff="click" place="bottom"
                                                                        type="info" effect="solid"/>
                                                          <div
                                                              data-tip="Click to remove worker"
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
                                                                          manager: this.props.userInfo.email,
                                                                          worker: it.email,
                                                                      };

                                                                      let rp = await deleteP2Worker(params);
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
                                                                                  <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
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
                                                      </div>
                                                  </td>
                                              </tr>
                                          );
                                      })}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </>
                  : null}
              {!!this.state.showAddWorker && (

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
                                      this.setState({showAddWorker: false});
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
                            {'ADD WORKER'}
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
                                     value={this.state.workerEmail || ''}
                                     style={{width: '670px', height: '35px', border: '1px #e1e1e1 solid', borderRadius: '2.5px', outline: 'none', padding: '0px 10px',}}
                                     onChange={(event) => {
                                         if (event.target.value != null) {
                                             this.setState({errorWorkerEmail: ""})
                                         }
                                         this.setState({workerEmail: event.target.value})
                                     }}
                                  >
                                  </input>
                                  <span style={{
                                      display: this.state.errorRoleName != '' ? 'flex' : 'none',
                                      color: 'red',
                                      fontSize: '12px',
                                      marginTop: '5px'
                                  }}>
                                  {!this.state.workerEmail ? this.state.errorWorkerEmail : ''}
                              </span>
                              </div>
                          </div>
                          <div style={{marginTop: '20px', marginLeft: '40px'}}>
                              <div style={{marginLeft: '15px'}} className="button-btn w-80"
                                   onClick={async () => {
                                       if (!!this.state.workerEmail && !!this.state.workerEmail.trim().length) {
                                           this.setState({errorWorkerEmail: ""});

                                           let params = {
                                               manager: this.props.userInfo.email,
                                               workers: [this.state.workerEmail],
                                           };

                                           let rp = await createP2Workers(params);

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
                                                           }, showAddWorker: false
                                                       })
                                                       this.search();
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
                                                   showAddWorker: false,
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

Homepage = require('react-redux').connect((state, ownProps) => {
    return {
        userInfo: state.userInfo || {},
    }
},
(dispatch) => ({
    dispatch
}))(Homepage);

export default withNamespaces('common')(Homepage);
