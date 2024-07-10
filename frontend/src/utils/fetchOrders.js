import axios from 'axios';

const fetchOrders = async (user, setOrdersCount) => {
  try {
    const response = await axios.get('http://localhost:5555/api/orders', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data.orderCount;
    setOrdersCount(data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchOrders;
