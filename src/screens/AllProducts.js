import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../actions/productActions';
import Product from '../components/Product';

import '../styles/AllProducts.scss';

const AllProducts = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { products } = productList;
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='container all-products'>
      <div className='product-list-container'>
        <div className='filters'>Filter</div>
        <div className='product-container'>
          <ul className='product-list'>
            {Array.isArray(products) &&
              products.map(product => {
                return <Product product={product} />;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
