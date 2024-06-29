import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProductDescription from './pages/ProductDescription/ProductDescription';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ProductContextProvider } from './contexts/ProductContext';

function App() {
  return (
    <ProductContextProvider>
      <Header />
      <main className="main_content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDescription />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/place_order" element={<OrdersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
      <Footer />
    </ProductContextProvider>
  );
}

export default App;
