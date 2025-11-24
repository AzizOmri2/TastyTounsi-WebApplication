import React from 'react'
import './MyOrders.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { FaBoxOpen } from 'react-icons/fa'

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data);
    }

    useEffect(()=>{
        fetchOrders();
    },[token])

    const isEmpty = data?.length === 0;

  return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {isEmpty ? (
                    <div className="empty-orders">
                        <FaBoxOpen size={80} />
                        <h2>No Orders Yet</h2>
                        <p>You haven’t placed any orders. Start adding some delicious food!</p>
                        <button className="btn-home" onClick={() => window.location.href = '/'}>Return to Home</button>
                    </div>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.items?.map((item, idx) => 
                                    idx === order.items.length - 1
                                    ? `${item.name} x ${item.quantity}`
                                    : `${item.name} x ${item.quantity}, `
                                )}
                            </p>
                            <p>{order.amount}.00 <strong>TND</strong></p>
                            <p>Items : {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyOrders