import Link from 'next/link';

import styles from './ProductTile.module.css';

const ProductTile = ({
    product,
}) => {

    // SOME JS CODE

    return (
        <Link href={`/products/${product.id}`} className={styles.wrapper}>
            {product.title}
        </Link>
    );
};

export default ProductTile;
