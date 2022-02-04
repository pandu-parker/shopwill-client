import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getOrders } from '../actions/orderActions';
import Order from '../components/Order';

const OrdersScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    const ordersReducer = useSelector(state => state.orders)
    const { orders } = ordersReducer
    return (
        <div className='container'>
            {orders && Array.isArray(orders) && orders.length ?
                orders.map(order => {
                    return <Order key={order._id} order={order}/>
                })
             : <div>No orders yet...</div>
             }
        </div>
    )
}

export default OrdersScreen