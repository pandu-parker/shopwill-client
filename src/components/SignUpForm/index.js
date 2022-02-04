import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader';
import { ReactComponent as LoginSvg } from '../../assets/svgs/LoginWave.svg';
import { ReactComponent as Goods } from '../../assets/svgs/goods.svg';
import { ReactComponent as Logo } from '../../assets/svgs/logo.svg';
import Message from '../Message';
import './style.scss';

import {signUp} from '../../actions/userActions'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const userSignUpReducer = useSelector(state => state.userSignUp)
  const {loading, error, message} = userSignUpReducer;

  const submitHandler = (e) => {
    e.preventDefault();
    if (validator()) {
      setFormError(null);
      dispatch(signUp({name,email,phone,password}))
    }
  };

  const validator = () => {
    if (name === '') {
      setFormError('Name is required');
      return false;
    }
    if (email === '' && phone === '') {
      setFormError('Email or Phone is required');
      return false;
    }
    if (password === '') {
      setFormError('Password is required');
      return false;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords dont match');
      return false;
    }
    return true
  };
  return (
    <>
      {loading && <Loader />}
      <div className='form-container'>
        <div className='form-desc'>
          <div className='wave-svg'>
            <LoginSvg />
          </div>
          <div className='desc-text'>
            <h2>Sign up</h2>
            <p>Get access to our Orders, Wishlists and recommendations</p>
          </div>
          <div className='logo-svg'>
            <Logo />
          </div>
          <div className='goods-svg'>
            <Goods />
          </div>
        </div>
        <form className='login-form' onSubmit={submitHandler}>
          <div className='form-control'>
            {message && <Message variant='success'>{message}</Message>}
            {error && <Message variant='success'>{error}</Message>}
            {formError && <Message>{formError}</Message>}
            <label htmlFor=''>Name</label>
            <input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor=''>Email</label>
            <input
              type='email'
              placeholder='Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className='muted-text'>OR</p>
          <div className='form-control'>
            <label htmlFor=''>Phone</label>
            <input
              type='phone'
              placeholder='Your Phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor=''>Password</label>
            <input
              type='password'
              placeholder='Your Pawword'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor=''>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <span className='muted-text'>
              Already have an account? <Link to='login'>Login</Link>
            </span>
          </div>
          <div className='form-control'>
            <button className='btn-block submit-btn'>Signup</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
