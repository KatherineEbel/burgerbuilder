import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId: userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASEKEY}`;
    if (!isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASEKEY}`;
    }
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(e => {
        dispatch(authFail(e.response.data.error));
      });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
};

export const setAuthRedirect = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate >= new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token,userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  }
};