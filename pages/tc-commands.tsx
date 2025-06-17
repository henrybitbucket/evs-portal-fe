import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import 'moment-timezone';
import { getLogs, sendCommand } from '@app/api/log';

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
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
    constructor(props) {
        super(props);
        this.state.node = {items: []};
        this.state.offset = 0;
        this.state.gs = [];
        this.state.isShowLoadMore = false;
        this.state.results = [];
        this.state.keyword = "";
        this.state.o = {};
        this.state.a = [];
    }


    static getInitialProps = async (args) => {
        let { query: { q, page, gatewayId, type, deviceId}, asPath, req, initialState: {} } = args;

        let pageNumber = Number(page) || 1;
        let params = {
            pageNumber: pageNumber,
            limit: 20,
            offset: (pageNumber - 1) * 20,
        };

        let rp = await getLogs(params, req);
        rp = rp || {};
        rp.response = rp.response || {};
        console.info(rp);
        return {
            namespacesRequired: ['common'],
            asPath,
            useTemplate: true,
            loginRequire: true,
            logs: rp.response.results || [],
            totalRecords: rp.response.totalRows || 0,
            totalPages: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
            pageIndex: pageNumber,
            pageSize: Math.floor(((rp.response.totalRows || 0) + 19) / 20),
            gatewayId,
            type,
            page,
            deviceId,
        };
    }
    state = {
        ...this.props,
    };

    gatewayHolder() {
        let offset = this.state.offset;
        let limit = 5;
        let keyword = this.state.keyword;
        fetch("/api/m2m/dm/devices?&offset=" + offset + "&limit=" + limit + "&keyword=" + keyword, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                let isShowLoadMore = this.state.isShowLoadMore;
                response.results = response.results || [];
                response.results.map((it, index) => {
                    it.gatewayId = (it.smartDbNumber || '').toLowerCase() + '-' + (it.macAddress || '').replaceAll(':', '').toLowerCase()
                    this.state.gs.push(it);
                    this.state.node.items.push({
                        label: it.gatewayId,
                        type: 'gatewayId',
                        icon: 'fa fa-mobile',
                        status: (it.onlineStatus || '').toUpperCase() === 'ONLINE' ? 'Online' : 'Offline',
                        items: [
                            {
                                label: 'BPL Devices',
                                icon: 'fa fa-beer',
                                type: 'bpl',
                                ownGatewayId: it.gatewayId,
                                items: this.buildDevice(it)
                            },
                            {
                                label: 'Zwave Sensors',
                                icon: 'fas fa-broadcast-tower',
                                type: 'zwave',
                                ownGatewayId: it.gatewayId,
                                items: this.buildZwave(it)
                            },
                            {
                                label: 'Upload',
                                icon: 'fa fa-folder-open',
                                type: 'upload',
                                ownGatewayId: it.gatewayId,
                                items: [],
                            }
                        ]
                    })
                })
                if ((this.state.node.items.length != 0) && (this.state.node.items.length != response.totalRows)) {
                    isShowLoadMore = true;
                } else {
                    isShowLoadMore = false;
                }
                this.setState({isShowLoadMore: isShowLoadMore, offset: offset + limit});
            })
    }



    buildDevice = it => {
        it = it || {};
        it.bpls = it.bpls || [];
        let rs = [];
        it.bpls.map(item => {
            rs.push({
                label: item.deviceId || item.name,
                icon: 'fa fa-globe',
                type: 'bpl_item',
                items: []
            })
        })
        return rs;
    }

    buildZwave = it => {
        it = it || {};
        it.zwaves = it.zwaves || [];
        let rs = [];
        it.zwaves.map(item => {
            rs.push({
                label: item.deviceId ||item.name,
                icon: 'fa fa-globe',
                type: 'zwave_item',
                items: []
            })
        })
        return rs;
    }

    componentDidMount() {
    }

    componentWillUnmount = () => {
    }

    loadData() {

    }

    buildList = it => {
        return [];
    }

    sendCommand = async (cmd) => {

      if (!this.state.uid) {
        Swal.fire({
            html: `
                    <p style='text-align: center; font-size: 14px;'>UID is required!</p>
                 `,
            icon: 'error',
            confirmButtonText: 'OK',
          });

        return;
      }
      const result = await Swal.fire({
        html: `
                <p style='text-align: center; font-size: 14px;'>Are you sure?</p>
            `,
        icon: 'question',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      });
      if (!result || !result.isConfirmed) return;

      const rp = await sendCommand({uid: this.state.uid, cmd});
      if (rp.success) {
        Swal.fire({
            html: `
                    <p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>
                 `,
            icon: 'success',
            confirmButtonText: 'OK',
          });
      } else {
        Swal.fire({
            html: `
                    <p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>
                 `,
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
    }

    render() {

        return (
            <TotPage title={'Provisioning Portal'}>
                <style jsx>{styles}</style>
                <div style = {{marginBottom: '30px'}}>
                    <div style = {{ color: '#000',fontSize: '20px', padding: '20px', width: '100%', maxWidth: '600px'}}>
                        <input type="text" maxlength="100" className="form-control"
                            placeholder="UID"
                            value = {this.state.uid}
                            onChange = {(event) => {
                                this.setState({uid: event.target.value});
                            }}
                        />

                        <div className='btn-edit'
                            style = {{
                                width: 'unset', marginTop: '15px', fontSize: '18px',
                            }}
                            onClick={() => {
                                this.sendCommand('RLS')
                            }}
                        >
                            <span style={{}}>Send relay status</span>
                        </div>
                        <div className='btn-edit'
                            style = {{
                                width: 'unset', marginTop: '15px', fontSize: '18px',
                            }}
                            onClick={() => {

                                this.sendCommand('PW0')
                            }}
                        >
                            <span style={{}}>Turn off meter relay</span>
                        </div>
                        <div className='btn-edit'
                            style = {{
                                width: 'unset', marginTop: '15px', fontSize: '18px',
                            }}
                            onClick={() => {

                                this.sendCommand('PW1')
                            }}
                        >
                            <span style={{}}>Turn on meter relay</span>
                        </div>
                        <div className='btn-edit'
                            style = {{
                                width: 'unset', marginTop: '15px', fontSize: '18px',
                            }}
                            onClick={() => {

                                this.sendCommand('INF')
                            }}
                        >
                            <span style={{}}>Upgrade firmware</span>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </TotPage>
        );
    }
}

export default withNamespaces('common')(Homepage);
