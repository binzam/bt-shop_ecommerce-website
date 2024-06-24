import { useState } from 'react';
import RegisterForm from './RegisterForm';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <header>
      This is a Header
      <nav>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Men</li>
          <li>Women</li>
        </ul>
        <ul>
          <li>Cart</li>
          <li>
            <button onClick={handleOpenModal}>Sign up</button>
          </li>
        </ul>
        {showModal && <RegisterForm handleClose={handleCloseModal} />}
      </nav>
    </header>
  );
};

export default Header;
