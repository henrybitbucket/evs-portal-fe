import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { getDeviceLogs } from '@app/api/log';
import { Pagination, ProgressLoading } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import ReactTooltip from 'react-tooltip';
import makeAnimated from 'react-select/animated';
import DatePicker from "react-datepicker";
import { IoMailUnreadOutline } from "react-icons/io5";
import Select from 'react-select';

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
`;

interface IDashboardPageState {

}

const operationList = [
  { value: '', label: 'Select operation...' },
  { value: 'REMOVE', label: 'REMOVE' },
  { value: 'REPLACED', label: 'REPLACED' },
  { value: 'COUPLE ADDRESS', label: 'COUPLE ADDRESS' },
  { value: 'DE-COUPLE ADDRESS', label: 'DE-COUPLE ADDRESS' },
  { value: 'COUPLE MSN', label: 'COUPLE MSN' },
  { value: 'DE-COUPLE MSN', label: 'DE-COUPLE MSN' },
  { value: 'OTA', label: 'OTA' },
];

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {

  state = {
    ...this.props,
    proFromDate: '',
    proToDate: '',
    buildings: [],
    floorLevels: [],
    buildingUnits: [],
    searchPostalCode: this.props.params.options.queryPostalCode,
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
        querySn,
        queryMsn,
        queryEsimId,
        queryUuid,
        queryEnrollmentDate,
        queryOperationDate,
        queryRemark,
        showMoreDetails,
        queryOperation,
        queryOperationBy,
      },
      asPath, req, initialState: {},
    } = args;
    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        fromDate: !!fromDate ? new Date(fromDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        toDate: !!toDate ? (new Date(toDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() + 1000 * 60 * 60 * 24 - 1) : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        queryEsimId: !!queryEsimId ? queryEsimId : undefined,
        queryUuid: !!queryUuid ? queryUuid : undefined,
        queryEnrollmentDate,
        queryOperationDate: queryOperationDate === "" || queryOperationDate === null || queryOperationDate === undefined || queryOperationDate === "true",
        queryRemark: !!queryRemark ? queryRemark : undefined,
        queryOperation: !!queryOperation ? queryOperation : undefined,
        queryOperationBy: !!queryOperationBy ? queryOperationBy : undefined,
      },
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };

    let rp = await getDeviceLogs(params, req);
    rp = rp || {};
    rp.response = rp.response || {};

    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      logs: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      page,
      devices: rp.response.results?.filter(device => device.uid !== 'server.csr'),
      asPath,
      tempFromDate: params.options.fromDate ? new Date(params.options.fromDate) : undefined,
      deToDate: params.options.toDate ? new Date(params.options.toDate) : undefined,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      searchUuid: params.options.queryUuid,
      searchEsimId: params.options.queryEsimId,
      searchRemark: params.options.queryRemark,
      searchOperationBy: params.options.queryOperationBy,
      enrollmentDate: params.options.queryEnrollmentDate,
      operationDate: params.options.queryOperationDate,
      loading: false,
      params,
      showMoreDetails,
      operationList,
      selectedOperation: params.options?.queryOperation ? {label: params.options?.queryOperation, value: params.options?.queryOperation} : undefined,
    };
  }

  componentDidMount() {
  }

  render() {
    this.state.updated = true;
    return (
      <TotPage title={'Device Operation Logs'}>
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
                pointerEvents: (!!this.state.showOperationDetails) ? 'none' : null,
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
                  <span>{'Device Management'} <i className="fa fa-caret-right ml-5 mr-5"/> {'Device Operation Logs'}</span>
                  <h5 className="site-title">{'Device Operation Logs'}</h5>
                </div>
                <div
                  style={{
                    padding: '30px',
                    borderBottom: '1px solid #ddd',
                    overflow: "inherit",
                    pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="box-checkbox">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="enrollment-date"
                        name="enrollment-date"
                        checked={!!this.state.enrollmentDate}
                        value={this.state.enrollmentDate}
                        onChange={(event) => {
                          if (!!event.target.checked) {
                            this.setState({
                              enrollmentDate: true,
                            });
                          } else {
                            this.setState({
                              enrollmentDate: false
                            });
                          }
                        }}
                      />
                      <span style={{ marginLeft: '5px' }}>{'Enrollment date'}</span>
                    </div>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="operation-date"
                        name="operation-date"
                        checked={!!this.state.operationDate}
                        value={this.state.operationDate}
                        onChange={(event) => {
                          if (!!event.target.checked) {
                            this.setState({operationDate: true});
                          } else {
                            this.setState({operationDate: false});
                          }
                        }}
                      />
                      <span style={{ marginLeft: '5px' }}>{'Operation date'}</span>
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
                          color: ' #282828',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        <span style={{ marginRight: '10px' }}>{'From date:'}</span>
                        <DatePicker
                          className="date-picker"
                          dateFormat="yyyy-MM-dd"
                          selected={this.state.tempFromDate || ''}
                          placeholderText={"YYYY-MM-DD"}
                          onChange={(date: Date) => this.setState({ tempFromDate: date })}
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
                            color: ' #282828',
                            fontSize: '14px',
                            fontWeight: 500,
                          }}
                          className="box-to-date"
                        >
                          <span style={{ marginRight: '10px' }}>{'To date:'}</span>
                          <DatePicker
                            className="date-picker"
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.deToDate || ''}
                            placeholderText={"YYYY-MM-DD"}
                            min={this.state.tempFromDate}
                            onChange={(date: Date) => this.setState({ deToDate: date })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      marginTop: '15px',
                      marginBottom: '15px'
                    }}
                    className="box-item"
                  >
                    <div style={{display: 'flex'}}>
                      <div
                        style={{
                          display: 'flex',
                          paddingLeft: 'unset'
                        }}
                        className="item">
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
                          value={this.state.searchEsimId || ''}
                          placeholder="Search eSIM ID..."
                          onChange={event => this.setState({ searchEsimId: event.target.value })}
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
                          value={this.state.searchUuid || ''}
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
                          value={this.state.searchSn || ''}
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
                          value={this.state.searchMsn || ''}
                          placeholder="Search MSN..."
                          onChange={event => this.setState({ searchMsn: event.target.value })}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <div
                        className="item"
                        style={{
                          display: 'flex',
                          paddingLeft: '0px'
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
                          value={this.state.searchRemark || ''}
                          placeholder="Search Remark..."
                          onChange={event => this.setState({ searchRemark: event.target.value })}
                        />
                      </div>
                      <div
                        className="item"
                        style={{
                          display: 'flex',
                          padding: '0px'
                        }}
                      >
                        <Select
                          className="multi-select-cid"
                          components={animatedComponents}
                          defaultValue={this.state.selectedOperation || this.state.operationList[0]}
                          options={this.state.operationList}
                          onChange={(event) => {
                            if (!event.value) {
                              this.setState({ selectedOperation: undefined });
                            } else {
                              this.setState({ selectedOperation: event });
                            }
                          }}
                        />
                      </div>
                      <div
                        className="item"
                        style={{
                          display: 'flex',
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
                          value={this.state.searchOperationBy || ''}
                          placeholder="Search operation by"
                          onChange={event => this.setState({ searchOperationBy: event.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignSelf: 'center',
                    }}
                  >
                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                    <div
                      data-tip="Apply filters and search"
                      className="button-btn w-80"
                    >
                      <div
                        onClick={() => {
                          const options = {
                            fromDate: !!this.state.tempFromDate ? moment(new Date(this.state.tempFromDate)).format('DD/MM/YYYY') : '',
                            toDate: !!this.state.deToDate ? moment(new Date(this.state.deToDate)).format('DD/MM/YYYY') : '',
                            querySn: !!this.state.searchSn ? this.state.searchSn : '',
                            queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : '',
                            queryUuid: this.state.searchUuid || '',
                            queryEsimId: this.state.searchEsimId || '',
                            queryEnrollmentDate: this.state.enrollmentDate,
                            queryOperationDate: this.state.operationDate,
                            queryRemark: this.state.searchRemark || '',
                            queryOperation: !!this.state.selectedOperation ? this.state.selectedOperation.value : undefined,
                            queryOperationBy: this.state.searchOperationBy || '',
                          };
                          let pathName = window.location.pathname;

                          if (Object.keys(options).length) {
                            pathName = pathName.concat("?");

                            if (!!options.fromDate) {
                              pathName = pathName.concat(`fromDate=${options.fromDate}&`)
                            }
                            if (!!options.toDate) {
                              pathName = pathName.concat(`toDate=${options.toDate}&`)
                            }
                            if (!!options.querySn) {
                              pathName = pathName.concat(`querySn=${options.querySn}&`)
                            }
                            if (!!options.queryMsn) {
                              pathName = pathName.concat(`queryMsn=${options.queryMsn}&`)
                            }
                            if (!!options.queryEnrollmentDate) {
                              pathName = pathName.concat(`queryEnrollmentDate=${options.queryEnrollmentDate}&`)
                            }
                            if ((options.queryOperationDate + "") === "true" || (options.queryOperationDate + "") === "false") {
                              pathName = pathName.concat(`queryOperationDate=${options.queryOperationDate}&`)
                            }
                            if (!!options.queryUuid) {
                              pathName = pathName.concat(`queryUuid=${options.queryUuid}&`)
                            }
                            if (!!options.queryEsimId) {
                              pathName = pathName.concat(`queryEsimId=${options.queryEsimId}&`)
                            }
                            if (!!options.queryRemark) {
                              pathName = pathName.concat(`queryRemark=${options.queryRemark}&`)
                            }
                            if (!!options.queryOperation) {
                              pathName = pathName.concat(`queryOperation=${options.queryOperation}&`)
                            }
                            if (!!options.queryOperationBy) {
                              pathName = pathName.concat(`queryOperationBy=${options.queryOperationBy}&`)
                            }
                            if (!!this.state.showMoreDetails) {
                              pathName = pathName.concat(`showMoreDetails=${this.state.showMoreDetails}&`)
                            }
                            pathName = pathName.slice(0, pathName.length - 1)
                            require('@app/utils/next-routes').Router.pushRoute(pathName);
                          }
                        }}
                      >
                        {'SEARCH'}
                      </div>
                    </div>
                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                    <div
                      data-tip="Clear all filters"
                      className="button-btn w-80 ml-10"
                      onClick={() => {
                        this.setState({
                          searchSn: undefined,
                          searchMsn: undefined,
                          fromDate: undefined,
                          toDate: undefined,
                          searchUuid: undefined,
                          searchEsimId: undefined,
                          enrollmentDate: undefined,
                          searchRemark: undefined,
                          searchOperationBy: undefined,
                          selectedOperation: undefined,
                        });
                        const pathName = window.location.pathname;
                        require('@app/utils/next-routes').Router.pushRoute(pathName);
                      }}
                    >
                      <span>{'CLEAR'}</span>
                    </div>
                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                    {/*<div*/}
                    {/*  data-tip="Export data as a CSV file"*/}
                    {/*  className="button-btn w-120 ml-10"*/}
                    {/*  onClick={async () => {*/}
                    {/*    const filter = {*/}
                    {/*      options: {*/}
                    {/*        status: !!this.state.selectedStatus ? this.state.selectedStatus.value : undefined,*/}
                    {/*        fromDate: !!this.state.fromDate ? moment(new Date(this.state.fromDate)).format('DD/MM/YYYY') : undefined,*/}
                    {/*        toDate: !!this.state.toDate ? moment(new Date(this.state.toDate)).format('DD/MM/YYYY') : undefined,*/}
                    {/*        querySn: !!this.state.searchSn ? this.state.searchSn : undefined,*/}
                    {/*        queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : undefined,*/}
                    {/*        queryUuid: this.state.searchUuid || undefined,*/}
                    {/*        queryEsimId: this.state.searchEsimId || undefined,*/}
                    {/*        queryGroup: !!this.state.selectedGroup ? this.state.selectedGroup.value.toString() : undefined,*/}
                    {/*        queryBuilding: this.state.searchBuilding?.value || '',*/}
                    {/*        queryBlock: this.state.searchBlock?.value || '',*/}
                    {/*        queryFloorLevel: this.state.searchFloorLevel?.value || null,*/}
                    {/*        queryBuildingUnit: this.state.searchBuildingUnit?.value || null,*/}
                    {/*        queryPostalCode: this.state.searchPostalCode || null,*/}
                    {/*        queryVendor: this.state.searchVendor?.value || null,*/}
                    {/*        downloadCsv: true,*/}
                    {/*      }};*/}
                    {/*    const url = '/api/ca-request-logs';*/}
                    {/*    const method = 'POST';*/}
                    {/*    const rp = await fetch(url, {*/}
                    {/*      method,*/}
                    {/*      body: JSON.stringify(filter),*/}
                    {/*      headers: {*/}
                    {/*        'Content-Type' : 'application/json',*/}
                    {/*      },*/}
                    {/*    })*/}
                    {/*      .then((response) => {*/}
                    {/*        return response.blob();*/}
                    {/*      });*/}
                    {/*    if (rp) {*/}
                    {/*      const tag =  moment(new Date()).format('YYYYMMDD');*/}
                    {/*      const fileName = 'ca-request-logs-' + tag + '.csv';*/}
                    {/*      const url = window.URL.createObjectURL(new Blob([rp]));*/}
                    {/*      const link = document.createElement('a');*/}
                    {/*      link.href = url;*/}
                    {/*      link.setAttribute('download', fileName);*/}
                    {/*      document.body.appendChild(link);*/}
                    {/*      link.click();*/}
                    {/*      link.parentNode.removeChild(link);*/}
                    {/*      this.setState({ openExportCsv: false, activateDate: undefined });*/}
                    {/*    } else {*/}
                    {/*      alert('Something went wrong. Please try again!');*/}
                    {/*    }*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <span>{'EXPORT CSV'}</span>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff' }}
                     className="doctor-list">
                  <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th className="table-th" scope="col">MCU SN</th>
                          <th className="table-th" scope="col">MCU UUID</th>
                          <th className="table-th" scope="col">ESIM ID</th>
                          <th className="table-th" scope="col">MSN</th>
                          {!!this.state.showMoreDetails && (
                            <th className="table-th" scope="col">VERSION</th>
                          )}
                          {!!this.state.showMoreDetails && (
                            <th className="table-th" scope="col">VENDOR</th>
                          )}
                          {!!this.state.showMoreDetails && (
                            <th className="table-th" style={{ width: '300px' }} scope="col">LAST SEEN</th>
                          )}
                          {!!this.state.showMoreDetails && (
                            <th className="table-th" scope="col">ENROLL</th>
                          )}
                          <th className="table-th" scope="col">OPERATION</th>
                          <th className="table-th" scope="col">OPERATION USER</th>
                          <th className="table-th" scope="col">OPERATION TIME</th>
                          {!!this.state.showMoreDetails && (
                            <th className="table-th" scope="col">REMARK</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                      {(this.state.devices || [])
                        .map((it, index) => {
                          return (
                            <tr
                              key={index}
                              style={{
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                color: '#000000',
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
                              {!!this.state.showMoreDetails && (
                                <td className="table-td">
                                  <span>{it.ver}</span>
                                </td>
                              )}
                              {!!this.state.showMoreDetails && (
                                <td className="table-td">
                                  <span>{it?.vendorName}</span>
                                </td>
                              )}
                              {!!this.state.showMoreDetails && (
                                <td className="table-td">
                                <span>
                                  {it.lastSubscribeDatetime ? moment(new Date(it.lastSubscribeDatetime)).format('YYYY-MM-DD HH:mm:ss') : ''}
                                </span>
                                </td>
                              )}
                              {!!this.state.showMoreDetails && (
                                <td className="table-td">
                                  <span>{it.enrollmentDatetime ? moment(new Date(it.enrollmentDatetime)).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                                </td>
                              )}
                              <td className="table-td">
                                <span>{it?.operation}</span>
                              </td>
                              <td className="table-td">
                                <span>{it?.operationBy}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.createDate ? moment(new Date(it.createDate)).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                              </td>
                              {!!this.state.showMoreDetails && (
                                <td className="table-td" style={{textAlign: 'center'}}>
                                  {(!!it.reason || !!it.remark || !!it?.address) && (
                                    <>
                                      <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                      {it.operation === 'OTA' ? (
                                        <span>{it.remark}</span>
                                      ) : (
                                      <div
                                        className="button-icon ml-15"
                                        data-tip="Click to see operation details"
                                        onClick={() => {
                                          if (!this.state.showOperationDetails) {
                                            this.setState({
                                              showOperationDetails: true,
                                              operationDetails: {
                                                removeReason: !it.reason?.includes("Replace reason") ? it.reason : null,
                                                remark: it.remark,
                                                address: it.address,
                                                replaceDetails: it.reason?.includes("Replace reason") ? it.reason : null,
                                              }
                                            });
                                          }
                                        }}
                                      >
                                        <IoMailUnreadOutline />
                                      </div>
                                      )
                                      }
                                    </>
                                  )}
                                </td>
                              )}
                            </tr>
                          );
                        })
                      }
                      </tbody>
                    </table>
                    {!!this.state.showOperationDetails && (
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
                          pointerEvents: 'all',
                          minHeight: '400px'
                        }}
                      >
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          {!!this.state.operationDetails?.removeReason && (
                            <>
                              <span style={{ fontWeight: 500, fontSize: '18px' }}>
                                {'Remove Reason'}
                              </span>
                                <span style={{ width: '100%', marginTop: '10px' }}>
                                {this.state.operationDetails?.removeReason}
                              </span>
                            </>
                          )}
                          {!!this.state.operationDetails?.replaceDetails && (
                            <>
                              <span style={{ fontWeight: 500, fontSize: '18px' }}>
                                {'Replace details'}
                              </span>
                              <span style={{ width: '100%', marginTop: '10px', whiteSpace: 'pre-line' }}>
                                {this.state.operationDetails?.replaceDetails}
                              </span>
                            </>
                          )}
                          {!!this.state.operationDetails?.remark && (
                            <>
                              <span style={{ fontWeight: 500, fontSize: '18px', marginTop: '20px' }}>
                                {'Remark'}
                              </span>
                                <span style={{ width: '100%', marginTop: '10px' }}>
                                {this.state.operationDetails?.remark}
                              </span>
                            </>
                          )}
                          {!!this.state.operationDetails?.address && (
                            <>
                              <span style={{ fontWeight: 500, fontSize: '18px', marginTop: '20px' }}>
                                {'Premise Address'}
                              </span>
                              <div style={{ width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <div style={{width: '100px'}}>
                                    {'City:'}
                                  </div>
                                  <div>
                                    {this.state.operationDetails?.address?.city}
                                  </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <div style={{width: '100px'}}>
                                    {'Street:'}
                                  </div>
                                  <div>
                                    {this.state.operationDetails?.address?.street}
                                  </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <div style={{width: '100px'}}>
                                    {'Building:'}
                                  </div>
                                  <div>
                                    {this.state.operationDetails?.address?.building}
                                  </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <div style={{width: '100px'}}>
                                    {'Block:'}
                                  </div>
                                  <div>
                                    {this.state.operationDetails?.address?.block}
                                  </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <div style={{width: '100px'}}>
                                    {'Floor Level:'}
                                  </div>
                                  <div>
                                    {this.state.operationDetails?.address?.level}
                                  </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <div style={{width: '100px'}}>
                                    {'Unit Number:'}
                                  </div>
                                  <div>
                                    {this.state.operationDetails?.address?.unitNumber}
                                  </div>
                                </div>
                              </div>
                            </>
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
                            this.setState({ showOperationDetails: false, operationDetails: undefined });
                          }}
                        >
                          {'Close'}
                        </button>
                      </div>
                    )}
                    <div
                      className="row mt-3"
                      style={{
                        marginLeft: '0px',
                        marginRight: '0px',
                      }}
                    >
                      <div className="col-sm-12 col-md-5">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: '#000',
                            paddingLeft: '15px',
                            marginBottom: '25px'
                          }}
                        >
                          <i
                            style={{
                              cursor: 'pointer',
                              fontSize: '30px',
                              marginRight: '10px',
                              color: this.state.showMoreDetails ? 'green' : '',
                            }}
                            className={`${this.state.showMoreDetails ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}`}
                            onClick={() => {
                              this.setState({showMoreDetails: !this.state.showMoreDetails})
                            }}
                          />
                          <div>
                            {'More details'}
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-sm-12 col-md-7 pagination"
                        style={{ justifyContent: 'flex-end', marginBottom: '25px' }}>
                        {this.state.totalRecords > this.state.pageSize && this.state.totalPages >= 2 && (
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </PageContent>
          {this.state.loading && (
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
