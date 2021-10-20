import { call, put, takeLatest } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';

const API_HOST = 'http://localhost:3000/api';

// API requests:
const getProduct = async ({ slug }) => {

  const response = await fetch(`${API_HOST}/products/${slug}`);
  const productResponse = await response.json();
  return {
    product: productResponse?.product,
  };
};

// ACTION TYPES
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const REQUEST_PRODUCT_SUCCESS = 'REQUEST_PRODUCT_SUCCESS';
export const REQUEST_PRODUCT_FAILURE = 'REQUEST_PRODUCT_FAILURE';

// ACTIONS
export const requestProduct = ({
  slug,
}) => ({
  type: REQUEST_PRODUCTS,
  slug
});

// SELECTORS
export const productSelector = (state) => state.product.product;
export const loadingSelector = (state) => state.products.loading;
export const metaSelector = (state) => state.products.meta;

// SAGAS
export function* requestProductSaga({
  slug,
}) {
  try {
    const { product } = yield call(getProduct, {
      slug,
    });
    yield put({ type: REQUEST_PRODUCT_SUCCESS, product });
  } catch (err) {
    yield put({ type: REQUEST_PRODUCT_FAILURE, error: err });
  }
}

export function* saga() {
  yield takeLatest(REQUEST_PRODUCT, requestProductSaga);
}

// REDUCER
const initialState = {
  product: null,
  loading: false,
  error: null,
  meta: {},
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.product,
      };
    case REQUEST_PRODUCT:
      return {
        ...state,
        product: null,
        loading: true,
        error: null,
      };
    case REQUEST_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product,
        loading: false,
      };
    case REQUEST_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
