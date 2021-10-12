import ProductTile from '../ProductTile';

import styles from './ProductsBlock.module.css';

import EXAMPLE_PRODUCT from '../../models/product';

const ProductsBlock = ({
  show = 9,
  products = [],
  showPlaceholderWhenEmpty = false,
}) => {
  // SOME JS CODE

  return (
    <div className={styles.productsWrapper}>
      {/* SEE ON JS KOMMENTAAR */}
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
      {showPlaceholderWhenEmpty && products.length === 0 && <ProductTile product={EXAMPLE_PRODUCT} />}
    </div>
  );
};

export default ProductsBlock;
