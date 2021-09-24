import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

//  Reducer For : Login User
export const userLoginReducer = (state = { userInfo: [] }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload, loading: false };

    case USER_LOGIN_FAIL:
      return { error: action.payload, loading: false };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

//  Reducer For : Register User
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { userInfo: action.payload, loading: false };

    case USER_REGISTER_FAIL:
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};

//  Reducer For : User Details
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { user: action.payload, loading: false };

    case USER_DETAILS_FAIL:
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};

//  Reducer For : User Update
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, ...state };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { userInfo: action.payload, loading: false, success: true };

    case USER_UPDATE_PROFILE_FAIL:
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};
