import React, { useState, useEffect } from 'react';
import { menuItems } from '../data/menuData';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});

  // Load favorites from localStorage initially
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('menuFavorites')) || [];
    setFavorites(savedFavorites);
    
    // Simulate loading ratings (in real app, fetch from backend)
    const initialRatings = {};
    menuItems.forEach(item => {
      initialRatings[item.id] = Math.floor(Math.random() * 5) + 1; // Random rating 1-5
    });
    setRatings(initialRatings);
    setLoading(false);
  }, []);

  // Categories for filtering
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  
  // Filter items by selected category
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Toggle favorite status
  const toggleFavorite = async (item) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    let newFavorites;

    if (isFavorite) {
      // Remove from favorites
      newFavorites = favorites.filter(fav => fav.id !== item.id);
    } else {
      // Add to favorites
      newFavorites = [...favorites, item];
    }

    setFavorites(newFavorites);
    localStorage.setItem('menuFavorites', JSON.stringify(newFavorites));

    // API call to backend to save favorite
    try {
      const response = await fetch('http://localhost:5000/api/menu/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          menuItemId: item.id,
          action: isFavorite ? 'remove' : 'add'
        })
      });

      const result = await response.json();
      if (result.success) {
        console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      }
    } catch (error) {
      console.error('Favorite update error:', error);
    }
  };

  // Add rating to menu item
  const addRating = async (itemId, rating) => {
    try {
      const response = await fetch('http://localhost:5000/api/menu/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          menuItemId: itemId,
          rating: rating
        })
      });

      const result = await response.json();
      if (result.success) {
        setRatings(prev => ({
          ...prev,
          [itemId]: rating
        }));
      }
    } catch (error) {
      console.error('Rating error:', error);
    }
  };

  // Calculate total cart amount
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Update quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  if (loading) {
    return <div className="menu-section">Loading menu...</div>;
  }

  return (
    <section className="menu-section" id="menu"> {/* Add an id to the section for scrolling */}
      <div className="container">
        <h2>Our Menu</h2>
        
        {/* Category Filters */}
        <div className="menu-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.map((item, index) => {
            const isFavorite = favorites.some(fav => fav.id === item.id);
            const itemRating = ratings[item.id] || 0;

            return (
              <div key={item.id} className="menu-item">
                <div className="item-header">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiM2NjYiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  
                  {/* Favorite Button */}
                  <button 
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(item)}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite ? '❤️' : '🤍'}
                  </button>
                </div>
                
                <div className="menu-item-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  
                  {/* Rating Stars */}
                  <div className="rating-section">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span 
                          key={star} 
                          className={star <= itemRating ? 'star filled' : 'star'}
                          onClick={() => addRating(item.id, star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="rating-number">({itemRating}/5)</span>
                  </div>
                  
                  <div className="menu-item-footer">
                    <span className="price">AED {item.price}</span>
                    <button 
                      className="add-to-cart" 
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shopping Cart Sidebar */}
        {cart.length > 0 && (
          <div className="shopping-cart-sidebar">
            <h3>Shopping Cart ({cart.length} items)</h3>
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">AED {item.price}</span>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <span className="item-total">AED {(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-total-section">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>AED {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax:</span>
                <span>AED {(calculateTotal() * 0.05).toFixed(2)}</span>
              </div>
              <div className="total-row total-final">
                <strong>Total:</strong>
                <strong>AED {(calculateTotal() * 1.05).toFixed(2)}</strong>
              </div>
            </div>
            
            {/* Updated Checkout Button: Uses Link to navigate to /checkout */}
            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
            
            {/* Updated View Favorites Button: Uses regular anchor link */}
            <button className="view-favorites-btn" onClick={() => document.getElementById('favorites-section-anchor').scrollIntoView({ behavior: 'smooth' })}>
              View Favorites ({favorites.length})
            </button>
          </div>
        )}

        {/* Favorites Section - Added anchor div */}
        <div id="favorites-section-anchor"></div> {/* Anchor point for smooth scrolling */}
        {favorites.length > 0 && (
          <div className="favorites-section" id="favorites">
            <h3>Your Favorites ({favorites.length})</h3>
            <div className="favorites-grid">
              {favorites.map(item => (
                <div key={item.id} className="favorite-item">
                  <img src={item.image} alt={item.name} />
                  <div className="favorite-item-info">
                    <h4>{item.name}</h4>
                    <p>AED {item.price}</p>
                    <button 
                      className="add-to-cart-small"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
