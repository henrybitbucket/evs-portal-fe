import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, SelectCustom } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import Form from 'react-bootstrap/Form';
import { ProgressLoading } from '@app/components/Common';
import 'moment-timezone';


import {
  getSettings,
} from '@app/api/log';
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
        display: flex !important;
        flex-direction: column !important;
    }
    :global(.p-card) {
        display: flex !important;
        flex-direction: column !important;
        flex: 1 !important;
    }
  :global(.form-check-input) {
    margin-left: 0px !important;
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

    :global(.tree-view_arrow) {
        -moz-transition: all 0.1s;
        -o-transition: all 0.1s;
        -ms-transition: all 0.1s;
        -webkit-transition: all 0.1s;
        transition: all 0.1s;
    }

    :global(.tree-view_arrow-empty) {
      color: yellow;
    }

    :global(.tree-view_arrow) {
        width: 15px !important;
    }

    :global(.tree-view_item > span > i) {
        margin-right: 5px !important;

    }
    :global(.tree-view_item) {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        flex-wrap: nowrap;
        white-space: nowrap;

    }
    :global(.tree-view_children) {
        margin-top: 5px !important;
        margin-left: 20px !important;
    }

    :global(.tree-view_arrow:after) {
        font-size: 22px;
    }
    :global(.btn-link-app) {
        background-color: rgb(38, 166, 154);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 2.5px;
        font-weight: 400;
        cursor: pointer;
        width: 180px;
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

    :global(.input-text) {
        display: block;
        width: 100%;
        height: calc(1.5385em + 0.875rem + 2px);
        padding: 0.4375rem 0.875rem;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5385;
        color: #333;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ddd;
        border-radius: 0.1875rem;
        box-shadow: 0 0 0 0 transparent;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        outline: none;
    }

    :global(.p-card-) {
        background-color: unset !important;
        background-clip: unset !important;
        box-shadow: unset !important;
        border: unset !important;
    }
    :global(.p-card1) {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.1875rem;
        margin-bottom: 1.25rem;
        box-shadow: 0 1px 2px rgba(0,0,0,.05);
    }

    :global(.group-brand-logo) {
        display: none !important;
    }

    :global(.btn-item) {
      background-color: #6a7dcc;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      border-width: 5px;
      border-style: thin;
      border-radius: 5px;
      border-color: #6a7dcc;
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
// chrome://flags/#block-insecure-private-network-requests
class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  constructor(props) {
    super(props);
    this.state.onHide = 'flex';
    this.state.permitApps = '';
    this.state.loading = true;
    this.state.setFormPosition = "none";
    this.state.permitApp = '';
    this.state.udpateData = { mobile: '', email: '', pic_url: '', work_area_id: '' };
    this.state.projects = [];
    this.state.applicationPurposes = [];
    this.state.applicationStatuses = [];
    this.state.workAreas = [];
    this.state.applicantTypes = [];
    this.state.applicantIDTypes = [];
    this.state.selected = '';
    this.state.keyErrorMessage = '';
    this.state.numberError = '';
    this.state.cHost = '';
  }
  static getInitialProps = async (args) => {
    let { query: { page, id }, asPath, req, initialState: { } } = args;

    let pageNumber = Number(page) || 1;

    // console.info('args', args);
    console.info('id', id);
    let params = {
      pageNumber: pageNumber,
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };
    let rp = {};

  let params2 = {
      pageNumber: 1,
      limit: 100000,
      offset: 0,
  };

    let pageProps = {
      // permitApps: rp.results || [],
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: false,
      loginRequire: false,
      // totalRecords: rp.totalRows || 0,
      // totalPages: Math.floor(((rp.totalRows || 0) + 9) / 10),
      // pageIndex: pageNumber,
      // pageSize: Math.floor(((rp.totalRows || 0) + 9) / 10),
      useTemplate: false,
      type: 'Appliance',
      id,
    };
    // console.info('pageProps test', pageProps);
    return pageProps;
  }
  state = {
    ...this.props,
  };

  getPermitApps = async (id) => {
    let data = {
      credential: {
        username: "string",
        user_id: "string"
      },
      offset: 0,
      limit: 1,
      options: {
        id: id || this.state.id
      }
    }
    let rp = await fetch((this.state.cHost || '') + "/api/permit_applications", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    rp = await rp.json();
    if (rp.results) {
      this.setState({ permitApps: rp.results, loading: false });
    } else {
      this.setState({ permitApps: [], loading: false });
    }
    console.info('gateway: ', this.state.permitApps)
  }

  getSetting = async () => {
    let params = {
        pageNumber: 1,
        limit: 100000,
        offset: 0,
    };
    let rp = {};

    try {
        rp = await getSettings(params);
        rp = rp?.response || {};
        rp.results = rp.results || [];
        ////console.log("rp.results setting: ", rp.results)
        let applicantIDType = '';
        if (rp.results) {
          applicantIDType = rp.results.filter(x => x.key ==='C_APP_HOST');
        }
        ////console.log("applicantIDType", applicantIDType);
        this.setState({cHost : applicantIDType[0]?.value || ''});
        let host = applicantIDType[0]?.value || '';
        if(applicantIDType) {
          this.getPermitApps();
          this.loadMetaData();
        }
    } catch(err) {
        console.info(err)
    }
  }

  getPermitApp = async (it) => {
    let data = {
      credential: {
        username: "string",
        user_id: "string"
      },
      offset: 0,
      limit: 1,
      options: {
        id: it.applicant_id || ''
      }
    }
    let rp = await fetch(this.state.cHost+"/api/permit_applicants", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    rp = await rp.json();
    if (rp.results) {
      this.setState({ permitApp: rp.results[0], loading: false, updateData: { mobile: rp.results[0].mobile, email: rp.results[0].email, pic_url: rp.results[0].pic_url, work_area_id: it.work_area_id } });
    } else {
      this.setState({ permitApp: [], loading: false });
    }
    //console.info('gateway: ', this.state.permitApps)
  }

  loadMetaData = async () => {
    let rpProject = await fetch((this.state.cHost || '') + "/api/get_project", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    let rpStatus = await fetch((this.state.cHost || '') + "/api/get_application_status", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    let rpWorkArea = await fetch((this.state.cHost || '') + "/api/get_work_area", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    let rpApplicantType = await fetch((this.state.cHost || '') + "/api/get_applicant_type", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    let rpRefIDType = await fetch((this.state.cHost || '') + "/api/get_applicant_id_ref_type", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });
    let rpPurpos = await fetch((this.state.cHost || '') + "/api/get_application_purpose", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setState({
      projects: await rpProject.json() || [],
      applicationPurposes: await rpPurpos.json() || [],
      applicationStatuses: await rpStatus.json() || [],
      workAreas: await rpWorkArea.json() || [],
      applicantTypes: await rpApplicantType.json() || [],
      applicantIDTypes: await rpRefIDType.json() || []
    });
  }

  componentDidMount = async () => {
    this.setState({ mapKey: Date.now() });
    try {
      await this.getSetting();
    } catch(err) {
    }

    try {
      if(this.state.cHost) {

        let data = {
          credential: {
            username: "string",
            user_id: "string"
          },
          offset: params?.offset,
          limit: params?.offset,
          options: {
            id: this.state.id || ""
          }
        }
        rp = await fetch(this.state.cHost + "/api/permit_applications", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        rp = await rp.json();

        this.setState({
          permitApps: rp.results || [],
          totalRecords: rp.totalRows || 0,
          totalPages: Math.floor(((rp.totalRows || 0) + 9) / 10),
          pageIndex: pageNumber,
          pageSize: Math.floor(((rp.totalRows || 0) + 9) / 10),
        })
      }
    } catch(err) {

    }
  }

  mapDataProjects = (id) => {
    let projectName = '';
    if (this.state.projects) {
      projectName = this.state.projects.filter(x => x.id === id);
    }
    return projectName[0]?.name || '';
  }

  mapDataApplicationPurposes = (id) => {
    let applicationPurpose = '';
    if (this.state.applicationPurposes) {
      applicationPurpose = this.state.applicationPurposes.filter(x => x.id === id);
    }
    return applicationPurpose[0]?.name || '';
  }

  mapDataApplicationStatuses = (id) => {
    let applicationStatuse = '';
    if (this.state.applicationStatuses) {
      applicationStatuse = this.state.applicationStatuses.filter(x => x.id === id);
    }
    return applicationStatuse[0]?.name || '';
  }

  mapDataWorkAreas = (id) => {
    let workArea = '';
    if (this.state.workAreas) {
      workArea = this.state.workAreas.filter(x => x.id === id);
    }
    return workArea[0]?.name || '';
  }

  mapDataApplicantTypes = (id) => {
    let applicantType = '';
    if (this.state.applicantTypes) {
      applicantType = this.state.applicantTypes.filter(x => x.id === id);
    }
    return applicantType[0]?.name || '';
  }

  mapDataApplicantIDTypes = (id) => {
    let applicantIDType = '';
    if (this.state.applicantIDTypes) {
      applicantIDType = this.state.applicantIDTypes.filter(x => x.id === id);
    }
    return applicantIDType[0]?.name || '';
  }

  checkInput = () => {
    let count = 0;
    if (this.state.updateData?.mobile === '' || this.state.updateData?.mobile === undefined) {
      this.setState({ keyErrorMessage: 'mobile cannot be empty!' });
      count += 1;
      return count;
    } else {
      if (!/^\d+$/.test(this.state.updateData?.mobile)) {
        this.setState({ keyErrorMessage: 'mobile is number' });
        count += 1;
        return count;
      }
      this.setState({ keyErrorMessage: '' });
    }
    if (this.state.updateData?.pic_url === '' || this.state.updateData?.pic_url === undefined) {
      this.setState({ valueErrorMessage: 'pic_url cannot be empty!' });
      count += 1;
      return count;
    } else {
      this.setState({ valueErrorMessage: '' });
    }
    if (this.state.updateData?.email === '' || this.state.updateData?.email === undefined) {
      this.setState({ valueErrorMessage: 'email cannot be empty!' });
      count += 1;
      return count;
    } else {
      if (!this.state.updateData?.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.setState({ keyErrorMessage: 'Email wrong format!' });
        count += 1;
        return count;
      }
      this.setState({ valueErrorMessage: '' });
    }
    if (this.state.updateData?.work_area_id === '' || this.state.updateData?.work_area_id === undefined) {
      this.setState({ valueErrorMessage: 'work area cannot be empty!' });
      count += 1;
      return count;
    } else {
      this.setState({ valueErrorMessage: '' });
    }

    //console.log(count);
    this.setState({ numberError: count });
    return count;
  }

  render() {
    // //console.log("this.state.totalRecords :", this.state.totalRecords);
    // //console.log("this.state.totalPages :", this.state.totalPages);
    const { t } = this.props;
    this.files = this.files || [];
    return (
      <>
        <TotPage title={'Provisioning Portal'}>
          <div className="dashboard">
            <style jsx>{styles}</style>
            <PageContent>
              <div
                style={{
                  background: 'transparent',
                  minHeight: '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  marginLeft: '15px',
                  marginRight: '15px',
                }}
              >
                <div style={{ marginTop: '15px', }}>
                  <div className='p-card1' style={{ padding: '15px', }}></div>
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '200px', maxWidth: '200px', textAlign: 'center' }} scope="col">ID</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '200px', maxWidth: '200px', textAlign: 'center' }} scope="col">Applicant ID</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '280px', maxWidth: '280px', textAlign: 'center' }} scope="col">Display Name</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '150px', maxWidth: '150px', textAlign: 'center' }} scope="col">Type</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '150px', maxWidth: '150px', textAlign: 'center' }} scope="col">Purpose</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '250px', maxWidth: '250px', textAlign: 'center' }} scope="col">Start Time</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '250px', maxWidth: '250px', textAlign: 'center' }} scope="col">End Time</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '150px', maxWidth: '150px', textAlign: 'center' }} scope="col">Status</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '150px', maxWidth: '150px', textAlign: 'center' }} scope="col">Work Area</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '150px', maxWidth: '150px', textAlign: 'center' }} scope="col">Project</th>
                        <th style={{ backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '300px', maxWidth: '300px', textAlign: 'center' }} scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {(this.state.permitApps || []).map((it, index) => {
                        return (
                          <tr key={index}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: this.state?.selectedRow === index ? '#d8d8d8' : '#fff',
                              color: '#000000',
                            }}
                          >
                            <td style={{ textAlign: 'center' }}>
                              <span>{it.id}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{it.applicant_id}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{it.application_displayname}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{this.mapDataApplicantTypes(it.applicant_type_id)}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{this.mapDataApplicationPurposes(it.application_purpose_id)}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{it.permit_start_time}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{it.permit_end_time}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{this.mapDataApplicationStatuses(it.application_status_id)}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{this.mapDataWorkAreas(it.work_area_id)}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span>{this.mapDataProjects(it.project_id)}</span>
                            </td>
                            <td style={{ textAlign: 'center', display: 'flex' }}>
                              <button style={{ color: 'black', backgroundColor: '#FFFF8A', width: '100%' }}
                                onClick={async () => { this.setState({ setFormPosition: 'flex', loading: 'true', selected: it }); this.getPermitApp(it) }}>Update</button>
                              {(it.application_status_id === '1' || it.application_status_id === 1) && (
                                <><button style={{ color: 'black', backgroundColor: '#5CFF5C', width: '100%', marginLeft: '10px' }} onClick={async () => {
                                  let result = await Swal.fire({
                                    html: `
                                          <p style='text-align: center; font-size: 14px;'>
                                              Are you sure you want to Approval: '${it.application_displayname}' ?
                                          </p>
                                      `,
                                    icon: 'question',
                                    confirmButtonText: 'OK',
                                    cancelButtonText: 'Cancel',
                                    showCancelButton: true,
                                  })
                                  if (result && result.isConfirmed) {
                                    let params = {
                                      credential: {
                                        username: "string",
                                        user_id: "string"
                                      },
                                      request: {
                                        id: it.id,
                                        application_status_id: "4"
                                      }
                                    };
                                    let rp = await fetch(this.state.cHost + "/api/update_application_status", {
                                      method: "POST", // *GET, POST, PUT, DELETE, etc.
                                      mode: "cors", // no-cors, *cors, same-origin
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify(params), // body data type must match "Content-Type" header
                                    });
                                    rp = await rp.json();
                                    if (rp.result === 'successful') {
                                      Swal.fire({
                                        html: `
                                              <p style='text-align: center; font-size: 14px;'>Update successfully!</p>
                                          `,
                                        icon: 'success',
                                        confirmButtonText: 'OK',
                                      });
                                    } else {
                                      Swal.fire({
                                        html: `
                                                  <p style='text-align: center; font-size: 14px;'>${rp.errorDescription}</p>
                                              `,
                                        icon: 'error',
                                        confirmButtonText: 'OK',
                                      })
                                    }
                                    this.getPermitApps()
                                  }
                                }} > Approval </button>
                                  <button style={{ marginLeft: '10px', color: 'white', backgroundColor: '#FF5C5C', width: '100%' }} onClick={async () => {
                                    let result = await Swal.fire({
                                      html: `
                                          <p style='text-align: center; font-size: 14px;'>
                                              Are you sure you want to Reject: '${it.application_displayname}' ?
                                          </p>
                                      `,
                                      icon: 'question',
                                      confirmButtonText: 'OK',
                                      cancelButtonText: 'Cancel',
                                      showCancelButton: true,
                                    })
                                    if (result && result.isConfirmed) {
                                      let params = {
                                        credential: {
                                          username: "string",
                                          user_id: "string"
                                        },
                                        request: {
                                          id: it.id,
                                          application_status_id: "5"
                                        }
                                      };
                                      let rp = await fetch(this.state.cHost + "/api/update_application_status", {
                                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                                        mode: "cors", // no-cors, *cors, same-origin
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(params), // body data type must match "Content-Type" header
                                      });
                                      rp = await rp.json();
                                      if (rp.result === 'successful') {
                                        Swal.fire({
                                          html: `
                                              <p style='text-align: center; font-size: 14px;'>Update successfully!</p>
                                          `,
                                          icon: 'success',
                                          confirmButtonText: 'OK',
                                        });
                                      } else {
                                        Swal.fire({
                                          html: `
                                                  <p style='text-align: center; font-size: 14px;'>${rp.errorDescription}</p>
                                              `,
                                          icon: 'error',
                                          confirmButtonText: 'OK',
                                        })
                                      }
                                      this.getPermitApps()
                                    }
                                  }} >Reject</button></>
                              )}
                            </td>
                          </tr>
                        );
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
                    <div className="col-sm-12 col-md-7 pagination" style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                      {this.state.totalRecords > 1 && this.state.totalPages >= 2 &&
                        <Pagination
                          href={this.props.asPath.replace(/\?.*/g, '')}
                          totalRecords={this.state.totalRecords}
                          totalPages={this.state.totalPages}
                          onPageChanged={(query) => {

                            let pathname = window.location.pathname;
                            const search = window.location.search
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
                      }
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

              <div style={{ display: this.state.setFormPosition, justifyContent: 'center', alignItems: 'center' }}>
                <Form key={this.state.clearKey}
                  style={{
                    height: '60%',
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
                  <h4 style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', fontSize: '30px', fontFamily: 'bold', marginBottom: '20px' }}>Update Applicant</h4>
                  <form>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6 mb-3">
                          <label for="exampleFormControlInput1">ID</label>
                          <input type="text" maxlength="255" className="form-control" id="exampleFormControlInput1" placeholder=""
                            value={this.state.permitApp.id || ''} disabled
                          ></input>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom01">FULL NAME</label>
                          <input type="text" className="form-control" id="validationCustom01" placeholder="" maxlength="255"
                            value={this.state.permitApp.fullname || ''} disabled 
                          ></input> 
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="exampleFormControlInput1">REF ID</label>
                          <input type="text" maxlength="255" className="form-control" id="exampleFormControlInput1" placeholder=""
                            value={this.state.permitApp.id_ref || ''} disabled
                          ></input>
                        </div>
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="validationCustom01">REF TYPE</label>
                          <input type="text" className="form-control" id="validationCustom01" placeholder="" maxlength="255"
                            value={this.mapDataApplicantIDTypes(this.state.permitApp.ref_id_type_id) || ''} disabled
                          ></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="exampleFormControlInput1">APPLICANT TYPE</label>
                          <input type="text" maxlength="255" className="form-control" id="exampleFormControlInput1" placeholder=""
                            value={this.mapDataApplicantTypes(this.state.permitApp.applicant_type_id) || ''} disabled
                          ></input>
                        </div>
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="validationCustom01">USER ID</label>
                          <input type="text" className="form-control" id="validationCustom01" placeholder="" maxlength="255"
                            value={this.state.permitApp.user_id || ''} disabled
                          ></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="exampleFormControlInput1">MOBILE</label>
                          <input type="text" maxlength="255" className="form-control" id="exampleFormControlInput1" placeholder=""
                            value={this.state.updateData?.mobile || ''}
                            onChange={(event) => {
                              this.setState({ updateData: { ...this.state.updateData, mobile: event.target.value } });
                            }}
                          ></input>
                          <span style={{ display: this.state.keyErrorMessage != '' && this.state.keyErrorMessage === 'mobile cannot be empty!' || this.state.keyErrorMessage === 'mobile is number lower 11 character!' ? 'flex' : 'none', color: 'red', fontSize: '14px' }}>{this.state.keyErrorMessage}</span>
                        </div>
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="validationCustom01">EMAIL</label>
                          <input type="text" className="form-control" id="validationCustom01" placeholder="" maxlength="255"
                            value={this.state.updateData?.email || ''}
                            onChange={(event) => {
                              this.setState({ updateData: { ...this.state.updateData, email: event.target.value } });
                            }}
                          ></input>
                          <span style={{ display: this.state.valueErrorMessage != '' && this.state.keyErrorMessage === 'email cannot be empty!' && this.state.keyErrorMessage === 'Email wrong format!' ? 'flex' : 'none', color: 'red', fontSize: '14px' }}>{this.state.valueErrorMessage}</span>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="exampleFormControlInput1">PIC URL</label>
                          <input type="text" maxlength="255" className="form-control" id="exampleFormControlInput1" placeholder=""
                            value={this.state.updateData?.pic_url || ''}
                            onChange={(event) => {
                              this.setState({ updateData: { ...this.state.updateData, pic_url: event.target.value } });
                            }}
                          ></input>
                          <span style={{ display: this.state.keyErrorMessage != '' && this.state.keyErrorMessage === 'pic_url cannot be empty!' ? 'flex' : 'none', color: 'red', fontSize: '14px' }}>{this.state.keyErrorMessage}</span>
                        </div>
                        <div className="col-md-6 mb-3 mt-15">
                          <label for="validationCustom01">WORK AREA</label>
                          <select
                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                            className="select-installer-user"
                            value={this.state.updateData?.work_area_id ? this.state.updateData?.work_area_id : ''}
                            onChange={(event) => {
                              this.setState({ updateData: { ...this.state.updateData, work_area_id: event.target.value } });
                            }}
                          >
                            {this.state.workAreas.map(rdg => (
                              <option key={rdg.id} value={rdg.id}>{rdg.name}</option>
                            ))}
                          </select>
                          <span style={{ display: this.state.valueErrorMessage != '' && this.state.valueErrorMessage === 'work area cannot be empty!' ? 'flex' : 'none', color: 'red', fontSize: '14px' }}>{this.state.valueErrorMessage}</span>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div style={{ display: 'flex', justifyContent: 'center' }} className="flex-row">
                    <div
                      className="btn-item mr-10"
                      onClick={async () => {
                        //console.log("event.target.value :", this.state.updateData)
                        if (this.checkInput() == 0) {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: 'This data will be applied to database',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No'
                          }).then(async (result) => {
                            if (result.value) {
                              //console.log("event.target.2 :", this.state.updateData)
                              let params = {
                                credential: {
                                  username: "string",
                                  user_id: "string"
                                },
                                request: {
                                  id: this.state.selected.id || "",
                                  pic_url: this.state.updateData?.pic_url || "",
                                  mobile: this.state.updateData?.mobile ||"",
                                  email: this.state.updateData?.email ||"",
                                  work_area_id: this.state.updateData?.work_area_id ||""
                                }
                              };
                              let rp = await fetch(this.state.cHost + "/api/permit_application", {
                                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                                mode: "cors", // no-cors, *cors, same-origin
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(params), // body data type must match "Content-Type" header
                              });
                              rp = await rp.json();
                              if (rp?.result === 'successful') {
                                Swal.fire(
                                  'Done!',
                                  'Your database has been changed!',
                                  'success'
                                )
                                .then(() => {
                                  this.setState({ setFormPosition: 'none', selected: '' });
                                  window.location.href = window.location.href;
                                })
                              } else {
                                Swal.fire(
                                  'Error!',
                                  rp?.message || rp?.errorDescription || '',
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
                      className="btn-item"
                      onClick={() => {
                        this.setState({ setFormPosition: "none", o: {}, address: {} });
                      }}
                    >
                      CANCEL
                    </div>
                  </div>
                </Form>
              </div>
            </PageContent>
          </div >
        </TotPage >
      </>
    );
  }
}

export default withNamespaces('common')(Homepage);
