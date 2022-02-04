import React from 'react';
import { useDispatch } from 'react-redux';

import './styles.scss';
import { deleteShippingAddress } from '../../../actions/shippingActions';

const ShippingAddress = ({
  city,
  postalCode,
  country,
  address,
  active,
  setActive,
  _id,
}) => {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteShippingAddress(_id));
  };
  return (
    <div className={`shipping-item ${active === _id ? 'active' : ''}`}>
      <p>Address:</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{postalCode}</p>
      <div className='button-container'>
        <button className={`button ${active === _id ? 'disabled' : 'primary'}`} onClick={e => setActive(_id)}>
          Deliver here
        </button>
        <button className='button delete' onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShippingAddress;
