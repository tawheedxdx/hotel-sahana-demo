import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Sparkles, Calendar, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { hotelRooms } from '../../data/mockData';
import styles from './BookRoom.module.css';

export default function BookRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, addRoomBooking } = useApp();

  // Retrieve routing state from RoomDetails
  const prefill = location.state || {};

  const [selectedRoomId, setSelectedRoomId] = useState(prefill.roomId || "lake-view-suite");
  const [checkIn, setCheckIn] = useState(prefill.checkIn || "2026-07-15");
  const [checkOut, setCheckOut] = useState(prefill.checkOut || "2026-07-18");
  const [guests, setGuests] = useState(prefill.guests || "2 Adults");

  // Addons states
  const [butlerService, setButlerService] = useState(prefill.addons?.butler || false);
  const [airportYacht, setAirportYacht] = useState(prefill.addons?.yacht || false);
  const [spaPass, setSpaPass] = useState(prefill.addons?.spa || false);

  // Billing & Payment
  const [guestName, setGuestName] = useState(user ? user.name : "");
  const [guestEmail, setGuestEmail] = useState(user ? user.email : "");
  const [guestPhone, setGuestPhone] = useState(user ? user.phone : "");
  
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 9988");
  const [expiry, setExpiry] = useState("09/30");
  const [cvv, setCvv] = useState("321");

  // Loyalty points
  const [applyPoints, setApplyPoints] = useState(false);

  const selectedRoom = hotelRooms.find(r => r.id === selectedRoomId) || hotelRooms[0];

  // Calculate nights
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = Math.abs(date2 - date1);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Calculate costs
  const baseRate = selectedRoom.price;
  const roomSubtotal = baseRate * nights;

  let addonCost = 0;
  if (butlerService) addonCost += 5000 * nights;
  if (airportYacht) addonCost += 15000;
  if (spaPass) addonCost += 7500;

  const totalBeforeTaxes = roomSubtotal + addonCost;
  const taxes = Math.floor(totalBeforeTaxes * 0.1);
  
  let pointsDiscount = 0;
  if (applyPoints && user && user.points > 0) {
    // 1 point = ₹0.5 discount
    pointsDiscount = Math.floor(user.points * 0.5);
  }

  const finalTotal = Math.max(0, (totalBeforeTaxes + taxes) - pointsDiscount);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      guests,
      nights,
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
      addons: {
        butler: butlerService,
        yacht: airportYacht,
        spa: spaPass
      },
      pointsUsed: applyPoints ? user.points : 0,
      discount: pointsDiscount,
      total: finalTotal
    };

    const booking = addRoomBooking(bookingData);
    navigate('/success', { state: { booking, type: 'room' } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className={`${styles.container} container`}
    >
      <div style={{ marginBottom: '24px' }}>
        <Link to={`/rooms/${selectedRoomId}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Suite Details
        </Link>
      </div>

      <div className={styles.splitGrid}>
        {/* Left Column: Forms */}
        <div className={styles.formCard}>
          <h1 className={styles.title}>Confirm Your Sanctuary</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Selection details (editable) */}
            <h2 className={styles.sectionTitle}>1. Accommodations details</h2>
            <div className={styles.formGrid}>
              <div className={styles.colSpan}>
                <label className={styles.label}>Suite Class</label>
                <select 
                  value={selectedRoomId} 
                  onChange={(e) => {
                    setSelectedRoomId(e.target.value);
                    // Clear prefilled addons as they relate to previous suite
                    setButlerService(false);
                    setAirportYacht(false);
                    setSpaPass(false);
                  }}
                  className={styles.select}
                >
                  {hotelRooms.map(r => (
                    <option key={r.id} value={r.id}>{r.name} - ₹{r.price.toLocaleString('en-IN')}/night</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={styles.label}>Check-in Date</label>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>Check-out Date</label>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.colSpan}>
                <label className={styles.label}>Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className={styles.select}>
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="4 Adults">4 Adults</option>
                </select>
              </div>
            </div>

            {/* Step 2: Guest Information */}
            <h2 className={styles.sectionTitle}>2. Guest Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.colSpan}>
                <label className={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  value={guestName} 
                  onChange={(e) => setGuestName(e.target.value)} 
                  required 
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  value={guestEmail} 
                  onChange={(e) => setGuestEmail(e.target.value)} 
                  required 
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.label}>Phone Number</label>
                <input 
                  type="tel" 
                  value={guestPhone} 
                  onChange={(e) => setGuestPhone(e.target.value)} 
                  required 
                  className={styles.input}
                />
              </div>
            </div>

            {/* Step 3: Payment details */}
            <h2 className={styles.sectionTitle}>3. Secure Palace Payment</h2>
            <div className={styles.formGrid}>
              <div className={styles.colSpan}>
                <label className={styles.label}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <CreditCard size={18} style={{ color: 'var(--color-text-muted)', position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)} 
                    required 
                    className={styles.input}
                    style={{ paddingLeft: '50px' }}
                  />
                </div>
              </div>
              <div>
                <label className={styles.label}>Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  value={expiry} 
                  onChange={(e) => setExpiry(e.target.value)} 
                  required 
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.label}>Security CVV</label>
                <input 
                  type="password" 
                  maxLength="4" 
                  placeholder="•••" 
                  value={cvv} 
                  onChange={(e) => setCvv(e.target.value)} 
                  required 
                  className={styles.input}
                />
              </div>
            </div>

            {/* Step 4: Loyalty Points */}
            {user && user.points > 0 && (
              <div className={styles.pointsBox}>
                <input 
                  type="checkbox" 
                  checked={applyPoints}
                  onChange={(e) => setApplyPoints(e.target.checked)}
                  className={styles.pointsCheckbox}
                  id="points-checkbox"
                />
                <div>
                  <label htmlFor="points-checkbox" className={styles.pointsTitle} style={{ cursor: 'pointer' }}>
                    Apply Imperial Loyalty Points
                  </label>
                  <p className={styles.pointsDesc}>
                    You have <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{user.points.toLocaleString()} Points</span> available. 
                    Redeem them now to deduct <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>₹{Math.floor(user.points * 0.5).toLocaleString('en-IN')}</span> from your reservation total.
                  </p>
                </div>
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              Confirm Heritage Stay
            </button>
          </form>
        </div>

        {/* Right Column: Sticky Summary */}
        <aside className={`${styles.sidebar} glass`}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Stay Summary</h2>
          
          <div className={styles.roomPreview}>
            <img src={selectedRoom.image} alt={selectedRoom.name} className={styles.img} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
            <div className={styles.roomInfo}>
              <span className={styles.roomName}>{selectedRoom.name}</span>
              <span className={styles.roomType}>{selectedRoom.type}</span>
            </div>
          </div>

          <div className={styles.summaryMath}>
            <div className={styles.mathRow}>
              <span>Heritage Rate</span>
              <span>₹{baseRate.toLocaleString('en-IN')} / Night</span>
            </div>
            <div className={styles.mathRow}>
              <span>Total Stay ({nights} nights)</span>
              <span>₹{roomSubtotal.toLocaleString('en-IN')}</span>
            </div>
            
            {/* Addon lists */}
            {(butlerService || airportYacht || spaPass) && (
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '12px 0', margin: '4px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-primary)' }}>Luxuries Selected</span>
                {butlerService && (
                  <div className={styles.mathRow} style={{ fontSize: '0.8rem' }}>
                    <span>• Royal Butler (+₹5k/night)</span>
                    <span>₹{(5000 * nights).toLocaleString('en-IN')}</span>
                  </div>
                )}
                {airportYacht && (
                  <div className={styles.mathRow} style={{ fontSize: '0.8rem' }}>
                    <span>• Airport Yacht Transfer</span>
                    <span>₹(15,000)</span>
                  </div>
                )}
                {spaPass && (
                  <div className={styles.mathRow} style={{ fontSize: '0.8rem' }}>
                    <span>• Couple Spa Pass</span>
                    <span>₹(7,500)</span>
                  </div>
                )}
              </div>
            )}

            <div className={styles.mathRow}>
              <span>Resort Levy & Service (10%)</span>
              <span>₹{taxes.toLocaleString('en-IN')}</span>
            </div>

            {applyPoints && pointsDiscount > 0 && (
              <div className={`${styles.mathRow} ${styles.mathRowDiscount}`}>
                <span>Loyalty Points Applied</span>
                <span>-₹{pointsDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className={`${styles.mathRow} ${styles.mathTotal}`}>
              <span>Amount Due</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className={styles.securityNote}>
            <Lock size={12} style={{ color: '#10B981' }} />
            <span>256-bit Encrypted SSL Gateway Connection</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '16px', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
            <Sparkles size={12} style={{ color: 'var(--color-secondary)' }} />
            <span>Earns +{Math.floor(finalTotal * 0.05)} loyalty points</span>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
