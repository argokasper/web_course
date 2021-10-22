import { call, put, takeLatest } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';

const API_HOST = 'http://localhost:3000/api';

// API requests:
const login = async ({ email, password }) => {
  const response = await fetch(`${API_HOST}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response.json();
};

const logout = async () => {
  return fetch(`${API_HOST}/auth/logout`, {
    method: 'POST',
  });
};

const register = async ({ email, password, passwordConfirm }) => {
  const response = await fetch(`${API_HOST}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      password_confirm: passwordConfirm,
    }),
  });
  return response.json();
};

// ACTION TYPES
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE';

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_LOGOUT_SUCCESS = 'REQUEST_LOGOUT_SUCCESS';
export const REQUEST_LOGOUT_FAILURE = 'REQUEST_LOGOUT_FAILURE';

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const REQUEST_REGISTER_SUCCESS = 'REQUEST_REGISTER_SUCCESS';
export const REQUEST_REGISTER_FAILURE = 'REQUEST_REGISTER_FAILURE';

// ACTIONS
export const requestLogin = ({ email, password }) => ({
  type: REQUEST_LOGIN,
  email,
  password,
});

export const requestLogout = () => ({ type: REQUEST_LOGOUT });

export const requestRegister = ({ email, password, passwordConfirm }) => ({
  type: REQUEST_REGISTER,
  email,
  password,
  passwordConfirm,
});

// SELECTORS
export const loadingSelector = (state) => state.auth.loading;
export const userSelector = (state) => state.auth.user;
export const apiErrorSelector = (state) => state.auth.error;
export const registerSuccessSelector = (state) => state.auth.registerSuccess;
export const loginSuccessSelector = (state) => state.auth.loginSuccess;
export const logoutSuccessSelector = (state) => state.auth.logoutSuccess;
export const loggedInSelector = (state) => !!state.auth.user;

// SAGAS
export function* requestLoginSaga({ email, password }) {
  try {
    const { user, token } = yield call(login, { email, password });
    if (typeof window !== 'undefined')
      window.localStorage.setItem('auth_user', JSON.stringify(user));
    yield put({ type: REQUEST_LOGIN_SUCCESS, user });
  } catch (error) {
    yield put({
      type: REQUEST_LOGIN_FAILURE,
      error,
    });
  }
}

export function* requestLogoutSaga() {
  try {
    yield call(logout);
    if (typeof window !== 'undefined') window.localStorage.clear();
    yield put({ type: REQUEST_LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: REQUEST_LOGOUT_FAILURE, error });
  }
}

export function* requestRegisterSaga({ email, password, passwordConfirm }) {
  try {
    yield call(register, { email, password, passwordConfirm });
    yield put({ type: REQUEST_REGISTER_SUCCESS });
  } catch (error) {
    yield put({
      type: REQUEST_REGISTER_FAILURE,
      error,
    });
  }
}

export function* saga() {
  yield takeLatest(REQUEST_LOGIN, requestLoginSaga);
  yield takeLatest(REQUEST_LOGOUT, requestLogoutSaga);
  yield takeLatest(REQUEST_REGISTER, requestRegisterSaga);
}

// REDUCER
const initialState = {
  loading: false,
  user: null,
  error: null,
  registerSuccess: false,
  loginSuccess: false,
  logoutSuccess: false,
};

export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case HYDRATE:
      const stateUser = action.payload.auth.user;
      var storedUser;
      if (!action.payload.auth.user && typeof window !== 'undefined') {

        storedUser = JSON.parse(window.localStorage.getItem('auth_user'));

        // if (storedUser.token ===)
      }
      return {
        ...state,
        ...action.payload.auth,
        user: storedUser || stateUser,
      };
    case REQUEST_LOGIN:
      return {
        loginSuccess: false,
        loading: true,
        error: null,
        email: action.email,
        password: action.password,
      };
    case REQUEST_LOGIN_SUCCESS:
      return {
        loading: false,
        loginSuccess: true,
        user: action.user,
      };
    case REQUEST_LOGOUT:
      return {
        ...state,
        loading: true,
        logoutSuccess: false,

      };
    case REQUEST_LOGOUT_SUCCESS:
      return {
        loading: false,
        logoutSuccess: true,
      };
    case REQUEST_REGISTER:
      return {
        loading: true,
        error: null,
        email: action.email,
        password: action.password,
        passwordConfirm: action.passwordConfirm,
      };
    case REQUEST_REGISTER_SUCCESS:
      return {
        loading: false,
        registerSuccess: true,
      };
    case REQUEST_LOGIN_FAILURE:
    case REQUEST_LOGOUT_FAILURE:
    case REQUEST_REGISTER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
