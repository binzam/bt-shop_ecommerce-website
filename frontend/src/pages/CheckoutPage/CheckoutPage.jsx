import { useContext, useEffect, useState } from 'react';
import { NavContext } from '../../contexts/NavContext';
import './CheckoutPage.css';
import CartItems from '../../components/Header/Cart/CartItems';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right-solid.svg';
import ShippingForm from '../../components/Forms/ShippingForm';
import {
  Link,
  // useNavigate
} from 'react-router-dom';
import PaymentForm from '../../components/Forms/PaymentForm';
import OrderSummary from '../../components/OrderSummary';
import { useAuthContext } from '../../hooks/useAuthContext';
import Loading from '../../components/Loading';
import { getMe } from '../../utils/userUtils';
import { createOrder } from '../../utils/orderUtils';

const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { cartItems, handleOpenUserOptions } = useContext(NavContext);
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [userData, setUserData] = useState({
    _id: null,
    address: null,
    creditCardInfo: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isReadyToPlaceOrder, setIsReadyToPlaceOrder] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    if (user) {
      getMe(user, setUserData, setError, setIsLoading);
    }
  }, [user]);
  const filteredValues = cartItems.map(({ _id, quantity, price, taxRate }) => ({
    product: _id,
    quantity,
    price,
    taxRate,
  }));
  const newOrder = {
    user: userData._id,
    orderItems: filteredValues,
    shippingAddress: userData.address,
  };
  const handleShippingForm = () => {
    if (!userData.address) {
      setShowShippingForm(true);
      setShowOrderSummary(false);
      setShowPaymentForm(false);
    } else {
      handlePaymentForm();
    }
  };
  const handlePaymentForm = () => {
    if (!userData.creditCardInfo) {
      setShowPaymentForm(true);
      setShowOrderSummary(false);
      setShowShippingForm(false);
    } else {
      handleCreateOrder();
    }
  };
  const handleCreateOrder = () => {
    setShowShippingForm(false);
    setShowPaymentForm(false);
    setShowOrderSummary(true);
    setIsReadyToPlaceOrder(true);
    // navigate('/orders');
  };
  const handlePlaceOrder = () => {
    createOrder(
      setError,
      setIsLoading,
      user,
      setOrderData,
      newOrder,
      setIsOrderPlaced
    );
  };
  return (
    <div className="checkout_page">
      {isLoading && <Loading />}
      <div className="checkout_header">
        <div className="checkout">CHECKOUT</div>
        {error && <div className="form_error">{error}</div>}
        {user ? (
          <p className="customer_info">
            Logged in as: <span>{user.username}</span>
          </p>
        ) : (
          <span className="not_logged_in">Please Log In or Register</span>
        )}
        <Link className="shop_link" to="/products">
          <img src={ArrowLeft} alt="Shop link" />
          Back to Shop
        </Link>
      </div>
      {!isOrderPlaced ? (
        <div className="orders_content">
          <div className="checkout_orders">
            <span className="pending_orders_count">
              Pending Orders [<span>{cartItems.length}</span>]
            </span>
            {cartItems.length > 0 ? (
              <div className="pending_orders">
                <CartItems />
              </div>
            ) : (
              <p className="no_orders">You have no Pending orders</p>
            )}
          </div>
          <div className="checkout_progress_wrapper">
            {showOrderSummary && <OrderSummary />}
            {showShippingForm && cartItems.length > 0 && (
              <ShippingForm handlePaymentForm={handlePaymentForm} />
            )}
            {showPaymentForm && (
              <PaymentForm handleCreateOrder={handleCreateOrder} />
            )}
            <div className="checkout_option_btns">
              {!user && cartItems.length > 0 && (
                <Link
                  to="/auth"
                  onClick={handleOpenUserOptions}
                  className="checkout_login_btn"
                >
                  Login to Continue
                </Link>
              )}
              {user && showOrderSummary && (
                <button
                  onClick={handleShippingForm}
                  className="checkout_next_btn"
                >
                  Next <img src={ArrowRight} alt="shipping button" />
                </button>
              )}
            </div>
            {isReadyToPlaceOrder && (
              <button className="place_order_btn" onClick={handlePlaceOrder}>
                CREATE ORDER
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="order_complete_div">
          <h2>Order Submitted</h2>
          <div>OEDER ID{orderData._id}</div>
          <p>
            Your Order has been Placed and it is Pending, Thank you for shopping
            with us.
          </p>
          <Link to='/orders'>View Order</Link>
        </div>
      )}
    </div>
  );
};
export default CheckoutPage;
