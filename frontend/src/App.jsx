import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDescription from './pages/ProductDescription';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchProducts();
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoggedIn(true);    }
  }, [userInfo.role]);
  
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5555/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={<ProductsPage products={products} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDescription products={products} />}
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/place_order" element={<OrdersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
