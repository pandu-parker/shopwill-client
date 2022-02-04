import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDeals } from '../../actions/dealsActions';
import Product from './Product';

import './styles.scss'

const Deals = () => {
  const dispatch = useDispatch();
  const dealsList = useSelector(state => state.dealsList);
  const { deals } = dealsList;
  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);
  return (
    <div className='deals-container'>
      Deals:
      <div className='deals'>
        {deals &&
          deals.map(deal => {
            return <Product key={deal._id} deal={deal} />;
          })}
      </div>
    </div>
  );
};

export default Deals;
