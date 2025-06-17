import { connect } from 'react-redux';

import { MainLayout } from './MainLayout';

import { openSideMenu, toggleSiteMenu } from '@app/redux/site-menu/actions';
import { getIsOpenSideMenu, getSiteMenu } from '@app/redux/site-menu/selectors';

const mapStateToProps = state => ({
  isToggle: getSiteMenu(state),
  isOpenSideMenu: getIsOpenSideMenu(state),
});

const mapDispatchToProps = {
  toggleSiteMenu,
  openSideMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
