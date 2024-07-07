import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const OrderSummary = () => {
  const { cartItems } = useContext(CartContext);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseInt(item.price) * parseInt(item.quantity);
    });
    return parseInt(total.toFixed(2), 10);
  };

  const calculateTax = () => {
    return Number(parseInt(calculateTotal() * 0.15, 10).toFixed(2));
  };

  const totalAmount = Number(calculateTax() + calculateTotal()).toFixed(2);
  return (
    <div className="order_summary">
      <div className="order_summary_header">Order Summary</div>
      <div className="pricing_summary">
        <div>
          <p className="left">
            Items ( <span>{cartItems.length}</span> ) :
          </p>
          <p className="right">${calculateTotal()}</p>
        </div>
        <div>
          <p className="left">Shipping & Handling:</p>
          <p className="right">$0.00</p>
        </div>
        <div>
          <p className="left">Total Before TAX: </p>
          <p className="right">${calculateTotal()}</p>
        </div>
        <div>
          <p className="left">Estimated TAX to be collected: </p>
          <p className="right">${calculateTax()}</p>
        </div>
        <div>
          <p className="left total">Order Total:</p>
          <p className="right order_total">
            <span className="dollar_sign">$</span>
            {totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
