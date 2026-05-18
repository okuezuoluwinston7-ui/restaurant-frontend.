// frontend/src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router-dom
// import { CartContext } from '../context/CartContext'; // Assuming you have a cart context

// For now, we'll simulate getting the cart from props or local state if no context
// Replace this with actual cart retrieval logic
const mockCart = [
  { id: 1, name: 'Sample Item 1', price: 15.00, quantity: 2 },
  { id: 2, name: 'Sample Item 2', price: 10.50, quantity: 1 }
];

const CheckoutPage = () => {
  // const { cart, clearCart } = useContext(CartContext); // Get cart from context
  const cart = mockCart; // Replace with context usage later
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Or 'card' later

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = subtotal * 0.05; // Example tax
  const totalAmount = subtotal + taxAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      setIsSubmitting(false);
      return;
    }

    // Prepare order data
    const orderData = {
      ...formData,
      order_items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      payment_status: paymentMethod === 'card' ? 'pending' : 'pending' // Cash is pending until delivered/picked up
    };

    try {
      // Call backend API to create order
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Order placed successfully!');
        // clearCart(); // Clear the cart after successful order (use context if available)
        navigate('/order-success'); // Navigate to success page
      } else {
        alert(`Order failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert('An error occurred while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return <div className="checkout-page">Your cart is empty. <a href="/">Go back to menu</a>.</div>;
  }

  return (
    <div className="checkout-page container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Delivery Information</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Delivery Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Special Instructions (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Payment Method</h3>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            {/* Uncomment when card integration is ready */}
            {/* <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay with Card (Coming Soon)
            </label> */}
          </div>
        </div>

        <div className="form-section">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (5%)</span>
            <span>AED {taxAmount.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <strong>Total</strong>
            <strong>AED {totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        <button
          type="submit"
          className="confirm-order-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;