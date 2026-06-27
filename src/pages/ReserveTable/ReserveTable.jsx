import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Utensils, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './ReserveTable.module.css';

export default function ReserveTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, addTableReservation } = useApp();

  // Retrieve routing states if pre-filled from Home widget
  const prefill = location.state || {};

  const [date, setDate] = useState(prefill.date || "2026-07-15");
  const [time, setTime] = useState(prefill.time || "20:00");
  const [guests, setGuests] = useState(prefill.guests || "2 Guests");
  const [zone, setZone] = useState(prefill.zone || "Poolside Terrace");
  
  const [guestName, setGuestName] = useState(user ? user.name : "");
  const [guestEmail, setGuestEmail] = useState(user ? user.email : "");
  const [guestPhone, setGuestPhone] = useState(user ? user.phone : "");
  const [occasion, setOccasion] = useState("None");
  const [specialRequest, setSpecialRequest] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to our luxury reservation policies.");
      return;
    }

    const reservationData = {
      date,
      time,
      guests,
      zone,
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
      occasion,
      specialRequest
    };

    const reservation = addTableReservation(reservationData);
    navigate('/success', { state: { reservation, type: 'table' } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <div style={{ marginBottom: '24px' }}>
        <Link to="/restaurant" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Restaurant
        </Link>
      </div>

      <div className={`${styles.card} glass`}>
        <div className={styles.header}>
          <span className="badge-gold">Table Reservation</span>
          <h1 className={styles.title}>Book Savitri Dining</h1>
          <p className={styles.desc}>Secure your overlooking lake Pichola dining table at Hotel Sahana.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            {/* Guest details */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                value={guestName} 
                onChange={(e) => setGuestName(e.target.value)} 
                required 
                className={styles.input}
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                value={guestEmail} 
                onChange={(e) => setGuestEmail(e.target.value)} 
                required 
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Phone Number</label>
              <input 
                type="tel" 
                value={guestPhone} 
                onChange={(e) => setGuestPhone(e.target.value)} 
                required 
                className={styles.input}
              />
            </div>

            {/* Date Selection */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}><Calendar size={12} /> Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
                className={styles.input}
              />
            </div>

            {/* Time Slot Selection */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}><Clock size={12} /> Time Slot</label>
              <select value={time} onChange={(e) => setTime(e.target.value)} className={styles.select}>
                <option value="12:30">12:30 PM (Lunch)</option>
                <option value="13:30">01:30 PM (Lunch)</option>
                <option value="19:30">07:30 PM (Dinner)</option>
                <option value="20:00">08:00 PM (Dinner)</option>
                <option value="21:30">09:30 PM (Dinner)</option>
              </select>
            </div>

            {/* Guest Count */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}><Users size={12} /> Guests</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} className={styles.select}>
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="4 Guests">4 Guests</option>
                <option value="6 Guests">6 Guests</option>
                <option value="8+ Guests">8+ Guests</option>
              </select>
            </div>

            {/* Dining Zone */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}><Utensils size={12} /> Dining Zone</label>
              <select value={zone} onChange={(e) => setZone(e.target.value)} className={styles.select}>
                <option value="Poolside Terrace">Poolside Terrace</option>
                <option value="Gardens Canopy">Mughal Gardens Canopy</option>
                <option value="Main Dining Hall">Savitri Palace Hall</option>
                <option value="Private Salon">Maharajah Private Chamber</option>
              </select>
            </div>

            {/* Occasion */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Special Occasion</label>
              <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className={styles.select}>
                <option value="None">No Special Occasion</option>
                <option value="Birthday">Birthday Celebration</option>
                <option value="Anniversary">Anniversary Dinner</option>
                <option value="Business">Business Meeting</option>
                <option value="Proposal">Marriage Proposal</option>
              </select>
            </div>

            {/* Special Request */}
            <div className={`${styles.fieldGroup} ${styles.colSpan}`}>
              <label className={styles.label}>Allergies or Special Requests</label>
              <textarea 
                rows="4" 
                placeholder="e.g., Sitar playing request, peanut allergy, soft lighting preference..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className={styles.textarea}
              />
            </div>
            
            {/* Agreement */}
            <div className={`${styles.fieldGroup} ${styles.colSpan}`} style={{ marginTop: '10px' }}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={agreeTerms} 
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>I understand that reservations are held for a maximum of 15 minutes. Attire codes apply.</span>
              </label>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirm Table Reservation
          </button>
        </form>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '24px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <ShieldCheck size={14} style={{ color: 'var(--color-secondary)' }} />
          <span>Table bookings are complementary. Cancellations can be managed under Guest Dashboard.</span>
        </div>
      </div>
    </motion.div>
  );
}
