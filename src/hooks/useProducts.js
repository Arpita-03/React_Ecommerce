import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = (searchQuery = '', page = 1, limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://dummyjson.com/products', {
          params: { search: searchQuery, page, limit },
        });
        setProducts(response.data.products);
        setTotalProducts(response.data.total);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, page, limit]);

  return { products, loading, error, totalProducts };
};
