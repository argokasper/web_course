import Head from 'next/head';
import { useState, useEffect } from 'react';

import ProductsBlock from '../components/ProductsBlock';

const Home = () => {
  const [products, setProducts] = useState([]);

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
  }, []);

  return (
    <>
      <Head>
        <title>MyShop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Kõik tooted</h2>
      <ProductsBlock products={products} show={6} />
    </>
  );
};

export default Home;