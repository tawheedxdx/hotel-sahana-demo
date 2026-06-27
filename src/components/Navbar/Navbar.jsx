import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Bell, User, Menu, X, Trash2, Plus, 
  Minus, LogOut, LayoutDashboard, Settings, ClipboardList, Utensils 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const {
    user,
    setUser,
    cart,
    removeFromCart,
    updateCartQty,
    getCartCount,
    getCartTotal,
    checkoutCart,
    notifications,
    markAllNotificationsRead,
    clearNotifications
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState("Room 402");

  const userDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsNotifOpen(false);
    setIsUserDropdownOpen(false);
  }, [location]);

  const handleCheckout = (e) => {
    e.preventDefault();
    const order = checkoutCart(roomNumber);
    if (order) {
      setIsCartOpen(false);
      navigate('/success', { state: { order, type: 'dining' } });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const handleLoginSimulate = () => {
    setUser({
      name: "Alexander Mercer",
      email: "alexander@mercer.luxury",
      phone: "+91 98765 43210",
      loyaltyTier: "Imperial Royal Elite",
      points: 12500,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    });
    navigate('/login');
  };

  const activeNotifCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Brand Logo */}
          <Link to="/" className={styles.logoContainer}>
            <span className={styles.logo}>Sahana</span>
            <span className={styles.logoSub}>Hotel & Restaurant</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Home</NavLink>
            <NavLink to="/rooms" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Rooms</NavLink>
            <NavLink to="/restaurant" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Restaurant</NavLink>
            <NavLink to="/menu" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Food Menu</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Gallery</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Contact</NavLink>
          </nav>

          {/* Action Icons */}
          <div className={styles.actions}>
            {/* Notification Icon */}
            <div className={styles.userMenu} ref={notifDropdownRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)} 
                className={styles.iconButton}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {activeNotifCount > 0 && (
                  <span className={styles.badge}>{activeNotifCount}</span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className={styles.notifDropdown}
                  >
                    <div className={styles.notifHeader}>
                      <h4>Alerts & Butler Messages</h4>
                      {notifications.length > 0 && (
                        <button onClick={() => { markAllNotificationsRead(); setIsNotifOpen(false); }} className={styles.clearAll}>
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className={styles.notifList}>
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div 
                            key={notif.id} 
                            className={`${styles.notifItem} ${!notif.read ? styles.notifItemUnread : ''}`}
                          >
                            <span className={styles.notifText}>{notif.text}</span>
                            <span className={styles.notifTime}>{notif.time}</span>
                          </div>
                        ))
                      ) : (
                        <div className={styles.notifEmpty}>No new notifications.</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className={styles.iconButton}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {getCartCount() > 0 && (
                <span className={styles.badge}>{getCartCount()}</span>
              )}
            </button>

            {/* User Account / Profile Dropdown */}
            <div className={styles.userMenu} ref={userDropdownRef}>
              {user ? (
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} 
                  className={styles.iconButton}
                  style={{ overflow: 'hidden', padding: 0 }}
                >
                  <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ) : (
                <button onClick={handleLoginSimulate} className={styles.iconButton} aria-label="Account">
                  <User size={18} />
                </button>
              )}

              <AnimatePresence>
                {isUserDropdownOpen && user && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className={styles.dropdown}
                  >
                    <div className={styles.dropdownHeader}>
                      <div className={styles.dropdownName}>{user.name}</div>
                      <div className={styles.dropdownRole}>{user.loyaltyTier}</div>
                    </div>
                    <Link to="/dashboard" className={styles.dropdownLink} onClick={() => setIsUserDropdownOpen(false)}>
                      <LayoutDashboard size={14} /> Guest Dashboard
                    </Link>
                    <Link to="/admin" className={styles.dropdownLink} onClick={() => setIsUserDropdownOpen(false)}>
                      <Settings size={14} /> Admin Workspace
                    </Link>
                    <button onClick={handleLogout} className={styles.dropdownLink} style={{ width: '100%', textAlign: 'left' }}>
                      <LogOut size={14} /> Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Burger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={styles.burger}
              aria-label="Toggle Menu"
            >
              <div className={styles.burgerLine} style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : '' }}></div>
              <div className={styles.burgerLine} style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></div>
              <div className={styles.burgerLine} style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : '' }}></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mobileMenu}
          >
            <NavLink to="/" className={styles.navLink}>Home</NavLink>
            <NavLink to="/rooms" className={styles.navLink}>Rooms</NavLink>
            <NavLink to="/restaurant" className={styles.navLink}>Restaurant</NavLink>
            <NavLink to="/menu" className={styles.navLink}>Food Menu</NavLink>
            <NavLink to="/gallery" className={styles.navLink}>Gallery</NavLink>
            <NavLink to="/about" className={styles.navLink}>About</NavLink>
            <NavLink to="/contact" className={styles.navLink}>Contact</NavLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Cart Sliding Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className={styles.cartOverlay}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={styles.cartDrawer}
            >
              <div className={styles.cartHeader}>
                <h3>In-Suite Culinary Cart</h3>
                <button onClick={() => setIsCartOpen(false)} style={{ color: 'var(--color-primary)' }}>
                  <X size={24} />
                </button>
              </div>

              {cart.length > 0 ? (
                <>
                  <div className={styles.cartItemsList}>
                    {cart.map(item => (
                      <div key={item.id} className={styles.cartItem}>
                        <img src={item.image} alt={item.name} className={styles.cartItemImg} />
                        <div className={styles.cartItemInfo}>
                          <div className={styles.cartItemName}>{item.name}</div>
                          <div className={styles.cartItemPrice}>₹{item.price.toLocaleString('en-IN')}</div>
                          <div className={styles.cartItemControl}>
                            <button onClick={() => updateCartQty(item.id, item.qty - 1)} className={styles.qtyButton}>
                              <Minus size={10} />
                            </button>
                            <span className={styles.qtyValue}>{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, item.qty + 1)} className={styles.qtyButton}>
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className={styles.cartItemRemove}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className={styles.cartFooter}>
                    <div className={styles.cartSummaryRow}>
                      <span>Subtotal</span>
                      <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.cartSummaryRow}>
                      <span>Luxury Surcharge & GST (18%)</span>
                      <span>₹{Math.floor(getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
                    </div>
                    <div className={`${styles.cartSummaryRow} ${styles.cartTotal}`}>
                      <span>Total Amount</span>
                      <span>₹{Math.floor(getCartTotal() * 1.18).toLocaleString('en-IN')}</span>
                    </div>

                    <form onSubmit={handleCheckout} style={{ marginTop: '20px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                        Delivery Destination (Room / Lounge Table)
                      </label>
                      <input 
                        type="text" 
                        value={roomNumber} 
                        onChange={(e) => setRoomNumber(e.target.value)} 
                        required 
                        style={{ marginBottom: '16px' }}
                      />
                      <button type="submit" className={styles.checkoutButton}>
                        Place Culinary Order
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className={styles.cartEmpty}>
                  <ShoppingBag size={48} strokeWidth={1} style={{ color: 'var(--color-secondary)' }} />
                  <p>Your culinary cart is empty.</p>
                  <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>Explore our Gourmet menu to order fine delicacies delivered directly to your room.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
