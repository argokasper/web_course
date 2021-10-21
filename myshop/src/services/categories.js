import { call, put, takeLatest } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';

const API_HOST = 'http://localhost:3000/api';

// API requests:
const getCategories = async ({ limit, page, sortBy, sortOrder }) => {
  const response = await fetch(`${API_HOST}/categories?page=${page}&limit=${limit}&sort_by=${sortBy}&sort_order=${sortOrder}`);
  return await response.json();
};

// ACTION TYPES
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const REQUEST_CATEGORIES_SUCCESS = 'REQUEST_CATEGORIES_SUCCESS';
export const REQUEST_CATEGORIES_FAILURE = 'REQUEST_CATEGORIES_FAILURE';

// ACTIONS
export const requestCategories = ({ limit, page, orderBy, sortOrder }) => ({
  type: REQUEST_CATEGORIES,
  limit,
  page,
  orderBy,
  sortOrder,
});

// SELECTORS
export const categoriesSelector = (state) => state.categories.categories;
export const loadingSelector = (state) => state.categories.loading;
export const metaSelector = (state) => state.categories.meta;

// SAGAS
export function* requestCategoriesSaga({
  page = 1,
  limit = 20,
  orderBy = 'name',
  sortOrder,
}) {
  try {
    const { categories, meta = {} } = yield call(getCategories, {
      limit,
      page,
      sortBy: orderBy,
      sortOrder,
    });
    yield put({ type: REQUEST_CATEGORIES_SUCCESS, categories, meta });
  } catch (err) {
    yield put({ type: REQUEST_CATEGORIES_FAILURE, error: err });
  }
}

export function* saga() {
  yield takeLatest(REQUEST_CATEGORIES, requestCategoriesSaga);
}

// REDUCER
const initialState = {
  categories: [],
  loading: false,
  error: null,
  meta: {},
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.categories,
      };
    case REQUEST_CATEGORIES:
      return {
        ...state,
        categories: action.page > 1 ? state.categories : [],
        priceChangeFilter: action.priceChangeFilter,
        loading: true,
        error: null,
      };
    case REQUEST_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories:
          action.meta.current_page > 1
            ? state.categories.concat(action.categories)
            : action.categories,
        meta: action.meta,
        loading: false,
      };
    case REQUEST_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
