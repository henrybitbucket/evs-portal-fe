import React from 'react';
import css from 'styled-jsx/css';
// @ts-ignore
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { Pagination } from '@app/components/Common';
import { IBasicPageProps } from '@app/components/Types';
import { ProgressLoading } from '@app/components/Common';
import 'moment-timezone';

import { getAddressLogs } from '@app/api/log';
import moment from "moment";

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
  static getInitialProps = async (args) => {
    const {
      query: {
        page,
        search
      },
      asPath,
      initialState: {},
    } = args;

    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      limit: 20,
      offset: (pageNumber - 1) * 20,
      options: {
        query: search,
      },
    };

    let rp = await getAddressLogs(params);
    rp = rp || {};
    rp.response = rp.response || {};
    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
      addressLogs: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
      search,
    };
  }
  state = {
    ...this.props,
  };

  componentDidMount() {
  }

  render() {

    return (
      <TotPage title={'Address Logs'}>
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
              }}
            >
              <div style={{
                padding: '15px',
                borderBottom: '1px solid #ddd',
                paddingTop: '20px',
                paddingBottom: '20px',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: '#99d3ff',
                height: '80px'
              }}>
                <h5 style={{ color: '#111', fontSize: '30px', flex: "1" }}>Address Logs</h5>
                <input
                  className='search'
                  type="text"
                  style={{
                    outline: 'none',
                    border: '0.5px solid',
                    borderColor: '#e1e1e1',
                    fontSize: '15px',
                    paddingLeft: '10px',
                    width: '400px',
                    height: '50px',
                    borderRadius: '20px',
                    marginRight: '5px',
                  }}
                  id='search'
                  placeholder="Search in all fields"
                  value={this.state.search}
                  onChange={evt => {
                    this.setState({ search: evt.target.value })
                  }}
                />

                <div
                  className="button-btn"
                  style={{
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px', border: '2px solid #007bff',
                    width: '100px', height: '50px',
                    backgroundColor: '#99d3ff', color: '#007bff',
                    fontSize: '15px',
                    marginLeft: '10px', fontWeight: 500,
                  }}
                  onClick={() => {
                    let url = window.location.pathname;
                    const search = (this.state.search || '').trim();
                    url = url + '?search=' + search;
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
                    require('@app/utils/next-routes').Router.pushRoute(window.location.pathname);
                  }}
                >
                  <span>Clear</span>
                </div>
              </div>
              <div style={{ display: 'flex', padding: '15px', paddingTop: '0px', paddingBottom: '0px', }}>
                <div
                  style={{
                    padding: '15px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    display: "flex",
                    flexDirection: "row",
                    height: '40px',
                    alignItems: "center",
                    backgroundColor: '#a8d4f5',
                    borderRadius: '10px',
                    flex: 1,
                    marginTop: '10px',
                    marginBottom: '10px'
                  }}
                  className="ml-mobile"
                >
                <span style={{
                  color: '#000000',
                  fontWeight: 500
                }}>
                  Total found: {this.state.totalRecords} Logs, {this.state.totalPages} Pages
                </span>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                background: '#fff',
                minHeight: '500px'
              }} className="doctor-list">
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflowX: 'auto',
                  width: '100%'
                }}>
                  <table className="table">
                    <thead className="thead-dark">
                    <tr>
                      <th className="table-th" scope="col">MCU SN</th>
                      <th className="table-th" scope="col">Meter SN</th>
                      <th className="table-th" scope="col">City</th>
                      <th className="table-th" scope="col">Street</th>
                      <th className="table-th" scope="col">Postal Code</th>
                      <th className="table-th" scope="col">Building</th>
                      <th className="table-th" scope="col">Block</th>
                      <th className="table-th" scope="col">Level</th>
                      <th className="table-th" scope="col">Unit</th>
                      <th className="table-th" scope="col">Remark</th>
                      <th className="table-th" scope="col">Type</th>
                      <th className="table-th" scope="col">Created Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {(this.state.addressLogs || [])
                      .map((it, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-td">
                              {it.sn}
                            </td>
                            <td className="table-td">
                              <span>{it.msn}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.city}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.street}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.postalCode}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.building}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.block}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.level}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.unitNumber}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.remark}</span>
                            </td>
                            <td className="table-td">
                              <span>{it.type}</span>
                            </td>
                            <td className="table-td">
                              <span>
                                {!!it.createdDate ? moment(it.createdDate).format('YYYY-MM-DD HH:mm:ss') : ''}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>

                  <div
                    className="row mt-3"
                    style={{ marginLeft: '0px', marginRight: '0px', }}
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
