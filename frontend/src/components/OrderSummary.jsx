import { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';

const OrderSummary = () => {
  const TAX_RATE = 0.15;
  const { cartItems } = useContext(ShopContext);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  
  const calculateTax = () => {
    const amount = calculateTotal();
    const tax = amount * TAX_RATE;
    return tax.toFixed(2);
  };
  
  const calculateOrderTotal = () => {
    const totalAmount = calculateTotal();
    const tax = calculateTax();
    return (totalAmount + parseFloat(tax)).toFixed(2);
  };
  
  const orderTotal = calculateOrderTotal();
  return (
    <div className="order_summary">
      <div className="order_summary_header">Order Summary</div>
      <div className="pricing_summary">
        <div>
          <p className="left">
            Ordered Product ( <span>{cartItems.length}</span> ) :
          </p>
          <p className="right">${calculateTotal().toFixed(2)}</p>
        </div>
        <div>
          <p className="left">Shipping & Handling:</p>
          <p className="right">$0.00</p>
        </div>
        <div>
          <p className="left">Total Before TAX: </p>
          <p className="right">${calculateTotal().toFixed(2)}</p>
        </div>
        <div>
          <p className="left">Estimated TAX to be collected: </p>
          <p className="right">${calculateTax()}</p>
        </div>
        <div>
          <p className="left total">Order Total:</p>
          <p className="right order_total">
            <span className="dollar_sign">$</span>
            {orderTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
