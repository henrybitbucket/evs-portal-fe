import { SET_USER, USER_INITIALISE } from './types';
import { tokenName } from '@app/utils/public-config';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';

const handleSuccesfulUserReponsePayload = async (dispatch, userData) => {
  const token = getCookie(tokenName, null);

  return dispatch({
    type: SET_USER,
    payload: {
      ...userData,
      access_token: token,
      isLoggedIn: true,
    },
  });

  return userData;
};

const getUser = req =>
  async (dispatch) => {

  };

const signInAcion = (userEmail, password) => {
  return async (dispatch) => {
  };
};

const logOut = () => {
  return async (dispatch) => {

  };
};

export  {
  signInAcion,
  getUser,
  logOut,
};
