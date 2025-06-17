import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';

import { PublicFooter } from '@app/components/Footer/PublicFooter';
import { PublicHeader } from '@app/components/Header/PublicHeader';
import { ProgressLoading } from '@app/components/Common';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { GoogleMap, Marker, InfoWindow, withGoogleMap } from "react-google-maps"

import { AppointmentTime } from '@app/components/Common/AppointmentTime';

import 'moment-timezone';
import { saveSetting, deleteSetting, getSettings } from '@app/api/log';
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
  :global(.page-content) {
    padding: 0px;
    padding: 0px;
    height: 101%;
    background: #f3f3f4;
  }
  .dashboard {
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
    th {
        border: none !important;
    }
    :global(.box-setting) {
      @media(max-width: 800px) {
        width: 85% !important;
      }
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
    :global(.btn-item) {
        background-color: #042ee1;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        border-width: 5px;
        border-style: thin;
        border-radius: 5px;
        border-color: #042ee1;
        font-weight: 400;
        cursor: pointer;
        height: 30px;
        width: 150px;
    }
    :global(.btn-item:hover) {
        background-color: #2f077c;
        color: #f9f32e;
    }
    :global(.btn-item-disabled) {
        background-color: #848899;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        border-width: 5px;
        border-style: thin;
        border-radius: 5px;
        border-color: #042ee1;
        font-weight: 400;
        cursor: pointer;
        height: 30px;
        width: 150px;
    }
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  constructor(props) {
    super(props);
    this.state.setFormPosition = "none";
    this.state.buttonHide = "none";
    this.state.o = {};
    this.state.keyErrorMessage = '';
    this.state.valueErrorMessage = '';
    this.state.address = {};
    this.state.descriptionErrorMessage = '';
    this.state.nameErrorMessage = '';
    this.state.levelErrorMessage = '';
    this.state.typeErrorMessage = '';
    this.state.hasTenantErrorMessage = '';
    this.state.addressDisplayNameErrorMessage = '';
    this.state.addressBlockErrorMessage = '';
    this.state.addressCountryErrorMessage = '';
    this.state.addressCityErrorMessage = '';
    this.state.addressTownErrorMessage = '';
    this.state.addressStreetErrorMessage = '';
    this.state.addressPostalCodeErrorMessage = '';
    this.state.hiddenInsert = '';
    this.state.hiddenUpdate = '';
  }
  static getInitialProps = async (args) => {
    let { query: { q, page, }, asPath, req, initialState: {} } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      pageNumber: pageNumber,
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };
    let rp = {};

    try {
      rp = await getSettings(params, req);
      rp = rp?.response || {};
      rp.results = rp.results || [];
    } catch(err) {
      console.info(err)
    }
    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
      settings: rp.results || [],
      totalRecords: rp.totalRows || 0,
      totalPages: Math.floor(((rp.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.totalRows || 0) + 9) / 10),
    };
  }
  state = {
    ...this.props,
  };
  componentDidMount() {
    this.setState({mapKey: Date.now()})
  }

  checkInput = () => {
    let count = 0;

    if (this.state.o.key == '' || this.state.o.key == undefined) {
      this.setState({keyErrorMessage: 'Key cannot be empty!'});
      count += 1;
    } else {
      this.setState({keyErrorMessage: ''});
    }
    if (this.state.o.value == '' || this.state.o.value == undefined) {
      this.setState({valueErrorMessage: 'Value cannot be empty!'});
      count += 1;
    } else {
      this.setState({valueErrorMessage: ''});
    }

    console.log(count);
    return count;
  }
  render() {
    const { t } = this.props;
    this.files = this.files || [];

    return (
      <TotPage title={'Setting List'}>
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
                position: 'relative',
              }}
            >
              <div style={{padding: '15px', borderBottom: '1px solid #ddd', paddingTop: '20px', paddingBottom: '20px', display: "flex", flexDirection: "row", alignItems: "center"}}>
                <h5 style={{color: '#111', fontSize: '16px', flex: "1"}}>Setting List</h5>
                <div style = {{marginLeft: '15px', display: 'flex', flexDirection: 'column', display: 'none',}}>
                  <span style={{marginBottom: '10px',}}>QR code of BPL</span>
                  <input
                    type = 'file'
                    placeholder={'mac address qr code image'}
                    onChange = {(event) => {
                      this.file1 = event.target.files[0]
                    }}
                  >
                  </input>
                </div>
                <div style = {{display: 'flex', flexDirection: 'column', display: 'none',}}>
                  <span style={{marginBottom: '10px',}}>QR code of Raspi</span>
                  <input
                    type = 'file'
                    placeholder={'mac address qr code image'}
                    onChange = {(event) => {
                      this.file2 = event.target.files[0]
                    }}
                  >
                  </input>
                </div>
                <div style = {{cursor: 'pointer', width: '50px', height: '50px', border: '1px solid #007bff', backgroundColor: '#007bff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  display: 'none',
                }}>
                  <i onClick={() => {
                    if (!this.file1 && !this.file2) {
                      alert('Please select file')
                      return;
                    }
                    var formData = new FormData();
                    if (this.file1) {
                      formData.append('files', this.file1);
                    }
                    if (this.file2) {
                      formData.append('files', this.file2);
                    }

                    fetch('/api/qr-scan-upload', { // Your POST endpoint
                      method: 'POST',
                      body: formData // This is your file object
                    }).then((rp) => {
                      return rp.json()
                    }).then((rp) => {
                      if (rp.success) {
                        window.location.href = window.location.href;
                      } else {
                        alert(rp.message)
                      }
                    }).catch(error => {
                      alert(error.message)
                    });
                  }}
                     className = {'fa fa-upload'} style = {{color: '#ffffff', fontSize: '30px'}}></i>
                </div>
                <div
                  className="button-btn w-100 mr-10"
                  onClick = {() => {
                    if (this.state.setFormPosition == "none") {
                      this.setState({o: {}, clearKey: Date.now()},
                        () => {
                          this.setState({ nameErrorMessage: '', buildingIdErrorMessage: '',
                              displayNameErrorMessage: '', hasTenantErrorMessage: '',
                            },
                            () => {
                              this.setState({hiddenInsert: 'flex', hiddenUpdate: 'none', setFormPosition: 'flex'});
                            }
                          );
                        }
                      )
                    }
                  }}
                >
                  <span>INSERT</span>
                </div>
                <div
                  className="button-btn w-100"
                  onClick = {() => {
                    window.location.href = window.location.href;
                  }}
                >
                  <span>REFRESH</span>
                </div>

              </div>
              <div style={{display: 'flex', flexDirection: 'row', background: '#fff', minHeight: '100px',}} className='doctor-list'>
                <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0', width: '100%',}}>
                  <table className='table'>
                    <thead className="thead-dark">
                    <tr>
                      <th style={{backgroundColor: '#fff', color: '#111', fontWeight: '500', fontSize: '16px', width: '80px',whiteSpace: 'nowrap', maxWidth: '80px', textAlign: 'left',}} scope="col">Key</th>
                      <th style={{backgroundColor: '#fff', color: '#111', fontWeight: '500', fontSize: '16px', width: '80px',whiteSpace: 'nowrap', textAlign: 'left',}} scope="col">Value</th>
                      <th style={{backgroundColor: '#fff', color: '#111', fontWeight: '500', fontSize: '16px', width: '80px', maxWidth: '80px', whiteSpace: 'nowrap',textAlign: 'center',}} scope="col">
                        <div style={{width: '100%', paddingRight: '15px', textAlign: 'right'}}>
                          Action
                        </div>
                      </th>
                    </tr>
                    </thead>

                    <tbody>
                    {(this.state.settings || [])
                      .map((it, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ maxWidth: '150px', textAlign: 'left',}}>
                              <span>{it.key}</span>
                            </td>
                            <td style={{ maxWidth: '150px', textAlign: 'left',}}>
                              <span>{it.value}</span>
                            </td>
                            <td style={{textAlign: 'right', cursor: 'pointer', width: '80px', maxWidth: '80px', }}>
                              <div style = {{display: 'flex', flexDirection: 'row', padding: '10px', justifyContent: 'flex-end', alignItems: 'center',}}>
                                <div
                                  className="button-btn w-100 mr-10"
                                  onClick = {async () => {
                                    this.setState({setFormPosition: 'flex', hiddenInsert: 'none', hiddenUpdate: 'flex'},
                                      () => {
                                        it.hasTenant == true ? this.state.o.hasTenant = true : false;
                                        this.setState({});
                                        it.modifiedDate = null;
                                        it.createdDate = null;
                                        it.buildingId = it.building ? it.building.id : undefined;
                                        this.setState({o: it, address: it.address},
                                          () => {
                                            console.log(this.state.o);
                                          }
                                        );

                                      });
                                  }}
                                >
                                  <span>UPDATE</span>
                                </div>
                                <div
                                  className="button-btn w-100"
                                  onClick = { async () => {
                                    Swal.fire({
                                      html: `
                                                                                  <p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this row: </p>
                                                                                  <p>${it.key}  ?</p>
                                                                              `,
                                      icon: 'question',
                                      showCancelButton: true,
                                      confirmButtonText: 'Yes',
                                      cancelButtonText: 'No'
                                    }).then(async (result) => {
                                      if (result.value) {
                                        let response = await deleteSetting(it);
                                        if (response.success == true) {
                                          Swal.fire(
                                            'Deleted!',
                                            'Your floor level has been deleted.',
                                            'success'
                                          )
                                            .then(() => {
                                              window.location.reload(false);
                                            })
                                        } else {
                                          Swal.fire(
                                            'Error!',
                                            response.message || response.errorDescription || '',
                                            'error'
                                          )
                                        }
                                      }
                                    })
                                  }}
                                >
                                  <span>DELETE</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
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
                    <div className="col-sm-12 col-md-7 pagination" style={{justifyContent: 'flex-end', marginBottom: '25px'}}>
                      { this.state.totalRecords > 1 && this.state.totalPages >= 2 &&
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
                        styleItemActive={{backgroundColor: 'green', color: '#ffffff'}}
                      />
                      }
                    </div>
                  </div>

                </div>
              </div>
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
        <div style = {{display: this.state.setFormPosition, justifyContent: 'center', alignItems: 'center'}}>
          <Form key = {this.state.clearKey}
                style = {{
                  width: '800px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'fixed',
                  top: '70px',
                  bottom: '70px',
                  overflow: 'auto',
                  border: '1px solid',
                  backgroundColor: 'rgb(255, 255, 255)',
                  padding: '10px 25px 25px 35px',
                  color: 'darkblue',
                  borderColor: '#e1e1e1',
                  boxShadow: '2px 3px 7px 3px rgb(0 0 0 / 12%)',
                  fontFamily: 'Roboto bold',
                  zIndex: '100',
                }}
                className="box-setting"
          >
            <h4 style = {{display: this.state.hiddenInsert, justifyContent: 'center', textAlign: 'center', fontSize: '30px', fontFamily: 'bold'}}>Insert Setting</h4>
            <h4 style = {{display: this.state.hiddenUpdate, justifyContent: 'center', textAlign: 'center', fontSize: '30px', fontFamily: 'bold'}}>Update Setting</h4>
            <form>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label for="exampleFormControlInput1">Key</label>
                    <input type="text" maxlength="255" className="form-control" id="exampleFormControlInput1" placeholder="Key"
                           value = {this.state.o.key}
                           onChange = {(event) => {
                             this.state.o.key = event.target.value;
                             this.setState({});
                           }}
                    ></input>
                    <span style = {{display: this.state.keyErrorMessage != '' ? 'flex' : 'none', color: 'red', fontSize: '14px'}}>{this.state.keyErrorMessage}</span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="validationCustom01">Value</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder="Value" maxlength="255"
                           value = {this.state.o.value}
                           onChange = {(event) => {
                             this.state.o.value = event.target.value;
                             this.setState({});
                           }}
                    ></input>
                    <span style = {{display: this.state.valueErrorMessage != '' ? 'flex' : 'none', color: 'red', fontSize: '14px'}}>{this.state.valueErrorMessage}</span>
                  </div>
                </div>
              </div>
            </form>
            <div style={{display: 'flex'}} className="flex-row">
              <div
                className="button-btn mr-10"
                onClick = {async () => {
                  if (this.checkInput() == 0) {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: 'This setting will be applied to database',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Yes',
                      cancelButtonText: 'No'
                    }).then(async (result) => {
                      if (result.value) {
                        this.state.o.building = this.state.o.building || {};
                        this.state.o.building.id = this.state.o.buildingId;
                        let response = await saveSetting(this.state.o);
                        if (response.success == true) {
                          Swal.fire(
                            'Done!',
                            'Your database has been changed!',
                            'success'
                          )
                            .then(() => {
                              this.setState({setFormPosition: 'none'});
                              window.location.reload(false);
                            })
                        } else {
                          Swal.fire(
                            'Error!',
                            response.message || response.errorDescription || '',
                            'error'
                          )
                        }
                      }
                    })
                  } else {
                    Swal.fire('Oops...', 'Something went wrong!', 'error');
                  }
                }}
              >
                SUBMIT
              </div>
              <div
                className="button-btn"
                onClick = {() => {
                  this.setState({setFormPosition: "none", o: {}, address: {}});
                }}
              >
                CANCEL
              </div>
            </div>
          </Form>
        </div>
      </TotPage>
    );
  }
}

export default withNamespaces('common')(Homepage);