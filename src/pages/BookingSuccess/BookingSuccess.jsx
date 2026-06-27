import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Clock, Utensils, Bed } from 'lucide-react';
import styles from './BookingSuccess.module.css';

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, reservation, order, type } = location.state || {};

  // If no state is passed, show generic fallback to prevent crashing
  if (!type) {
    return (
      <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Stay Confirmed</h2>
        <p style={{ marginTop: '16px', color: 'var(--color-text-muted)' }}>Your request has been successfully registered. You can review all details in your guest dashboard.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <Link to="/dashboard" className="btn-primary">Guest Dashboard</Link>
          <Link to="/" className="btn-secondary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${styles.container} container`}
    >
      <div className={`${styles.card} glass`}>
        <div className={styles.iconContainer}>
          <CheckCircle2 size={44} />
        </div>

        {type === 'room' && (
          <>
            <h1 className={styles.title}>Stay Confirmed</h1>
            <p className={styles.subtitle}>
              Your royal suite has been successfully reserved. A welcome email containing check-in guidelines and concierge contact details has been sent to {booking.email}.
            </p>

            <div className={styles.receipt}>
              <div className={styles.receiptTitle}>
                <span>Heritage Receipt</span>
                <span className={styles.refId}>REF: {booking.id}</span>
              </div>

              <div className={styles.receiptGrid}>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Sanctuary Class</span>
                  <span className={styles.receiptVal}>{booking.roomName}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Guests</span>
                  <span className={styles.receiptVal}>{booking.guests}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Check-In</span>
                  <span className={styles.receiptVal}>{booking.checkIn}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Check-Out</span>
                  <span className={styles.receiptVal}>{booking.checkOut}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Nights</span>
                  <span className={styles.receiptVal}>{booking.nights} Nights</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Loyalty Benefit</span>
                  <span className={styles.receiptVal}>+ {Math.floor(booking.total * 0.05)} Points</span>
                </div>
              </div>

              <div className={styles.receiptTotalRow}>
                <span>Amount Paid</span>
                <span>₹{booking.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </>
        )}

        {type === 'table' && (
          <>
            <h1 className={styles.title}>Table Reserved</h1>
            <p className={styles.subtitle}>
              Your overlooking Pichola table at Savitri is secured. Please arrive 5 minutes before your time slot. Let our hostess know if any updates are needed.
            </p>

            <div className={styles.receipt}>
              <div className={styles.receiptTitle}>
                <span>Dining Receipt</span>
                <span className={styles.refId}>REF: {reservation.id}</span>
              </div>

              <div className={styles.receiptGrid}>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Guest Name</span>
                  <span className={styles.receiptVal}>{reservation.name}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Occasion</span>
                  <span className={styles.receiptVal}>{reservation.occasion}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Date</span>
                  <span className={styles.receiptVal}>{reservation.date}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Time Slot</span>
                  <span className={styles.receiptVal}>{reservation.time} PM</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Guests Count</span>
                  <span className={styles.receiptVal}>{reservation.guests}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>Dining Zone</span>
                  <span className={styles.receiptVal}>{reservation.zone}</span>
                </div>
              </div>

              {reservation.specialRequest && (
                <div style={{ fontSize: '0.8rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '10px', marginTop: '4px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Concierge Note: </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>"{reservation.specialRequest}"</span>
                </div>
              )}
            </div>
          </>
        )}

        {type === 'dining' && (
          <>
            <h1 className={styles.title}>Order Placed</h1>
            <p className={styles.subtitle}>
              Your room service culinary request is being prepared by our chefs. Estimated delivery to your suite is 25-30 minutes.
            </p>

            <div className={styles.receipt}>
              <div className={styles.receiptTitle}>
                <span>Suite Service Order</span>
                <span className={styles.refId}>REF: {order.id}</span>
              </div>

              <div className={styles.receiptItem} style={{ marginBottom: '12px' }}>
                <span className={styles.receiptLabel}>Delivery Suite</span>
                <span className={styles.receiptVal}>{order.roomNumber}</span>
              </div>

              {/* Items List */}
              <div className={styles.itemList}>
                <span className={styles.receiptLabel}>Culinary Items</span>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.foodItemRow}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className={styles.receiptTotalRow}>
                <span>Charged to Suite</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </>
        )}

        {/* Dynamic Actions */}
        <div className={styles.actions}>
          <button onClick={() => navigate('/dashboard')} className={styles.primaryBtn}>
            Go to Guest Dashboard
          </button>
          <button onClick={() => navigate('/')} className={styles.secondaryBtn}>
            Return Home
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          <Sparkles size={12} style={{ color: 'var(--color-secondary)' }} />
          <span>Thank you for choosing Hotel Sahana, Pichola Udaipur.</span>
        </div>
      </div>
    </motion.div>
  );
}
