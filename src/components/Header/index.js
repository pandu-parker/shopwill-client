import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { BsSearch } from 'react-icons/bs';
import { AiFillCaretDown, AiOutlineShoppingCart } from 'react-icons/ai';

import { getCategories } from '../../actions/categoryActions';
import { editSearch } from '../../actions/searchActions';
import { logout } from '../../actions/userActions';
import { getCart } from '../../actions/cartActions';
import Category from './components/Category';
import './style.scss';
import { updateLocalStorage } from '../../utils/updateLocalStorage';
import axios from 'axios';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const categoriesReducer = useSelector(state => state.categories);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { categories } = categoriesReducer;
  const cartList = useSelector(state => state.cartList);
  const { cart } = cartList;
  const searchReducer = useSelector(state => state.search);
  const { term: searchTerm } = searchReducer;
  const [searchSuggestions, setSearchSuggestion] = useState([]);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, history]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCart());
    }
  }, [userInfo, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    updateLocalStorage('userInfo', userInfo);
  }, [userInfo]);

  const editSearchTermHandler = e => {
    dispatch(editSearch({ term: e.target.value }));
    if (e.target.value !== '') {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/search?query=${e.target.value}`).then(res => {
        setSearchSuggestion(res.data);
      });
    } else {
      setSearchSuggestion([]);
    }
  };

  const getSearchSuggestions = (e) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/search?query=${e.target.value}`).then(res => {
      setSearchSuggestion(res.data);
    });
  }

  const searchSubmit = e => {
    e.preventDefault();
    history.push(`/search?name=${searchTerm}`);
  };
  return (
    <>
      <nav>
        <div className='container'>
          <h1>
            <Link to='/'>Shopwill</Link>
          </h1>
          <form action='' onSubmit={searchSubmit} className='search-form'>
            <input
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={editSearchTermHandler}
              onClick={getSearchSuggestions}
            />
            <button type='submit'>
              <BsSearch />
            </button>
            <ul className='search-suggestions'>
              {searchTerm !== '' &&
                searchSuggestions &&
                searchSuggestions.map(product => {
                  return (
                    <li className='search-suggestion' onClick={e =>setSearchSuggestion([])}>
                      <Link to={`/search?category=${product.category._id}&name=${product.name}`}>
                        <span>
                        {product.name}
                        </span>
                        <span className='category-name'>
                          in <span>{product.category.name}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </form>
          <ul>
            <li>
              <Link to='/cart' className='cart-icon'>
                <AiOutlineShoppingCart /> <span>{cart.length}</span>
              </Link>
            </li>
            {userInfo && userInfo.token ? (
              <li className='dropdown'>
                <Link to='/profile'>
                  {userInfo.name} <AiFillCaretDown />
                </Link>
                <ul className='dropdown-menu'>
                  <li>
                    <Link to='/profile'>Profile</Link>
                  </li>
                  <li>
                    <Link to='/orders'>Orders</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <Link to='#'>Logout</Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link to='/login'>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className='categories'>
        <div className='container'>
          <ul className='menu'>
            {/* <li>
              <Link to='/all-items'>All Items</Link>
            </li> */}
            {Array.isArray(categories) && categories.length > 0
              ? categories.map(category => (
                  <Category key={category._id} category={category} />
                ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default withRouter(Header);
