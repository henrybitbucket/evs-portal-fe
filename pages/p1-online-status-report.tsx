import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { getP1OnlineStatuses } from '@app/api/log';
import { Pagination, ProgressLoading } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import makeAnimated from 'react-select/animated';
import { getCookie } from '@app/utils/cookie';
import { tokenName } from '@app/utils/public-config';

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
  :global(.checkbox-container) {
    display: flex;
    flexDirection: row;
    align-items: center;
    margin-right: 15px;
    margin-left: 15px;
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
      white-space: nowrap;
    }
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
    width: 100%;
    font-size: 18px;
  }
  :global(.table-th) {
    background: #f2f3ff !important;
    color: #000000 !important;
    font-weight: 500 !important;
    fontSize: 14px !important;
    width: 180px;
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
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {

  state = {
    ...this.props,
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
        querySn,
        queryMsn,
        userSent,
        queryUid,
      }, asPath, req, initialState: { }
    } = args;

    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        status: !!status ? status : undefined,
        fromDate: !!fromDate ? new Date(fromDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() : undefined,
        toDate: !!toDate ? (new Date(toDate.replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,
        querySn: !!querySn ? querySn : undefined,
        queryMsn: !!queryMsn ? queryMsn : undefined,
        userSent: !!userSent ? userSent : undefined,
        queryUid: !!queryUid ? queryUid : undefined,
      },
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };

    let rp = await getP1OnlineStatuses(params, req);

    rp = rp || {};
    rp.response = rp.response || {};
    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      statuses: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      page,
      asPath,
      selectedStatus: status,
      fromDate: params.options.fromDate ? moment(params.options.fromDate).format('YYYY-MM-DD') : undefined,
      toDate: params.options.toDate ? moment(params.options.toDate).format('YYYY-MM-DD') : undefined,
      searchSn: params.options.querySn,
      searchMsn: params.options.queryMsn,
      searchUid: params.options.queryUid,
      searchUserSent: params.options.userSent
    };
  }

  render() {
    return (
      <TotPage title={'P1 Provisioning MCU QA Detail Report'}>
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
                pointerEvents: (!!this.state.openExportCsv || !!this.state.openEditDialog || !!this.state.showRawMessage) ? 'none' : null,
              }}
            >
              <div style={{
                padding: '15px',
                paddingTop: '20px',
                paddingBottom: '0px',
                fontWeight: 400,
                fontSize: '18px',
                color: '#000000'
              }}>
                <h5 className="site-title">P1 Provisioning MCU online Check</h5>
              </div>
              <div
                style={{
                  padding: '30px',
                  borderBottom: '1px solid #ddd',
                  pointerEvents: !!this.state.openSetTimeIntervalDialog ? 'none' : null,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ width: '80px' }}>{'From date: '}</span>
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          height: '40px',
                          width: '140px',
                          padding: '0px 5px'
                        }}
                        type="date"
                        value={this.state.fromDate}
                        onChange={event => this.setState({ fromDate: event.target.value })}
                      />
                    </div>
                    <div
                      style={{
                        marginLeft: '15px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ width: 'max-content' }}>{'To date: '}</span>
                      <input
                        style={{
                          border: '1px solid',
                          borderRadius: '5px',
                          marginLeft: '5px',
                          height: '40px',
                          width: '140px',
                          padding: '0px 5px'
                        }}
                        type="date"
                        value={this.state.toDate}
                        onChange={event => this.setState({ toDate: event.target.value })}
                      />
                    </div>
                    <input
                      style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        outline: 'unset',
                        height: '40px',
                        width: '100%',
                        paddingLeft: '10px',
                        marginLeft: '30px',
                        alignSelf: 'center',
                      }}
                      value={this.state.searchSn || ''}
                      placeholder="Search MCU SN..."
                      onChange={event => this.setState({ searchSn: event.target.value })}
                    />
                    <input
                      style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        outline: 'unset',
                        height: '40px',
                        width: '100%',
                        paddingLeft: '10px',
                        marginLeft: '30px',
                        alignSelf: 'center',
                      }}
                      value={this.state.searchMsn || ''}
                      placeholder="Search MSN..."
                      onChange={event => this.setState({ searchMsn: event.target.value })}
                    />
                    <input
                      style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        outline: 'unset',
                        height: '40px',
                        width: '100%',
                        paddingLeft: '10px',
                        marginLeft: '30px',
                        alignSelf: 'center',
                      }}
                      value={this.state.searchUid || ''}
                      placeholder="Search UID..."
                      onChange={event => this.setState({ searchUid: event.target.value })}
                    />
                    <input
                      style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        outline: 'unset',
                        height: '40px',
                        width: '100%',
                        paddingLeft: '10px',
                        marginLeft: '30px',
                        alignSelf: 'center',
                      }}
                      value={this.state.searchUserSent || ''}
                      placeholder="Search User..."
                      onChange={event => this.setState({ searchUserSent: event.target.value })}
                    />
                    <div
                      className="button-btn"
                      onClick={async () => {
                        const options = {
                          status: (!!this.state.selectedStatus && this.state.selectedStatus !== 'select') ? this.state.selectedStatus : '',
                          fromDate: !!this.state.fromDate ? moment(new Date(this.state.fromDate)).format('DD/MM/YYYY') : '',
                          toDate: !!this.state.toDate ? moment(new Date(this.state.toDate)).format('DD/MM/YYYY') : '',
                          querySn: !!this.state.searchSn ? this.state.searchSn : '',
                          queryMsn: !!this.state.searchMsn ? this.state.searchMsn?.toUpperCase() : '',
                          queryUid: !!this.state.searchUid ? this.state.searchUid : '',
                          userSent: (this.state.searchUserSent || '').toLowerCase(),
                        };

                        let pathName = window.location.pathname;
                        if (Object.keys(options).length) {
                          pathName = pathName.concat("?");
                          if (!!options.status) {
                            pathName = pathName.concat(`status=${options.status}&`)
                          }
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
                          if (!!options.queryUid) {
                            pathName = pathName.concat(`queryUid=${options.queryUid}&`)
                          }
                          if (!!options.userSent) {
                            pathName = pathName.concat(`userSent=${options.userSent}&`)
                          }
                        }
                        pathName = pathName.slice(0, pathName.length - 1)
                        require('@app/utils/next-routes').Router.pushRoute(pathName);
                      }}
                      style={{
                        width: 'fit-content',
                        padding: '15px',
                        marginLeft: '15px',
                      }}
                    >
                      <span>{'SEARCH'}</span>
                    </div>
                    <div
                      className="button-btn"
                      onClick={async () => {
                        const filter = {
                          options: {
                            exportCSV: true,
                            status: this.state.selectedStatus,
                            fromDate: !!this.state.fromDate ? new Date(this.state.fromDate).getTime() : undefined,
                            toDate: !!this.state.toDate ? (new Date(this.state.toDate).getTime() + (24 * 60 * 60 * 1000 - 1)) : undefined,
                            querySn: this.state.searchSn,
                            queryMsn: this.state.searchMsn?.toUpperCase(),
                            userSent: (this.state.searchUserSent || '').toLowerCase(),
                          },
                        };
                        const url = '/api/p1-online-statuses';
                        const method = 'POST';
                        const rp = await fetch(url, {
                          method,
                          body: JSON.stringify(filter),
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': getCookie(tokenName),
                          },
                        })
                          .then((response) => {
                            return response.blob();
                          });
                        if (rp) {
                          const tag = moment(new Date()).format('YYYYMMDDHHmmss');
                          const fileName = 'p1-online-status-reports-' + tag + '.csv';
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
                      style={{
                        width: 'fit-content',
                        padding: '15px',
                        marginLeft: '15px',
                      }}
                    >
                      <span>{'EXPORT'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }}
                className="doctor-list"
              >
                <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th className="table-th" scope="col">MCU SN</th>
                        <th className="table-th" scope="col">MCU UUID</th>
                        <th className="table-th" scope="col">ESIM ID</th>
                        <th className="table-th" scope="col">MSN</th>
                        <th className="table-th" scope="col">COUPLE STATE</th>
                        <th className="table-th" scope="col">VERSION</th>
                        <th className="table-th" scope="col">VENDOR</th>
                        <th className="table-th" scope="col">STATUS</th>
                        <th className="table-th" scope="col">USER SENT</th>
                        <th className="table-th" scope="col">LAST SENT</th>
                        <th className="table-th" scope="col">LAST RECEIVER</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(this.state.statuses || [])
                        .map((it, index) => {
                          return (
                            <tr key={index}>
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
                                <span>{it.type}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.version}</span>
                              </td>
                              <td className="table-td">
                                <span>{it?.vendor?.name}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.p1Online}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.p1OnlineLastUserSent}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.p1OnlineLastSent ? moment(new Date(it.p1OnlineLastSent)).format('YYYY/MM/DD HH:mm:ss') : ''}</span>
                              </td>
                              <td className="table-td">
                                <span>{it.p1OnlineLastReceived ? moment(new Date(it.p1OnlineLastReceived)).format('YYYY/MM/DD HH:mm:ss') : ''}</span>
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
                          totalRecords={this.props.totalRecords}
                          totalPages={this.props.totalPages}
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
                          pageIndex={this.props.pageIndex}
                          pageSize={this.props.pageSize}
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
      </TotPage>
    );
  }
}

export default withNamespaces('common')(Homepage);
