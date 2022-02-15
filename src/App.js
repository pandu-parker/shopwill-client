import './styles/App.scss';
import { useEffect , useState} from 'react';
import axios from 'axios';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Homescreen from './screens/Homescreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import AllProducts from './screens/AllProducts';
import ProfileScreen from './screens/ProfileScreen';
import SearchProductScreen from './screens/SearchProductScreen';
import CartScreen from './screens/CartScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <main>
          <Route path='/cart' component={CartScreen} />
          <Route path='/orders/:id' component={OrderDetailScreen} />
          <Route path='/orders' component={OrdersScreen} exact />
          <Route path='/search' component={SearchProductScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/all-items' component={AllProducts} />
          <Route path='/signup' component={SignupScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductDetailScreen} />
          <Route path='/' component={Homescreen} exact />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
