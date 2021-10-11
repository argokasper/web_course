import ProductTile from '../ProductTile';

import styles from './ProductsBlock.module.css';

const ProductsBlock = ({
    show = 9,
    products = [],
}) => {

    // SOME JS CODE

    return (
        <div className={styles.productsWrapper}>
            {/* SEE ON JS KOMMENTAAR */}
            {products.map(product => <ProductTile key={product.id} product={product} />)}
        </div>
    );
};

export default ProductsBlock;
