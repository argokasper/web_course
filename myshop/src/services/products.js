import { call, put, takeLatest } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';

const API_HOST = 'http://localhost:3000/api';

// API requests:
const getProducts = async ({
  categorySlugs,
  limit,
  page,
  sortBy,
  sortOrder,
}) => {
  const response = await fetch(
    `${API_HOST}/products?page=${page}&limit=${limit}&sort_by=${sortBy}&sort_order=${sortOrder}&category_slugs=${categorySlugs.join(
      ','
    )}`
  );
  const productResponse = await response.json();
  return {
    product: productResponse?.product,
  };
};

// ACTION TYPES
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS';
export const REQUEST_PRODUCTS_FAILURE = 'REQUEST_PRODUCTS_FAILURE';

// ACTIONS
export const requestProducts = ({
  categorySlugs,
  limit,
  page,
  orderBy,
  sortOrder,
}) => ({
  type: REQUEST_PRODUCTS,
  categorySlugs,
  limit,
  page,
  orderBy,
  sortOrder,
});

// SELECTORS
export const productsSelector = (state) => state.products.products;
export const loadingSelector = (state) => state.products.loading;
export const metaSelector = (state) => state.products.meta;

// SAGAS
export function* requestProductsSaga({
  categorySlugs,
  page = 1,
  limit = 20,
  orderBy = 'title',
  sortOrder,
}) {
  try {
    const { products, meta = {} } = yield call(getProducts, {
      categorySlugs,
      limit,
      page,
      sortBy: orderBy,
      sortOrder,
    });
    yield put({ type: REQUEST_PRODUCTS_SUCCESS, products, meta });
  } catch (err) {
    yield put({ type: REQUEST_PRODUCTS_FAILURE, error: err });
  }
}

export function* saga() {
  yield takeLatest(REQUEST_PRODUCTS, requestProductsSaga);
}

// REDUCER
const initialState = {
  products: [],
  loading: false,
  error: null,
  meta: {},
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.products,
      };
    case REQUEST_PRODUCTS:
      return {
        ...state,
        products: action.page > 1 ? state.products : [],
        loading: true,
        error: null,
      };
    case REQUEST_PRODUCTS_SUCCESS:
      return {
        ...state,
        products:
          action.meta.current_page > 1
            ? state.products.concat(action.products)
            : action.products,
        meta: action.meta,
        loading: false,
      };
    case REQUEST_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
