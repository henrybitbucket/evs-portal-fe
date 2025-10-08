import * as React from 'react';
import { Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Router from 'next/router';
import { i18n, Trans, withNamespaces } from '@app/i18nnext';
import { countAlarms } from '@app/api/log';
import { Avatar } from '@app/components/Common';
import { INavbarHeaderProps } from './types';
import { tokenName } from '@app/utils/public-config';
import { setCookie, getCookie, eraseCookie } from '@app/utils/cookie';
class NavbarHeader extends React.PureComponent<INavbarHeaderProps, any> {

  state = {
    dropdownLanOpen: false,
    appCode: getCookie('app_code'),
  };

  toggleLang = () => {
    this.setState(prevState => ({
      dropdownLanOpen: !prevState.dropdownLanOpen,
    }));
  }

  logOut = async () => {
    eraseCookie(tokenName);
    //eraseCookie('is_dms');
    eraseCookie('app_code');
    await this.props.logOut();
    console.info('RD /auth/signin logOut header 25')
    Router.push('/signin', '/auth/signin');
  }

  profile = async () => {
    Router.push('/profile', '/profile');
  }

  changeLanguage = (language: string) => {
    i18n.changeLanguage(language === 'vn' ? 'en' : 'vn');
    return;
  }

  changeAppCode = (appCode: string) => {
    this.setState({appCode}, () => {
      setCookie('app_code', appCode);
      if (appCode !== 'DMS') {
        window.location.href = '/';
      } else {
        window.location.href = '/';
      }
    });
    return;
  }

  async componentDidMount() {
      this.fetchData();
      this.intv = setInterval(async () => {
          this.fetchData();
      }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.intv);
  }

  fetchData = async () => {
      if (getCookie('app_code') !== 'MMS') {
        return;
      }
      let rp = await countAlarms();

      this.setState({
          data: {
              ...this.state.data,
              alarms: rp.response?.countAlarms || 0,
          }
      }, () => {
        this.props.dispatch({
          type: 'HEADER_STATUS',
          headerStatus: {
            alarms: rp.response?.countAlarms || 0,
            mqttAddress: rp.response?.mqttAddress,
            mqttStatus: rp.response?.mqttStatus,
            countDevices: rp.response?.countDevices,
            systemInformation: rp.response?.systemInformation,
            appServerCheck: rp.response?.appServerCheck,
          }});
      })
  }

  render() {
    const { userInfo } = this.props;
    return (
      <nav className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega">
        <style jsx>{`
          .site-navbar {
            .navbar-header {
              :global(.navbar-toggler .nav-link) {
                background-color: unset;
              }
              :global(.navbar-brand) {
                  height: 100% !important;
                  max-height: 100% !important;
                  display: flex !important;
                  justify-content: center !important;
                  align-items: center !important;
                  img {
                    height: 16px !important;
                  }
              }
            }
          }
          :global(.site-navbar .navbar-container) {
              background-color: #324148 !important;
              max-height: 48px !important;
              min-height: unset !important;
              
              :global(.navbar-collapse) {
                  max-height: 48px !important;
                  min-height: unset !important;
                  
                  :global(.dropdown) {
                      height: 48px !important;
                      max-height: 48px !important;
                      min-height: unset !important;
                  }
              }
              :global(.nav-link) {
                  min-height: unset !important;
                  max-height: 100% !important;
                  display: flex !important;
                  flex-direction: column !important;
                  justify-content: center !important;
                  align-items: center !important;
              }
          }
          :global(.site-navbar) {
              background-color: #324148 !important;
          }
          :global(.navbar) {
              border-top: 1px solid transparent !important;
              border-bottom: 1px solid rgba(255,255,255,.1) !important;
              -ms-flex-align: stretch !important;
              align-items: stretch !important;
              max-height: 48px !important;
              min-height: unset !important;
              
              :global(.navbar-header) {
                  max-height: 48px !important;
                  min-height: unset !important;
                  button[data-toggle='menubar'] {
                    max-height: 100%;
                    margin-left: unset;
                    margin-top: unset;
                    padding-top: 13px;
                    width: 48px;
                  }
                  :global(div.navbar-toggler) {
                    max-height: 100% !important;
                    margin-left: unset;
                    margin-top: unset;
                    padding: unset;
                    padding-top: 13px;
                    width: 48px !important;
                  }
              }
          }
          .alarms {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
              cursor: pointer;
              color: red;
              background: #fff;
              padding: 0px 5px;
              border-radius: 3px;
              font-size: 13px;
              font-weight: 600;
            }
          }
        `}</style>
        <div className="navbar-header">
          <button
            onClick={() => this.props.toggleSiteMenu(!this.props.isToggle)}
            type="button"
            className={`navbar-toggler
            hamburger hamburger-close navbar-toggler-left ${!this.props.isToggle ? 'hided' : ''}`}
            data-toggle="menubar">
            <span className="sr-only">Toggle navigation</span>
            <span className="hamburger-bar"></span>
          </button>
          <UncontrolledDropdown setActiveFromChild className="navbar-toggler m-0">
            <DropdownToggle href="javascript:void(0)" tag="a" className="nav-link white d-inline">
              <i className="icon wb-more-horizontal" aria-hidden="true"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag="a"
                onClick={() => this.props.toggleSiteMenu(!this.props.isToggle)}
                href="javascript:void(0)"
              >
                <i className="icon wb-user" aria-hidden="true"></i>{'Profile' + (!!this.props.userInfo?.id ? (' (UserID: ' + this.props.userInfo?.id + ')') : '')}
              </DropdownItem>
              <DropdownItem
                tag="a"
                onClick={this.logOut}
                href="javascript:void(0)"
              >
                <i className="icon wb-power" aria-hidden="true"></i><Trans i18nKey="LOGOUT" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="navbar-brand navbar-brand-center" data-toggle="gridmenu" style={{width: '100%', padding: "unset"}}>
            <div style={{minWidth: '80px', minHeight: '48px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}} className='group-brand-logo1'>
                  <img className="navbar-brand-logo1" src="/static/images/logo2.png" title="Remark" style={{display: 'none'}}
                       onClick={() => {
                         this.props.toggleSiteMenu(!this.props.isToggle);
                       }}
                  />
                <i className="fa fa-bars" aria-hidden="true"
                   style={{fontSize: '17px', color: 'white', width: '17px'}}
                   onClick={() => {
                       this.props.toggleSiteMenu(!this.props.isToggle);
                   }}
                />

              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  maxWidth: 'calc(100% - 80px)',
                }}
              >
                <i
                  style={{
                    cursor: 'pointer',
                    fontSize: '30px',
                    display: 'none',
                    color: (this.props.isOpenSideMenu || this.props.isToggle) ? 'white' : '',
                  }}
                  className={`${(this.props.isOpenSideMenu || this.props.isToggle) ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}`}
                  onClick={() => {
                    this.props.openSideMenu(!this.props.isOpenSideMenu)
                    this.props.toggleSiteMenu(!this.props.isToggle)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-container container-fluid">
          <div className="collapse navbar-collapse navbar-collapse-toolbar">
            <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">

              {this.state.appCode === 'MMS' && (
              <li className="nav-item dropdown alarms">
                <span
                  onClick={() => {
                    require('@app/utils/next-routes').Router.pushRoute('/');
                  }}
                >{'Alarms ' + (this.props.alarms | 0)}</span>
              </li>
              )}
              {!!this.props.userInfo?.appCodes?.length && (
              <li className="nav-item dropdown">
                <Dropdown isOpen={this.state.dropdownLanOpen} toggle={this.toggleLang}>
                  <DropdownToggle href="javascript:void(0)" tag="a" className="nav-link">
                    <img src={'static/images/' + (this.state.appCode || 'MMS') + '.png'} style={{height: '38px', width: '38px', objectFit: 'contain'}}/>
                  </DropdownToggle>

                  <DropdownMenu>
                    {this.props.userInfo?.appCodes.map((ac, idx) => {
                      return (
                        <DropdownItem
                          tag="a"
                          href="javascript:void(0)"
                          onClick={() => this.changeAppCode(ac)}
                          key={ac}
                        >
                          <img src={'static/images/' + ac + '.png'} style={{width: '38px', objectFit: 'contain', marginRight: '5px'}}/>
                          Dashboard
                        </DropdownItem>
                      )
                    })}
                  </DropdownMenu>
                </Dropdown>
              </li>
              )}
              <li className="nav-item dropdown">
                <UncontrolledDropdown setActiveFromChild>
                  <DropdownToggle href="javascript:void(0)" tag="a" className="nav-link navbar-avatar">
                    <Avatar
                      isOnline={userInfo.isCheckin}
                      src={userInfo.avatar}
                      gender={userInfo.gender}
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      tag="a"
                      onClick={() => this.props.toggleSiteMenu(!this.props.isToggle)}
                      href="javascript:void(0)"
                    >
                      <i className="icon wb-user" aria-hidden="true"></i>{this.props.userInfo?.email + (!!this.props.userInfo?.id ? (' (UserID: ' + this.props.userInfo?.id + ')') : '')}
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      onClick={this.logOut}
                      href="javascript:void(0)"
                    >
                      <i className="icon wb-power" aria-hidden="true"></i><Trans i18nKey="LOGOUT" />
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

NavbarHeader = require('react-redux').connect((state, ownProps) => {
    return {
        alarms: state.header?.alarms || 0,
        userInfo: state.userInfo || {},
        isToggle: !!state['site-menu']?.isToggleMenu,
    }
},
(dispatch) => ({
    dispatch
}))(NavbarHeader);
export default withNamespaces('common')(NavbarHeader);
