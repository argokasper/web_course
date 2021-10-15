import Head from 'next/head';
import ProductsBlock from '../../components/ProductsBlock';

const CategoryProductsPage = ({ category, products }) => {

  return (
      <>
        <Head>
            <title>Kõik tooted kategooriast - {category?.name}</title>
        </Head>
        <div>
            <ProductsBlock products={products} />
        </div>
      </>
  );
};

CategoryProductsPage.getInitialProps = async ({ req, query }) => {
    var url = null;
    if (req) {
        url = `http://${req.headers.host}/api/categories/${query.slug}/products`;
    } else {
        url = `/api/categories/${query.slug}/products`;
    }

    var categoryResponse = null;
    try {
        const response = await fetch(url);
        categoryResponse = await response.json();
    } catch (err) {
        console.error(err);
    }

    return {
        category: categoryResponse?.category,
        products: categoryResponse?.products,
    };
};

export default CategoryProductsPage;
