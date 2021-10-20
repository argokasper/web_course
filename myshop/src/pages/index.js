import Head from 'next/head';
import { useEffect } from 'react';
import { END } from 'redux-saga'
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../store';
import CategoriesMenu from '../components/CategoriesMenu';
import ProductsBlock from '../components/ProductsBlock';

// Globaalsete CSS failide import
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import styles from '../styles/Home.module.css';
import { productsSelector, requestProducts } from '../services/products';
import { categoriesSelector, requestCategories } from '../services/categories';


const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const products = useSelector(productsSelector);

  // ühekordne käima panemine
  useEffect(() => {
    // Tahame pärida meie API käest tooteid:
    dispatch(requestProducts({}));

    // Tahame pärida meie API käest kategooriaid:
    dispatch(requestCategories({}));
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.wrapper}>
        <CategoriesMenu categories={categories} />

        <div className={styles.productsBlock}>
          <h2>Kõik tooted</h2>
          <ProductsBlock products={products} show={6} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async ({ req }) => {
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default Home;
