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

function App() {
  return (
    <>
      <Header />
      <main>
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
    </>
  );
}

export default App;
