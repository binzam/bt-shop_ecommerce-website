import { Route, Routes, useLocation } from 'react-router-dom';
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
import UserProfilePage from './pages/UserProfilePage/UserProfilePage.jsx';
import CheckoutSuccess from './pages/CheckoutPage/CheckoutSuccess/CheckoutSuccess.jsx';
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className='App'>
      <Header />
      <main className="main_content">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/products/categories/:category"
            element={<ProductsPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDescription />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout_success" element={<CheckoutSuccess />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users/:id" element={<UserProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
