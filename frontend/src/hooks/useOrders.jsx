import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await axios.get('http://localhost:5555/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
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
        const response = await axios.delete(
          `http://localhost:5555/api/orders/remove_order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.data.orderRemoved) {
          fetchOrders();
          setOrdersError(null)
        }
      } catch (error) {
        setOrdersError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [user, fetchOrders]
  );

  const updateOrders = (updatedOrders) => {
    setOrders(updatedOrders);
  };
  return { orders, ordersError, loading, fetchOrders, removeOrder, updateOrders };
};

export default useOrders;
