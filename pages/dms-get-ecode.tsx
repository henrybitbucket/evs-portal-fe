import React from 'react';
import css from 'styled-jsx/css';
import {withNamespaces} from '@app/i18nnext';

import {PageContent} from '@app/components/PageContent';
import {TotPage} from '@app/components/TotPage';
import {Input, Pagination, ProgressLoading} from '@app/components/Common';
import {IBasicPageProps} from '@app/components/Types';
import 'moment-timezone';
import makeAnimated from 'react-select/animated';
import {preLogin, getECode} from '@app/api/log';
import {deleteVendor, getMcUsers, getVendorsUsers, saveMcUser, saveOrUpdateVendorAndUser,} from '@app/api/user';

import ReactTooltip from "react-tooltip";
import {getCookie} from "@app/utils/cookie";
import {toastrs} from "@app/utils/toastr";
import Select from 'react-select';

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
    let {query: {q, page, queryName}, asPath, req, initialState} = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      options: {
        queryName: queryName ? queryName : undefined,
      },
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };

    const rp = await getVendorsUsers(params, req);

    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
      loggerInUser: initialState.userInfo,
      vendors: rp?.response?.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      vendorName: params.options?.queryName ? params.options?.queryName : undefined,
    };
  }

  async componentDidMount() {
  }


  render() {
    const {t} = this.props;
    return (
      <TotPage title={'DMS Ecode management'}>
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
              {!this.state.itemEdit ?
                <>
                  <div style={{
                    padding: '15px',
                    paddingTop: '20px',
                    paddingBottom: '0px',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: '#000000'
                  }}>
                    <h5 className="site-title">{'DMS E-Code Management'}</h5>
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
                          value={this.state.searchDOtc || ''}
                          placeholder="DOTC..."
                          onChange={event => this.setState({searchDOtc: event.target.value})}
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
                    <div style={{
                      padding: '30px',
                      borderBottom: '1px solid #ddd',
                      paddingTop: '5px',
                      paddingBottom: '20px',
                      paddingLeft: '0px',
                      display: 'flex'
                    }}>
                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                      <div
                        data-tip="Get E-Code by DOTC"
                        className="button-btn w-120 mr-10"
                        onClick={async () => {
                          if (!/^[0-9]{6}$/g.test((this.state.searchDOtc || '').trim())) {
                            let message = 'DOTC invalid (6 digit number)';
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${message}</p>`,
                              icon: 'error',
                              confirmButtonText: 'OK',
                            });
                            return;
                          }
                          await this.setState({loading: true, eCode: {}});
                          let rp = await getECode({dotc: (this.state.searchDOtc || '').trim()});
                          await this.setState({loading: false});
                          if (!rp.success) {
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>`,
                              icon: 'error',
                              confirmButtonText: 'OK',
                            });
                            return;
                          }
                          let text = rp.response || '';
                          let text1 = text.split('---')[0] || '';
                          let text2 = text.split('---')[1] || '';

                          let tmp1 = '';
                          for (let i = 0; i < text1.length; i = i + 4) {
                            if (text1.substring(i, i + 4).length > 0) {
                              tmp1 = tmp1 + text1.substring(i, i + 4) + ' ';
                            }
                          }

                          let tmp2 = '';
                          for (let i = 0; i < text2.length; i = i + 4) {
                            if (text2.substring(i, i + 4).length > 0) {
                              tmp2 = tmp2 + text2.substring(i, i + 4) + ' ';
                            }
                          }
                          await this.setState({eCode: {
                            full: text,
                            str1: tmp1.trim(),
                            str2: tmp2.trim(),
                          }})
                          console.info('ecode', this.state.eCode);
                        }}
                      >
                        <span>{'GET E-CODE'}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px'}}
                       className="doctor-list">
                    {!!this.state.eCode?.full && (
                    <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', padding: '15px 30px'}}>
                      <span style={{fontWeight: '500', paddingBottom: '10px'}}>E-Code</span>
                      <span
                        style={{
                          color: "#172B4D",
                          background: "#F4F5F7",
                          padding: "4px 6px",
                          width: "fit-content",
                          borderRadius: "2.5px",
                          fontSize: 13
                        }}
                      >
                        {this.state.eCode?.str1}
                      </span>
                      <span
                        style={{
                          color: "#172B4D",
                          background: "#F4F5F7",
                          padding: "4px 6px",
                          width: "fit-content",
                          borderRadius: "2.5px",
                          fontSize: 13,
                          marginTop: '5px'
                        }}
                      >
                        {this.state.eCode?.str2}
                      </span>
                    </div>
                    )}
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
      displayValue: {...this.props.data},
      validate: {},
      vendorName: this.props.data?.name ? this.props.data?.name : "",
      vendorLabel: this.props.data?.label ? this.props.data?.label : "",
      vendorCompanyName: this.props.data?.companyName ? this.props.data?.companyName : "",
      vendorType: this.props.data?.type ? {value: this.props.data?.type, label: this.props.data?.type} : null,
      vendorMcAccs: this.props.data?.mcAccs?.length ? this.props.data?.mcAccs.map(item => {
        return {
          id: item.id,
          value: item.email,
          label: item.username + ' [' + item.phoneNumber + ']',
          phone: item.phoneNumber,
        }
      }) : null,
      isEdit: this.props.isEdit,
      siteGuests: this.props.data?.mcAccs || [],
      siteUsers: [],
      ignores: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    let params = {
      options: {
        hasPhone: true,
      },
      limit: 100000,
      offset: 0,
    };
    let rp = await getMcUsers(params);
    this.setState({
      dmsMcUsers: rp.response.results || [],
    })
  }

  validate(field) {
    if (this.state.ignores.indexOf(field) > -1) {
      return true;
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
    const editable = !this.state.displayValue?.id;
    return (
      <div style={{paddingTop: '15px', flex: 1, overflow: 'visible', display: 'flex', flexDirection: 'row',}}>
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
              <span style={{
                fontSize: '20px',
                fontWeight: 400,
                color: '#000000'
              }}>{!!this.state.isEdit ? ('Edit vendor: ' + this.state.displayValue.name) : 'Add new vendor'}</span>
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
              style={{
                position: "relative",
                paddingRight: "20px",
                flexDirection: 'row',
                display: 'flex',
                padding: '10px',
                borderTop: '0.75px solid #bbbbbb',
              }}
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
                  Vendor name :
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
                  key={'g_name_' + this.state.refreshKey}
                  field={{
                    name: "Name"
                  }}
                  name="name"
                  value={this.state.vendorName}
                  placeholder={"Vendor name"}
                  groupstyle={{margin: "0", marginRight: '5px', minWidth: '200px', flex: 1}}
                  onChange={value => {
                    this.setState({
                      vendorName: value,
                    })
                    if (value) {
                      this.setState({errorVendorName: undefined});
                    } else {
                      this.setState({errorVendorName: "Vendor name is required!"});
                    }
                  }}
                />
                {this.state.errorVendorName && (
                  <small
                    className="help-block"
                    style={{
                      color: '#eb0000',
                      fontSize: '12px',
                      fontWeight: 400,
                    }}
                  >
                    {this.state.errorVendorName}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{
                position: "relative",
                paddingRight: "20px",
                flexDirection: 'row',
                display: 'flex',
                padding: '10px',
                borderTop: '0.75px solid #bbbbbb',
              }}
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
                  Vendor label :
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
                  key={'g_name_' + this.state.refreshKey}
                  field={{
                    name: "Name"
                  }}
                  name="name"
                  value={this.state.vendorLabel}
                  placeholder={"Vendor label"}
                  groupstyle={{margin: "0", marginRight: '5px', minWidth: '200px', flex: 1}}
                  onChange={value => {
                    this.setState({
                      vendorLabel: value,
                    })
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{
                position: "relative",
                paddingRight: "20px",
                flexDirection: 'row',
                display: 'flex',
                borderBottom: '0.75px solid #bbbbbb',
                padding: '10px',
                borderTop: '0.75px solid #bbbbbb',
              }}
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
                  Vendor company name :
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
                  key={'g_name_' + this.state.refreshKey}
                  field={{
                    name: "Name"
                  }}
                  name="name"
                  value={this.state.vendorCompanyName}
                  placeholder={"Vendor company name"}
                  groupstyle={{margin: "0", marginRight: '5px', minWidth: '200px', flex: 1}}
                  onChange={value => {
                    this.setState({
                      vendorCompanyName: value,
                    })
                    if (value) {
                      this.setState({errorVendorCompanyName: undefined});
                    } else {
                      this.setState({errorVendorCompanyName: "Vendor company name is required!"});
                    }
                  }}
                />
                {this.state.errorVendorCompanyName && (
                  <small
                    className="help-block"
                    style={{
                      color: '#eb0000',
                      fontSize: '12px',
                      fontWeight: 400,
                    }}
                  >
                    {this.state.errorVendorCompanyName}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{
                position: "relative",
                paddingRight: "20px",
                flexDirection: 'row',
                display: 'flex',
                borderBottom: '0.75px solid #bbbbbb',
                padding: '10px'
              }}
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
                  Vendor type:
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div
                style={{flex: 2.5,}}
                className={'form-c-row' + (!!editable ? '' : '-none')}
              >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Select
                    isClearable={!!editable}
                    className="select-vendor"
                    components={animatedComponents}
                    value={
                      this.state.vendorType
                    }
                    options={[
                      {value: "LOCK", label: "LOCK"},
                      {value: "SENSOR", label: "SENSOR"}
                    ]}
                    onChange={(event) => {
                      this.setState({vendorType: event});
                      if (event) {
                        this.setState({errorVendorType: undefined});
                      } else {
                        this.setState({errorVendorType: "Vendor type is required!"});
                      }
                    }}
                  />
                  {this.state.errorVendorType && (
                    <small
                      className="help-block"
                      style={{
                        color: '#eb0000',
                        fontSize: '12px',
                        fontWeight: 400,
                      }}
                    >
                      {this.state.errorVendorType}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginBottom: 'unset'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{
                position: "relative",
                paddingRight: "20px",
                flexDirection: 'row',
                display: 'flex',
                borderBottom: '0.75px solid #bbbbbb',
                padding: '10px'
              }}
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
                  Master accounts :
                  <span
                    style={{
                      marginLeft: '3px',
                      marginTop: '2px',
                      color: 'red',
                    }}
                  />
                </label>
              </div>
              <div
                style={{flex: 2.5,}}
                className={'form-c-row' + (!!editable ? '' : '-none')}
              >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <div
                    style={{flex: 2.5, display: 'flex', flexDirection: 'column'}}
                    className={'form-c-row' + (!!editable ? '' : '-none')}
                  >
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                          <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                          }}>
                            <div style={{
                              display: 'flex', flexDirection: 'row', alignItems: 'center',
                              marginBottom: '5px',
                              paddingBottom: '5px',
                              width: '100%',
                            }}>
                              <Input
                                key={'g_email_' + this.state.refreshKey}
                                field={{
                                  name: "Email"
                                }}
                                name="email"
                                value={this.state.tempGuestEmail}
                                placeholder={"Email, ex: example@example.com"}
                                groupstyle={{margin: "0", marginRight: '5px', minWidth: '200px', flex: 1}}
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
                                groupstyle={{margin: "0", marginLeft: '5px', minWidth: '200px', flex: 1}}
                                type='password'
                                onChange={value => {
                                  this.setState({
                                    tempGuestPassword: value,
                                  })
                                }}
                              />
                            </div>
                          </div>
                        <div style={{
                          display: 'flex', marginTop: '10px',
                          borderBottom: !!this.state.siteGuests?.length ? '0.75px solid rgb(187, 187, 187)' : undefined,
                          marginBottom: '5px',
                          paddingBottom: '5px'
                        }}>
                          <div
                            style={{marginLeft: '5px', width: 'fit-content', padding: '10px',}}
                            className="button-btn"
                            onClick={async () => {
                              await this.setState({loading: true});
                              window._preLogin = preLogin;
                              window._tempGuestPhone = this.state.tempGuestPhone;
                              await this.setState({loading: false});
                              window._state = this.state;
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
                              let exists = this.state.siteGuests.filter(g => !!g.email && g.email.toLowerCase().trim() === (this.state.tempGuestEmail || '').toLowerCase().trim())[0];
                              if (!!exists) {
                                toastrs.show('error', 'Email already exist!');
                                return;
                              }

                              if (!!exists || !(this.state.tempGuestEmail || '').trim().length || !(this.state.tempGuestPassword || '').trim().length) {
                                return
                              } else {
                                this.state.siteGuests.push({
                                  email: this.state.tempGuestEmail.toLowerCase().trim(),
                                  password: this.state.tempGuestPassword?.length > 0 ? this.state.tempGuestPassword.trim() : null,
                                })
                                this.setState({
                                  tempGuestEmail: '',
                                  tempGuestPassword: '',
                                  refreshKey: Date.now(),
                                })
                                toastrs.show('success', "Added.")
                              }
                            }}
                          >
                            <span>{'ADD NEW MASTER ACCOUNT'}</span>
                          </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                        }}>
                          {this.state.siteGuests.map((wodIt, wodIdx) => {
                            return (
                              <div
                                key={wodIt.email}
                                style={{color: 'rgb(51, 51, 51)', fontSize: '85%', overflow: 'hidden', padding: '3px 6px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', backgroundColor: 'rgb(230, 230, 230)', borderRadius: '2px', display: 'flex', margin: '2px', minWidth: '0px', boxSizing: 'border-box', width: 'fit-content', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <span>{wodIt.email}</span>
                                <svg
                                  onClick={() => {
                                    if (this.state.siteGuests[wodIdx].email === wodIt.email) {
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group ml-10" style={{marginTop: '15px'}}>
            <div
              className="col-md-12 input-wrap has-feedback has-success"
              style={{display: 'flex', flexDirection: 'row',}}
            >
              <div
                style={{marginLeft: '0px', margin: 'unset'}}
                className="button-btn w-80"
                onClick={async () => {
                  if (!this.state.vendorName || !this.state.vendorType || !this.state.vendorCompanyName) {
                    if (!this.state.vendorName) {
                      this.setState({errorVendorName: "Vendor name is required!"});
                    }
                    if (!this.state.vendorType) {
                      this.setState({errorVendorType: "Vendor type is required!"});
                    }
                    if (!this.state.vendorCompanyName) {
                      this.setState({errorVendorType: "Vendor company name is required!"});
                    }
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

                  const vendor = {
                    id: this.state.displayValue?.id,
                    name: this.state.vendorName,
                    type: this.state.vendorType.value,
                    label: this.state.vendorLabel,
                    companyName: this.state.vendorCompanyName,
                  }
                  const dmsAccDtos = this.state.siteGuests

                  const rp = await saveOrUpdateVendorAndUser({vendor: vendor, dmsAccDtos: dmsAccDtos});

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
                style={{marginLeft: '5px'}}
                className="button-btn w-80"
                onClick={() => {
                  this.props.onClose && this.props.onClose();
                }}
              >
                <span>{'CANCEL'}</span>
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

export default withNamespaces('common')(Homepage);
