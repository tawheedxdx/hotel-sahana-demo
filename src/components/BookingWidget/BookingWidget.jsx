import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Hotel, Utensils, Sparkles, Calendar, Users, 
  Search, ArrowUpDown, ShieldCheck, HelpCircle, FileText 
} from 'lucide-react';
import styles from './BookingWidget.module.css';

export default function BookingWidget() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stays');

  // Stays Booking State
  const [destination, setDestination] = useState("Sahana Palace, Udaipur");
  const [checkIn, setCheckIn] = useState("2026-06-15");
  const [checkOut, setCheckOut] = useState("2026-06-18");
  const [hotelGuests, setHotelGuests] = useState("2 Adults, 1 Room");
  const [quickDate, setQuickDate] = useState("today");

  // Dining Reservation State
  const [diningVenue, setDiningVenue] = useState("Savitri Lakeside Dining");
  const [diningDate, setDiningDate] = useState("2026-06-15");
  const [diningTime, setDiningTime] = useState("Dinner (19:30 - 21:30)");
  const [diningGuests, setDiningGuests] = useState("2 Guests");

  // Experiences State
  const [experienceName, setExperienceName] = useState("Lake Pichola Private Boat Tour");
  const [experienceDate, setExperienceDate] = useState("2026-06-16");
  const [experienceTime, setExperienceTime] = useState("Evening Sunset Slot");
  const [experienceGuests, setExperienceGuests] = useState("2 Guests");

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'stays') {
      navigate('/search-results', { 
        state: { 
          type: 'stays', 
          destination, 
          checkIn, 
          checkOut, 
          guests: hotelGuests 
        } 
      });
    } else if (activeTab === 'dining') {
      navigate('/search-results', { 
        state: { 
          type: 'dining', 
          venue: diningVenue, 
          date: diningDate, 
          time: diningTime, 
          guests: diningGuests 
        } 
      });
    } else if (activeTab === 'experiences') {
      navigate('/search-results', { 
        state: { 
          type: 'experiences', 
          name: experienceName, 
          date: experienceDate, 
          time: experienceTime, 
          guests: experienceGuests 
        } 
      });
    }
  };

  const setRelativeDate = (type) => {
    setQuickDate(type);
    const today = new Date();
    if (type === 'tomorrow') {
      today.setDate(today.getDate() + 1);
    } else if (type === 'dayAfter') {
      today.setDate(today.getDate() + 2);
    }
    const formatted = today.toISOString().split('T')[0];
    setCheckIn(formatted);
  };

  return (
    <div className={styles.widgetContainer}>
      {/* Pill Tab Selectors */}
      <div className={styles.tabs}>
        <button 
          type="button"
          onClick={() => setActiveTab('stays')} 
          className={`${styles.tab} ${activeTab === 'stays' ? styles.activeTab : ''}`}
        >
          <Hotel size={16} /> Stays
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('dining')} 
          className={`${styles.tab} ${activeTab === 'dining' ? styles.activeTab : ''}`}
        >
          <Utensils size={16} /> Dining
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('experiences')} 
          className={`${styles.tab} ${activeTab === 'experiences' ? styles.activeTab : ''}`}
        >
          <Sparkles size={16} /> Experiences
        </button>
      </div>

      {/* Main Input Form Card */}
      <div className={styles.formCard}>
        <form onSubmit={handleSearch} className={styles.formGrid}>
          
          {/* STAYS TAB FORM */}
          {activeTab === 'stays' && (
            <>
              <div className={styles.fieldGroup} style={{ gridColumn: 'span 1' }}>
                <span className={styles.fieldLabel}>Resort / Location</span>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={styles.inputField} 
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Check-In Date</span>
                <div className={styles.dateSelectorRow}>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      setQuickDate("custom");
                    }}
                    className={styles.inputField}
                    required
                  />
                  <div className={styles.quickDates}>
                    <button 
                      type="button" 
                      onClick={() => setRelativeDate('tomorrow')}
                      className={`${styles.quickDateBtn} ${quickDate === 'tomorrow' ? styles.quickDateActive : ''}`}
                    >
                      Tomorrow
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setRelativeDate('dayAfter')}
                      className={`${styles.quickDateBtn} ${quickDate === 'dayAfter' ? styles.quickDateActive : ''}`}
                    >
                      Day After
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Check-Out Date</span>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className={styles.inputField} 
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Guests & Rooms</span>
                <select 
                  value={hotelGuests}
                  onChange={(e) => setHotelGuests(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="1 Adult, 1 Room">1 Adult, 1 Room</option>
                  <option value="2 Adults, 1 Room">2 Adults, 1 Room</option>
                  <option value="2 Adults, 1 Child, 1 Room">2 Adults, 1 Child, 1 Room</option>
                  <option value="4 Adults, 2 Rooms">4 Adults, 2 Rooms</option>
                </select>
              </div>
            </>
          )}

          {/* DINING TAB FORM */}
          {activeTab === 'dining' && (
            <>
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Dining Venue</span>
                <select 
                  value={diningVenue}
                  onChange={(e) => setDiningVenue(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="Savitri Lakeside Dining">Savitri Lakeside Dining</option>
                  <option value="Saffron Terrace Lounge">Saffron Terrace Lounge</option>
                  <option value="Sheesh Mahal Cocktail Bar">Sheesh Mahal Cocktail Bar</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Date</span>
                <input 
                  type="date" 
                  value={diningDate}
                  onChange={(e) => setDiningDate(e.target.value)}
                  className={styles.inputField} 
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Time Slot</span>
                <select 
                  value={diningTime}
                  onChange={(e) => setDiningTime(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="Lunch (12:30 - 15:00)">Lunch (12:30 - 15:00)</option>
                  <option value="Sunset (17:00 - 19:00)">Sunset (17:00 - 19:00)</option>
                  <option value="Dinner (19:30 - 21:30)">Dinner (19:30 - 21:30)</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Table Size</span>
                <select 
                  value={diningGuests}
                  onChange={(e) => setDiningGuests(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="2 Guests">2 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="6 Guests">6 Guests</option>
                  <option value="8+ Guests (Group)">8+ Guests (Group)</option>
                </select>
              </div>
            </>
          )}

          {/* EXPERIENCES TAB FORM */}
          {activeTab === 'experiences' && (
            <>
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Experience Category</span>
                <select 
                  value={experienceName}
                  onChange={(e) => setExperienceName(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="Lake Pichola Private Boat Tour">Lake Pichola Private Boat Tour</option>
                  <option value="Royal Spa & Ayurvedic Wellness">Royal Spa & Ayurvedic Wellness</option>
                  <option value="Heritage Palace Walk & Tea">Heritage Palace Walk & Tea</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Date</span>
                <input 
                  type="date" 
                  value={experienceDate}
                  onChange={(e) => setExperienceDate(e.target.value)}
                  className={styles.inputField} 
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Session Time</span>
                <select 
                  value={experienceTime}
                  onChange={(e) => setExperienceTime(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="Morning Slot (09:00 - 12:00)">Morning Slot (09:00 - 12:00)</option>
                  <option value="Afternoon Slot (13:00 - 16:00)">Afternoon Slot (13:00 - 16:00)</option>
                  <option value="Evening Sunset Slot (17:00 - 19:30)">Evening Sunset Slot (17:00 - 19:30)</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Guests Count</span>
                <select 
                  value={experienceGuests}
                  onChange={(e) => setExperienceGuests(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="6+ Guests">6+ Guests</option>
                </select>
              </div>
            </>
          )}

          {/* Circle Search Button */}
          <div className={styles.searchContainer}>
            <button type="submit" className={styles.searchBtn} aria-label="Search">
              <Search size={20} />
              <span className={styles.searchText}>Search</span>
            </button>
          </div>

        </form>

        {/* Safety Strip with customized guarantees */}
        <div className={styles.safetyStrip}>
          {activeTab === 'stays' && (
            <>
              <div className={styles.safetyItem}>
                <ShieldCheck size={14} className={styles.safetyIcon} />
                <span>₹0 cancellation fee</span>
              </div>
              <div className={styles.safetyItem}>
                <ShieldCheck size={14} className={styles.safetyIcon} />
                <span>Instant suite confirmation</span>
              </div>
              <div className={styles.safetyItem}>
                <HelpCircle size={14} className={styles.safetyIcon} />
                <span>24*7 butler assistance</span>
              </div>
              <div className={styles.safetyItem}>
                <FileText size={14} className={styles.safetyIcon} />
                <span>No prepayment required</span>
              </div>
            </>
          )}
          {activeTab === 'dining' && (
            <>
              <div className={styles.safetyItem}>
                <ShieldCheck size={14} className={styles.safetyIcon} />
                <span>Lake-facing tables guaranteed</span>
              </div>
              <div className={styles.safetyItem}>
                <ShieldCheck size={14} className={styles.safetyIcon} />
                <span>No reservation charges</span>
              </div>
              <div className={styles.safetyItem}>
                <HelpCircle size={14} className={styles.safetyIcon} />
                <span>Live traditional sitar music</span>
              </div>
              <div className={styles.safetyItem}>
                <FileText size={14} className={styles.safetyIcon} />
                <span>Valet parking available</span>
              </div>
            </>
          )}
          {activeTab === 'experiences' && (
            <>
              <div className={styles.safetyItem}>
                <ShieldCheck size={14} className={styles.safetyIcon} />
                <span>Private luxury guides included</span>
              </div>
              <div className={styles.safetyItem}>
                <ShieldCheck size={14} className={styles.safetyIcon} />
                <span>Flexible rescheduling</span>
              </div>
              <div className={styles.safetyItem}>
                <HelpCircle size={14} className={styles.safetyIcon} />
                <span>Complimentary royal refreshments</span>
              </div>
              <div className={styles.safetyItem}>
                <FileText size={14} className={styles.safetyIcon} />
                <span>Palace transport provided</span>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
