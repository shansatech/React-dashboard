import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Settings from './pages/Settings';
import { UserInfo } from './pages/UserInfo';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/user-info' element={<UserInfo />} />
        <Route path='/products' element={<Products />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>

    </>
  );
}

export default App;
