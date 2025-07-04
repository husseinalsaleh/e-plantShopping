import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      // Remove $ sign and convert cost to number
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });
    return total.toFixed(2); // Returns total with 2 decimal places
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Remove $ sign and convert cost to number
    const unitPrice = parseFloat(item.cost.substring(1));
    // Calculate subtotal (price × quantity)
    const subtotal = unitPrice * item.quantity;
    // Format to 2 decimal places
    return subtotal.toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="total_cart_amount">
        Total Amount: ${calculateTotalAmount()}
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="continue_shopping_btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">{item.cost}</div>
                  <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-actions">
            <button className="continue_shopping_btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
            <button className="checkout_btn" onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;


