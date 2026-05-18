import React, { useState, useEffect } from 'react';

const CustomerOrderForm = ({ menuItems, onOrderSubmit }) => {
  // State management
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderType, setOrderType] = useState('dine_in');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.itemId === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.itemId === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        totalPrice: item.price
      }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.itemId !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item =>
      item.itemId === itemId
        ? { 
            ...item, 
            quantity: newQuantity,
            totalPrice: item.price * newQuantity
          }
        : item
    ));
  };

  // Calculate total amount
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        customer_id: 1, // Get from authentication later
        location_id: 1,
        table_id: orderType === 'dine_in' ? 1 : null,
        order_type: orderType,
        items: cart,
        total_amount: calculateTotal(),
        special_instructions: specialInstructions,
        payment_method: paymentMethod,
        ...customerInfo
      };

      // API call to backend
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Order placed successfully! Order Number: ${result.order.order_number}`);
        setCart([]);
        setSpecialInstructions('');
        onOrderSubmit && onOrderSubmit(result);
      } else {
        alert('Order failed: ' + result.error);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="customer-order-form">
      <h2>Place Your Order</h2>
      
      {/* Order Type Selection */}
      <div className="order-type-selector">
        <label>Order Type:</label>
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="dine_in">Dine In</option>
          <option value="takeout">Takeout</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>

      {/* Menu Items Selection */}
      <div className="menu-selection">
        <h3>Menu Items</h3>
        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p className="price">${item.price}</p>
                <button onClick={() => addToCart(item)} className="add-to-cart">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Cart */}
      <div className="cart-section">
        <h3>Shopping Cart ({cart.length} items)</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.itemId} className="cart-item">
                <span>{item.name}</span>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.itemId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.itemId, item.quantity + 1)}>+</button>
                </div>
                <span>${item.totalPrice.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.itemId)} className="remove-btn">Remove</button>
              </div>
            ))}
            <div className="cart-total">
              <strong>Total: ${calculateTotal().toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="order-form">
        <div className="customer-info">
          <h3>Customer Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
            required
          />
          {orderType === 'delivery' && (
            <textarea
              placeholder="Delivery Address"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              required
            />
          )}
        </div>

        <div className="order-details">
          <h3>Order Details</h3>
          <textarea
            placeholder="Special instructions (allergies, cooking preferences, etc.)"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
          
          <div className="payment-section">
            <label>Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="card">Credit Card</option>
              <option value="cash">Cash on Delivery</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting || cart.length === 0}>
          {isSubmitting ? 'Placing Order...' : `Place Order - $${calculateTotal().toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default CustomerOrderForm;