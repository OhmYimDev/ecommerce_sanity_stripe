import React from 'react'
import { client } from '../lib/client'

//Components
import { HeroBanner, Product, FooterBanner } from '../components'

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Seller Products</h2>
        <p>Speakers There are many variations passages</p>
      </div>

      <div className='products-container'>
        {products.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerquery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerquery);

  return {
    props: { products, bannerData }
  }
}

export default Home
