import { all } from 'redux-saga/effects';

import { saga as auth } from './services/auth';
import { saga as categories } from './services/categories';
import { saga as products } from './services/products';

export default function* rootSaga() {
  yield all([
    auth(),
    categories(),
    products(),
  ]);
}
