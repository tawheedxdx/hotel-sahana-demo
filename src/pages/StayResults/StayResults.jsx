import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, CheckCircle, ChevronRight, X, 
  User, Ticket, Hotel, Utensils, Sparkles, MapPin, Clock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './StayResults.module.css';

export default function StayResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addRoomBooking } = useApp();

  // Retrieve passed state or use default stays
  const queryType = location.state?.type || "stays";
  const [activeTab, setActiveTab] = useState(queryType);
  const [activeDateIndex, setActiveDateIndex] = useState(1);

  // States
  const [selectedItem, setSelectedItem] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Horizontal Dates List (matches screenshot 2 date picker bar style)
  const dates = [
    { day: "15", name: "Mon", full: "22026-06-15" },
    { day: "16", name: "Tue", full: "2026-06-16" },
    { day: "17", name: "Wed", full: "2026-06-17" },
    { day: "18", name: "Thu", full: "2026-06-18" },
    { day: "19", name: "Fri", full: "2026-06-19" },
    { day: "20", name: "Sat", full: "2026-06-20" },
    { day: "21", name: "Sun", full: "2026-06-21" },
    { day: "22", name: "Mon", full: "2026-06-22" }
  ];

  // Stay Packages Data
  const stays = [
    {
      id: "stay-1",
      name: "Lakeview Pavilion Suite",
      location: "East Wing, Pichola Lakeside",
      checkIn: "14:00 Check-In",
      checkOut: "11:00 Check-Out",
      options: [
        { name: "Deluxe King", price: 15000, status: "CNF", state: "confirmed" },
        { name: "Premium Lakefront", price: 24000, status: "CNF", state: "confirmed" },
        { name: "Presidential Pavilion", price: 45000, status: "WL 2", state: "waitlist" }
      ]
    },
    {
      id: "stay-2",
      name: "Maharaja Heritage Suite",
      location: "Palace Fort Tower",
      checkIn: "14:00 Check-In",
      checkOut: "11:00 Check-Out",
      options: [
        { name: "Vintage Double", price: 20000, status: "CNF", state: "confirmed" },
        { name: "Royal Courtyard Suite", price: 28000, status: "CNF", state: "confirmed" }
      ]
    }
  ];

  // Dining Packages Data
  const dining = [
    {
      id: "dine-1",
      name: "Savitri Lakeside Dining",
      location: "Private Lakeside Deck",
      checkIn: "Sitar Live Performance",
      checkOut: "Michelin Mewari Menu",
      options: [
        { name: "Sunset Slot (17:00)", price: 2500, status: "CNF", state: "confirmed" },
        { name: "Dinner Slot (19:30)", price: 3500, status: "CNF", state: "confirmed" },
        { name: "Royal Dinner Slot (21:30)", price: 3500, status: "WL 1", state: "waitlist" }
      ]
    },
    {
      id: "dine-2",
      name: "Saffron Terrace Lounge",
      location: "Rooftop Dome",
      checkIn: "Panoramic Aravalli Views",
      checkOut: "Fusion Cocktails & Tapas",
      options: [
        { name: "Sunset High Tea (16:30)", price: 1800, status: "CNF", state: "confirmed" },
        { name: "Grand Terrace Dinner (20:00)", price: 3000, status: "CNF", state: "confirmed" }
      ]
    }
  ];

  // Experience Packages Data
  const experiences = [
    {
      id: "exp-1",
      name: "Lake Pichola Private Boat Tour",
      location: "Palace Jetty",
      checkIn: "Duration: 2 Hours",
      checkOut: "Includes Royal Guide & Hi-Tea",
      options: [
        { name: "Morning Cruise (09:30)", price: 5000, status: "CNF", state: "confirmed" },
        { name: "Sunset Royal Cruise (17:00)", price: 8000, status: "CNF", state: "confirmed" }
      ]
    },
    {
      id: "exp-2",
      name: "Royal Spa & Wellness Ritual",
      location: "Ayurvedic Sanctuary",
      checkIn: "Duration: 90 Minutes",
      checkOut: "Includes Herb Bath & Massage",
      options: [
        { name: "Vedic Restore (10:00)", price: 6500, status: "CNF", state: "confirmed" },
        { name: "Signature Abhyanga (15:30)", price: 9000, status: "CNF", state: "confirmed" }
      ]
    }
  ];

  const handleOpenBooking = (item, option) => {
    setSelectedItem({ item, option });
    setGuestName("");
    setSpecialRequest("");
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!guestName) return;

    // Register stay or dining booking in context
    addRoomBooking({
      id: `SAH-${Math.floor(1000 + Math.random() * 9000)}`,
      roomName: `${selectedItem.item.name} (${selectedItem.option.name})`,
      checkIn: dates[activeDateIndex].full,
      checkOut: dates[activeDateIndex].full,
      price: selectedItem.option.price,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80",
      guests: `${guestName} (${specialRequest || 'No special requests'})`
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedItem(null);
      navigate('/dashboard');
    }, 2000);
  };

  const activeResults = 
    activeTab === 'stays' ? stays : 
    activeTab === 'dining' ? dining : experiences;

  return (
    <div className={styles.resultsContainer}>
      
      {/* Top Header Card */}
      <div className={styles.topSearch}>
        <div className="container">
          <div className={styles.topBar}>
            <button onClick={() => navigate('/')} className={styles.backBtn}>
              <ArrowLeft size={20} /> Back
            </button>
            <div className={styles.pills}>
              <button 
                onClick={() => setActiveTab('stays')}
                className={`${styles.pill} ${activeTab === 'stays' ? styles.pillActive : ''}`}
              >
                <Hotel size={14} /> Stays
              </button>
              <button 
                onClick={() => setActiveTab('dining')}
                className={`${styles.pill} ${activeTab === 'dining' ? styles.pillActive : ''}`}
              >
                <Utensils size={14} /> Dining
              </button>
              <button 
                onClick={() => setActiveTab('experiences')}
                className={`${styles.pill} ${activeTab === 'experiences' ? styles.pillActive : ''}`}
              >
                <Sparkles size={14} /> Experiences
              </button>
            </div>
          </div>

          <div className={styles.querySummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Category</span>
              <span className={styles.summaryValue} style={{ textTransform: 'capitalize' }}>
                {activeTab} Selection
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Selected Date</span>
              <span className={styles.summaryValue}>
                {dates[activeDateIndex].full}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Date scrolling picker strip */}
      <div className={styles.dateStrip}>
        <div className="container">
          <div className={styles.dateScroll}>
            {dates.map((d, index) => (
              <div 
                key={index}
                onClick={() => setActiveDateIndex(index)}
                className={`${styles.dateItem} ${activeDateIndex === index ? styles.dateItemActive : ''}`}
              >
                <span className={styles.dateDay}>{d.day}</span>
                <span className={styles.dateName}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results listing */}
      <div className="container" style={{ padding: '32px 0 80px 0' }}>
        <h2 className={styles.resultsHeading}>
          Available Options on {dates[activeDateIndex].day} {dates[activeDateIndex].name}
        </h2>

        <div className={styles.trainsList}>
          {activeResults.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.trainCard}
            >
              {/* Card Header details */}
              <div className={styles.trainHeader}>
                <div className={styles.trainIdentity}>
                  <span className={styles.trainNo}><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{item.location}</span>
                  <h3 className={styles.trainName}>{item.name}</h3>
                </div>
                <div className={styles.routeTimes}>
                  <div className={styles.timeBlock}>
                    <span className={styles.timeVal}>{item.checkIn}</span>
                  </div>
                  <div className={styles.durationBlock}>
                    <span className={styles.durationLine}></span>
                    <span className={styles.durationVal}>Details</span>
                  </div>
                  <div className={styles.timeBlock} style={{ textAlign: 'right' }}>
                    <span className={styles.timeVal}>{item.checkOut}</span>
                  </div>
                </div>
              </div>

              {/* Class Box Choices */}
              <div className={styles.classesContainer}>
                {item.options.map((opt, oIdx) => (
                  <div 
                    key={oIdx}
                    onClick={() => handleOpenBooking(item, opt)}
                    className={`${styles.classBox} ${opt.state === 'confirmed' ? styles.classBoxConfirmed : ''}`}
                  >
                    <div className={styles.classHeader}>
                      <span className={styles.className}>{opt.name}</span>
                      <span className={styles.classPrice}>₹{opt.price}</span>
                    </div>
                    <div className={styles.classStatusRow}>
                      <span className={opt.state === 'confirmed' ? styles.statusCnf : styles.statusWl}>
                        {opt.status === 'CNF' ? 'Available' : opt.status}
                      </span>
                      <ChevronRight size={14} className={styles.classArrow} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Form Overlay Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className={styles.modalOverlay}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={styles.modalCard}
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleRow}>
                  <Ticket size={20} className={styles.modalTitleIcon} />
                  <h3>Confirm Palace Booking</h3>
                </div>
                <button onClick={() => setSelectedItem(null)} className={styles.closeBtn}>
                  <X size={20} />
                </button>
              </div>

              {bookingSuccess ? (
                <div className={styles.successScreen}>
                  <CheckCircle size={64} className={styles.successIcon} />
                  <h3>Booking Confirmed!</h3>
                  <p>Adding reservation to your Sahana Palace account...</p>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className={styles.bookingForm}>
                  
                  {/* Summary Box */}
                  <div className={styles.summaryBox}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Venue / Stay</span>
                      <span className={styles.summaryVal}>{selectedItem.item.name}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Package</span>
                      <span className={styles.summaryVal}>{selectedItem.option.name} (Rate: ₹{selectedItem.option.price})</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Date</span>
                      <span className={styles.summaryVal}>{dates[activeDateIndex].full}</span>
                    </div>
                  </div>

                  {/* Passenger input block */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Guest Full Name</label>
                    <div className={styles.inputWrapper}>
                      <User size={16} className={styles.formIcon} />
                      <input 
                        type="text" 
                        placeholder="Enter full name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Special Requests (e.g. Dietary details, pillow menu)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vegetarian Mewari thali, allergen alerts"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className={styles.formInput}
                      style={{ paddingLeft: '16px' }}
                    />
                  </div>

                  <button type="submit" className={styles.confirmBtn}>
                    Book Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
