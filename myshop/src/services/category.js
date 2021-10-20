import { call, put, takeLatest } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';

const API_HOST = 'http://localhost:3000/api';

// API requests:
const getCategory = async ({ slug }) => {
  const response = await fetch(`${API_HOST}/categories/${slug}/products`);
  const categoryResponse = await response.json();
  return {
    category: categoryResponse?.category,
    products: categoryResponse?.products,
  };
};

// ACTION TYPES
export const REQUEST_CATEGORY = 'REQUEST_CATEGORY';
export const REQUEST_CATEGORY_SUCCESS = 'REQUEST_CATEGORY_SUCCESS';
export const REQUEST_CATEGORY_FAILURE = 'REQUEST_CATEGORY_FAILURE';

// ACTIONS
export const requestCategory = ({
  slug,
}) => ({
  type: REQUEST_CATEGORY,
  slug,
});

// SELECTORS
export const categorySelector = (state) => state.category.category;
export const categoryProductsSelector = (state) => state.category.products;
export const loadingSelector = (state) => state.category.loading;
export const metaSelector = (state) => state.category.meta;

// SAGAS
export function* requestCategorySaga({
  slug
}) {
  try {
    const { category, products } = yield call(getCategory, {
      slug,
    });
    yield put({ type: REQUEST_CATEGORY_SUCCESS, category, products });
  } catch (err) {
    yield put({ type: REQUEST_CATEGORY_FAILURE, error: err });
  }
}

export function* saga() {
  yield takeLatest(REQUEST_CATEGORY, requestCategorySaga);
}

// REDUCER
const initialState = {
  category: null,
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
        ...action.payload.category,
      };
    case REQUEST_CATEGORY:
      return {
        ...state,
        category: null,
        products: [],
        loading: true,
        error: null,
      };
    case REQUEST_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.category,
        products: action.products,
        meta: action.meta,
        loading: false,
      };
    case REQUEST_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
