import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { getCookie } from '@app/utils/cookie';
import { tokenName } from '@app/utils/public-config';
import {
  editDevice,
  editGroup,
  getAllDevices,
  getBlockOfBuilding,
  getBuilding,
  getBuildingUnits,
  getDeviceFilters,
  getDeviceGroups,
  getFiles,
  getFloorLevels,
  getLastSubmit,
  getMeterLogs,
  getPiClients,
  getPiLogs,
  getProjectTags,
  getRelatedLogs,
  getVendors,
  removeEVSDevice,
  saveDeviceFilters,
  sendCommand,
  sendRLSCommandForDevices,
  unLinkMsn,
  validateLoginPwd,
} from '@app/api/log';
import { Pagination, ProgressLoading, Radio, SelectCustom } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import ReactTooltip from 'react-tooltip';
import { Chart } from 'react-google-charts';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getUserPermissions, getUsers } from '@app/api/user';
import { IoMailUnreadOutline } from 'react-icons/io5';
import DatePicker from "react-datepicker";

const animatedComponents = makeAnimated();
const Swal = require('sweetalert2');

if (typeof window === 'object') {
  window.moment = moment;
}
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

  :global(.btn-panel .button-btn) {
    font-size: 11px;
    height: 35px;
    width: fit-content !important;
    padding-left: 10px;
    padding-right: 10px;
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

  :global(div[class*="-container"].multi-select-address div[class*="-menu"]) {
    // z-index: 3000 !important;
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

    :global(.box-checkbox) {
        @media(max-width: 900px) {
          flex-direction: column !important;
          align-items: flex-start !important;
        }
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
    :global(.add-select-left > div[class*="-control"]) {
        padding-left: 200px;
    }

    .chartWithOverlay {
       position: relative;
       width: 700px;
    }
    .overlay {
       width: 200px;
       height: 200px;
       position: absolute;
       top: 60px;   /* chartArea top  */
       left: 180px; /* chartArea left */
    }
    :global(.selected) {
        background-color: coral;
    }
    :global(.multi-select-cid) {
      // width: 49%;
      font-size: 14px;
      flex: 1;
      padding-left: 5px;
      padding-right: 5px;
    }
    :global(.multi-select-address) {
      width: 100%;
      font-size: 14px;
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
  :global(.box-item) {
    @media(max-width: 900px) {
      flex-direction: column !important;
      align-items: flex-start;
      width: 100%;
    }
  }
   :global(.item) {
    @media(min-width: 900px) {
      width: 25%;
      margin-bottom: 10px;
      >input {
        width: 100% !important;
      }
      padding-left: 5px;
      padding-right: 5px;
    }
    @media(max-width: 900px) {
      width: 100%;
      margin-bottom: 10px;
      >input {
        width: 100% !important;
      }
    }
  }
  :global(.log) {
    @media(min-width: 900px) {
      width: 19%;
      margin-bottom: 10px;
      min-width:  265px;
      >input {
        width: 97% !important;
      }
    }
    @media(max-width: 900px) {
      width: 100%;
      margin-bottom: 10px;
      >input {
        width: 97% !important;
      }
    }
  }
  :global(.box-log) {
    flex-wrap: wrap;
    @media(max-width: 900px) {
      flex-direction: column !important;
      align-items: flex-start !important;
    }
  }
   :global(.box-date) {
    @media(max-width: 900px) {
      flex-direction: column !important;
      >div {
        // width: 97% !important;
        margin-top: 10px;
      }
    }
  }
  :global(.box-to-date) {
    @media(max-width: 900px) {
      margin-left: 0 !important;
      >span {
         width: 82px !important;
      }
    }
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
  :global(.button-btn-disabled) {
    background-color: #848899;
    border: unset;
    outline: unset;
    display: flex;
    border-radius: 5px;
    height: 35px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    color: #FFFFFF;
    width: 150px;
    text-transform: uppercase;
    transition: 0.2s;
  }
  :global(.button-btn) {
    border: unset;
    outline: unset;
    display: flex;
    border-radius: 5px;
    height: 35px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-color: #042ee1;
    font-size: 11px;
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
  :global(.date-picker) {
    outline: unset;
    border-radius: 4px;
    height: 30px;
    width: 180px;
    padding-left: 5px;
    border: 1px solid #00000020;
  }

  :global(.file-input::before) {
    content: 'Choose CSR in zip file...';
    display: inline-block;
    background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 500;
    font-size: 10pt;
    margin-right: 15px;
  }
  :global(.file-input.sn-export::before) {
    content: 'Choose file contains MCU SN...' !important;
  }
  :global(.file-input.meter-export::before) {
    content: 'Choose file contains Meter SN...' !important;
  }
  :global(.file-input::-webkit-file-upload-button) {
    visibility: hidden;
    display: none;
  }
  :global(.file-input:hover::before) {
    border-color: black;
  }
  :global(.file-input:active::before) {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }

  :global(.msisdn-file-input::before) {
    content: 'Choose Telco MSISDN in csv file...';
    display: inline-block;
    background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 500;
    font-size: 10pt;
    margin-right: 15px;
  }
  :global(.msisdn-file-input.sn-export::before) {
    content: 'Choose file contains MCU SN...' !important;
  }
  :global(.msisdn-file-input::-webkit-file-upload-button) {
    visibility: hidden;
    display: none;
  }
  :global(.msisdn-file-input:hover::before) {
    border-color: black;
  }
  :global(.msisdn-file-input:active::before) {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }


  :global(.table-wrap) {
    max-width: 100%;
    min-width: 100%;
    overflow: auto;
    flex: 1;
  }
  :global(.table-th) {
    background: #f2f3ff !important;
    color: #000000 !important;
    font-weight: 500 !important;
    fontSize: 14px !important;
    width: 180px !important;
    maxWidth: 350px !important;
    padding: 10px !important;
    padding-left: 15px !important;
  }
  :global(.table-th-first) {
    background: #f2f3ff !important;
    color: #000000 !important;
    font-weight: 500 !important;
    fontSize: 14px !important;
    width: 50px !important;
    maxWidth: 350px !important;
    padding: 10px !important;
    padding-left: 15px !important;
  }
  :global(.table-td-50) {
    width: 50px !important;
  }
  :global(.table-th-50) {
    width: 50px !important;
  }
  :global(.table-wrap td) {
    vertical-align: middle !important;
  }
  :global(.table thead th) {
    vertical-align: bottom;
    border-bottom: 2px solid #e4eaec !important;
  }
  :global(.btn-text) {
    color: #3e8ef7 !important;
    text-decoration: underline;
    cursor: pointer;
  }
  :global(.btn-text-disabled) {
    color: #919eab !important;
    text-decoration: underline;
    pointer-events: none;
  }
  :global(.w-max) {
    width: max-content !important;
  }
`;

interface IDashboardPageState {

}

const statusList = [
  { value: '', label: 'Select online status...' },
  { value: 'ONLINE', label: 'ONLINE' },
  { value: 'OFFLINE', label: 'OFFLINE' },
];

const mSISDNStatusList = [
  { value: '', label: 'Select MSISDN status...' },
  { value: 'ACTIVE', label: 'ACTIVE' },
  { value: 'PREACTIVE', label: 'PREACTIVE' },
  { value: 'SUSPENDED', label: 'SUSPENDED' },
  { value: 'NA', label: 'NA or Blank' },
  { value: 'DORMANT', label: 'DORMANT' },
  { value: 'TESTREADY', label: 'TESTREADY' },
];

const typeList = [
  { value: '', label: 'Select P2 Couple State...' },
  { value: 'NOT_COUPLED', label: 'NOT COUPLED' },
  { value: 'COUPLED', label: 'COUPLED' },
];

const typeP3List = [
  { value: '', label: 'Select P3 Couple State...' },
  { value: 'NOT_COUPLED', label: 'NOT COUPLED' },
  { value: 'COUPLED', label: 'COUPLED' },
];

const roundDate = (date, type) => {
  date = new Date(date || new Date());
  if (type === 'FROM') {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  }
  if (type === 'TO') {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
  }

  return date;
}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {

  static getInitialProps = async (args) => {
    const {
      query: {
        q,
        page,
        fromDate,
        toDate,
        status,
        mSISDNStatus,
        type,
        typeP3,
        querySn,
        queryMsn,
        queryEsimId,
        queryMsiSdn,
        queryUuid,
        queryGroup,
        queryEnrollmentDate,
        queryCoupledDate,
        queryActivationDate,
        queryDeactivationDate,
        queryMeterDataYes,
        queryMeterDataNo,
        hasLogError,
        queryAllDate,
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
        queryPostalCode,
        queryRemarkMCU,
        queryRemarkMeter,
        queryVendor,
        advancedSearch,
        queryTagTypes,
        queryTags,
      },
      asPath, req, initialState: {},
    } = args;

    if (typeof window === 'object') {
      window._queryTagTypes = queryTagTypes;
      window._queryTags = queryTags;
    }

    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        status: !!status ? status : undefined,
        mSISDNStatus: !!mSISDNStatus ? mSISDNStatus : undefined,
        type: !!type ? type : undefined,
        typeP3: !!typeP3 ? typeP3 : undefined,
        fromDate: !!fromDate ? roundDate(moment(fromDate, 'DD/MM/YYYY'), 'FROM').getTime() : undefined,
        toDate: !!toDate ? roundDate(moment(toDate, 'DD/MM/YYYY'), 'TO').getTime() : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        queryEsimId: !!queryEsimId ? queryEsimId : undefined,
        queryMsiSdn: !!queryMsiSdn ? queryMsiSdn : undefined,
        queryUuid: !!queryUuid ? queryUuid : undefined,
        queryGroup: !!queryGroup ? queryGroup : undefined,
        queryEnrollmentDate,
        queryCoupledDate,
        queryActivationDate,
        queryDeactivationDate,
        queryMeterDataYes,
        queryMeterDataNo,
        hasLogError,
        queryAllDate,
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
        queryPostalCode,
        queryRemarkMCU,
        queryRemarkMeter,
        queryVendor,
        advancedSearch,
        queryTagTypes: queryTagTypes || 'ALL',
        queryTags: ((queryTags || '').match(/(\[[^\[\]]+\])/g) || [])
                   .map(it => {
                       let value = it.substring(1, it.length - 1).split('-@@-')[0];
                       let label = it.substring(1, it.length - 1).split('-@@-')[1];
                       return {value: Number(value), label};
                   }).filter(it => it.value > 0 && !!it.label),
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };

    let rp = await getAllDevices(params, req);
    rp = rp || {};
    rp.response = rp.response || {};

    const rpGroup = await getDeviceGroups();
    const groupList = [{ value: '', label: 'Select group...' }];
    rpGroup?.response?.results?.forEach((gr) => {
      const item = {
        value: gr.id,
        label: gr.name,
      };
      groupList.push(item);
    });

    const rpVendors = await getVendors();
    const vendors = [];
    rpVendors?.response?.forEach((res) => {
      const vendor = {
        value: res.id,
        label: res.name,
        description: res.description,
      };
      vendors.push(vendor);
    });

    const rpDeviceFilters = await getDeviceFilters(req);
    const deviceFilters = [];
    rpDeviceFilters?.response?.forEach((res) => {
      const df = {
        value: res.id,
        label: res.name,
        filters: res.filters,
      };
      deviceFilters.push(df);
    });

    let slStatus;
    if (!!status) {
      const result = statusList.filter(st => st.value === status);
      if (result.length > 0) {
        slStatus = result[0];
      }
    }
    let slMSISDNStatus;
    if (!!mSISDNStatus) {
      const result = mSISDNStatusList.filter(st => st.value === mSISDNStatus);
      if (result.length > 0) {
        slMSISDNStatus = result[0];
      }
    }
    let slType;
    if (!!type) {
      const result = typeList.filter(st => st.value === type);
      if (result.length > 0) {
        slType = result[0];
      }
    }
    let slP3Type;
    if (!!typeP3) {
      const result = typeP3List.filter(st => st.value === typeP3);
      if (result.length > 0) {
        slP3Type = result[0];
      }
    }

    let slGroup;
    if (queryGroup != null && queryGroup != undefined) {
      const result = groupList.filter(gr => gr.value === parseInt(queryGroup));
      if (result.length > 0) {
        slGroup = result[0];
      }
    }
    let slVendor;
    if (!!queryVendor) {
      const result = vendors.filter(vendor => vendor.value === parseInt(queryVendor));
      if (result.length > 0) {
        slVendor = result[0];
      }
    }

    const buildings = await getBuilding({limit: 10000}, req);
    let searchBuilding = (buildings.results || []).filter(bd => bd.id == queryBuilding)[0];
    if (searchBuilding) {
      let buildingId = searchBuilding.id;
      searchBuilding = {value: searchBuilding.id, label: searchBuilding.id + ' - ' + searchBuilding.name};
    }
    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      logs: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
      pageIndex: pageNumber,
      pageSize: 20,
      page,
      devices: rp.response.results?.filter(device => device.uid !== 'server.csr'),
      asPath,
      selectedStatus: slStatus,
      selectedMSISDNStatus: slMSISDNStatus,
      selectedType: slType,
      selectedP3Type: slP3Type,
      tempFromDate: params.options.fromDate ? new Date(params.options.fromDate) : undefined,
      deToDate: params.options.toDate ? new Date(params.options.toDate) : undefined,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      selectedGroup: slGroup,
      searchUuid: params.options.queryUuid,
      searchEsimId: params.options.queryEsimId,
      searchMsiSdn: params.options.queryMsiSdn,
      searchPostalCode: params.options.queryPostalCode,
      searchRemarkMCU: params.options.queryRemarkMCU,
      searchRemarkMeter: params.options.queryRemarkMeter,
      searchVendor: slVendor,
      openAdvancedSearch: (params.options.advancedSearch === 'true' || params.options.advancedSearch === true),
      checkbox: {
        enrollmentDate: params.options.queryEnrollmentDate,
        coupledDate: params.options.queryCoupledDate,
        activationDate: params.options.queryActivationDate,
        deactivationDate: params.options.queryDeactivationDate,
        queryMeterDataYes: params.options.queryMeterDataYes,
        queryMeterDataNo: params.options.queryMeterDataNo,
        hasLogError: params.options.hasLogError,
        all: params.options.queryAllDate,
      },
      groupList,
      statusList,
      mSISDNStatusList,
      typeList,
      typeP3List,
      loading: false,
      params,
      vendors,
      buildings,
      searchBuilding,
      deviceFilters,
      searchTagTypes: !!params.options.queryTagTypes ? {value: params.options.queryTagTypes, label: params.options.queryTagTypes} : null,
      searchTags: params.options.queryTags || [],
    };
  }
  state = {
    ...this.props,
    proFromDate: '',
    proToDate: '',
    buildings: [],
    floorLevels: [],
    buildingUnits: [],
    location: {},
  };
  constructor(props) {
    super(props);
  }

  showMenu(item) {
    const isSuperAdmin = this.state.userInfo?.authorities?.filter(r => r.authority === 'SUPER_ADMIN')?.length;
    const authorities = this.state.userInfo?.authorities.map(r => r.authority);
    let hasPermission = !item.permissions?.length;
    let hasRole = !item.roles?.length;
    let hasGroup = !item.groups?.length;
    let showMenu = false;

    item.permissions.forEach(item => {
      if (this.state.userInfo?.permissions.includes(item)) {
        hasPermission = true;
        return;
      }
    });
    item.roles.forEach(item => {
      if (authorities.includes(item)) {
        hasRole = true;
        return;
      }
    });
    item.groups.forEach(item => {
      if (this.state.userInfo?.groups.includes(item)) {
        hasGroup = true;
        return;
      }
    });
    if (isSuperAdmin || (hasPermission && hasGroup && hasRole)) {
      showMenu = true;
    }
    return showMenu;
  }

  sendCommand = async (uid, cmd, type) => {
    const response = await sendCommand({ uid, cmd, type });
    if (response.success) {
      const mid = response.response;
      this.setState({ loading: false });
      const params = {
        options: {
          uid,
          msn: this.state.selectedData.msn,
          ptype: cmd,
        },
        limit: 20,
        offset: 0,
      };
      const rp = await getRelatedLogs(params);
      this.setState({
        relatedLogs: rp?.response?.results || [],
        totalRecordsRelatedLog: rp?.response?.totalRows,
        totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
        pageIndexRelatedLog: (rp?.response?.offset + 19) / 20 + 1,
        pageSizeRelatedLog: 20,
      });
      Swal.fire({
        html: `<p style='text-align: center; font-size: 14px;'>${'MID ' + mid + ' is sent successfully. Check process logs for more information.'}</p>`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      this.setState({ loading: false });
      Swal.fire({
        html: `<p style='text-align: center; font-size: 14px;'>${response.errorDescription || response.message}</p>`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  getRemarkValue = (deviceGroups) => {
    let remark = '';
    deviceGroups.forEach(r => {
      if (r.value === this.state.detailsData.group?.id) {
        remark = r.remark;
      }
    });
    return remark;
  }

  async componentDidMount(){
    this.searchGroup();
    this.getProjectTags();
    await this.setState({loading: true});
    let buildings = this.props.buildings;// await getBuilding({limit: 10000});
    let searchBuilding = (buildings.results || []).filter(bd => bd.id == this.props.params.options.queryBuilding)[0];
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

    let slFilter;
    if (!!this.state.deviceFilters && this.state.deviceFilters.length && window.location.search) {
      const uri = this.props.asPath;
      const result = this.state.deviceFilters.filter(filter => filter.filters === uri);
      if (result.length > 0) {
        slFilter = result[0];
      }
    }

    this.setState({
      buildings,
      searchBuilding,
      selectedFilters: slFilter,
      location: window.location,
      loading: false,
    });
  }

  searchGroup = async () => {
    const params = {
    };
    const rp = await getUserPermissions(params);
    this.setState({
      permissions: rp?.response.results[0].permissions || [],
    });
    console.log("permissions",this.state.permissions);
    if(this.state.permissions != null) {
      this.state.permissions.map((p, id) => {
        if (p.name === 'PAGE_DEVICES_UPLOAD_DEVICE_CSR_BUTTON_PERM') {
          this.setState({deviceCsrButton: true});
        }
        if (p.name === 'PAGE_DEVICES_GET_TCM_INFO_BUTTON_PERM') {
          this.setState({getTcmButton: true});
        }
        if (p.name === 'PAGE_DEVICES_SHOW_METER_CHART_BUTTON_PERM') {
          this.setState({meterChartButton: true});
        }
        if (p.name === 'PAGE_DEVICES_SET_TIME_INTERVAL_BUTTON_PERM') {
          this.setState({timeIntervalButton: true});
        }
        if (p.name === 'PAGE_DEVICES_GET_RELAY_STATUS_BUTTON_PERM') {
          this.setState({relayStatusButton: true});
        }
        if (p.name === 'PAGE_DEVICES_TURN_ON_METER_RELAY_BUTTON_PERM') {
          this.setState({meterRelayOnButton: true});
        }
        if (p.name === 'PAGE_DEVICES_TURN_OFF_METER_RELAY_BUTTON_PERM') {
          this.setState({meterRelayOffButton: true});
        }
      })
    } else {
      console.log("permissions null");
    }
  }

  getProjectTags = async () => {
    const rpProjectTags = await getProjectTags({ offset: 0, limit: 1000 });
    const projectTags = [];
    rpProjectTags?.response?.results?.forEach((res) => {
      const tag = {
        value: res.id,
        label: res.name,
        description: res.description,
      };
      projectTags.push(tag);
    });
    this.setState({projectTags: projectTags})
  }

  getPis = async () => {
      const params = {
          limit: this.state.limit || 1000,
          offset: this.state.offset || 0,
      };
      const rp = await getPiClients(params);
      let ieiIds = [];
      rp?.results?.forEach((res) => {
        if (res.ieiId && res.hide !== true) {
          const tag = {
            value: res.ieiId,
            label: res.ieiId,
            description: res.description,
          };
          ieiIds.push(tag);
        }
      });
      console.info('rp?.results?', rp?.results, ieiIds);
      this.setState({ieiIds});
  }

  updateDevice = async (type, message) => {
    let it = this.state.selectedDevice;
    if (!it || !it.id || !!this.state.updated || !!this.state.updatedGroup) {
      const data = {};
      const addressObj = {
        streetNumber : this.state.streetNumber,
        street : this.state.streetName,
        town : this.state.town,
        city : this.state.city,
        country : this.state.country,
        postalCode : this.state.postalCode,
      };
      const dataGroup = {};
      if (!!this.state.updated) {
        data.id = this.state.detailsData.id;
        data.uid = this.state.detailsData.uid;
        data.sn = !!this.state.replaceDevice ? this.state.newSn : this.state.detailsData.sn;
        data.replaceReason = this.state.replaceReason;
        data.isReplaced = !!this.state.replaceDevice ? true : false;
        data.msn = /*this.state.detailsData.msn*/ it.msn; //original msn
        data.group = this.state.detailsData.group?.id;
        data.installer = this.state.detailsData.installer?.userId;

        // original address
        data.buildingId = it.building?.id ? it.building.id : null;
        data.blockId = it.block?.id ? it.block.id : null;
        data.floorLevelId = it.floorLevel?.id ? it.floorLevel.id : null;
        data.buildingUnitId = it.buildingUnit?.id ? it.buildingUnit.id : null;
        data.vendor = it.vendor.id;
        data.projectTags = (it.projectTags || []).map(tag => tag.id);
        data.mcuProjectTags = (it.mcuProjectTags || []).map(tag => tag.id);
        data.meterProjectTags = (it.meterProjectTags || []).map(tag => tag.id);
        data.addressProjectTags = (it.addressProjectTags || []).map(tag => tag.id);
        data.ieiNodes = (it.deviceIEINodes || []).map(tag => tag.ieiNodes);

        if (it.address) {
          data.address = {...it.address}
        }

        if (type === 'COUPLE_ADDRESS') {
          if (this.state.addressType === 'apartment') {
            data.buildingId = this.state.selectedBuilding;
            data.blockId = this.state.selectedBlock;
            data.floorLevelId = this.state.selectedFloor;
            data.buildingUnitId = this.state.selectedUnit;
            if (!data.buildingUnitId) {
              Swal.fire(
                'Error!',
                'Unit is required!',
                'error',
              );
              return;
            }
          }
          if (this.state.addressType === 'other') {
            data.address = addressObj;
          }

        } else if (type === 'DE_COUPLE_ADDRESS') {
          data.buildingId = null;
          data.floorLevelId = null;
          data.buildingUnitId = null;
          data.address = null;

        } else if (type === 'COUPLE_MSN') {
          data.msn = this.state.detailsData.msn;
          if (!data.msn) {
            Swal.fire(
              'Error!',
              'MSN is required!',
              'error',
            );
            return;
          }

        } else if (type === 'DE_COUPLE_MSN') {
          data.msn = null;

        } else if (type === 'SYNC_TAG_MCU') {
          data.mcuProjectTags = (it.mcuProjectTags || []).map(tag => tag.id);
          data.meterProjectTags = (it.mcuProjectTags || []).map(tag => tag.id);
          data.addressProjectTags = (it.mcuProjectTags || []).map(tag => tag.id);
        } else if (type === 'SYNC_TAG_METER') {
          data.mcuProjectTags = (it.meterProjectTags || []).map(tag => tag.id);
          data.meterProjectTags = (it.meterProjectTags || []).map(tag => tag.id);
          data.addressProjectTags = (it.meterProjectTags || []).map(tag => tag.id);
        } else if (type === 'SYNC_TAG_ADDRESS') {
          data.mcuProjectTags = (it.addressProjectTags || []).map(tag => tag.id);
          data.meterProjectTags = (it.addressProjectTags || []).map(tag => tag.id);
          data.addressProjectTags = (it.addressProjectTags || []).map(tag => tag.id);
        }
      }
      if (!!this.state.updatedGroup) {
        dataGroup.id = this.state.detailsData.group.id;
        dataGroup.remark = this.state.detailsData.group.remark;
      }
      if (!!this.state.updatedVendor) {
        data.vendor = this.state.updatedVendor.value;
      }
      if (!type) {
        if (!!this.state.updatedProject) {
          data.projectTags = (this.state.updatedProject || []).map(tag => tag.value);
        }
        if (!!this.state.updatedMcuProject) {
          data.mcuProjectTags = (this.state.updatedMcuProject || []).map(tag => tag.value);
        }
        if (!!this.state.updatedMeterProject) {
          data.meterProjectTags = (this.state.updatedMeterProject || []).map(tag => tag.value);
        }
        if (!!this.state.updatedAddressProject) {
          data.addressProjectTags = (this.state.updatedAddressProject || []).map(tag => tag.value);
        }
      }
      if (!!this.state.updatedIeIs) {
        data.ieiNodes = (this.state.updatedIeIs || []).map(tag => tag.value);
      }
      data.sendMDTToPi = this.state.detailsData.sendMDTToPi;
      data.remarkMCU = this.state.detailsData.remarkMCU;
      data.remarkMeter = this.state.detailsData.remarkMeter;
      const result = await Swal.fire({
        html: "<p style='text-align: center; font-size: 14px;'>" + (message || '') + "Are you sure?</p>",
        icon: 'question',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      });
      if (result && result.isConfirmed) {
        let response = null;
        if (!!this.state.updated) {
          response = await editDevice(data);
        }
        if (!!this.state.updatedGroup) {
          response = await editGroup(dataGroup);
        }
        if (response.success === true) {
          Swal.fire(
            'Done!',
            (!!response.message ? (response.message + '\n') : '') + 'Your database has been changed!',
            'success',
          )
            .then(() => {
              this.setState({
                openDetails: false,
                detailsData: null,
                updated: undefined,
                updatedGroup: undefined,
                loading: true,
              });
              window.location.href = window.location.href;
            });
        } else {
          Swal.fire(
            'Error!',
            response.message || response.errorDescription || '',
            'error',
          );
        }
      }
    }
  }

  getFiles = async (params) => {
      await this.setState({loading: true, photoFilter: {...params}})
      let rp = await getFiles({...params})
      await this.setState({loading: false})
      console.info('rp?.response?.results', rp?.response)
      let piFileUpLoads = (rp?.response || []).map((it, index) => {
          return {uri: '/api/file/' + it.uid + '/' + it.id, title: it.altName, text: ('Uploaded By: ' + (it.uploadedBy || 'System')) + ' (' + moment(it.createdDate).format("YYYY-MM-DD HH:mm:ss") +') ' + '(' + (index + 1) + '/' + ((rp?.response || []).length) + ')'}
      });
      /*
      if (!piFileUpLoads || !piFileUpLoads.length) {
      Swal.fire({
        html: `<p style='text-align: center; font-size: 14px;'>${'Not found!'}</p>`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      }
      */
      this.setState({piFileUpLoads: piFileUpLoads || [], showPhotoP1Test: true, piFileUpLoadCurrentIndex: 0});
  }

  getFilters = () => {
    let tags = '';
    (this.state.searchTags || []).map(it => {
      tags += '[' + it.value + '-@@-' + it.label + ']'
    })
    return {
      status: !!this.state.selectedStatus ? this.state.selectedStatus.value : undefined,
      mSISDNStatus: !!this.state.selectedMSISDNStatus ? this.state.selectedMSISDNStatus.value : undefined,
      type: !!this.state.selectedType ? this.state.selectedType.value : undefined,
      typeP3: !!this.state.selectedP3Type ? this.state.selectedP3Type.value : undefined,
      fromDate: !!this.state.tempFromDate ? moment(new Date(this.state.tempFromDate)).format('DD/MM/YYYY') : undefined,
      toDate:  !!this.state.deToDate ? moment(new Date(this.state.deToDate)).format('DD/MM/YYYY') : undefined,
      querySn: !!this.state.searchSn ? this.state.searchSn : undefined,
      queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : undefined,
      queryUuid: this.state.searchUuid || undefined,
      queryEsimId: this.state.searchEsimId || undefined,
      queryMsiSdn: this.state.searchMsiSdn || undefined,
      queryGroup: !!this.state.selectedGroup ? this.state.selectedGroup.value : undefined,
      enrollmentDate: this.state.checkbox?.enrollmentDate,
      coupledDate: this.state.checkbox?.coupledDate,
      activationDate: this.state.checkbox?.activationDate,
      deactivationDate: this.state.checkbox?.deactivationDate,
      queryMeterDataYes: this.state.checkbox?.queryMeterDataYes,
      queryMeterDataNo: this.state.checkbox?.queryMeterDataNo,
      hasLogError: this.state.checkbox?.hasLogError,
      allDate: !(this.state.checkbox?.all === false || this.state.checkbox?.all === 'false'),
      queryBuilding: this.state.searchBuilding?.value || undefined,
      queryBlock: this.state.searchBlock?.value || undefined,
      queryFloorLevel: this.state.searchFloorLevel?.value || undefined,
      queryBuildingUnit: this.state.searchBuildingUnit?.value || undefined,
      queryPostalCode: this.state.searchPostalCode || undefined,
      queryRemarkMCU: this.state.searchRemarkMCU || undefined,
      queryRemarkMeter: this.state.searchRemarkMeter || undefined,
      queryVendor: this.state.searchVendor?.value || undefined,
      queryTagTypes: this.state.searchTagTypes?.value || 'ALL',
      queryTags: tags,
    }
  }

  render() {
    this.state.updated = true;
    return (
            <TotPage title={'Devices (MCU and Coupled Meter)'}>
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
                              position: 'relative',
                              overflow: 'unset',
                              pointerEvents: (!!this.state.openExportCsv || !!this.state.openEditDialog || !!this.state.showRawMessage || this.state.openDetails) ? 'none' : null,
                            }}
                        >
                            {!!this.state.uploadDeviceCsr ?
                                <>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        overflow: 'visible'
                                    }}
                                >
                                    <div
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <div
                                            className="col-md-11 input-wrap has-feedback has-success"
                                            style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingRight: '20px', marginBottom: '25px', marginTop: '25px', overflow: 'unset' }}
                                        >
                                            <input
                                                className="col-md-11 file-input"
                                                type="file"
                                                placeholder={'File upload'}
                                                accept=".zip"
                                                dataButtonText="Choose CSR in zip file..."
                                                onChange={(event) => {
                                                  this.setState({ file: event.target.files[0], errorImportDevices: [] });
                                                }}
                                            />
                                            <a
                                              style={{
                                                marginLeft: '15px',
                                                marginTop: '5px',
                                                textDecoration: 'underline',
                                              }}
                                              download
                                              href='/api/device-csr/template'>Download template
                                            </a>
                                            {this.state.validateFile === false ?
                                                <small className="help-block"
                                                     style={{
                                                       color: '#eb0000',
                                                       fontSize: '12px',
                                                       fontWeight: '400',
                                                       marginLeft: '15px',
                                                     }}
                                                >
                                                  {!this.state.file ? 'File is required' : ''}
                                                </small>
                                            : null}
                                            <Select
                                                className="col-md-4 select-vendor mt-4"
                                                components={animatedComponents}
                                                value={this.state.selectedVendor || { value: '', label: "Select vendor" }}
                                                options={this.state.vendors || []}
                                                onChange={(event) => {
                                                  this.setState({selectedVendor: event})
                                                }}
                                            />
                                            {this.state.validateVendor === false ?
                                                <small className="help-block"
                                                     style={{
                                                       color: '#eb0000',
                                                       fontSize: '12px',
                                                       fontWeight: '400',
                                                       marginLeft: '15px',
                                                     }}
                                                >
                                                  {!this.state.selectedVendor?.value ? 'Vendor is required' : ''}
                                                </small>
                                                : null}
                                        </div>
                                        <div className="form-group mt-5">
                                            <div className="col-md-11 input-wrap has-feedback has-success" style={{ display: 'flex', flexDirection: 'row', marginLeft: '15px' }}>
                                                <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                                                    onClick={ async () => {
                                                      await this.setState({
                                                        errorImportDevices: []
                                                      })
                                                      if (!this.state.file) {
                                                        this.setState({
                                                          validateFile: false,
                                                        })
                                                      }
                                                      if (!this.state.file) {
                                                        return;
                                                      }
                                                      const result = await Swal.fire({
                                                        html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                                                        icon: 'question',
                                                        confirmButtonText: 'OK',
                                                        cancelButtonText: 'Cancel',
                                                        showCancelButton: true,
                                                      });
                                                      if (!result || !result.isConfirmed) return;
                                                      let rp = null;
                                                      const vendor = this.state.selectedVendor?.value;

                                                      const formData = new FormData();
                                                      formData.append('file', this.state.file, this.state.file.name);

                                                      let url = `api/device-csr/upload`;

                                                      if (vendor) {
                                                        url = url + "?vendor=" + vendor
                                                      }
                                                      this.setState({loading: true});
                                                      const method = 'POST';
                                                      await fetch(url,
                                                        {
                                                          method,
                                                          headers: {
                                                            'Authorization': getCookie('access_token')
                                                          },
                                                          body: formData,
                                                        },
                                                        )
                                                        .then(response => response.json())
                                                        .then(response => rp = response)
                                                        .catch((error) => {
                                                          console.error('Error:', error);
                                                        });
                                                      if (rp?.response && !!rp?.response.length) {
                                                        this.setState({errorImportDevices: rp?.response});
                                                      } else {
                                                        Swal.fire({
                                                          html: `<p style='text-align: center; font-size: 14px;'>${rp?.errorDescription || rp?.message}</p>`,
                                                          icon: 'error',
                                                          confirmButtonText: 'OK',
                                                        });
                                                      }
                                                      this.setState({loading: false});
                                                    }}
                                                >
                                                    <span>{'SAVE'}</span>
                                                </div>
                                                <div style={{ marginLeft: '5px' }} className="button-btn w-80"
                                                    onClick={() => {
                                                      require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                                                    }}
                                                >
                                                    <span>{'CANCEL'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <div
                                            className="col-md-11 input-wrap has-feedback has-success"
                                            style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingRight: '20px', marginBottom: '25px', marginTop: '25px', overflow: 'unset' }}
                                        >
                                            <input
                                                className="col-md-11 msisdn-file-input"
                                                type="file"
                                                placeholder={'File upload'}
                                                accept=".csv"
                                                dataButtonText="Choose msisdn in csv file..."
                                                onChange={(event) => {
                                                  this.setState({ fileMSISDN: event.target.files[0], errorImportDevices: [] });
                                                }}
                                            />
                                            <a
                                              style={{
                                                marginLeft: '15px',
                                                marginTop: '5px',
                                                textDecoration: 'underline',
                                              }}
                                              download
                                              href='/api/telco-msisdn/template'>Download template
                                            </a>
                                            {this.state.validateFileMSISDN === false ?
                                                <small className="help-block"
                                                     style={{
                                                       color: '#eb0000',
                                                       fontSize: '12px',
                                                       fontWeight: '400',
                                                       marginLeft: '15px',
                                                     }}
                                                >
                                                  {!this.state.fileMSISDN ? 'File is required' : ''}
                                                </small>
                                            : null}
                                            <div style={{pointerEvents: 'none', opacity: 0}}>
                                                <Select
                                                    className="col-md-4 select-vendor mt-4"
                                                    components={animatedComponents}
                                                    value={this.state.selectedVendor || { value: '', label: "Select vendor" }}
                                                    options={this.state.vendors || []}
                                                    onChange={(event) => {
                                                      this.setState({selectedVendor: event})
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group mt-5">
                                            <div className="col-md-11 input-wrap has-feedback has-success" style={{ display: 'flex', flexDirection: 'row', marginLeft: '15px' }}>
                                                <div style={{ marginLeft: '0px', margin: 'unset' }} className="button-btn w-80"
                                                    onClick={ async () => {
                                                      if (!this.state.fileMSISDN) {
                                                        this.setState({
                                                          validateFileMSISDN: false,
                                                        })
                                                      }
                                                      if (!this.state.fileMSISDN) {
                                                        return;
                                                      }
                                                      const result = await Swal.fire({
                                                        html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                                                        icon: 'question',
                                                        confirmButtonText: 'OK',
                                                        cancelButtonText: 'Cancel',
                                                        showCancelButton: true,
                                                      });
                                                      if (!result || !result.isConfirmed) return;
                                                      let rp = null;
                                                      const formData = new FormData();
                                                      formData.append('file', this.state.fileMSISDN, this.state.fileMSISDN.name);
                                                      const url = `/api/device-msisdn/upload`;
                                                      const method = 'POST';
                                                      rp = await fetch(url,
                                                        {
                                                          headers: {
                                                            'Authorization': getCookie('access_token')
                                                          },
                                                          method,
                                                          body: formData,
                                                        },
                                                        )
                                                        .then(response => response.blob())
                                                        .then(response => rp = response)
                                                        .catch((error) => {
                                                          console.error('Error:', error);
                                                        });

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
                                                        const fileName = 'import-msisdn-result-' + tag + '.csv';
                                                        const url = window.URL.createObjectURL(new Blob([rp]));
                                                        const link = document.createElement('a');
                                                        link.href = url;
                                                        link.setAttribute('download', fileName);
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        link.parentNode.removeChild(link);

                                                        this.setState({
                                                          fileMSISDN: null,
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

                                                    }}
                                                >
                                                    <span>{'UPLOAD'}</span>
                                                </div>
                                                <div style={{ marginLeft: '5px' }} className="button-btn w-80"
                                                    onClick={() => {
                                                      require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                                                    }}
                                                >
                                                    <span>{'CANCEL'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {!!this.state.errorImportDevices?.length && (
                                  <div className="table-wrap" style={{width: 'calc(100% - 30px)', padding: '15px', borderTop: '0.75px solid'}}>
                                    <div className="align-items-center justify-content-between" style={{display: 'flex', flexDirection: 'row', width: '50%'}}>
                                      <span style={{fontSize: '17px',}}>Upload detail</span>
                                      <div className="flex align-items-center">Total sent: {this.state.errorImportDevices.length}</div>
                                      <div className="flex align-items-center" style={{color: "green"}}>Upload success: {this.state.errorImportDevices.filter(item => !item.message).length}</div>
                                      <div className="flex align-items-center" style={{color: "red"}}>Upload failed: {this.state.errorImportDevices.filter(item => !!item.message).length}</div>
                                    </div>
                                    <table className="table" style={{marginTop: '15px', pointerEvents: !!this.state.openSubmitReport ? 'none' : null,}}>
                                      <thead className="thead-dark">
                                        <tr>
                                          <th className="table-th-first">SN</th>
                                          <th className="table-th">UID</th>
                                          <th className="table-th">CID</th>
                                          <th className="table-th">STATUS</th>
                                          <th className="table-th table-th-50"></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(this.state.errorImportDevices || [])
                                          //.slice(((this.state.pageIndex || 0) - 1) * (this.state.pageSize || 10), ((this.state.pageIndex || 0) - 1) * (this.state.pageSize || 10) + (this.state.pageSize || 10))
                                          .map((it, idx) => {
                                            return (
                                              <tr key={idx} style={{ flexDirection: 'row', width: '100%', padding: '15px', alignItems: 'center', borderBottom: '1px solid #eeeeee' }} className={this.props.hide === true ? 'force-hide' : ''}>
                                                <td>{it.sn}</td>
                                                <td>{it.uid}</td>
                                                <td>{it.cid}</td>
                                                <td>
                                                  {it.message ? (
                                                    <div
                                                      style={{ display: 'flex', flexDirection: 'column', color: 'red' }}>
                                                      {(it.message || '').split(/\n/g)
                                                        .map((err, errIdx) => {
                                                          return (
                                                            <span key={idx + '_' + errIdx}>{err}</span>
                                                          )
                                                        })
                                                      }
                                                    </div>
                                                  ) : (
                                                    <div
                                                      style={{ display: 'flex', flexDirection: 'column', color: 'green' }}>
                                                      {"UPLOAD SUCCESS!"}
                                                    </div>
                                                  )}
                                                </td>
                                              </tr>
                                            )
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                            </>
                            :null
                            }

                            {!!this.state.exportDeviceByUploadSN && (
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{display: 'flex', flexDirection: 'column', height: '100%', flex: '1'}}>
                                  <div
                                    className="col-md-6 input-wrap has-feedback has-success"
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      position: 'relative',
                                      paddingRight: '20px',
                                      marginBottom: '25px',
                                      marginTop: '25px',
                                      overflow: 'unset'
                                    }}
                                  >
                                    <input
                                      className="file-input sn-export"
                                      type="file"
                                      placeholder={'File upload'}
                                      accept=".csv, .txt"
                                      dataButtonText="Choose file contains MCU SN..."
                                      onChange={(event) => {
                                        this.setState({ file4Export: event.target.files[0] });
                                      }}
                                    />
                                    {this.state.validateFile4Export === false ?
                                      <small
                                        className="help-block"
                                        style={{
                                          color: '#eb0000',
                                          fontSize: '12px',
                                          fontWeight: '400',
                                        }}
                                      >
                                        {!this.state.file4Export ? 'File is required' : ''}
                                      </small>
                                      : null}
                                  </div>
                                  <div className="form-group mt-5">
                                    <div
                                      className="col-md-6 input-wrap has-feedback has-success"
                                      style={{ display: 'flex', flexDirection: 'row' }}
                                    >
                                      <div
                                        style={{ marginLeft: '0px', margin: 'unset' }}
                                        className="button-btn w-80"
                                        onClick={async () => {

                                          if (!this.state.file4Export) {
                                            this.setState({
                                              validateFile4Export: false,
                                            })
                                            return;
                                          }
                                          const result = await Swal.fire({
                                            html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                                            icon: 'question',
                                            confirmButtonText: 'OK',
                                            cancelButtonText: 'Cancel',
                                            showCancelButton: true,
                                          });
                                          if (!result || !result.isConfirmed) return;
                                          const formData = new FormData();
                                          formData.append('file', this.state.file4Export, this.state.file4Export.name);
                                          formData.append('type', 'MCU_SN');
                                          const url = 'api/export-by-upload-ca-request-logs' + '?timeZone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
                                          const method = 'POST';
                                          let rp = await fetch(url,
                                            {
                                              method,
                                              body: formData,
                                              headers: new Headers({
                                                'Authorization': getCookie(tokenName),
                                              }),
                                            },
                                          )
                                            .then((response) => {
                                              return response.blob();
                                            });
                                          if (rp) {
                                            const tag = moment(new Date()).format('YYYYMMDDHHmmss');
                                            const fileName = 'Exp-by-MSN-' + tag + '.csv';
                                            const url = window.URL.createObjectURL(new Blob([rp]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', fileName);
                                            document.body.appendChild(link);
                                            link.click();
                                            link.parentNode.removeChild(link);
                                            this.setState({ openExportCsv: false, activateDate: undefined });
                                          } else {
                                            alert('Something went wrong. Please try again!');
                                          }
                                        }}
                                      >
                                        <span>{'EXPORT'}</span>
                                      </div>
                                      <div
                                        style={{ marginLeft: '5px' }}
                                        className="button-btn w-80"
                                        onClick={() => {
                                          this.setState({
                                            uploadDeviceCsr: false,
                                            exportDeviceByUploadSN: false,
                                            file4Export: null,
                                          })
                                        }}
                                      >
                                        <span>{'CLOSE'}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', height: '100%', flex: '1'}}>
                                  <div
                                    className="col-md-6 input-wrap has-feedback has-success"
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      position: 'relative',
                                      paddingRight: '20px',
                                      marginBottom: '25px',
                                      marginTop: '25px',
                                      overflow: 'unset'
                                    }}
                                  >
                                    <input
                                      className="file-input meter-export"
                                      type="file"
                                      placeholder={'File upload'}
                                      accept=".csv, .txt"
                                      dataButtonText="Choose file contains Meter SN..."
                                      onChange={(event) => {
                                        this.setState({ file4Export1: event.target.files[0] });
                                      }}
                                    />
                                    {this.state.validateFile4Export1 === false ?
                                      <small
                                        className="help-block"
                                        style={{
                                          color: '#eb0000',
                                          fontSize: '12px',
                                          fontWeight: '400',
                                        }}
                                      >
                                        {!this.state.file4Export1 ? 'File is required' : ''}
                                      </small>
                                      : null}
                                  </div>
                                  <div className="form-group mt-5">
                                    <div
                                      className="col-md-6 input-wrap has-feedback has-success"
                                      style={{ display: 'flex', flexDirection: 'row' }}
                                    >
                                      <div
                                        style={{ marginLeft: '0px', margin: 'unset' }}
                                        className="button-btn w-80"
                                        onClick={async () => {

                                          if (!this.state.file4Export1) {
                                            this.setState({
                                              validateFile4Export1: false,
                                            })
                                            return;
                                          }
                                          const result = await Swal.fire({
                                            html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                                            icon: 'question',
                                            confirmButtonText: 'OK',
                                            cancelButtonText: 'Cancel',
                                            showCancelButton: true,
                                          });
                                          if (!result || !result.isConfirmed) return;
                                          const formData = new FormData();
                                          formData.append('file', this.state.file4Export1, this.state.file4Export1.name);
                                          formData.append('type', 'METER_SN');
                                          const url = 'api/export-by-upload-ca-request-logs' + '?timeZone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
                                          const method = 'POST';
                                          let rp = await fetch(url,
                                            {
                                              method,
                                              body: formData,
                                              headers: new Headers({
                                                'Authorization': getCookie(tokenName),
                                              }),
                                            },
                                          )
                                            .then((response) => {
                                              return response.blob();
                                            });
                                          if (rp) {
                                            const tag = moment(new Date()).format('YYYYMMDDHHmmss');
                                            const fileName = 'Exp-by-Meter-SN-' + tag + '.csv';
                                            const url = window.URL.createObjectURL(new Blob([rp]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', fileName);
                                            document.body.appendChild(link);
                                            link.click();
                                            link.parentNode.removeChild(link);
                                            this.setState({ openExportCsv: false, activateDate: undefined });
                                          } else {
                                            alert('Something went wrong. Please try again!');
                                          }
                                        }}
                                      >
                                        <span>{'EXPORT'}</span>
                                      </div>
                                      <div
                                        style={{ marginLeft: '5px' }}
                                        className="button-btn w-80"
                                           onClick={() => {
                                             this.setState({
                                               uploadDeviceCsr: false,
                                               exportDeviceByUploadSN: false,
                                               file4Export1: null,
                                             })
                                           }}
                                      >
                                        <span>{'CLOSE'}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {(!this.state.uploadDeviceCsr && !this.state.exportDeviceByUploadSN ) ?
                            <>
                                <div style={{ padding: '15px', paddingTop: '20px', paddingBottom: '0px', fontWeight: 400, fontSize: '18px', color: '#000000' }}>
                                  <span>{'Device Management'} <i className="fa fa-caret-right ml-5 mr-5" /> {'Devices (MCU and Coupled Meter)'}</span>
                                  <h5 className="site-title">{'Devices (MCU and Coupled Meter)'}</h5>
                                </div>
                                <div
                                  style={{
                                    padding: '30px',
                                    // borderBottom: '1px solid #ddd',
                                    overflow: "inherit",
                                    pointerEvents: (!!this.state.openSetTimeIntervalDialog || !!this.state.openSaveFilters) ? 'none' : 'all',
                                  }}
                                >
                                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="box-checkbox">
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="all"
                                        name="all"
                                        value={this.state.checkbox?.all}
                                        checked={
                                          this.state.checkbox?.all === 'false' || this.state.checkbox?.all === false ? false : true
                                        }
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              all: true,
                                              enrollmentDate: false,
                                              coupledDate: false,
                                              activationDate: false,
                                              deactivationDate: false,
                                              queryMeterDataYes: false,
                                              queryMeterDataNo: false,
                                              hasLogError: false,
                                            }});
                                          } else {
                                            if (!this.state.checkbox?.enrollmentDate &&
                                                !this.state.checkbox?.coupledDate &&
                                                !this.state.checkbox?.activationDate &&
                                                !this.state.checkbox?.deactivationDate &&
                                                !this.state.checkbox?.queryMeterDataYes &&
                                                !this.state.checkbox?.queryMeterDataNo &&
                                                !this.state.checkbox?.hasLogError
                                            ) {
                                              this.setState({checkbox: {
                                                all: true,
                                                enrollmentDate: false,
                                                coupledDate: false,
                                                activationDate: false,
                                                deactivationDate: false,
                                                queryMeterDataYes: false,
                                                queryMeterDataNo: false,
                                                hasLogError: false,
                                              }});
                                            } else {
                                              this.setState({checkbox: {
                                                all: false,
                                              }});
                                            }
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'All'}</span>
                                    </div>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="enrollment-date"
                                        name="enrollment-date"
                                        checked={!!this.state.checkbox?.enrollmentDate}
                                        value={this.state.checkbox?.enrollmentDate}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              enrollmentDate: true,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              enrollmentDate: false,
                                            }}, () => {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (
                                                  !this.state.checkbox?.enrollmentDate
                                                  && !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.queryMeterDataYes
                                                  && !this.state.checkbox?.queryMeterDataNo
                                                  && !this.state.checkbox?.hasLogError
                                                )
                                              }});
                                            });
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'Enrollment date'}</span>
                                    </div>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="coupled-date"
                                        name="coupled-date"
                                        checked={!!this.state.checkbox?.coupledDate}
                                        value={this.state.checkbox?.coupledDate}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              coupledDate: true,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              coupledDate: false,
                                            }}, () => {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (
                                                  !this.state.checkbox?.enrollmentDate
                                                  && !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.queryMeterDataYes
                                                  && !this.state.checkbox?.queryMeterDataNo
                                                  && !this.state.checkbox?.hasLogError
                                                )
                                              }});
                                            });
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'Coupled date'}</span>
                                    </div>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="activation-date"
                                        name="activation-date"
                                        checked={!!this.state.checkbox?.activationDate}
                                        value={this.state.checkbox?.activationDate}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              activationDate: true,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              activationDate: false,
                                            }}, () => {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (
                                                  !this.state.checkbox?.enrollmentDate
                                                  && !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.queryMeterDataYes
                                                  && !this.state.checkbox?.queryMeterDataNo
                                                  && !this.state.checkbox?.hasLogError
                                                )
                                              }});
                                            });
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'Activation date'}</span>
                                    </div>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="deactivation-date"
                                        name="deactivation-date"
                                        checked={!!this.state.checkbox?.deactivationDate}
                                        value={this.state.checkbox?.deactivationDate}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              deactivationDate: true,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              deactivationDate: false,
                                            }}, () => {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (
                                                  !this.state.checkbox?.enrollmentDate
                                                  && !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.queryMeterDataYes
                                                  && !this.state.checkbox?.queryMeterDataNo
                                                  && !this.state.checkbox?.hasLogError
                                                )
                                              }});
                                            });
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'Deactivation date'}</span>
                                    </div>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="deactivation-date"
                                        name="deactivation-date"
                                        checked={!!this.state.checkbox?.queryMeterDataYes}
                                        value={this.state.checkbox?.queryMeterDataYes}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              queryMeterDataYes: true,
                                              queryMeterDataNo: false,
                                              hasLogError: false,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              queryMeterDataYes: false,
                                            }}, () => {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (
                                                  !this.state.checkbox?.enrollmentDate
                                                  && !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.queryMeterDataYes
                                                  && !this.state.checkbox?.queryMeterDataNo
                                                  && !this.state.checkbox?.hasLogError
                                                )
                                              }});
                                            });
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'Meter Data'}</span>
                                    </div>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="deactivation-date"
                                        name="deactivation-date"
                                        checked={!!this.state.checkbox?.queryMeterDataNo}
                                        value={this.state.checkbox?.queryMeterDataNo}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              queryMeterDataNo: true,
                                              queryMeterDataYes: false,
                                              hasLogError: false,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              queryMeterDataNo: false,
                                            }}, () => {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (
                                                  !this.state.checkbox?.enrollmentDate
                                                  && !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.queryMeterDataYes
                                                  && !this.state.checkbox?.queryMeterDataNo
                                                  && !this.state.checkbox?.hasLogError
                                                )
                                              }});
                                            });
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'No Meter Data'}</span>
                                    </div>
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="has-log-error"
                                        name="has-log-error"
                                        checked={!!this.state.checkbox?.hasLogError}
                                        value={this.state.checkbox?.hasLogError}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              hasLogError: true,
                                              queryMeterDataYes: false,
                                              queryMeterDataNo: false,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              hasLogError: false,
                                            }}, () => {
                                              this.setState({checkbox: {
                                                ...this.state.checkbox,
                                                all: (
                                                  !this.state.checkbox?.enrollmentDate
                                                  && !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.queryMeterDataYes
                                                  && !this.state.checkbox?.queryMeterDataNo
                                                  && !this.state.checkbox?.hasLogError
                                                )
                                              }});
                                            });
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'Error'}</span>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      marginTop: '20px',
                                      width: '100%',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                      }}
                                      className="box-date"
                                    >
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          color:' #282828',
                                          fontSize: '14px',
                                          fontWeight: 500,
                                        }}
                                      >
                                        <span style={{ marginRight: '10px' }} >{'From date:'}</span>
                                        <DatePicker
                                          className="date-picker"
                                          dateFormat="yyyy-MM-dd"
                                          selected={!!this.state.tempFromDate ? new Date(this.state.tempFromDate) : ''}
                                          placeholderText={"YYYY-MM-DD"}
                                          onChange={(date:Date) => this.setState({ tempFromDate: date })}
                                        />
                                      </div>
                                      <div
                                        style={{
                                          display: 'flex',
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginLeft: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            color:' #282828',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                          }}
                                          className="box-to-date"
                                        >
                                          <span style={{ marginRight: '10px' }} >{'To date:'}</span>
                                          <DatePicker
                                            className="date-picker"
                                            dateFormat="yyyy-MM-dd"
                                            selected={!!this.state.deToDate ? new Date(this.state.deToDate) : ''}
                                            placeholderText={"YYYY-MM-DD"}
                                            min={!!this.state.tempFromDate ? new Date(this.state.tempFromDate) : new Date()}
                                            onChange={(date:Date) => this.setState({ deToDate: date })}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                      className="font-size-18"
                                      style={{cursor: 'pointer', color: 'blue', marginTop: '20px', marginBottom: '20px', width: 'max-content'}}
                                      onClick={() => {
                                        this.setState({
                                          openAdvancedSearch: !this.state.openAdvancedSearch,
                                        })
                                      }}
                                  >
                                    {'Advanced Search'}
                                    {!!this.state.openAdvancedSearch ? (
                                        <i className="fa fa-search-minus ml-5"/>
                                    ) : (
                                        <i className="fa fa-search-plus ml-5"/>
                                    )}
                                  </div>

                                  {!!this.state.openAdvancedSearch && (
                                      <div style={{ marginTop: '20px', width: '96%' }} >
                                        <div
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              width: '100%',
                                              justifyContent: 'space-between',
                                            }}
                                        >
                                          <Select
                                              className="multi-select-cid"
                                              components={animatedComponents}
                                              defaultValue={this.state.selectedStatus || this.state.statusList[0]}
                                              options={this.state.statusList}
                                              onChange={(event) => {
                                                if (!event.value) {
                                                  this.setState({ selectedStatus: undefined });
                                                } else {
                                                  this.setState({ selectedStatus: event });
                                                }
                                              }}
                                          />
                                          <Select
                                            className="multi-select-cid"
                                            components={animatedComponents}
                                            defaultValue={this.state.selectedMSISDNStatus || this.state.mSISDNStatusList[0]}
                                            options={this.state.mSISDNStatusList}
                                            onChange={(event) => {
                                              if (!event.value) {
                                                this.setState({ selectedMSISDNStatus: undefined });
                                              } else {
                                                this.setState({ selectedMSISDNStatus: event });
                                              }
                                            }}
                                          />
                                          <Select
                                              className="multi-select-cid"
                                              components={animatedComponents}
                                              defaultValue={this.state.selectedType || this.state.typeList[0]}
                                              options={this.state.typeList}
                                              onChange={(event) => {
                                                if (!event.value) {
                                                  this.setState({ selectedType: undefined });
                                                } else {
                                                  this.setState({ selectedType: event });
                                                }
                                              }}
                                          />
                                          <Select
                                            className="multi-select-cid"
                                            components={animatedComponents}
                                            defaultValue={this.state.selectedP3Type || this.state.typeP3List[0]}
                                            options={this.state.typeP3List}
                                            onChange={(event) => {
                                              if (!event.value) {
                                                this.setState({ selectedP3Type: undefined });
                                              } else {
                                                this.setState({ selectedP3Type: event });
                                              }
                                            }}
                                          />
                                          <div
                                              style={{
                                                display: 'flex',
                                                marginBottom: '0px',
                                              }}
                                              className="item"
                                          >
                                            <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '40px',
                                                  width: '24%',
                                                  paddingLeft: '10px',
                                                  alignSelf: 'center',
                                                }}
                                                value={ this.state.searchPostalCode || '' }
                                                placeholder="Search Postal code..."
                                                onChange={event => this.setState({ searchPostalCode: event.target.value })}
                                            />
                                          </div>
                                        </div>
                                        <div
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'space-between',
                                              marginTop: '15px',
                                            }}
                                            className="box-item"
                                        >
                                          <div
                                            style={{
                                              display: 'flex',
                                            }}
                                            className="item"
                                          >
                                              <div
                                                className="item"
                                                style={{
                                                  width: '50%',
                                                  paddingLeft: '0px',
                                                  marginBottom: '0px',
                                                }}
                                              >
                                                <input
                                                    style={{
                                                      border: '1px solid #00000020',
                                                      borderRadius: '5px',
                                                      outline: 'unset',
                                                      height: '40px',
                                                      width: '24%',
                                                      paddingLeft: '10px',
                                                      alignSelf: 'center',
                                                    }}
                                                    value={ this.state.searchEsimId || '' }
                                                    placeholder="Search eSIM ID(ICCID)..."
                                                    onChange={event => this.setState({ searchEsimId: event.target.value })}
                                                />
                                              </div>
                                              <div
                                                className="item"
                                                style={{
                                                  width: '50%',
                                                  paddingRight: '0px',
                                                  marginBottom: '0px',
                                                }}
                                              >
                                                <input
                                                    style={{
                                                      border: '1px solid #00000020',
                                                      borderRadius: '5px',
                                                      outline: 'unset',
                                                      height: '40px',
                                                      width: '24%',
                                                      paddingLeft: '10px',
                                                      alignSelf: 'center',
                                                    }}
                                                    value={ this.state.searchMsiSdn || '' }
                                                    placeholder="Search MSISDN..."
                                                    onChange={event => this.setState({ searchMsiSdn: event.target.value })}
                                                />
                                              </div>
                                          </div>
                                          <div
                                              style={{
                                                display: 'flex',
                                              }}
                                              className="item"
                                          >
                                            <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '40px',
                                                  width: '24%',
                                                  paddingLeft: '10px',
                                                  alignSelf: 'center',
                                                }}
                                                value={ this.state.searchUuid || '' }
                                                placeholder="Search UUID..."
                                                onChange={event => this.setState({ searchUuid: event.target.value })}
                                            />
                                          </div>
                                          <div
                                              style={{
                                                display: 'flex',
                                              }}
                                              className="item"
                                          >
                                            <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '40px',
                                                  width: '24%',
                                                  paddingLeft: '10px',
                                                  alignSelf: 'center',
                                                }}
                                                value={ this.state.searchSn || '' }
                                                placeholder="Search MCU SN..."
                                                onChange={event => this.setState({ searchSn: event.target.value })}
                                            />
                                          </div>
                                          <div
                                              style={{
                                                display: 'flex',
                                              }}
                                              className="item"
                                          >
                                            <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '40px',
                                                  width: '24%',
                                                  paddingLeft: '10px',
                                                  alignSelf: 'center',
                                                }}
                                                value={ this.state.searchMsn || '' }
                                                placeholder="Search MSN..."
                                                onChange={event => this.setState({ searchMsn: event.target.value })}
                                            />
                                          </div>
                                        </div>

                                        <div
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              width: '100%',
                                              justifyContent: 'space-between',
                                              marginBottom: '5px',
                                            }}
                                            className="box-item"
                                        >
                                          <div
                                              style={{
                                                display: 'flex',
                                              }}
                                              className="item"
                                          >
                                            <Select
                                                className="multi-select-address"
                                                components={animatedComponents}
                                                value={this.state.searchBuilding || {value: '', label: "Select building"}}
                                                options={[{id: '', name: "Select building"}].concat(this.state.buildings.results || []).map(bd => ({value: bd.id, label: bd.id + ' - ' + bd.name}))}
                                                onChange={async (event) => {
                                                  if (!event.value) {
                                                    this.setState({
                                                      searchBuilding: undefined,
                                                      searchFloorLevel: undefined,
                                                      searchBuildingUnit: undefined,
                                                      blocks: [],
                                                      floorLevels: [],
                                                      buildingUnits: [],
                                                    });
                                                  } else {
                                                    this.setState({ searchBuilding: event });
                                                    let blocks = [];
                                                    blocks = await getBlockOfBuilding({limit: 10000, options: {buildingId: event.value}});

                                                    let floorLevels = [];
                                                    floorLevels = await getFloorLevels({limit: 10000, options: {buildingId: event.value}});
                                                    this.setState({
                                                      blocks,
                                                      floorLevels,
                                                      buildingUnits: [],
                                                      selectedBlock: undefined,
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
                                              }}
                                              className="item"
                                          >
                                            <Select
                                                className="multi-select-address"
                                                components={animatedComponents}
                                                value={this.state.searchBlock || {value: '', label: "Select block"}}
                                                options={[{id: '', name: "Select block"}].concat(this.state.blocks?.results || []).map(bd => ({value: bd.id, label: bd.id + ' - ' + bd.name}))}
                                                onChange={async (event) => {
                                                  if (!event.value) {
                                                    this.setState({
                                                      searchBlock: undefined,
                                                      searchFloorLevel: undefined,
                                                      searchBuildingUnit: undefined,
                                                      floorLevels: [],
                                                      buildingUnits: [],
                                                    });
                                                  } else {
                                                    this.setState({
                                                      searchBlock: event
                                                    });
                                                    let floorLevels = [];
                                                    floorLevels = await getFloorLevels({limit: 10000, options: {blockId: event.value, buildingId: this.state.searchBuilding?.id}});
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
                                              }}
                                              className="item"
                                          >
                                            <Select
                                                className="multi-select-address"
                                                components={animatedComponents}
                                                value={this.state.searchFloorLevel || {value: '', label: "Select floorLevel"}}
                                                options={[{id: '', name: "Select floorLevel"}].concat(this.state.floorLevels.results || []).map(bd => ({value: bd.id, label: bd.id + ' - ' + bd.name}))}
                                                onChange={async (event) => {
                                                  if (!event.value) {
                                                    this.setState({
                                                      searchFloorLevel: undefined,
                                                      searchBuildingUnit: undefined,
                                                      buildingUnits: [],
                                                    });
                                                  } else {
                                                    this.setState({
                                                      searchFloorLevel: event
                                                    });
                                                    let buildingUnits = await getBuildingUnits({
                                                      limit: 10000,
                                                      options: {floorLevelId: event.value}
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
                                              }}
                                              className="item"
                                          >
                                            <Select
                                                className="multi-select-address"
                                                components={animatedComponents}
                                                value={this.state.searchBuildingUnit || {value: '', label: "Select buildingUnit"}}
                                                options={[{id: '', name: "Select buildingUnit"}].concat(this.state.buildingUnits.results || []).map(bd => ({value: bd.id, label: bd.id + ' - ' + bd.name}))}
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
                                        <div
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              width: '100%',
                                              justifyContent: 'space-between',
                                              marginBottom: '15px',
                                            }}
                                            className="box-item"
                                        >
                                          <div
                                              style={{
                                                display: 'flex',
                                                marginBottom: '0px',
                                                position: 'relative',
                                                minWidth: '50%',
                                              }}
                                          >
                                            <Select
                                              placeholder={'Select tag type...'}
                                              className="multi-select-cid"
                                              components={animatedComponents}
                                              value={
                                                this.state.searchTagTypes
                                              }
                                              options={[
                                                {value: 'ALL', label: 'ALL'},
                                                {value: 'MCU', label: 'MCU'},
                                                {value: 'METER', label: 'METER'},
                                                {value: 'ADDRESS', label: 'ADDRESS'},
                                              ]}
                                              onChange={(event) => {
                                                this.setState({ searchTagTypes: event });
                                              }}
                                            />
                                            <Select
                                              className="multi-select-cid"
                                              components={animatedComponents}
                                              placeholder={'Select tag...'}
                                              components={animatedComponents}
                                              value={
                                                this.state.searchTags
                                              }
                                              options={this.state.projectTags || []}
                                              onChange={(event) => {
                                                this.setState({ searchTags: event });
                                              }}
                                              isMulti
                                            />
                                          </div>
                                          <div
                                              style={{
                                                display: 'flex',
                                                marginBottom: '0px',
                                              }}
                                              className="item"
                                          >
                                          </div>
                                          <div
                                              style={{
                                                display: 'flex',
                                                marginBottom: '0px',
                                              }}
                                              className="item"
                                          >
                                          </div>
                                        </div>
                                        <div
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              width: '100%',
                                              justifyContent: 'space-between',
                                              marginBottom: '15px',
                                            }}
                                            className="box-item"
                                        >
                                          <div
                                              style={{
                                                display: 'flex',
                                                marginBottom: '0px',
                                              }}
                                              className="item"
                                          >
                                            <Select
                                              className="select-vendor w-full"
                                              components={animatedComponents}
                                              value={this.state.searchVendor || { value: '', label: "Select vendor" }}
                                              options={this.state.vendors || []}
                                              onChange={(event) => {
                                                if (!event.value) {
                                                  this.setState({
                                                    searchVendor: undefined,
                                                  });
                                                } else {
                                                  this.setState({
                                                    searchVendor: event
                                                  });
                                                }
                                              }}
                                            />
                                          </div>
                                          <div
                                              style={{
                                                display: 'flex',
                                                marginBottom: '0px',
                                              }}
                                              className="item"
                                          >
                                            <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '40px',
                                                  width: '24%',
                                                  paddingLeft: '10px',
                                                  alignSelf: 'center',
                                                }}
                                                value={ this.state.searchRemarkMCU || '' }
                                                placeholder="Search remark MCU..."
                                                onChange={event => this.setState({ searchRemarkMCU: event.target.value })}
                                            />
                                          </div>
                                          <div
                                              style={{
                                                display: 'flex',
                                                marginBottom: '0px',
                                              }}
                                              className="item"
                                          >
                                            <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '40px',
                                                  width: '24%',
                                                  paddingLeft: '10px',
                                                  alignSelf: 'center',
                                                }}
                                                value={ this.state.searchRemarkMeter || '' }
                                                placeholder="Search remark Meter..."
                                                onChange={event => this.setState({ searchRemarkMeter: event.target.value })}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              display: 'flex',
                                              marginBottom: '0',
                                              flex: 1,
                                            }}
                                            className="item"
                                          >

                                            <Select
                                                className="multi-select-address"
                                                components={animatedComponents}
                                                defaultValue={this.state.selectedGroup || this.state.groupList[0]}
                                                options={this.state.groupList}
                                                onChange={(event) => {
                                                  if (!event.value) {
                                                    this.setState({ selectedGroup: undefined });
                                                  } else {
                                                    this.setState({ selectedGroup: event });
                                                  }
                                                }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                  )}
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}
                                    className="btn-panel"
                                  >
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Apply filters and search"
                                      className="button-btn w-80"
                                    >
                                      <span
                                        onClick={() => {
                                          const options = this.getFilters();
                                          let pathName = window.location.pathname + '?queryAllDate=' + options.allDate;
                                          pathName = pathName + '&advancedSearch=' + !!this.state.openAdvancedSearch;

                                          if (!!options.enrollmentDate) {
                                            pathName = pathName + '&queryEnrollmentDate=' + options.enrollmentDate;
                                          }
                                          if (!!options.coupledDate) {
                                            pathName = pathName + '&queryCoupledDate=' + options.coupledDate;
                                          }
                                          if (!!options.activationDate) {
                                            pathName = pathName + '&queryActivationDate=' + options.activationDate;
                                          }
                                          if (!!options.deactivationDate) {
                                            pathName = pathName + '&queryDeactivationDate=' + options.deactivationDate;
                                          }
                                          if (!!options.queryMeterDataYes) {
                                            pathName = pathName + '&queryMeterDataYes=' + options.queryMeterDataYes;
                                          }
                                          if (!!options.queryMeterDataNo) {
                                            pathName = pathName + '&queryMeterDataNo=' + options.queryMeterDataNo;
                                          }
                                          if (!!options.hasLogError) {
                                            pathName = pathName + '&hasLogError=' + options.hasLogError;
                                          }
                                          if (!!options.fromDate) {
                                            pathName = pathName + '&fromDate=' + options.fromDate;
                                          }
                                          if (!!options.toDate) {
                                            pathName = pathName + '&toDate=' + options.toDate;
                                          }
                                          if (!!options.status) {
                                            pathName = pathName + '&status=' + options.status;
                                          }
                                          if (!!options.mSISDNStatus) {
                                            pathName = pathName + '&mSISDNStatus=' + options.mSISDNStatus;
                                          }
                                          if (!!options.type) {
                                            pathName = pathName + '&type=' + options.type;
                                          }
                                          if (!!options.typeP3) {
                                            pathName = pathName + '&typeP3=' + options.typeP3;
                                          }
                                          if (!!options.queryGroup) {
                                            pathName = pathName + '&queryGroup=' + options.queryGroup;
                                          }
                                          if (!!options.querySn) {
                                            pathName = pathName + '&querySn=' + options.querySn;
                                          }
                                          if (!!options.queryMsn) {
                                            pathName = pathName + '&queryMsn=' + options.queryMsn;
                                          }
                                          if (!!options.queryUuid) {
                                            pathName = pathName + '&queryUuid=' + options.queryUuid;
                                          }
                                          if (!!options.queryEsimId) {
                                            pathName = pathName + '&queryEsimId=' + options.queryEsimId;
                                          }
                                          if (!!options.queryMsiSdn) {
                                            pathName = pathName + '&queryMsiSdn=' + options.queryMsiSdn;
                                          }
                                          if (!!options.queryBuilding) {
                                            pathName = pathName + '&queryBuilding=' + options.queryBuilding;
                                          }
                                          if (!!options.queryBlock) {
                                            pathName = pathName + '&queryBlock=' + options.queryBlock;
                                          }
                                          if (!!options.queryFloorLevel) {
                                            pathName = pathName + '&queryFloorLevel=' + options.queryFloorLevel;
                                          }
                                          if (!!options.queryBuildingUnit) {
                                            pathName = pathName + '&queryBuildingUnit=' + options.queryBuildingUnit;
                                          }
                                          if (!!options.queryPostalCode) {
                                            pathName = pathName + '&queryPostalCode=' + options.queryPostalCode;
                                          }
                                          if (!!options.queryRemarkMCU) {
                                            pathName = pathName + '&queryRemarkMCU=' + options.queryRemarkMCU;
                                          }
                                          if (!!options.queryRemarkMeter) {
                                            pathName = pathName + '&queryRemarkMeter=' + options.queryRemarkMeter;
                                          }
                                          if (!!options.queryVendor) {
                                            pathName = pathName + '&queryVendor=' + options.queryVendor;
                                          }
                                          if (!!options.queryTagTypes) {
                                            pathName = pathName + '&queryTagTypes=' + options.queryTagTypes;
                                          }
                                          if (!!options.queryTags) {
                                            pathName = pathName + '&queryTags=' + options.queryTags;
                                          }
                                          require('@app/utils/next-routes').Router.pushRoute(pathName);
                                        }}
                                      >
                                        {'SEARCH'}
                                      </span>
                                    </div>
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Clear all filters"
                                      className="button-btn w-80 ml-10"
                                      onClick={() => {
                                        this.setState({
                                          status: undefined,
                                          mSISDNStatus: undefined,
                                          selectedStatus: undefined,
                                          selectedMSISDNStatus: undefined,
                                          searchSn: undefined,
                                          searchMsn: undefined,
                                          fromDate: undefined,
                                          toDate: undefined,
                                          searchUuid: undefined,
                                          searchEsimId: undefined,
                                          searchMsiSdn: undefined,
                                          selectedGroup: undefined,
                                          searchVendor: undefined,
                                        });
                                        const pathName = window.location.pathname;
                                        require('@app/utils/next-routes').Router.pushRoute(pathName);
                                      }}
                                    >
                                      <span>{'CLEAR'}</span>
                                    </div>
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Export row data as a CSV file"
                                      className="button-btn ml-10 w-max px-10"
                                      onClick={async () => {
                                        let tags = '';
                                        (this.state.searchTags || []).map(it => {
                                          tags += '[' + it.value + '-@@-' + it.label + ']'
                                        })
                                        const filter = {
                                          options: {
                                            status: !!this.state.selectedStatus ? this.state.selectedStatus.value : undefined,
                                            mSISDNStatus: !!this.state.selectedMSISDNStatus ? this.state.selectedMSISDNStatus.value : undefined,
                                            fromDate: !!this.state.tempFromDate ? new Date(this.state.tempFromDate).getTime() : undefined,
                                            toDate: !!this.state.deToDate ? new Date(this.state.deToDate).getTime() : undefined,
                                            querySn: !!this.state.searchSn ? this.state.searchSn : undefined,
                                            queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : undefined,
                                            queryUuid: this.state.searchUuid || undefined,
                                            queryEsimId: this.state.searchEsimId || undefined,
                                            queryMsiSdn: this.state.searchMsiSdn || undefined,
                                            queryGroup: !!this.state.selectedGroup ? this.state.selectedGroup.value.toString() : undefined,
                                            queryBuilding: (this.state.searchBuilding?.value || '') + '',
                                            queryBlock: (this.state.searchBlock?.value || '') + '',
                                            queryFloorLevel: (this.state.searchFloorLevel?.value || '') + '',
                                            queryBuildingUnit: (this.state.searchBuildingUnit?.value || '') + '',
                                            queryPostalCode: this.state.searchPostalCode || null,
                                            queryRemarkMCU: this.state.searchRemarkMCU || null,
                                            queryRemarkMeter: this.state.searchRemarkMeter || null,
                                            queryMeterDataYes: this.state.checkbox?.queryMeterDataYes || undefined,
                                            queryMeterDataNo: this.state.checkbox?.queryMeterDataNo || undefined,
                                            hasLogError: this.state.checkbox?.hasLogError || undefined,

                                            type: !!this.state.selectedType ? this.state.selectedType.value : null,
                                            typeP3: !!this.state.selectedP3Type ? this.state.selectedP3Type.value : null,
                                            queryVendor: (this.state.searchVendor?.value || '') + '',
                                            downloadCsv: true,
                                            downloadType: 'fullMCU',
                                            queryTagTypes: this.state.searchTagTypes?.value || 'ALL',
                                            queryTags: ((tags || '').match(/(\[[^\[\]]+\])/g) || [])
                                              .map(it => {
                                                let value = it.substring(1, it.length - 1).split('-@@-')[0];
                                                let label = it.substring(1, it.length - 1).split('-@@-')[1];
                                                return {value: Number(value), label};
                                              }).filter(it => it.value > 0 && !!it.label),
                                          }};
                                        const url = '/api/ca-request-logs';
                                        const method = 'POST';
                                        const rp = await fetch(url, {
                                          method,
                                          body: JSON.stringify(filter),
                                          headers: {
                                            'Content-Type' : 'application/json',
                                            'Authorization': getCookie('access_token'),
                                          },
                                        })
                                          .then((response) => {
                                            return response.blob();
                                          });
                                        if (rp) {
                                          const tag =  moment(new Date()).format('YYYY-MM-DD');
                                          const fileName = 'MMS-MCU-Export-' + tag + '.csv';
                                          const url = window.URL.createObjectURL(new Blob([rp]));
                                          const link = document.createElement('a');
                                          link.href = url;
                                          link.setAttribute('download', fileName);
                                          document.body.appendChild(link);
                                          link.click();
                                          link.parentNode.removeChild(link);
                                          this.setState({ openExportCsv: false, activateDate: undefined });
                                        } else {
                                          alert('Something went wrong. Please try again!');
                                        }
                                      }}
                                    >
                                      <span>{'EXPORT CSV'}</span>
                                    </div>
                                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Export ICCID data as a CSV file"
                                      className="button-btn ml-10 w-max px-10"
                                      onClick={async () => {
                                        const filter = {
                                          options: {
                                            status: !!this.state.selectedStatus ? this.state.selectedStatus.value : undefined,
                                            mSISDNStatus: !!this.state.selectedMSISDNStatus ? this.state.selectedMSISDNStatus.value : undefined,
                                            fromDate: !!this.state.fromDate ? moment(new Date(this.state.fromDate)).format('DD/MM/YYYY') : undefined,
                                            toDate: !!this.state.toDate ? moment(new Date(this.state.toDate)).format('DD/MM/YYYY') : undefined,
                                            querySn: !!this.state.searchSn ? this.state.searchSn : undefined,
                                            queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : undefined,
                                            queryUuid: this.state.searchUuid || undefined,
                                            queryEsimId: this.state.searchEsimId || undefined,
                                            queryMsiSdn: this.state.searchMsiSdn || undefined,
                                            queryGroup: !!this.state.selectedGroup ? this.state.selectedGroup.value.toString() : undefined,
                                            queryBuilding: (this.state.searchBuilding?.value || '') + '',
                                            queryBlock: (this.state.searchBlock?.value || '') + '',
                                            queryFloorLevel: (this.state.searchFloorLevel?.value || '') + '',
                                            queryBuildingUnit: (this.state.searchBuildingUnit?.value || '') + '',
                                            queryPostalCode: this.state.searchPostalCode || null,
                                            queryRemarkMCU: this.state.searchRemarkMCU || null,
                                            queryRemarkMeter: this.state.searchRemarkMeter || null,
                                            type: !!this.state.selectedType ? this.state.selectedType.value : null,
                                            typeP3: !!this.state.selectedP3Type ? this.state.selectedP3Type.value : null,

                                            queryVendor: (this.state.searchVendor?.value || '') + '',
                                            downloadCsv: true,
                                          }};
                                        const url = '/api/ca-request-logs';
                                        const method = 'POST';
                                        const rp = await fetch(url, {
                                          method,
                                          body: JSON.stringify(filter),
                                          headers: {
                                            'Content-Type' : 'application/json',
                                            'Authorization': getCookie('access_token'),
                                          },
                                        })
                                          .then((response) => {
                                            return response.blob();
                                          });
                                        if (rp) {
                                          const tag =  moment(new Date()).format('YYYY-MM-DD');
                                          const fileName = 'MMS-MCU-Export-' + tag + '.csv';
                                          const url = window.URL.createObjectURL(new Blob([rp]));
                                          const link = document.createElement('a');
                                          link.href = url;
                                          link.setAttribute('download', fileName);
                                          document.body.appendChild(link);
                                          link.click();
                                          link.parentNode.removeChild(link);
                                          this.setState({ openExportCsv: false, activateDate: undefined });
                                        } else {
                                          alert('Something went wrong. Please try again!');
                                        }
                                      }}
                                    >
                                      <span>{'EXPORT ICCID CSV'}</span>
                                    </div>
                                    <div>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip="Click to upload MCU ID"
                                        className="button-btn ml-10 w-max px-10"
                                        onClick={() => this.setState({ exportDeviceByUploadSN: true })}
                                      >
                                        <span>{'EXPORT BY MCU or Meter SN'}</span>
                                      </div>
                                    </div>
                                    {this.state.deviceCsrButton == true ? (
                                      <div>
                                        <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                        <div
                                          data-tip="Click to upload device CSR"
                                          className="button-btn ml-10 w-max px-10"
                                          onClick={() => this.setState({ uploadDeviceCsr: true })}
                                        >
                                          <span>{'UPLOAD DEVICE CSR'}</span>
                                        </div>
                                      </div>
                                    ) : null}
                                    <div>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      <div
                                        data-tip={`${(this.state.location?.search && !this.state.selectedFilters) ? 'Click to save this current filters' : 'There is no applied filter or a filter is selected'}`}
                                        className={`${(this.state.location?.search && !this.state.selectedFilters) ? 'button-btn' : 'button-btn-disabled'} ml-10 w-max px-10`}
                                        onClick={() => {
                                          if (this.state.location?.search && !this.state.selectedFilters) {
                                            this.setState({ openSaveFilters: true })
                                          }
                                        }}
                                      >
                                        <span>{'SAVE THIS CURRENT FILTERS'}</span>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        marginBottom: '0px',
                                        height: '40px',
                                      }}
                                      className="item"
                                    >
                                      <Select
                                        className="select-vendor w-full h-full"
                                        styles={{
                                          control: (provided) => ({
                                            ...provided,
                                            height: '100%',
                                          }),
                                        }}
                                        components={animatedComponents}
                                        value={this.state.selectedFilters || { value: '', label: "Select saved filter" }}
                                        options={this.state.deviceFilters || []}
                                        onChange={(event) => {
                                          if (!event.value) {
                                            this.setState({
                                              selectedFilters: undefined,
                                            });
                                          } else {
                                            this.setState({
                                              selectedFilters: event
                                            });
                                            require('@app/utils/next-routes').Router.pushRoute(event.filters);
                                          }
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flex: '1',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                      }}
                                    >
                                      <div>
                                        <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                        <div
                                          data-tip="Click to turn on meter relay for filtered devices"
                                          className="button-btn w-160 ml-10"
                                          onClick={() => {
                                            this.setState({rlsComment: { open: true, command: 'PW1' }});
                                          }}
                                        >
                                          <span>{'All relay on'}</span>
                                        </div>
                                      </div>
                                      <div>
                                        <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                        <div
                                          data-tip="Click to turn off meter relay for filtered devices"
                                          className="button-btn w-160 ml-10"
                                          onClick={() => {
                                            this.setState({rlsComment: { open: true, command: 'PW0' }});
                                          }}
                                        >
                                          <span>{'All relay off'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff' }} className="doctor-list">
                                    <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                                        <div style={{fontWeight: 500, textAlign: 'center', margin: '10px', fontSize: '15px'}}>
                                          <span>{'Total: ' + this.state.totalRecords}</span>
                                        </div>
                                        <table className="table">
                                            <thead className="thead-dark">
                                            <tr>
                                                <th className="table-th" scope="col">MCU SN</th>
                                                <th className="table-th" scope="col">MCU UUID</th>
                                                <th className="table-th" scope="col">ESIM ID</th>
                                                <th className="table-th" scope="col">MSN</th>
                                                <th className="table-th" scope="col">RLS STATUS</th>
                                                <th className="table-th" scope="col">STATUS</th>
                                                <th className="table-th" scope="col">P2 COUPLE STATE</th>
                                                <th className="table-th" scope="col">P3 COUPLE STATE</th>
                                                <th className="table-th" scope="col">VERSION</th>
                                                <th className="table-th" scope="col">VENDOR</th>
                                                <th className="table-th" style={{ width: '300px' }} scope="col">LAST SEEN</th>
                                                <th className="table-th" scope="col">GROUP</th>
                                                <th className="table-th" scope="col">Enroll</th>
                                                <th className="table-th" scope="col"/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {(this.state.devices || [])
                                                .map((it, index) => {

                                                  it.rlsStatus = '';
                                                  if (it.logs && it.logs[0]) {
                                                      try {
                                                        let rlsLog = JSON.parse(it.logs[0]);
                                                        it.rlsStatus = rlsLog.payload.data;
                                                        if (it.rlsStatus === '0') {
                                                            it.rlsStatus = 'OFF';
                                                        }
                                                        if (it.rlsStatus === '1') {
                                                            it.rlsStatus = 'ON';
                                                        }
                                                      } catch(err){
                                                      }
                                                  }
                                                  return (
                                                        <tr
                                                            key={index}
                                                            style={{
                                                              cursor: 'pointer',
                                                              alignItems: 'center',
                                                              backgroundColor:  this.state.selectedRow === index ? '#d8d8d8' : '#fff',
                                                              color: '#000000',
                                                            }}
                                                            onClick={async () => {
                                                              const today = new Date();
                                                              const yesterday = new Date(today);
                                                              yesterday.setDate(yesterday.getDate() - 1);
                                                              if (!this.state.openEditDialog && !this.state.openSetTimeIntervalDialog) {
                                                                this.setState({
                                                                  selectedRow: index,
                                                                  selectedData: it,
                                                                  loading: true,
                                                                });

                                                                const params = {
                                                                  options: {
                                                                    uid: it.uid,
                                                                    msn: it.msn
                                                                  },
                                                                  limit: 20,
                                                                  offset: 0,
                                                                };
                                                                const rp = await getRelatedLogs(params);
                                                                this.setState({
                                                                  relatedLogs: rp?.response?.results || [],
                                                                  totalRecordsRelatedLog: rp?.response?.totalRows,
                                                                  totalPagesRelatedLog: Math.floor(((rp?.response?.totalRows || 0) + 19) / 20),
                                                                  pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                                                                  pageSizeRelatedLog: 20,
                                                                  loading: false,
                                                                });
                                                              }
                                                            }}
                                                        >
                                                            <td className="table-td">
                                                                {it.sn}
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.uid}</span>
                                                            </td>
                                                            <td className="table-td">
                                                              <span>{it.cid}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.msn}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.rlsStatus}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.status}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.type}</span>
                                                            </td>
                                                            <td className="table-td">
                                                                <span>{it.typeP3}</span>
                                                            </td>
                                                            <td className="table-td">
                                                              <span>{it.ver}</span>
                                                            </td>
                                                            <td className="table-td">
                                                              <span>{it?.vendor?.name}</span>
                                                            </td>
                                                            <td className="table-td">
                                                              <span>
                                                                {it.lastSubscribeDatetime ? moment(new Date(it.lastSubscribeDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}
                                                              </span>
                                                            </td>
                                                            <td className="table-td">
                                                              <span>{it.group?.id}</span>
                                                            </td>
                                                          <td className="table-td">
                                                            <span>{it.enrollmentDatetime ? moment(new Date(it.enrollmentDatetime)).format('YYYY/MM/DD HH:mm:ss') : ''}</span>
                                                          </td>
                                                            <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                                              <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                              <div
                                                                data-tip="Click to see details and edit"
                                                                className="button-icon"
                                                                onClick={async () => {
                                                                  const rpGroup = await getDeviceGroups();
                                                                  const rpInstaller = await getUsers();
                                                                  this.getPis();
                                                                  await this.getProjectTags();

                                                                  const rpDeviceGroups = [];
                                                                  const rpInstallerUsers = [];
                                                                  this.setState({
                                                                    addressType: !!it.building?.id ? 'apartment' : 'other',
                                                                    selectedDevice: {...it},
                                                                    loading: true,
                                                                  });

                                                                  if(!!it.building) {
                                                                    this.setState({
                                                                      selectedBuilding: it.building?.id ? it.building.id : '',
                                                                      selectedBlock: it.block ? it.block.id : '',
                                                                      selectedFloor: it.floorLevel?.id ? it.floorLevel.id : '',
                                                                      selectedUnit: it.buildingUnit?.id ? it.buildingUnit.id : '',
                                                                    });
                                                                  } else if(!!it.address) {
                                                                    this.setState({
                                                                      streetNumber: it.address.streetNumber ? it.address.streetNumber : '',
                                                                      streetName: it.address.street ? it.address.street : '',
                                                                      town: it.address.town ? it.address.town : '',
                                                                      city: it.address.city ? it.address.city : '',
                                                                      country: it.address.country ? it.address.country : '',
                                                                      postalCode: it.address.postalCode ? it.address.postalCode : ''
                                                                    });
                                                                  }
                                                                  rpGroup?.response?.results.forEach((rp) => {
                                                                    const item = {
                                                                      value: rp.id,
                                                                      label: rp.name,
                                                                      remark: rp.remark,
                                                                    };
                                                                    rpDeviceGroups.push(item);
                                                                  });
                                                                  rpInstaller?.response?.results.forEach((rp) => {
                                                                    if (((rp.roleDescs).map(r => r.desc)).toString().includes('Installer')) {
                                                                      const item = {
                                                                        value: rp.id,
                                                                        label: rp.username,
                                                                      };
                                                                      rpInstallerUsers.push(item);
                                                                    }
                                                                  });
                                                                  let deviceDetail = await getAllDevices({
                                                                    options: {
                                                                      queryUuid: it.uid
                                                                    },
                                                                    offset: 0,
                                                                    limit: 1,
                                                                  });
                                                                  this.setState({
                                                                    openDetails: true,
                                                                    detailsData: (deviceDetail?.response?.results || [])[0] || it,
                                                                    detailsDataOriginal: (deviceDetail?.response?.results || [])[0] || it,
                                                                    rpDeviceGroups,
                                                                    rpInstallerUsers,
                                                                  });

                                                                   const buildings = await getBuilding({limit: 10000});
                                                                   let buildingOptions = [] ;

                                                                   if(buildings.results) {
                                                                      buildings.results.forEach((element, index) => {
                                                                          buildingOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                                      });
                                                                   }
                                                                   this.setState({
                                                                       selectBuilding: buildingOptions || [],
                                                                   })
                                                                   if(it.building?.id) {
                                                                       let blocks = [];
                                                                       if (it.building.id) {
                                                                           blocks = await getBlockOfBuilding({
                                                                               limit: 10000,
                                                                               options: {buildingId: it.building.id}
                                                                           });
                                                                       }
                                                                       let floorLevels = [];

                                                                       if (it.block?.id) {
                                                                           if (it.building.id && it.block.id) {
                                                                               floorLevels = await getFloorLevels({
                                                                                   limit: 10000,
                                                                                   options: {
                                                                                       buildingId: it.building.id,
                                                                                       blockId: !!it.block ? it.block.id : undefined
                                                                                   }
                                                                               });
                                                                           }
                                                                       } else {
                                                                           if (it.building.id) {
                                                                               floorLevels = await getFloorLevels({
                                                                                   limit: 10000,
                                                                                   options: {buildingId: it.building.id}
                                                                               });
                                                                           }
                                                                       }

                                                                       let buildingUnits = [];
                                                                       if (it.floorLevel.id) {
                                                                           buildingUnits = await getBuildingUnits({
                                                                               limit: 10000,
                                                                               options: {floorLevelId: it.floorLevel.id}
                                                                           });
                                                                           ;
                                                                       }

                                                                       let blockOptions = [] ;
                                                                       let floorLevelOptions = [] ;
                                                                       let unitOptions = [] ;

                                                                       if(blocks.results) {
                                                                          blocks.results.forEach((element, index) => {
                                                                              blockOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                                          });
                                                                       }

                                                                       if(floorLevels.results) {
                                                                          floorLevels.results.forEach((element, index) => {
                                                                              floorLevelOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                                          });
                                                                       }

                                                                       if(buildingUnits.results) {
                                                                          buildingUnits.results.forEach((element, index) => {
                                                                              unitOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                                          });
                                                                       }

                                                                       this.setState({
                                                                           selectBuilding: buildingOptions || [],
                                                                           selectBlocks: blockOptions || [],
                                                                           selectedfloorLevels: floorLevelOptions || [],
                                                                           selectedBuildingUnit: unitOptions || [],
                                                                       })
                                                                   }

                                                                   this.setState({loading: false,})
                                                                   // { name: "Apartment", id: 'apartment' },
                                                                   // { name: "Other", id: 'other' },
                                                                   if (it.building?.id) {
                                                                       this.setState({
                                                                           addressType: 'apartment'
                                                                       })
                                                                   } else if (it.address?.postalCode) {
                                                                       this.setState({
                                                                           addressType: 'other'
                                                                       })
                                                                   } else {
                                                                       this.setState({
                                                                           addressType: 'apartment'
                                                                       })
                                                                   }


                                                                }}
                                                              >
                                                                <span>
                                                                  <i className="fa fa-edit" />
                                                                </span>
                                                              </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        <div className="flex flex-row w-full align-items-center justify-content-center"
                                             style={{ display: 'flex', flexWrap: 'wrap', pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null }}
                                        >
                                          {this.state.meterChartButton ?
                                            <>
                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                <div
                                                     data-tip={!this.state.selectedData ? 'Select device to view meter chart' : 'Click to view meter chart'}
                                                     className={`flex w-160 align-items-center justify-content-center ${this.state.selectedData ? 'button-btn' : 'button-btn-disabled'} ml-30`}
                                                     style={{marginBottom:"10px"}}
                                                     onClick={() => {
                                                       if (!!this.state.selectedData) {
                                                           this.setState({ showMeterChart: true });
                                                         }
                                                     }}
                                                >
                                                    <span>{'SHOW METER CHART'}</span>
                                                </div>
                                            </>
                                              :null}
                                            {!!this.state.showMeterChart && (
                                                <div
                                                    style={{
                                                      backgroundColor: '#fff',
                                                      position: 'fixed',
                                                      top: '0',
                                                      left: 0,
                                                      right: 0,
                                                      bottom: 0,
                                                      background: '#00000066',
                                                      zIndex: 10000,
                                                      border: '1px solid',
                                                      borderRadius: '3px',
                                                      padding: '30px',
                                                      overflow: 'auto',
                                                      display: 'flex',
                                                      flexDirection: 'column',
                                                      padding: '15px',
                                                    }}
                                                >
                                                    <div
                                                      style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        background: '#ffffff',
                                                        flex: 1,
                                                      }}
                                                    >
                                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                      <div style={{ fontSize: '40px', position: 'absolute', right: '2%', top: '2%', cursor: 'pointer' }}
                                                           onClick={() => this.setState({ showMeterChart: false })}
                                                           data-tip="Close"
                                                      >
                                                        <i className="fa fa-close" />
                                                      </div>
                                                      <div style={{ flex: 1 }}>
                                                          <MeterChart uid={this.state.selectedData.uid}/>
                                                      </div>

                                                      <div style={{ marginBottom: '10px', marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                          <button
                                                              className="button-btn w-80"
                                                              style={{
                                                                outline: 'unset',
                                                                border: 'unset',
                                                              }}
                                                              onClick={() => {
                                                                this.setState({ showMeterChart: false });
                                                              }}
                                                          >
                                                              {'HIDE'}
                                                          </button>
                                                      </div>
                                                    </div>
                                                </div>
                                            )}
                                          {this.state.getTcmButton ?
                                            <>
                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                <div
                                                    data-tip={!this.state.selectedData ? 'Select device to Get TCM Info' : 'Click to Get TCM Info'}
                                                    className={`flex w-160 align-items-center justify-content-center ${this.state.selectedData ? 'button-btn' : 'button-btn-disabled'} ml-30`}
                                                    style={{marginBottom: "10px"}}
                                                    onClick={() => {
                                                      if (this.state.selectedData) {
                                                        this.setState({ loading: true });
                                                        this.sendCommand(this.state.selectedData.uid, 'INF', 'TCM_INFO');
                                                      }
                                                    }}
                                                >
                                                    <span>{'GET TCM INFO'}</span>
                                                </div>
                                            </>
                                              : null}
                                          {this.state.timeIntervalButton ?
                                            <>
                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                <div
                                                    data-tip={!this.state.selectedData ? 'Select device to set time interval' : 'Click to set time interval'}
                                                    className={`flex w-160 align-items-center justify-content-center ${this.state.selectedData ? 'button-btn' : 'button-btn-disabled'} ml-30`}
                                                    style={{marginBottom: "10px"}}
                                                    onClick={() => {
                                                      if (!!this.state.selectedData) {
                                                        this.setState({ openSetTimeIntervalDialog: true });
                                                      }
                                                    }}
                                                >
                                                    <span>{'SET TIME INTERVAL'}</span>
                                                </div>
                                            </>
                                              : null}
                                          {this.state.relayStatusButton ?
                                            <>
                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                <div
                                                    data-tip={!this.state.selectedData ? 'Select device to send relay status' : 'Click to send relay status'}
                                                    className={`flex w-160 align-items-center justify-content-center ${this.state.selectedData ? 'button-btn' : 'button-btn-disabled'} ml-30`}
                                                    style={{marginBottom: "10px"}}
                                                    onClick={() => {
                                                      if (this.state.selectedData) {
                                                        this.setState({ loading: true });
                                                        this.sendCommand(this.state.selectedData.uid, 'RLS');
                                                      }
                                                    }}
                                                >
                                                    <span>{'GET RELAY STATUS'}</span>
                                                </div>
                                            </>
                                              : null}
                                          {this.state.meterRelayOffButton ?
                                            <>
                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                <div
                                                    data-tip={!this.state.selectedData ? 'Select device to turn off meter relay' : 'Click to turn off meter relay'}
                                                    className={`flex w-160 align-items-center justify-content-center ${this.state.selectedData ? 'button-btn' : 'button-btn-disabled'} ml-30`}
                                                    style={{marginBottom: "10px"}}
                                                    onClick={() => {
                                                      if (this.state.selectedData) {
                                                        this.setState({ loading: true });
                                                        this.sendCommand(this.state.selectedData.uid, 'PW0');
                                                      }
                                                    }}
                                                >
                                                    <span>{'TURN OFF METER RELAY'}</span>
                                                </div>
                                            </>
                                              : null}
                                          {this.state.meterRelayOnButton ?
                                            <>
                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                <div
                                                    data-tip={!this.state.selectedData ? 'Select device to turn on meter relay' : 'Click to turn on meter relay'}
                                                    className={`flex w-160 align-items-center justify-content-center ${this.state.selectedData ? 'button-btn' : 'button-btn-disabled'} ml-30`}
                                                    style={{marginBottom: "10px"}}
                                                    onClick={() => {
                                                      if (this.state.selectedData) {
                                                        this.setState({ loading: true });
                                                        this.sendCommand(this.state.selectedData.uid, 'PW1');
                                                      }
                                                    }}
                                                >
                                                    <span>{'TURN ON METER RELAY'}</span>
                                                </div>
                                            </>
                                              : null}
                                          {this.state.relayStatusButton ?
                                            <>
                                              <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                              <div
                                                data-tip='Click to send relay status for filtered devices'
                                                className={`flex w-160 align-items-center justify-content-center button-btn ml-30`}
                                                style={{marginBottom: "10px"}}
                                                onClick={() => {
                                                  this.setState({rlsComment: { open: true, command: 'RLS' }});
                                                }}
                                              >
                                                <span>{'RLS FOR DEVICES'}</span>
                                              </div>
                                            </>
                                            : null}
                                          {this.state.selectedData?.status && this.state.selectedData?.status === 'XXX' ?
                                            <>
                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                <div
                                                    data-tip={'Click to UNCOUPLED'}
                                                    className={`flex w-160 align-items-center justify-content-center ${this.state.selectedData ? 'button-btn' : 'button-btn-disabled'} ml-30`}
                                                    style={{marginBottom: "10px"}}
                                                    onClick={async () => {
                                                      let result = await Swal.fire({
                                                        html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                                                        icon: 'question',
                                                        confirmButtonText: 'OK',
                                                        cancelButtonText: 'Cancel',
                                                        showCancelButton: true,
                                                      });
                                                      if (result.isConfirmed) {
                                                        let rp = await unLinkMsn(this.state.selectedData);
                                                        result = await Swal.fire({
                                                          html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                                          icon: 'success',
                                                          confirmButtonText: 'OK',
                                                        });
                                                        require('@app/utils/next-routes').Router.pushRoute(window.location.href);
                                                      }

                                                    }}
                                                >
                                                    <span>{'UNCOUPLED'}</span>
                                                </div>
                                            </>
                                              : null}
                                        </div>
                                      {!!this.state.openSaveFilters && (
                                        <div
                                          style={{
                                            backgroundColor: '#fff',
                                            position: 'fixed',
                                            zIndex: 10,
                                            width: '500px',
                                            height: '200px',
                                            border: '1px solid',
                                            borderRadius: '3px',
                                            padding: '15px 15px 15px 15px',
                                            top: '30%',
                                            left: '40%',
                                            color: '#000',
                                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                                            pointerEvent: 'all'
                                          }}
                                        >
                                          <span style={{ fontWeight: '500', fontSize: '18px' }}>
                                              {'Save current filters'}
                                          </span>
                                          <div
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              width: '100%',
                                              height: '30px',
                                              marginBottom: '35px',
                                              marginTop: '20px',
                                            }}
                                          >
                                            <label style={{ fontWeight: 400, margin: 'unset', marginRight: '5px', fontSize: '14px', width: 'max-content' }}>
                                              {'Name of this filter: '}
                                            </label>
                                            <input
                                              value={this.state.savedFiltersName}
                                              style={{
                                                flex: 1,
                                                height: '30px',
                                                outline: 'unset',
                                                border: '0.5px solid',
                                                borderRadius: '3px',
                                                padding: '5px'
                                              }}
                                              onChange={(event) => {
                                                if (!event.target.value) {
                                                  this.setState({ savedFiltersNameError: "Name is required!" });
                                                } else {
                                                  this.setState({ savedFiltersNameError: undefined });
                                                }
                                                this.setState({ savedFiltersName: event.target.value });
                                              }}
                                            />
                                            {(this.state.savedFiltersNameError) ?
                                              <small
                                                className="help-block"
                                                style={{
                                                  color: '#eb0000',
                                                  fontSize: '12px',
                                                  fontWeight: '400',
                                                  position: 'absolute',
                                                  top: '48%',
                                                  left: '135px'
                                                }}
                                              >
                                                {this.state.savedFiltersNameError || 'Invalid name'}
                                              </small>
                                              : null}
                                          </div>
                                          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <button
                                              className="button-btn w-80 mr-15"
                                              style={{
                                                outline: 'unset',
                                                border: 'unset',
                                              }}
                                              onClick={async () => {
                                                this.setState({ loading: true });
                                                if (!this.state.savedFiltersName) {
                                                  this.setState({ savedFiltersNameError: "Name is required!", loading: false });
                                                  return;
                                                }
                                                const params = {
                                                  name: this.state.savedFiltersName,
                                                  filters: this.props.asPath,
                                                }
                                                const response = await saveDeviceFilters(params);
                                                if (response.success === true) {
                                                  this.setState({ loading: false });
                                                  Swal.fire(
                                                    'Done!',
                                                    'Current filters saved!',
                                                    'success',
                                                  )
                                                    .then(async () => {
                                                      const rpDeviceFilters = await getDeviceFilters();
                                                      const deviceFilters = [];
                                                      rpDeviceFilters?.response?.forEach((res) => {
                                                        const df = {
                                                          value: res.id,
                                                          label: res.name,
                                                          filters: res.filters,
                                                        };
                                                        if (df.filters === this.props.asPath) {
                                                          this.setState({selectedFilters: df});
                                                        }
                                                        deviceFilters.push(df);
                                                      });
                                                      this.setState({ openSaveFilters: false, deviceFilters: deviceFilters, savedFiltersName: undefined });
                                                    });
                                                } else {
                                                  this.setState({ loading: false });
                                                  Swal.fire(
                                                    'Error!',
                                                    response.message || response.errorDescription || '',
                                                    'error',
                                                  );
                                                }
                                              }}
                                            >
                                              {'SAVE'}
                                            </button>
                                            <button
                                              className="button-btn w-80 mr-15"
                                              style={{
                                                outline: 'unset',
                                                border: 'unset',
                                              }}
                                              onClick={() => {
                                                this.setState({ openSaveFilters: false });
                                              }}
                                            >
                                              {'CANCEL'}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                      {!!this.state.openSetTimeIntervalDialog && (
                                        <div
                                          style={{
                                            backgroundColor: '#fff',
                                            position: 'fixed',
                                            zIndex: 10,
                                            width: '400px',
                                            height: '360px',
                                            border: '1px solid',
                                            borderRadius: '3px',
                                            padding: '15px 15px 15px 15px',
                                            top: '30%',
                                            left: '40%',
                                          }}
                                        >
                                          <span style={{ fontWeight: '500', fontSize: '18px' }}>
                                              {'Set Time Interval'}
                                          </span>
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              width: '100%',
                                              height: '30px',
                                              marginBottom: '35px',
                                              marginTop: '15px',
                                            }}
                                          >
                                            <label style={{ fontWeight: '400', fontSize: '14px', width: '60px' }}>
                                              {'UID: '}
                                            </label>
                                            <input
                                              readOnly
                                              value={this.state.selectedData.uid}
                                              style={{
                                                width: '100%',
                                                backgroundColor: 'rgb(238 238 238)',
                                                height: '30px',
                                                outline: 'unset',
                                                border: '0.5px solid',
                                                borderRadius: '3px',
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              width: '100%',
                                              height: '100%',
                                              height: '40px',
                                              marginBottom: '35px',
                                            }}
                                          >
                                            <label style={{ fontWeight: '400', fontSize: '14px', width: '60px' }}>
                                              {'RDTI: '}
                                            </label>
                                            <div
                                              className="flex flex-row"
                                              style={{ width: '100%', position: 'relative' }}
                                            >
                                              <SelectCustom
                                                className="mb-0"
                                                field={{
                                                  name: 'rdti',
                                                }}
                                                name="rdti"
                                                options={[
                                                  ...(
                                                    this.state.optionsRdti || [
                                                      { name: 'Select', value: '' },
                                                      { name: '15 mins', value: '15' },
                                                      { name: '30 mins', value: '30' },
                                                      { name: '1 hour', value: '60' },
                                                    ]
                                                  ).map(item => ({
                                                    label: item.name,
                                                    value: item.value,
                                                  })),
                                                ]}
                                                value={this.state.optionsRdti}
                                                onChange={(field, value) => this.setState({ rdti: value.value, rdtiError: !value.value })}
                                              />
                                              {(this.state.rdtiError) ?
                                                <small
                                                  className="help-block"
                                                  style={{
                                                    color: '#eb0000',
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                    position: 'absolute',
                                                    top: '65%',
                                                  }}
                                                >
                                                  {this.state.rdtiError ? 'RDTI is required!' : 'Invalid RDTI'}
                                                </small>
                                                : null}
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              width: '100%',
                                              height: '100%',
                                              height: '40px',
                                              marginBottom: '35px',
                                            }}
                                          >
                                            <label style={{ fontWeight: '400', fontSize: '14px', width: '60px' }}>
                                              {'PDTI: '}
                                            </label>
                                            <div
                                              className="flex flex-row"
                                              style={{ width: '100%', position: 'relative' }}
                                            >
                                              <SelectCustom
                                                field={{
                                                  name: 'rdti',
                                                }}
                                                name="rdti"
                                                options={[
                                                  ...(
                                                    this.state.optionsPdti || [
                                                      { name: 'Select',  value: '' },
                                                      { name: '15 mins', value: '15' },
                                                      { name: '30 mins', value: '30' },
                                                      { name: '1 hour',  value: '60' },
                                                      { name: '6 hour',  value: '360' },
                                                      { name: '12 hour', value: '720' },
                                                      { name: '24 hour', value: '1440' },
                                                    ]
                                                  ).map(item => ({
                                                    label: item.name,
                                                    value: item.value,
                                                  })),
                                                ]}
                                                value={this.state.optionsPdti}
                                                onChange={(field, value) => this.setState({ pdti: value.value, pdtiError: !value.value })}
                                              />
                                              {(this.state.pdtiError) ?
                                                <small
                                                  className="help-block"
                                                  style={{
                                                    color: '#eb0000',
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                    position: 'absolute',
                                                    top: '65%',
                                                  }}
                                                >
                                                  {this.state.pdtiError ? 'PDTI is required!' : 'Invalid PDTI!'}
                                                </small>
                                                : null}
                                            </div>
                                          </div>
                                          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <button
                                              className="button-btn w-80 mr-15"
                                              style={{
                                                outline: 'unset',
                                                border: 'unset',
                                              }}
                                              onClick = {async () => {
                                                if (!this.state.rdti || !this.state.pdti) {
                                                  if (!this.state.rdti) {
                                                    this.setState({ rdtiError: true });
                                                  }
                                                  if (!this.state.pdti) {
                                                    this.setState({ pdtiError: true });
                                                  }
                                                  return;
                                                }
                                                if (!!this.state.pdti && !!this.state.rdti) {
                                                  this.setState({ loading: true });
                                                  const data = {};
                                                  data.uid = this.state.selectedData.uid;
                                                  data.cmd = 'CFG';
                                                  data.data = { rdti: this.state.rdti, pdti: this.state.pdti };

                                                  const response = await sendCommand(data);
                                                  if (response.success === true) {
                                                    const mid = response?.response;
                                                    this.setState({ loading: false });
                                                    Swal.fire(
                                                      'Done!',
                                                      'MID ' + mid + ' is sent successfully. Check process logs for more information.',
                                                      'success',
                                                    )
                                                      .then(() => {
                                                        this.setState({ openSetTimeIntervalDialog: false });
                                                        window.location.href = window.location.href;
                                                      });
                                                  } else {
                                                    this.setState({ loading: false });
                                                    Swal.fire(
                                                      'Error!',
                                                      response.message || response.errorDescription || '',
                                                      'error',
                                                    );
                                                  }
                                                } else {
                                                  Swal.fire('Oops...', 'Some thing went wrong!', 'error');
                                                }
                                              }}
                                            >
                                              {'SAVE'}
                                            </button>
                                            <button
                                              className="button-btn w-80 mr-15"
                                              style={{
                                                outline: 'unset',
                                                border: 'unset',
                                              }}
                                              onClick={() => {
                                                this.setState({ openSetTimeIntervalDialog: false, rdtiError: false, pdtiError: false });
                                              }}
                                            >
                                              {'CANCEL'}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                        <div className="row mt-3"
                                             style={{
                                               marginLeft: '0px',
                                               marginRight: '0px',
                                             }}
                                        >
                                            <div className="col-sm-12 col-md-5">
                                            </div>
                                            <div className="col-sm-12 col-md-7 pagination" style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                                                { this.state.totalRecords > this.state.pageSize && this.state.totalPages >= 2 &&
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
                                <>
                                    <div
                                      style={{
                                        padding: '15px',
                                        borderBottom: '1px solid #ddd',
                                        paddingTop: '20px',
                                        paddingBottom: '20px',
                                        pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                                      }}
                                    >
                                        <div
                                          className={`site-title flex-column align-items-start justify-content-center ${!!this.state.selectedData && 'h-80'}`}
                                          style={{ transition: 'all 0.2s' }}
                                        >
                                          <span>{'Process Log'}</span>
                                          <span style={{ color: '#000000', fontSize: '14px', fontWeight: 300, display: this.state.selectedData ? 'flex' : 'none' }}>
                                            {this.state.selectedData ? 'Selected ' : ''}
                                            {this.state.selectedData?.msn ? 'MSN: ' + this.state.selectedData?.msn + ', ' : ''}
                                            {this.state.selectedData?.uid ? 'UID: ' + this.state.selectedData?.uid : ''}
                                          </span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                          <div
                                            style={{
                                              display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'flex' : 'none',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              height: '100%',
                                              transition: 'all 0.2s ease',
                                              width: 'calc(100%)',
                                            }}
                                            className="box-log"
                                          >

                                            <div
                                              style={{ display: 'flex', alignItems: 'center' }}
                                              className="log"
                                            >
                                              <span style={{ marginLeft: '20px', marginRight: '10px' }}>{'From date:'}</span>
                                              <DatePicker
                                                className="date-picker"
                                                dateFormat="yyyy-MM-dd"
                                                key={this.state.key1}
                                                selected={this.state.proFromDate || ''}
                                                placeholderText={"YYYY-MM-DD"}
                                                onChange={(date:Date) => this.setState({ proFromDate: date })}
                                              />
                                            </div>
                                            <div
                                              style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}
                                            >
                                              <span style={{ marginLeft: '20px', marginRight: '10px' }}>{'To date:'}</span>
                                              <DatePicker
                                                className="date-picker"
                                                dateFormat="yyyy-MM-dd"
                                                key={this.state.key2}
                                                selected={this.state.proToDate || ''}
                                                placeholderText={"YYYY-MM-DD"}
                                                onChange={(date:Date) => this.setState({ proToDate: date })}
                                              />
                                            </div>
                                            <div
                                              style={{display: 'flex'}}
                                              className="log"
                                            >
                                              <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '30px',
                                                  width: '30%', minWidth: '30%',
                                                  //maxWidth: '30%',
                                                  paddingLeft: '10px',
                                                  marginLeft: '30px',
                                                  alignSelf: 'center',
                                                }}
                                                type="text"
                                                value={ this.state.searchCommand || '' }
                                                placeholder="Search COMMAND..."
                                                onChange={event => this.setState({ searchCommand: event.target.value })}
                                              />
                                            </div>
                                            <div
                                              style={{display: 'flex'}}
                                              className="log"
                                            >
                                              <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '30px',
                                                  width: '30%', minWidth: '30%',
                                                  // maxWidth: '30%',
                                                  paddingLeft: '10px',
                                                  marginLeft: '30px',
                                                  alignSelf: 'center',
                                                }}
                                                type="text"
                                                value={ this.state.searchTopic || '' }
                                                placeholder="Search TOPIC..."
                                                onChange={event => this.setState({ searchTopic: event.target.value })}
                                              />
                                            </div>
                                            <div
                                              style={{display: 'flex'}}
                                              className="log"
                                            >
                                              <input
                                                style={{
                                                  border: '1px solid #00000020',
                                                  borderRadius: '5px',
                                                  outline: 'unset',
                                                  height: '30px',
                                                  width: '30%', minWidth: '30%',
                                                  // maxWidth: '30%',
                                                  paddingLeft: '10px',
                                                  marginLeft: '30px',
                                                  alignSelf: 'center',
                                                }}
                                                type="number"
                                                value={ this.state.searchMid || '' }
                                                placeholder="Search MID..."
                                                onChange={event => this.setState({ searchMid: event.target.value })}
                                              />
                                            </div>


                                            <div className="checkbox-container"
                                              style={{
                                                  height: '30px',
                                                  marginBottom: '10px',
                                                  marginLeft: '10px',
                                                  color: '#76838f',
                                                  fontSize: '300px',
                                              }}
                                            >
                                              <input
                                                type="checkbox"
                                                id="log-has-error"
                                                name="log-has-error"
                                                checked={!!this.state.searchLogError}
                                                value={this.state.searchLogError}
                                                onChange={(event) => {
                                                  if (!!event.target.checked) {
                                                    this.setState({
                                                      searchLogError: true
                                                    });
                                                  } else {
                                                    this.setState({
                                                      searchLogError: false
                                                    });
                                                  }
                                                }}
                                              />
                                              <span style={{ marginLeft: '5px' }}>{'Error'}</span>
                                            </div>

                                          </div>
                                        </div>
                                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
                                        <div
                                          style={{
                                            display: (this.state.relatedLogs?.length > 0 || !!this.state.search) ? 'inherit' : 'none',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            height: '100%',
                                            transition: 'all 0.2s ease',
                                            width: 'calc(100% - 215px)',
                                          }}
                                        >
                                          <button
                                            className="button-btn w-80 ml-15"
                                            style={{
                                              outline: 'unset',
                                              border: 'unset',
                                            }}
                                            onClick={async () => {
                                              const params = {
                                                options: {
                                                  uid: this.state.selectedData.uid,
                                                  msn: this.state.selectedData.msn,
                                                  mid:  this.state.searchMid,
                                                  ptype: this.state.searchCommand,
                                                  topic: this.state.searchTopic,
                                                  fromDate: !!this.state.proFromDate ? moment(this.state.proFromDate.toLocaleDateString()).startOf('day').valueOf() : undefined,
                                                  toDate: !!this.state.proToDate ? moment(this.state.proToDate.toLocaleDateString()).endOf('day').valueOf() : undefined,
                                                  isError: !!this.state.searchLogError,
                                                },
                                                limit: 20,
                                                offset: 0,
                                              };
                                              const rp = await getRelatedLogs(params);
                                              this.setState({
                                                relatedLogs: rp?.response?.results || [],
                                                totalRecordsRelatedLog: rp?.response?.totalRows,
                                                totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
                                                pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                                                pageSizeRelatedLog: 20,
                                                search: true,
                                              });
                                            }}
                                          >
                                            {'SEARCH'}
                                          </button>
                                          <button
                                            className="button-btn w-80 ml-15"
                                            style={{
                                              outline: 'unset',
                                              border: 'unset',
                                            }}
                                            onClick={async () => {
                                              const params = {
                                                options: {
                                                  uid: this.state.selectedData.uid,
                                                  msn: this.state.selectedData.msn,
                                                },
                                                limit: 20,
                                                offset: 0,
                                              };

                                              const rp = await getRelatedLogs(params);
                                              this.setState({
                                                searchMid: undefined,
                                                searchCommand: undefined,
                                                search: true,
                                                proFromDate: undefined,
                                                proToDate: undefined,
                                                relatedLogs: rp?.response?.results || [],
                                                totalRecordsRelatedLog: rp?.response?.totalRows,
                                                totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
                                                pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                                                pageSizeRelatedLog: 20,
                                                key1: Math.random(),
                                                key2: Math.random(),
                                              });
                                            }}
                                          >
                                            {'CLEAR'}
                                          </button>
                                          <button
                                            className="button-btn w-80 ml-15"
                                            style={{
                                              outline: 'unset',
                                              border: 'unset',
                                              minWidth: '150px',
                                            }}
                                            onClick={async () => {
                                              const params = {
                                                options: {
                                                  downloadCsv: true,
                                                  uid: this.state.selectedData.uid,
                                                  msn: this.state.selectedData.msn,
                                                  mid:  this.state.searchMid,
                                                  ptype: this.state.searchCommand,
                                                  fromDate: !!this.state.proFromDate ? moment(this.state.proFromDate.toLocaleDateString()).startOf('day').valueOf() : undefined,
                                                  toDate: !!this.state.proToDate ? moment(this.state.proToDate.toLocaleDateString()).endOf('day').valueOf() : undefined,
                                                },
                                                limit: 20,
                                                offset: 0,
                                              };
                                              const url = 'api/logs';
                                              const method = 'POST';
                                              const rp = await fetch(url, {
                                                method,
                                                body: JSON.stringify(params),
                                                headers: {
                                                  'Content-Type' : 'application/json',
                                                },
                                              })
                                                .then((response) => {
                                                  return response.blob();
                                                });
                                              if (rp) {
                                                const tag =  moment(new Date()).format('YYYYMMDDHHmmss');
                                                const fileName = 'logs-' + tag + '.csv';
                                                const url = window.URL.createObjectURL(new Blob([rp]));
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.setAttribute('download', fileName);
                                                document.body.appendChild(link);
                                                link.click();
                                                link.parentNode.removeChild(link);
                                                this.setState({ openExportCsv: false, activateDate: undefined });
                                              } else {
                                                alert('Something went wrong. Please try again!');
                                              }
                                            }}
                                          >
                                            {'EXPORT CSV'}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                        style={{
                                          display: 'flex',
                                          flex: 1,
                                          flexDirection: 'row',
                                          background: '#fff',
                                          pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                                        }}
                                        className="doctor-list"
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th className="table-th" scope="col">TIME</th>
                                                        <th className="table-th" scope="col">TYPE</th>
                                                        <th className="table-th" scope="col">TOPIC</th>
                                                        <th className="table-th" scope="col">MID</th>
                                                        <th className="table-th" scope="col">COMMAND</th>
                                                        <th className="table-th" scope="col">VIEW MESSAGE</th>
                                                        <th className="table-th" scope="col">HANDLE DESC</th>
                                                        <th className="table-th" scope="col">STATUS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {(this.state.relatedLogs || [])
                                                    .map((it, index) => {

                                                      try {
                                                          it.rawObj = JSON.parse(it.raw);
                                                          if (it.type === 'SUBSCRIBE' && it.ptype === 'INF' && !window.showINF) {
                                                            console.info('it', it, this.state.selectedData)
                                                            window.showINF = true;
                                                          }
                                                      } catch(err) {}
                                                      // it.rawObj = it.rawObj || {};
                                                      // it.rawObj.header = it.rawObj.header || {};
                                                      return (
                                                          <tr
                                                              key={index}
                                                              style={{
                                                                cursor: 'pointer',
                                                                backgroundColor:  this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                                                                color: '#000000',
                                                              }}
                                                              onClick={() => {
                                                                if (!this.state.showRawMessage) {
                                                                  this.setState({ selectedLog: index });
                                                                }
                                                              }}
                                                          >
                                                              <td className="table-td">
                                                                  {moment(it.createDate).format('YY-MM-DD HH:mm:ss')}
                                                              </td>
                                                              <td className="table-td">
                                                                  {it.type}
                                                              </td>
                                                              <td className="table-td">
                                                                  {it.topic}
                                                              </td>
                                                              <td className="table-td">
                                                                  <span>{it.mid || it.oid || it.rmid || it?.rawObj?.header?.oid || it?.rawObj?.header?.mid}</span>
                                                              </td>
                                                              <td className="table-td">
                                                                  <span>{it.ptype}</span>
                                                              </td>
                                                              <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                                                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                                  <div
                                                                      className="button-icon ml-15"
                                                                      data-tip="Click to see raw message"
                                                                      style={{
                                                                        color: ((!!it.rawObj?.header?.status && it.rawObj?.header?.status != 0) ? 'red' : undefined)
                                                                      }}
                                                                      onClick={() => {
                                                                        if (!this.state.showRawMessage) {
                                                                            this.setState({
                                                                                showRawMessage: true,
                                                                                rawMessage: it.raw,
                                                                              });
                                                                          }
                                                                      }}
                                                                  >
                                                                    <IoMailUnreadOutline />
                                                                  </div>
                                                              </td>
                                                              <td style={{ padding: '3px', paddingLeft: '30px' }}>
                                                                  {(!!it.handleSubscribeDesc && it.type === 'SUBSCRIBE') && (
                                                                    <>
                                                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                                      <div
                                                                          className="button-icon ml-15"
                                                                          data-tip="Click to see handle subscribe description"
                                                                          style={{
                                                                            color: ((!!it.rawObj?.header?.status && it.rawObj?.header?.status != 0) ? 'red' : undefined)
                                                                          }}
                                                                          onClick={() => {
                                                                            if (!this.state.handleSubscribeDesc) {
                                                                                this.setState({
                                                                                    handleSubscribeDesc: it.handleSubscribeDesc,
                                                                                });
                                                                              }
                                                                          }}
                                                                      >
                                                                        <IoMailUnreadOutline />
                                                                      </div>
                                                                    </>
                                                                  )}

                                                              </td>
                                                              <td className="table-td">
                                                                <div>
                                                                  { it.status === 0 ? 'OK'
                                                                  : it.status === 1 ? 'Invalid Format'
                                                                  : it.status === 2 ? 'Invalid Command'
                                                                  : it.status === 3 ? 'Invalid Signature'
                                                                  : it.status === 4 ? 'Decryption Failed'
                                                                  : it.status === 5 ? 'Invalid Configuration'
                                                                  : it.status === 8 ? 'Failed send to device (Gateway)'
                                                                  : it.status === 9 ? 'General Error'
                                                                  : (it.type === 'PUBLISH' && !!it.statusDesc && it.status !== null) ? (it.statusDesc === 'OK' ? 'OK' : (
                                                                      <div
                                                                        className="button-icon"
                                                                        data-tip="Click to see status"
                                                                        style={{
                                                                          marginLeft: '-7.5px',
                                                                          color: (it.ptype === 'MDT' && it.rawObj?.header?.status == -1 ? 'red' : undefined)
                                                                        }}
                                                                        onClick={async () => {
                                                                          await this.setState({loading: true})
                                                                          this.setState({
                                                                            publishStatus: it.statusDesc,
                                                                            loading: false,
                                                                          });
                                                                        }}
                                                                      >
                                                                        <IoMailUnreadOutline />
                                                                      </div>
                                                                    ))
                                                                  : ((it.type === 'SUBSCRIBE' && it.ptype === 'MDT'
                                                                      && moment(it.createDate).toDate().getTime() > 1637589664227)
                                                                      ? (
                                                                          it.repStatus === 1
                                                                          ?
                                                                          'OK'
                                                                          :
                                                                          <div
                                                                              className="button-icon"
                                                                              data-tip="Click to see status"
                                                                              style={{marginLeft: '-7.5px', color: (this.state.selectedData.msn === it.rawObj?.header?.msn ? undefined : 'red')}}
                                                                              onClick={async () => {
                                                                                  await this.setState({loading: true})
                                                                                  let rp = await getPiLogs({msn: it.msn, mid: it.mid})
                                                                                  this.setState({
                                                                                      mdtPiStatus: rp?.response || [],
                                                                                      mdtPiStatusMessage: this.state.selectedData.msn === it.rawObj?.header?.msn ? '' : ('Meter SN mismatch(' + this.state.selectedData.msn + ' != ' + it.rawObj?.header?.msn + ')'),
                                                                                      loading: false,
                                                                                  });
                                                                              }}
                                                                          >
                                                                            <IoMailUnreadOutline />
                                                                          </div>
                                                                      )
                                                                  : (it.type === 'SUBSCRIBE' && it.ptype === 'INF')
                                                                      ? (
                                                                          (!!this.state.selectedData.msn && !!it.rawObj?.header?.msn && it.rawObj?.header?.msn !== this.state.selectedData.msn)
                                                                          ?
                                                                          'Err: the MSN mismatch'
                                                                          :
                                                                          ''
                                                                      )
                                                                  : null)}
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
                                              <div className="col-sm-12 col-md-7 pagination" style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                                                { this.state.totalRecordsRelatedLog > this.state.pageSizeRelatedLog && this.state.totalPagesRelatedLog >= 2 &&
                                                <Pagination
                                                  href={this.props.asPath.replace(/\?.*/g, '')}
                                                  totalRecords={this.state.totalRecordsRelatedLog}
                                                  totalPages={this.state.totalPagesRelatedLog}
                                                  onPageChanged={async (query) => {
                                                    const params = {
                                                      options: {
                                                        uid: this.state.selectedData.uid,
                                                        msn: this.state.selectedData.msn,
                                                        mid: this.state.searchMid,
                                                        fromDate: !!this.state.searchFromDate ? moment(this.state.searchFromDate).startOf('day').valueOf() : undefined,
                                                        toDate: !!this.state.searchToDate ? moment(this.state.searchToDate).endOf('day').valueOf() : undefined,
                                                      },
                                                      limit: 20,
                                                      offset: (query.pageIndex - 1) * 20,
                                                    };
                                                    const rp = await getRelatedLogs(params);
                                                    this.setState({
                                                      relatedLogs: rp?.response?.results || [],
                                                      totalRecordsRelatedLog: rp?.response?.totalRows,
                                                      totalPagesRelatedLog: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
                                                      pageIndexRelatedLog: Math.floor((rp?.response?.offset + 19) / 20) + 1,
                                                      pageSizeRelatedLog: 20,
                                                      search: true,
                                                    });
                                                  }}
                                                  pageIndex={this.state.pageIndexRelatedLog}
                                                  pageSize={this.state.pageSizeRelatedLog}
                                                  styleItemActive={{ backgroundColor: 'green', color: '#ffffff' }}
                                                />
                                                }
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </> :null}
                        </div>

                      {!!this.state.rlsComment?.open && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '30%',
                            left: '35%',
                            zIndex: 10,
                            width: '30%',
                            height: '36%',
                            borderRadius: '5px',
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                            color: '#000000',
                            justifyContent: 'space-between',
                            minHeight: '320px',
                            minWidth: '333px'
                          }}
                        >
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                            {'Enter comment for sending this command to devices'}
                          </span>
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                            {'Command: '}{this.state.rlsComment.command}
                          </span>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                              <div style={{width: '135px'}}>{'Comment:'}</div>
                              <textarea
                                style={{
                                  border: '1px solid #00000020',
                                  borderRadius: '5px',
                                  outline: 'unset',
                                  maxHeight: '140px',
                                  width: '400px',
                                  paddingLeft: '10px',
                                  flex: 1
                                }}
                                rows={4}
                                value={this.state.rlsComment.comment || ""}
                                onChange={(event) => {
                                  this.setState({
                                    rlsComment: {
                                      ...this.state.rlsComment,
                                      comment: event.target.value
                                    }
                                  });
                                }}
                                placeholder={'Comment'}
                              />
                            </div>
                          </div>
                          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                            <button
                              className="button-btn w-80"
                              style={{
                                alignSelf: 'center',
                                border: 'unset',
                                outline: 'unset',
                                marginRight: '10px'
                              }}
                              onClick={async () => {
                                if (!this.state.rlsComment.comment) {
                                  Swal.fire(
                                    'Error!',
                                    'Please enter comment for sending this command to devices',
                                    'error',
                                  );
                                  return;
                                }
                                this.setState({ loading: true });
                                let params = {};
                                params.options = this.getFilters();

                                for (let key in params.options) {
                                  if (params.options[key] !== null && params.options[key] !== undefined) {
                                    if (key === 'fromDate' || key === 'toDate') {
                                      params.options[key] = new Date(params.options[key].replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime();
                                    } else {
                                      params.options[key] = params.options[key] + '';
                                    }
                                  }
                                }

                                params.command = this.state.rlsComment.command;
                                params.options.comment = this.state.rlsComment.comment;
                                params.options.queryAllDate = params.options.allDate + '';
                                delete params.options.allDate;
                                const response = await sendRLSCommandForDevices(params);
                                this.setState({ loading: false });

                                if (!!response?.success && !!response.response) {
                                  const result = await Swal.fire({
                                    html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>
                                            <p style='text-align: center; font-size: 14px;'>${'Click go to result page button to see result. Click Cancel to close this popup'}</p>`,
                                    icon: 'success',
                                    confirmButtonText: 'Go to result page',
                                    cancelButtonText: 'Cancel',
                                    showCancelButton: true,
                                  });
                                  if (!result || !result.isConfirmed) {
                                    this.setState({
                                      rlsComment: undefined,
                                    });
                                    return;
                                  }
                                  require('@app/utils/next-routes').Router.pushRoute('/relay-status-command-logs?queryBatchUuid=' + response.response)
                                } else {
                                  await Swal.fire({
                                    html: `<p style='text-align: center; font-size: 14px;'>${response.message || 'Something went wrong!'}</p>`,
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                  });
                                }
                                this.setState({
                                  rlsComment: undefined,
                                });
                              }}
                            >
                              {'Send'}
                            </button>
                            <button
                              className="button-btn w-80"
                              style={{
                                alignSelf: 'center',
                                border: 'unset',
                                outline: 'unset',
                              }}
                              onClick={() => {
                                this.setState({
                                  rlsComment: undefined,
                                });
                              }}
                            >
                              {'Cancel'}
                            </button>
                          </div>
                        </div>
                      )}

                      {!!this.state.openDetails && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            zIndex: 10,
                            width: '100%',
                            height: '100%',
                            border: '1px solid',
                            borderRadius: '3px',
                            padding: '60px 15px 0px 100px',
                            overflowY: 'scroll',
                            pointerEvents: !!this.state.replaceDevice ? "none" : null,
                          }}
                        >
                          <div
                            style={{
                              height: '50px',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: '#eff1f3',
                              padding: '10px',
                              borderRadius: '5px',
                            }}
                          >
                            <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>
                              {'eSIM Meter Device Details'}
                            </span>
                            <button
                              type="button"
                              className="button-btn w-80"
                              onClick={() => {
                                this.setState({
                                  openDetails: false,
                                  detailsData: null,
                                  updated: undefined,
                                  updatedGroup: undefined,
                                  updatedVendor: undefined,
                                  updatedProject: undefined,
                                  updatedIeIs: undefined,
                                });
                              }}
                            >
                              <span>{'BACK'}</span>
                            </button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px',}}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                              <span
                                style={{
                                  backgroundColor: '#cce7fe',
                                  color: '#1b4f8c',
                                  border: '1px solid #c0e0fe',
                                  borderRadius: '5px',
                                  height: '70px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: '18px',
                                  fontWeight: 400,
                                  paddingLeft: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                {'eSIM Details'}
                              </span>
                              <table>
                                <thead>
                                  <tr>
                                    <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {'eSIM ID (ICCID)'}
                                    </th>
                                    <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {'MSISDN'}
                                    </th>
                                    <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {'Activation date'}
                                    </th>
                                    <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {'Status'}
                                    </th>
                                    <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {'StateChangeTime'}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {this.state.detailsData.cid}
                                    </th>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {this.state.detailsData.msiSdn}
                                    </th>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {!!this.state.detailsData.activationDate ? moment(new Date(this.state.detailsData.activationDate)).format('DD/MM/YYYY HH:mm:ss') : ''}
                                    </th>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {this.state.detailsData.msisdnstatus}
                                    </th>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                      {this.state.detailsData.msisdnstateChangeTime}
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div style={{ width: '20%' }}>
                              {(this.state.detailsData.status === 'ONLINE' || this.state.detailsData.status === 'OFFLINE') && (
                                <div
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      height: '80px',
                                      width: '80px',
                                      borderRadius: '50%',
                                      backgroundColor: this.state.detailsData.status === 'ONLINE' ? '#4cdb7e' : '#db4c4c',
                                      marginBottom: '10px',
                                    }}
                                  >
                                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF' }}>
                                      {this.state.detailsData.status}
                                    </span>
                                  </div>
                                  {!!this.state.detailsData.lastSubscribeDatetime && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                      <span style={{ fontSize: '15px', fontWeight: 500, color: '#000000' }}>{'Last seen alive'}</span>
                                      <span style={{ fontSize: '15px', fontWeight: 500, color: '#000000'  }}>
                                      {moment(new Date(this.state.detailsData.lastSubscribeDatetime)).format('DD/MM/YYYY HH:mm:ss')}
                                    </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', overflow: 'visible' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'MCU Module Details'}
                              {!!this.state.detailsData?.isReplaced && (
                                <span style={{color: 'red', marginLeft: '20px', fontSize: '14px'}}>{'This MCU is replaced. Old MCU SN: '}{this.state.detailsData.oldSn}</span>
                              )}
                            </span>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '100%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div style={{display: 'flex', justifyContent: 'row'}}>
                                    <div style={{flex: 1}}>
                                      <span>
                                        {'MCU Tags'}
                                      </span>
                                    </div>
                                    <div>
                                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <div
                                          className='button-btn mr-15'
                                          onClick={async () => {
                                            this.updateDevice('SYNC_TAG_MCU', 'Sync tag MCU. ');
                                          }}
                                        >
                                          <span>{'Sync tag'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                      marginBottom: '5px',
                                    }}
                                    className="box-item"
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        width: '100%'
                                      }}
                                      className="item"
                                    >
                                      <Select
                                        className="select-vendor w-full"
                                        components={animatedComponents}
                                        value={
                                          this.state.updatedMcuProject || (this.state.detailsData.mcuProjectTags || []).map(tag => {
                                            return {
                                              value: tag.id,
                                              label: tag.name
                                            }
                                          })
                                        }
                                        options={this.state.projectTags || []}
                                        onChange={(event) => {
                                          this.setState({ updatedMcuProject: event });
                                        }}
                                        isMulti
                                        isDisabled ={!(this.props.userInfo.authorities || []).filter(r => r.authority === 'SUPER_ADMIN').length}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'MCU SN (QR Code)'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'MCU UUID'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '160px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Enrolment date'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '100px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'OID Reset Time'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'MCU Vendor Type'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '130px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Device csr'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Version'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'P1 Online'}
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {this.state.detailsData.sn}
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {this.state.detailsData.uid}
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {!!this.state.detailsData.enrollmentDatetime ? moment(new Date(this.state.detailsData.enrollmentDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {this.state.detailsData.midResetTime || 0}
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span style={{display: 'flex', flexDirection: 'column'}}>
                                        <span style={{minWidth: '120px',display: 'inline-block',}}>{'Vendor name: '}</span>
                                        <span style={{fontWeight: 'bold'}}>{this.state.detailsData?.vendor?.name}</span>
                                    </span>
                                    <span style={{display: 'flex', flexDirection: 'column'}}>
                                        <span style={{minWidth: '120px',display: 'inline-block',}}>{'Signature Algorithm: '}</span>
                                        <span style={{fontWeight: 'bold'}}>{this.state.detailsData?.vendor?.signatureAlgorithm || ''}</span>
                                    </span>
                                    <span style={{display: 'flex', flexDirection: 'column'}}>
                                        <span style={{minWidth: '120px',display: 'inline-block',}}>{'Key Type: '}</span>
                                        <span style={{fontWeight: 'bold'}}>{this.state.detailsData?.vendor?.keyType || ''}</span>
                                    </span>
                                  </div>
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span style={{display: 'flex', flexDirection: 'column'}}>
                                        <span style={{minWidth: '120px',display: 'inline-block',}}>{'Signature Algorithm: '}</span>
                                        <span style={{fontWeight: 'bold'}}>{this.state.detailsData?.deviceCsrSignatureAlgorithm || ''}</span>
                                    </span>
                                    <span style={{display: 'flex', flexDirection: 'column'}}>
                                        <span style={{minWidth: '120px',display: 'inline-block',}}>{'Device Key Type: '}</span>
                                        <span style={{fontWeight: 'bold'}}>{this.state.detailsData?.deviceKeyType || ''}</span>
                                    </span>
                                  </div>
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {this.state.detailsData.ver}
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span>
                                        <span style={{minWidth: '120px',display: 'inline-block',}}>{'P1 Online status: '}</span>
                                        <span style={{fontWeight: 'bold'}}>{this.state.detailsData.p1Online || 'P1 Unknown'}</span>
                                    </span>
                                    {!!this.state.detailsData.p1OnlineLastUserSent &&
                                        <span>
                                            <span style={{minWidth: '120px',display: 'inline-block',}}>{'Sent by: '}</span>
                                            <span style={{fontWeight: 'bold'}}>{this.state.detailsData.p1OnlineLastUserSent || 'Unknown'}</span>
                                        </span>
                                    }
                                    {!!this.state.detailsData.p1OnlineLastSent &&
                                        <span>
                                            <span style={{minWidth: '120px',display: 'inline-block',}}>{'Last sent: '}</span>
                                            <span style={{fontWeight: 'bold'}}>{moment(new Date(this.state.detailsData.p1OnlineLastSent)).format('DD/MM/YYYY HH:mm:ss') || 'Unknown'}</span>
                                        </span>
                                    }
                                    {!!this.state.detailsData.p1OnlineLastReceived &&
                                        <span>
                                            <span style={{minWidth: '120px',display: 'inline-block',}}>{'Last received: '}</span>
                                            <span style={{fontWeight: 'bold'}}>{moment(new Date(this.state.detailsData.p1OnlineLastReceived)).format('DD/MM/YYYY HH:mm:ss') || 'Unknown'}</span>
                                        </span>
                                    }
                                  </div>
                                </th>
                              </tr>
                              </tbody>
                            </table>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '100%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div style={{display: 'flex', justifyContent: 'row'}}>
                                    <div style={{flex: 1}}>
                                      <span>
                                        Type Info
                                      </span>
                                    </div>
                                  </div>
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                      marginBottom: '5px',
                                    }}
                                    className="box-item"
                                  >
                                    Type: {this.state.detailsData.enrollType}
                                  </div>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '50px',
                                marginTop: '10px',
                                marginBottom: '0px',
                              }}
                            >
                              {!!(this.props.userInfo.authorities || []).filter(r => r.authority === 'SUPER_ADMIN')[0] && (
                                <div
                                  style={{ marginRight: '10px', width: '200px' }}
                                  className='button-btn'
                                  onClick={() => {
                                    this.setState({replaceDevice: true});
                                  }}
                                >
                                  <span>{'Replace this device'}</span>
                                </div>
                              )}
                              {!!(this.props.userInfo.authorities || []).filter(r => r.authority === 'R_P1')[0] && (
                                <div
                                  style={{ marginRight: '10px' }}
                                  className={!!this.state.updated || !!this.state.updatedGroup ? 'button-btn' : 'btn btn-secondary'}
                                  onClick={async () => {
                                    const data = {};
                                    data.uid = this.state.detailsData.uid;
                                    data.cmd = 'ECH';
                                    data.type = 'ECH_P1_ONLINE_TEST';

                                    this.setState({ loading: true });
                                    const response = await sendCommand(data);
                                    if (response.success === true) {
                                      const mid = response?.response;
                                      try {
                                        let deviceDetail = await getAllDevices({
                                          options: {
                                            queryUuid: this.state.detailsData.uid
                                          },
                                          offset: 0,
                                          limit: 1,
                                        });
                                        this.state.detailsDataOriginal.p1Online = deviceDetail.response.results[0].p1Online;
                                        this.state.detailsDataOriginal.p1OnlineLastUserSent = deviceDetail.response.results[0].p1OnlineLastUserSent;
                                        this.state.detailsDataOriginal.p1OnlineLastSent = deviceDetail.response.results[0].p1OnlineLastSent;
                                        this.state.detailsDataOriginal.p1OnlineLastReceived = deviceDetail.response.results[0].p1OnlineLastReceived;

                                        this.state.detailsData.p1Online = deviceDetail.response.results[0].p1Online;
                                        this.state.detailsData.p1OnlineLastUserSent = deviceDetail.response.results[0].p1OnlineLastUserSent;
                                        this.state.detailsData.p1OnlineLastSent = deviceDetail.response.results[0].p1OnlineLastSent;
                                        this.state.detailsData.p1OnlineLastReceived = deviceDetail.response.results[0].p1OnlineLastReceived;
                                      } catch(err) {
                                      }
                                      this.setState({ loading: false });
                                      Swal.fire(
                                        'Done!',
                                        'MID ' + mid + ' is sent successfully. Please re open this page, check process logs for more information.',
                                        'success',
                                      )
                                      .then(() => {

                                      });
                                    } else {
                                      this.setState({ loading: false });
                                      Swal.fire(
                                        'Error!',
                                        response.message || response.errorDescription || '',
                                        'error',
                                      );
                                    }
                                  }}
                                >
                                  <span>{'P1 Online Test'}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {!!this.state.replaceDevice && (
                            <div
                              style={{
                                position: 'fixed',
                                width: '35%',
                                height: '50%',
                                padding: '30px',
                                top: '20%',
                                left: '35%',
                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                                background: '#ffffff',
                                zIndex: 100,
                                color: '#000000',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                pointerEvents: 'all'
                              }}
                            >
                              <div style={{fontWeight: 400, fontSize: '18px'}}>{'Replace old device by new device'}</div>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '5px',
                                  }}
                                >
                                  <div style={{width: '170px'}}>{'MCU UUID: '}</div>
                                  <div style={{paddingLeft: '5px'}}>{this.state.detailsData.uid}</div>
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
                                    flexDirection: 'row',
                                    marginBottom: '5px',
                                  }}
                                >
                                  <div style={{width: '170px'}}>{'Old MCU SN (QR code): '}</div>
                                  <div style={{paddingLeft: '5px'}}>{this.state.detailsData.sn}</div>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <div style={{width: '170px'}}>{'New MCU SN (QR code): '}</div>
                                  <input
                                    style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                                    value={this.state.newSn || ""}
                                    onChange={(event) => {
                                      if (!event.target.value) {
                                        this.setState({newSnError: "New MCU SN is required!"});
                                      } else {
                                        this.setState({newSnError: undefined});
                                      }
                                      this.setState({newSn: event.target.value})
                                    }}
                                  />
                                </div>
                                {this.state.newSnError && (
                                  <small
                                    className="help-block"
                                    style={{
                                      color: '#eb0000',
                                      fontSize: '12px',
                                      fontWeight: 400,
                                      marginLeft: '170px'
                                    }}
                                  >
                                    {this.state.newSnError}
                                  </small>
                                )}
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
                                    flexDirection: 'row'
                                  }}
                                >
                                  <div style={{width: '170px'}}>{'Replace reason: '}</div>
                                  <textarea
                                    style={{
                                      border: '1px solid #00000020',
                                      borderRadius: '5px',
                                      outline: 'unset',
                                      maxHeight: '140px',
                                      paddingLeft: '10px',
                                      flex: 1
                                    }}
                                    rows={4}
                                    value={this.state.replaceReason || ""}
                                    onChange={(event) => {
                                      if (!event.target.value) {
                                        this.setState({replaceReasonError: "Replace reason is required!"});
                                      } else {
                                        this.setState({replaceReasonError: undefined});
                                      }
                                      this.setState({replaceReason: event.target.value})
                                    }}
                                    placeholder={'Replace reason'}
                                  />
                                </div>
                                {this.state.replaceReasonError && (
                                  <small
                                    className="help-block"
                                    style={{
                                      color: '#eb0000',
                                      fontSize: '12px',
                                      fontWeight: 400,
                                      marginLeft: '170px'
                                    }}
                                  >
                                    {this.state.replaceReasonError}
                                  </small>
                                )}
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
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <div style={{width: '170px'}}>{'Password:'}</div>
                                  <input
                                    style={{
                                      border: '1px solid #00000020',
                                      borderRadius: '5px',
                                      outline: 'unset',
                                      height: '40px',
                                      width: '300px',
                                      paddingLeft: '10px',
                                      flex: 1
                                    }}
                                    type="password"
                                    value={this.state.password || ""}
                                    onChange={(event) => {
                                      if (!event.target.value) {
                                        this.setState({passwordError: "Please enter login password to confirm replace!"});
                                      } else {
                                        this.setState({passwordError: undefined});
                                      }
                                      this.setState({ password: event.target.value });
                                    }}
                                    placeholder={'Password'}
                                  />
                                </div>
                                {this.state.passwordError && (
                                  <small
                                    className="help-block"
                                    style={{
                                      color: '#eb0000',
                                      fontSize: '12px',
                                      fontWeight: 400,
                                      marginLeft: '170px'
                                    }}
                                  >
                                    {this.state.passwordError}
                                  </small>
                                )}
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <div
                                  className='button-btn mr-15'
                                  onClick={async () => {
                                    if (!this.state.newSn || !this.state.replaceReason || !this.state.password) {
                                      if (!this.state.newSn) {
                                        this.setState({newSnError: 'New MCU SN is required!'});
                                      }
                                      if (!this.state.replaceReason) {
                                        this.setState({replaceReasonError: 'Replace reason is required!'});
                                      }
                                      if (!this.state.password) {
                                        this.setState({passwordError: 'Please enter login password to confirm replace!'});
                                      }
                                      return;
                                    }

                                    const res = await validateLoginPwd({ password: this.state.password });
                                    if (res && res.success === true) {
                                      this.updateDevice();
                                      this.setState({replaceDevice: true});
                                    } else {
                                      Swal.fire(
                                        'Error!',
                                        'Wrong password',
                                        'error',
                                      );
                                      return;
                                    }
                                  }}
                                >
                                  <span>{'Update'}</span>
                                </div>
                                <div
                                  className='button-btn'
                                  onClick={() => {
                                    this.setState({replaceDevice: false, newSn: undefined});
                                  }}
                                >
                                  <span>{'Close'}</span>
                                </div>
                              </div>
                            </div>
                          )}                          
                          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', overflow: 'unset' }}>
                            <span
                                style={{
                                  backgroundColor: '#cce7fe',
                                  color: '#1b4f8c',
                                  border: '1px solid #c0e0fe',
                                  borderRadius: '5px',
                                  height: '70px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: '18px',
                                  fontWeight: 400,
                                  paddingLeft: '10px',
                                  marginBottom: '10px',
                                }}
                            >
                              {'MCU Vendor Detail'}
                            </span>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '30%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Name'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '30%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Remark for MCU'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '70%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Description'}
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        marginBottom: '0px',
                                      }}
                                      className="box-item"
                                  >
                                    <div
                                        style={{
                                          display: 'flex',
                                          width: '100%',
                                          padding: '0px',
                                          marginBottom: '0px',
                                        }}
                                        className="item"
                                    >
                                      <Select
                                          className="select-vendor w-full"
                                          components={animatedComponents}
                                          value={this.state.updatedVendor || { value: this.state.detailsData?.vendor?.id, label: this.state.detailsData?.vendor?.name }}
                                          options={this.state.vendors || []}
                                          onChange={(event) => {
                                            if (!event.value) {
                                              this.setState({
                                                updatedVendor: undefined,
                                              });
                                            } else {
                                              this.setState({
                                                updatedVendor: event,
                                              });
                                            }
                                          }}
                                      />
                                    </div>
                                  </div>
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  <input
                                    value={this.state.detailsData?.remarkMCU}
                                    style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                    onChange={(event) => {
                                      this.setState({
                                        detailsData: { ...this.state.detailsData, remarkMCU: event.target.value },
                                      });
                                    }}
                                  />
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {this.state.updatedVendor?.value ? this.state.vendors.filter(vd => vd.value === this.state.updatedVendor.value)[0].description : this.state.detailsData.vendor.description}
                                </th>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', overflow: 'unset' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'Meter data IEI nodes configure'}
                            </span>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '100%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Name'}
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                      marginBottom: '5px',
                                    }}
                                    className="box-item"
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        width: '100%'
                                      }}
                                      className="item"
                                    >
                                      <Select
                                        className="select-vendor w-full"
                                        components={animatedComponents}
                                        value={
                                          this.state.updatedIeIs || (this.state.detailsData.deviceIEINodes || []).map(tag => {
                                            return {
                                              value: tag.ieiId,
                                              label: tag.ieiId
                                            }
                                          })
                                        }
                                        options={this.state.ieiIds || []}
                                        onChange={(event) => {
                                          this.setState({ updatedIeIs: event });
                                        }}
                                        isMulti
                                        isDisabled ={!(this.props.userInfo.authorities || []).filter(r => r.authority === 'SUPER_ADMIN').length}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', overflow: 'visible' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'Meter Details'}
                            </span>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '100%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div style={{display: 'flex', justifyContent: 'row'}}>
                                    <div style={{flex: 1}}>
                                      <span>
                                        {'Meter Tags'}
                                      </span>
                                    </div>
                                    <div>
                                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <div
                                          className='button-btn mr-15'
                                          onClick={async () => {
                                            this.updateDevice('SYNC_TAG_METER', 'Sync tag Meter. ');
                                          }}
                                        >
                                          <span>{'Sync tag'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                      marginBottom: '5px',
                                    }}
                                    className="box-item"
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        width: '100%'
                                      }}
                                      className="item"
                                    >
                                      <Select
                                        className="select-vendor w-full"
                                        components={animatedComponents}
                                        value={
                                          this.state.updatedMeterProject || (this.state.detailsData.meterProjectTags || []).map(tag => {
                                            return {
                                              value: tag.id,
                                              label: tag.name
                                            }
                                          })
                                        }
                                        options={this.state.projectTags || []}
                                        onChange={(event) => {
                                          this.setState({ updatedMeterProject: event });
                                        }}
                                        isMulti
                                        isDisabled ={!(this.props.userInfo.authorities || []).filter(r => r.authority === 'SUPER_ADMIN').length}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Meter SN (Bar Code)'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Coupled Time'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Coupled User'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Remark for Meter'}
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  <input
                                    value={this.state.detailsData.msn}
                                    style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                    onChange={(event) => {
                                      this.setState({ detailsData: { ...this.state.detailsData, msn: event.target.value }, updated: true });
                                    }}
                                  />
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', paddingLeft: '10px', border: '1px solid #e6e6e6' }}>
                                  {this.state.detailsData.type !== 'COUPLED' ? '' : !!this.state.detailsData.coupledDatetime ? moment(new Date(this.state.detailsData.coupledDatetime)).format('DD/MM/YYYY') : ''}
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', paddingLeft: '10px', border: '1px solid #e6e6e6' }}>
                                  {this.state.detailsData.type !== 'COUPLED' ? '' : this.state.detailsData.coupledUser}
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  {this.state.detailsDataOriginal?.msn && (
                                  <input
                                    value={this.state.detailsData?.remarkMeter}
                                    style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                    onChange={(event) => {
                                      this.setState({
                                        detailsData: { ...this.state.detailsData, remarkMeter: event.target.value },
                                      });
                                    }}
                                  />
                                  )}
                                </th>
                              </tr>
                              </tbody>
                            </table>

                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                height: '50px',
                                marginTop: '10px',
                                marginBottom: '0px',
                              }}
                            >
                              <div
                                style={{ marginRight: '10px', width: '120px' }}
                                className={!!this.state.updated || !!this.state.updatedGroup ? 'button-btn' : 'btn btn-secondary'}
                                onClick={async () => {
                                  await this.getFiles({uid: this.state.detailsData.uid, type: 'MMS_P1_TEST'});
                                }}
                              >
                                <span>{'PHOTO P1 TEST'}</span>
                              </div>
                              <div
                                style={{ width: '120px', marginRight: '10px' }}
                                className="button-btn"
                                onClick={async () => {
                                  await this.getFiles({uid: this.state.detailsData.uid, type: 'MMS_P2_TEST'});
                                }}
                              >
                                <span>{'PHOTO P2 TEST'}</span>
                              </div>
                              <div
                                style={{ width: 'fit-content', marginRight: 'auto', padding: '15px', }}
                                className="button-btn"
                                onClick={async () => {
                                  await this.setState({loading: true, p2MeterCommissioningReport: null});
                                  let res = await getLastSubmit({uid: this.state.detailsData?.uid || '', msn: this.state.detailsData?.msn || ''});
                                  if (res && res.success) {
                                    await this.setState({openP2MeterCommissioningReport: true, p2MeterCommissioningReport: res.response});
                                  } else {
                                    Swal.fire({
                                      html: `<p style='text-align: center; font-size: 14px;'>${'Error: ' + (res?.message || 'System error!')}</p>`,
                                      icon: 'error',
                                      confirmButtonText: 'OK',
                                    });
                                  }
                                  await this.setState({loading: false});
                                }}
                              >
                                <span>{'P2Meter Commissioning Report'}</span>
                              </div>

                              <div
                                style={{ marginRight: '10px', fontWeight: '600', fontStyle: 'italic', fontSize: '17px', color: '#000' }}
                              >
                                <span>{'Provision 2: '}</span>
                              </div>
                              <div
                                style={{ marginRight: '10px', width: '120px' }}
                                className={!!this.state.updated || !!this.state.updatedGroup ? 'button-btn' : 'btn btn-secondary'}
                                onClick={async () => {
                                  await this.updateDevice("COUPLE_MSN", "Couple MSN. ");
                                }}
                              >
                                <span>{'COUPLE'}</span>
                              </div>
                              <div
                                style={{ width: '120px' }}
                                className="button-btn"
                                onClick={async () => {
                                  await this.updateDevice("DE_COUPLE_MSN", "De-Couple MSN. ");
                                }}
                              >
                                <span>{'DECOUPLE'}</span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
                            <span
                              style={{
                                backgroundColor: '#cce7fe',
                                color: '#1b4f8c',
                                border: '1px solid #c0e0fe',
                                borderRadius: '5px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                fontWeight: 400,
                                paddingLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {'General Details'}
                            </span>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Installer Name'}
                                </th>
                                {/*<th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Remark'}
                                </th>*/}
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Group Name'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Send data to Pi'}
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  <select
                                    style={{ outline: 'unset', width: '100%', height: '35px' }}
                                    className="select-installer-user"
                                    value={this.state.detailsData.installer?.userId || ''}
                                    onChange={(event) => {
                                      this.setState({
                                        detailsData: { ...this.state.detailsData, installer: { ...this.state.detailsData.installer, userId: !!event.target.value ? parseInt(event.target.value) : null } },
                                        updated: true,
                                      });
                                    }}
                                  >
                                    <option value="">{'Select installer'}</option>
                                    {this.state.rpInstallerUsers.map(rdg => (
                                      <option key={rdg.value} value={rdg.value}>{rdg.label}</option>
                                    ))}
                                  </select>
                                </th>
                                {/*<th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  <input
                                    value={this.state.detailsData.group?.remark}
                                    style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                    onChange={(event) => {
                                      this.setState({
                                        detailsData: { ...this.state.detailsData, group: { ...this.state.detailsData.group, remark: event.target.value } },
                                        updatedGroup: true,
                                      });
                                    }}
                                  />
                                </th>*/}
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  <select
                                    style={{ outline: 'unset', width: '100%', height: '35px' }}
                                    className="select-group-device"
                                    value={this.state.detailsData.group?.id || ''}
                                    onChange={(event) => {
                                      this.setState({
                                        detailsData: {
                                          ...this.state.detailsData,
                                          group: {
                                            ...this.state.detailsData.group,
                                            id: !!event.target.value ? parseInt(event.target.value) : null,
                                          },
                                        },
                                        updated: true,
                                      }, () => {
                                        const remark = this.getRemarkValue(this.state.rpDeviceGroups);
                                        this.setState({
                                          detailsData: {
                                            ...this.state.detailsData,
                                            group: {
                                              ...this.state.detailsData.group,
                                              remark,
                                            },
                                          },
                                        });
                                      });
                                    }}
                                  >
                                    <option value="">{'Select group'}</option>
                                    {this.state.rpDeviceGroups.map(rdg => (
                                      <option key={rdg.value} value={rdg.value}>{rdg.label}</option>
                                    ))}
                                  </select>
                                </th>
                                <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                  <select
                                    style={{ outline: 'unset', width: '100%', height: '35px' }}
                                    className="select-group-device"
                                    value={this.state.detailsData.sendMDTToPi || '1'}
                                    onChange={(event) => {
                                      this.setState({
                                        detailsData: {
                                          ...this.state.detailsData,
                                          sendMDTToPi: !!event.target.value ? parseInt(event.target.value) : null,
                                        },
                                        updated: true,
                                      });
                                    }}
                                  >
                                    {[
                                      {value: '1', label: 'To send data to the pi'},
                                      {value: '2', label: 'Do not send data to the pi'}
                                    ].map(rdg => (
                                      <option key={rdg.value} value={rdg.value}>{rdg.label}</option>
                                    ))}
                                  </select>
                                </th>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', overflow: 'visible' }}>
                            <span
                                style={{
                                  backgroundColor: '#cce7fe',
                                  color: '#1b4f8c',
                                  border: '1px solid #c0e0fe',
                                  borderRadius: '5px',
                                  height: '50px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: '18px',
                                  fontWeight: 400,
                                  paddingLeft: '10px',
                                  marginBottom: '10px',
                                }}
                            >
                              {'Address Details'}
                            </span>
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '100%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div style={{display: 'flex', justifyContent: 'row'}}>
                                    <div style={{flex: 1}}>
                                      <span>
                                        {'Address Tags'}
                                      </span>
                                    </div>
                                    <div>
                                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <div
                                          className='button-btn mr-15'
                                          onClick={async () => {
                                            this.updateDevice('SYNC_TAG_ADDRESS', 'Sync tag Address. ');
                                          }}
                                        >
                                          <span>{'Sync tag'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td style={{ color: '#000', fontWeight: '300', fontSize: '14px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                      marginBottom: '5px',
                                    }}
                                    className="box-item"
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        width: '100%'
                                      }}
                                      className="item"
                                    >
                                      <Select
                                        className="select-vendor w-full"
                                        components={animatedComponents}
                                        value={
                                          this.state.updatedAddressProject || (this.state.detailsData.addressProjectTags || []).map(tag => {
                                            return {
                                              value: tag.id,
                                              label: tag.name
                                            }
                                          })
                                        }
                                        options={this.state.projectTags || []}
                                        onChange={(event) => {
                                          this.setState({ updatedAddressProject: event });
                                        }}
                                        isMulti
                                        isDisabled ={!(this.props.userInfo.authorities || []).filter(r => r.authority === 'SUPER_ADMIN').length}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <div style={{marginTop : '15px', marginBottom : '15px'}}>
                            <Radio
                                field={{
                                  name: "radio1"
                                }}
                                key={this.state.addressType}
                                name="radio1"
                                className="radio-inline"
                                groupstyle={{ margin: "auto", fontSize: '13px' }}
                                textStyle={{color: '#000', fontWeight: 400}}
                                value={this.state.addressType}
                                options={[
                                  ...[
                                    { name: "Apartment", id: 'apartment' },
                                    { name: "Other", id: 'other' },
                                  ].map(item => ({
                                    label: item.name,
                                    value: item.id
                                  }))
                                ]}
                                onClick={(e, option) => {
                                  if (!!option) {
                                    this.setState({addressType: option.value})
                                  }
                                }}
                            />
                            </div>
                            {this.state.addressType === 'apartment' ?
                            <table>
                              <thead>
                              <tr>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Building'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Block'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Floor level'}
                                </th>
                                <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                                  {'Building Unit'}
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                                <tr>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                        <Select
                                            style = {{ outline: 'unset', width: '100%', height: '35px' }}
                                            className = "select-installer-user"
                                            name = "Building"
                                            value = {(this.state.selectBuilding || []).find(e => e.value === this.state.selectedBuilding)}
                                            options = {this.state.selectBuilding}
                                            onChange = {async(event) => {
                                                //console.log("event :", event)
                                                this.setState({
                                                    selectedBuilding: event.value,
                                                    updated: true
                                                });
                                                var Promise = require('promise');
                                                await Promise.all([
                                                     getBlockOfBuilding({limit: 10000, options: {buildingId: event.value}}),
                                                     getFloorLevels({limit: 10000, options: {buildingId: event.value, checkLevelNoBlock: true}}),
                                                ]).then((values) => {

                                                    let blockOptions = [] ;
                                                    let floorOptions = [] ;

                                                    if(values[0].results) {
                                                        values[0].results.forEach((element, index) => {
                                                            blockOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                        });
                                                    }

                                                    if(values[1].results) {
                                                        values[1].results.forEach((element, index) => {
                                                            floorOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                        });
                                                    }

                                                    this.setState({
                                                        selectBlocks: blockOptions,
                                                        selectedfloorLevels: floorOptions,
                                                        selectedBuildingUnit: [],
                                                        selectedBlock: '',
                                                        selectedFloor: '',
                                                        selectedUnit: ''
                                                    });
                                                });

                                            }}
                                        >
                                        </Select>
                                    </th>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                        <Select
                                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                                            className = "select-installer-user"
                                            name = "Block"
                                            value = { (this.state.selectBlocks || []).filter(e => e.value === this.state.selectedBlock) }
                                            options = {this.state.selectBlocks}
                                            onChange = {async(event) => {
                                                this.setState({
                                                    selectedBlock: event.value,
                                                    updated: true
                                                });
                                                let floorLevels = [];
                                                floorLevels = await getFloorLevels({limit: 10000, options: {blockId: event.value, buildingId: this.state.selectedBuilding?.id}});

                                                let floorOptions = [] ;

                                                    if(floorLevels.results) {
                                                        floorLevels.results.forEach((element, index) => {
                                                            floorOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                        });
                                                    }
                                                this.setState({
                                                    selectedfloorLevels: floorOptions,
                                                    selectedBuildingUnit: [],
                                                    selectedFloor: '',
                                                    selectedUnit: ''
                                                });
                                            }}
                                        >
                                        </Select>
                                    </th>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                        <Select
                                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                                            className = "select-installer-user"
                                            name = "floorLevel"
                                            value = {(this.state.selectedfloorLevels || []).filter(e => e.value === this.state.selectedFloor)}
                                            options = {this.state.selectedfloorLevels}
                                            onChange = {async(event) => {
                                                this.setState({
                                                    selectedFloor: event.value,
                                                    updated: true
                                                });
                                                let buildingUnits = [];
                                                buildingUnits = await getBuildingUnits({limit: 10000, options: {floorLevelId: event.value}});

                                                let unitOptions = [] ;

                                                if(buildingUnits.results) {
                                                    buildingUnits.results.forEach((element, index) => {
                                                        unitOptions.push({value: element.id , label: element.id + " - " + element.name})
                                                    });
                                                }

                                                this.setState({
                                                    selectedBuildingUnit: unitOptions,
                                                    selectedUnit: ''
                                                });
                                            }}
                                        >
                                        </Select>
                                    </th>
                                    <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                        <Select
                                            style = {{ outline: 'unset', width: '100%', height: '35px' }}
                                            className = "select-installer-user"
                                            value = {(this.state.selectedBuildingUnit || []).filter(e => e.value === this.state.selectedUnit)}
                                           options = {this.state.selectedBuildingUnit}
                                            onChange = {(event) => {
                                                this.setState({
                                                    selectedUnit: event.value,
                                                    updated: true
                                                });
                                            }}
                                        >
                                        </Select>
                                    </th>
                                </tr>
                              </tbody>
                            </table> :null}
                            {this.state.addressType === 'other' ?
                                <div>
                                <table>
                                      <thead>
                                      <tr>
                                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '20%', maxWidth: '9%', padding: '10px', border: '1px solid #e6e6e6' }}>
                                          {'Street Number'}
                                        </th>
                                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                                          {'Street Name'}
                                        </th>
                                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                                          {'Town'}
                                        </th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                          <input
                                              value={this.state.streetNumber}
                                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                              onChange={(event) => {
                                                this.setState({
                                                  streetNumber: event.target.value,
                                                  updated: true
                                                });
                                              }}
                                          />
                                        </th>
                                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                          <input
                                              value={this.state.streetName}
                                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                              onChange={(event) => {
                                                this.setState({
                                                  streetName: event.target.value,
                                                  updated: true
                                                });
                                              }}
                                          />
                                        </th>
                                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                          <input
                                              value={this.state.town}
                                              style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                              onChange={(event) => {
                                                this.setState({
                                                  town: event.target.value,
                                                  updated: true
                                                });
                                              }}
                                          />
                                        </th>
                                      </tr>
                                      </tbody>
                                  </table>

                                  <table>
                                    <thead>
                                    <tr>
                                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '20%', maxWidth: '9%', padding: '10px', border: '1px solid #e6e6e6' }}>
                                        {'City'}
                                      </th>
                                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                                        {'Country'}
                                      </th>
                                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '9%', maxWidth: '20%', padding: '10px', border: '1px solid #e6e6e6' }}>
                                        {'Postal Code'}
                                      </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                        <input
                                            value={this.state.city}
                                            style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                            onChange={(event) => {
                                              this.setState({
                                                city: event.target.value,
                                                updated: true
                                              });
                                            }}
                                        />
                                      </th>
                                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                        <input
                                            value={this.state.country}
                                            style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                            onChange={(event) => {
                                              this.setState({
                                                country: event.target.value,
                                                updated: true
                                              });
                                            }}
                                        />
                                      </th>
                                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                                        <input
                                            value={this.state.postalCode}
                                            style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                                            onChange={(event) => {
                                              this.setState({
                                                postalCode: event.target.value,
                                                updated: true
                                              });
                                            }}
                                        />
                                      </th>
                                    </tr>
                                    </tbody>
                                  </table>
                                </div> :null}
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                  height: '50px',
                                  marginTop: '10px',
                                  marginBottom: '0px',
                                }}
                              >
                                <div
                                  style={{ marginRight: '10px', fontWeight: '600', fontStyle: 'italic', fontSize: '17px', color: '#000' }}
                                >
                                  <span>{'Provision 3: '}</span>
                                </div>
                                <div
                                  style={{ marginRight: '10px', width: '120px' }}
                                  className={!!this.state.updated || !!this.state.updatedGroup ? 'button-btn' : 'btn btn-secondary'}
                                  onClick={async () => {
                                    await this.updateDevice("COUPLE_ADDRESS", "Couple Address. ");
                                  }}

                                >
                                  <span>{'COUPLE'}</span>
                                </div>
                                <div
                                  style={{ width: '120px' }}
                                  className="button-btn"
                                  onClick={async () => {
                                    await this.updateDevice("DE_COUPLE_ADDRESS", "De-Couple Address. ");
                                  }}
                                >
                                  <span>{'DECOUPLE'}</span>
                                </div>
                              </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '50px',
                              marginTop: '40px',
                              marginBottom: '30px',
                            }}
                          >
                            <div
                              style={{ marginRight: '10px', width: '120px' }}
                              className={!!this.state.updated || !!this.state.updatedGroup ? 'button-btn' : 'btn btn-secondary'}
                              onClick={async () => {
                                await this.updateDevice();
                              }}
                            >
                              <span>{'UPDATE'}</span>
                            </div>
                            <div
                              style={{ marginRight: '10px', width: '120px' }}
                              className="button-btn"
                              onClick={() => {
                                this.setState({
                                  openDetails: false,
                                  detailsData: null,
                                  updated: undefined,
                                  updatedGroup: undefined,
                                });
                              }}
                            >
                              <span>{'CANCEL'}</span>
                            </div>
                            {(!!this.state.detailsData) && <div
                              style={{ marginRight: '10px', width: '120px' }}
                              className="button-btn"
                              onClick={async () => {
                                if (this.state.detailsData.type !== 'NOT_COUPLED') {
                                  Swal.fire(
                                    'Error!',
                                    'MCU is in COUPLED state.',
                                    'error',
                                  );
                                  return;
                                }
                                let result = await Swal.fire({
                                  html: "<p style='text-align: center; font-size: 14px;'>Are you sure?</p>",
                                  icon: 'question',
                                  confirmButtonText: 'OK',
                                  cancelButtonText: 'Cancel',
                                  showCancelButton: true,
                                });
                                if (result.isConfirmed) {
                                  this.setState({openRemoveReason: true})
                                }
                              }}
                            >
                              <span>{'REMOVE'}</span>
                            </div>}
                          </div>
                          {!!this.state.openRemoveReason && (
                            <div
                              style={{
                                backgroundColor: '#fff',
                                position: 'fixed',
                                top: '30%',
                                left: '35%',
                                zIndex: 10,
                                width: '30%',
                                height: '36%',
                                borderRadius: '5px',
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                                color: '#000000',
                                justifyContent: 'space-between',
                                minHeight: '320px',
                                minWidth: '333px'
                              }}
                            >
                              <span style={{ fontWeight: 500, fontSize: '18px' }}>
                                {'Enter reason to confirm delete'}
                              </span>
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px'}}>
                                  <div style={{width: '135px'}}>{'Remove reason:'}</div>
                                  <textarea
                                    style={{
                                      border: '1px solid #00000020',
                                      borderRadius: '5px',
                                      outline: 'unset',
                                      maxHeight: '140px',
                                      width: '400px',
                                      paddingLeft: '10px',
                                      flex: 1
                                    }}
                                    rows={4}
                                    value={this.state.detailsData?.reason || ""}
                                    onChange={(event) => {
                                      this.setState({
                                        detailsData: {
                                          ...this.state.detailsData,
                                          reason: event.target.value
                                        }
                                      });
                                    }}
                                    placeholder={'Remove reason'}
                                  />
                                </div>
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                                <button
                                  className="button-btn w-80"
                                  style={{
                                    alignSelf: 'center',
                                    border: 'unset',
                                    outline: 'unset',
                                    marginRight: '10px'
                                  }}
                                  onClick={async () => {
                                    if (!this.state.detailsData?.reason) {
                                      Swal.fire(
                                        'Error!',
                                        'Please enter reason to confirm delete',
                                        'error',
                                      );
                                      return;
                                    }
                                    await removeEVSDevice(this.state.detailsData);
                                    await Swal.fire({
                                      html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                      icon: 'success',
                                      confirmButtonText: 'OK',
                                    });
                                    this.setState({
                                      openDetails: false,
                                      detailsData: null,
                                      updated: undefined,
                                      updatedGroup: undefined,
                                    });
                                    require('@app/utils/next-routes').Router.pushRoute(window.location.href);
                                  }}
                                >
                                  {'Delete'}
                                </button>
                                <button
                                  className="button-btn w-80"
                                  style={{
                                    alignSelf: 'center',
                                    border: 'unset',
                                    outline: 'unset',
                                  }}
                                  onClick={() => {
                                    this.setState({
                                      openRemoveReason: false,
                                    });
                                  }}
                                >
                                  {'Cancel'}
                                </button>
                              </div>
                            </div>
                          )}

                          {((!!this.state.showPhotoP1Test || !!this.state.showPhotoP2Test)) && (
                          <div
                            style={{
                              backgroundColor: '#111111d6',
                              position: 'fixed',
                              top: '0',
                              left: '0',
                              zIndex: 10,
                              width: '100%',
                              height: '100%',
                              border: '1px solid',
                              borderRadius: '3px',
                              padding: '60px 15px 0px 100px',
                              overflowY: 'scroll',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div style={{position: 'relative', minHeight: '400px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', marginRight: '60px',}}>
                              {!!this.state.piFileUpLoads?.length ? (
                                <img src={this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].uri}
                                  key={this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].uri}
                                  style={{
                                    width: '500px',
                                    maxWidth: '500px',
                                    objectFit: 'cover',
                                    flex: 1,
                                  }}
                                />
                                ) : (
                                  <div
                                    style={{
                                      width: '500px',
                                      maxWidth: '500px',
                                      objectFit: 'cover',
                                      flex: 1,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      paddingTop: '15px',
                                    }}
                                  >
                                    <span>Not found</span>
                                  </div>
                                )
                              }
                              <div
                                style={{width: '500px', maxWidth: '500px', backgroundColor: '#ffffff',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: '20px',
                                }}
                              >
                                {!!this.state.piFileUpLoads?.length && (
                                <>
                                  <span style={{fontSize: 15, marginTop: 5,
                                    fontWeight: '500',
                                    marginBottom: '15px',
                                  }}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].title || 'Title'}</span>
                                  <span style={{ }}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].text || 'Text'}</span>
                                </>
                                )}
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                  <button
                                    className="button-btn w-80"
                                    style={{
                                      alignSelf: 'center',
                                      border: 'unset',
                                      outline: 'unset',
                                      marginTop: '15px',
                                    }}
                                    onClick={() => {
                                      this.setState({ showPhotoP1Test: false, showPhotoP2Test: false, piFileUpLoads: [] });
                                    }}
                                  >
                                    {'Close'}
                                  </button>
                                  <button
                                    className="button-btn w-80"
                                    style={{
                                      alignSelf: 'center',
                                      border: 'unset',
                                      outline: 'unset',
                                      marginTop: '15px',
                                      marginLeft: '5px',
                                    }}
                                    onClick={() => {
                                      this.photoInput && this.photoInput.click();
                                    }}
                                  >
                                    {'UPLOAD'}
                                  </button>
                                </div>
                              </div>
                              <div
                                style={{position: 'absolute', right: '0px', bottom: '15px', cursor: 'pointer', opacity: 0}}
                              >
                                <input
                                    ref={_ref => this.photoInput = _ref}
                                    className="col-md-4 file-input"
                                    type="file"
                                    style={{visibility: 'hidden', width: '0px', height: '0px'}}
                                    placeholder={'Photo upload'}
                                    accept=".png, .jpg, .jpeg"
                                    dataButtonText="Choose image..."
                                    onChange={async (event) => {
                                      const formData = new FormData();
                                      formData.append('files', event.target.files[0], event.target.files[0].name);
                                      formData.append('uid', this.state.selectedData.uid);
                                      formData.append('type', this.state.photoFilter.type || 'MMS_P1_TEST');
                                      formData.append('altName', (this.state.photoFilter.type === 'MMS_P1_TEST' ? 'P1_TEST_' : 'P2_TEST_') + this.state.selectedData.uid);
                                      const url = `/api/file-upload`;
                                      const method = 'POST';
                                      await this.setState({loading: true});
                                      let rp = await fetch(url,
                                        {
                                          headers: new Headers({
                                            'Authorization': getCookie(tokenName),
                                          }),
                                          method,
                                          body: formData,
                                        },
                                        )
                                        .then(response => response.json())
                                        .then(response => rp = response)
                                        .catch((error) => {
                                          console.error('Error:', error);
                                          this.setState({loading: false});
                                        });
                                      if (rp?.success) {
                                        await this.getFiles(this.state.photoFilter);
                                        const result = await Swal.fire({
                                          html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                          icon: 'success',
                                          confirmButtonText: 'OK',
                                        });
                                      }
                                      this.setState({loading: false});
                                    }}
                                />
                              </div>
                              {this.state.piFileUpLoads?.length > 1 && (<div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "-22.5px",
                                  color: "#ffffff",
                                  width: 45,
                                  height: 45,
                                  borderRadius: "50%",
                                  backgroundColor: "#111111",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: 20,
                                  cursor: "pointer"
                                }}
                                onClick={() => {
                                  let piFileUpLoadCurrentIndex = this.state.piFileUpLoadCurrentIndex || 0;
                                  piFileUpLoadCurrentIndex--;
                                  if (piFileUpLoadCurrentIndex < 0) {
                                    piFileUpLoadCurrentIndex = this.state.piFileUpLoads.length - 1;
                                  }
                                  this.setState({piFileUpLoadCurrentIndex})
                                }}
                              >
                                <i className="fa fa-arrow-left" style={{}} />
                              </div>)}
                              {this.state.piFileUpLoads?.length > 1 && (<div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "-22.5px",
                                  color: "#ffffff",
                                  width: 45,
                                  height: 45,
                                  borderRadius: "50%",
                                  backgroundColor: "#111111",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: 20,
                                  cursor: "pointer"
                                }}
                                onClick={() => {
                                  let piFileUpLoadCurrentIndex = this.state.piFileUpLoadCurrentIndex || 0;
                                  piFileUpLoadCurrentIndex++;
                                  if (piFileUpLoadCurrentIndex >= this.state.piFileUpLoads.length) {
                                    piFileUpLoadCurrentIndex = 0;
                                  }
                                  this.setState({piFileUpLoadCurrentIndex})
                                }}
                              >
                                <i className="fa fa-arrow-right" style={{}} />
                              </div>)}
                            </div>
                          </div>
                          )}
                        </div>
                      )}
                      {!!this.state.showRawMessage && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '30%',
                            left: '35%',
                            zIndex: 10,
                            width: '30%',
                            height: '40%',
                            borderRadius: '5px',
                            padding: '30px 30px 15px 30px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                            color: '#000000',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Raw Message'}
                          </span>
                          <span style={{ overflow: 'auto', width: '100%', height: '60%' }}>
                            {this.state.rawMessage}
                          </span>
                          <button
                            className="button-btn w-80"
                            style={{
                              alignSelf: 'center',
                              border: 'unset',
                              outline: 'unset',
                            }}
                            onClick={() => {
                              this.setState({ showRawMessage: false, rawMessage: undefined });
                            }}
                          >
                            {'Close'}
                          </button>
                        </div>
                      )}
                      {!!this.state.mdtPiStatus && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '30%',
                            left: '35%',
                            zIndex: 10,
                            width: '30%',
                            height: '40%',
                            borderRadius: '5px',
                            padding: '30px 30px 15px 30px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                            color: '#000000',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Meter client status'}
                          </span>
                          <div style={{ overflow: 'auto', width: '100%', height: '60%', display: 'flex', flexDirection: 'column' }}>
                              <table className="table" style={{flex: 1}}>
                                  <thead className="thead-dark">
                                      <tr>
                                          <th className="table-th" scope="col">IP Address</th>
                                          <th className="table-th" scope="col">IEI</th>
                                          <th className="table-th" scope="col">STATUS</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          this.state.mdtPiStatus.map((r, index) => {
                                              return (
                                                <tr
                                                    key={index}
                                                    style={{
                                                      cursor: 'pointer',
                                                      backgroundColor: '#fff',
                                                      color: '#000000',
                                                    }}
                                                >
                                                    <td className="table-td">
                                                        {(r.piUuid || '').split('-')[0]}
                                                    </td>
                                                    <td className="table-td">
                                                        {r.ieiId}
                                                    </td>
                                                    <td className="table-td">
                                                        {r.ftpResStatus}
                                                    </td>
                                                </tr>
                                              )
                                          })
                                      }
                                  </tbody>
                              </table>
                              {!!this.state.mdtPiStatusMessage && (
                              <span
                                style={{color: 'red'}}
                              >
                                {this.state.mdtPiStatusMessage}
                              </span>
                              )}
                          </div>
                          <button
                            className="button-btn w-80"
                            style={{
                              alignSelf: 'center',
                              border: 'unset',
                              outline: 'unset',
                            }}
                            onClick={() => {
                              this.setState({ mdtPiStatus: undefined, mdtPiStatusMessage: undefined });
                            }}
                          >
                            {'Close'}
                          </button>
                        </div>
                      )}
                      {!!this.state.publishStatus && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '30%',
                            left: '35%',
                            zIndex: 10,
                            width: '30%',
                            height: '40%',
                            borderRadius: '5px',
                            padding: '30px 30px 15px 30px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                            color: '#000000',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Publish status'}
                          </span>
                          <span style={{ overflow: 'auto', width: '100%', height: '60%' }}>
                            {this.state.publishStatus}
                          </span>
                          <button
                            className="button-btn w-80"
                            style={{
                              alignSelf: 'center',
                              border: 'unset',
                              outline: 'unset',
                            }}
                            onClick={() => {
                              this.setState({ publishStatus: undefined });
                            }}
                          >
                            {'Close'}
                          </button>
                        </div>
                      )}
                      {!!this.state.handleSubscribeDesc && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '30%',
                            left: '35%',
                            zIndex: 10,
                            width: '30%',
                            height: '40%',
                            borderRadius: '5px',
                            padding: '30px 30px 15px 30px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                            color: '#000000',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Handle subscribe description'}
                          </span>
                          <span style={{ overflow: 'auto', width: '100%', height: '60%' }}>
                            {this.state.handleSubscribeDesc}
                          </span>
                          <button
                            className="button-btn w-80"
                            style={{
                              alignSelf: 'center',
                              border: 'unset',
                              outline: 'unset',
                            }}
                            onClick={() => {
                              this.setState({ handleSubscribeDesc: undefined });
                            }}
                          >
                            {'Close'}
                          </button>
                        </div>
                      )}
                      {!!this.state.openP2MeterCommissioningReport && (
                        <div
                          style={{
                            backgroundColor: '#111111d6',
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            zIndex: 10,
                            width: '100%',
                            height: '100%',
                            border: '1px solid',
                            borderRadius: '3px',
                            padding: '60px 15px 0px 100px',
                            overflowY: 'scroll',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <P2MeterCommissioningReport p2MeterCommissioningReport={this.state.p2MeterCommissioningReport}
                            onClose={() => {
                              this.setState({ openP2MeterCommissioningReport: false, p2MeterCommissioningReport: null, });
                            }}
                          />
                        </div>
                      )}
                      {!!this.state.openExportCsv && (
                        <div
                          style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            top: '30%',
                            left: '40%',
                            zIndex: 10,
                            width: '400px',
                            height: '230px',
                            border: '1px solid',
                            borderRadius: '3px',
                            padding: '15px 15px 15px 15px',
                          }}
                        >
                          <span style={{ fontWeight: 500, fontSize: '18px' }}>
                              {'Export CSV'}
                          </span>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '40px',
                              marginBottom: '40px',
                              marginTop: '40px',
                            }}
                          >
                            <label style={{ fontWeight: 400, fontSize: '14px', width: '120px' }}>
                              {'Activate date: '}
                            </label>
                            <input
                              style={{
                                border: '1px solid',
                                borderRadius: '5px',
                                height: '40px',
                                width: '60%',
                              }}
                              type="date"
                              value={ this.state.activateDate || moment(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DD') }
                              onChange={ event => this.setState({ activateDate: event.target.value })}
                            />
                          </div>
                          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                              style={{
                                marginRight: '15px',
                                height: '40px',
                                width: '80px',
                                borderRadius: '3px',
                                backgroundColor: '#99ccff',
                                cursor: 'pointer',
                                color: '#000000',
                              }}
                              onClick={async () => {
                                const selectedCids = [];
                                this.state.selectedCids?.forEach((cid) => {
                                  selectedCids.push(cid.value);
                                });
                                const filter = {
                                  options: {
                                    downloadCsv: true,
                                    status: this.state.selectedStatus,
                                    fromDate: !!this.state.fromDate ? new Date(this.state.fromDate).getTime() : undefined,
                                    toDate: !!this.state.toDate ? new Date(this.state.toDate).getTime() : undefined,
                                    querySn: this.state.searchSn,
                                    queryMsn: this.state.searchMsn?.toUpperCase(),
                                    selectedCids: this.state.listCid || selectedCids,
                                    activateDate: this.state.activateDate ? new Date(this.state.activateDate).getTime() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
                                  },
                                };
                                const url = '/api/ca-request-logs';
                                const method = 'POST';
                                const rp = await fetch(url, {
                                  method,
                                  body: JSON.stringify(filter),
                                  headers: {
                                    'Content-Type' : 'application/json',
                                  },
                                })
                                  .then((response) => {
                                    return response.blob();
                                  });
                                if (rp) {
                                  const tag =  moment(new Date()).format('YYYY-MM-DD');
                                  const fileName = 'MMS-MCU-Export-' + tag + '.csv';
                                  const url = window.URL.createObjectURL(new Blob([rp]));
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.setAttribute('download', fileName);
                                  document.body.appendChild(link);
                                  link.click();
                                  link.parentNode.removeChild(link);
                                  this.setState({ openExportCsv: false, activateDate: undefined });
                                } else {
                                  alert('Something went wrong. Please try again!');
                                }
                              }}
                            >
                              {'Export'}
                            </button>
                            <button
                              style={{
                                marginLeft: '15px',
                                height: '40px',
                                width: '80px',
                                borderRadius: '3px',
                                border: '0.5px solid green',
                                backgroundColor: '#f8cecc',
                                cursor: 'pointer',
                                color: '#000000',
                              }}
                              onClick={() => {
                                this.setState({ openExportCsv: false, activateDate: undefined });
                              }}
                            >
                              {'Cancel'}
                            </button>
                          </div>
                        </div>
                      )}
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

class P2MeterCommissioningReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        enabledText: { color: 'white', textAlign: 'center', fontSize: '16', lineHeight: 19 },
        enabledButton: {
            backgroundColor: '#BD2228', borderColor: '#BD2228', borderRadius: '5px', borderWidth: '1px', marginTop: '56px',
            width: '160px', height: '41px', justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '500',
        },
      },
      showLastSubmit: {data: props.p2MeterCommissioningReport || {}},
    };
  }

  render() {

    let styles = this.state.styles;
    return (
      <div style={{width: '600px', backgroundColor: '#fff', position: 'relative', overflow: 'auto'}}>
        <div style={{flex: 1}}>
          <div
            style={{
              borderRightWidth: '0.75px',
              borderRightColor: '#777777',
              padding: '15px',
              textAlign: 'center',
              fontSize: '20px',
            }}
          >
            <span style={{color: '#111111', fontWeight: '500', padding: '10px'}}>{'Last P2Meter Commissioning Report'}</span>
          </div>
          <div
            style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '10px'}}>
            <div style={{
              flex: 1,
              marginLeft: '15px',
              paddingTop: '10px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#777777',
              borderBottomWidth: '0.75px',
              borderBottomStyle: 'solid',
            }}>
              <div
                style={{
                  borderRightWidth: '0.75px',
                  borderRightColor: '#777777',
                  borderRightStyle: 'solid',
                  width: '30%', minWidth: '30%', maxWidth: '30%',
                }}
              >
                <span style={{color: '#111111', fontWeight: '500', width: '100px'}}>{'MCU Profile:'}</span>
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                    <div style={{marginRight: '10px'}}>
                      <span style={{color: '#111111', fontWeight: '500'}}>{'MCU SN: '}</span>
                    </div>
                    <div>
                      <span style={{}}>{(this.state.showLastSubmit?.data?.sn || '')}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{marginRight: '10px'}}>
                      <span style={{color: '#111111', fontWeight: '500'}}>{'MCU UUID: '}</span>
                    </div>
                    <div>
                      <span style={{}}>{(this.state.showLastSubmit?.data?.uid || '')}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{marginRight: '10px'}}>
                      <span style={{color: '#111111', fontWeight: '500'}}>{'ESIM ID: '}</span>
                    </div>
                    <div>
                      <span style={{}}>{(this.state.showLastSubmit?.data?.cid || '')}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{marginRight: '10px'}}>
                      <span style={{color: '#111111', fontWeight: '500'}}>{'STATUS: '}</span>
                    </div>
                    <div>
                      <span style={{}}>{(this.state.showLastSubmit?.data?.status || '')}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{marginRight: '10px'}}>
                      <span style={{color: '#111111', fontWeight: '500'}}>{'COUPLED STATE: '}</span>
                    </div>
                    <div>
                      <span style={{}}>{(this.state.showLastSubmit?.data?.type || 'N/A')}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{marginRight: '10px'}}>
                      <span style={{color: '#111111', fontWeight: '500'}}>{'COUPLED USER: '}</span>
                    </div>
                    <div>
                      <span style={{}}>{(this.state.showLastSubmit?.data?.coupledUser || '')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              flex: 1,
              marginLeft: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#777777',
              borderBottomWidth: '0.75px',
              borderBottomStyle: 'solid',
            }}>
              <div
                style={{
                  borderRightWidth: '0.75px',
                  borderRightColor: '#777777',
                  paddingTop: '10px',
                  borderRightStyle: 'solid',
                  width: '30%', minWidth: '30%', maxWidth: '30%',
                }}
              >
                <span style={{color: '#111111', fontWeight: '500', width: '100px'}}>{'Meter SN:'}</span>
              </div>
              <div style={{
                flex: 1,
                paddingTop: '10px',
                paddingBottom: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                    <div style={{marginRight: '10px'}}>
                      <span style={{color: '#111111', fontWeight: '500'}}>{'Meter SN: '}</span>
                    </div>
                    <div>
                      <span style={{}}>{(this.state.showLastSubmit?.data?.msn || '')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              flex: 1,
              marginLeft: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#777777',
              borderBottomWidth: '0.75px',
              borderBottomStyle: 'solid',
            }}>
              <div
                style={{
                  borderRightWidth: '0.75px',
                  borderRightColor: '#777777',
                  paddingTop: '10px',
                  borderRightStyle: 'solid',
                  width: '30%', minWidth: '30%', maxWidth: '30%',
                }}
              >
                <span style={{color: '#111111', fontWeight: '500', width: '100px'}}>{'Meter Data:'}</span>
              </div>
              <div style={{
                flex: 1,
                paddingTop: '10px',
                paddingBottom: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'Kwh: ' + (this.state.showLastSubmit?.data?.kwh || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'Kw: ' + (this.state.showLastSubmit?.data?.kw || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'I: ' + (this.state.showLastSubmit?.data?.i || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'V: ' + (this.state.showLastSubmit?.data?.v || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'PF: ' + (this.state.showLastSubmit?.data?.pf || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '5px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>
                        {'DTime: ' + (this.state.showLastSubmit?.data?.dt ? moment(this.state.showLastSubmit?.data?.dt).format("YYYY-MM-DD HH:mm:ss") : "")}{' (Meter Time)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              flex: 1,
              marginLeft: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#777777',
              borderBottomWidth: '0.75px',
              borderBottomStyle: 'solid',
            }}>
              <div
                style={{
                  borderRightWidth: '0.75px',
                  borderRightColor: '#777777',
                  paddingTop: '10px',
                  borderRightStyle: 'solid',
                  width: '30%', minWidth: '30%', maxWidth: '30%',
                }}
              >
                <span style={{color: '#111111', fontWeight: '500', width: '100px'}}>{'P2Submit user:'}</span>
              </div>
              <div style={{
                flex: 1,
                paddingTop: '10px',
                marginBottom: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>
                        {this.state.showLastSubmit?.data?.userSubmit || ''}
                      </span>
                    </div>
                    <div>
                      <span style={{}}>{''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              flex: 1,
              marginLeft: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#777777',
              borderBottomWidth: '0.75px',
              borderBottomStyle: 'solid',
            }}>
              <div
                style={{
                  borderRightWidth: '0.75px',
                  borderRightColor: '#777777',
                  paddingTop: '10px',
                  borderRightStyle: 'solid',
                  width: '30%', minWidth: '30%', maxWidth: '30%',
                  paddingBottom: '15px',
                }}
              >
                <span style={{color: '#111111', fontWeight: '500', width: '100px'}}>{'P2Checking time:'}</span>
              </div>
              <div style={{
                flex: 1,
                paddingTop: '10px',
                marginBottom: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                  <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px'}}>
                    <div>
                      <span style={{color: '#111111', fontWeight: '500'}}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>
                        {!!this.state.showLastSubmit?.data?.timeSubmit ? moment(new Date(this.state.showLastSubmit?.data?.timeSubmit)).format("YYYY-MM-DD HH:mm:ss") : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              flex: 1,
              marginLeft: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#777777',
              borderBottomWidth: '0.75px',
              borderBottomStyle: 'solid',
            }}>
              <div
                style={{
                  borderRightWidth: '0.75px',
                  borderRightColor: '#777777',
                  paddingTop: '10px',
                  paddingBottom: '15px',
                  borderRightStyle: 'solid',
                  width: '30%', minWidth: '30%', maxWidth: '30%',
                }}
              >
                <span style={{color: '#111111', fontWeight: '500', width: '100px'}}>{'Meter photo:'}</span>
              </div>
              <div style={{
                flex: 1,
                paddingTop: '10px',
                marginBottom: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                  {(this.state.showLastSubmit?.data?.meterPhotos?.split(",") || []).map((uri, idx) => (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginBottom: '10px',
                      }}
                      key={uri}
                    >
                      <div>
                        <a
                          style={{
                            color: 'blue',
                            fontWeight: '500'
                          }}
                          href={uri}
                          target={'_blank'}
                        >{uri}</a>
                      </div>
                      <div>
                        <span style={{}}>{''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              flex: 1,
              marginLeft: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#777777',
              borderBottomWidth: '0.75px',
            }}>
              <div
                style={{
                  borderRightWidth: '0.75px',
                  borderRightColor: '#777777',
                  paddingTop: '10px',
                  borderRightStyle: 'solid',
                  width: '30%', minWidth: '30%', maxWidth: '30%',
                }}
              >
                <span style={{color: '#111111', fontWeight: '500', width: '100px'}}>{'P2Checking Result:'}</span>
              </div>
              <div style={{
                flex: 1,
                paddingTop: '10px',
                marginBottom: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                  {!!this.state.showLastSubmit?.data?.isPassed ? (
                    <div
                      disabled={true}
                      style={{
                        ...styles.enabledButton,
                        backgroundColor: '#125e8c',
                        borderColor: '#125e8c',
                        width: '80px',
                        marginTop: '5px',
                        marginRight: '10px',
                      }}
                    >
                      <span style={styles.enabledText}>{"PASS"}</span>
                    </div>
                  ) : (
                    <div
                      disabled={true}
                      style={{
                        ...styles.enabledButton,
                        backgroundColor: '#8c1212',
                        borderColor: '#8c1212',
                        width: '80px',
                        marginTop: '5px',
                      }}
                    >
                      <span style={styles.enabledText}>{"FAIL"}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div style={{ fontSize: '20px', position: 'absolute', right: '0', top: '0', cursor: 'pointer' ,
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
           onClick={() => {
              this.props.onClose && this.props.onClose();
           }}
           data-tip="Close"
        >
          <i className="fa fa-close" />
        </div>
      </div>
    )
  }
}
class MeterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ chartType: 'time', chartStyle: 'bar' });
    this.load(new Date(moment().startOf('day')).getTime(), new Date(moment().endOf('day')).getTime());
    clearInterval(this.intv);
    this.intv = setInterval(() => {
      if (this.state.chartType === 'time') {
        this.load(new Date(moment().startOf('day')).getTime(), new Date(moment().endOf('day')).getTime());
      } else if (this.state.chartType === 'month') {
        this.load(new Date(moment().startOf('month')).getTime(), new Date(moment().endOf('month')).getTime());
      } else if (this.state.chartType === 'year') {
        this.load(new Date(moment().startOf('year')).getTime(), new Date(moment().endOf('year')).getTime());
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intv);
  }

  load = async (from, to) => {
    const rp = await getMeterLogs({ uid: this.props.uid || 'BIERWXAAA4AFMACLXX', from, to });
    let data = rp.response || [];

    const check = [];
    const timeData = [['Time/Daily', 'Time']];

    const temp = [];
    for (let i = 0; i < data.length; i++) {

      const dt = data[i].dt;
      if (!!check[dt + '']) {
        continue;
      }
      check[dt + ''] = true;
      temp.push(data[i]);
    }

    data = temp;

    const dateData = {};
    const dateTimeData = {};
    for (let i = 0; i < data.length; i++) {
      if (i >= data.length - 20) {
        timeData.push([moment(new Date(data[i].dt)).format('HH:mm:ss DD-MM-YY'), Number(data[i].kwh)]);
      }
      const dateLabel = moment(new Date(data[i].dt)).format(this.state.chartType === 'time' ? 'HH:mm:ss DD-MM-YY'
        : (this.state.chartType === 'month' ? 'DD-MM-YYYY' : 'MM-YYYY'));
      dateData[dateLabel] = (dateData[dateLabel] || 0) + Number(data[i].kwh);
    }

    const dailyChartData = [['Time/Daily', 'Date']];
    Object.keys(dateData).map(it => {
      dailyChartData.push([it, dateData[it]]);
    });

    this.setState({ lineChartData: timeData, dailyChartData, found: !!data.length, newData: !!data.length ? Date.now() : this.state.newData });
  }

  render() {
    return (
      <div>
         <div style={{ marginTop: '30px', marginLeft: '30px', fontSize: '20px', color: '#000' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <label style={{ fontWeight: '400', fontSize: '20px', width: '120px' }}>
                  {'Chart Style: '}
              </label>
              <div
                  className="flex flex-row"
                  style={{ width: '10%', position: 'relative', fontSize: '14px' }}
              >
                  <SelectCustom
                      field={{
                        name: 'chartStyle',
                      }}
                      name="chartStyle"
                      options={[
                        ...(
                              this.state.optionsStyle || [
                                  { name: 'Line chart', value: 'line' },
                                  { name: 'Bar chart', value: 'bar' },
                              ]
                          ).map(item => ({
                            label: item.name,
                            value: item.value,
                          })),
                      ]}
                      value={this.state.chartStyle || 'bar'}
                      onChange={(field, value) => {
                        this.setState({ chartStyle: value.value });
                      }}
                  />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <label style={{ fontWeight: '400', fontSize: '20px', width: '120px' }}>
                  {'Type: '}
              </label>
              <div
                  className="flex flex-row"
                  style={{ width: '10%', position: 'relative', fontSize: '14px' }}
              >
                  <SelectCustom
                      field={{
                        name: 'chartType',
                      }}
                      name="chartType"
                      options={[
                        ...(
                              this.state.optionsType || [
                                  { name: 'Time', value: 'time' },
                                  { name: 'Month', value: 'month' },
                                  { name: 'Year', value: 'year' },
                              ]
                          ).map(item => ({
                            label: item.name,
                            value: item.value,
                          })),
                      ]}
                      value={this.state.chartType || 'month'}
                      onChange={(field, value) => {
                        this.setState({ chartType: value.value });
                      }}
                  />
              </div>
            </div>
          </div>

          {this.state.found === false && <div>Data not found</div>}

        {(this.state.found && this.state.lineChartData && this.state.dailyChartData && this.state.chartStyle === 'line') && (
          <Chart
            key={this.state.newData}
            width={'100%'}
            // height={600}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={this.state.chartType === 'time' ? this.state.lineChartData : this.state.dailyChartData}
            options={{
              title: 'Kwh',
              // curveType: 'function',
              legend: { position: 'bottom' },
              height: 700,
              hAxis: {
                slantedText:true,
                slantedTextAngle:90,
                marginBottom: '100px',
              },
            }}
          />
        )}
        {(this.state.found && this.state.dailyChartData && this.state.chartStyle === 'bar') && (
          <div style={{ marginTop: '50px' }}>
            <Chart
              key={this.state.newData}
              width={'100%'}
              height={300}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={this.state.dailyChartData}
              options={{
                title: 'Kwh',
                curveType: 'function',
                legend: { position: 'bottom' },
              }}
              legendToggle
            />
          </div>
        )}
      </div>
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
