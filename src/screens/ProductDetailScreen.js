import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProductDetail } from '../actions/productActions';
import { editCart } from '../actions/cartActions';

import '../styles/ProductDetail.scss';
import Rating from '../components/Rating';

const ProductDetailScreen = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  const productDetail = useSelector(state => state.productDetails);
  const { product } = productDetail;
  // set if prod is in cart
  const [isInCart, setIsInCart] = useState(false);

  const cartReducer = useSelector(state => state.cartList);
  const { cart } = cartReducer;
  useEffect(() => {
    if (!product) return;
    if (!product.name || product._id !== id) {
      dispatch(getProductDetail(id));
    }
  }, [id, dispatch]);

  // check if product is already in cart
  useEffect(() => {
    const isPresent = cart.find(item => {
      return item.product._id === product._id;
    });
    if (isPresent) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cart, product]);

  const addToCart = () => {
    console.log('prod', product);
    dispatch(editCart(product._id, 1));
  };
  return (
    <div className='container'>
      <div className='product-container'>
        {product && product._id ? (
          <>
            <figure>
              <img src={product.image} alt='' />
            </figure>
            <div className='product-detail'>
              <h3>{product.name}</h3>
              <p>M.R.P. : ₹{product.price}</p>
              {product.salePrice ? <p>Deal Price: ₹{product.salePrice}</p> : null}
              <p>{product.description}</p>
              <Rating value='4' totalRatings='57' />
              <p>
                <button className='button green'>Buy Now</button>
                {isInCart ? (
                  <Link to='/cart' className='link-button go-to-cart'>
                    Go to cart
                  </Link>
                ) : (
                  <button className='button add-to-cart' onClick={addToCart}>
                    Add to Cart
                  </button>
                )}
              </p>
            </div>
          </>
        ) : (
          <div>Product Not Found</div>
        )}
      </div>
      <div>Reviews</div>
    </div>
  );
};

export default ProductDetailScreen;
