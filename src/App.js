import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Dashboard from './components/Dashboard';
import CartPage from './components/CartPage';
import { Badge, IconButton, InputAdornment, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useProducts } from './hooks/useProducts';

const CartIcon = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <IconButton component={Link} to="/cart" color="inherit" style={{ marginRight: '30px', fontSize: '36px' }}>
      <Badge badgeContent={totalItems} color="secondary">
        <ShoppingCartIcon style={{ fontSize: '36px' }} />
      </Badge>
    </IconButton>
  );
};

const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { products } = useProducts(searchQuery);
  const location = useLocation();

  return (
    <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '36px', fontWeight: 'bold', color: 'black', textTransform: 'uppercase', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', marginLeft: '30px' }}>
        BUY<span style={{ color: '#A9A9A9' }}>MORE.</span>
      </Link>

      {location.pathname === '/' && (
        <TextField
          variant="outlined"
          placeholder="What are you looking for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          style={{
            fontSize: '16px',
            width: '500px',
            backgroundColor: '#f5f5f5',
            marginLeft: '30px',
          }}
          inputProps={{
            style: {
              height: '35px',
              padding: '0 10px',
            },
          }}
        />
      )}

      <CartIcon />
    </div>
  );
};

const App = () => (
  <CartProvider>
    <Router>
      <AppContent />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;
