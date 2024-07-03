import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const OrderSummary = () => {
  const { cartItems } = useContext(CartContext);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };
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
          <p className="right">${(calculateTotal() * 0.15).toFixed(2)}</p>
        </div>
        <div>
          <p className="left total">Order Total:</p>
          <p className="right order_total">
            {' '}
            <span className="dollar_sign">$</span>
            {calculateTotal()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
