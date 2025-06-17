import React from 'react';
import { connect } from 'react-redux';
import css from 'styled-jsx/css';
import { Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { tokenName } from '@app/utils/public-config';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';

const styles = css`

  @media screen and (min-width: 1024px) {

      .bvWnwr {
          background: none;
      }
  }
  @media screen and (min-width: 1520px) {

      .bvWnwr {
          padding-left: 60px;
          padding-right: 60px;
      }
  }
  @media screen and (min-width: 1440px) {

      .bvWnwr {
          padding-left: 60px;
          padding-right: 60px;
      }
  }
  @media screen and (min-width: 1280px) {

      .bvWnwr {
          padding-left: 53px;
          padding-right: 53px;
      }
  }
  @media screen and (min-width: 1024px) {
      .bvWnwr {
          padding-left: 42px;
          padding-right: 42px;
      }
  }
  @media screen and (min-width: 768px) {
      .bvWnwr {
          padding-left: 35px;
          padding-right: 35px;
      }
  }
  @media screen and (min-width: 375px) {
      .bvWnwr {
          padding-left: 15px;
          padding-right: 15px;
      }
  }

  .bvWnwr {
      padding: 20px 15px;
      box-sizing: border-box;
      color: rgb(0, 35, 75);
      font-family: sharp-sans-semibold, Arial, sans-serif;
      font-size: 14px;
      position: relative;
      //background: rgb(255, 240, 75);
  }
  :global(.dropdown-menu.show) {
      transform: translate3d(calc(-100% + 45px), 25px, 0px) !important;
  }
`;

class PublicHeader extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {}
        this.logout.bind(this);
    }

    logout() {
        eraseCookie(tokenName);
        this.props.setUserInfo({})
        console.info('RD /auth/signin logOut pubHeader 80')
        require('@app/utils/next-routes').Router.pushRoute('/auth/signin');
    }

    render() {
        return (
            <div role="banner" style={{ padding: '0px 50px', overflow: 'unset', ...this.props.style,}}>
                <style jsx>{styles}</style>
                <section data-test="header" data-uem-id="header" className="sc-13a0bfj-0 sc-1e1omv5-2 bvWnwr kq342h-3 eEkccu">
                    <div>
                        <div data-test="header-content" className="sc-1e1omv5-3 iINxPT" style={{ display: 'flex', background: 'unset', }}>
                            <div data-test="header-mobile-menu" className="sc-1e1omv5-0 elmeMP" />
                                <div data-test="styled-logo" className="sc-1e1omv5-20 HDKpR" style={{ flex: 1, display: 'flex', }}>

                                <div className="mobile-bars" style={{width: '30px', height: '30px', fontSize: '22px', textAlign: 'right', display: 'none', cursor: 'pointer'}} >
                                    {!this.props.userInfo.email ?
                                        <i className="fa fa-bars" style={{}}
                                            onClick={() => {
                                                this.setState({showMenu: true,})
                                            }}
                                        />
                                        :
                                        <img src={this.props.userInfo.avatar || 'static/images/user.png'} style={{width: '25px', height: 'auto', marginRight: '5px', borderRadius: '50%'}}
                                            onClick={() => {
                                                this.setState({showMenu: true,})
                                            }}
                                        />
                                    }
                                    <div
                                        style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: this.state.showMenu ? 'flex' : 'none', flexDirection: 'column', background: '#fff', zIndex: 10000}}
                                    >
                                        <div
                                            style={{position: 'relative', width: '100%', height: '300px'}}
                                        >
                                            <div style={{textAlign: 'left', background: '#fff', margin: '0px 15px', marginTop: '0px', paddingTop: '5px', paddingBottom: '5px', color: '#000', fontSize: '25px', cursor: 'pointer'}}
                                                onClick={() => {
                                                    this.setState({showMenu: false,})
                                                }}
                                            >
                                                <i className='fa fa-close'></i>
                                            </div>
                                            {!this.props.userInfo.email ?
                                            <div style={{cursor: 'pointer', fontSize: '16px', textAlign: 'center', background: 'yellow', margin: '0px 15px', paddingTop: '5px', paddingBottom: '5px', color: '#000', fontWeight: '500', cursor: 'pointer'}}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    console.info('RD /auth/signin clogOut')
                                                    require('@app/utils/next-routes').Router.pushRoute('/auth/signin');
                                                }}
                                            >
                                                <span>Sign up</span>
                                            </div>
                                            : null}
                                            {!this.props.userInfo.email ?
                                            <div style={{cursor: 'pointer', fontSize: '16px', textAlign: 'center', background: '#fff', margin: '0px 15px', paddingTop: '5px', paddingBottom: '5px', color: '#000', fontWeight: '500', cursor: 'pointer'}}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    console.info('RD /auth/signin clogOut')
                                                    require('@app/utils/next-routes').Router.pushRoute('/auth/signin');
                                                }}
                                            >
                                                <span>Login</span>
                                            </div>
                                            : null}
                                            {this.props.userInfo.email ?
                                            <div style={{fontSize: '16px', textAlign: 'center', background: 'yellow', margin: '0px 15px', paddingTop: '5px', paddingBottom: '5px', color: '#000', fontWeight: '500', cursor: 'pointer'}}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    require('@app/utils/next-routes').Router.pushRoute('/user/profile');
                                                }}
                                            >
                                                <span>Profile</span>
                                            </div>
                                            : null}
                                            {this.props.userInfo.email ?
                                            <div style={{fontSize: '16px', textAlign: 'center', background: '#fff', margin: '0px 15px', paddingTop: '5px', paddingBottom: '5px', color: '#000', fontWeight: '500', cursor: 'pointer'}}
                                                onClick={this.logout.bind(this)}
                                            >
                                                <span>Logout</span>
                                            </div>
                                            : null}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div data-test="cta-content" className="sc-1e1omv5-4 dooUyS" style={{ display: 'flex', flexDirection: 'row' }}>
                                <div className="sc-1e1omv5-15 fWQyVj">
                                    <div className="sc-1e1omv5-14 kXPIUk" style={{ paddingRight: '20px', borderRight: '1px solid #000000' }}>
                                    </div>
                                </div>
                                {!this.props.userInfo.email ?
                                    <div data-test="signin-dropdown-container" className="sc-1e1omv5-19 bSBvXv" style={{ paddingLeft: '15px', color: '#222' }}>
                                        <div className="sc-1qzdqoy-0 gPRgNq" style={{ display: 'flex', flexDirection: 'row' }}>
                                            <span className='' style={{ color: '#000000' }}>
                                                <div data-test="signin-dropdown-bar" className="sc-1qzdqoy-1 kKeWiD" style={{ marginLeft: '5px' }}>
                                                    <a className="esebpo-0 sc-1qzdqoy-2 laXnkK" role="button" tabIndex={0} style={{ color: 'inherit', cursor: 'pointer', }}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            console.info('RD /auth/signin clogOut')
                                                            require('@app/utils/next-routes').Router.pushRoute('/auth/signin');
                                                        }}
                                                    >
                                                        Log in / Sign up
                                                    </a>
                                                    <svg data-test="icon-arrow-down" className="sc-14oxdvn-0 kt5wwf-0 eBVBlP sc-1qzdqoy-3 jELyxt" viewBox="0 0 63 40" style={{ width: '10px', marginLeft: '5px', display: 'none', }}>
                                                        <polygon fill="#00234B" points="31.5,40 0.1,8.6 8.7,0 31.5,22.8 54.3,0 62.9,8.6" />
                                                    </svg>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div>
                                            <UncontrolledDropdown isOpen={this.state.dropdownOpen} setActiveFromChild className=""
                                                toggle={() => {
                                                    this.setState({dropdownOpen: !this.state.dropdownOpen})
                                                }}
                                            >
                                                <DropdownToggle href="javascript:void(0)" tag="a" className="">
                                                    <div data-test="signin-dropdown-container" className="sc-1e1omv5-19 bSBvXv" style={{ paddingLeft: '15px', color: '#222' }}>
                                                        <img src={this.props.userInfo.avatar || 'static/images/user.png'} style={{width: '25px', height: 'auto', marginRight: '5px', borderRadius: '50%'}}/>
                                                        {this.props.userInfo.firstName}
                                                    </div>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem
                                                        tag="a"
                                                        onClick={() => {
                                                            require('@app/utils/next-routes').Router.pushRoute('/user/profile');
                                                        }}
                                                        href="javascript:void(0)"
                                                    >
                                                        <i className="icon wb-user" aria-hidden="true"></i>
                                                        Profile
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        tag="a"
                                                        onClick={this.logout.bind(this)}
                                                        href="javascript:void(0)"
                                                    >
                                                        <i className="icon wb-power" aria-hidden="true"></i>Logout
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown >
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <div className="sc-1e1omv5-1 btqGlP" />

            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
	    userInfo: state.userInfo || {},
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setUserInfo: (userInfo) => dispatch({type: 'SET_USER_INFO', payload: userInfo}),
		dispatch,
	}
};

PublicHeader = connect(mapStateToProps, mapDispatchToProps)(PublicHeader);

export {PublicHeader};
