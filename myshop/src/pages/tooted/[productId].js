import styles from '../../styles/Products.module.css';

const Product = ({ product }) => {
  // SOME JS CODE
  return (
    <div className={styles.wrapper}>
      <pre>{JSON.stringify(product)}</pre>
    </div>
  );
};

Product.getInitialProps = async ({ req, query }) => {
    var url = null;
    if (req) {
        url = `http://${req.headers.host}/api/products/${query.productId}`;
    } else {
        url = `/api/products/${query.productId}`;
    }

    var product = null;
    try {
        const response = await fetch(url);
        product = await response.json();
    } catch (err) {
        console.error(err);
    }

  return {
    product,
  };
};

export default Product;
