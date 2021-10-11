import styles from './Products.module.css';

const Product = ({
    product,
}) => {

    // SOME JS CODE

    return (
        <div className={styles.wrapper}>
            <pre>{JSON.stringify(product)}</pre>
        </div>
    );
};

export default Product;
