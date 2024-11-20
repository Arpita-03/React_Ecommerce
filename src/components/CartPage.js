import React from 'react';
import { useCart } from '../context/CartContext';
import { Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleChangeQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    updateQuantity(itemId, quantity);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
        Your Cart
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {cart.length === 0 ? (
          <Typography>No items in the cart</Typography>
        ) : (
          cart.map(item => (
            <Grid item xs={12} key={item.id}>
              <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1">${item.price.toFixed(2)}</Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleChangeQuantity(item.id, parseInt(e.target.value))}
                  sx={{ width: '100px', marginRight: 2 }}
                />
                <Button variant="outlined" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      {cart.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Total: ${totalPrice}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={clearCart}>
              Clear Cart
            </Button>
            <Link to="/">
              <Button variant="outlined" color="secondary" sx={{ marginLeft: '10px' }}>
                Continue Shopping
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default CartPage;
