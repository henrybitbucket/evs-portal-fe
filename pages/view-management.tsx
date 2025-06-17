import React from 'react';
import css from 'styled-jsx/css';
import { withNamespaces } from '@app/i18nnext';

import { PageContent } from '@app/components/PageContent';
import { TotPage } from '@app/components/TotPage';
import { IBasicPageProps } from '@app/components/Types';
import { ProgressLoading } from '@app/components/Common';
import 'moment-timezone';
import makeAnimated from 'react-select/animated';
import { getMenuItems, updateMenuItem } from "@app/api/user";
import { getCookie } from "@app/utils/cookie";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import { getGroupUsers, getPermission, getRoles } from "@app/api/log";
import ReactTooltip from "react-tooltip";

const animatedComponents = makeAnimated();
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
    display: flex;
  }
  :global(.p-card) {
    flex: 1;
    padding-bottom: 5px;
  }
  :global(.page-content) {
    padding: 0px;
    padding: 0px;
    height: 101%;
    background: #f3f3f4;
  }
  .dashboard {
    flex: 1;
    max-height: calc(100% - 5px);
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

  :global(.pi-status) {
      width: 100px;
      color: #fff;
      background: green;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      padding: 2.5px;
  }
  :global(.pi-action-td) {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      padding-right: 50px !important;
      font-size: 20px;
  }
  :global(.table-td) {
    padding: 10px !important;
    padding-left: 30px !important;
    vertical-align: middle !important;
  }
  :global(.tree-view-node) {
    font-size: 16px;
    color: #000000;
    padding: 5px !important;
    border-radius: 4px !important;
    &:hover {
      background-color: #f0f8ff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: 0.2s;
    }
  }
  :global(.edit-button) {
    padding: 5px;
    border-radius: 4px;
    &:hover {
      background-color: #03114e;
      color: #fffe00;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: 0.2s;
    }
  }
  :global(.table-th-50) {
    width: 50px !important;
  }
  :global(.menu-dropdown-child) {
    border: 1px solid #dedede;
    border-radius: 4px;
    width: max-content;
    color: #000000;
    cursor: pointer;
    outline: none !important;
    &:hover {
      background: #b9dcfa;
    }
  }
  :global(.menu-dropdown-parent) {
    border: 1px solid #dedede;
    border-radius: 4px;
    width: max-content;
    color: #000000;
    cursor: pointer;
    outline: none !important;
    &:hover {
      background: #b9dcfa;
    }
  }
  :global(.menu-dropdown-toggle) {
    outline: none !important;
    border: 1px solid #dedede;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
    height: 38px;
    &:hover {
      background: #b9dcfa;
    }
  }
  :global(.menu-dropdown-list) {
    position: absolute;
    top: 65px;
    border: 1px solid #dedede;
    width: 100%;
    height: 200px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    background: #ffffff;
    overflow: auto;
    z-index: 1
  }
  :global(.menu-dropdown-item) {
    margin-left: 12px;
    padding: unset;
    margin-bottom: 7px;
    &:hover {
      background: #ffffff
    }
  }
`;

interface IDashboardPageState {

}

class Homepage extends React.Component<IBasicPageProps, IDashboardPageState> {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      logFontWeight: '500',
      fileFontWeight: '300',
      selected: null,
      open: false,
      menuItems: [],
    };

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  select(option) {
    this.setState({
      selected: option,
      open: false,
    });
  }

  static getInitialProps = async (args) => {
    const { query: { q, page }, asPath, req, initialState: {} } = args;

    return {
      namespacesRequired: ['common'],
      asPath,
      key: Date.now(),
      useTemplate: true,
      loginRequire: true,
    };
  }

  async componentDidMount() {
    await this.initData();
  }

  async initData() {
    this.setState({loading: true});
    const appCode = await getCookie('app_code');
    const resMenuItems = await getMenuItems();
    let mmsMenuItems = [];
    let dmsMenuItems = [];
    let menuItems = [];

    resMenuItems?.response?.map(item => {
      if (item.appCode === "MMS") {
        mmsMenuItems = JSON.parse(item?.items);
      } else if (item.appCode === "DMS") {
        dmsMenuItems = JSON.parse(item?.items);
      }
    })

    if (appCode === 'MMS') {
      menuItems = mmsMenuItems
    } else if (appCode === 'DMS') {
      menuItems = dmsMenuItems
    }
    menuItems.sort((o1, o2) => Number(o1.order) - Number(o2.order));
    menuItems.forEach(m => (m.children || []).sort((o1, o2) => Number(o1.order) - Number(o2.order)));

    const treeData = flattenTree({
      name: "",
      children: menuItems,
    });

    const rpPermissions = await getPermission({limit: 10000, offset: 0});
    const rpRoles = await getRoles({limit: 10000, offset: 0});
    const rpGroups = await getGroupUsers({limit: 10000, offset: 0});

    this.setState({
      treeData,
      appCode,
      menuItems,
      roles: rpRoles?.response.results || [],
      permissions: rpPermissions?.response.results || [],
      groups: rpGroups?.response.results || [],
      loading: false,
      isFirstItem: false,
    })
  }

  handleEditNode(element) {
    this.setState({loading: true});
    (this.state.menuItems || []).forEach(item => {
      if (item.id === element.id) {
        this.setState({editedElement: item, editedMenu: item.name});
        return;
      }
      if (item.children?.length) {
        item.children.forEach(child => {
          if (child.id === element.id) {
            this.setState({editedElement: child, editedMenu: child.name});
            return;
          }
        })
      }
    })
    this.setState({loading: false})
  }

  async handleDeleteNode(element) {
    this.setState({loading: true});
    let newItems = null;

    if (!!element?.parent) {
      let tempMenuItems = this.state.menuItems;
      const parent = tempMenuItems.filter(item => item.id === element.parent);

      if (!parent?.length) {
          Swal.fire(
            'Error!',
            "Something went wrong. Please reload page and try again!",
            'error'
          )
        return;
      }

      const indexParent = tempMenuItems.indexOf(parent[0]);

      tempMenuItems[indexParent] = {
        ...parent[0],
        children: parent[0].children.filter(child => child.id !== element.id)
      };
      newItems = tempMenuItems;
    } else {
      newItems = this.state.menuItems.filter(item => item.id !== element.id);
    }

    const res = await updateMenuItem({appCode: this.state.appCode, data: newItems});
    if (res.success == true) {
      Swal.fire(
        'Information!',
        'Menu has been updated successfully!',
        'success',
      )
        .then(() => {
          window.location.reload();
        })
    } else {
      Swal.fire(
        'Error!',
        res.message || res.errorDescription || '',
        'error'
      )
    }

    this.setState({loading: false})
  }

  render() {
    const { t } = this.props;
    const { selected } = this.state;
    const listItems = this.state.menuItems.map((item) => {
      const hasChildren = item.children && item.children.length > 0;

      const listItem = (
        <li key={item.id} className="menu-dropdown-item">
          <button
            type="button"
            onClick={() => this.select(item)}
            className={hasChildren ? 'menu-dropdown-parent' : 'menu-dropdown-child'}
          >
            {item.name}
          </button>
        </li>
      );

      if (hasChildren) {
        const subListItems = item.children.map((subItem) => (
          <li key={subItem.id} className="menu-dropdown-item">
            <button
              type="button"
              onClick={() => this.select(subItem)}
              className="menu-dropdown-child"
            >
              {subItem.name}
            </button>
          </li>
        ));

        return (
          <React.Fragment key={item.id}>
            {listItem}
            <ul className="menu-dropdown-sublist">{subListItems}</ul>
          </React.Fragment>
        );
      }
      return listItem;
    });

    return (
      <TotPage title={'View Management'}>
        <div className="dashboard">
          <style jsx>{styles}</style>
          <PageContent>
            <div
              style={{
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                flex: 1,
                minHeight: '100%',
                pointerEvents: this.state.showAddMenu ? 'none' : 'all'
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
                <h5 className="site-title">{'View Management'}</h5>
              </div>
              <div style={{
                display: 'flex',
                padding: '30px',
                borderBottom: '1px solid #ddd',
                paddingTop: '20px',
                paddingBottom: '20px'
              }}>
                <div
                  className="w-200 button-btn"
                  onClick={() => this.setState({
                    showAddMenu: true
                  })}
                >
                  <span>{'ADD NEW MENU ITEM'}</span>
                </div>
              </div>
              <div
                style={{ display: 'flex', flex: 1, flexDirection: 'row', background: '#fff', minHeight: '300px' }}
                className="doctor-list"
              >
                <div className="checkbox" style={{width: '450px'}}>
                  <TreeView
                    data={this.state.treeData || flattenTree({name: "", children: []})}
                    multiSelect
                    propagateSelect
                    propagateSelectUpwards
                    togglableSelect
                    nodeRenderer={(
                      {
                        element,
                        isBranch,
                        isExpanded,
                        getNodeProps,
                        level,
                        handleExpand,
                      }
                    ) => {
                      return (
                        <div className="tree-view-node" style={{ cursor: "pointer", display: 'flex', alignItems: 'center' }}>
                          <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                          <div
                            {...getNodeProps({ onClick: handleExpand })}
                            style={{ marginLeft: 40 * (level - 1), cursor: "pointer", display: 'flex', alignItems: 'center' }}
                          >
                            {isBranch && <ArrowIcon isOpen={isExpanded} className="arrow-icon"/>}
                            <div className="name">
                              {element.name}
                            </div>
                          </div>
                          <i
                            data-tip="Click to edit this menu"
                            className="fa fa-edit edit-button"
                            style={{marginLeft: '20px'}}
                            onClick={() => {
                              this.handleEditNode(element);
                            }}
                          />
                          <i
                            data-tip="Click to delete this menu"
                            className="fa fa-trash-o edit-button"
                            style={{marginLeft: '5px', color: 'red'}}
                            onClick={async () => {
                              const result = await Swal.fire({
                                html: "<p style='text-align: center; font-size: 14px;'>Are you sure you want to delete this menu?</p>",
                                icon: 'question',
                                confirmButtonText: 'OK',
                                cancelButtonText: 'Cancel',
                                showCancelButton: true,
                              });
                              if (!result || !result.isConfirmed) return;
                              this.handleDeleteNode(element);
                            }}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                <div style={{display: 'flex', flex: 1, borderLeft: '1px solid #282828', padding: '30px'}}>
                  {!!this.state.editedElement && (
                    <div style={{
                      color: "#000000",
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      width: '100%'
                    }}>
                      <div style={{fontWeight: 400, fontSize: '18px'}}>{`Edit menu '${this.state.editedMenu}'`}</div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                            <div style={{width: '120px'}}>{'Menu item id: '}</div>
                            <input
                              disabled={true}
                              style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                              value={this.state.editedElement.id || ""}
                            />
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                            <div style={{width: '120px'}}>{'Menu item name: '}</div>
                            <input
                              style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                              value={this.state.editedElement.name || ""}
                              onChange={(event) => {
                                if (!event.target.value) {
                                  this.setState({menuItemNameError: "Menu item name is required!"});
                                } else {
                                  this.setState({ menuItemNameError: undefined });
                                }
                                this.setState({
                                  editedElement: {
                                    ...this.state.editedElement,
                                    name: event.target.value
                                  }
                                });
                              }}
                            />
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                            <div style={{width: '120px'}}>{'Menu item path: '}</div>
                            <input
                              style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                              value={this.state.editedElement.path || ""}
                              onChange={(event) => {
                                this.setState({
                                  editedElement: {
                                    ...this.state.editedElement,
                                    path: event.target.value
                                  }
                                });
                              }}
                            />
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative'
                          }}>
                            <div style={{width: '120px'}}>{'Menu item icon: '}</div>
                            <input
                              style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                              value={this.state.editedElement.className || ""}
                              onChange={(event) => {
                                this.setState({
                                  editedElement: {
                                    ...this.state.editedElement,
                                    className: event.target.value
                                  }
                                });
                              }}
                            />
                            <i className={`fa ${this.state.editedElement.className || ""}`} style={{position: "absolute", right: '10px'}}/>
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative'
                          }}>
                            <div style={{width: '120px'}}>{'Order: '}</div>
                            <input
                              style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                              type="number"
                              value={this.state.editedElement.order}
                              onChange={(event) => {
                                this.setState({
                                  editedElement: {
                                    ...this.state.editedElement,
                                    order: event.target.value
                                  }
                                });
                              }}
                            />
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative'
                          }}>
                            <div style={{width: '120px'}}>{'Permit all: '}</div>
                            <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                            <input
                              data-tip="Check to allow all permissions to access the page"
                              style={{cursor: 'pointer', }}
                              type="checkbox"
                              checked={!!this.state.editedElement.permitAll}
                              onChange={(event) => {
                                this.setState({
                                  editedElement: {
                                    ...this.state.editedElement,
                                    permitAll: event.target.checked
                                  }
                                });
                              }}
                            />
                          </div>
                        </div>
                        {this.state.menuItemNameError && (
                          <small
                            className="help-block"
                            style={{
                              color: '#eb0000',
                              fontSize: '12px',
                              fontWeight: 400,
                              marginLeft: '120px'
                            }}
                          >
                            {this.state.menuItemNameError}
                          </small>
                        )}
                      </div>
                      <div style={{height: '400px'}}>
                        <label
                          htmlFor="telephone"
                          className="control-label visible-lg-block"
                          style={{
                            fontSize: '15px',
                            textAlign: 'left',
                            fontWeight: 500,
                            color: '#222222',
                            marginTop: '20px'
                          }}
                        >
                          Permission list :
                          <span
                            style={{
                              marginLeft: '3px',
                              marginTop: '2px',
                              color: 'red',
                            }}
                          />
                        </label>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%%',
                          maxHeight: '330px',
                          overflow: 'auto',
                        }}>
                          <table className="table">
                            <thead className="thead-dark">
                            <tr>
                              <th className="table-th table-th-50" scope="col" style={{width: '50px !important'}}/>
                              <th className="table-th table-th-50" scope="col" style={{ textAlign: 'center', width: '100px !important' }}>
                                ID
                              </th>
                              <th className="table-th" scope="col" style={{ textAlign: 'center' }}>
                                NAME
                              </th>
                              <th className="table-th" scope="col" style={{ textAlign: 'center' }}>
                                DESCRIPTION
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.state.permissions || []).map((it, index) => {
                              return (
                                <tr
                                  key={index}
                                  style={{
                                    backgroundColor: '#fff',
                                    color: '#000000',
                                  }}
                                >
                                  <td
                                    className="table-td"
                                    style={{
                                      cursor: !!it.id ? 'pointer' : 'unset',
                                    }}
                                    onClick={async () => {
                                      if (!it.id) {
                                        return;
                                      }
                                      const selectedPermissions = this.state.editedElement?.permissions || [];
                                      const tmp = selectedPermissions.filter(o => o == it.name)[0];
                                      const idx = selectedPermissions.indexOf(tmp);
                                      if (idx === -1) {
                                        selectedPermissions.push(it.name);
                                      } else {
                                        selectedPermissions.splice(idx, 1);
                                      }
                                      this.setState({
                                        editedElement: {
                                          ...this.state.editedElement,
                                          permissions: selectedPermissions
                                        }
                                      })
                                    }}
                                  >
                                    {!!it.id && (
                                      <input
                                        style={{ marginTop: '4px', cursor: !!it.id ? 'pointer' : 'unset', }}
                                        type="checkbox"
                                        checked={this.state.editedElement?.permissions.includes(it.name)}
                                      />
                                    )}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.id)}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.name)}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.description)}
                                  </td>
                                </tr>
                              )})}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div style={{height: '400px'}}>
                        <label
                          htmlFor="telephone"
                          className="control-label visible-lg-block"
                          style={{
                            fontSize: '15px',
                            textAlign: 'left',
                            fontWeight: 500,
                            color: '#222222',
                            marginTop: '20px'
                          }}
                        >
                          Role list :
                          <span
                            style={{
                              marginLeft: '3px',
                              marginTop: '2px',
                              color: 'red',
                            }}
                          />
                        </label>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%%',
                          maxHeight: '330px',
                          overflow: 'auto',
                        }}>
                          <table className="table">
                            <thead className="thead-dark">
                            <tr>
                              <th className="table-th table-th-50" scope="col" style={{width: '50px !important'}}/>
                              <th className="table-th table-th-50" scope="col" style={{ textAlign: 'center', width: '100px !important' }}>
                                ID
                              </th>
                              <th className="table-th" scope="col" style={{ textAlign: 'center' }}>
                                NAME
                              </th>
                              <th className="table-th" scope="col" style={{ textAlign: 'center' }}>
                                DESCRIPTION
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.state.roles || []).map((it, index) => {
                              return (
                                <tr
                                  key={index}
                                  style={{
                                    backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                                    color: '#000000',
                                  }}
                                >
                                  <td
                                    className="table-td"
                                    style={{
                                      cursor: !!it.id ? 'pointer' : 'unset',
                                    }}
                                    onClick={async () => {
                                      if (!it.id) {
                                        return;
                                      }
                                      const selectedRoles = this.state.editedElement?.roles || [];
                                      const tmp = selectedRoles.filter(o => o == it.name)[0];
                                      const idx = selectedRoles.indexOf(tmp);
                                      if (idx === -1) {
                                        selectedRoles.push(it.name);
                                      } else {
                                        selectedRoles.splice(idx, 1);
                                      }
                                      this.setState({
                                        editedElement: {
                                          ...this.state.editedElement,
                                          roles: selectedRoles
                                        }
                                      })
                                    }}
                                  >
                                    {!!it.id && (
                                      <input
                                        style={{ marginTop: '4px', cursor: !!it.id ? 'pointer' : 'unset', }}
                                        type="checkbox"
                                        checked={this.state.editedElement?.roles.includes(it.name)}
                                      />
                                    )}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.id)}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.name)}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.description)}
                                  </td>
                                </tr>
                              )})}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div style={{height: '400px'}}>
                        <label
                          htmlFor="telephone"
                          className="control-label visible-lg-block"
                          style={{
                            fontSize: '15px',
                            textAlign: 'left',
                            fontWeight: 500,
                            color: '#222222',
                            marginTop: '20px'
                          }}
                        >
                          Group list :
                          <span
                            style={{
                              marginLeft: '3px',
                              marginTop: '2px',
                              color: 'red',
                            }}
                          />
                        </label>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%%',
                          maxHeight: '330px',
                          overflow: 'auto',
                        }}>
                          <table className="table">
                            <thead className="thead-dark">
                            <tr>
                              <th className="table-th table-th-50" scope="col" style={{width: '50px !important'}}/>
                              <th className="table-th table-th-50" scope="col" style={{ textAlign: 'center', width: '100px !important' }}>
                                ID
                              </th>
                              <th className="table-th" scope="col" style={{ textAlign: 'center' }}>
                                NAME
                              </th>
                              <th className="table-th" scope="col" style={{ textAlign: 'center' }}>
                                DESCRIPTION
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.state.groups || []).map((it, index) => {
                              return (
                                <tr
                                  key={index}
                                  style={{
                                    backgroundColor: this.state?.selectedLog === index ? '#d8d8d8' : '#fff',
                                    color: '#000000',
                                  }}
                                >
                                  <td
                                    className="table-td"
                                    style={{
                                      cursor: !!it.id ? 'pointer' : 'unset',
                                    }}
                                    onClick={async () => {
                                      if (!it.id) {
                                        return;
                                      }
                                      const selectedGroups = this.state.editedElement?.groups || [];
                                      const tmp = selectedGroups.filter(o => o == it.name)[0];
                                      const idx = selectedGroups.indexOf(tmp);
                                      if (idx === -1) {
                                        selectedGroups.push(it.name);
                                      } else {
                                        selectedGroups.splice(idx, 1);
                                      }
                                      this.setState({
                                        editedElement: {
                                          ...this.state.editedElement,
                                          groups: selectedGroups
                                        }
                                      })
                                    }}
                                  >
                                    {!!it.id && (
                                      <input
                                        style={{ marginTop: '4px', cursor: !!it.id ? 'pointer' : 'unset', }}
                                        type="checkbox"
                                        checked={this.state.editedElement?.groups.includes(it.name)}
                                      />
                                    )}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.id)}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.name)}
                                  </td>
                                  <td className="table-td" style={{ textAlign: 'center', }}>
                                    {(it.description)}
                                  </td>
                                </tr>
                              )})}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <div
                          className='button-btn mr-15'
                          onClick={async () => {
                            this.setState({loading: true});
                            let menu = this.state.menuItems || [];
                            for (let i = 0; i < menu.length; i++) {
                              if (menu[i].id === this.state.editedElement?.id) {
                                menu[i] = this.state.editedElement;
                                break;
                              }
                              if (menu[i].children?.length) {
                                const subMenu = menu[i].children;
                                for (let i = 0; i < subMenu.length; i++) {
                                  if (subMenu[i].id === this.state.editedElement?.id) {
                                    subMenu[i] = this.state.editedElement;
                                    break;
                                  }
                                }
                              }
                            }
                            const res = await updateMenuItem({appCode: this.state.appCode, data: menu});
                            if (res.success == true) {
                              Swal.fire(
                                'Information!',
                                'Menu has been save successfully!',
                                'success',
                              )
                                .then(() => {
                                  window.location.reload();
                                })
                            } else {
                              Swal.fire(
                                'Error!',
                                res.message || res.errorDescription || '',
                                'error'
                              )
                            }
                            this.setState({editedElement: undefined, loading: false})
                          }}
                        >
                          <span>{'Update'}</span>
                        </div>
                        <div
                          className='button-btn'
                          onClick={() => {
                            this.setState({editedElement: undefined})
                          }}
                        >
                          <span>{'Close'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {this.state.showAddMenu && (
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
                  <div style={{fontWeight: 400, fontSize: '18px'}}>{'Add new menu item'}</div>
                  <div className="menu-dropdown" style={{height: '100%', overflow: "auto", marginTop: '10px', display: "flex", flexDirection: 'column', gap: '10px', marginBottom: '10px'}}>
                    <ReactTooltip globalEventOff="click" place="bottom" type="info" effect="solid"/>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#000',
                      }}
                    >
                      <div>
                        {'Is new menu first item?'}
                      </div>
                      <i
                        data-tip="If this button is enabled, it means new menu will be put on the top of menu list"
                        style={{
                          cursor: 'pointer',
                          fontSize: '30px',
                          marginLeft: '10px',
                          color: this.state.isFirstItem ? 'green' : '',
                        }}
                        className={`${this.state.isFirstItem ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}`}
                        onClick={() => {
                          this.setState({isFirstItem: !this.state.isFirstItem})
                        }}
                      />
                    </div>
                    {!this.state.isFirstItem && (
                      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        <div>{'New menu will be next to (New menu will be placed at bottom of menu list if this field is not selected): '}</div>
                        <button
                          type="button"
                          className="menu-dropdown-toggle"
                          onClick={this.toggle}
                          aria-haspopup="true"
                          aria-expanded={this.state.open}
                        >
                          {selected ? selected.name : 'Select menu ...'}
                        </button>
                        {this.state.open && <ul className="menu-dropdown-list">{listItems}</ul>}
                      </div>
                    )}
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
                        <div style={{width: '120px'}}>{'New menu id: '}</div>
                        <input
                          style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                          value={this.state.newMenuId || ""}
                          onChange={(event) => {
                            if (!event.target.value) {
                              this.setState({newMenuIdError: "New menu id is required!"});
                            } else {
                              if (this.state.menuItems?.filter(item => item.id === event.target.value)?.length) {
                                this.setState({newMenuIdError: "New menu id is exists!"});
                              } else {
                                this.setState({newMenuIdError: undefined});
                              }
                            }
                            this.setState({newMenuId: event.target.value})
                          }}
                        />
                      </div>
                      {this.state.newMenuIdError && (
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: 400,
                            marginLeft: '120px'
                          }}
                        >
                          {this.state.newMenuIdError}
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
                        <div style={{width: '120px'}}>{'New menu name: '}</div>
                        <input
                          style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                          value={this.state.newMenuName || ""}
                          onChange={(event) => {
                            if (!event.target.value) {
                              this.setState({newMenuNameError: "New menu name is required!"});
                            } else {
                              this.setState({newMenuNameError: undefined});
                            }
                            this.setState({newMenuName: event.target.value})
                          }}
                        />
                      </div>
                      {this.state.newMenuNameError && (
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: 400,
                            marginLeft: '120px'
                          }}
                        >
                          {this.state.newMenuNameError}
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
                        <div style={{width: '120px'}}>{'New menu path: '}</div>
                        <input
                          style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                          value={this.state.newMenuPath || ""}
                          onChange={(event) => {
                            if (!event.target.value) {
                              this.setState({newMenuPathError: "New menu path is required!"});
                            } else {
                              this.setState({newMenuPathError: undefined});
                            }
                            this.setState({newMenuPath: event.target.value})
                          }}
                        />
                      </div>
                      {this.state.newMenuPathError && (
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: 400,
                            marginLeft: '120px'
                          }}
                        >
                          {this.state.newMenuPathError}
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
                          position: 'relative'
                        }}
                      >
                        <div style={{width: '120px'}}>{'New menu icon: '}</div>
                        <input
                          style={{display: 'flex', flex: 1, outline: 'none', border: '1px solid #00000020', borderRadius: '5px', padding: '5px'}}
                          value={this.state.newMenuIcon || ""}
                          onChange={(event) => {
                            if (!event.target.value) {
                              this.setState({newMenuIconError: "New menu icon is required!"});
                            } else {
                              this.setState({newMenuIconError: undefined});
                            }
                            this.setState({newMenuIcon: event.target.value})
                          }}
                        />
                        <i className={`fa ${this.state.newMenuIcon || ""}`} style={{position: "absolute", right: '10px'}}/>
                      </div>
                      {this.state.newMenuIconError && (
                        <small
                          className="help-block"
                          style={{
                            color: '#eb0000',
                            fontSize: '12px',
                            fontWeight: 400,
                            marginLeft: '120px'
                          }}
                        >
                          {this.state.newMenuIconError}
                        </small>
                      )}
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <div
                      className='button-btn mr-15'
                      onClick={async () => {
                        // this.setState({loading: true});
                        if (!this.state.newMenuId) {
                          this.setState({newMenuIdError: 'New menu id is required!'});
                        }
                        if (!this.state.newMenuIcon) {
                          this.setState({newMenuIconError: 'New menu icon is required!'});
                        }
                        if (!this.state.newMenuName) {
                          this.setState({newMenuNameError: 'New menu name is required!'});
                        }
                        if (!this.state.newMenuPath) {
                          this.setState({newMenuPathError: 'New menu path is required!'});
                        }
                        if (!!this.state.newMenuIconError || !!this.state.newMenuPathError || !!this.state.newMenuNameError || !!this.state.newMenuIdError) {
                          return;
                        }
                        let newMenu = {
                          id: this.state.newMenuId,
                          className: this.state.newMenuIcon,
                          name: this.state.newMenuName,
                          path: this.state.newMenuPath,
                          permissions: [],
                          roles: [],
                          groups: [],
                          children: [],
                        }
                        const newItems = [...this.state.menuItems];
                        if (!!this.state.isFirstItem) {
                          newItems.splice(0, 0, newMenu);
                        } else {
                          if (selected) {
                            const index = newItems.indexOf(selected);
                            if (index > -1) {
                              newItems.splice(index + 1, 0, newMenu);
                            } else {
                              newItems.forEach(it => {
                                const indexChild = it.children.indexOf(selected);
                                if (indexChild > -1) {
                                  it.children.splice(indexChild + 1, 0, newMenu);
                                }
                              })
                            }
                          } else {
                            newItems.push(newMenu)
                          }
                        }
                        const res = await updateMenuItem({appCode: this.state.appCode, data: newItems});
                        if (res.success == true) {
                          Swal.fire(
                            'Information!',
                            'Menu has been updated successfully!',
                            'success',
                          )
                            .then(() => {
                              window.location.reload();
                            })
                        } else {
                          Swal.fire(
                            'Error!',
                            res.message || res.errorDescription || '',
                            'error'
                          )
                        }
                        this.setState({
                          loading: false,
                          showAddMenu: false,
                          newMenuId: undefined,
                          newMenuIcon: undefined,
                          newMenuName: undefined,
                          newMenuPath: undefined,
                          selected: undefined,
                          open: false,
                          isFirstItem: false,
                        })
                      }}
                    >
                      <span>{'Submit'}</span>
                    </div>
                    <div
                      className='button-btn'
                      onClick={() => {
                        this.setState({
                          showAddMenu: false,
                          newMenuId: undefined,
                          newMenuIcon: undefined,
                          newMenuName: undefined,
                          newMenuPath: undefined,
                          selected: undefined,
                          open: false,
                          isFirstItem: false,
                        });
                      }}
                    >
                      <span>{'Close'}</span>
                    </div>
                  </div>
                </div>
              )}
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

const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} style={{cursor: "pointer"}}/>;
};

export default withNamespaces('common')(Homepage);
