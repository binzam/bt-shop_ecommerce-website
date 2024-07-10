import axios from 'axios';

const fetchUsers = async (user, setUsersCount) => {
  try {
    const response = await axios.get('http://localhost:5555/api/users', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data.userCount;
    setUsersCount(data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchUsers;
