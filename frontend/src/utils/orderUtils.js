import axiosInstance from './axiosInstance';

async function createOrder(
  setError,
  setLoading,
  user,
  newOrder,
  setIsOrderPlaced
) {
  setLoading(true);
  setError(null);
  setIsOrderPlaced(false);

  try {
    const response = await axiosInstance.post('/orders/place_order', {
      newOrder,
    });
    console.log(response);
    if (response.data.orderCreated) {
      setError(null);
      setIsOrderPlaced(true);
    }
  } catch (error) {
    console.log(error);
    setError(error.response.data.message);
  } finally {
    setLoading(false);
  }
}
async function fetchUserOrders(user, setOrders, setError, setIsLoading) {
  try {
    setError(null);
    setIsLoading(true);
    const response = await axiosInstance.get(`/orders/user`);
    if (response.status === 200) {
      setOrders(response.data);
      setError(null);
    }
  } catch (error) {
    setError(error.response.data.error);
    console.error('Error fetching orders:', error);
  } finally {
    setIsLoading(false);
  }
}
async function cancelUserOrder(user, orderId, setError, setIsOrderCanceled) {
  try {
    const response = await axiosInstance.post(
      `/orders/cancel_order/${orderId}`,
      null
    );

    if (response.data.orderCancelled) {
      setIsOrderCanceled(true);
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    console.error('Error canceling order:', error);
    setError('An error occurred while canceling the order. Please try again.');
  }
}
export { createOrder, fetchUserOrders, cancelUserOrder };
