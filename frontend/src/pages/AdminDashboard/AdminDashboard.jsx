import { useContext, useEffect, useState } from 'react';
import './AdminDashboard.css';
import ProductsPage from '../ProductsPage/ProductsPage';
import UsersList from './adminComponents/UsersListing/UsersList';
import { useNavigate } from 'react-router-dom';
import OrdersList from './adminComponents/OrderListing/OrdersList';
import AdminPanel from './adminComponents/AdminPanel';
import { useAuthContext } from '../../hooks/useAuthContext';
import Loading from '../../components/Loading';
import { NavContext } from '../../contexts/NavContext';

const AdminDashboard = () => {
  const { isAdmin } = useAuthContext();
  const { toggleCart } = useContext(NavContext);
  const [currentView, setCurrentView] = useState('customers');
  const [isUserAdmin, setIsUserAdmin] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdminStatus = async () => {
      const isAuthorized = await isAdmin();
      setIsUserAdmin(isAuthorized);
      if (isAuthorized === false) {
        navigate('/home');
      }
    };
    checkAdminStatus();
  }, [isAdmin, navigate, toggleCart]);
  const handleViewChange = (view) => setCurrentView(view);

  if (isUserAdmin === null) {
    return <Loading />;
  }
  return (
    <div className="admin_page">
          <h1>Admin Dashboard</h1>
          <AdminPanel
            currentView={currentView}
            onViewChange={handleViewChange}
          />
          {currentView === 'customers' && <UsersList />}
          {currentView === 'orders' && <OrdersList />}
          {currentView === 'products' && <ProductsPage />}
    </div>
  );
};

export default AdminDashboard;
