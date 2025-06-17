import { IGenericStoreAction } from '../types';

import { SET_USER, USER_INITIALISE } from './types';

export interface IUserState {
  initialised: boolean;
  userName?: string;
  isLoggedIn?: boolean;
  access_token?: string;
}

export const initialState = {
  initialised: false,
  isLoggedIn: false,
};

const reducer = (
  state: IUserState = initialState, action: IGenericStoreAction = { type: null },
) => {
  switch (action.type) {
    case USER_INITIALISE:
      return {
        ...state,
        initialised: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
