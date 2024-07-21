import axios from 'axios';

async function getMe(user, setUserData, setError, setIsLoading) {
  setError(null);
  setIsLoading(true);

  try {
    const response = await axios.get('http://localhost:5555/api/users/getMe', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.status === 200) {
      setUserData(response.data.orders);
      setError(null);
    }
  } catch (error) {
    setError(error.response.data.message);
  } finally {
    setIsLoading(false);
  }
}

export { getMe };
