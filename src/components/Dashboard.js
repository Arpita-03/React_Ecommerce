import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button, Box, Pagination } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const { products, loading, error, totalProducts } = useProducts('', page, 10);
  const { addToCart } = useCart();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  const totalPages = Math.ceil(totalProducts / 10);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '24px', fontWeight: 'bold', color: 'black', width: '100%', textAlign: 'left', marginLeft: '150px', marginBottom: '5px' }}>
        Featured Products
      </Typography>

      <Box sx={{ width: '90%', height: '1px', backgroundColor: '#ddd', margin: '0 auto 20px auto' }} />

      <Grid container spacing={2} sx={{ maxWidth: '1200px', width: '100%' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" height="200" image={product.imageUrl} alt={product.title} />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>${product.price.toFixed(2)}</Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" sx={{ marginTop: 3 }} />
    </Box>
  );
};

export default Dashboard;
