import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import Categories from './pages/Categories';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
