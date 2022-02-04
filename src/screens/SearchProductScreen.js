import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { getProducts } from '../actions/productActions';

import '../styles/AllProducts.scss';
import '../styles/SearchProduct.scss';

const SearchProductScreen = ({ location, match, history }) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const searchReducer = useSelector(state => state.search);
  const { term: searchTerm } = searchReducer;

  // Get all categories
  const categoriesReducer = useSelector(state => state.categories);
  const { categories: Allcategories } = categoriesReducer;
  // Get all active categories
  const { products, categories } = productList;
  // Set active catetgories
  const [activeCategories, setActiveCategories] = useState([]);

  // Filter price values
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(50000);

  useEffect(() => {
    dispatch(getProducts(location.search));
  }, [dispatch, location]);

  // get all the categories for filtering
  useEffect(() => {
    if (!categories || !Allcategories) return;
    const currentCategories = Allcategories.filter(category => {
      return categories.categories.includes(category._id);
    });
    currentCategories.map(category => {
      const currentSubcategories = category.subCategories.filter(
        subCategory => {
          return categories.subCategories.includes(subCategory._id);
        }
      );
      category.subCategories = currentSubcategories;
      category.subCategories.forEach(subCat => {
        if (!subCat.minorCategory) return;
        const activeMinorCat = subCat.minorCategory.filter(minorCat => {
          return categories.minorCategories.includes(minorCat._id);
        });
        subCat.minorCategory = activeMinorCat;
      });
    });
    setActiveCategories(currentCategories);
  }, [categories, Allcategories]);

  useEffect(() => {
    // console.log("activeCategories", activeCategories);
  }, [activeCategories]);

  useEffect(() => {
    // console.log("categories", categories);
  }, [categories]);

  const updateQuery = () => {
    history.push(
      `/search?category=612c9d6c58286ba30ce2659a&lt=${high}&gt=${low}`
    );
  };
  const handleQuery = (type, value) => {
    let query = `${type}=${value}`;
    if (searchTerm) {
      query += `&name=${searchTerm}`;
    }
    history.push(`/search?${query}`);
  };
  return (
    <div className='container'>
      <div className='product-list-container'>
        <div className='filters'>
          <h3>Categories</h3>
          <ul className='active-categories'>
            {activeCategories &&
              activeCategories.map(category => {
                return (
                  <li key={category._id}>
                    <button className='major-category'
                      onClick={e => handleQuery('category', category._id)}
                    >
                      {category.name}
                    </button>
                    <ul>
                      {category.subCategories
                        ? category.subCategories.map(subCategory => {
                            return (
                              <li key={subCategory._id}>
                                <button
                                  onClick={e =>
                                    handleQuery('subCategory', subCategory._id)
                                  }
                                >
                                  {subCategory.name}
                                </button>
                                <ul>
                                  {subCategory.minorCategory
                                    ? subCategory.minorCategory.map(
                                        minorCat => {
                                          return (
                                            <li key={minorCat._id}>
                                              <button
                                                onClick={e =>
                                                  handleQuery(
                                                    'minorCategory',
                                                    minorCat._id
                                                  )
                                                }
                                              >
                                                {minorCat.name}
                                              </button>
                                            </li>
                                          );
                                        }
                                      )
                                    : null}
                                </ul>
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </li>
                );
              })}
          </ul>
          <h3>Price</h3>
          <div className='price-inputs'>
            <div className='form-element'>
              <label htmlFor=''>From</label>
              <select
                name=''
                id=''
                value={low}
                onChange={e => setLow(e.target.value)}
              >
                <option value='0'>0</option>
                <option value='2000'>2000</option>
                <option value='5000'>5000</option>
                <option value='10000'>10000</option>
              </select>
            </div>
            <div className='form-element'>
              <label htmlFor=''>To</label>
              <select
                name=''
                id=''
                value={high}
                onChange={e => setHigh(e.target.value)}
              >
                <option value='2000'>2000</option>
                <option value='5000'>5000</option>
                <option value='10000'>10000</option>
                <option value='50000'>50000+</option>
              </select>
              {/* <input
                type='text'
                placeholder='to'
                value={high}
                onChange={e => setHigh(e.target.value)}
              /> */}
            </div>
          </div>
          <ReactSlider
            className='horizontal-slider'
            thumbClassName='example-thumb'
            trackClassName='example-track'
            max={50000}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            disabled
            // renderThumb={(props, state) => (
            //   <div {...props}>{state.valueNow}</div>
            // )}
            pearling
            minDistance={2000}
            value={[low, high]}
          />
          <button className='button' onClick={updateQuery}>
            Apply filter
          </button>
        </div>
        <div className='product-list'>
          <ul className=''>
            {Array.isArray(products) &&
              products.map(product => {
                return <Product key={product._id} product={product} />;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchProductScreen;
