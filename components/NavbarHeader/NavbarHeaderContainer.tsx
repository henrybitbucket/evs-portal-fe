import { connect } from 'react-redux';

import NavbarHeader from './NavbarHeader';

import { openSideMenu, toggleSiteMenu } from '@app/redux/site-menu/actions';
import { logOut } from '@app/redux/user/actions';
import { getIsOpenSideMenu, getSiteMenu } from '@app/redux/site-menu/selectors';
import { getReducer } from '@app/redux/user/selectors';

const mapStateToProps = state => ({
  isToggle: getSiteMenu(state),
  userInfo: getReducer(state),
  isOpenSideMenu: getIsOpenSideMenu(state),
});

const mapDispatchToProps = {
  toggleSiteMenu,
  logOut,
  openSideMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarHeader);
