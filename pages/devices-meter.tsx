import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { Box, Modal, Typography } from "@material-ui/core";
import { CloseButton } from 'react-bootstrap';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { getCookie } from '@app/utils/cookie';
import { tokenName } from '@app/utils/public-config';
import {
  deleteMeter,
  editDevice,
  editGroup,
  getAllMeterDevices,
  getBlockOfBuilding,
  getBuilding,
  getBuildingUnits,
  getDeviceGroups,
  getFiles,
  getFloorLevels,
  getLastSubmit,
  getMeterLogs,
  getProjectTags,
  getRelatedLogs,
  getVendors,
  removeEVSDevice,
  sendCommand,
  validateLoginPwd,
} from '@app/api/log';
import { Pagination, ProgressLoading, Radio, SelectCustom } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import ReactTooltip from 'react-tooltip';
import { Chart } from 'react-google-charts';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getUserPermissions, getUsers } from '@app/api/user';
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
    height: 40px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-size: 14px;
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
  :global(.sn-export::before) {
    content: 'Choose file contains MCU SN...' !important;
  }
  :global(.sn-export::-webkit-file-upload-button) {
    visibility: hidden;
    display: none;
  }
  :global(.sn-export::before) {
    border-color: black;
  }
  :global(.sn-export:active::before) {
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
  :global(.custom-swal-container) {
    z-index: 9999 !important;
  }
`;

interface IDashboardPageState {

}

const statusList = [
  { value: '', label: 'Select status...' },
  { value: 'ONLINE', label: 'ONLINE' },
  { value: 'OFFLINE', label: 'OFFLINE' },
];

const typeP2List = [
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

  state = {
    ...this.props,
    proFromDate: '',
    proToDate: '',
    buildings: [],
    floorLevels: [],
    buildingUnits: [],
    searchPostalCode: this.props.params.options.queryPostalCode,
    searchRemarkMeter: this.props.params.options.queryRemarkMeter,
  };

  constructor(props) {
    super(props);
  }

  static getInitialProps = async (args) => {
    const {
      query: {
        q,
        page,
        fromDate,
        toDate,
        status,
        typeP2,
        typeP3,
        querySn,
        queryMsn,
        queryEsimId,
        queryUuid,
        queryGroup,
        queryEnrollmentDate,
        queryCoupledDate,
        queryActivationDate,
        queryDeactivationDate,
        queryLastSubscribeDatetime,
        queryAllDate,
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
        queryPostalCode,
        queryRemarkMeter,
        queryVendor,
        advancedSearch,
      },
      asPath, req, initialState: {},
    } = args;
    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        status: !!status ? status : undefined,
        typeP2: !!typeP2 ? typeP2 : undefined,
        typeP3: !!typeP3 ? typeP3 : undefined,
        fromDate: !!fromDate ? roundDate(moment(fromDate, 'DD/MM/YYYY'), 'FROM').getTime() : undefined,
        toDate: !!toDate ? roundDate(moment(toDate, 'DD/MM/YYYY'), 'TO').getTime() : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        queryEsimId: !!queryEsimId ? queryEsimId : undefined,
        queryUuid: !!queryUuid ? queryUuid : undefined,
        queryGroup: !!queryGroup ? queryGroup : undefined,
        queryEnrollmentDate,
        queryCoupledDate,
        queryActivationDate,
        queryDeactivationDate,
        queryLastSubscribeDatetime: "true",
        queryAllDate: "false",
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
        queryPostalCode,
        queryRemarkMeter,
        queryVendor,
        advancedSearch,
      },
      limit: 20,
      offset: (pageNumber - 1) * 20,
    };

    let rp = await getAllMeterDevices(params, req);
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

    let slStatus;
    if (!!status) {
      const result = statusList.filter(st => st.value === status);
      if (result.length > 0) {
        slStatus = result[0];
      }
    }
    let slP2Type;
    if (!!typeP2) {
      const result = typeP2List.filter(st => st.value === typeP2);
      if (result.length > 0) {
        slP2Type = result[0];
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

    const buildings = await getBuilding({ limit: 10000 }, req);
    let searchBuilding = (buildings.results || []).filter(bd => bd.id == queryBuilding)[0];
    if (searchBuilding) {
      let buildingId = searchBuilding.id;
      searchBuilding = { value: searchBuilding.id, label: searchBuilding.id + ' - ' + searchBuilding.name };
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
      selectedP2Type: slP2Type,
      selectedP3Type: slP3Type,
      tempFromDate: params.options.fromDate ? new Date(params.options.fromDate) : undefined,
      deToDate: params.options.toDate ? new Date(params.options.toDate) : undefined,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      selectedGroup: slGroup,
      searchUuid: params.options.queryUuid,
      searchEsimId: params.options.queryEsimId,
      searchVendor: slVendor,
      openAdvancedSearch: (params.options.advancedSearch === 'true' || params.options.advancedSearch === true),
      checkbox: {
        enrollmentDate: params.options.queryEnrollmentDate,
        coupledDate: params.options.queryCoupledDate,
        activationDate: params.options.queryActivationDate,
        deactivationDate: params.options.queryDeactivationDate,
        lastSubscribeDatetime: params.options.queryLastSubscribeDatetime,
        all: params.options.queryAllDate == 'true',
      },
      groupList,
      statusList,
      typeP2List,
      typeP3List,
      loading: false,
      params,
      vendors,
      buildings,
      searchBuilding,
    };
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

  async componentDidMount() {

    this.searchGroup();
    await this.setState({ loading: true });
    let buildings = this.props.buildings;// await getBuilding({limit: 10000});
    let searchBuilding = (buildings.results || []).filter(bd => bd.id == this.props.params.options.queryBuilding)[0];
    if (searchBuilding) {
      let buildingId = searchBuilding.id;
      searchBuilding = { value: searchBuilding.id, label: searchBuilding.id + ' - ' + searchBuilding.name };

      this.state.blocks = await getBlockOfBuilding({ limit: 10000, options: { buildingId: buildingId } });
      let searchBlock = (this.state.blocks?.results || []).filter(bd => bd.id == this.props.params.options.queryBlock)[0];
      let blockId = searchBlock?.id;
      this.state.searchBlock = !searchBlock ? undefined : {
        value: searchBlock?.id,
        label: searchBlock?.id + ' - ' + searchBlock?.name
      };

      this.state.floorLevels = await getFloorLevels({ limit: 10000, options: { buildingId, blockId } });
      let searchFloorLevel = (this.state.floorLevels?.results || []).filter(bd => bd.id == this.props.params.options.queryFloorLevel)[0];
      if (searchFloorLevel) {
        this.state.buildingUnits = await getBuildingUnits({
          limit: 10000,
          options: { floorLevelId: searchFloorLevel.id }
        });
        this.state.searchFloorLevel = {
          value: searchFloorLevel.id,
          label: searchFloorLevel.id + ' - ' + searchFloorLevel.name
        };
        let searchBuildingUnit = (this.state.buildingUnits?.results || []).filter(bd => bd.id == this.props.params.options.queryBuildingUnit)[0];
        if (searchBuildingUnit) {
          this.state.searchBuildingUnit = {
            value: searchBuildingUnit.id,
            label: searchBuildingUnit.id + ' - ' + searchBuildingUnit.name
          };
        }
      }
    }
    this.setState({
      buildings,
      searchBuilding,
      loading: false,
    });
  }

  searchGroup = async () => {
    const params = {};
    const rp = await getUserPermissions(params);
    this.setState({
      permissions: rp?.response.results[0].permissions || [],
    });
    console.log("permissions", this.state.permissions);
    if (this.state.permissions != null) {
      this.state.permissions.map((p, id) => {
        if (p.name === 'PAGE_DEVICES_UPLOAD_DEVICE_CSR_BUTTON_PERM') {
          this.setState({ deviceCsrButton: true });
        }
        if (p.name === 'PAGE_DEVICES_GET_TCM_INFO_BUTTON_PERM') {
          this.setState({ getTcmButton: true });
        }
        if (p.name === 'PAGE_DEVICES_SHOW_METER_CHART_BUTTON_PERM') {
          this.setState({ meterChartButton: true });
        }
        if (p.name === 'PAGE_DEVICES_SET_TIME_INTERVAL_BUTTON_PERM') {
          this.setState({ timeIntervalButton: true });
        }
        if (p.name === 'PAGE_DEVICES_GET_RELAY_STATUS_BUTTON_PERM') {
          this.setState({ relayStatusButton: true });
        }
        if (p.name === 'PAGE_DEVICES_TURN_ON_METER_RELAY_BUTTON_PERM') {
          this.setState({ meterRelayOnButton: true });
        }
        if (p.name === 'PAGE_DEVICES_TURN_OFF_METER_RELAY_BUTTON_PERM') {
          this.setState({ meterRelayOffButton: true });
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
    this.setState({ projectTags: projectTags })
  }

  updateDevice = async (type, message) => {
    let it = this.state.selectedDevice;
    if (!it || !it.id || !!this.state.updated || !!this.state.updatedGroup) {
      const data = {};
      const addressObj = {
        streetNumber: this.state.streetNumber,
        street: this.state.streetName,
        town: this.state.town,
        city: this.state.city,
        country: this.state.country,
        postalCode: this.state.postalCode,
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
        data.account = this.state.detailsData.account?.userId;

        // original address
        data.buildingId = it.building?.id ? it.building.id : null;
        data.blockId = it.block?.id ? it.block.id : null;
        data.floorLevelId = it.floorLevel?.id ? it.floorLevel.id : null;
        data.buildingUnitId = it.buildingUnit?.id ? it.buildingUnit.id : null;
        data.vendor = it.vendor.id;
        data.projectTags = (it.projectTags || []).map(tag => tag.id);
        data.ieiNodes = (it.deviceIEINodes || []).map(tag => tag.ieiNodes || tag.ieiId);

        if (it.address) {
          data.address = { ...it.address }
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

        }
      }
      /*if (!!this.state.updatedGroup) {
        dataGroup.id = this.state.detailsData.group.id;
        dataGroup.remark = this.state.detailsData.group.remark;
      }*/
      if (!!this.state.updatedVendor) {
        data.vendor = this.state.updatedVendor.value;
      }
      if (!!this.state.updatedProject) {
        data.projectTags = (this.state.updatedProject || []).map(tag => tag.value);
      }
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
          response = await editDevice({...data, updateMeter: true});
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
    await this.setState({ loading: true, photoFilter: { ...params } })
    let rp = await getFiles({ ...params })
    await this.setState({ loading: false })
    console.info('rp?.response?.results', rp?.response)
    let piFileUpLoads = (rp?.response || []).map((it, index) => {
      return {
        uri: '/api/file/' + it.uid + '/' + it.id,
        title: it.altName,
        text: ('Uploaded By: ' + (it.uploadedBy || 'System')) + ' (' + moment(it.createdDate).format("YYYY-MM-DD HH:mm:ss") + ') ' + '(' + (index + 1) + '/' + ((rp?.response || []).length) + ')'
      }
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
    this.setState({ piFileUpLoads: piFileUpLoads || [], showPhotoP1Test: true, piFileUpLoadCurrentIndex: 0 });
  }

  getFilters = () => {
    return {
      status: !!this.state.selectedStatus ? this.state.selectedStatus.value : undefined,
      typeP2: !!this.state.selectedP2Type ? this.state.selectedP2Type.value : undefined,
      typeP3: !!this.state.selectedP3Type ? this.state.selectedP3Type.value : undefined,
      fromDate: !!this.state.tempFromDate ? moment(new Date(this.state.tempFromDate)).format('DD/MM/YYYY') : undefined,
      toDate: !!this.state.deToDate ? moment(new Date(this.state.deToDate)).format('DD/MM/YYYY') : undefined,
      querySn: !!this.state.searchSn ? this.state.searchSn : undefined,
      queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : undefined,
      queryUuid: this.state.searchUuid || undefined,
      queryEsimId: this.state.searchEsimId || undefined,
      queryGroup: !!this.state.selectedGroup ? (this.state.selectedGroup.value + '') : undefined,
      enrollmentDate: this.state.checkbox?.enrollmentDate,
      coupledDate: this.state.checkbox?.coupledDate,
      activationDate: this.state.checkbox?.activationDate,
      deactivationDate: this.state.checkbox?.deactivationDate,
      lastSubscribeDatetime: this.state.checkbox?.lastSubscribeDatetime,
      allDate: !(this.state.checkbox?.all === false || this.state.checkbox?.all === 'false'),
      queryBuilding: !!this.state.searchBuilding?.value ? (this.state.searchBuilding?.value + '') : undefined,
      queryBlock: !!this.state.searchBlock?.value ? (this.state.searchBlock?.value + '') : undefined,
      queryFloorLevel: !!this.state.searchFloorLevel?.value ? (this.state.searchFloorLevel?.value + '') : undefined,
      queryBuildingUnit: !!this.state.searchBuildingUnit?.value ? (this.state.searchBuildingUnit?.value + '') : undefined,
      queryPostalCode: this.state.searchPostalCode || undefined,
      queryRemarkMeter: this.state.searchRemarkMeter || undefined,
      queryVendor: !!this.state.searchVendor?.value ? (this.state.searchVendor?.value + '') : undefined,
    }
  }

  render() {
    this.state.updated = true;
    return (
      <TotPage title={'Devices (Meter and Coupled Addr)'}>
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
                      className="col-md-4 file-input"
                      type="file"
                      placeholder={'File upload'}
                      accept=".zip"
                      dataButtonText="Choose CSR in zip file..."
                      onChange={(event) => {
                        this.setState({ file: event.target.files[0], errorImportDevices: [] });
                      }}
                    />
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
                        this.setState({ selectedVendor: event })
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
                    <div className="col-md-6 input-wrap has-feedback has-success"
                         style={{ display: 'flex', flexDirection: 'row', marginLeft: '15px' }}>
                      <div
                        style={{ marginLeft: '0px', margin: 'unset' }}
                        className="button-btn w-80"
                        onClick={async () => {
                          await this.setState({
                            errorImportDevices: []
                          })
                          if (!this.state.file) {
                            this.setState({
                              validateFile: false,
                            })
                          }
                          if (!this.state.selectedVendor?.value) {
                            this.setState({
                              validateVendor: false,
                            })
                          }
                          if (!this.state.file || !this.state.selectedVendor?.value) {
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
                          formData.append('file', this.state.file, this.state.file.name);
                          const vendor = this.state.selectedVendor.value || 1;
                          const url = `api/device-csr/upload/${vendor}`;
                          const method = 'POST';
                          await fetch(url,
                            {
                              method,
                              body: formData,
                            },
                          )
                            .then(response => response.json())
                            .then(response => rp = response)
                            .catch((error) => {
                              console.error('Error:', error);
                            });
                          if (rp?.success) {
                            const result = await Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                              icon: 'success',
                              confirmButtonText: 'OK',
                            });
                            if (result || result.isConfirmed) {
                              require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                            }
                          } else {

                            if (rp?.response && !!rp?.response.length && rp?.response.filter(errItem => !!errItem.message).length) {
                              this.setState({ errorImportDevices: rp?.response.filter(errItem => !!errItem.message) })
                            }
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${rp?.errorDescription || rp?.message}</p>`,
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
                          require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                        }}
                      >
                        <span>{'CANCEL'}</span>
                      </div>
                    </div>
                  </div>
                  {!!this.state.errorImportDevices?.length && (
                    <div className="table-wrap"
                         style={{ width: 'calc(100% - 30px)', padding: '15px', borderTop: '0.75px solid' }}>
                      <span style={{ fontSize: '17px', }}>Error detail</span>
                      <table className="table" style={{
                        marginTop: '15px',
                        pointerEvents: !!this.state.openSubmitReport ? 'none' : null,
                      }}>
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th-first">SN</th>
                          <th className="table-th">UID</th>
                          <th className="table-th">CID</th>
                          <th className="table-th">ERROR</th>
                          <th className="table-th table-th-50"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.errorImportDevices || [])
                          //.slice(((this.state.pageIndex || 0) - 1) * (this.state.pageSize || 10), ((this.state.pageIndex || 0) - 1) * (this.state.pageSize || 10) + (this.state.pageSize || 10))
                          .map((it, idx) => {
                            return (
                              <tr key={idx} style={{
                                flexDirection: 'row',
                                width: '100%',
                                padding: '15px',
                                alignItems: 'center',
                                borderBottom: '1px solid #eeeeee'
                              }} className={this.props.hide === true ? 'force-hide' : ''}>
                                <td>{it.sn}</td>
                                <td>{it.uid}</td>
                                <td>{it.cid}</td>
                                <td>
                                  <div style={{ display: 'flex', flexDirection: 'column', color: 'red' }}>
                                    {(it.message || '').split(/\n/g)
                                      .map((err, errIdx) => {
                                        return (
                                          <span key={idx + '_' + errIdx}>{err}</span>
                                        )
                                      })
                                    }
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
                : null
              }
              {!this.state.uploadDeviceCsr ?
                <>
                  <div style={{
                    padding: '15px',
                    paddingTop: '20px',
                    paddingBottom: '0px',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: '#000000'
                  }}>
                    <span>{'Device Management'} <i className="fa fa-caret-right ml-5 mr-5"/> {'Devices (Meter and Coupled Addr)'}</span>
                    <h5 className="site-title">{'Devices (Meter)'}</h5>
                  </div>
                  <div
                    style={{
                      padding: '0px 30px',
                      // borderBottom: '1px solid #ddd',
                      overflow: "inherit",
                      paddingBottom: '30px',
                      pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                    }}
                  >


                                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="box-checkbox">
                                    {/*
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
                                            }});
                                          } else {
                                            if (!this.state.checkbox?.enrollmentDate &&
                                                !this.state.checkbox?.coupledDate &&
                                                !this.state.checkbox?.activationDate &&
                                                !this.state.checkbox?.deactivationDate
                                            ) {
                                              this.setState({checkbox: {
                                                all: true,
                                                enrollmentDate: false,
                                                coupledDate: false,
                                                activationDate: false,
                                                deactivationDate: false,
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
                                    */}
                                    <div className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        id="enrollment-date"
                                        name="enrollment-date"
                                        checked={!!this.state.checkbox?.lastSubscribeDatetime}
                                        value={this.state.checkbox?.lastSubscribeDatetime}
                                        onChange={(event) => {
                                          if (!!event.target.checked) {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              lastSubscribeDatetime: true,
                                              all: false,
                                            }});
                                          } else {
                                            this.setState({checkbox: {
                                              ...this.state.checkbox,
                                              all: (
                                                     !this.state.checkbox?.coupledDate
                                                  && !this.state.checkbox?.activationDate
                                                  && !this.state.checkbox?.deactivationDate
                                                  && !this.state.checkbox?.deactivationDate
                                              ),
                                              lastSubscribeDatetime: false,
                                            }});
                                          }
                                        }}
                                      />
                                      <span style={{ marginLeft: '5px' }}>{'Last seen'}</span>
                                    </div>
                                    {/*
                                    <>
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
                                              }});
                                            } else {
                                              if (!this.state.checkbox?.enrollmentDate &&
                                                  !this.state.checkbox?.coupledDate &&
                                                  !this.state.checkbox?.activationDate &&
                                                  !this.state.checkbox?.deactivationDate
                                              ) {
                                                this.setState({checkbox: {
                                                  all: true,
                                                  enrollmentDate: false,
                                                  coupledDate: false,
                                                  activationDate: false,
                                                  deactivationDate: false,
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
                                                all: (!this.state.checkbox?.coupledDate && !this.state.checkbox?.activationDate
                                                    && !this.state.checkbox?.deactivationDate),
                                                enrollmentDate: false,
                                              }});
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
                                                all: (!this.state.checkbox?.enrollmentDate && !this.state.checkbox?.activationDate
                                                    && !this.state.checkbox?.deactivationDate),
                                                coupledDate: false,
                                              }});
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
                                                all: (!this.state.checkbox?.enrollmentDate && !this.state.checkbox?.coupledDate
                                                    && !this.state.checkbox?.deactivationDate),
                                                activationDate: false,
                                              }});
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
                                                all: (!this.state.checkbox?.enrollmentDate && !this.state.checkbox?.coupledDate
                                                    && !this.state.checkbox?.activationDate),
                                                deactivationDate: false,
                                              }});
                                            }
                                          }}
                                        />
                                        <span style={{ marginLeft: '5px' }}>{'Deactivation date'}</span>
                                      </div>
                                    </>
                                    */}
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


                    <div style={{ marginTop: '20px', width: '96%' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginBottom: '10px'
                        }}
                      >
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
                            defaultValue={this.state.selectedP2Type || this.state.typeP2List[0]}
                            options={this.state.typeP2List}
                            onChange={(event) => {
                              if (!event.value) {
                                this.setState({ selectedP2Type: undefined });
                              } else {
                                this.setState({ selectedP2Type: event });
                              }
                            }}
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
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            marginBottom: '0',
                            flex: 1,
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
                            value={this.state.searchMsn || ''}
                            placeholder="Search MSN..."
                            onChange={event => this.setState({ searchMsn: event.target.value })}
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
                            value={this.state.searchBuilding || { value: '', label: "Select building" }}
                            options={[{
                              id: '',
                              name: "Select building"
                            }].concat(this.state.buildings.results || []).map(bd => ({
                              value: bd.id,
                              label: bd.id + ' - ' + bd.name
                            }))}
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
                                blocks = await getBlockOfBuilding({
                                  limit: 10000,
                                  options: { buildingId: event.value }
                                });

                                let floorLevels = [];
                                floorLevels = await getFloorLevels({
                                  limit: 10000,
                                  options: { buildingId: event.value }
                                });
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
                            value={this.state.searchBlock || { value: '', label: "Select block" }}
                            options={[{
                              id: '',
                              name: "Select block"
                            }].concat(this.state.blocks?.results || []).map(bd => ({
                              value: bd.id,
                              label: bd.id + ' - ' + bd.name
                            }))}
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
                                floorLevels = await getFloorLevels({
                                  limit: 10000,
                                  options: { blockId: event.value, buildingId: this.state.searchBuilding?.id }
                                });
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
                            value={this.state.searchFloorLevel || { value: '', label: "Select floorLevel" }}
                            options={[{
                              id: '',
                              name: "Select floorLevel"
                            }].concat(this.state.floorLevels.results || []).map(bd => ({
                              value: bd.id,
                              label: bd.id + ' - ' + bd.name
                            }))}
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
                                  options: { floorLevelId: event.value }
                                });
                                this.setState({
                                  buildingUnits
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
                            value={this.state.searchBuildingUnit || { value: '', label: "Select buildingUnit" }}
                            options={[{
                              id: '',
                              name: "Select buildingUnit"
                            }].concat(this.state.buildingUnits.results || []).map(bd => ({
                              value: bd.id,
                              label: bd.id + ' - ' + bd.name
                            }))}
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
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: '15px'
                      }}
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
                            if (!!options.lastSubscribeDatetime) {
                              pathName = pathName + '&queryLastSubscribeDatetime=' + options.lastSubscribeDatetime;
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
                            if (!!options.typeP2) {
                              pathName = pathName + '&typeP2=' + options.typeP2;
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
                            if (!!options.queryRemarkMeter) {
                              pathName = pathName + '&queryRemarkMeter=' + options.queryRemarkMeter;
                            }
                            if (!!options.queryVendor) {
                              pathName = pathName + '&queryVendor=' + options.queryVendor;
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
                            selectedStatus: undefined,
                            searchSn: undefined,
                            searchMsn: undefined,
                            fromDate: undefined,
                            toDate: undefined,
                            searchUuid: undefined,
                            searchEsimId: undefined,
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
                        data-tip="Export data as a CSV file"
                        className="button-btn ml-10 w-max px-10"
                        onClick={async () => {
                          const options = this.getFilters();
                          let {
                            status,
                            typeP2,
                            typeP3,
                            fromDate,
                            toDate,
                            querySn,
                            queryMsn,
                            queryEsimId,
                            queryUuid,
                            queryGroup,
                            queryEnrollmentDate,
                            queryCoupledDate,
                            queryActivationDate,
                            queryDeactivationDate,
                            queryLastSubscribeDatetime,
                            queryAllDate,
                            queryBuilding,
                            queryBlock,
                            queryFloorLevel,
                            queryBuildingUnit,
                            queryPostalCode,
                            queryRemarkMeter,
                            queryVendor,
                            advancedSearch
                          } = options;

                          const filter = {
                            options: {
                              status: !!status ? status : undefined,
                              typeP2: !!typeP2 ? typeP2 : undefined,
                              typeP3: !!typeP3 ? typeP3 : undefined,
                              fromDate: !!fromDate ? roundDate(moment(fromDate, 'DD/MM/YYYY'), 'FROM').getTime() : undefined,
                              toDate: !!toDate ? roundDate(moment(toDate, 'DD/MM/YYYY'), 'TO').getTime() : undefined,
                              querySn: !!querySn ? querySn : undefined,
                              queryMsn: !!queryMsn ? queryMsn : undefined,
                              queryEsimId: !!queryEsimId ? queryEsimId : undefined,
                              queryUuid: !!queryUuid ? queryUuid : undefined,
                              queryGroup: !!queryGroup ? queryGroup : undefined,
                              queryEnrollmentDate,
                              queryCoupledDate,
                              queryActivationDate,
                              queryDeactivationDate,
                              queryLastSubscribeDatetime: "true",
                              queryAllDate: "false",
                              queryBuilding,
                              queryBlock,
                              queryFloorLevel,
                              queryBuildingUnit,
                              queryPostalCode,
                              queryRemarkMeter,
                              queryVendor,
                              advancedSearch,
                              downloadCsv: true,
                              includeMcuSn: true
                            }
                          };
                          const url = '/api/meters' + '?timeZone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
                          const method = 'POST';
                          await this.setState({loading: true});
                          const rp = await fetch(url, {
                            method,
                            body: JSON.stringify(filter),
                            headers: {
                              'Content-Type' : 'application/json',
                              'Authorization': getCookie('access_token'),
                              'A_C': getCookie('app_code'),
                            },
                          })
                          .then((response) => {
                            return response.blob();
                          });
                          await this.setState({loading: false});
                          if (rp) {
                            const tag =  moment(new Date()).format('YYYYMMDD-HHmmss');
                            const fileName = 'meters-' + tag + '.csv';
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
                        data-tip="Export by upload"
                        className="button-btn ml-10 w-max px-10"
                        style={{width: 'unset', paddingLeft: '15px', paddingRight: '15px'}}
                        onClick = {() => {
                          this.setState({openExportByUpload: true});
                        }}
                      >
                        <span>{'EXPORT BY UPLOAD'}</span>
                      </div>
                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                      <div
                        data-tip="P2 Import"
                        className="button-btn ml-10 w-max px-10"
                        style={{width: 'unset', paddingLeft: '15px', paddingRight: '15px'}}
                        onClick = {() => {
                          this.setState({openUploadLinkMSN: true, importChx: {skip: false, override: true}});
                        }}
                      >
                        <span>{'P2 IMPORT'}</span>
                      </div>
                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                      <div
                        data-tip="P2 Import"
                        className="button-btn ml-10 w-max px-10"
                        style={{width: 'unset', paddingLeft: '15px', paddingRight: '15px'}}
                        onClick = {() => {
                          this.setState({openUploadMeter: true, importChx: {skip: false, override: true}});
                        }}
                      >
                        <span>{'P3 IMPORT'}</span>
                      </div>
                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                      <div
                        data-tip="Account Import"
                        className="button-btn ml-10 w-max px-10"
                        style={{width: 'unset', paddingLeft: '15px', paddingRight: '15px'}}
                        onClick = {() => {
                          this.setState({openUploadAccount: true, importChx: {skip: false, override: true}});
                        }}
                      >
                        <span>{'ACCOUNT IMPORT'}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff' }}
                       className="doctor-list"
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                      <div style={{fontWeight: 500, textAlign: 'center', margin: '10px', fontSize: '15px'}}>
                        <span>{'Total: ' + this.state.totalRecords}</span>
                      </div>
                      <table className="table">
                        <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col">MSN</th>
                          <th className="table-th" scope="col">User Account</th>
                          <th className="table-th" scope="col">MCU SN</th>
                          <th className="table-th" scope="col">MCU UUID</th>
                          <th className="table-th" scope="col">ESIM ID</th>
                          <th className="table-th" scope="col">RLS STATUS</th>
                          <th className="table-th" scope="col">STATUS</th>
                          <th className="table-th" scope="col">P2 COUPLE STATE</th>
                          <th className="table-th" scope="col">P3 COUPLE STATE</th>
                          <th className="table-th" scope="col">VERSION</th>
                          <th className="table-th" scope="col">VENDOR (MCU)</th>
                          <th className="table-th" style={{ width: '300px' }} scope="col">LAST SEEN</th>
                          <th className="table-th" scope="col">Group ID/Name Display</th>
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
                              } catch (err) {
                              }
                            }
                            return (
                              <tr
                                key={index}
                                style={{
                                  cursor: 'pointer',
                                  alignItems: 'center',
                                  backgroundColor: this.state.selectedRow === index ? '#d8d8d8' : '#fff',
                                  color: '#000000',
                                }}
                              >
                                <td className="table-td">
                                  <span>{it.msn}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.userAccount}</span>
                                </td>
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
                                  <span>{!!it.uid ? it.rlsStatus : ''}</span>
                                </td>
                                <td className="table-td">
                                  <span>{!!it.uid ? it.status : 'OFFLINE'}</span>
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
                                  <span>{it.lastSubscribeDatetime ? moment(new Date(it.lastSubscribeDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}</span>
                                </td>
                                <td className="table-td">
                                  <span>{!!it.group?.id ? (it.group?.id + ' / ' + (!it.group?.name ? ('Group ' + it.group?.id) : it.group?.name)) : ''}</span>
                                </td>
                                <td className="table-td">
                                  <span>{it.enrollmentDatetime ? moment(new Date(it.enrollmentDatetime)).format('YYYY/MM/DD HH:mm:ss') : ''}</span>
                                </td>
                                <td style={{ padding: '3px', paddingLeft: '30px', display: 'flex', flexDirection: 'row' }}>
                                  <div
                                    style={{
                                      pointerEvents: (it.type !== 'NOT_COUPLED' || it.typeP3 !== 'NOT_COUPLED') ? 'none' : undefined,
                                      opacity: (it.type !== 'NOT_COUPLED' || it.typeP3 !== 'NOT_COUPLED') ? 0.3 : undefined,
                                    }}
                                  >
                                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                    <div
                                      data-tip="Click to delete unuse meter"
                                      className="button-icon"
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
                                              msn: it.msn
                                            };

                                            let rp = await deleteMeter(params);
                                            if (rp.success) {
                                              Swal.fire({
                                                html: `<p style='text-align: center; font-size: 14px;'>Delete successfully!</p>`,
                                                icon: 'success',
                                                confirmButtonText: 'OK',
                                              })
                                                .then(() => {
                                                  window.location.reload();
                                                })
                                            } else {
                                              Swal.fire({
                                                html: `<p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>`,
                                                icon: 'error',
                                                confirmButtonText: 'OK',
                                              })
                                            }
                                          }
                                      }}
                                      >
                                        <span><i className="fa fa-trash"/></span>
                                    </div>
                                  </div>
                                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                  <div
                                    data-tip="Click to see details and edit"
                                    className="button-icon"
                                    onClick={async () => {
                                      const rpGroup = await getDeviceGroups();
                                      const rpInstaller = await getUsers();
                                      await this.getProjectTags();
                                      const rpDeviceGroups = [];
                                      const rpInstallerUsers = [];
                                      const rpAllUsers = [];
                                      this.setState({
                                        addressType: !!it.building?.id ? 'apartment' : 'other',
                                        selectedDevice: { ...it },
                                        loading: true,
                                      });

                                      if (!!it.building) {
                                        this.setState({
                                          selectedBuilding: it.building?.id ? it.building.id : '',
                                          selectedBlock: it.block ? it.block.id : '',
                                          selectedFloor: it.floorLevel?.id ? it.floorLevel.id : '',
                                          selectedUnit: it.buildingUnit?.id ? it.buildingUnit.id : '',
                                        });
                                      } else if (!!it.address) {
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
                                        rpAllUsers.push({
                                          value: rp.id,
                                          label: rp.username,
                                        });
                                      });
                                      let deviceDetail = await getAllMeterDevices({
                                        options: {
                                          queryMsn: it.msn
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
                                        rpAllUsers
                                      });

                                      const buildings = await getBuilding({ limit: 10000 });
                                      let buildingOptions = [];

                                      if (buildings.results) {
                                        buildings.results.forEach((element, index) => {
                                          buildingOptions.push({
                                            value: element.id,
                                            label: element.id + " - " + element.name
                                          })
                                        });
                                      }
                                      this.setState({
                                        selectBuilding: buildingOptions || [],
                                      })
                                      if (it.building?.id) {
                                        let blocks = [];
                                        if (it.building.id) {
                                          blocks = await getBlockOfBuilding({
                                            limit: 10000,
                                            options: { buildingId: it.building.id }
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
                                              options: { buildingId: it.building.id }
                                            });
                                          }
                                        }

                                        let buildingUnits = [];
                                        if (it.floorLevel.id) {
                                          buildingUnits = await getBuildingUnits({
                                            limit: 10000,
                                            options: { floorLevelId: it.floorLevel.id }
                                          });

                                        }

                                        let blockOptions = [];
                                        let floorLevelOptions = [];
                                        let unitOptions = [];

                                        if (blocks.results) {
                                          blocks.results.forEach((element, index) => {
                                            blockOptions.push({
                                              value: element.id,
                                              label: element.id + " - " + element.name
                                            })
                                          });
                                        }

                                        if (floorLevels.results) {
                                          floorLevels.results.forEach((element, index) => {
                                            floorLevelOptions.push({
                                              value: element.id,
                                              label: element.id + " - " + element.name
                                            })
                                          });
                                        }

                                        if (buildingUnits.results) {
                                          buildingUnits.results.forEach((element, index) => {
                                            unitOptions.push({
                                              value: element.id,
                                              label: element.id + " - " + element.name
                                            })
                                          });
                                        }

                                        this.setState({
                                          selectBuilding: buildingOptions || [],
                                          selectBlocks: blockOptions || [],
                                          selectedfloorLevels: floorLevelOptions || [],
                                          selectedBuildingUnit: unitOptions || [],
                                        })
                                      }

                                      this.setState({ loading: false, })
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
                                    <span><i className="fa fa-edit"/></span>
                                  </div>
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
                        <div className="col-sm-12 col-md-5">
                        </div>
                        <div
                          className="col-sm-12 col-md-7 pagination"
                          style={{ justifyContent: 'flex-end', marginBottom: '25px' }}
                        >
                          {this.state.totalRecords > this.state.pageSize && this.state.totalPages >= 2 &&
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
                </> : null}
            </div>
            <Modal open={this.state.openUploadMeter}>
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
                }}
              >
                <CloseButton className="w-5 h-5" onClick={() => this.setState({openUploadMeter: false})}/>
                <Typography variant="h6" component="h2" style={{marginBottom: '20px'}}>
                  Upload Meter CSV file
                </Typography>
                <input
                  style={{marginBottom: '5px'}}
                  type="file"
                  placeholder={'File upload'}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file.name.includes(".csv")) {
                      this.setState({meterImportFile: event.target.files[0]});
                    } else {
                      this.setState({meterImportFile: null});
                    };
                  }}
                />
                <br/>
                <a style={{textDecoration: 'underline'}} download href={'/api/meter/template'} target='_blank'>Download template</a>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="box-checkbox">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="override"
                        name="override"
                        value={this.state.importChx?.override}
                        checked={
                          (this.state.importChx?.override === 'true' || this.state.importChx?.override === true) ? true : false
                        }
                        onChange={(event) => {
                          if (!!event.target.checked) {
                            this.setState({importChx: {
                              override: true,
                              skip: false,
                            }});
                          } else {
                            this.setState({importChx: {
                              override: false,
                              skip: true,
                            }});
                          }
                        }}
                      />
                      <span style={{ marginLeft: '5px' }}>{'Force override'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="box-checkbox">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="skip"
                        name="skip"
                        value={this.state.importChx?.skip}
                        checked={
                          (this.state.importChx?.skip === 'true' || this.state.importChx?.skip === true) ? true : false
                        }
                        onChange={(event) => {
                          if (!!event.target.checked) {
                            this.setState({importChx: {
                              override: false,
                              skip: true,
                            }});
                          } else {
                            this.setState({importChx: {
                              override: true,
                              skip: false,
                            }});
                          }
                        }}
                      />
                      <span style={{ marginLeft: '5px' }}>{'Skip'}</span>
                    </div>
                  </div>
                  <div
                    className="button-btn"
                    style = {{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      border: '0.5px solid #007bff',
                      height: '40px', marginRight: '10px',
                      fontSize: '14px', width: 'fit-content', padding: '15px',
                    }}
                    onClick = {async () => {
                      if (this.state.meterImportFile) {
                        this.state.importType = 'override';
                        let rp = null;
                        const formData = new FormData();
                        formData.append('file', this.state.meterImportFile, this.state.meterImportFile.name);
                        const url = '/api/meter/upload?importType=' + (!!this.state.importChx?.override ? 'Override' : 'Skip');
                        const method = 'POST';

                        await this.setState({loading: true, openUploadMeter: false,});
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
                              meterImportFile: null,
                              openUploadMeter: false,
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
                            const fileName = 'import-meter-result-' + tag + '.csv';
                            const url = window.URL.createObjectURL(new Blob([rp]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', fileName);
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link);

                            this.setState({
                              meterImportFile: null,
                              openUploadMeter: false,
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
                    <span>P3 Couple</span>
                  </div>
                  <div
                    className="button-btn"
                    style = {{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      border: '0.5px solid #007bff',
                      height: '40px', marginRight: '10px',
                      fontSize: '14px', width: 'fit-content', padding: '15px',
                    }}
                    onClick = {async () => {
                      if (this.state.meterImportFile) {
                        this.state.importType = 'override';
                        let rp = null;
                        const formData = new FormData();
                        formData.append('file', this.state.meterImportFile, this.state.meterImportFile.name);
                        const url = '/api/meter/upload?importType=Decouple-address';
                        const method = 'POST';

                        await this.setState({loading: true, openUploadMeter: false,});
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
                              meterImportFile: null,
                              openUploadMeter: false,
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
                            const fileName = 'import-meter-decouple-address-result-' + tag + '.csv';
                            const url = window.URL.createObjectURL(new Blob([rp]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', fileName);
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link);

                            this.setState({
                              meterImportFile: null,
                              openUploadMeter: false,
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
                    <span>P3 Decouple</span>
                  </div>
                  <div
                    className="button-btn"
                    style = {{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      border: '0.5px solid #007bff',
                      height: '40px',
                      fontSize: '14px', width: 'fit-content', padding: '15px',
                    }}
                    onClick = {() => {
                      this.setState({openUploadMeter: false});
                    }}
                  >
                    <span>Cancel</span>
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal open={this.state.openUploadLinkMSN}>
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
                <CloseButton className="w-5 h-5" onClick={() => this.setState({openUploadLinkMSN: false})}/>
                <Typography variant="h6" component="h2" style={{marginBottom: '20px'}}>
                  Upload P2 Couple/Decouple csv file
                </Typography>

                <input
                  style={{marginBottom: '5px'}}
                  type="file"
                  placeholder={'File upload'}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file.name.includes(".csv")) {
                      this.setState({linkMSNImportFile: event.target.files[0]});
                    } else {
                      this.setState({linkMSNImportFile: null});
                    };
                  }}
                />
                <br/>
                <a style={{textDecoration: 'underline'}} download href={'/api/couple-decouple-msn/template'} target='_blank'>Download template</a>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <div
                    className="button-btn"
                    style = {{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      border: '0.5px solid #007bff',
                      width: '100px', height: '40px', marginRight: '10px',
                      fontSize: '20px',
                    }}
                    onClick = {async () => {
                      if (this.state.linkMSNImportFile) {
                        this.state.importType = 'override';
                        let rp = null;
                        const formData = new FormData();
                        formData.append('file', this.state.linkMSNImportFile, this.state.linkMSNImportFile.name);
                        const url = '/api/couple-decouple-msn/upload?importType=' + (!!this.state.importChx?.override ? 'Override' : 'Skip');
                        const method = 'POST';

                        await this.setState({loading: true, openUploadLinkMSN: false,});
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
                              linkMSNImportFile: null,
                              openUploadLinkMSN: false,
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
                            const fileName = 'import-link-unlink-meter-result-' + tag + '.csv';
                            const url = window.URL.createObjectURL(new Blob([rp]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', fileName);
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link);

                            this.setState({
                              linkMSNImportFile: null,
                              openUploadLinkMSN: false,
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
                      border: '0.5px solid #007bff',
                      width: '100px', height: '40px',
                      fontSize: '20px',
                    }}
                    onClick = {() => {
                      this.setState({openUploadLinkMSN: false});
                    }}
                  >
                    <span>Cancel</span>
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal open={this.state.openExportByUpload}>
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
                }}
              >
                <CloseButton className="w-5 h-5" onClick={() => this.setState({openExportByUpload: false})}/>
                <Typography variant="h6" component="h2" style={{marginBottom: '20px'}}>
                  Export by upload
                </Typography>
                <input
                  className="file-input sn-export"
                  style={{width: '100%'}}
                  type="file"
                  placeholder={'File upload'}
                  accept=".csv, .txt"
                  dataButtonText="Choose file contains MCU SN..."
                  onChange={(event) => {
                    this.setState({ file4Export: event.target.files[0] });
                  }}
                />
                <a style={{textDecoration: 'underline'}} download href={'/api/mcu-sn/template'} target='_blank'>Download template</a>
                {this.state.validateFile4Export === false ?
                  <small className="help-block"
                    style={{
                      color: '#eb0000',
                      fontSize: '12px',
                      fontWeight: '400',
                      marginLeft: '15px',
                    }}
                  >
                    {!this.state.file4Export ? 'File is required' : ''}
                  </small>
                  : null}
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
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
                        customClass: {
                          container: "custom-swal-container"
                        }
                      });
                      if (!result || !result.isConfirmed) return;
                      this.setState({loading: true});
                      const formData = new FormData();
                      formData.append('file', this.state.file4Export, this.state.file4Export.name);
                      const url = 'api/export-by-upload-meters' + '?timeZone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
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
                        const fileName = 'meters-' + tag + '.csv';
                        const url = window.URL.createObjectURL(new Blob([rp]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', fileName);
                        document.body.appendChild(link);
                        link.click();
                        link.parentNode.removeChild(link);
                        this.setState({ openExportByUpload: false, file4Export: undefined });
                      } else {
                        alert('Something went wrong. Please try again!');
                      }
                      this.setState({loading: false});
                    }}
                  >
                    <span>{'EXPORT'}</span>
                  </div>
                  <div
                    className="button-btn"
                    style = {{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      border: '0.5px solid #007bff',
                      height: '40px',
                      fontSize: '14px', width: 'fit-content', padding: '15px',
                      marginLeft: '10px'
                    }}
                    onClick = {() => {
                      this.setState({openExportByUpload: false, file4Export: null,});
                    }}
                  >
                    <span>{'CLOSE'}</span>
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal open={this.state.openUploadAccount}>
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
                }}
              >
                <CloseButton className="w-5 h-5" onClick={() => this.setState({openUploadAccount: false})}/>
                <Typography variant="h6" component="h2" style={{marginBottom: '20px'}}>
                  Upload account
                </Typography>
                <div
                  style={{width: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <input
                    style={{marginBottom: '5px'}}
                    type="file"
                    placeholder={'File upload'}
                    accept=".csv, .txt"
                    onChange={(event) => {
                      this.setState({ file4Export: event.target.files[0] });
                    }}
                  />
                  <a style={{textDecoration: 'underline'}} download href={'/api/account/template'} target='_blank'>Download template</a>
                </div>
                {this.state.validateFile4Export === false ?
                  <small
                    className="help-block"
                    style={{
                      color: '#eb0000',
                      fontSize: '12px',
                      fontWeight: '400',
                      marginLeft: '15px',
                    }}
                  >
                    {!this.state.file4Export ? 'File is required' : ''}
                  </small>
                  : null}
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
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
                        customClass: {
                          container: "custom-swal-container"
                        }
                      });
                      if (!result || !result.isConfirmed) return;
                      this.setState({loading: true});
                      const formData = new FormData();
                      formData.append('file', this.state.file4Export, this.state.file4Export.name);
                      const url = 'api/import-account/upload' + '?timeZone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
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
                        const fileName = 'import-account-result-' + tag + '.csv';
                        const url = window.URL.createObjectURL(new Blob([rp]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', fileName);
                        document.body.appendChild(link);
                        link.click();
                        link.parentNode.removeChild(link);
                        this.setState({ openUploadAccount: false, file4Export: undefined });
                      } else {
                        alert('Something went wrong. Please try again!');
                      }
                      this.setState({loading: false});
                    }}
                  >
                    <span>{'IMPORT'}</span>
                  </div>
                  <div
                    className="button-btn"
                    style = {{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      border: '0.5px solid #007bff',
                      height: '40px',
                      fontSize: '14px', width: 'fit-content', padding: '15px',
                      marginLeft: '10px'
                    }}
                    onClick = {() => {
                      this.setState({openUploadAccount: false, file4Export: null,});
                    }}
                  >
                    <span>{'CLOSE'}</span>
                  </div>
                </div>
              </Box>
            </Modal>
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
                  <span style={{ fontSize: '20px', fontWeight: 400, color: '#000000' }}>{'Meter Device Details'}</span>
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
                      });
                    }}
                  >
                    <span>{'BACK'}</span>
                  </button>
                </div>
                <div
                  style={{
                    position: 'relative',
                    height: this.state.collapseMCU === false ? undefined : '30px',
                  }}
                >
                  <div
                    style={{
                      cursor: 'pointer',
                      position: 'absolute',
                      top: 0, right: 0,
                      width: '125px',
                      height: '25px',
                      zIndex: 1,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      this.setState({
                        collapseMCU: this.state.collapseMCU === false ? true : false,
                      }, () => {
                        console.info('this.state.collapseMCU', this.state.collapseMCU);
                      })
                    }}
                  >
                    {/*<i className={this.state.collapseMCU === false ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}/>*/}
                    <a style={{
                      color: '#3e8ef7',
                      textDecoration: 'underline',
                    }}>{this.state.collapseMCU === false ? 'Hide' : 'Show more'}</a>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%', visibility: !!this.state.detailsData?.uid ? undefined : 'hidden' }}>
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
                      >{'eSIM Details'}</span>
                      <table>
                        <thead>
                        <tr>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '180px',
                            maxWidth: '180px',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'eSIM ID (GID)'}
                          </th>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '180px',
                            maxWidth: '180px',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'Activation date'}
                          </th>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '180px',
                            maxWidth: '180px',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'Deactivation date'}
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th style={{
                            color: '#000',
                            fontWeight: '300',
                            fontSize: '14px',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {this.state.detailsData.cid}
                          </th>
                          <th style={{
                            color: '#000',
                            fontWeight: '300',
                            fontSize: '14px',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {!!this.state.detailsData.activationDate ? moment(new Date(this.state.detailsData.activationDate)).format('DD/MM/YYYY HH:mm:ss') : ''}
                          </th>
                          <th style={{
                            color: '#000',
                            fontWeight: '300',
                            fontSize: '14px',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {!!this.state.detailsData.deactivationDate ? moment(new Date(this.state.detailsData.deactivationDate)).format('DD/MM/YYYY HH:mm:ss') : ''}
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
                              backgroundColor: (!!this.state.detailsData?.uid && this.state.detailsData.status === 'ONLINE') ? '#4cdb7e' : '#db4c4c',
                              marginBottom: '10px',
                            }}
                          >
                            <span style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF' }}>{!!this.state.detailsData?.uid ? this.state.detailsData.status : 'OFFLINE'}</span>
                          </div>
                          {!!this.state.detailsData.lastSubscribeDatetime && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <span style={{ fontSize: '15px', fontWeight: 500, color: '#000000' }}>{'Last seen alive'}</span>
                              <span style={{ fontSize: '15px', fontWeight: 500, color: '#000000' }}>{moment(new Date(this.state.detailsData.lastSubscribeDatetime)).format('DD/MM/YYYY HH:mm:ss')}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {!!this.state.detailsData?.uid && (
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
                      {'MCU Module Details'}
                      {!!this.state.detailsData?.isReplaced && (
                        <span style={{
                          color: 'red',
                          marginLeft: '20px',
                          fontSize: '14px'
                        }}>{'This MCU is replaced. Old MCU SN: '}{this.state.detailsData.oldSn}</span>
                      )}
                    </span>
                    <table>
                      <thead>
                      <tr>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'MCU SN (QR Code)'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'MCU UUID'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Enrolment date'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'MCU Vendor Type'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Device csr'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Version'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'P1 Online'}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {this.state.detailsData.sn}
                        </th>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {this.state.detailsData.uid}
                        </th>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {!!this.state.detailsData.enrollmentDatetime ? moment(new Date(this.state.detailsData.enrollmentDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}
                        </th>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Vendor name: '}</span>
                              <span style={{ fontWeight: 'bold' }}>{this.state.detailsData?.vendor?.name}</span>
                            </span>
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Signature Algorithm: '}</span>
                              <span style={{ fontWeight: 'bold' }}>{this.state.detailsData?.vendor?.signatureAlgorithm || ''}</span>
                            </span>
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Key Type: '}</span>
                              <span style={{ fontWeight: 'bold' }}>{this.state.detailsData?.vendor?.keyType || ''}</span>
                            </span>
                          </div>
                        </th>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Signature Algorithm: '}</span>
                              <span style={{ fontWeight: 'bold' }}>{this.state.detailsData?.deviceCsrSignatureAlgorithm || ''}</span>
                            </span>
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Device Key Type: '}</span>
                              <span style={{ fontWeight: 'bold' }}>{this.state.detailsData?.deviceKeyType || ''}</span>
                            </span>
                          </div>
                        </th>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {this.state.detailsData.ver}
                        </th>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>
                              <span style={{ minWidth: '120px', display: 'inline-block', }}>{'P1 Online status: '}</span>
                              <span style={{ fontWeight: 'bold' }}>{this.state.detailsData.p1Online || 'P1 Unknown'}</span>
                            </span>
                            {!!this.state.detailsData.p1OnlineLastUserSent && (
                              <span>
                                <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Sent by: '}</span>
                                <span style={{ fontWeight: 'bold' }}>{this.state.detailsData.p1OnlineLastUserSent || 'Unknown'}</span>
                              </span>
                            )}
                            {!!this.state.detailsData.p1OnlineLastSent && (
                              <span>
                                <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Last sent: '}</span>
                                <span style={{ fontWeight: 'bold' }}>{moment(new Date(this.state.detailsData.p1OnlineLastSent)).format('DD/MM/YYYY HH:mm:ss') || 'Unknown'}</span>
                              </span>
                            )}
                            {!!this.state.detailsData.p1OnlineLastReceived && (
                              <span>
                                <span style={{ minWidth: '120px', display: 'inline-block', }}>{'Last received: '}</span>
                                <span style={{ fontWeight: 'bold' }}>{moment(new Date(this.state.detailsData.p1OnlineLastReceived)).format('DD/MM/YYYY HH:mm:ss') || 'Unknown'}</span>
                              </span>
                            )}
                          </div>
                        </th>
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
                            this.setState({ replaceDevice: true });
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
                                let deviceDetail = await getAllMeterDevices({
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
                              } catch (err) {
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
                  )}
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
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', overflow: 'unset', pointerEvents: !!this.state.detailsData?.uid ? undefined : 'none' }}>
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
                    >{'MCU Vendor Details'}</span>
                    <table>
                      <thead>
                      <tr>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '30%',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Name'}
                        </th>
                        <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '30%', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                          {'Remark for MCU'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '70%',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Description'}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
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
                                value={this.state.updatedVendor || {
                                  value: this.state.detailsData?.vendor?.id,
                                  label: this.state.detailsData?.vendor?.name
                                }}
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
                          {this.state.detailsData?.remarkMCU}
                        </th>
                        <th style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {this.state.updatedVendor?.value ? this.state.vendors.filter(vd => vd.value === this.state.updatedVendor.value)[0].description : this.state.detailsData.vendor.description}
                        </th>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', overflow: 'unset', pointerEvents: !!this.state.detailsData?.uid ? undefined : 'none' }}>
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
                    >{'Project Tags'}</span>
                    <table>
                      <thead>
                      <tr>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '100%',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Name'}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: '14px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
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
                                  this.state.updatedProject || (this.state.detailsData.projectTags || []).map(tag => {
                                    return {
                                      value: tag.id,
                                      label: tag.name
                                    }
                                  })
                                }
                                options={this.state.projectTags || []}
                                onChange={(event) => {
                                  this.setState({ updatedProject: event });
                                }}
                                isMulti
                                isDisabled={!(this.props.userInfo.authorities || []).filter(r => r.authority === 'SUPER_ADMIN').length}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px'}}>
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
                  >{'Meter Details'}</span>
                  <table>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#f7f7f7',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '180px',
                        maxWidth: '180px',
                        padding: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {'Meter SN (Bar Code)'}
                      </th>
                      <th style={{
                        backgroundColor: '#f7f7f7',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '180px',
                        maxWidth: '180px',
                        padding: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {'Account'}
                      </th>
                      <th style={{
                        backgroundColor: '#f7f7f7',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '180px',
                        maxWidth: '180px',
                        padding: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {!!this.state.detailsData?.uid ? 'P2 Coupled Time / Coupled User' : 'P2 De-Coupled Time / De-Coupled User'}
                      </th>
                      <th style={{
                        backgroundColor: '#f7f7f7',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '180px',
                        maxWidth: '180px',
                        padding: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {(!!this.state.detailsData.buildingUnit?.id || !this.state.detailsData.latestDecoupleMeterAddress) ? 'P3 Coupled Time / Coupled User' : 'P3 De-Coupled Time / De-Coupled User'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Meter Group Name'}
                      </th>
                      <th style={{ backgroundColor: '#f7f7f7', color: '#000', fontWeight: '400', fontSize: '14px', width: '180px', maxWidth: '180px', padding: '10px', border: '1px solid #e6e6e6' }}>
                        {'Remark for Meter'}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        {!!this.state.detailsData?.uid ? (
                        <input
                          value={this.state.detailsData.msn}
                          style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                          onChange={(event) => {
                            this.setState({
                              detailsData: { ...this.state.detailsData, msn: event.target.value },
                              updated: true
                            });
                          }}
                        />
                        ) : (
                          <span style={{paddingLeft: '10px'}}>{this.state.detailsData.msn}</span>
                        )}
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <select
                          style={{ outline: 'unset', width: '100%', height: '35px', pointerEvents: !!this.state.detailsData?.uid ? undefined : 'none' }}
                          className="select-installer-user"
                          value={this.state.detailsData.account?.userId || ''}
                          onChange={(event) => {
                            this.setState({
                              detailsData: {
                                ...this.state.detailsData,
                                account: {
                                  ...this.state.detailsData.account,
                                  userId: !!event.target.value ? parseInt(event.target.value) : null
                                }
                              },
                              updated: true,
                            });
                          }}
                        >
                          <option value="">{'Select user account'}</option>
                          {this.state.rpAllUsers.map(rdg => (
                            <option key={rdg.value} value={rdg.value}>{rdg.value + " - " + rdg.label}</option>
                          ))}
                        </select>
                      </th>
                      <th style={{
                        color: '#000',
                        fontWeight: '300',
                        fontSize: '14px',
                        paddingLeft: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {this.state.detailsData.type !== 'COUPLED' ? (!!this.state.detailsData.lastestDecoupleTime ? moment(new Date(this.state.detailsData.lastestDecoupleTime)).format('DD/MM/YYYY HH:mm:ss') : '') : !!this.state.detailsData.coupledDatetime ? moment(new Date(this.state.detailsData.coupledDatetime)).format('DD/MM/YYYY HH:mm:ss') : ''}
                        {' / '} {this.state.detailsData.type !== 'COUPLED' ? this.state.detailsData.lastestDecoupleUser : this.state.detailsData.coupledUser}
                      </th>
                      <th style={{
                        color: '#000',
                        fontWeight: '300',
                        fontSize: '14px',
                        paddingLeft: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {(!this.state.detailsData.buildingUnit?.id && this.state.detailsData.latestDecoupleMeterAddress)
                        ? (moment(new Date(Number(this.state.detailsData.latestDecoupleMeterAddress.split('@@')[1]) || 0)).format('DD/MM/YYYY HH:mm:ss') + ' / ' + this.state.detailsData.latestDecoupleMeterAddress.split('@@')[2])
                        : ''}
                        {(!!this.state.detailsData.buildingUnit?.id && this.state.detailsData.latestCoupledMeterAddress)
                        ? (moment(new Date(Number(this.state.detailsData.latestCoupledMeterAddress.split('@@')[1]) || 0)).format('DD/MM/YYYY HH:mm:ss') + ' / ' + this.state.detailsData.latestCoupledMeterAddress.split('@@')[2])
                        : ''}
                      </th>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <select
                          style={{ outline: 'unset', width: '100%', height: '35px', pointerEvents: !!this.state.detailsData?.uid ? undefined : 'none' }}
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
                            <option key={rdg.value} value={rdg.value}>{rdg.value + ' - ' + (!!rdg.label ? rdg.label : ('Group ' + rdg.value))}</option>
                          ))}
                        </select>
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

                  {!!this.state.detailsData?.uid && (
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
                        await this.getFiles({ uid: this.state.detailsData.uid, type: 'MMS_P1_TEST' });
                      }}
                    >
                      <span>{'PHOTO P1 TEST'}</span>
                    </div>
                    <div
                      style={{ width: '120px', marginRight: '10px' }}
                      className="button-btn"
                      onClick={async () => {
                        await this.getFiles({ uid: this.state.detailsData.uid, type: 'MMS_P2_TEST' });
                      }}
                    >
                      <span>{'PHOTO P2 TEST'}</span>
                    </div>
                    <div
                      style={{ width: 'fit-content', marginRight: 'auto', padding: '15px', }}
                      className="button-btn"
                      onClick={async () => {
                        await this.setState({ loading: true, p2MeterCommissioningReport: null });
                        let res = await getLastSubmit({
                          uid: this.state.detailsData?.uid || '',
                          msn: this.state.detailsData?.msn || ''
                        });
                        if (res && res.success) {
                          await this.setState({
                            openP2MeterCommissioningReport: true,
                            p2MeterCommissioningReport: res.response
                          });
                        } else {
                          Swal.fire({
                            html: `<p style='text-align: center; font-size: 14px;'>${'Error: ' + (res?.message || 'System error!')}</p>`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                          });
                        }
                        await this.setState({ loading: false });
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
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', opacity: 0, maxHeight: 0}}>
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
                  >{'General Details'}</span>
                  <table>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#f7f7f7',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '180px',
                        maxWidth: '180px',
                        padding: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {'Installer Name'}
                      </th>
                      {/*<th style={{
                        backgroundColor: '#f7f7f7',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '180px',
                        maxWidth: '180px',
                        padding: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {'Remark'}
                      </th>*/}
                      <th style={{
                        backgroundColor: '#f7f7f7',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '180px',
                        maxWidth: '180px',
                        padding: '10px',
                        border: '1px solid #e6e6e6'
                      }}>
                        {'Group Name'}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <select
                          style={{ outline: 'unset', width: '100%', height: '35px', pointerEvents: !!this.state.detailsData?.uid ? undefined : 'none' }}
                          className="select-installer-user"
                          value={this.state.detailsData.installer?.userId || ''}
                          onChange={(event) => {
                            this.setState({
                              detailsData: {
                                ...this.state.detailsData,
                                installer: {
                                  ...this.state.detailsData.installer,
                                  userId: !!event.target.value ? parseInt(event.target.value) : null
                                }
                              },
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
                          value={this.state.detailsData.remark}
                          style={{ outline: 'unset', border: '0.5px solid #e1e1e1', width: '100%', height: '35px' }}
                          onChange={(event) => {
                            this.setState({
                              detailsData: {
                                ...this.state.detailsData,
                                remark: event.target.value,
                              },
                              updatedGroup: true,
                            });
                          }}
                        />
                      </th>*/}
                      <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                        <select
                          style={{ outline: 'unset', width: '100%', height: '35px', pointerEvents: !!this.state.detailsData?.uid ? undefined : 'none' }}
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
                  <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                    <Radio
                      field={{
                        name: "radio1"
                      }}
                      key={this.state.addressType}
                      name="radio1"
                      className="radio-inline"
                      groupstyle={{ margin: "auto", fontSize: '13px' }}
                      textStyle={{ color: '#000', fontWeight: 400 }}
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
                          this.setState({ addressType: option.value })
                        }
                      }}
                    />
                  </div>
                  {this.state.addressType === 'apartment' ?
                    <table>
                      <thead>
                      <tr>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Building'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Block'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Floor level'}
                        </th>
                        <th style={{
                          backgroundColor: '#f7f7f7',
                          color: '#000',
                          fontWeight: '400',
                          fontSize: '14px',
                          width: '180px',
                          maxWidth: '180px',
                          padding: '10px',
                          border: '1px solid #e6e6e6'
                        }}>
                          {'Building Unit'}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
                          <Select
                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                            className="select-installer-user"
                            name="Building"
                            value={(this.state.selectBuilding || []).find(e => e.value === this.state.selectedBuilding)}
                            options={this.state.selectBuilding}
                            onChange={async (event) => {
                              //console.log("event :", event)
                              this.setState({
                                selectedBuilding: event.value,
                                updated: true
                              });
                              var Promise = require('promise');
                              await Promise.all([
                                getBlockOfBuilding({ limit: 10000, options: { buildingId: event.value } }),
                                getFloorLevels({
                                  limit: 10000,
                                  options: { buildingId: event.value, checkLevelNoBlock: true }
                                }),
                              ]).then((values) => {

                                let blockOptions = [];
                                let floorOptions = [];

                                if (values[0].results) {
                                  values[0].results.forEach((element, index) => {
                                    blockOptions.push({ value: element.id, label: element.id + " - " + element.name })
                                  });
                                }

                                if (values[1].results) {
                                  values[1].results.forEach((element, index) => {
                                    floorOptions.push({ value: element.id, label: element.id + " - " + element.name })
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
                            className="select-installer-user"
                            name="Block"
                            value={(this.state.selectBlocks || []).filter(e => e.value === this.state.selectedBlock)}
                            options={this.state.selectBlocks}
                            onChange={async (event) => {
                              this.setState({
                                selectedBlock: event.value,
                                updated: true
                              });
                              let floorLevels = [];
                              floorLevels = await getFloorLevels({
                                limit: 10000,
                                options: { blockId: event.value, buildingId: this.state.selectedBuilding?.id }
                              });

                              let floorOptions = [];

                              if (floorLevels.results) {
                                floorLevels.results.forEach((element, index) => {
                                  floorOptions.push({ value: element.id, label: element.id + " - " + element.name })
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
                            className="select-installer-user"
                            name="floorLevel"
                            value={(this.state.selectedfloorLevels || []).filter(e => e.value === this.state.selectedFloor)}
                            options={this.state.selectedfloorLevels}
                            onChange={async (event) => {
                              this.setState({
                                selectedFloor: event.value,
                                updated: true
                              });
                              let buildingUnits = [];
                              buildingUnits = await getBuildingUnits({
                                limit: 10000,
                                options: { floorLevelId: event.value }
                              });

                              let unitOptions = [];

                              if (buildingUnits.results) {
                                buildingUnits.results.forEach((element, index) => {
                                  unitOptions.push({ value: element.id, label: element.id + " - " + element.name })
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
                            style={{ outline: 'unset', width: '100%', height: '35px' }}
                            className="select-installer-user"
                            value={(this.state.selectedBuildingUnit || []).filter(e => e.value === this.state.selectedUnit)}
                            options={this.state.selectedBuildingUnit}
                            onChange={(event) => {
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
                    </table> : null}
                  {this.state.addressType === 'other' ?
                    <div>
                      <table>
                        <thead>
                        <tr>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '20%',
                            maxWidth: '9%',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'Street Number'}
                          </th>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '9%',
                            maxWidth: '20%',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'Street Name'}
                          </th>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '9%',
                            maxWidth: '20%',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'Town'}
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th
                            style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
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
                          <th
                            style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
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
                          <th
                            style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
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
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '20%',
                            maxWidth: '9%',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'City'}
                          </th>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '9%',
                            maxWidth: '20%',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'Country'}
                          </th>
                          <th style={{
                            backgroundColor: '#f7f7f7',
                            color: '#000',
                            fontWeight: '400',
                            fontSize: '14px',
                            width: '9%',
                            maxWidth: '20%',
                            padding: '10px',
                            border: '1px solid #e6e6e6'
                          }}>
                            {'Postal Code'}
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th
                            style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
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
                          <th
                            style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
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
                          <th
                            style={{ color: '#000', fontWeight: '300', fontSize: '14px', border: '1px solid #e6e6e6' }}>
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
                    </div> : null}
                  {(true || !!this.state.detailsData?.uid) && (
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
                  )}
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
                  {(!true) && <div
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
                        this.setState({ openRemoveReason: true })
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ width: '135px' }}>{'Remove reason:'}</div>
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
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%'
                    }}>
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
                    <div style={{
                      position: 'relative',
                      minHeight: '400px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      marginRight: '60px',
                    }}>
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
                        style={{
                          width: '500px', maxWidth: '500px', backgroundColor: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '20px',
                        }}
                      >
                        {!!this.state.piFileUpLoads?.length && (
                          <>
                                  <span style={{
                                    fontSize: 15, marginTop: 5,
                                    fontWeight: '500',
                                    marginBottom: '15px',
                                  }}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].title || 'Title'}</span>
                            <span
                              style={{}}>{this.state.piFileUpLoads[this.state.piFileUpLoadCurrentIndex].text || 'Text'}</span>
                          </>
                        )}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
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
                        style={{ position: 'absolute', right: '0px', bottom: '15px', cursor: 'pointer', opacity: 0 }}
                      >
                        <input
                          ref={_ref => this.photoInput = _ref}
                          className="col-md-4 file-input"
                          type="file"
                          style={{ visibility: 'hidden', width: '0px', height: '0px' }}
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
                            await this.setState({ loading: true });
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
                                this.setState({ loading: false });
                              });
                            if (rp?.success) {
                              await this.getFiles(this.state.photoFilter);
                              const result = await Swal.fire({
                                html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                icon: 'success',
                                confirmButtonText: 'OK',
                              });
                            }
                            this.setState({ loading: false });
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
                          this.setState({ piFileUpLoadCurrentIndex })
                        }}
                      >
                        <i className="fa fa-arrow-left" style={{}}/>
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
                          this.setState({ piFileUpLoadCurrentIndex })
                        }}
                      >
                        <i className="fa fa-arrow-right" style={{}}/>
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
                <div style={{ overflow: 'auto', width: '100%', height: '60%' }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th" scope="col">IP Address</th>
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
                              {r.ftpResStatus}
                            </td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                </div>
                <button
                  className="button-btn w-80"
                  style={{
                    alignSelf: 'center',
                    border: 'unset',
                    outline: 'unset',
                  }}
                  onClick={() => {
                    this.setState({ mdtPiStatus: undefined });
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
                                              this.setState({
                                                openP2MeterCommissioningReport: false,
                                                p2MeterCommissioningReport: null,
                                              });
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
                    value={this.state.activateDate || moment(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')}
                    onChange={event => this.setState({ activateDate: event.target.value })}
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
                          'Content-Type': 'application/json',
                        },
                      })
                        .then((response) => {
                          return response.blob();
                        });
                      if (rp) {
                        const tag = moment(new Date()).format('YYYYMMDD');
                        const fileName = 'ca-request-logs-' + tag + '.csv';
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
          backgroundColor: '#BD2228',
          borderColor: '#BD2228',
          borderRadius: '5px',
          borderWidth: '1px',
          marginTop: '56px',
          width: '160px',
          height: '41px',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          fontWeight: '500',
        },
      },
      showLastSubmit: { data: props.p2MeterCommissioningReport || {} },
    };
  }

  render() {

    let styles = this.state.styles;
    return (
      <div style={{ width: '600px', backgroundColor: '#fff', position: 'relative', overflow: 'auto' }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              borderRightWidth: '0.75px',
              borderRightColor: '#777777',
              padding: '15px',
              textAlign: 'center',
              fontSize: '20px',
            }}
          >
            <span style={{
              color: '#111111',
              fontWeight: '500',
              padding: '10px'
            }}>{'Last P2Meter Commissioning Report'}</span>
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: '10px'
            }}>
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
                <span style={{ color: '#111111', fontWeight: '500', width: '100px' }}>{'MCU Profile:'}</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <div style={{
                  flex: 1,
                  marginLeft: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '10px'
                    }}>
                    <div style={{ marginRight: '10px' }}>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{'MCU SN: '}</span>
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
                    <div style={{ marginRight: '10px' }}>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{'MCU UUID: '}</span>
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
                    <div style={{ marginRight: '10px' }}>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{'ESIM ID: '}</span>
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
                    <div style={{ marginRight: '10px' }}>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{'STATUS: '}</span>
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
                    <div style={{ marginRight: '10px' }}>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{'COUPLED STATE: '}</span>
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
                    <div style={{ marginRight: '10px' }}>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{'COUPLED USER: '}</span>
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
                <span style={{ color: '#111111', fontWeight: '500', width: '100px' }}>{'Meter SN:'}</span>
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
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '10px'
                    }}>
                    <div style={{ marginRight: '10px' }}>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{'Meter SN: '}</span>
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
                <span style={{ color: '#111111', fontWeight: '500', width: '100px' }}>{'Meter Data:'}</span>
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
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '5px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'Kwh: ' + (this.state.showLastSubmit?.data?.kwh || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '5px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'Kw: ' + (this.state.showLastSubmit?.data?.kw || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '5px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'I: ' + (this.state.showLastSubmit?.data?.i || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '5px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'V: ' + (this.state.showLastSubmit?.data?.v || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '5px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{''}</span>
                    </div>
                    <div>
                      <span style={{}}>{'PF: ' + (this.state.showLastSubmit?.data?.pf || '')}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '5px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{''}</span>
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
                <span style={{ color: '#111111', fontWeight: '500', width: '100px' }}>{'P2Submit user:'}</span>
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
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '10px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>
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
                <span style={{ color: '#111111', fontWeight: '500', width: '100px' }}>{'P2Checking time:'}</span>
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
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: '10px'
                    }}>
                    <div>
                      <span style={{ color: '#111111', fontWeight: '500' }}>{''}</span>
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
                <span style={{ color: '#111111', fontWeight: '500', width: '100px' }}>{'Meter photo:'}</span>
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
                <span style={{ color: '#111111', fontWeight: '500', width: '100px' }}>{'P2Checking Result:'}</span>
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
        <div style={{
          fontSize: '20px', position: 'absolute', right: '0', top: '0', cursor: 'pointer',
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
          <i className="fa fa-close"/>
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

    this.setState({
      lineChartData: timeData,
      dailyChartData,
      found: !!data.length,
      newData: !!data.length ? Date.now() : this.state.newData
    });
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
                slantedText: true,
                slantedTextAngle: 90,
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
