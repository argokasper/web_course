import { combineReducers } from 'redux';

import { reducer as auth } from './services/auth';
import { reducer as category } from './services/category';
import { reducer as categories } from './services/categories';
import { reducer as product } from './services/product';
import { reducer as products } from './services/products';

export default combineReducers({
  auth,
  category,
  categories,
  product,
  products,
});
