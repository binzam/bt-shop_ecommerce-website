import axios from 'axios';

async function createOrder(
  setError,
  setLoading,
  user,
  // setOrderData,
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
      `http://localhost:5555/api/orders/user/${user.userId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    // console.log('response in fetchuserOrders', response);
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
async function cancelUserOrder(user, orderId, setError, setisOrderCanceled) {
  try {
    const response = await axios.post(
      `http://localhost:5555/api/orders/cancel_order/${orderId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.data.orderCancelled) {
      setisOrderCanceled(true);
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    console.error('Error canceling order:', error);
    setError('An error occurred while canceling the order. Please try again.');
  }
}
export { createOrder, fetchUserOrders, cancelUserOrder };
