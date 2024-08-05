import { useContext } from 'react';
import CartItems from '../../components/Header/Cart/CartItems';
import { ShopContext } from '../../contexts/ShopContext';
import { Link } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow-left.svg';

const CheckoutOrders = () => {
  const { cartItems } = useContext(ShopContext);

  return (
    <div className="checkout_orders">
      {cartItems.length > 0 ? (
        <>
          <span className="pending_orders_count">
            Pending Orders [<span>{cartItems.length}</span>]
          </span>
          <div className="pending_orders">
            <CartItems />
          </div>
        </>
      ) : (
        <div className="no_orders">
          <p className="no_orders_txt">You have no Pending orders</p>
          <Link className="shop_link" to="/products">
            <img src={ArrowLeft} alt="Shop link" />
            Back to Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutOrders;
