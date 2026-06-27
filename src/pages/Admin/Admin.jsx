import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Hotel, Calendar, Utensils, ShoppingBag, 
  Check, X, RefreshCw, Trash2, ArrowUpRight, TrendingUp,
  Award, MessageSquare, ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { hotelRooms } from '../../data/mockData';
import styles from './Admin.module.css';

export default function Admin() {
  const { 
    bookings, 
    tableReservations, 
    foodOrders, 
    removeRoomBooking, 
    removeTableReservation,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState("overview");

  // Mock Admin-only metrics
  const totalRevenue = 4250000 + bookings.reduce((sum, b) => sum + b.total, 0) + foodOrders.reduce((sum, o) => sum + o.total, 0);
  const occupancyRate = 85; // 85%
  const pendingOrders = foodOrders.filter(o => o.status !== 'Delivered').length;

  const handleApproveStay = (id) => {
    addNotification(`Stay reservation ${id} has been verified and marked as Active.`, "system");
    alert(`Stay ${id} approved successfully.`);
  };

  const handleResolveDining = (id) => {
    addNotification(`Dining reservation ${id} VIP table assigned.`, "system");
    alert(`Table assigned for reservation ${id}.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.container} container`}
    >
      {/* Admin Header */}
      <div className={styles.header}>
        <div>
          <span className={styles.subTitle}>Operations & Management</span>
          <h1 className={styles.title}>Imperial Console</h1>
        </div>
        <div className={styles.statusBadge}>
          <ShieldAlert size={14} style={{ marginRight: '6px' }} />
          <span>Security Level: Absolute</span>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <section className={styles.metricsGrid}>
        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Total Revenue</span>
            <DollarSign size={20} className={styles.goldIcon} />
          </div>
          <h2 className={styles.metricValue}>₹{totalRevenue.toLocaleString('en-IN')}</h2>
          <span className={styles.metricTrend} style={{ color: '#10B981' }}>
            <TrendingUp size={12} style={{ marginRight: '4px' }} /> +18.4% this month
          </span>
        </div>

        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Occupancy Rate</span>
            <Hotel size={20} className={styles.goldIcon} />
          </div>
          <h2 className={styles.metricValue}>{occupancyRate}%</h2>
          <div style={{ background: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '2px', marginTop: '12px', overflow: 'hidden' }}>
            <div style={{ width: `${occupancyRate}%`, background: 'var(--color-secondary)', height: '100%' }} />
          </div>
        </div>

        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Active Stays</span>
            <Calendar size={20} className={styles.goldIcon} />
          </div>
          <h2 className={styles.metricValue}>{bookings.length + 12} suites</h2>
          <span className={styles.metricTrend}>4 suites departing today</span>
        </div>

        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Pending Room Service</span>
            <ShoppingBag size={20} className={styles.goldIcon} />
          </div>
          <h2 className={styles.metricValue}>{pendingOrders} orders</h2>
          <span className={styles.metricTrend} style={{ color: pendingOrders > 0 ? 'var(--color-secondary)' : '#A3A3A3' }}>
            {pendingOrders > 0 ? 'Urgent chef attention needed' : 'All orders served'}
          </span>
        </div>
      </section>

      {/* Main Admin Workspace layout */}
      <div className={styles.workspace}>
        {/* Sidebar tabs */}
        <aside className={styles.sidebar}>
          <button 
            onClick={() => setActiveTab("overview")} 
            className={`${styles.sideBtn} ${activeTab === 'overview' ? styles.sideBtnActive : ''}`}
          >
            <TrendingUp size={16} /> Overview & Charts
          </button>
          <button 
            onClick={() => setActiveTab("stays")} 
            className={`${styles.sideBtn} ${activeTab === 'stays' ? styles.sideBtnActive : ''}`}
          >
            <Hotel size={16} /> Stay Registry ({bookings.length})
          </button>
          <button 
            onClick={() => setActiveTab("dining")} 
            className={`${styles.sideBtn} ${activeTab === 'dining' ? styles.sideBtnActive : ''}`}
          >
            <Utensils size={16} /> Table Bookings ({tableReservations.length})
          </button>
          <button 
            onClick={() => setActiveTab("service")} 
            className={`${styles.sideBtn} ${activeTab === 'service' ? styles.sideBtnActive : ''}`}
          >
            <ShoppingBag size={16} /> In-Suite Orders ({foodOrders.length})
          </button>
        </aside>

        {/* Content View */}
        <main className={styles.content}>
          <AnimatePresence mode="wait">
            
            {/* Overview & Charts */}
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.tabPane}
              >
                <div className={styles.paneHeader}>
                  <h2>Analytics & Forecasting</h2>
                  <span className={styles.timestamp}>Real-time telemetry</span>
                </div>

                <div className={styles.chartsGrid}>
                  {/* Revenue Curve SVG */}
                  <div className={`${styles.chartBox} glass`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h4>Weekly Revenue Forecast</h4>
                      <span className={styles.chartLegend}>₹ in Lakhs</span>
                    </div>
                    <div className={styles.svgWrapper}>
                      <svg viewBox="0 0 500 150" width="100%" height="150" style={{ overflow: 'visible' }}>
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.05)" />
                        <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" />
                        
                        {/* Shaded Area */}
                        <path 
                          d="M0,130 Q100,90 200,80 T400,30 L500,20 L500,150 L0,150 Z" 
                          fill="url(#chartGrad)" 
                        />
                        {/* Curved Line */}
                        <path 
                          d="M0,130 Q100,90 200,80 T400,30 L500,20" 
                          fill="none" 
                          stroke="var(--color-secondary)" 
                          strokeWidth="3" 
                        />
                        {/* Interactive dots */}
                        <circle cx="200" cy="80" r="5" fill="var(--color-secondary)" />
                        <circle cx="400" cy="30" r="5" fill="var(--color-secondary)" />
                        <text x="210" y="75" fill="white" fontSize="10">₹8.4L</text>
                        <text x="410" y="25" fill="white" fontSize="10">₹14.2L (Peak)</text>
                      </svg>
                    </div>
                    <div className={styles.chartFooter}>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* Occupancy Radial Graph */}
                  <div className={`${styles.chartBox} glass`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h4 style={{ alignSelf: 'flex-start', width: '100%', marginBottom: '16px' }}>Sanctuary Allocations</h4>
                    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                      <svg width="100%" height="100%" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background track circle */}
                        <circle cx="20" cy="20" r="16" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        {/* Gold progress circle */}
                        <circle 
                          cx="20" 
                          cy="20" 
                          r="16" 
                          fill="transparent" 
                          stroke="var(--color-secondary)" 
                          strokeWidth="4" 
                          strokeDasharray="100"
                          strokeDashoffset={100 - occupancyRate}
                        />
                      </svg>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{occupancyRate}%</span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Booked</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '16px', textAlign: 'center' }}>
                      17 of 20 Luxury Suites Allocated
                    </span>
                  </div>
                </div>

                {/* Operations logs */}
                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ marginBottom: '12px' }}>Operational Alerts</h4>
                  <div className={styles.alertItem}>
                    <span className={styles.alertBullet} />
                    <span>Suite 302 requesting private lakeside boat transfer at 6:30 PM.</span>
                  </div>
                  <div className={styles.alertItem}>
                    <span className={styles.alertBullet} />
                    <span>Michelin chef signature Truffle menu sold out for tonight.</span>
                  </div>
                  <div className={styles.alertItem}>
                    <span className={styles.alertBullet} />
                    <span>Helipad security checks verified for upcoming royal dignitary arrival.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stays List */}
            {activeTab === 'stays' && (
              <motion.div 
                key="stays"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.tabPane}
              >
                <div className={styles.paneHeader}>
                  <h2>Stay Registrations</h2>
                  <span>Total stays booked: {bookings.length}</span>
                </div>

                <div className={styles.tableResponsive}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Guest</th>
                        <th>Suite Sanctuary</th>
                        <th>Stay Period</th>
                        <th>Guests</th>
                        <th>Amount Paid</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Default mockup row to keep it rich */}
                      <tr>
                        <td>
                          <div className={styles.tableName}>Elizabeth Windsor</div>
                          <div className={styles.tableSub}>elizabeth@royal.uk</div>
                        </td>
                        <td>Maharani Suite (Lake View)</td>
                        <td>Jun 28 - Jul 02</td>
                        <td>2 Guests</td>
                        <td>₹5,20,000</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => alert("Verified VIP Stay.")} className={styles.actionBtnCheck} title="Verify Stay"><Check size={14} /></button>
                          </div>
                        </td>
                      </tr>
                      {bookings.map(booking => (
                        <tr key={booking.id}>
                          <td>
                            <div className={styles.tableName}>Alexander Mercer</div>
                            <div className={styles.tableSub}>alex@mercer.com</div>
                          </td>
                          <td>{booking.roomName}</td>
                          <td>{booking.checkIn} to {booking.checkOut}</td>
                          <td>{booking.guests} Guests</td>
                          <td>₹{booking.total.toLocaleString('en-IN')}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => handleApproveStay(booking.id)} className={styles.actionBtnCheck} title="Verify Stay"><Check size={14} /></button>
                              <button onClick={() => removeRoomBooking(booking.id)} className={styles.actionBtnDelete} title="Cancel Reservation"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Dining Table Bookings */}
            {activeTab === 'dining' && (
              <motion.div 
                key="dining"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.tabPane}
              >
                <div className={styles.paneHeader}>
                  <h2>Savitri Dining Room Reservations</h2>
                  <span>Total Covers: {tableReservations.length}</span>
                </div>

                <div className={styles.tableResponsive}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Guest</th>
                        <th>Date & Time</th>
                        <th>Guests</th>
                        <th>Zone Pref</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className={styles.tableName}>Siddharth Birla</div>
                          <div className={styles.tableSub}>siddharth@birla.com</div>
                        </td>
                        <td>Jun 27 at 8:00 PM</td>
                        <td>4 Guests</td>
                        <td>Poolside Pavilion</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => alert("Table pre-allocated.")} className={styles.actionBtnCheck}><Check size={14} /></button>
                          </div>
                        </td>
                      </tr>
                      {tableReservations.map(res => (
                        <tr key={res.id}>
                          <td>
                            <div className={styles.tableName}>Alexander Mercer</div>
                            <div className={styles.tableSub}>alex@mercer.com</div>
                          </td>
                          <td>{res.date} at {res.time} PM</td>
                          <td>{res.guests} Guests</td>
                          <td>{res.zone}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => handleResolveDining(res.id)} className={styles.actionBtnCheck} title="Assign Table"><Check size={14} /></button>
                              <button onClick={() => removeTableReservation(res.id)} className={styles.actionBtnDelete} title="Delete Reservation"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Room Service Food Orders */}
            {activeTab === 'service' && (
              <motion.div 
                key="service"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.tabPane}
              >
                <div className={styles.paneHeader}>
                  <h2>In-Suite Culinary Orders</h2>
                  <span>Orders pending: {pendingOrders}</span>
                </div>

                <div className={styles.tableResponsive}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Suite</th>
                        <th>Order Contents</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Suite 302</td>
                        <td>Vark Royal Thali (x1), Pichola Sunset Elixir (x2)</td>
                        <td>₹5,600</td>
                        <td><span className={`${styles.badge} ${styles.badgeDelivered}`}>Delivered</span></td>
                        <td>-</td>
                      </tr>
                      {foodOrders.map(order => (
                        <tr key={order.id}>
                          <td>Suite {order.roomNumber}</td>
                          <td>
                            {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                          </td>
                          <td>₹{order.total.toLocaleString('en-IN')}</td>
                          <td>
                            <span className={`${styles.badge} ${order.status === 'Delivered' ? styles.badgeDelivered : styles.badgeUpcoming}`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>
                          <td>
                            {order.status !== 'Delivered' ? (
                              <button 
                                onClick={() => {
                                  order.status = 'Delivered';
                                  addNotification(`Order ${order.id} delivered to Suite ${order.roomNumber}`, 'system');
                                  setActiveTab('overview'); // force refresh
                                  setTimeout(() => setActiveTab('service'), 10);
                                }}
                                className="btn-secondary" 
                                style={{ padding: '4px 12px', fontSize: '0.75rem', textTransform: 'uppercase' }}
                              >
                                Deliver
                              </button>
                            ) : (
                              <span style={{ color: '#10B981', fontSize: '0.8rem' }}>Success</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}
