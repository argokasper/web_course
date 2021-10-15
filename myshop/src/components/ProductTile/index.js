import Link from 'next/link';

import styles from './ProductTile.module.css';

const ProductTile = ({
    product,
}) => {

    // SOME JS CODE

    return (
        <Link href={`/tooted/${product.slug}`} className={styles.wrapper}>
            {product.title}
        </Link>
    );
};

export default ProductTile;
