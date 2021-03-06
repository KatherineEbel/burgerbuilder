import * as actionTypes from '../actions/actionTypes';
import { update } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return update(state, { error: null, loading: true});
    case actionTypes.AUTH_SUCCESS:
      const {idToken, userId} = action;
      return update(state, {
        token: idToken, userId, error: null, loading: false
      });
    case actionTypes.AUTH_FAIL:
      const {error} = action;
      return update(state, { error, loading: false});
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return update(state, {authRedirectPath: action.path });
    default: return state;
    case actionTypes.AUTH_LOGOUT: return update(state, { token: null, userId: null });
  }
};

export default reducer;