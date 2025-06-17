import { OPEN_SIDE_MENU, TOGGLE_SITE_MENU } from './types';
import { getSiteMenu } from './selectors';

const toggleSiteMenu = (isToggleMenu: boolean) =>
  async (dispatch, getState) => {
    if (getSiteMenu(getState()) !== isToggleMenu) {
      dispatch({
        type: TOGGLE_SITE_MENU,
        payload: { isToggleMenu },
      });
    }
  };

const openSideMenu = (isOpenSideMenu: boolean) =>
  async (dispatch, getState) => {
    if (getSiteMenu(getState()) !== isOpenSideMenu) {
      dispatch({
        type: OPEN_SIDE_MENU,
        payload: { isOpenSideMenu },
      });
    }
  };

export  {
  toggleSiteMenu,
  openSideMenu
};
