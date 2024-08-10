import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axiosInstance from '../utils/axiosInstance';

const useOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await axiosInstance.get('/admin/orders');
        if (data) {
          setOrders(data.allOrders);
          setOrdersError(null);
        } else {
          setOrders([]);
        }
      }
    } catch (error) {
      console.log(error);
      setOrdersError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    fetchOrders();
  }, [user, fetchOrders]);

  const removeOrder = useCallback(
    async (orderId) => {
      setLoading(true);
      try {
        const response = await axiosInstance.delete(
          `/admin/remove_order/${orderId}`
        );
        if (response.data.orderRemoved) {
          fetchOrders();
          setOrdersError(null);
        }
      } catch (error) {
        setOrdersError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [ fetchOrders]
  );

  const updateOrders = (updatedOrders) => {
    setOrders(updatedOrders);
  };
  return {
    orders,
    ordersError,
    loading,
    fetchOrders,
    removeOrder,
    updateOrders,
  };
};

export default useOrders;
