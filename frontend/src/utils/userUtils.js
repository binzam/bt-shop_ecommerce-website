import axiosInstance from './axiosInstance';

async function getMe(user, setUserData, setError, setIsLoading) {
  setError(null);
  setIsLoading(true);

  try {
    const response = await axiosInstance.get('/users/getMe');
    console.log(response);
    if (response.status === 200) {
      setUserData(response.data);
      setError(null);
    }
  } catch (error) {
    console.log(error.message);
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}
async function getUserById(user, id, setSelectedUser, setError, setIsLoading) {
  setError(null);
  setIsLoading(true);

  try {
    const response = await axiosInstance.get(`/admin/users/${id}`);
    if (response.status === 200) {
      setSelectedUser(response.data.user);
      // console.log(response);
      setError(null);
    }
  } catch (error) {
    console.log(error.message);
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}
async function saveCartToDatabase(user, cartItems) {
  try {
    const response = await axiosInstance.post(`/users/cart`, { cartItems });

    if (response.data.cartSaved) {
      console.log('cart saved');
    }
  } catch (error) {
    throw new Error('Error saving cart to database:', error);
  }
}
export { getMe, getUserById, saveCartToDatabase };
