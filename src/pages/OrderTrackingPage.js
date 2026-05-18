import React, { useState, useEffect } from 'react';

const OrderTrackingPage = () => {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/orders/customer/${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.error || 'Failed to fetch orders.');
      }
    } catch (err) {
      setError('An error occurred while fetching orders.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optionally, fetch orders if email is already stored in state/localStorage
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="order-tracking-page container">
      <h2>Track Your Order</h2>
      <div className="track-form">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchOrders} disabled={loading}>
          {loading ? 'Searching...' : 'Track Orders'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {orders.length > 0 ? (
        <div className="orders-list">
          <h3>Your Orders</h3>
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <h4>Order #{order.id}</h4>
              <p><strong>Status:</strong> <span className={`status-${order.order_status}`}>{order.order_status}</span></p>
              <p><strong>Payment:</strong> <span className={`status-${order.payment_status}`}>{order.payment_status}</span></p>
              <p><strong>Total:</strong> AED {order.total_amount}</p>
              <p><strong>Placed:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No orders found for this email address.</p>
      )}
    </div>
  );
};

export default OrderTrackingPage;