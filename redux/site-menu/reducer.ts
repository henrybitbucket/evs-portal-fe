import { IGenericStoreAction } from '../types';

import { OPEN_SIDE_MENU, TOGGLE_SITE_MENU } from './types';

export interface ISiteMenuState {
  isToggleMenu: boolean;
  isOpenSideMenu: boolean;
}

export const initialState = {
  isToggleMenu: false,
  isOpenSideMenu: false,
};

const reducer = (
  state: ISiteMenuState = initialState, action: IGenericStoreAction = { type: null },
) => {
  switch (action.type) {
    case TOGGLE_SITE_MENU:
      const { isToggleMenu } = action.payload;
      return {
        ...state,
        isToggleMenu,
      };
    case OPEN_SIDE_MENU:
      const { isOpenSideMenu } = action.payload;
      return {
        ...state,
        isOpenSideMenu,
      };
    default:
      return state;
  }
};

export default reducer;
