import Head from 'next/head';
import { useState, useEffect } from 'react';

import CategoriesMenu from '../components/CategoriesMenu';
import ProductsBlock from '../components/ProductsBlock';

// Globaalsete CSS failide import
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import styles from '../styles/Home.module.css';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ühekordne käima panemine
  useEffect(async () => {
    // Tahame pärida meie API käest tooteid:
    try {
      const response = await fetch('/api/products');
      const productsResponse = await response.json();
      setProducts(productsResponse.products);
    } catch (error) {
      console.error(error.message);
      setProducts([]);
    }

    // Tahame pärida meie API käest kategooriaid:
    try {
      const response = await fetch('/api/categories');
      const categoriesResponse = await response.json();
      setCategories(categoriesResponse.categories);
    } catch (error) {
      console.error(error.message);
      setCategories([]);
    }
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

export default Home;
