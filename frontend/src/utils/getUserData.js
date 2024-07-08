import axios from 'axios';

const getme = async (user, setUserData, setError) => {
  setError(null);
  try {
    const response = await axios.get(
      'http://localhost:5555/api/users/getme',
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 200) {
      setUserData(response.data);
      setError(null);
    }
  } catch (error) {
    setError(error.response.data.message);
  }
};

export default getme;
