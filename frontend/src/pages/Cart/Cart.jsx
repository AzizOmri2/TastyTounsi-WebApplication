import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);

  const navigate = useNavigate();

  // Check if cart is empty
  const isEmpty = Object.values(cartItems).every(quantity => quantity === 0);

  return (
    <div className='cart'>
        <h2>My Cart</h2>
        {isEmpty ? (
        <div className="empty-cart">
          <FaShoppingCart size={80} />
          <h2>Your cart is empty</h2>
          <p>Add some delicious food to your cart to get started!</p>
          <button className="btn-home" onClick={() => window.location.href = '/'}>Return to Home</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br/>
            <hr/>
            {food_list.map((item) => {
                if(cartItems[item._id] > 0){
                    return (
                        <div key={item._id}>
                            <div className="cart-items-title cart-items-item">
                                <img src={url+"/images/"+item.image} alt="" />
                                <p>{item.name}</p>
                                <p>{item.price} <strong>TND</strong></p>
                                <p>{cartItems[item._id]}</p>
                                <p>{item.price*cartItems[item._id]} <strong>TND</strong></p>
                                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                            </div>
                            <hr/>
                        </div>
                    )
                }
            })}
          </div>

          <div className="cart-bottom">
            <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>{getTotalCartAmount()} <strong>TND</strong></p>
                    </div>
                    <hr/>
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>{getTotalCartAmount()===0?0:2} <strong>TND</strong></p>
                    </div>
                    <hr/>
                    <div className="cart-total-details">
                        <p>Total</p>
                        <p>{getTotalCartAmount()===0?0:getTotalCartAmount()+2} <strong>TND</strong></p>
                    </div>
                </div>
                <button onClick={()=>navigate('/order')} >PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-promocode">
                <div>
                    <p>If you have a promo code, enter it here</p>
                    <div className="cart-promocode-input">
                        <input type="text" placeholder='Promo code here'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default Cart