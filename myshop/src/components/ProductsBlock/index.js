import { useEffect, useState } from 'react';

import ProductTile from '../ProductTile';
import EXAMPLE_PRODUCT from '../../models/product';

import styles from './ProductsBlock.module.css';

const ProductsBlock = ({
  show = 9,
  products,
  showPlaceholderWhenEmpty = false,
}) => {
  const [hasMoreProducts, setHasMoreProducts] = useState(false);
  const [croppedProducts, setCroppedProducts] = useState([]);

  useEffect(() => {
    setCroppedProducts(products.slice(0, show - 1));
  }, [products.length]);

  useEffect(() => {
    setHasMoreProducts(croppedProducts.length < products.length);
  }, [croppedProducts.length]);

  return (
    <div className={styles.productsWrapper}>
      {/* SEE ON JS KOMMENTAAR */}
      {croppedProducts.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
      {showPlaceholderWhenEmpty && products.length === 0 && (
        <ProductTile product={EXAMPLE_PRODUCT} />
      )}
      {hasMoreProducts && (
        <div className={styles.seeMore}>Vaata veel tooteid</div>
      )}
    </div>
  );
};

export default ProductsBlock;
