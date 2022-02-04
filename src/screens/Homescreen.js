import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/HomeScreen.scss';

import Deals from '../components/Deals';
import { getProducts } from '../actions/productActions';
import { getBanners } from '../actions/homepageActions';

const Homescreen = () => {
  const dispatch = useDispatch();
  const bannersData = useSelector((state) => state.banners);
  const { banners } = bannersData;
  let top = {};
  let bottomRight = {};
  let bottomLeft = {};
  if (banners && Array.isArray(banners)) {
    top = banners.find((banner) => banner.space === 'top');
    bottomRight = banners.find((banner) => banner.space === 'bottom-right');
    bottomLeft = banners.find((banner) => banner.space === 'bottom-left');
  }
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBanners());
  }, [dispatch]);
  return (
    <div>
      <div className='container'>
        <div className='banner'>
          {Array.isArray(banners) && (
            <Link to={top.link || ''}>
              <img src={top.image} alt='' />
            </Link>
          )}
        </div>
        <div className='banner-lower'>
          <Link to={bottomLeft.link || ''}>
            <img src={bottomLeft.image} alt='' />
          </Link>
          <Link to={bottomRight.link || ''}>
            <img src={bottomRight.image} alt='' />
          </Link>
        </div>
            <Deals />
      </div>
    </div>
  );
};

export default Homescreen;
