import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Footer.module.css';

// Custom inline SVG icons to replace deprecated Lucide brand icons
const Instagram = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const { addNotification } = useApp();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      addNotification(`Thank you for subscribing to our Imperial newsletter. Exclusive resort previews will be sent to ${email}.`, "system");
      setEmail("");
      alert("Subscription Successful! Welcome to the Royal Circle of Sahana.");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.logoCol}>
            <div>
              <div className={styles.logo}>Sahana</div>
              <div className={styles.logoSub}>Hotel & Restaurant</div>
            </div>
            <p className={styles.desc}>
              An ultra-luxury sanctuary nestled on the pristine shores, combining heritage Indian hospitality with contemporary elegance. A destination of sensory indulgence and absolute tranquility.
            </p>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.colTitle}>Sanctuary</h3>
            <ul className={styles.linksList}>
              <li><Link to="/rooms" className={styles.link}>Imperial Suites</Link></li>
              <li><Link to="/restaurant" className={styles.link}>Fine Dining</Link></li>
              <li><Link to="/menu" className={styles.link}>Gourmet Menu</Link></li>
              <li><Link to="/gallery" className={styles.link}>Photo Gallery</Link></li>
              <li><Link to="/about" className={styles.link}>Our Heritage</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className={styles.colTitle}>Connect</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={18} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span className={styles.contactText}>
                  Sahana Palace Grounds,<br />
                  Lake Pichola, Udaipur,<br />
                  Rajasthan, India
                </span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span className={styles.contactText}>+91 294 8876500</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span className={styles.contactText}>concierge@sahana.luxury</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className={styles.newsletterCol}>
            <h3 className={styles.colTitle}>The Circle</h3>
            <p className={styles.desc}>
              Subscribe to receive curated invitations, culinary updates, and exclusive seasonal offers from Hotel Sahana.
            </p>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.subscribeBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.bottom}>
          <p>© 2026 Hotel Sahana Luxury Resorts Ltd. All Rights Reserved.</p>
          
          <div className={styles.bottomLinks}>
            <Link to="/about" className={styles.bottomLink}>Privacy Policy</Link>
            <Link to="/contact" className={styles.bottomLink}>Terms of Service</Link>
            <Link to="/admin" className={styles.bottomLink}>Internal Portal</Link>
          </div>

          <div className={styles.badgeGrid}>
            <span className={styles.luxuryBadge}>Visa Infinite</span>
            <span className={styles.luxuryBadge}>Amex Centurion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
