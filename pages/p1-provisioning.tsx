import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import moment from 'moment';
import 'moment-timezone';
import { getP1Files } from '@app/api/log';
import { Pagination, ProgressLoading } from '@app/components/Common';
import { PageContent } from '@app/components/PageContent';
import ReactTooltip from 'react-tooltip';
import makeAnimated from 'react-select/animated';
import { getCookie } from "@app/utils/cookie";
import { tokenName } from "@app/utils/public-config";
import { deleteP1File, deleteUser } from "@app/api/user";

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
  :global(.upload-file-input-label) {
    width: 100px;
    height: 40px;
    border: 1px solid #00000020;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    margin: unset;
    transition: 0.15s;
    &:hover {
      color: #000000;
      background: #00000015;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: 0.15s;
    }
  }
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {

  state = {
    ...this.props,
    uploadFileList: [{uid: '', files: null}],
  };

  constructor(props) {
    super(props);
  }

  static getInitialProps = async (args) => {
    const {
      query: {
        q,
        page,
      },
      asPath, req, initialState: {},
    } = args;
    const pageNumber = Number(page) || 1;
    const params = {
      pageNumber,
      options: {
        type: 'P1_PROVISIONING',
      },
      limit: 10,
      offset: (pageNumber - 1) * 10,
    };

    let rp = await getP1Files(params, req);
    rp = rp || {};
    rp.response = rp.response || [];

    return {
      key: Date.now(),
      namespacesRequired: ['common'],
      useTemplate: true,
      loginRequire: true,
      p1Files: rp.response.results || [],
      totalRecords: rp.response.totalRows || 0,
      totalPages: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      pageIndex: pageNumber,
      pageSize: Math.floor(((rp.response.totalRows || 0) + 9) / 10),
      page,
      asPath,
      loading: false,
      params,
    };
  }

  validateFileName = async () => {

    if (!this.state.uploadFileList?.length) {
      return;
    }
    await this.setState({loading: true});
    this.state.uploadFileList[0].errorFileName = null;
    this.state.uploadFileList[0].existFileName = null;
    Array.from(this.state.uploadFileList[0].files).forEach(it => {
      if (!/^P1QA_\d{4}\d{2}\d{2}_\w+\.PDF$/.test(it.name.toUpperCase())) {
        it.errorFileName = "File name format must be P1QA_[YYYYMMDD]_[MCU SN].PDF (Eg: P1QA_20231010_SM00AMX00AAA00AA0000.PDF)";
        this.state.uploadFileList[0].errorFileName = "Wrong format"
      }
    })

    let arr = Array.from(this.state.uploadFileList[0].files);
    for (let i = 0; i < arr.length; i++) {
      let it = arr[i];
      if (!!/^P1QA_\d{4}\d{2}\d{2}_\w+\.PDF$/.test(it.name.toUpperCase())) {
        const params = {
          options: {
            type: 'P1_PROVISIONING',
            originalName: it.name,
          },
          limit: 1,
          offset: 0,
        };

        let rp = await getP1Files(params);
        rp = rp || {};
        rp.response = rp.response || {};
        console.info('rp.response', rp.response)
        it.existFileName = !!rp.response.results?.length;
        if (it.existFileName) {
          this.state.uploadFileList[0].existFileName = true;
        }
      }
    }
    console.info('done validateFileName', this.state.uploadFileList[0]);
    this.setState({loading: false});
  }

  componentDidMount() {
  }

  render() {
    console.info('this.state.uploadFileList', this.state.uploadFileList);
    console.log("userInfo", this.props?.userInfo)
    return (
      <TotPage title={'P1 Provisioning MCU online Check'}>
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
                  <h5 className="site-title">{'P1 Provisioning MCU QA Detail Report'}</h5>
                </div>
                <div
                  style={{
                    padding: '30px',
                    overflow: "auto",
                    pointerEvents: !!this.state.uploadFileError?.show ? 'none' : null,
                    maxHeight: '300px',
                    paddingBottom: '0'
                  }}
                >
                  {this.state.uploadFileList.map((item, index) => {
                    return (
                      <div
                        key={`${index}_${item.uid}`}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          marginTop: '15px',
                          marginBottom: '15px'
                        }}
                        className="box-item"
                      >
                        <div style={{ display: 'flex' }}>
                          {/*<div
                            style={{
                              display: 'flex',
                              paddingLeft: 'unset',
                              flexDirection: 'column'
                            }}
                            className="item"
                          >
                            <input
                              autoFocus={true}
                              style={{
                                border: '1px solid #00000020',
                                borderRadius: '5px',
                                outline: 'unset',
                                height: '40px',
                                width: '24%',
                                paddingLeft: '10px',
                                alignSelf: 'center',
                              }}
                              defaultValue={item.uid}
                              placeholder="UUID"
                              onChange={async (event) => {
                                const temp = event.target.value;
                                const tmp = this.state.uploadFileList;
                                tmp[index] = {
                                  uid: temp,
                                  files: item.files
                                }
                                await this.setState({
                                  uploadFileList: tmp
                                })
                              }}
                            />
                          </div>*/}
                          <div
                            style={{
                              display: 'flex',
                              //marginLeft: '10px',
                              flexDirection: 'column',
                              width: '100%'
                            }}
                            className="item"
                          >
                            <div
                              style={{
                                display: 'flex',
                                //marginLeft: '10px',
                                width: '100%',
                                alignItems: 'center',
                                height: '40px',
                              }}
                            >
                              <div style={{marginRight: '10px', width: '72px'}}>Select file: </div>
                              <div
                                style={{ position: 'relative', paddingRight: '20px' }}
                              >
                                <label
                                  htmlFor={`upload-p1-files-${index}`}
                                  title="Click to choose file(s)"
                                  className="upload-file-input-label"
                                >
                                  Choose files
                                </label>
                                <input
                                  id={`upload-p1-files-${index}`}
                                  accept='application/pdf'
                                  type="file"
                                  multiple={true}
                                  placeholder={'File upload'}
                                  style={{width: 'max-content', display: 'none'}}
                                  onChange={async (event) => {
                                    const tmp = this.state.uploadFileList;
                                    tmp[index] = {
                                      uid: item.uid || "",
                                      files: Array.from(event.target.files)
                                    }
                                    await this.setState({
                                      uploadFileList: tmp
                                    })
                                    await this.validateFileName();
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: "column",
                                  maxHeight: '90px',
                                  overflow: 'auto',
                                  width: '80%',
                                  padding: '10px',
                                  border: item?.files?.length ? '1px solid #00000020' : '',
                                  borderRadius: '5px'
                                }}
                              >
                                {(item?.files?.length ? Array.from(item?.files) : []).map((it, idx) => (
                                  <div style={{marginBottom: '10px', display: 'flex', flexDirection: 'column'}} key={idx}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                      <span style={{flex: 1}}>{it.name || ""}</span>
                                      <i className='fa fa-remove' style={{color: 'red', cursor: 'pointer'}}
                                        onClick={() => {
                                          window.itemFile = item.files;
                                          console.info('item.files', item.files)
                                          item.files.splice(idx, 1);
                                          this.setState({uploadFileList: [].concat(this.state.uploadFileList)})
                                        }}
                                      />
                                    </div>
                                    {it.errorFileName && (
                                      <small
                                        className="help-block"
                                        style={{
                                          color: '#eb0000',
                                          fontSize: '12px',
                                          fontWeight: 400,
                                        }}
                                      >
                                        {it.errorFileName}
                                      </small>
                                    )}
                                    {it.existFileName && (
                                      <small
                                        className="help-block"
                                        style={{
                                          color: 'green',
                                          fontSize: '12px',
                                          fontWeight: 400,
                                        }}
                                      >
                                        {'Name already exists!'}
                                      </small>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            {item.errorFileRequired && (
                              <small
                                className="help-block"
                                style={{
                                  color: '#eb0000',
                                  fontSize: '12px',
                                  fontWeight: 400,
                                  marginTop: '5px',
                                  marginLeft: '10px'
                                }}
                              >
                                {item.errorFileRequired}
                              </small>
                            )}
                          </div>
                          {/*<ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>*/}
                          {/*<div*/}
                          {/*  data-tip="Click to remove this file"*/}
                          {/*  className="button-btn w-120"*/}
                          {/*  onClick={() => {*/}
                          {/*    if (this.state.uploadFileList.length > 1) {*/}
                          {/*      const tmp = this.state.uploadFileList;*/}
                          {/*      tmp.splice(index, 1);*/}
                          {/*      this.setState({uploadFileList: tmp})*/}
                          {/*    } else {*/}
                          {/*      this.setState({*/}
                          {/*        uploadFileList: [{uid: '', files: null}]*/}
                          {/*      })*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*>*/}
                          {/*  {'REMOVE'}*/}
                          {/*</div>*/}
                        </div>
                      </div>
                    )})}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    width: '100%',
                    borderBottom: '1px solid #ddd',
                    paddingLeft: '30px',
                    paddingBottom: '30px',
                    marginTop: '10px',
                    pointerEvents: !!this.state.uploadFileError?.show ? 'none' : null,
                  }}
                >
                  {/*<ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>*/}
                  {/*<div*/}
                  {/*  data-tip="Click to add more files"*/}
                  {/*  className="button-btn w-120"*/}
                  {/*  onClick={() => {*/}
                  {/*    this.setState({*/}
                  {/*      uploadFileList: [...this.state.uploadFileList, {uid: '', files: null}]*/}
                  {/*    })*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  {'ADD MORE'}*/}
                  {/*</div>*/}
                  {/*<ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>*/}
                  {/*<div*/}
                  {/*  data-tip="Click to clear all added files"*/}
                  {/*  className="button-btn w-120 ml-10"*/}
                  {/*  onClick={() => {*/}
                  {/*    this.setState({*/}
                  {/*      uploadFileList: [{uid: '', files: null}]*/}
                  {/*    })*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  {'CLEAR ALL'}*/}
                  {/*</div>*/}
                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                  <div
                    data-tip="Click to upload selected files"
                    className="button-btn w-120"
                    onClick={async () => {
                      this.setState({loading: true});
                      console.info('save this.state.uploadFileList', this.state.uploadFileList)
                      if (!this.state.uploadFileList[0].files?.length) {
                        this.state.uploadFileList[0].errorFileRequired = "File is required!"
                      } else {
                        await this.validateFileName();
                      }
                      if (this.state.uploadFileList.filter((item) => !!item.errorFileName || !!item.errorFileRequired).length > 0) {
                        this.setState({
                          uploadFileList: this.state.uploadFileList,
                          loading: false
                        });
                        Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>${'Please check selected file(s) for error!'}</p>`,
                          icon: 'error',
                          confirmButtonText: 'OK',
                        });
                        return;
                      }

                      if (this.state.uploadFileList.filter((item) => !!item.existFileName).length > 0) {
                        let result = await Swal.fire({
                          html: `
                            <p style='text-align: center; font-size: 14px;'>
                                Confirm replacement of existing file names?
                            </p>
                            `,
                          icon: 'question',
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          showCancelButton: true,
                        })
                        if (!result || !result.isConfirmed) {
                          return;
                        }
                      }
                      const formData = new FormData();
                      this.state.uploadFileList.forEach((item) => {
                        Array.from(item.files).forEach(it => {
                          formData.append("files", it);
                          formData.append("type", "P1_PROVISIONING");
                          formData.append("desc", "P1_PROVISIONING");
                          formData.append("replaceByOriginalName", !!it.existFileName ? "true" : '');
                        })
                      })

                      const url = `/api/p1-files-upload`;
                      const method = 'POST';
                      await this.setState({loading: true})
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
                      await this.setState({loading: false})
                      if (rp?.success) {
                        this.setState({loading: false});
                        await Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                          icon: 'success',
                          confirmButtonText: 'OK',
                        });
                        require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                      } else {
                        // this.setState({
                        //   loading: false,
                        //   uploadFileError: {
                        //     show: true,
                        //     data: rp.response
                        //   }
                        // })
                        this.setState({loading: false});
                        Swal.fire({
                          html: `<p style='text-align: center; font-size: 14px;'>${rp?.errorDescription || rp?.message}</p>`,
                          icon: 'error',
                          confirmButtonText: 'OK',
                        });
                      }
                    }}
                  >
                    <span>{'UPLOAD'}</span>
                  </div>
                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                  <div
                    data-tip="Click to refresh page"
                    className="button-btn w-120 ml-10"
                    onClick={() => {
                      require('@app/utils/next-routes').Router.pushRoute(this.props.asPath);
                    }}
                  >
                    {'REFRESH'}
                  </div>
                </div>
                <div
                  style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff' }}
                  className="doctor-list"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', width: '100%' }}>
                    <table className="table">
                      <thead className="thead-dark">
                      <tr>
                        <th className="table-th" scope="col">MCU SN</th>
                        <th className="table-th" scope="col">FILE NAME</th>
                        <th className="table-th" scope="col">UPLOADED BY</th>
                        <th className="table-th" scope="col">UPLOADED DATE TIME</th>
                        {this.props?.userInfo?.authorities.filter(auth => auth.authority === "SUPER_ADMIN" || auth.authority === "SUB_ADMIN").length && (
                          <th className="table-th" scope="col">ACTION</th>
                        )}
                      </tr>
                      </thead>
                      <tbody>
                      {(this.state.p1Files || [])
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
                                <span>{it.originalName.replace(/^P1QA_\d{4}\d{2}\d{2}_(\w+)\.((PDF)|(pdf))$/, '$1')}</span>
                              </td>
                              <td className="table-td">
                                <a href={'/api/file/' + it.uid + '/' + it.id} target='_blank'>{it.originalName}</a>
                              </td>
                              <td className="table-td">
                                <span>{it.uploadedBy}</span>
                              </td>
                              <td className="table-td">
                                <span>{!!it.createdDate ? moment(it.createdDate).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                              </td>
                              {this.props?.userInfo?.authorities.filter(auth => auth.authority === "SUPER_ADMIN" || auth.authority === "SUB_ADMIN").length && (
                                <td className="table-td" scope="col">
                                  <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                                  <div
                                    className="button-icon ml-5"
                                    data-tip="Click to delete this file"
                                    onClick={async () => {
                                      let result = await Swal.fire({
                                        html: `<p style='text-align: center; font-size: 14px;'>Are you sure?</p>`,
                                        icon: 'question',
                                        confirmButtonText: 'OK',
                                        cancelButtonText: 'Cancel',
                                        showCancelButton: true,
                                      });
                                      if (result && result.isConfirmed) {
                                        let rp = await deleteP1File({ altName: it.altName });
                                        if (rp.success) {
                                          await Swal.fire({
                                            html: `<p style='text-align: center; font-size: 14px;'>${'Successfully!'}</p>`,
                                            icon: 'success',
                                            confirmButtonText: 'OK',
                                          });
                                          window.location.href = window.location.href;
                                        } else {
                                          Swal.fire({
                                            html: `<p style='text-align: center; font-size: 14px;'>${rp.errorDescription || rp.message}</p>`,
                                            icon: 'error',
                                            confirmButtonText: 'OK',
                                          });
                                        }
                                      }
                                    }}
                                  >
                                    <span><i className="fa fa-trash-o"/></span>
                                  </div>
                                </td>
                              )}
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
                  {!!this.state.uploadFileError?.show && (
                    <div
                      style={{
                        backgroundColor: '#fff',
                        position: 'fixed',
                        top: '20%',
                        left: '30%',
                        zIndex: 10,
                        width: '50%',
                        height: '60%',
                        borderRadius: '5px',
                        padding: '30px 30px 15px 30px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.45)',
                        color: '#000000',
                        justifyContent: 'space-between',
                        pointerEvents: 'all'
                      }}
                    >
                      <div style={{ fontWeight: 500, fontSize: '18px' }}>
                        {'Error on upload file(s). Please check the list below.'}
                      </div>
                      <div style={{maxHeight: '350px', overflow: 'auto', height: '100%'}}>
                        <table className="table">
                          <thead className="thead-dark">
                          <tr>
                            <th className="table-th" scope="col">MCU UUID</th>
                            <th className="table-th" scope="col">FILE NAME</th>
                            <th className="table-th" scope="col">ERROR</th>
                          </tr>
                          </thead>
                          <tbody>
                          {(this.state.uploadFileError?.data || [])
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
                                    <span>{it.uid}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.fileName}</span>
                                  </td>
                                  <td className="table-td">
                                    <span>{it.error}</span>
                                  </td>
                                </tr>
                              );
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
                          this.setState({ uploadFileError: null });
                        }}
                      >
                        {'Close'}
                      </button>
                    </div>
                  )}
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
