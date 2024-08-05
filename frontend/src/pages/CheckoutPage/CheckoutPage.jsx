import { useContext, useState } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import './CheckoutPage.css';
import ShippingForm from '../../components/Forms/ShippingForm';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import CheckoutOrders from './CheckoutOrders';
import CheckoutProcess from './CheckoutProcess';
const CheckoutPage = () => {
  const { cartItems } = useContext(ShopContext);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    country: '',
    phoneNumber: '',
  });
  const [isShippingAddressFilled, setIsShippingAddressFilled] = useState(false);

  const handleShippingAddressUpdate = (address) => {
    setShippingAddress(address);
    const isAddressFilled =
      address.street !== '' &&
      address.city !== '' &&
      address.country !== '' &&
      address.phoneNumber !== '';
    setIsShippingAddressFilled(isAddressFilled);
    if (isAddressFilled) {
      setShowShippingForm(false);
    }
  };
  const handleDisplayShippingForm = () => {
    if (cartItems.length > 0) {
      setShowShippingForm(true);
    }
  };

  return (
    <div className="checkout_page">
      <div className="checkout_header">CHECKOUT</div>

      <div className="checkout_content">
        <CheckoutOrders />
        <div className="checkout_progress_wrapper">
          {!showShippingForm ? (
            <OrderSummary />
          ) : (
            cartItems.length > 0 && (
              <ShippingForm
                onShippingAddressUpdate={handleShippingAddressUpdate}
              />
            )
          )}

          <CheckoutProcess
            isShippingAddressFilled={isShippingAddressFilled}
            handleDisplayShippingForm={handleDisplayShippingForm}
            showShippingForm={showShippingForm}
            shippingAddress={shippingAddress}
          />
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
