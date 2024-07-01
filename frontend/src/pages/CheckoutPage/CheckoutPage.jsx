import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import './CheckoutPage.css';
const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout_page">
      <div className="checkout_header">
        {user && <div className="customer_info">
          <p>
            Customer name:<span>{user.username}</span>
          </p>
          <p>
            Customer email:<span>{user.email}</span>
          </p>
          
        </div>}
        <div>
          Pending orders: {cartItems.length}
          <ul>
            {cartItems.map((item)=>(
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
