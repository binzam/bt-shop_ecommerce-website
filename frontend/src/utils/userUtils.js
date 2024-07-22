import axios from 'axios';

async function getMe(
  user,
  setUserData,
  setError,
  setIsLoading,
) {
  setError(null);
  setIsLoading(true);

  try {
    const response = await axios.get('http://localhost:5555/api/users/getMe', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(response);
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

export { getMe };
