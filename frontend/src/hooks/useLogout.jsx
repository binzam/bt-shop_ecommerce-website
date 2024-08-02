import { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { AuthContext } from '../contexts/AuthContext';

export const useLogout = () => {
  const { dispatch, user } = useContext(AuthContext);
  const { clearCart } = useContext(ShopContext);
  const logout = async () => {
    try {
      await clearCart(user);

      localStorage.removeItem('userInfo');

      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { logout };
};
