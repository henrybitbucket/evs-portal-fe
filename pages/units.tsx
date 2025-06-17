import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination, ProgressLoading } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';

import { PublicFooter } from '@app/components/Footer/PublicFooter';
import { PublicHeader } from '@app/components/Header/PublicHeader';
import { Button, CloseButton } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';
import { GoogleMap, Marker, InfoWindow, withGoogleMap } from "react-google-maps"

import { AppointmentTime } from '@app/components/Common/AppointmentTime';

import 'moment-timezone';
import moment from 'moment';
import {
  deleteBlockOfBuilding,
  deleteBuildingUnit,
  deleteFloorLevel,
  getBlockOfBuilding,
  getBuilding,
  getBuildingUnits,
  getFloorLevels,
  saveBlockOfBuilding,
  saveBuilding,
  saveBuildingUnit,
  saveFloorLevel,
} from '@app/api/log';
import { Box, Modal, Typography } from "@material-ui/core";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const Swal = require('sweetalert2');
const animatedComponents = makeAnimated();

const buildGatewayId = (smartDbNumber, mac) => {
  if (!mac || !smartDbNumber || mac.replace(/:/g, '').length != 12) {
    return '';
  }
  return (smartDbNumber + '-' + mac.replace(/:/g, '')).toLowerCase();
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
`;

interface IDashboardPageState {

}

const typeList = [
  { value: '', label: 'Select Couple State...' },
  { value: 'not_couple', label: 'NOT COUPLED' },
  { value: 'coupled', label: 'COUPLED' },
];

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  state = {
    ...this.props,
    checkbox: {
      all: this.props.coupleState !== 'coupled' && this.props.coupleState !== 'not_couple',
      coupled: this.props.coupleState === 'coupled',
      not_couple: this.props.coupleState === 'not_couple',
    },
    buildings: [],
    floorLevels: [],
    buildingUnits: [],
  };

  constructor(props) {
    super(props);
    this.state.setFormPosition = "none";
    this.state.buttonHide = "none";
    this.state.o = {};
    this.state.address = {};
    this.state.descriptionErrorMessage = '';
    this.state.nameErrorMessage = '';
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
    this.state.objAddress = {
      buildingName: '',
      streetAddress: '',
      city: '',
      postal: '',
      blocks: '',
    };
    this.state.listBlocks = [];
    this.state.listLevels = [];
    this.state.listUnits = [];
    this.state.selectedBlock = '';
    this.state.selectedLevel = '';
    this.state.selectedUnit = '';
    this.state.block = [];
    this.state.floor = [];
    this.state.unit = [];
  }

  static getInitialProps = async (args) => {
    let {
      query: {
        q,
        page,
        search,
        coupleState,
        exportCSV,
        exportType,
        querySn,
        queryMsn,
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
        queryPostalCode,
        queryStreet,
      }, asPath, req, initialState: {}
    } = args;

    let pageNumber = Number(page) || 1;
    let params = {
      searchAll: search,
      pageNumber: pageNumber,
      limit: 10,
      offset: (pageNumber - 1) * 10,
      options: {
        coupleState: coupleState || "all",
        detailUnit: "true",
        exportType,
        querySn,
        queryMsn,
        queryBuilding,
        queryBlock,
        queryFloorLevel,
        queryBuildingUnit,
        queryPostalCode,
        queryStreet
      }
    };
    let rp = {};

    try {
      rp = await getBuilding(params, req);
      rp = rp || {};
      rp.results = rp.results || [];
    } catch (err) {
      console.log("err", err);
    }

    let slType;
    if (!!coupleState) {
      const result = typeList.filter(st => st.value === coupleState);
      if (result.length > 0) {
        slType = result[0];
      }
    }

    const buildings = await getBuilding({ limit: 10000 }, req);
    let searchBuilding = (buildings.results || []).filter(bd => bd.id == queryBuilding)[0];
    if (searchBuilding) {
      searchBuilding = { value: searchBuilding.id, label: searchBuilding.id + ' - ' + searchBuilding.name };
    }

    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
      tableBuildings: rp.results || [],
      totalRecords: rp.totalRows || 0,
      totalPages: Math.floor(((rp.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.totalRows || 0) + 9) / 10),
      search: search,
      coupleState,
      exportCSV,
      exportCSVParams: !!exportCSV ? params : null,
      typeList,
      selectedType: slType,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      searchPostalCode: params.options.queryPostalCode,
      searchStreet: params.options.queryStreet,
      loading: false,
      params,
      buildingsOptions: buildings.results || [],
      searchBuilding,
      appCode: getCookie('app_code', req),
    };
  }

  async componentDidMount() {
    this.setState({ mapKey: Date.now(), loading: true });
    let buildings = this.props.buildingsOptions;
    let searchBuilding = buildings.filter(bd => bd.id == this.props.params.options.queryBuilding)[0];
    if (searchBuilding) {
      let buildingId = searchBuilding.id;

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

    if (this.props.exportCSVParams) {
      try {
        this.props.exportCSVParams.options = this.props.exportCSVParams.options || {};
        this.props.exportCSVParams.options.exportCSV = 'true';

        let timeZone = '';
        try {
          timeZone = '?timeZone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (errr) {
        }
        const url = '/api/buildings' + timeZone;
        const method = 'POST';
        const rp = await fetch(url, {
          method,
          body: JSON.stringify(this.props.exportCSVParams),
          headers: {
            'Content-Type': 'application/json',
            'A_C': getCookie('app_code'),
            'Authorization': getCookie('access_token'),
          },
        })
          .then((response) => {
            return response.blob();
          });
        if (rp) {
          const tag = moment(new Date()).format('YYYYMMDDHHmmss');
          const fileName = 'address-' + tag + '.csv';
          const url = window.URL.createObjectURL(new Blob([rp]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          require('@app/utils/next-routes').Router.pushRoute(window.location.href.replace(window.location.origin, '').replace('&exportCSV=true', '').replace(/&exportType=[a-zA-Z-]+/g, ''));
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    this.setState({
      buildingsOptions: buildings,
      loading: false,
    });
  }

  checkInput = () => {
    let count = 0;

    if (this.state.street == '' || this.state.street == undefined) {
      this.setState({ nameErrorMessage: 'Street address is required!' });
      count += 1;
    } else {
      this.setState({ nameErrorMessage: '' });
    }
    if (this.state.city == '' || this.state.city == undefined) {
      this.setState({ addressDisplayNameErrorMessage: 'City is required!' });
      count += 1;
    } else {
      this.setState({ addressDisplayNameErrorMessage: '' });
    }
    if (this.state.postalCode == '' || this.state.postalCode == undefined) {
      this.setState({ addressBlockErrorMessage: 'Postal code is required!' });
      count += 1;
    } else {
      this.setState({ addressBlockErrorMessage: '' });
    }
    console.log(count);
    return count;
  }

  getFiltersUrl = () => {
    const options = {
      type: !!this.state.selectedType ? this.state.selectedType.value : undefined,
      querySn: !!this.state.searchSn ? this.state.searchSn : undefined,
      queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : undefined,
      queryBuilding: this.state.searchBuilding?.value || undefined,
      queryBlock: this.state.searchBlock?.value || undefined,
      queryFloorLevel: this.state.searchFloorLevel?.value || undefined,
      queryBuildingUnit: this.state.searchBuildingUnit?.value || undefined,
      queryPostalCode: this.state.searchPostalCode || undefined,
      queryStreet: this.state.searchStreet || undefined,
    }
    let pathName = window.location.pathname;
    if (!!options.type) {
      pathName = pathName + '?coupleState=' + options.type;
    } else {
      pathName = pathName + '?coupleState=all';
    }
    if (!!options.querySn) {
      pathName = pathName + '&querySn=' + options.querySn;
    }
    if (!!options.queryMsn) {
      pathName = pathName + '&queryMsn=' + options.queryMsn;
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
    if (!!options.queryStreet) {
      pathName = pathName + '&queryStreet=' + options.queryStreet;
    }
    return pathName;
  }

  render() {
    const { t } = this.props;
    this.files = this.files || [];

    return (
      <TotPage title={'Address Search and Export'}>
        <div className="dashboard">
          <style jsx>{styles}</style>
          {!!this.state.loading && (
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
          )}
          <PageContent>
            <div
              style={{
                background: 'transparent',
                minHeight: '450px',
                //height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                flex: 1,
                minHeight: '100%',
                position: 'relative',
              }}
            >
              <div style={{
                padding: '15px',
                borderBottom: '1px solid #ddd',
                paddingTop: '20px',
                paddingBottom: '20px',
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                backgroundColor: '#99d3ff',
                overflow: 'unset'
              }}>
                <h5 style={{ color: '#111', fontSize: '30px', flex: "1" }}>Address Search and Export</h5>
                <div style={{ marginTop: '20px', width: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    {this.props.appCode === 'MMS' && (
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
                          height: '38px',
                          width: '24%',
                          paddingLeft: '10px',
                          alignSelf: 'center',
                        }}
                        value={this.state.searchSn || ''}
                        placeholder="Search MCU SN..."
                        onChange={event => this.setState({ searchSn: event.target.value })}
                      />
                    </div>
                    )}
                    {this.props.appCode === 'MMS' && (
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
                          height: '38px',
                          width: '24%',
                          paddingLeft: '10px',
                          alignSelf: 'center',
                        }}
                        value={this.state.searchMsn || ''}
                        placeholder="Search MSN..."
                        onChange={event => this.setState({ searchMsn: event.target.value })}
                      />
                    </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                      }}
                      className="item"
                    ></div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    {this.props.appCode === 'MMS' && (
                    <div
                      style={{
                        display: 'flex',
                        height: '38px',
                      }}
                      className="item"
                    >
                      <Select
                        className="multi-select-address"
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
                    </div>
                    )}
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
                          height: '38px',
                          width: '24%',
                          paddingLeft: '10px',
                          alignSelf: 'center',
                        }}
                        value={this.state.searchPostalCode || ''}
                        placeholder="Search Postal code..."
                        onChange={event => this.setState({ searchPostalCode: event.target.value })}
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
                          height: '38px',
                          width: '24%',
                          paddingLeft: '10px',
                          alignSelf: 'center',
                        }}
                        value={this.state.searchStreet || ''}
                        placeholder="Search Street..."
                        onChange={event => this.setState({ searchStreet: event.target.value })}
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
                        }].concat(this.state.buildingsOptions).map(bd => ({
                          value: bd.id,
                          label: bd.id + ' - ' + bd.name
                        }))}
                        onChange={async (event) => {
                          if (!event.value) {
                            this.setState({
                              searchBuilding: undefined,
                              searchBlock: undefined,
                              searchFloorLevel: undefined,
                              searchBuildingUnit: undefined,
                              blocks: [],
                              floorLevels: [],
                              buildingUnits: [],
                            });
                          } else {
                            this.setState({ searchBuilding: event });
                            let blocks = [];
                            blocks = await getBlockOfBuilding({ limit: 10000, options: { buildingId: event.value } });

                            let floorLevels = [];
                            floorLevels = await getFloorLevels({ limit: 10000, options: { buildingId: event.value } });
                            this.setState({
                              blocks,
                              floorLevels,
                              buildingUnits: [],
                              selectedBlock: undefined,
                              searchBlock: undefined,
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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    className="button-btn"
                    style={{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      borderRadius: '10px', border: '2px solid #007bff',
                      width: '100px', height: '50px',
                      backgroundColor: '#99d3ff', color: '#007bff',
                      fontSize: '15px', fontWeight: '500',
                    }}
                    onClick={() => {
                      this.setState({loading: true});
                      const url = this.getFiltersUrl();
                      require('@app/utils/next-routes').Router.pushRoute(url);
                    }}
                  >
                    <span>Search</span>
                  </div>
                  <div
                    className="button-btn"
                    style={{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      borderRadius: '10px', border: '2px solid #007bff',
                      width: '100px', height: '50px',
                      backgroundColor: '#99d3ff', color: '#007bff',
                      fontSize: '15px',
                      marginLeft: '10px', fontWeight: '500',
                    }}
                    onClick={() => {
                      this.setState({loading: true});
                      let url = window.location.pathname + '?coupleState=all';
                      require('@app/utils/next-routes').Router.pushRoute(url);
                    }}
                  >
                    <span>Clear</span>
                  </div>
                  <div
                    className="button-btn"
                    style={{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      borderRadius: '10px', border: '2px solid #007bff',
                      width: '100px', height: '50px',
                      backgroundColor: '#99d3ff', color: '#007bff',
                      fontSize: '15px',
                      marginLeft: '10px', fontWeight: '500',
                      width: 'fit-content',
                      //fontSize: '20px',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                    }}
                    onClick={() => {
                      this.setState({loading: true});
                      let url = this.getFiltersUrl();
                      url = url + '&exportCSV=true&exportType=address-only';
                      require('@app/utils/next-routes').Router.pushRoute(url);
                    }}
                  >
                    <span>{this.props.appCode === 'MMS' ? 'Export CSV(Address only)' : 'Export CSV'}</span>
                  </div>


                  {this.props.appCode === 'MMS' && (
                  <div
                    className="button-btn"
                    style={{
                      cursor: 'pointer', display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      borderRadius: '10px', border: '2px solid #007bff',
                      width: '100px', height: '50px',
                      backgroundColor: '#99d3ff', color: '#007bff',
                      fontSize: '15px',
                      marginLeft: '10px', fontWeight: '500',
                      width: 'fit-content',
                      //fontSize: '20px',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                    }}
                    onClick={() => {
                      this.setState({loading: true});
                      let url = this.getFiltersUrl();
                      url = url + '&exportCSV=true&exportType=couple-with-msn';
                      require('@app/utils/next-routes').Router.pushRoute(url);
                    }}
                  >
                    <span>{'Export CSV(and Coupled Meter and MCU)'}</span>
                  </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', padding: '15px', paddingTop: '0px', paddingBottom: '0px', }}>
                <div style={{
                  padding: '15px',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  display: "flex",
                  flexDirection: "row",
                  height: '40px',
                  alignItems: "center",
                  backgroundColor: '#a8d4f5',
                  borderRadius: '10px',
                  width: '100%',
                  marginTop: '10px',
                  marginBottom: '10px'
                }}
                     className="ml-mobile"
                >
                  <span style={{ color: '#000000', fontWeight: '500' }}>Total found: {this.state.totalRecords} Addresses, {this.state.totalPages} Pages</span>
                </div>
                {/*<div
                                    className="button-btn"
                                    style = {{
                                        cursor: 'pointer', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center',
                                        borderRadius: '20px', border: '0.5px solid #007bff',
                                        width: '150px', height: '40px',
                                        fontSize: '20px',
                                        marginLeft: '55px', marginTop : '10px', marginBottom: '10px'
                                    }}
                                    onClick = {() => {
                                        if (this.state.setFormPosition == "none") {
                                            this.setState({o: {}, clearKey: Date.now()},
                                                () => {
                                                    this.setState({ typeErrorMessage: '', nameErrorMessage: '', descriptionErrorMessage: '',
                                                            buildingIdErrorMessage: '', displayNameErrorMessage: '', hasTenantErrorMessage: '',
                                                            descriptionErrorMessage: '', addressDisplayNameErrorMessage: '', addressBlockErrorMessage: '',
                                                            addressCountryErrorMessage: '', addressCityErrorMessage: '', addressTownErrorMessage: '',
                                                            addressStreetErrorMessage: '', addressPostalCodeErrorMessage: '',
                                                            listBlocks : [], listLevels: [], listUnits :[], listUnitOfLevel :[], listLevelOfBlock : [],
                                                            selectedLevel: '', selectedLevelName: undefined, selectedBlock: '', selectedBlockName: undefined,
                                                            selectedUnit: '', selectedUnitName: undefined, street: '', postalCode: '', buildingName: '', city: '',
                                                            objAddress : {
                                                                buildingName: '',
                                                                streetAddress: '',
                                                                street: '',
                                                                postal: '',
                                                                blocks: '',
                                                            }
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
                                    <span>Add New</span>
                                </div>*/}
                {/*<div
                                  className="button-btn"
                                  style = {{
                                    cursor: 'pointer', display: 'flex',
                                    justifyContent: 'center', alignItems: 'center',
                                    borderRadius: '20px', border: '0.5px solid #007bff',
                                    width: '150px', height: '40px',
                                    fontSize: '20px',
                                    marginLeft: '55px', marginTop : '10px', marginBottom: '10px'
                                  }}
                                  onClick = {() => {
                                    this.setState({openUploadAddress: true});
                                  }}
                                >
                                  <span>Upload</span>
                                </div>*/}
              </div>
              <Modal open={this.state.openUploadAddress}>
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
                  <CloseButton className="w-5 h-5" onClick={() => this.setState({ openUploadAddress: false })}/>
                  <Typography variant="h6" component="h2" style={{ marginBottom: '20px' }}>
                    Upload address CSV file
                  </Typography>
                  <input
                    style={{ marginBottom: '20px' }}
                    type="file"
                    placeholder={'File upload'}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file.name.includes(".csv") || file.name.includes(".xlsx")) {
                        this.setState({ addressFile: event.target.files[0] });
                      } else {
                        this.setState({ addressFile: null });
                      };
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <div
                      className="button-btn"
                      style={{
                        cursor: 'pointer', display: 'flex',
                        justifyContent: 'center', alignItems: 'center',
                        borderRadius: '20px', border: '0.5px solid #007bff',
                        width: '100px', height: '40px', marginRight: '10px',
                        fontSize: '20px',
                      }}
                      onClick={async () => {
                        if (this.state.addressFile) {
                          let rp = null;
                          const formData = new FormData();
                          formData.append('file', this.state.addressFile, this.state.addressFile.name);
                          const url = '/api/address/upload';
                          const method = 'POST';
                          await fetch(url,
                            {
                              method,
                              headers: {
                                'A_C': getCookie('app_code'),
                                'Authorization': getCookie('access_token'),
                              },
                              body: formData,
                            },
                          )
                            .then(response => response.json())
                            .then(response => rp = response)
                            .catch((error) => {
                              console.error('Error:', error);
                              this.setState({
                                addressFile: null,
                                openUploadAddress: false,
                              });
                            });
                          if (rp?.success) {
                            this.setState({
                              addressFile: null,
                              openUploadAddress: false,
                            });
                            await Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                              icon: 'success',
                              confirmButtonText: 'OK',
                            }).then(() => {
                              window.location.href = window.location.href;
                            });
                          } else {
                            this.setState({
                              addressFile: null,
                              openUploadAddress: false,
                            });
                            Swal.fire({
                              html: `<p style='text-align: center; font-size: 14px;'>${rp?.errorDescription || rp?.message}</p>`,
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
                      style={{
                        cursor: 'pointer', display: 'flex',
                        justifyContent: 'center', alignItems: 'center',
                        borderRadius: '20px', border: '0.5px solid #007bff',
                        width: '100px', height: '40px',
                        fontSize: '20px',
                      }}
                      onClick={() => {
                        this.setState({ openUploadAddress: false });
                      }}
                    >
                      <span>Cancel</span>
                    </div>
                  </div>
                </Box>
              </Modal>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                background: '#fff',
                minHeight: '100px',
                padding: '15px',
                paddingTop: '0px',
              }} className='doctor-list'>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  padding: '0',
                  width: '100%',
                }}>
                  <table className='table ml-mobile' style={{}}>
                    <thead className="thead-dark">
                    <tr>
                      {this.props.appCode === 'MMS' && (
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '250px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">MCU SN
                      </th>
                      )}
                      {this.props.appCode === 'MMS' && (
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '150px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Meter SN
                      </th>
                      )}
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '100px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">City
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '120px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Street
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Postal code
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '120px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Building
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Block
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Level
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Unit
                      </th>
                      {this.props.appCode === 'DMS' && (
                        <th style={{
                          backgroundColor: '#f2f3ff',
                          color: '#111',
                          fontWeight: '500',
                          fontSize: '16px',
                          width: '80px',
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                        }} scope="col">Location Tag
                        </th>
                      )}
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">Remark
                      </th>
                      <th style={{
                        backgroundColor: '#f2f3ff',
                        color: '#111',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '80px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }} scope="col">UpdatedTime
                      </th>
                      {/*<th style={{backgroundColor: '#f2f3ff', color: '#111', fontWeight: '500', fontSize: '16px', width: '80px', maxWidth: '80px', whiteSpace: 'nowrap',textAlign: 'center',}} scope="col"> Action</th>*/}
                    </tr>
                    </thead>

                    <tbody>
                    {(this.state.tableBuildings || [])
                      .map((it, index) => {
                        return (
                          <tr key={index}>
                            {this.props.appCode === 'MMS' && (
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{it.address?.coupleSn}</span>
                            </td>
                            )}
                            {this.props.appCode === 'MMS' && (
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{it.address?.coupleMsn}</span>
                            </td>
                            )}
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{it.address?.city}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.street}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.postalCode}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.building}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.block}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.level}</span>
                            </td>
                            <td style={{ textAlign: 'left', whiteSpace: 'nowrap', }}>
                              <span>{it.address?.unitNumber}</span>
                            </td>

                            {this.props.appCode === 'DMS' && (
                            <td style={{ textAlign: 'left', }}>
                              <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                              }}>
                                <input
                                  style={{
                                    maxWidth: '200px',
                                    outline: "unset",
                                    color: '#76838f',
                                    border: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'locationTag') ? undefined : "none",
                                  }}
                                  value={this.state.editUnit?.id === it.address?.unitId ? this.state.editUnit?.locationTag : it.address?.locationTag}
                                  onChange={(event) => {
                                    this.setState({
                                      editUnit: {
                                        ...this.state.editUnit,
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address?.unitNumber,
                                        locationTag: event.target.value,
                                      }
                                    })
                                    console.info('this.state.editUnit?.editField', this.state.editUnit?.editField)
                                  }}
                                  onClick={() => {
                                    this.setState({
                                      editUnit: {
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address.unitNumber,
                                        locationTag: it.address?.locationTag,
                                        editField: 'locationTag',
                                      }
                                    })
                                  }}
                                />

                                <div style={{
                                  display: 'flex',
                                  opacity: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'locationTag' && this.state.editUnit?.locationTag != it.address?.locationTag) ? undefined : "0",
                                  pointerEvents: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'locationTag' && this.state.editUnit?.locationTag != it.address?.locationTag) ? undefined : "none",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginLeft: "20px"
                                }}>
                                  <i
                                    className="fa fa-check"
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "10px",
                                      cursor: "pointer"
                                    }}
                                    onClick={async () => {
                                      let unit = {
                                        ...this.state.editUnit,
                                      }
                                      if (unit.id !== it.address.unitId) {
                                        return;
                                      }
                                      let response = await saveBuildingUnit(unit)
                                      if (response.success == true) {
                                        Swal.fire(
                                          'Done!',
                                          'Your database has been changed!',
                                          'success'
                                        ).then(async () => {
                                          it.address.locationTag = unit.locationTag;
                                          this.setState({
                                            editUnit: undefined,
                                          })
                                        })
                                      } else {
                                        Swal.fire(
                                          'Error!',
                                          response.message || response.errorDescription || '',
                                          'error'
                                        )
                                      }
                                    }}
                                  />
                                  <i
                                    className="fa fa-remove"
                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                    onClick={() => {
                                      this.setState({
                                        editUnit: undefined,
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            )}
                            <td style={{ textAlign: 'left', }}>
                              <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                              }}>
                                <input
                                  style={{
                                    maxWidth: '200px',
                                    outline: "unset",
                                    color: '#76838f',
                                    border: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit.editField === 'remark') ? undefined : "none",
                                  }}
                                  value={this.state.editUnit?.id === it.address?.unitId ? this.state.editUnit?.remark : it.address?.remark}
                                  onChange={(event) => {
                                    this.setState({
                                      editUnit: {
                                        ...this.state.editUnit,
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address?.unitNumber,
                                        remark: event.target.value,
                                      }
                                    })
                                  }}
                                  onClick={() => {
                                    this.setState({
                                      editUnit: {
                                        floorLevel: { id: it.address.levelId },
                                        id: it.address?.unitId,
                                        name: it.address.unitNumber,
                                        remark: it.address?.remark,
                                        editField: 'remark',
                                      }
                                    })
                                  }}
                                />

                                <div style={{
                                  display: 'flex',
                                  opacity: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'remark' && this.state.editUnit?.remark != it.address?.remark) ? undefined : "0",
                                  pointerEvents: (this.state.editUnit?.id === it.address?.unitId && this.state.editUnit?.editField === 'remark' && this.state.editUnit?.remark != it.address?.remark) ? undefined : "none",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginLeft: "20px"
                                }}>
                                  <i
                                    className="fa fa-check"
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "10px",
                                      cursor: "pointer"
                                    }}
                                    onClick={async () => {
                                      let unit = {
                                        ...this.state.editUnit,
                                      }
                                      if (unit.id !== it.address.unitId) {
                                        return;
                                      }
                                      let response = await saveBuildingUnit(unit)
                                      if (response.success == true) {
                                        Swal.fire(
                                          'Done!',
                                          'Your database has been changed!',
                                          'success'
                                        ).then(async () => {
                                          it.address.remark = unit.remark;
                                          this.setState({
                                            editUnit: undefined,
                                          })
                                        })
                                      } else {
                                        Swal.fire(
                                          'Error!',
                                          response.message || response.errorDescription || '',
                                          'error'
                                        )
                                      }
                                    }}
                                  />
                                  <i
                                    className="fa fa-remove"
                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                    onClick={() => {
                                      this.setState({
                                        editUnit: undefined,
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td style={{ maxWidth: '80px', textAlign: 'left', }}>
                              <span>{!!it.address?.coupleTime ? moment(it.address?.coupleTime).format('yyyy-MM-DD HH:mm:ss') : ''}</span>
                            </td>
                            {/*<td className="table-td">
                                                            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                                <div
                                                                    data-tip="Click to edit building"
                                                                    className="button-icon "

                                                                    onClick = {async () => {
                                                                        this.setState({loading: true,})
                                                                        let params = {
                                                                            options: {buildingId: it.id}
                                                                        };
                                                                        let response = await getBlockOfBuilding(params, null);

                                                                        this.setState({setFormPosition: 'flex', hiddenInsert: 'none', hiddenUpdate: 'flex', loading: false},
                                                                            () => {
                                                                                it.hasTenant == true ? this.state.o.hasTenant = true : false;
                                                                                this.setState({});
                                                                                it.modifiedDate = null;
                                                                                it.createdDate = null;
                                                                                this.setState({o: {...it}, address: it.address, buildingId : it.id,
                                                                                        listBlocks : !!response.results ? response.results : [],
                                                                                        listLevels: [],
                                                                                        listLevelOfBlock:[],
                                                                                        listUnitOfLevel:[],
                                                                                        listUnits :[], selectedLevelName: undefined, selectedBlock: '', selectedBlockName: undefined,
                                                                                        selectedUnit: '', selectedUnitName: undefined, selectedLevel: '',
                                                                                        street : it.address.street, postalCode: it.address.postalCode, city: it.address.city

                                                                                    }, () => {
                                                                                        console.log(this.state.o);
                                                                                    }
                                                                                );

                                                                            });

                                                                    }}
                                                                >
                                                                    <span>
                                                                      <i className="fa fa-edit" />
                                                                    </span>
                                                                </div>
                                                                <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                                                <div
                                                                    data-tip="Click to delete address"
                                                                    className="button-icon"
                                                                    style = {{
                                                                        fontSize: '25px',
                                                                        marginLeft: '10px',
                                                                    }}
                                                                    onClick = { async () => {
                                                                        Swal.fire({
                                                                            html: `
                                                                                <p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this building: </p>
                                                                                <p>${it.name}  ?</p>
                                                                            `,
                                                                            icon: 'question',
                                                                            showCancelButton: true,
                                                                            confirmButtonText: 'Yes',
                                                                            cancelButtonText: 'No'
                                                                        }).then(async (result) => {
                                                                          if (result.value) {
                                                                            let response = await deleteBuilding(it);
                                                                            if (response.success == true) {
                                                                                Swal.fire(
                                                                                  'Deleted!',
                                                                                  'Your building has been deleted.',
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
                                                                    <span>
                                                                      <i className="fa fa-trash-o" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>*/}
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
                    <div className="col-sm-12 col-md-7 pagination"
                         style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                      {this.state.totalRecords > 1 && this.state.totalPages >= 2 &&
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
        <div
          style={{
            display: this.state.setFormPosition, justifyContent: 'center', alignItems: 'center',
            //position: 'absolute',
            //     left: this.state.pos.x + 'px',
            //     top: this.state.pos.y + 'px' }}
            // onMouseDown = {this.onMouseDown}
            // ref={this.myRef
          }}
        >
          <Form key={this.state.clearKey}
                style={{
                  width: '1000px',
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
                className="box-form"
          >
            <div style={{ display: 'flex' }}>
              <i
                style={{ color: '#042ee1', marginTop: '14px', cursor: 'pointer' }}
                className="fa fa-arrow-left fa-2x"
                aria-hidden="true"
                onClick={() => {
                  this.setState({ setFormPosition: "none", address: {} });
                }}
              />
              <div
                className="button-btn"
                style={{
                  cursor: 'pointer', display: 'flex',
                  justifyContent: 'center', alignItems: 'center',
                  borderRadius: '10px', border: '0.5px solid #007bff',
                  width: '150px', height: '35px',
                  fontSize: '15px',
                  marginLeft: '10px', marginTop: '10px', marginBottom: '10px'
                }}
                onClick={() => {
                  this.setState({
                    setFormPosition: "none",
                    address: {},
                    street: '',
                    city: '',
                    postalCode: '',
                    editBlock: { number: undefined, name: undefined },
                    editLevel: { number: undefined, name: undefined },
                    editUnit: { number: undefined, name: undefined },
                  });
                }}
              >
                <span>Back to address list</span>
              </div>
              <h4 style={{
                display: this.state.hiddenInsert,
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '30px',
                fontFamily: 'bold',
                marginLeft: '200px'
              }}>Insert Building</h4>
              <h4 style={{
                display: this.state.hiddenUpdate,
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '30px',
                fontFamily: 'bold',
                marginLeft: '200px'
              }}>Update Building</h4>
            </div>
            <form>
              <div style={{ display: 'flex' }}>
                <div className="form-group" style={{}}>
                  <div style={{ display: 'flex' }}>
                    <label style={{ marginTop: '7px', color: '#000000', }}
                           htmlFor="exampleFormControlInput1">Street Address: </label>
                    <input style={{
                      width: '60%',
                      marginLeft: '10px',
                      maxWidth: '1000px',
                      width: '600px'
                    }}
                           type="text" maxLength="255" className="form-control"
                           id="exampleFormControlInput1" placeholder="Street Address"
                           value={this.state.street}
                           onChange={(event) => {
                             this.state.street = event.target.value;
                             this.setState({});
                           }}
                    />
                  </div>
                  {!!this.state.street ? '' :
                    <span style={{
                      display: this.state.nameErrorMessage != '' ? 'flex' : 'none',
                      color: 'red',
                      fontSize: '14px',
                      marginLeft: '100px'
                    }}>{this.state.nameErrorMessage}</span>
                  }
                </div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '215px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '10px', marginBottom: '10px'
                  }}
                  onClick={async () => {
                    this.setState({ address: this.state.address });
                    this.state.o.address = this.state.address;
                    //this.setState({o: this.state.o});
                    if (this.checkInput() == 0) {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: 'This building will be applied to database',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No'
                      }).then(async (result) => {
                        if (result.value) {
                          let response = {};
                          if (this.state.hiddenUpdate === 'flex') {
                            let building = {
                              id: this.state.o.id,
                              name: !!this.state.o.name ? this.state.o.name : '',
                              address: {
                                id: this.state.address.id,
                                postalCode: !!this.state.postalCode ? this.state.postalCode : '',
                                city: !!this.state.city ? this.state.city : '',
                                street: !!this.state.street ? this.state.street : ''
                              },
                            }
                            response = await saveBuilding(building);
                          } else {
                            let building = {
                              name: !!this.state.o.name ? this.state.o.name : '',
                              address: {
                                postalCode: !!this.state.postalCode ? this.state.postalCode : '',
                                city: !!this.state.city ? this.state.city : '',
                                street: !!this.state.street ? this.state.street : ''
                              },
                              blocks: !!this.state.objAddress.blocks ? this.state.objAddress.blocks : []
                            }
                            response = await saveBuilding(building);
                          }
                          if (response.success == true) {
                            Swal.fire(
                              'Done!',
                              'Your database has been changed!',
                              'success'
                            )
                              .then(() => {
                                this.setState({
                                  setFormPosition: 'none',
                                  listBlocks: [],
                                  listLevels: [],
                                  listUnits: [],
                                  listUnitOfLevel: [],
                                  listLevelOfBlock: [],
                                  selectedLevel: '',
                                  selectedLevelName: undefined,
                                  selectedBlock: '',
                                  selectedBlockName: undefined,
                                  selectedUnit: '',
                                  selectedUnitName: undefined,
                                  objAddress: {
                                    buildingName: '',
                                    streetAddress: '',
                                    city: '',
                                    postal: '',
                                    blocks: '',
                                  }
                                });
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
                  {this.state.hiddenInsert != 'none' ? <span>Add</span> : ''}
                  {this.state.hiddenUpdate != 'none' ? <span>Update</span> : ''}
                </div>
              </div>
            </form>
            <Form.Group controlId="input-address-id" style={{ paddingBottom: '0px' }}>
              <div className="form-row">
                <div className="col-md-4 mb-3" style={{}}>
                  <div style={{ display: 'flex' }}>
                    <label style={{ marginTop: '7px', color: '#000000', }}
                           htmlFor="validationCustom01">City/Stage:</label>
                    <input style={{ width: '50%', marginLeft: '10px', }}
                           type="text" className="form-control" id="validationCustom01"
                           placeholder="City/Stage" maxLength="255"
                           value={this.state.city}
                           onChange={(event) => {
                             this.state.city = event.target.value;
                             this.setState({});
                           }}
                    />
                  </div>
                  {!!this.state.city ? '' :
                    <span style={{
                      display: this.state.addressDisplayNameErrorMessage != '' ? 'flex' : 'none',
                      color: 'red',
                      fontSize: '14px',
                      marginLeft: '70px'
                    }}>{this.state.addressDisplayNameErrorMessage}</span>
                  }
                </div>
                <div className="col-md-4 mb-3" style={{}}>
                  <div style={{ display: 'flex' }}>
                    <label style={{ marginTop: '7px', color: '#000000', }}
                           htmlFor="validationCustom02">Zip/Postal:</label>
                    <input
                      style={{ width: '50%', marginLeft: '7px', }}
                      type="text"
                      className="form-control"
                      id="validationCustom02"
                      placeholder="Zip/Postal"
                      maxLength="10"
                      value={this.state.postalCode}
                      onChange={(event) => {
                        this.state.postalCode = event.target.value;
                        this.setState({});
                      }}
                    />
                  </div>
                  {
                    !!this.state.postalCode ? '' :
                      <span style={{
                        display: this.state.addressBlockErrorMessage != '' ? 'flex' : 'none',
                        color: 'red',
                        fontSize: '14px',
                        marginLeft: '70px'
                      }}>{this.state.addressBlockErrorMessage}</span>

                  }
                </div>
                <div className="col-md-4 mb-3" style={{}}>
                  <div style={{ display: 'flex' }}>
                    <label style={{ marginTop: '-5px', color: '#000000', }}
                           htmlFor="validationCustomUsername">Building Name:</label>
                    <div className="input-group">
                      <input
                        style={{ width: '50%', marginLeft: '10px', }}
                        type="text"
                        maxLength="100"
                        className="form-control"
                        id="validationCustomUsername"
                        placeholder="No required if it a house"
                        aria-describedby="inputGroupPrepend"
                        value={this.state.o.name}
                        onChange={(event) => {
                          this.state.o.name = event.target.value;
                          this.setState({});
                        }}
                      />
                    </div>
                  </div>
                  <span style={{
                    display: this.state.addressCountryErrorMessage != '' ? 'flex' : 'none',
                    color: 'red',
                    fontSize: '14px'
                  }}>{this.state.addressCountryErrorMessage}</span>

                </div>
              </div>
            </Form.Group>

            <div style={{ display: 'flex' }}>
              <div style={{
                padding: '15px',
                paddingTop: '20px',
                paddingBottom: '20px',
                display: "flex",
                flexDirection: "row",
                height: '40px',
                alignItems: "center",
                backgroundColor: '#a8d4f5',
                borderRadius: '10px',
                width: '100%',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#000000', fontWeight: '500', fontSize: '20px' }}>Block Details</span>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={() => {
                    if (!!this.state.selectedBlockName) {
                      this.setState({
                        pointerEventBlock: { lock: true, number: this.state.selectedBlock },
                        editBlock: {
                          number: this.state.selectedBlock,
                          name: this.state.selectedBlockName.name
                        }
                      })
                    }
                  }}
                >
                  <span>Edit selected</span>
                </div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={async () => {
                    if (this.state.hiddenUpdate === 'flex') {
                      Swal.fire({
                        html: `
                                                                <p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this block: </p>
                                                                <p>${this.state.selectedBlockName.name}  ?</p>
                                                            `,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No'
                      }).then(async (result) => {
                        if (result.value) {
                          let param = {
                            id: this.state.selectedBlockName.id
                          }
                          let response = await deleteBlockOfBuilding(param)
                          if (response.success == true) {
                            Swal.fire(
                              'Deleted!',
                              'Your block has been deleted.',
                              'success'
                            )
                              .then(async () => {
                                let params = {
                                  options: { buildingId: this.state.buildingId }
                                };
                                let responseBlock = await getBlockOfBuilding(params, null);
                                this.setState({
                                  listBlocks: !!responseBlock.results ? responseBlock.results : [],
                                  selectedLevel: '',
                                  selectedLevelName: undefined,
                                  selectedBlock: '',
                                  selectedBlockName: undefined,
                                  selectedUnit: '',
                                  selectedUnitName: undefined,
                                  editBlock: undefined,
                                  pointerEventBlock: undefined,
                                  listLevelOfBlock: [],
                                  listUnitOfLevel: [],
                                  newBlocks: ''
                                })
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
                      if (this.state.selectedBlockName != null && this.state.selectedBlockName != '') {
                        const temp = this.state.listBlocks;
                        this.state.objAddress.blocks.forEach((block, index) => {
                          if (block.name === this.state.selectedBlockName.name) {
                            temp.splice(index, 1);
                          }
                        })
                        this.setState({
                          selectedBlock: '',
                          pointerEventBlock: undefined,
                          listLevelOfBlock: [],
                          listUnitOfLevel: [],
                        })
                      }
                    }
                  }}
                >
                  <span>Delete selected</span>
                </div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={async () => {
                    if (!!this.state.selectedBlockName) {
                      if (this.state.hiddenUpdate === 'flex') {
                        this.setState({
                          copyBlock: {
                            number: this.state.selectedBlock,
                            name: this.state.selectedBlockName.name
                          },
                        })
                        let cloneName = this.state.selectedBlockName.name + "clone";
                        let names = [];
                        names.push(cloneName);
                        let block = {
                          building: {
                            id: this.state.buildingId
                          },
                          names: names,
                        }
                        let response = await saveBlockOfBuilding(block)
                        let params = {
                          options: {
                            buildingId: this.state.buildingId,
                            blockId: this.state.selectedBlockName.id,
                          }
                        };
                        let responseLevels = await getFloorLevels(params, null);
                        let namesLevels = [];
                        responseLevels.results.forEach((level) => {
                          namesLevels.push(level.name);
                        })

                        if (response.success == true) {
                          Swal.fire(
                            'Done!',
                            'Your database has been changed!',
                            'success'
                          ).then(async () => {
                            let params = {
                              options: { buildingId: this.state.buildingId }
                            };
                            let responseBlock = await getBlockOfBuilding(params, null);

                            let level = {
                              building: {
                                id: this.state.buildingId
                              },
                              block: {
                                id: responseBlock.results[0].id
                              },
                              names: namesLevels,
                            }
                            let response3 = await saveFloorLevel(level)

                            let paramsNewLevel = {
                              options: {
                                buildingId: this.state.buildingId,
                                blockId: responseBlock.results[0].id,
                              }
                            };
                            let responseNewLevels = await getFloorLevels(paramsNewLevel, null);
                            let paramsOldLevel = {
                              options: {
                                buildingId: this.state.buildingId,
                                blockId: this.state.selectedBlockName.id,
                              }
                            };
                            let responseOldLevels = await getFloorLevels(paramsOldLevel, null);

                            responseNewLevels.results.forEach(async (newlevel) => {
                              let namesUnits = [];
                              responseOldLevels.results.forEach(async (oldlevel) => {
                                if (newlevel.name === oldlevel.name) {
                                  let params2 = {
                                    options: {
                                      floorLevelId: oldlevel.id,
                                    }
                                  };
                                  let responseUnits = await getBuildingUnits(params2, null);

                                  if (!!responseUnits) {
                                    responseUnits.results.forEach(unit => {
                                      namesUnits.push(unit.name)
                                    })

                                    let unit = {
                                      floorLevel: {
                                        id: newlevel.id
                                      },
                                      names: namesUnits,
                                    }
                                    let response4 = await saveBuildingUnit(unit);
                                  }
                                }
                              })
                            })

                            this.setState({
                              listBlocks: !!responseBlock.results ? responseBlock.results : [],
                              newBlocks: '',
                              selectedLevel: '',
                              selectedLevelName: undefined,
                              selectedBlockName: !!responseBlock.results ? responseBlock.results[0] : undefined,
                              selectedUnit: '',
                              selectedUnitName: undefined,
                              listLevelOfBlock: [],
                              listUnitOfLevel: [],
                              selectedBlock: 0,
                              pointerEventBlock: {
                                lock: true,
                                number: 0
                              },
                              editBlock: {
                                number: 0,
                                name: cloneName
                              }
                            })
                          })
                        } else {
                          Swal.fire(
                            'Error!',
                            response.message || response.errorDescription || '',
                            'error'
                          )
                        }
                      } else {
                        this.setState({
                          copyBlock: {
                            number: this.state.selectedBlock,
                            name: this.state.selectedBlockName.name
                          }
                        })
                        let cloneName = this.state.selectedBlockName.name;

                        let listLevelClone = [];
                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            listLevelClone = block.levels;
                          }
                        })

                        this.state.listBlocks.push({
                          'name': cloneName,
                          'levels': listLevelClone
                        });

                        this.state.o.blocks = this.state.block;
                        this.state.objAddress.blocks = this.state.listBlocks;
                        this.setState({
                          newBlocks: '',
                          selectedLevel: '',
                          selectedLevelName: undefined,
                          selectedBlockName: undefined,
                          selectedUnit: '',
                          selectedUnitName: undefined,
                          listLevelOfBlock: [],
                          listUnitOfLevel: [],
                          selectedBlock: this.state.objAddress.blocks.length - 1,
                          pointerEventBlock: {
                            lock: true,
                            number: this.state.objAddress.blocks.length - 1
                          },
                          editBlock: {
                            number: this.state.objAddress.blocks.length - 1,
                            name: cloneName
                          }
                        })
                      }
                    }
                  }}
                >
                  <span>Clone selected</span>
                </div>
              </div>
              <div style={{ marginLeft: '20px', border: '0.5px solid', width: '202px' }}>
                <div className="tbl-header">
                  <table style={{ width: '100%' }}>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#fff',
                        color: '#0084b7',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '182px',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        border: '0.5px solid #000000'
                      }} scope="col">Current defined blocks
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div
                  style={{
                    width: '200%',
                    overflow: 'auto',
                    maxHeight: '130px',
                    maxWidth: '200px',
                  }}
                >
                  <table style={{ width: '100%', }}>
                    {(this.state.listBlocks || [])
                      .map((it, index) => {
                        return (
                          this.state.editBlock?.number !== index ? (
                            <tr
                              key={index}
                              style={{
                                backgroundColor: this.state.selectedBlock === index ? '#a8d4f5' : '',
                                pointerEvents: !!this.state.pointerEventBlock && this.state.pointerEventBlock.number !== index ? 'none' : undefined
                              }}
                              onClick={async () => {
                                if (index === this.state.selectedBlock) {
                                  this.setState({
                                    selectedBlock: '',
                                    selectedBlockName: undefined
                                  })
                                } else {
                                  if (this.state.hiddenUpdate === 'flex') {
                                    this.setState({ loading: true, })
                                    let params = {
                                      options: {
                                        buildingId: this.state.buildingId,
                                        blockId: it.id,
                                      }
                                    };
                                    let response = await getFloorLevels(params, null);
                                    this.setState({
                                      loading: false,
                                      selectedBlock: index,
                                      selectedBlockName: it,
                                      selectedLevel: '',
                                      pointerEventLevel: undefined,
                                      editBlock: undefined,
                                      listLevelOfBlock: response.results,
                                      listLevels: response.results,
                                      listUnitOfLevel: [],
                                    })
                                  } else {
                                    this.setState({ listLevels: [] })
                                    // load listLevelofBlock ==> show in level table
                                    let listLevel = [];
                                    let listLevelofBlock = [];
                                    this.state.objAddress.blocks.forEach(block => {
                                      if (block.name === it.name) {
                                        listLevel = block.levels;
                                      }
                                    })

                                    for (let i = 0; i < listLevel.length; i++) {
                                      listLevelofBlock.push({ name: listLevel[i].name });
                                    }

                                    this.setState({
                                      selectedBlock: index,
                                      selectedBlockName: it,
                                      selectedLevel: '',
                                      pointerEventLevel: undefined,
                                      editBlock: undefined,
                                      listLevelOfBlock: listLevelofBlock,
                                      listUnitOfLevel: [],
                                    })
                                  }
                                }

                              }}>
                              <td style={{
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                color: '#000000'
                              }}>
                                <span>{it.name}</span>
                              </td>
                            </tr>
                          ) : (
                            <div style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center"
                            }}>
                              <input
                                style={{ width: "60%", outline: "unset" }}
                                value={this.state.editBlock?.name}
                                onChange={(event) => {
                                  this.setState({
                                    editBlock: {
                                      ...this.state.editBlock,
                                      name: event.target.value
                                    }
                                  })
                                }}
                              />
                              <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "20px"
                              }}>
                                <i
                                  className="fa fa-check"
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "10px",
                                    cursor: "pointer"
                                  }}
                                  onClick={async () => {
                                    let isExist = false;
                                    this.state.listBlocks.forEach(block => {
                                      if (block.name.trim() === this.state.editBlock?.name.trim()) {
                                        isExist = true;
                                        return;
                                      }
                                    })
                                    if (!isExist) {
                                      if (this.state.hiddenUpdate === 'flex') {
                                        let block = {
                                          id: this.state.selectedBlockName.id,
                                          name: this.state.editBlock?.name,
                                        }
                                        let response = await saveBlockOfBuilding(block)
                                        if (response.success == true) {
                                          Swal.fire(
                                            'Done!',
                                            'Your database has been changed!',
                                            'success'
                                          )
                                            .then(async () => {
                                              let params = {
                                                options: { buildingId: this.state.buildingId }
                                              };
                                              let responseBlock = await getBlockOfBuilding(params, null);
                                              this.setState({
                                                listBlocks: !!responseBlock.results ? responseBlock.results : [],
                                                selectedLevel: '',
                                                selectedLevelName: undefined,
                                                selectedBlock: '',
                                                selectedBlockName: undefined,
                                                selectedUnit: '',
                                                selectedUnitName: undefined,
                                                editBlock: undefined,
                                                pointerEventBlock: undefined,
                                                copyBlock: '',
                                              })
                                            })
                                        } else {
                                          Swal.fire(
                                            'Error!',
                                            response.message || response.errorDescription || '',
                                            'error'
                                          )
                                        }
                                      } else {
                                        let blockJson = JSON.parse(JSON.stringify(this.state.objAddress.blocks));
                                        let editingBlock = blockJson[this.state.selectedBlock];
                                        editingBlock.name = this.state.editBlock?.name;
                                        blockJson[this.state.selectedBlock] = editingBlock;

                                        this.state.objAddress.blocks.forEach((block, index) => {
                                          if (index === this.state.editBlock?.number) {
                                            block.name = editingBlock.name;
                                          }
                                        })

                                        this.state.objAddress.blocks = blockJson;

                                        this.setState({
                                          listBlocks: blockJson,
                                          editBlock: undefined,
                                          pointerEventBlock: undefined,
                                          selectedLevel: '',
                                          selectedLevelName: undefined,
                                          selectedBlock: '',
                                          selectedBlockName: undefined,
                                          selectedUnit: '',
                                          selectedUnitName: undefined,
                                          copyBlock: '',
                                        })
                                      }
                                    } else {
                                      Swal.fire(
                                        'Error!',
                                        'Block already exists',
                                        'error'
                                      ).then(() => {
                                        if (this.state.hiddenUpdate === 'flex') {
                                          this.setState({
                                            editBlock: undefined,
                                            pointerEventBlock: undefined,
                                            copyBlock: '',
                                          })
                                        }
                                      })
                                    }
                                  }}
                                />
                                <i
                                  className="fa fa-remove"
                                  style={{ fontSize: "20px", cursor: "pointer" }}
                                  onClick={() => {
                                    if (this.state.hiddenUpdate === 'flex') {
                                      if (!!this.state.copyBlock) {
                                        Swal.fire({
                                          html: `
                                                                                    <p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this block: </p>
                                                                                    <p>${this.state.selectedBlockName.name}  ?</p>
                                                                                `,
                                          icon: 'question',
                                          showCancelButton: true,
                                          confirmButtonText: 'Yes',
                                          cancelButtonText: 'No'
                                        }).then(async (result) => {
                                          if (result.value) {
                                            let param = {
                                              id: this.state.selectedBlockName.id
                                            }
                                            let response = await deleteBlockOfBuilding(param)
                                            if (response.success == true) {
                                              Swal.fire(
                                                'Deleted!',
                                                'Your block has been deleted.',
                                                'success'
                                              )
                                                .then(async () => {
                                                  let params = {
                                                    options: { buildingId: this.state.buildingId }
                                                  };
                                                  let responseBlock = await getBlockOfBuilding(params, null);
                                                  this.setState({
                                                    listBlocks: !!responseBlock.results ? responseBlock.results : [],
                                                    selectedLevel: '',
                                                    selectedLevelName: undefined,
                                                    selectedBlock: '',
                                                    selectedBlockName: undefined,
                                                    selectedUnit: '',
                                                    selectedUnitName: undefined,
                                                    editBlock: undefined,
                                                    pointerEventBlock: undefined,
                                                    listLevelOfBlock: [],
                                                    listUnitOfLevel: [],
                                                    newBlocks: '',
                                                    copyBlock: '',
                                                  })
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
                                      }
                                    } else {
                                      if (!!this.state.copyBlock) {
                                        const temp = this.state.listBlocks;
                                        temp.splice(this.state.listBlocks.length - 1, 1)
                                        this.setState({
                                          selectedBlock: '',
                                          copyBlock: '',
                                          pointerEventBlock: undefined,
                                          listLevelOfBlock: [],
                                          listUnitOfLevel: [],
                                        })
                                      }

                                    }
                                    this.setState({
                                      editBlock: undefined,
                                      pointerEventBlock: undefined,
                                      copyBlock: '',
                                    })
                                  }}
                                />
                              </div>
                            </div>
                          )
                        )
                      })
                    }
                  </table>
                </div>
              </div>
              <div style={{ marginLeft: '50px' }}>
                <i style={{ color: '#042ee1', marginTop: '50px' }} className="fa fa-arrow-left fa-4x"
                   aria-hidden="true"/>
              </div>
              <div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '50px',
                    fontSize: '15px',
                    marginLeft: '10px', marginTop: '57px', marginBottom: '10px'
                  }}
                  onClick={async () => {
                    let names = [];
                    if (this.state.hiddenUpdate === 'flex') {
                      let lines = this.state.newBlocks.split('\n');
                      lines = lines.map(element => {
                        return element.trim()
                      });
                      const nonDupLine = lines.filter((item, index) => lines.indexOf(item) === index && item.trim() !== '');
                      if (this.state.listBlocks && this.state.listBlocks.length) {
                        nonDupLine.forEach(line => {
                          let found = false;
                          this.state.listBlocks.forEach(block => {
                            if (block.name === line.trim()) {
                              found = true;
                            }
                          })
                          if (found === false) {
                            names.push(line.trim());
                          }
                        })
                      } else {
                        for (let i = 0; i < nonDupLine.length; i++) {
                          names.push(nonDupLine[i].trim());
                        }
                      }
                      let block = {
                        building: {
                          id: this.state.buildingId
                        },
                        names: names,
                      };
                      if (block.names && block.names.length) {
                        let response = await saveBlockOfBuilding(block)
                        if (response.success == true) {
                          Swal.fire(
                            'Done!',
                            'Your database has been changed!',
                            'success'
                          )
                            .then(async () => {
                              let params = {
                                options: { buildingId: this.state.buildingId }
                              };
                              let responseBlock = await getBlockOfBuilding(params, null);
                              this.setState({ listBlocks: !!responseBlock.results ? responseBlock.results : [], })
                            })
                        } else {
                          Swal.fire(
                            'Error!',
                            response.message || response.errorDescription || '',
                            'error'
                          )
                        }
                      }
                      this.setState({
                        selectedLevel: '',
                        selectedLevelName: undefined,
                        selectedBlock: '',
                        selectedBlockName: undefined,
                        selectedUnit: '',
                        selectedUnitName: undefined,
                        editBlock: undefined,
                        pointerEventBlock: undefined,
                        newBlocks: ''
                      });
                    } else {
                      const temp = [];
                      if (this.state.newBlocks != null && this.state.newBlocks != '') {
                        let lines = this.state.newBlocks.split('\n');
                        lines = lines.map(element => {
                          return element.trim()
                        });
                        const nonDupLine = lines.filter((item, index) => lines.indexOf(item) === index && item.trim() !== '');
                        if (this.state.listBlocks && this.state.listBlocks.length) {
                          nonDupLine.forEach(line => {
                            let found = false;
                            this.state.listBlocks.forEach(block => {
                              if (block.name === line.trim()) {
                                found = true;
                              }
                            })
                            if (found === false) {
                              temp.push({ name: line.trim(), levels: [] });
                            }
                          })
                        } else {
                          for (let i = 0; i < nonDupLine.length; i++) {
                            this.state.listBlocks.push({
                              'name': nonDupLine[i].trim(),
                              'levels': []
                            });
                            this.state.block.push({
                              'name': nonDupLine[i].trim(),
                              'levels': []
                            });
                          }
                        }
                      }
                      temp.forEach(t => {
                        this.state.listBlocks.push(t);
                      })
                      this.state.o.blocks = this.state.block;
                      this.state.objAddress.blocks = this.state.listBlocks;
                      this.setState({
                        newBlocks: '',
                        editBlock: undefined,
                        pointerEventBlock: undefined,
                        selectedLevel: '',
                        selectedLevelName: undefined,
                        selectedBlock: '',
                        selectedBlockName: undefined,
                        selectedUnit: '',
                        selectedUnitName: undefined,
                      })
                    }
                  }}
                >
                  <span>Add New</span>
                </div>
              </div>
              <div style={{ marginLeft: '20px', border: '0.5px solid', width: '202px' }}>
                <div className="tbl-header">
                  <table style={{ width: '100%' }}>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#fff',
                        color: '#0084b7',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '199px',
                        maxWidth: '200px',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        border: '0.5px solid #000000'
                      }} scope="col">Add new blocks
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div style={{ width: '200%', overflow: 'auto', maxHeight: '130px', maxWidth: '200px' }}>
                  <table style={{ width: '100%' }}>
                    <tr>
                      <td style={{ textAlign: 'left', whiteSpace: 'nowrap', color: '#000000' }}>
                                                        <textarea
                                                          className="form-control"
                                                          id="exampleFormControlTextarea1" rows="3"
                                                          placeholder="New blocks"
                                                          style={{ height: '123px' }}
                                                          value={this.state.newBlocks}
                                                          onChange={(event) => {
                                                            this.state.newBlocks = event.target.value;
                                                            this.setState({});
                                                          }}
                                                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '10px' }}>
              <div style={{
                padding: '15px',
                paddingTop: '20px',
                paddingBottom: '20px',
                display: "flex",
                flexDirection: "row",
                height: '40px',
                alignItems: "center",
                backgroundColor: '#a8d4f5',
                borderRadius: '10px',
                width: '100%',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#000000', fontWeight: '500', fontSize: '20px' }}>Level Details</span>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={() => {
                    if (!!this.state.selectedLevelName) {
                      this.setState({
                        copyLevel: '',
                        pointerEventLevel: { lock: true, number: this.state.selectedLevel },
                        editLevel: {
                          number: this.state.selectedLevel,
                          name: this.state.selectedLevelName.name
                        }
                      })
                    }

                  }}
                >
                  <span>Edit selected</span>
                </div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={() => {
                    if (this.state.selectedLevelName != null && this.state.selectedLevelName != '') {
                      if (this.state.hiddenUpdate === 'flex') {
                        Swal.fire({
                          html: `
                                                                <p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this level: </p>
                                                                <p>${this.state.selectedLevelName.name}  ?</p>
                                                            `,
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonText: 'Yes',
                          cancelButtonText: 'No'
                        }).then(async (result) => {
                          if (result.value) {
                            let param = {
                              id: this.state.selectedLevelName.id
                            }
                            let response = await deleteFloorLevel(param)
                            if (response.success == true) {
                              Swal.fire(
                                'Deleted!',
                                'Your level has been deleted.',
                                'success'
                              )
                                .then(async () => {
                                  let params = {
                                    options: {
                                      buildingId: this.state.buildingId,
                                      blockId: this.state.selectedBlockName.id,
                                    }
                                  };
                                  let responseLevel = await getFloorLevels(params, null);
                                  this.setState({
                                    listLevelOfBlock: !!responseLevel.results ? responseLevel.results : [],
                                    selectedLevel: '',
                                    selectedLevelName: undefined,
                                    selectedUnit: '',
                                    selectedUnitName: undefined,
                                    pointerEventLevel: undefined,
                                    newLevels: '',
                                    listUnitOfLevel: [],
                                  })
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
                        const deleteBlock = JSON.parse(JSON.stringify(this.state.objAddress.blocks));
                        const deleteLevel = deleteBlock[this.state.selectedBlock].levels;
                        deleteLevel.splice(this.state.selectedLevel, 1);
                        deleteBlock[this.state.selectedBlock].levels = deleteLevel;

                        this.state.objAddress.blocks.forEach((block, index) => {
                          if (block.name === this.state.selectedBlockName.name) {
                            block.levels = deleteBlock[this.state.selectedBlock].levels;
                          }
                        })

                        let listLevel = [];
                        let listLevelofBlock = [];
                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            listLevel = block.levels;
                          }
                        })
                        for (let i = 0; i < listLevel.length; i++) {
                          listLevelofBlock.push({ name: listLevel[i].name.trim() });
                        }
                        this.setState({
                          selectedLevel: '',
                          pointerEventLevel: undefined,
                          listLevelOfBlock: listLevelofBlock,
                          listUnitOfLevel: [],
                          listBlocks: this.state.objAddress.blocks,
                        })
                      }
                    }
                  }}
                >
                  <span>Delete selected</span>
                </div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={async () => {
                    if (!!this.state.selectedBlockName && !!this.state.selectedLevelName) {
                      if (this.state.hiddenUpdate === 'flex') {
                        this.setState({
                          copyLevel: {
                            number: this.state.selectedLevel,
                            name: this.state.selectedLevelName.name
                          }
                        })
                        let cloneName = this.state.selectedLevelName.name + "clone";
                        let names = [];
                        names.push(cloneName);
                        let level = {
                          building: {
                            id: this.state.buildingId
                          },
                          block: {
                            id: this.state.selectedBlockName.id
                          },
                          names: names,
                        }
                        let saveLevel = await saveFloorLevel(level)

                        let params3 = {
                          options: {
                            buildingId: this.state.buildingId,
                            blockId: this.state.selectedBlockName.id,
                          }
                        };
                        let responseLevels = await getFloorLevels(params3, null);

                        let params2 = {
                          options: {
                            floorLevelId: this.state.selectedLevelName.id,
                          }
                        };
                        let responseUnits = await getBuildingUnits(params2, null);

                        let namesUnits = [];

                        responseUnits.results.forEach(unit => {
                          namesUnits.push(unit.name)
                        })

                        responseLevels.results.forEach(async (level) => {
                          if (level.name === cloneName) {
                            let unit = {
                              floorLevel: {
                                id: level.id
                              },
                              names: namesUnits,
                            }
                            let save = await saveBuildingUnit(unit);
                          }
                        })

                        if (saveLevel.success == true) {
                          Swal.fire(
                            'Done!',
                            'Your database has been changed!',
                            'success'
                          ).then(async () => {


                            this.setState({
                              listLevelOfBlock: !!responseLevels.results ? responseLevels.results : [],
                              selectedLevel: 0,
                              selectedLevelName: !!responseLevels.results ? responseLevels.results[0] : undefined,
                              selectedUnit: '',
                              selectedUnitName: undefined,
                              listUnitOfLevel: [],
                              pointerEventLevel: {
                                lock: true,
                                number: 0
                              },
                              editLevel: {
                                number: 0,
                                name: cloneName
                              }
                            })
                          })
                        } else {
                          Swal.fire(
                            'Error!',
                            saveLevel.message || saveLevel.errorDescription || '',
                            'error'
                          )
                        }
                      } else {
                        this.setState({
                          copyLevel: {
                            number: this.state.selectedLevel,
                            name: this.state.selectedLevelName.name
                          }
                        })
                        let cloneName = this.state.selectedLevelName.name;

                        let listUnitClone = [];
                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            block.levels.forEach((level) => {
                              if (level.name === this.state.selectedLevelName.name) {
                                listUnitClone = level.units;
                              }
                            })
                          }
                        })

                        let indexLevel = '';
                        let cloneBlock = JSON.parse(JSON.stringify(this.state.objAddress.blocks));
                        let cloneLevel = cloneBlock[this.state.selectedBlock].levels;
                        cloneLevel.push({
                          'name': cloneName,
                          'units': listUnitClone
                        });
                        cloneBlock[this.state.selectedBlock].levels = cloneLevel;
                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            block.levels = cloneBlock[this.state.selectedBlock].levels;
                            indexLevel = block.levels.length - 1;
                          }
                        })

                        this.state.listLevelOfBlock.push({
                          'name': cloneName,
                          'units': listUnitClone
                        });

                        this.setState({
                          listBlock: this.state.objAddress.blocks,
                          selectedLevel: '', selectedLevelName: undefined,
                          selectedUnit: '', selectedUnitName: undefined,
                          listUnitOfLevel: [],
                          selectedLevel: indexLevel,
                          pointerEventLevel: { lock: true, number: indexLevel },
                          editLevel: { number: indexLevel, name: cloneName },
                        }, () => {
                          indexLevel = '';
                        })
                      }
                    }
                  }}
                >
                  <span>Clone selected</span>
                </div>
              </div>
              <div style={{ marginLeft: '20px', border: '0.5px solid', width: '202px' }}>
                <div className="tbl-header">
                  <table style={{ width: '100%' }}>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#fff',
                        color: '#0084b7',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '182px',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        border: '0.5px solid #000000'
                      }} scope="col">Current defined levels
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div style={{ width: '200%', overflow: 'auto', maxHeight: '130px', maxWidth: '200px' }}>
                  <table style={{ width: '100%', }}>
                    {(this.state.listLevelOfBlock || [])
                      .map((it, index) => {
                        return (
                          this.state.editLevel?.number !== index ? (
                            <tr
                              key={index}

                              style={{
                                backgroundColor: this.state.selectedLevel === index ? '#a8d4f5' : '',
                                pointerEvents: !!this.state.pointerEventLevel && this.state.pointerEventLevel.number !== index ? 'none' : undefined
                              }}
                              onClick={async () => {
                                if (index === this.state.selectedLevel) {
                                  this.setState({
                                    selectedLevel: '',
                                    selectedLevelName: undefined
                                  })
                                } else {
                                  if (this.state.hiddenUpdate === 'flex') {
                                    this.setState({ loading: true, })
                                    let params = {
                                      options: {
                                        floorLevelId: it.id,
                                      }
                                    };
                                    let response = await getBuildingUnits(params, null);
                                    this.setState({
                                      loading: false,
                                      selectedLevel: index,
                                      selectedLevelName: it,
                                      selectedUnit: '',
                                      pointerEventUnit: undefined,
                                      listUnitOfLevel: response.results,
                                      listUnits: response.results,
                                    })
                                  } else {
                                    if (!!this.state.selectedBlockName) {
                                      this.setState({
                                        listUnits: [],
                                      })

                                      // load listUnitOfLevel ==> show in Units table
                                      let listUnits = [];
                                      let listUnitOfLevel = [];
                                      this.state.objAddress.blocks.forEach(block => {
                                        if (block.name === this.state.selectedBlockName.name) {
                                          for (let i = 0; i < block.levels.length; i++) {
                                            if (block.levels[i].name === it.name) {
                                              listUnits = block.levels[i].units;
                                            }
                                          }
                                        }
                                      })

                                      if (listUnits != null) {
                                        for (let i = 0; i < listUnits.length; i++) {
                                          listUnitOfLevel.push({ name: listUnits[i].name.trim() });
                                        }
                                      }

                                      this.setState({
                                        selectedLevel: index,
                                        selectedLevelName: it,
                                        selectedUnit: '',
                                        editLevel: undefined,
                                        pointerEventUnit: undefined,
                                        listUnitOfLevel: listUnitOfLevel,
                                        listUnits: [],
                                      })
                                    }
                                  }
                                }
                              }}
                            >
                              <td style={{
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                color: '#000000'
                              }}>
                                <span>{it.name}</span>
                              </td>
                            </tr>
                          ) : (
                            <div style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center"
                            }}>
                              <input
                                style={{ width: "60%", outline: "unset" }}
                                value={this.state.editLevel?.name}
                                onChange={(event) => {
                                  this.setState({
                                    editLevel: {
                                      ...this.state.editLevel,
                                      name: event.target.value
                                    }
                                  })
                                }}
                              />
                              <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "20px"
                              }}>
                                <i
                                  className="fa fa-check"
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "10px",
                                    cursor: "pointer"
                                  }}
                                  onClick={async () => {
                                    let isExist = false;
                                    this.state.listLevelOfBlock.forEach(level => {
                                      if (level.name.trim() === this.state.editLevel?.name.trim()) {
                                        isExist = true;
                                        return;
                                      }
                                    })
                                    if (!isExist) {
                                      if (this.state.hiddenUpdate === 'flex') {
                                        let level = {
                                          building: {
                                            id: this.state.buildingId
                                          },
                                          id: this.state.selectedLevelName.id,
                                          name: this.state.editLevel?.name.trim(),
                                        }
                                        let response = await saveFloorLevel(level)
                                        if (response.success == true) {
                                          Swal.fire(
                                            'Done!',
                                            'Your database has been changed!',
                                            'success'
                                          ).then(async () => {
                                            let params = {
                                              options: {
                                                buildingId: this.state.buildingId,
                                                blockId: this.state.selectedBlockName.id,
                                              }
                                            };
                                            let responseLevel = await getFloorLevels(params, null);
                                            this.setState({
                                              listLevelOfBlock: !!responseLevel.results ? responseLevel.results : [],
                                              selectedLevel: '',
                                              selectedLevelName: undefined,
                                              selectedUnit: '',
                                              selectedUnitName: undefined,
                                              editLevel: undefined,
                                              pointerEventLevel: undefined,
                                              copyLevel: ''
                                            })
                                          })
                                        } else {
                                          Swal.fire(
                                            'Error!',
                                            response.message || response.errorDescription || '',
                                            'error'
                                          )
                                        }
                                      } else {

                                        const editingBlock = JSON.parse(JSON.stringify(this.state.objAddress.blocks));
                                        const editingLevel = editingBlock[this.state.selectedBlock].levels[this.state.selectedLevel];
                                        editingLevel.name = this.state.editLevel?.name;
                                        editingBlock[this.state.selectedBlock].levels[this.state.selectedLevel] = editingLevel;

                                        this.state.objAddress.blocks.forEach((block, index) => {
                                          if (block.name === this.state.selectedBlockName.name) {
                                            block.levels = editingBlock[this.state.selectedBlock].levels;
                                          }
                                        })

                                        this.setState({
                                          editLevel: undefined,
                                          selectedLevel: '',
                                          selectedLevelName: undefined,
                                          pointerEventLevel: undefined,
                                          listLevelOfBlock: editingBlock[this.state.selectedBlock].levels,
                                          listBlock: this.state.objAddress.blocks
                                        });
                                      }
                                    } else {
                                      Swal.fire(
                                        'Error!',
                                        'Level already exists',
                                        'error'
                                      ).then(() => {
                                        if (this.state.hiddenUpdate === 'flex') {
                                          this.setState({
                                            editLevel: undefined,
                                            pointerEventLevel: undefined,
                                            copyLevel: ''
                                          })
                                        }
                                      })
                                    }
                                  }}
                                />
                                <i
                                  className="fa fa-remove"
                                  style={{ fontSize: "20px", cursor: "pointer" }}
                                  onClick={() => {
                                    if (this.state.hiddenUpdate === 'flex') {
                                      if (!!this.state.copyLevel) {
                                        Swal.fire({
                                          html: `<p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this level: </p>
                                                    <p>${this.state.selectedLevelName.name}  ?</p>`,
                                          icon: 'question',
                                          showCancelButton: true,
                                          confirmButtonText: 'Yes',
                                          cancelButtonText: 'No'
                                        }).then(async (result) => {
                                          if (result.value) {
                                            let param = {
                                              id: this.state.selectedLevelName.id
                                            }
                                            let response = await deleteFloorLevel(param)
                                            if (response.success == true) {
                                              Swal.fire(
                                                'Deleted!',
                                                'Your block has been deleted.',
                                                'success'
                                              )
                                                .then(async () => {
                                                  let params3 = {
                                                    options: {
                                                      buildingId: this.state.buildingId,
                                                      blockId: this.state.selectedBlockName.id,
                                                    }
                                                  };
                                                  let responseLevels = await getFloorLevels(params3, null);
                                                  this.setState({
                                                    listLevelOfBlock: !!responseLevels.results ? responseLevels.results : [],
                                                    selectedLevel: '',
                                                    selectedLevelName: undefined,
                                                    selectedUnit: '',
                                                    selectedUnitName: undefined,
                                                    pointerEventLevel: undefined,
                                                    listUnitOfLevel: [],
                                                    newLevels: '',
                                                    copyLevel: ''
                                                  })
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
                                      }
                                    } else {
                                      if (!!this.state.copyLevel) {

                                        this.state.objAddress.blocks.forEach((block, index) => {
                                          if (block.name === this.state.selectedBlockName.name) {
                                            block.levels.splice(block.levels.length - 1, 1)
                                          }
                                        })

                                        // load listLevelOfBlock show in table level
                                        let listLevel = [];
                                        let listLevelofBlock = [];
                                        this.state.objAddress.blocks.forEach(block => {
                                          if (block.name === this.state.selectedBlockName.name) {
                                            listLevel = block.levels;
                                          }
                                        })
                                        for (let i = 0; i < listLevel.length; i++) {
                                          listLevelofBlock.push({ name: listLevel[i].name.trim() });
                                        }

                                        this.setState({
                                          selectedLevel: '',
                                          copyLevel: '',
                                          pointerEventLevel: undefined,
                                          listUnitOfLevel: [],
                                          listLevelOfBlock: listLevelofBlock,
                                          copyLevel: ''
                                        })
                                      }
                                    }
                                    this.setState({
                                      editLevel: undefined,
                                      pointerEventLevel: undefined,
                                      copyLevel: ''
                                    })
                                  }}
                                />
                              </div>
                            </div>
                          )
                        )
                      })
                    }
                  </table>
                </div>
              </div>
              <div style={{ marginLeft: '50px' }}>
                <i style={{ color: '#042ee1', marginTop: '50px' }} className="fa fa-arrow-left fa-4x"
                   aria-hidden="true"/>
              </div>
              <div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '50px',
                    fontSize: '15px',
                    marginLeft: '10px', marginTop: '57px', marginBottom: '10px'
                  }}
                  onClick={async () => {
                    if (!!this.state.selectedBlockName) {
                      let names = [];
                      if (this.state.hiddenUpdate === 'flex') {
                        let lines = this.state.newLevels.split('\n');
                        lines = lines.map(element => {
                          return element.trim()
                        });
                        const nonDupLine = lines.filter((item, index) => lines.indexOf(item) === index && item.trim() !== '');
                        if (this.state.listLevelOfBlock && this.state.listLevelOfBlock.length) {
                          nonDupLine.forEach(line => {
                            let found = false;
                            this.state.listLevelOfBlock.forEach(level => {
                              if (level.name === line.trim()) {
                                found = true;
                              }
                            })
                            if (found === false) {
                              names.push(line.trim());
                            }
                          })
                        } else {
                          for (let i = 0; i < nonDupLine.length; i++) {
                            names.push(nonDupLine[i].trim());
                          }
                        }
                        let level = {
                          building: {
                            id: this.state.buildingId
                          },
                          block: {
                            id: this.state.selectedBlockName.id
                          },
                          names: names,
                        }
                        if (level.names && level.names.length) {
                          let response = await saveFloorLevel(level)
                          if (response.success == true) {
                            Swal.fire(
                              'Done!',
                              'Your database has been changed!',
                              'success'
                            ).then(async () => {
                              let params = {
                                options: {
                                  buildingId: this.state.buildingId,
                                  blockId: this.state.selectedBlockName.id,
                                }
                              };
                              let responseLevel = await getFloorLevels(params, null);

                              this.setState({
                                listLevelOfBlock: !!responseLevel.results ? responseLevel.results : [],
                              });
                            })
                          }
                        }
                        this.setState({
                          selectedLevel: '',
                          selectedLevelName: undefined,
                          selectedUnit: '',
                          selectedUnitName: undefined,
                          editLevel: undefined,
                          pointerEventLevel: undefined,
                          newLevels: ''
                        });
                      } else {
                        const temp = [];
                        let listBlocks2 = [];
                        if (this.state.newLevels != null && this.state.newLevels != '') {
                          let listBlocks = this.state.listBlocks;
                          this.setState({ listLevels: [] });
                          // check listLevels of block selected
                          if (this.state.selectedBlockName && this.state.selectedBlockName.name.length) {
                            listBlocks.forEach(line => {
                              if (line.name === this.state.selectedBlockName.name) {
                                for (let i = 0; i < line.levels.length; i++) {
                                  this.state.listLevels.push(line.levels[i]);
                                }
                              }
                            })
                          }

                          //check duplicate of value input
                          let lines = this.state.newLevels.split('\n');
                          lines = lines.map(element => {
                            return element.trim()
                          });
                          const nonDupLine = lines.filter((item, index) => lines.indexOf(item) === index && item.trim() !== '');
                          if (this.state.listLevels && this.state.listLevels.length) {
                            nonDupLine.forEach(line => {
                              let found = false;
                              this.state.listLevels.forEach(level => {
                                if (level.name === line.trim()) {
                                  found = true;
                                }
                              })
                              if (found === false) {
                                temp.push({ name: line.trim(), units: [] });
                              }
                            })
                          } else {
                            for (let i = 0; i < nonDupLine.length; i++) {
                              this.state.listLevels.push({
                                'name': nonDupLine[i].trim(),
                                'units': []
                              });
                              this.state.block.push({
                                'name': nonDupLine[i].trim(),
                                'units': []
                              });
                            }
                          }

                          temp.forEach(t => {
                            this.state.listLevels.push(t);
                          })
                          this.state.o.levels = this.state.level;
                          listBlocks2 = this.state.listBlocks;

                          // add new levels of block
                          if (this.state.selectedBlockName && this.state.selectedBlockName.name.length) {
                            listBlocks2.forEach(line => {
                              if (line.name === this.state.selectedBlockName.name) {
                                line.levels = this.state.listLevels;
                              }
                            })
                          }
                        }

                        // load listLevelOfBlock show in table level
                        let listLevel = [];
                        let listLevelofBlock = [];
                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            listLevel = block.levels;
                          }
                        })
                        for (let i = 0; i < listLevel.length; i++) {
                          listLevelofBlock.push({ name: listLevel[i].name.trim() });
                        }
                        this.setState({ newLevels: '', listLevelOfBlock: listLevelofBlock })
                      }
                    }

                  }}
                >
                  <span>Add New</span>
                </div>
              </div>
              <div style={{ marginLeft: '20px' }}>
                <div className="tbl-header">
                  <table style={{ width: '100%' }}>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#fff',
                        color: '#0084b7',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '199px',
                        maxWidth: '200px',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        border: '0.5px solid #000000'
                      }} scope="col">Add new levels
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div style={{ width: '200%', overflow: 'auto', maxHeight: '130px', maxWidth: '200px' }}>
                  <table style={{ width: '100%', border: '0.5px solid' }}>
                    <tr>
                      <td style={{ textAlign: 'left', whiteSpace: 'nowrap', color: '#000000' }}>
                                                        <textarea
                                                          className="form-control"
                                                          id="exampleFormControlTextarea1" rows="3"
                                                          placeholder={!!this.state.selectedBlockName ? "Input level" : "Please select block"}
                                                          style={{ height: '123px' }}
                                                          value={!!this.state.selectedBlockName ? this.state.newLevels : ""}
                                                          onChange={(event) => {
                                                            this.state.newLevels = event.target.value;
                                                            this.setState({});
                                                          }}
                                                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '10px' }}>
              <div style={{
                padding: '15px',
                paddingTop: '20px',
                paddingBottom: '20px',
                display: "flex",
                flexDirection: "row",
                height: '40px',
                alignItems: "center",
                backgroundColor: '#a8d4f5',
                borderRadius: '10px',
                width: '100%',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#000000', fontWeight: '500', fontSize: '20px' }}>Unit Details</span>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={() => {
                    if (!!this.state.selectedUnitName) {
                      this.setState({
                        pointerEventUnit: { lock: true, number: this.state.selectedUnit },
                        editUnit: {
                          number: this.state.selectedUnit,
                          name: this.state.selectedUnitName.name
                        }
                      })
                    }
                  }}
                >
                  <span>Edit selected</span>
                </div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '35px',
                    fontSize: '15px',
                    marginLeft: '55px', marginTop: '10px', marginBottom: '10px'
                  }}
                  onClick={() => {
                    if (this.state.selectedUnitName != null && this.state.selectedUnitName != '') {
                      if (this.state.hiddenUpdate === 'flex') {
                        Swal.fire({
                          html: `
                                                                <p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this unit: </p>
                                                                <p>${this.state.selectedUnitName.name}  ?</p>
                                                            `,
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonText: 'Yes',
                          cancelButtonText: 'No'
                        }).then(async (result) => {
                          if (result.value) {
                            let param = {
                              id: this.state.selectedUnitName.id
                            }
                            let response = await deleteBuildingUnit(param)
                            if (response.success == true) {
                              Swal.fire(
                                'Deleted!',
                                'Your unit has been deleted.',
                                'success'
                              )
                                .then(async () => {
                                  let params = {
                                    options: {
                                      floorLevelId: this.state.selectedLevelName.id,
                                    }
                                  };
                                  let responseUnit = await getBuildingUnits(params, null);
                                  this.setState({
                                    listUnitOfLevel: !!responseUnit.results ? responseUnit.results : [],
                                    selectedUnit: '',
                                    selectedUnitName: undefined,
                                    editUnit: undefined,
                                    pointerEventUnit: undefined,
                                    newUnits: ''
                                  })
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
                        const deleteBlock2 = JSON.parse(JSON.stringify(this.state.objAddress.blocks));
                        const deleteLevel2 = deleteBlock2[this.state.selectedBlock].levels[this.state.selectedLevel];
                        const deleteUnit = deleteLevel2.units;
                        deleteUnit.splice(this.state.selectedUnit, 1);
                        deleteBlock2[this.state.selectedBlock].levels[this.state.selectedLevel].units = deleteUnit;

                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            block.levels.forEach(level => {
                              if (level.name === this.state.selectedLevelName.name) {
                                level.units = deleteBlock2[this.state.selectedBlock].levels[this.state.selectedLevel].units
                              }
                            })
                          }
                        })

                        // load listUnitOfLevel ==> show in Units table
                        let listUnits = [];
                        let listUnitOfLevel = [];
                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            for (let i = 0; i < block.levels.length; i++) {
                              if (block.levels[i].name === this.state.selectedLevelName.name) {
                                listUnits = block.levels[i].units;
                              }
                            }
                          }
                        })

                        if (listUnits != null) {
                          for (let i = 0; i < listUnits.length; i++) {
                            listUnitOfLevel.push({ name: listUnits[i].name.trim() });
                          }
                        }
                        this.setState({
                          selectedUnit: '',
                          pointerEventUnit: undefined,
                          listUnitOfLevel: listUnitOfLevel,
                          listBlocks: this.state.objAddress.blocks,
                        })
                      }
                    }
                  }}
                >
                  <span>Delete selected</span>
                </div>
              </div>
              <div style={{ marginLeft: '20px', border: '0.5px solid', width: '202px' }}>
                <div className="tbl-header">
                  <table style={{ width: '100%' }}>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#fff',
                        color: '#0084b7',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '182px',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        border: '0.5px solid #000000'
                      }} scope="col">Current defined units
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div style={{ width: '200%', overflow: 'auto', maxHeight: '130px', maxWidth: '200px' }}>
                  <table style={{ width: '100%', }}>
                    {(this.state.listUnitOfLevel || [])
                      .map((it, index) => {
                        return (
                          this.state.editUnit?.number !== index ? (
                            <tr key={index}
                                style={{
                                  backgroundColor: this.state.selectedUnit === index ? '#a8d4f5' : '',
                                  pointerEvents: !!this.state.pointerEventUnit && this.state.pointerEventUnit.number !== index ? 'none' : undefined
                                }}
                                onClick={() => {
                                  if (index === this.state.selectedUnit) {
                                    this.setState({
                                      selectedUnit: '',
                                      selectedUnitName: undefined,
                                    })
                                  } else {
                                    if (!!this.state.selectedLevelName) {
                                      this.setState({
                                        selectedUnit: index,
                                        selectedUnitName: it,
                                      })
                                    }
                                  }
                                }}
                            >
                              <td style={{
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                color: '#000000'
                              }}>
                                <span>{it.name}</span>
                              </td>
                            </tr>
                          ) : (
                            <div style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center"
                            }}>
                              <input
                                style={{ width: "60%", outline: "unset" }}
                                value={this.state.editUnit?.name}
                                onChange={(event) => {
                                  this.setState({
                                    editUnit: {
                                      ...this.state.editUnit,
                                      name: event.target.value
                                    }
                                  })
                                }}
                              />
                              <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "20px"
                              }}>
                                <i
                                  className="fa fa-check"
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "10px",
                                    cursor: "pointer"
                                  }}
                                  onClick={async () => {
                                    let isExist = false;
                                    this.state.listUnitOfLevel.forEach(unit => {
                                      if (unit.name.trim() === this.state.editUnit?.name.trim()) {
                                        isExist = true;
                                        return;
                                      }
                                    })
                                    if (!isExist) {
                                      if (this.state.hiddenUpdate === 'flex') {
                                        let unit = {
                                          id: it.id,
                                          floorLevel: {
                                            id: this.state.selectedLevelName.id
                                          },
                                          name: this.state.editUnit?.name,
                                        }
                                        let response = await saveBuildingUnit(unit)
                                        if (response.success == true) {
                                          Swal.fire(
                                            'Done!',
                                            'Your database has been changed!',
                                            'success'
                                          ).then(async () => {
                                            let params = {
                                              options: {
                                                floorLevelId: this.state.selectedLevelName.id,
                                              }
                                            };
                                            let responseUnit = await getBuildingUnits(params, null);
                                            this.setState({
                                              listUnitOfLevel: !!responseUnit.results ? responseUnit.results : [],
                                              selectedUnit: '',
                                              selectedUnitName: undefined,
                                              editUnit: undefined,
                                              pointerEventUnit: undefined,
                                            })
                                          })
                                        } else {
                                          Swal.fire(
                                            'Error!',
                                            response.message || response.errorDescription || '',
                                            'error'
                                          )
                                        }
                                      } else {
                                        const editingBlock = JSON.parse(JSON.stringify(this.state.objAddress.blocks));
                                        const editingLevel = editingBlock[this.state.selectedBlock].levels[this.state.selectedLevel];
                                        const editingUnit = editingLevel.units[this.state.selectedUnit];
                                        editingUnit.name = this.state.editUnit?.name;
                                        editingBlock[this.state.selectedBlock].levels[this.state.selectedLevel].units[this.state.selectedUnit] = editingUnit;

                                        this.state.objAddress.blocks.forEach((block, index) => {
                                          if (block.name === this.state.selectedBlockName.name) {
                                            block.levels.forEach(level => {
                                              if (level.name === this.state.selectedLevelName.name) {
                                                level.units = editingBlock[this.state.selectedBlock].levels[this.state.selectedLevel].units
                                              }
                                            })
                                          }
                                        })

                                        this.setState({
                                          editUnit: undefined,
                                          selectedUnitName: undefined,
                                          pointerEventUnit: undefined,
                                          listUnitOfLevel: editingBlock[this.state.selectedBlock].levels[this.state.selectedLevel].units,
                                          listBlock: this.state.objAddress.blocks
                                        });
                                      }
                                    } else {
                                      Swal.fire(
                                        'Error!',
                                        'Unit already exists',
                                        'error'
                                      )
                                    }
                                  }}
                                />
                                <i
                                  className="fa fa-remove"
                                  style={{ fontSize: "20px", cursor: "pointer" }}
                                  onClick={() => {
                                    this.setState({
                                      editUnit: undefined,
                                      pointerEventUnit: undefined,
                                    })
                                  }}
                                />
                              </div>
                            </div>
                          )
                        )
                      })
                    }
                  </table>
                </div>
              </div>
              <div style={{ marginLeft: '50px' }}>
                <i style={{ color: '#042ee1', marginTop: '50px' }} className="fa fa-arrow-left fa-4x"
                   aria-hidden="true"/>
              </div>
              <div>
                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '0.5px solid #007bff',
                    width: '100px', height: '50px',
                    fontSize: '15px',
                    marginLeft: '10px', marginTop: '57px', marginBottom: '10px'
                  }}
                  onClick={async () => {
                    if (!!this.state.selectedLevelName) {
                      let names = [];
                      if (this.state.hiddenUpdate === 'flex') {
                        let lines = this.state.newUnits.split('\n');
                        lines = lines.map(element => {
                          return element.trim()
                        });
                        const nonDupLine = lines.filter((item, index) => lines.indexOf(item) === index && item.trim() !== '');
                        if (this.state.listUnitOfLevel && this.state.listUnitOfLevel.length) {
                          nonDupLine.forEach(line => {
                            let found = false;
                            this.state.listUnitOfLevel.forEach(level => {
                              if (level.name === line.trim()) {
                                found = true;
                              }
                            })
                            if (found === false) {
                              names.push(line.trim());
                            }
                          })
                        } else {
                          for (let i = 0; i < nonDupLine.length; i++) {
                            names.push(nonDupLine[i].trim());
                          }
                        }
                        let unit = {
                          floorLevel: {
                            id: this.state.selectedLevelName.id
                          },
                          names: names,
                        };
                        if (unit.names && unit.names.length) {
                          let response = await saveBuildingUnit(unit)
                          if (response.success == true) {
                            Swal.fire(
                              'Done!',
                              'Your database has been changed!',
                              'success'
                            ).then(async () => {
                              let params = {
                                options: {
                                  floorLevelId: this.state.selectedLevelName.id,
                                }
                              };
                              let responseUnit = await getBuildingUnits(params, null);
                              this.setState({
                                listUnitOfLevel: !!responseUnit.results ? responseUnit.results : [],
                              });
                            })
                          }
                        }
                        this.setState({
                          selectedUnit: '',
                          selectedUnitName: undefined,
                          editUnit: undefined,
                          pointerEventUnit: undefined,
                          newUnits: ''
                        });
                      } else {
                        const temp = [];
                        let listBlocks2 = [];
                        if (this.state.newUnits != null && this.state.newUnits != '') {
                          let listBlocks = this.state.listBlocks;
                          this.setState({ listUnits: [] });
                          // check unit of level selected
                          if (this.state.selectedLevelName && this.state.selectedLevelName.name.length) {
                            listBlocks.forEach(line => {
                              if (line.name === this.state.selectedBlockName.name) {
                                let listLevels = line.levels;
                                listLevels.forEach(level => {
                                  if (level.name === this.state.selectedLevelName.name) {
                                    if (level.units !== '') {
                                      level.units.forEach(unit => {
                                        this.state.listUnits.push(unit);
                                      })
                                    }
                                  }
                                })
                              }
                            })
                          }

                          // check duplicate date input
                          let lines = this.state.newUnits.split('\n');
                          lines = lines.map(element => {
                            return element.trim()
                          });
                          const nonDupLine = lines.filter((item, index) => lines.indexOf(item) === index && item.trim() !== '');
                          if (this.state.listUnits && this.state.listUnits.length) {
                            nonDupLine.forEach(line => {
                              let found = false;
                              this.state.listUnits.forEach(level => {
                                if (level.name === line.trim()) {
                                  found = true;
                                }
                              })
                              if (found === false) {
                                temp.push({ name: line.trim() });
                              }
                            })
                          } else {
                            for (let i = 0; i < nonDupLine.length; i++) {
                              this.state.listUnits.push({ 'name': nonDupLine[i].trim() });
                              this.state.unit.push({ 'name': nonDupLine[i].trim() });
                            }
                          }

                          temp.forEach(t => {
                            this.state.listUnits.push(t);
                          })
                          this.state.o.units = this.state.unit;

                          //add new units to level selected
                          let addBlock = JSON.parse(JSON.stringify(this.state.objAddress.blocks));
                          let addLevel = addBlock[this.state.selectedBlock].levels[this.state.selectedLevel];
                          let addUnit = addLevel.units;
                          addUnit = this.state.listUnits;
                          addBlock[this.state.selectedBlock].levels[this.state.selectedLevel].units = addUnit;

                          this.state.objAddress.blocks.forEach(block => {
                            if (block.name === this.state.selectedBlockName.name) {
                              block.levels.forEach(level => {
                                if (level.name === this.state.selectedLevelName.name) {
                                  level.units = addBlock[this.state.selectedBlock].levels[this.state.selectedLevel].units
                                }
                              })
                            }
                          })

                        }

                        // load listUnitOfLevel ==> show in Units table
                        let listUnits = [];
                        let listUnitOfLevel = [];
                        this.state.objAddress.blocks.forEach(block => {
                          if (block.name === this.state.selectedBlockName.name) {
                            for (let i = 0; i < block.levels.length; i++) {
                              if (block.levels[i].name === this.state.selectedLevelName.name) {
                                listUnits = block.levels[i].units;
                              }
                            }
                          }
                        })

                        if (listUnits != null) {
                          for (let i = 0; i < listUnits.length; i++) {
                            listUnitOfLevel.push({ name: listUnits[i].name.trim() });
                          }
                        }
                        this.setState({ newUnits: '', listUnitOfLevel: listUnitOfLevel })
                      }
                    }
                  }}
                >
                  <span>Add New</span>
                </div>
              </div>
              <div style={{ marginLeft: '20px' }}>
                <div className="tbl-header">
                  <table style={{ width: '100%' }}>
                    <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#fff',
                        color: '#0084b7',
                        fontWeight: '500',
                        fontSize: '16px',
                        width: '199px',
                        maxWidth: '200px',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        border: '0.5px solid #000000'
                      }} scope="col">Add new units
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div style={{ width: '200%', overflow: 'auto', maxHeight: '130px', maxWidth: '200px' }}>
                  <table style={{ width: '100%', border: '0.5px solid' }}>
                    <tr>
                      <td style={{ textAlign: 'left', whiteSpace: 'nowrap', color: '#000000' }}>
                                                        <textarea
                                                          className="form-control"
                                                          id="exampleFormControlTextarea1" rows="3"
                                                          placeholder={!!this.state.selectedLevelName ? "Input Unit" : "Please select level"}
                                                          style={{ height: '123px' }}
                                                          value={!!this.state.selectedLevelName ? this.state.newUnits : ""}
                                                          onChange={(event) => {
                                                            this.state.newUnits = event.target.value;
                                                            this.setState({});
                                                          }}
                                                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </TotPage>
    );
  }
}

export default withNamespaces('common')(Homepage);
