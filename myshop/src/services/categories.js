import { call, put, takeLatest } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';

import { getPrices } from '@/api/api';

// ACTION TYPES
export const REQUEST_DATA = 'REQUEST_DATA';
export const REQUEST_DATA_SUCCESS = 'REQUEST_DATA_SUCCESS';
export const REQUEST_DATA_FAILURE = 'REQUEST_DATA_FAILURE';

export const SET_SEARCH = 'SET_SEARCH';
export const SET_PRICE_CHANGE_FILTER = 'SET_PRICE_CHANGE_FILTER';
export const SET_AUTO_REFRESH = 'SET_AUTO_REFRESH';
export const SET_REMAINING_SECONDS = 'SET_REMAINING_SECONDS';

// ACTIONS
export const requestData = ({
  search, limit, page, orderBy, sortOrder, priceChangeFilter,
}) => ({
  type: REQUEST_DATA,
  search,
  limit,
  page,
  orderBy,
  sortOrder,
  priceChangeFilter,
});
export const setSearch = (search) => ({
  type: SET_SEARCH,
  search,
});
export const setPriceChangeFilter = (priceChangeFilter) => {
  if (typeof window !== 'undefined') window.localStorage.setItem('filterByPrice', priceChangeFilter);
  return {
    type: SET_PRICE_CHANGE_FILTER,
    priceChangeFilter,
  };
};

export const setAutoRefresh = (autoRefresh) => {
  if (typeof window !== 'undefined') window.localStorage.setItem('autoRefresh', autoRefresh);
  return {
    type: SET_AUTO_REFRESH,
    autoRefresh,
  };
};
export const setRemainingSeconds = (remainingSeconds) => ({
  type: SET_REMAINING_SECONDS,
  remainingSeconds,
});

// SELECTORS
export const dataSelector = (state) => state.tableData.data;
export const loadingSelector = (state) => state.tableData.loading;
export const metaSelector = (state) => state.tableData.meta;
export const searchSelector = (state) => state.tableData.search;
export const priceChangeFilterSelector = (state) => state.tableData.priceChangeFilter;

export const autoRefreshSelector = (state) => state.tableData.autoRefresh;
export const remainingSecondsSelector = (state) => state.tableData.remainingSeconds;

// SAGAS
export function* requestDataSaga({
  search, page = 1, limit = 20, orderBy = 'price_change', sortOrder, priceChangeFilter,
}) {
  try {
    const { data, meta } = yield call(getPrices, {
      search, limit, page, sortBy: orderBy, sortOrder, priceChangeFilter,
    });
    yield put({ type: REQUEST_DATA_SUCCESS, data, meta });
  } catch (err) {
    yield put({ type: REQUEST_DATA_FAILURE, error: err });
  }
}

export function* saga() {
  yield takeLatest(REQUEST_DATA, requestDataSaga);
}

// REDUCER
const initialState = {
  data: [],
  loading: false,
  error: null,
  meta: {},
  search: null,
  priceChangeFilter: false,
  autoRefresh: false,
  remainingSeconds: 15,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      let priceChangeFilter = false; // eslint-disable-line no-case-declarations
      let autoRefresh = false; // eslint-disable-line no-case-declarations
      if (typeof window !== 'undefined') priceChangeFilter = localStorage.getItem('filterByPrice') === 'true';
      if (typeof window !== 'undefined') autoRefresh = localStorage.getItem('autoRefresh') === 'true';
      return {
        ...state,
        ...action.payload.tableData,
        priceChangeFilter,
        autoRefresh,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case SET_PRICE_CHANGE_FILTER:
      return {
        ...state,
        priceChangeFilter: action.priceChangeFilter,
      };
    case SET_AUTO_REFRESH:
      return {
        ...state,
        autoRefresh: action.autoRefresh,
        remainingSeconds: 15,
      };
    case SET_REMAINING_SECONDS:
      return {
        ...state,
        remainingSeconds: action.remainingSeconds,
      };
    case REQUEST_DATA:
      return {
        ...state,
        data: action.page > 1 ? state.data : [],
        priceChangeFilter: action.priceChangeFilter,
        loading: true,
        error: null,
      };
    case REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.meta.current_page > 1 ? state.data.concat(action.data) : action.data,
        meta: action.meta,
        loading: false,
      };
    case REQUEST_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

