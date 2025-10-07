import React, { createRef} from 'react';
import Router from 'next/router';
import css from 'styled-jsx/css';
import I18nLink from '@app/components/I18nLink';
import { withNamespaces } from '@app/i18nnext';
import { INavbarHeaderProps } from '@app/components/NavbarHeader/types';

import { getMenuItems, getUserPermissions } from '@app/api/user';
import { getStoreBetweenPageTransitions, isServer } from "@app/utils";
import configureStore from "@app/redux/store";
import { getCookie } from "@app/utils/cookie";

const styles = css`
  .site-menubar {
    top: 48.1px !important;
    .site-menu > .site-menu-item.active {
      border: 0;
      //backgroundColor: '#26a69a',
    }
  }
`;

const MENU_BAR_WIDTH = "menuBarWidth";

class MenuBar extends React.Component<INavbarHeaderProps, any> {

  constructor(props) {
    super(props);
    let path = window.location.href.substring(window.location.origin.length);

    const store = isServer() ? configureStore() : getStoreBetweenPageTransitions();
    const userInfo = store.getState()?.userInfo;
    const isOnlyP2User = false;// userInfo.authorities && userInfo.authorities.length === 1 && ((userInfo.authorities[0].authority === 'R_P2') || (userInfo.authorities[0].authority === (this.state.appCode + '_' + 'R_P2')));
    const isDms = getCookie('is_dms');
    const appCode = getCookie('app_code');

    this.state = {
      userCollapse: false,
      bgColor: '#263238',
      path,
      isOnlyP2User,
      userInfo,
      isDms,
      appCode,
      isResizing: false,
      initialX: 0,
      menuBarMinWidth: 80,
      menuBarMaxWidth: window.innerWidth / 2,
      width: Number(localStorage.getItem(MENU_BAR_WIDTH)) || 80,
    }

    this.container = createRef();
    this.minWidth = 80;
    this.maxWidth = window.innerWidth * 0.95;

    this.state.userCollapse =
      /\/user-list*/g.test(path) ||
      /\/roles*/g.test(path) ||
      /\/group*/g.test(path) ||
      /\/my-group*/g.test(path);

    this.state.deviceManagementCollapse =
      /\/firm-ware*/g.test(path) ||
      /\/upgrade-firmware*/g.test(path) ||
      /\/exports*/g.test(path) ||
      /\/devices*/g.test(path) ||
      /\/devices-meter*/g.test(path) ||
      /\/device-group*/g.test(path) ||
      /\/data-settings*/g.test(path);

    this.state.dashboardCollapse =
      /\/$/g.test(path);

    this.state.buildingCollapse =
      /\/building*/g.test(path) ||
      /\/units*/g.test(path) ||
      /\/address-logs*/g.test(path);

    this.state.reportCollapse =
      /\/report*/g.test(path) ||
      /\/report-repository*/g.test(path) ||
      /\/meter-commissioning-report*/g.test(path) ||
      /\/p1-online-check*/g.test(path) ||
      /\/p1-detail-report*/g.test(path) ||
      /\/p1-summary-report*/g.test(path) ||
      /\/p2-provisioning-report*/g.test(path);

    this.state.p2Collapse =
      /\/p2-step*/g.test(path) ||
      /\/p2-ack-report*/g.test(path) ||
      /\/p2-provisioning-report*/g.test(path);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  _componentDidUpdate(prevProps, prevState) {
    if (this.state.isResizing && !prevState.isResizing) {
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    } else if (!this.state.isResizing && prevState.isResizing) {
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
    }
    if (this.props.isOpenSideMenu || this.props.isToggle) {
      const localWidth = localStorage.getItem(MENU_BAR_WIDTH);
      document.getElementsByClassName("site-menubar-body")?.length && document.getElementsByClassName("site-menubar-body")[0].setAttribute(
        "style",
        `width: ${localWidth}px !important; min-width: unset !important;`
      );
      document.getElementsByClassName("site-menubar-footer")?.length && document.getElementsByClassName("site-menubar-footer")[0].setAttribute(
        "style",
        `width: ${localWidth}px !important; min-width: unset !important;`
      );
      document.getElementsByClassName("site-menubar")?.length && document.getElementsByClassName("site-menubar")[0].setAttribute(
        "style",
        `width: ${localWidth}px !important; min-width: unset !important;`
      )
      document.getElementsByClassName("navbar-header")?.length && document.getElementsByClassName("navbar-header")[0].setAttribute(
        "style",
        `width: ${localWidth}px !important; min-width: unset !important;`
      )
      document.getElementsByClassName("page")[0].setAttribute(
        "style",
        `margin-left: ${localWidth}px !important; min-width: unset !important;`
      )
    } else {
      document.getElementsByClassName("site-menubar-body")?.length && document.getElementsByClassName("site-menubar-body")[0].removeAttribute(
        "style"
      );
      document.getElementsByClassName("site-menubar-footer")?.length && document.getElementsByClassName("site-menubar-footer")[0].removeAttribute(
        "style"
      );
      document.getElementsByClassName("site-menubar")?.length && document.getElementsByClassName("site-menubar")[0].removeAttribute(
        "style"
      )
      document.getElementsByClassName("navbar-header")?.length && document.getElementsByClassName("navbar-header")[0].removeAttribute(
        "style"
      )
      document.getElementsByClassName("page") && document.getElementsByClassName("page")[0].removeAttribute(
        "style"
      )
    }
  }

  handleResize = () => {
    if (this.container.current) {
      const monitorWidth = screen.width;
      const screenWidth = window.innerWidth;
      const width = Number(window.sessionStorage.getItem(MENU_BAR_WIDTH));
      const currentWidth = width && width > 0 ? width * screenWidth : 800;
      if (screenWidth / monitorWidth < 0.3) {
        this.setState({
          width: screenWidth > this.minWidth ? screenWidth : this.minWidth,
        })
      } else {
        this.setState({
          width: currentWidth > this.minWidth ? currentWidth : this.minWidth,
        })
      }
      this.maxWidth = screenWidth * 0.95;
    }
  };

  handleMouseDown = (e: any) => {
    this.setState({
      isResizing: true,
      initialX: e.clientX,
    })
    document.getElementsByClassName("main-layout")[0].setAttribute(
      "style",
      `user-select: none;`
      )
  };

  handleMouseUp = () => {
    this.setState({ isResizing: false });
    document.getElementsByClassName("main-layout")[0].setAttribute(
      "style",
      `user-select: auto;`
    )
  };

  handleMouseMove = (e: MouseEvent) => {
    if (this.state.isResizing && e.clientX > this.state.menuBarMinWidth && e.clientX < this.state.menuBarMaxWidth) {
      document.getElementsByClassName("site-menubar-body")[0].setAttribute(
        "style",
        `width: ${e.clientX}px !important; min-width: unset !important;`
      );
      document.getElementsByClassName("site-menubar-footer")[0].setAttribute(
        "style",
        `width: ${e.clientX}px !important; min-width: unset !important;`
      );
      document.getElementsByClassName("site-menubar")[0].setAttribute(
        "style",
        `width: ${e.clientX}px !important; min-width: unset !important;`
      )
      document.getElementsByClassName("navbar-header")[0].setAttribute(
        "style",
        `width: ${e.clientX}px !important; min-width: unset !important;`
      )
      document.getElementsByClassName("page")[0].setAttribute(
        "style",
        `margin-left: ${e.clientX}px !important; min-width: unset !important;`
      )
      localStorage.setItem(MENU_BAR_WIDTH, e.clientX.toString());
    }
  };

  logOut = async () => {
    await this.props.logOut();
    console.info('RD /auth/signin logOut MenuBar 169')
    Router.push('/signin', '/auth/signin');
  };

  componentDidMount() {
    this.searchGroup();
    this.getMenuItems();
    window.addEventListener("resize", this.handleResize);
  }

  async getMenuItems() {
    const resMenuItems = await getMenuItems();
    let menuMms = [];
    let menuDms = [];
    let menu = [];

    resMenuItems?.response?.map(item => {
      if (item.appCode === "MMS") {
        menuMms = JSON.parse(item?.items);
      } else if (item.appCode === "DMS") {
        menuDms = JSON.parse(item?.items);
      }
    })
    menu = this.state.appCode === 'MMS' ? menuMms :menuDms;
    menu.sort((o1, o2) => Number(o1.order) - Number(o2.order));
    menu.forEach(m => (m.children || []).sort((o1, o2) => Number(o1.order) - Number(o2.order)));
    this.setState({
      menuItems: menu,
    })
  }

  searchGroup = async () => {
    const params = {};
    const rp = await getUserPermissions(params);

    //const inSubGroups = await getMyGroupUsers({options: {email: this.state.userInfo?.email}});

    this.setState({
      permissions: rp?.response?.results[0]?.permissions || [],
      subGroups: /*inSubGroups?.response?.results || */[],
    });
    this.noAuthorization();
  }

  noAuthorization = () => {
    if (this.state.permissions != null) {
      if (this.state.permissions.length < 1) {
        console.log("_menu bar_____")
        // require('@app/utils/next-routes').Router.pushRoute('/no-authorization');
      }
    }
  }

  showMenu(item) {
    const isSuperAdmin = this.state.userInfo?.authorities?.filter(r => r.authority.includes('SUPER_ADMIN'))?.length;
    const authorities = this.state.userInfo?.authorities.map(r => r.authority);
    let hasPermission = false;
    let hasRole = false;
    let hasGroup = false;
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
    if (isSuperAdmin || (hasPermission || hasGroup || hasRole) || item.permitAll) {
      showMenu = true;
    }
    return showMenu;
  }

  render() {
    const { isResizing } = this.state;
    return (
      <>
        {this.state.permissions != null ?
          <div
            className="site-menubar menu"
            //onMouseOver={() => !this.props.isOpenSideMenu && this.props.toggleSiteMenu(true)}
            //onMouseLeave={() => !this.props.isOpenSideMenu && this.props.toggleSiteMenu(false)}
          >
            <div
              ref={this.container}
              className={`relative h-full ${isResizing ? "select-none" : ""}`}
            >
               <div
                onMouseDown={this.handleMouseDown}
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  bottom: 0,
                  right: 0,
                  height: '100%',
                  width: '5px',
                  cursor: 'ew-resize',
                }}
              />
              <div
                className="site-menubar-body"
              >
                <div style={{
                  height: '78px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: '20px',
                  position: 'ralative',
                }}>
                  <img
                    src={`${'static/images/' + this.state.appCode + '.png'}`}
                    style={{ height: '38px', width: '38px', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => {
                      require('@app/utils/next-routes').Router.pushRoute('/');
                    }}
                  />
                  <div
                    className='app_name'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      className=""
                      style={{
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '400',
                        paddingLeft: '20px',
                      }}
                    >{'Admin'}</div>
                    <div
                      className=""
                      style={{
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: '400',
                        paddingLeft: '20px',
                        opacity: '0.5',
                      }}
                    ><i className='fa fa-map-marker' style={{ marginRight: '5px', }}/>Singapore
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        right: '15px',
                        fontSize: '18px',
                        color: '#fff'
                      }}>
                      <i className="fa fa-gear"/>
                    </div>
                  </div>
                </div>
                <ul
                  className="site-menu scrollbar-black"
                  data-plugin="menu"
                  style={{ maxHeight: '100%', overflow: 'auto', paddingBottom: '50px' }}
                >
                  {(this.state.menuItems || []).map((it, idx) => {
                    return (
                      it.children?.length ? (this.showMenu(it) ? (
                          <li
                            className={
                              "site-menu-item has-sub " +
                              (!!this.state.userCollapse && it.id === 'user-management' ||
                              !!this.state.deviceManagementCollapse && it.id === 'device-management'  ||
                              !!this.state.buildingCollapse && it.id === 'address-management'  ||
                              !!this.state.reportCollapse && it.id === 'report-management'  ||
                              !!this.state.p2Collapse && it.id === 'p2-provisioning'  ||
                              it.status === 'open' ? 'open' : '')
                            }
                            key={idx + '_'}>
                            <a
                              href="javascript:void(0)"
                              onClick={() => {
                                it.status = it.status === 'open' ? ''
                                  : (!!this.state.userCollapse && it.id === 'user-management'  ||
                                  !!this.state.deviceManagementCollapse && it.id === 'device-management'  ||
                                  !!this.state.buildingCollapse && it.id === 'address-management'  ||
                                  !!this.state.reportCollapse && it.id === 'report-management'  ||
                                  !!this.state.p2Collapse && it.id === 'p2-provisioning'
                                    ? '' : 'open');
                                this.setState({
                                  menuItems: [].concat(this.state.menuItems),
                                  userCollapse: false,
                                  deviceManagementCollapse: false,
                                });
                              }}
                            >
                              <i className={"site-menu-icon " + (it.className || "").replace('fa-fw', '')} aria-hidden="true"/>
                              <span className="site-menu-title">{it.displayLabel || it.name}</span>
                              <span className="site-menu-arrow"/>
                            </a>
                            <ul className="site-menu-sub">
                              {it.children.map((subIt, subIdx) => {
                                return (
                                  this.showMenu(subIt) ? (
                                    <I18nLink
                                      activeClassName="active"
                                      href={subIt.path || ('/' + subIt.name.toLowerCase().replace(/[ ]/g, '-') + '-list')}
                                      index={idx + '_' + subIdx} key={idx + '_' + subIdx}>
                                      <li className="site-menu-item">
                                        <a href="javascript:void(0)"
                                           style={{
                                             color: '#fff',
                                             backgroundColor: 'inherit',
                                             paddingLeft: '55px',
                                           }}
                                           onClick={() => {
                                             require('@app/utils/next-routes').Router.pushRoute(subIt.path || ('/' + subIt.name.toLowerCase().replace(/[ ]/g, '-') + '-list'));
                                           }}
                                        >
                                          <i className={"site-menu-icon " + (subIt.className || "").replace('fa-fw', '')} aria-hidden="true"/>
                                          <span className="site-menu-title">{subIt.displayLabel || subIt.name}</span>
                                        </a>
                                      </li>
                                    </I18nLink>
                                  ) : null )
                              })}
                            </ul>
                          </li>
                        ) : null)
                        : (this.showMenu(it) ? (
                          <I18nLink
                            activeClassName={!!this.state.dashboardCollapse ? 'active' : 'none'}
                            href={it.path || ('/' + it.name.toLowerCase().replace(/[ ]/g, '-') + '-list')}
                            index={idx + '_'} key={idx + '_'}>
                            <li className="site-menu-item">
                              <a
                                href="javascript:void(0)"
                                style={{
                                  color: '#fff',
                                  backgroundColor: 'inherit'
                                }}
                                onClick={() => {
                                  require('@app/utils/next-routes').Router.pushRoute(it.path || ('/' + it.name.toLowerCase().replace(/[ ]/g, '-') + '-list'));
                                }}
                              >
                                <i className={"site-menu-icon " + (it.className || "").replace('fa-fw', '')} aria-hidden="true"/>
                                <span className="site-menu-title">{it.name}</span>
                              </a>
                            </li>
                          </I18nLink>
                        ) : null)
                    )
                  })}
                </ul>
              </div>
            </div>
            <style jsx>{styles}</style>
            <div
              className="site-menubar-footer"
            >
              <a
                href="javascript: void(0);" className="fold-show" data-placement="top" data-toggle="tooltip"
                data-original-title="Settings"
              >
                <span className="icon wb-settings" aria-hidden="true"/>
              </a>
              <I18nLink href="javascript: void(0);">
                <a href="javascript: void(0);">
                  <span className="icon wb-user" aria-hidden="true"/>
                </a>
              </I18nLink>
              <a
                href="javascript: void(0);" data-placement="top" data-toggle="tooltip" data-original-title="Logout">
                <span className="icon wb-power" aria-hidden="true"/>
              </a>
            </div>
          </div>
          : null}
      </>
    );
  }
}

export default withNamespaces('common')(MenuBar);
