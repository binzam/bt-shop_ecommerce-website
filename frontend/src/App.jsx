import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDescription from './pages/ProductDescription/ProductDescription';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ProductContextProvider } from './contexts/ProductContext.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.jsx';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main className="main_content">
        <ProductContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDescription />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/place_order" element={<OrdersPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </ProductContextProvider>
      </main>
      <Footer />
    </CartContextProvider>
  );
}

export default App;
