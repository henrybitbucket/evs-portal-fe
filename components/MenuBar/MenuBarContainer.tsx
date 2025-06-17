import { connect } from 'react-redux';

import { logOut } from '@app/redux/user/actions';
import { getReducer } from '@app/redux/user/selectors';
import { openSideMenu, toggleSiteMenu } from '@app/redux/site-menu/actions';

import MenuBar from './MenuBar';
import { getIsOpenSideMenu, getSiteMenu } from '@app/redux/site-menu/selectors';

const mapStateToProps = state => ({
  isToggle: getSiteMenu(state),
  userInfo: getReducer(state),
  isOpenSideMenu: getIsOpenSideMenu(state),
});

const mapDispatchToProps = {
  logOut,
  toggleSiteMenu,
  openSideMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
