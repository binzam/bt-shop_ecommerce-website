import { Route, Routes, useLocation } from 'react-router-dom';
import { ProductContextProvider } from './contexts/ProductContext.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';
import { useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage.jsx';
import ProductDescription from './pages/ProductDescription/ProductDescription';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import OrdersPage from './pages/OrdersPage/OrdersPage.jsx';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicyPage/PrivacyPolicy.jsx';
import Contact from './pages/ContactPage/Contact.jsx';
import About from './pages/AboutPage/About.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return (
    <CartContextProvider>
      <Header />
      <main className="main_content">
        <ProductContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products/categories/:category"
              element={<ProductsPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDescription />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </ProductContextProvider>
      </main>
      <Footer />
    </CartContextProvider>
  );
}

export default App;
