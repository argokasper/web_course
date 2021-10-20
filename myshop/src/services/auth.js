import { call, put, takeLatest } from 'redux-saga/effects';


// ACTION TYPES
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE';

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_LOGOUT_SUCCESS = 'REQUEST_LOGOUT_SUCCESS';
export const REQUEST_LOGOUT_FAILURE = 'REQUEST_LOGOUT_FAILURE';

export const STATUS_IDLE = 100;
export const STATUS_INVALID_CREDS = 400;
export const STATUS_TOO_MANY_TRIES = 429;

const ERROR_CODES = {
  'auth/user-not-found': STATUS_INVALID_CREDS,
  'auth/wrong-password': STATUS_INVALID_CREDS,
  'auth/too-many-requests': STATUS_TOO_MANY_TRIES,
};

// ACTIONS
export const requestLogin = ({ email, password }) => ({
  type: REQUEST_LOGIN,
  email,
  password,
});

export const requestLogout = () => ({ type: REQUEST_LOGOUT });

// SELECTORS
export const loadingSelector = (state) => state.auth.loading;
export const apiErrorSelector = (state) => state.auth.error;

// SAGAS
export function* requestLoginSaga({ email, password }) {
  try {
    yield put({ type: REQUEST_LOGIN_SUCCESS });
  } catch (error) {
    yield put({
      type: REQUEST_LOGIN_FAILURE,
      error: {
        ...error,
        status: ERROR_CODES[error.code] || 500,
      },
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

export function* saga() {
  yield takeLatest(REQUEST_LOGIN, requestLoginSaga);
  yield takeLatest(REQUEST_LOGOUT, requestLogoutSaga);
}

// REDUCER
const initialState = {
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        loading: true,
        error: null,
        username: action.username,
        password: action.password,
      };
    case REQUEST_LOGIN_SUCCESS:
      return {
        loading: false,
      };
    case REQUEST_LOGOUT_SUCCESS:
      return {
        loading: false,
      };
    case REQUEST_LOGIN_FAILURE:
    case REQUEST_LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error.status,
        loading: false,
      };
    default:
      return state;
  }
};