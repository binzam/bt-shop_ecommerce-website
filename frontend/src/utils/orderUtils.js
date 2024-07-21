import axios from 'axios';

async function createOrder(
  setError,
  setLoading,
  user,
  setOrderData,
  newOrder,
  setIsOrderPlaced
) {
  setLoading(true);
  setError(null);
  setIsOrderPlaced(false);

  try {
    const response = await axios.post(
      'http://localhost:5555/api/orders/place_order',
      { newOrder },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response);
    if (response.data.orderCreated) {
      setError(null);
      setIsOrderPlaced(true);
      setOrderData(response.data.order);
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
    const response = await axios.get(
      `http://localhost:5555/api/users/${user.userId}/orders`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      setOrders(response.data);
      setError(null);
    }
  } catch (error) {
    setError(error.response.data.error.message);
    console.error('Error fetching orders:', error);
  } finally {
    setIsLoading(false);
  }
}
export { createOrder, fetchUserOrders };
