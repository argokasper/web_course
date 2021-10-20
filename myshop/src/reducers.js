import { combineReducers } from 'redux';

import { reducer as auth } from './services/auth';
import { reducer as categories } from './services/categories';
import { reducer as products } from './services/products';

export default combineReducers({
  auth,
  categories,
  products,
});
