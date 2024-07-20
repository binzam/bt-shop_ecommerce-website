import { Route, Routes, useLocation } from 'react-router-dom';
import { ProductContextProvider } from './contexts/ProductContext.jsx';
import { NavContextProvider } from './contexts/NavContext.jsx';
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
import UserModal from './components/Header/UserModals/UserModal.jsx';
import LoginSignupButtons from './components/Header/LoginSignupButtons.jsx';
import LoginForm from './components/Forms/LoginForm.jsx';
import RegisterForm from './components/Forms/RegisterForm.jsx';
import ForgotPasswordForm from './components/Forms/ForgotPasswordForm.jsx';
import PasswordResetForm from './components/Forms/PasswordResetForm.jsx';
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <NavContextProvider>
      <Header />
      <main className="main_content">
        <ProductContextProvider>
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
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auth" element={<UserModal />}>
              <Route index element={<LoginSignupButtons />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="forgot_password" element={<ForgotPasswordForm />} />
              <Route
                path="password_reset/:token"
                element={<PasswordResetForm />}
              />
            </Route>
          </Routes>
        </ProductContextProvider>
      </main>
      <Footer />
    </NavContextProvider>
  );
}

export default App;
