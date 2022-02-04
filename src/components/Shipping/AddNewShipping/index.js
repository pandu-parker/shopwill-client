import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addShippingAddress } from '../../../actions/shippingActions';

import './styles.scss';
const AddNewShipping = ({ setAddNew }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      addShippingAddress({ shippingAddress: { city, address, postalCode } })
    );
    setAddNew(false);
  };
  return (
    <div className='add-new-container'>
      <form action='' onSubmit={submitHandler}>
        <div className='form-element'>
          <label htmlFor=''>Address:</label>
          <input
            type='text'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className='form-element'>
          <label htmlFor=''>City:</label>
          <input
            type='text'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>
        <div className='form-element'>
          <label htmlFor=''>PostalCode:</label>
          <input
            type='text'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
        </div>
        {/* <div>
                <label htmlFor="">Country</label>
                <input type="text" />
            </div> */}
        <div className='button-container'>
          <button className='button cancel' onClick={e =>setAddNew(false)}>Cancel</button>
          <button className='button submit' type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewShipping;
