import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Utensils, ShoppingBag, Heart, Sparkles, 
  Clock, LogOut, Trash2, ShieldCheck, Mail, Phone 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { hotelRooms } from '../../data/mockData';
import RoomCard from '../../components/RoomCard/RoomCard';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    user, bookings, reservations: tableReservations, foodOrders, wishlist,
    cancelBooking: removeRoomBooking, cancelReservation: removeTableReservation, logout
  } = useApp();

  const [activeTab, setActiveTab] = useState("stays");

  // Redirect if not logged in (fallback safety)
  if (!user) {
    return (
      <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Guest Session Expired</h2>
        <p style={{ marginTop: '16px', color: 'var(--color-text-muted)' }}>Please log in to access your guest dashboard.</p>
        <Link to="/login" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px', padding: '12px 32px' }}>
          Login to Account
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Starred rooms list
  const starredRooms = hotelRooms.filter(room => wishlist.includes(room.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${styles.container} container`}
    >
      {/* Profile Header */}
      <section className={`${styles.profileCard} glass`}>
        <div className={styles.profileInfo}>
          <img 
            src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"} 
            alt={user.name} 
            className={styles.avatar}
          />
          <div>
            <span className={styles.userTier}>Imperial Club member</span>
            <h1 className={styles.userName}>{user.name}</h1>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '8px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={12} /> {user.email}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12} /> {user.phone}</span>
            </div>
          </div>
        </div>

        <div className={styles.pointsBox}>
          <div className={styles.pointsTitle}><Sparkles size={12} style={{ color: 'var(--color-secondary)', marginRight: '4px' }} /> Point Balance</div>
          <div className={styles.pointsVal}>{user.points.toLocaleString()} pts</div>
          <div className={styles.pointsWorth}>Valued at ₹{(user.points * 0.5).toLocaleString('en-IN')}</div>
        </div>
      </section>

      {/* Tabs list bar */}
      <div className={styles.tabsBar}>
        <button 
          onClick={() => setActiveTab("stays")}
          className={`${styles.tabBtn} ${activeTab === 'stays' ? styles.tabBtnActive : ''}`}
        >
          Stay Bookings ({bookings.length})
        </button>
        <button 
          onClick={() => setActiveTab("dining")}
          className={`${styles.tabBtn} ${activeTab === 'dining' ? styles.tabBtnActive : ''}`}
        >
          Dining Bookings ({tableReservations.length})
        </button>
        <button 
          onClick={() => setActiveTab("orders")}
          className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.tabBtnActive : ''}`}
        >
          Room Service ({foodOrders.length})
        </button>
        <button 
          onClick={() => setActiveTab("starred")}
          className={`${styles.tabBtn} ${activeTab === 'starred' ? styles.tabBtnActive : ''}`}
        >
          Starred Suites ({starredRooms.length})
        </button>
        <button 
          onClick={handleLogout}
          className={styles.tabBtn}
          style={{ marginLeft: 'auto', color: '#EF4444' }}
        >
          <LogOut size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Logout
        </button>
      </div>

      {/* Tabs Content */}
      <AnimatePresence mode="wait">
        {/* Stays Tab */}
        {activeTab === 'stays' && (
          <motion.div 
            key="stays-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.listGrid}
          >
            {bookings.length > 0 ? (
              bookings.map(booking => (
                <div key={booking.id} className={styles.itemCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{booking.roomName}</h3>
                      <span className={styles.refCode}>REF: {booking.id}</span>
                    </div>
                    <span className={`${styles.badge} ${styles.badgeUpcoming}`}>Upcoming</span>
                  </div>

                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Check-In</span>
                      <span className={styles.detailVal}>{booking.checkIn}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Check-Out</span>
                      <span className={styles.detailVal}>{booking.checkOut}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Guests</span>
                      <span className={styles.detailVal}>{booking.guests}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Amount Paid</span>
                      <span className={styles.detailVal}>₹{booking.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <button 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to cancel your stay? This cannot be undone.")) {
                          removeRoomBooking(booking.id);
                        }
                      }}
                      className={styles.cancelBtn}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <Calendar size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }} />
                <h3>No Suite Stays Booked</h3>
                <p style={{ marginTop: '8px', color: 'var(--color-text-muted)' }}>Experience Pichola Udaipur's premier palace sanctuaries.</p>
                <Link to="/rooms" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px' }}>
                  Explore Suites
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Dining Reservations Tab */}
        {activeTab === 'dining' && (
          <motion.div 
            key="dining-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.listGrid}
          >
            {tableReservations.length > 0 ? (
              tableReservations.map(res => (
                <div key={res.id} className={styles.itemCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>Savitri Dining Room</h3>
                      <span className={styles.refCode}>REF: {res.id}</span>
                    </div>
                    <span className={`${styles.badge} ${styles.badgeActive}`}>Confirmed</span>
                  </div>

                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Reservation Date</span>
                      <span className={styles.detailVal}>{res.date}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Time Slot</span>
                      <span className={styles.detailVal}>{res.time} PM</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Guests</span>
                      <span className={styles.detailVal}>{res.guests}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Dining Zone</span>
                      <span className={styles.detailVal}>{res.zone}</span>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <button 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to cancel your table reservation?")) {
                          removeTableReservation(res.id);
                        }
                      }}
                      className={styles.cancelBtn}
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <Utensils size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }} />
                <h3>No Dining Bookings Found</h3>
                <p style={{ marginTop: '8px', color: 'var(--color-text-muted)' }}>Secure a lakeside table for signature Indian fusion delicacies.</p>
                <Link to="/reserve-table" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px' }}>
                  Book Dining Reservation
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Room Service Tab */}
        {activeTab === 'orders' && (
          <motion.div 
            key="orders-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.listGrid}
          >
            {foodOrders.length > 0 ? (
              foodOrders.map(order => (
                <div key={order.id} className={styles.itemCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>In-Suite Dining Delivery</h3>
                      <span className={styles.refCode}>REF: {order.id}</span>
                    </div>
                    <span className={`${styles.badge} ${styles.badgeDelivered}`}>Delivered</span>
                  </div>

                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Order Date</span>
                      <span className={styles.detailVal}>{order.date}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Delivery Suite</span>
                      <span className={styles.detailVal}>{order.roomNumber}</span>
                    </div>
                    <div className={styles.detailItem} style={{ gridColumn: 'span 2' }}>
                      <span className={styles.detailLabel}>Items Ordered</span>
                      <span className={styles.detailVal}>
                        {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardFooter} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      Charged to checkout account
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <ShoppingBag size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }} />
                <h3>No Orders Recorded</h3>
                <p style={{ marginTop: '8px', color: 'var(--color-text-muted)' }}>Browse our cellar and kitchen catalogues to order room service.</p>
                <Link to="/menu" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px' }}>
                  Explore Gourmet Menu
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Starred Tab */}
        {activeTab === 'starred' && (
          <motion.div 
            key="starred-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {starredRooms.length > 0 ? (
              <div className={styles.starredGrid}>
                {starredRooms.map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Heart size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }} />
                <h3>No Starred Suites</h3>
                <p style={{ marginTop: '8px', color: 'var(--color-text-muted)' }}>Click the heart icon on any suite card to bookmark your favorites.</p>
                <Link to="/rooms" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px' }}>
                  Explore Suites
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
