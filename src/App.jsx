import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Rooms from './pages/Rooms/Rooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import Restaurant from './pages/Restaurant/Restaurant';
import ReserveTable from './pages/ReserveTable/ReserveTable';
import FoodMenu from './pages/FoodMenu/FoodMenu';
import BookRoom from './pages/BookRoom/BookRoom';
import BookingSuccess from './pages/BookingSuccess/BookingSuccess';
import Gallery from './pages/Gallery/Gallery';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import StayResults from './pages/StayResults/StayResults';
import NotFound from './pages/NotFound/NotFound';
import CustomCursor from './components/CustomCursor/CustomCursor';
import LuxuryPanel from './components/LuxuryPanel/LuxuryPanel';

import './App.css';

// Scroll to Top on page change for smooth premium transition
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AppProvider>
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/reserve-table" element={<ReserveTable />} />
              <Route path="/menu" element={<FoodMenu />} />
              <Route path="/book" element={<BookRoom />} />
              <Route path="/success" element={<BookingSuccess />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/search-results" element={<StayResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <LuxuryPanel />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
