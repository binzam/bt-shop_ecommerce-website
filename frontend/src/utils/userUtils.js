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
async function getUserById(
  user, id, setSelectedUser, setError, setIsLoading
) {
  setError(null);
  setIsLoading(true);

  try {
    const response = await axios.get(`http://localhost:5555/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response);
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

export { getMe, getUserById };
