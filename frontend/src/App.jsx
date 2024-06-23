import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
      <header>This is header</header>
      <main>
        <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDescription />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/place_order' element={<Orders />} />
        <Route path='/payment' element={<Payment />} />
        </Routes>
      </main>
      <footer>This is footer</footer>
    </>
  );
}

export default App;
