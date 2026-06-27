import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, Star, CheckCircle, Maximize2, Users, 
  Compass, Bed, Calendar, ArrowLeft, Shield 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { hotelRooms } from '../../data/mockData';
import RoomCard from '../../components/RoomCard/RoomCard';
import styles from './RoomDetails.module.css';

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useApp();

  const room = hotelRooms.find(r => r.id === id);

  // Gallery active image
  const [activeImg, setActiveImg] = useState("");

  // Booking details
  const [checkIn, setCheckIn] = useState("2026-07-15");
  const [checkOut, setCheckOut] = useState("2026-07-18");
  const [guestsCount, setGuestsCount] = useState("2 Adults");
  
  // Add-ons
  const [butlerService, setButlerService] = useState(false);
  const [airportYacht, setAirportYacht] = useState(false);
  const [spaPass, setSpaPass] = useState(false);

  useEffect(() => {
    if (room) {
      setActiveImg(room.images[0]);
    }
  }, [room]);

  if (!room) {
    return (
      <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Sanctuary Not Found</h2>
        <p style={{ marginTop: '16px', color: 'var(--color-text-muted)' }}>The room class you are looking for does not exist in our heritage catalogue.</p>
        <Link to="/rooms" className={styles.bookBtn} style={{ display: 'inline-block', width: 'auto', marginTop: '24px', padding: '12px 32px' }}>
          Return to Suites
        </Link>
      </div>
    );
  }

  // Calculate nights dynamically
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = Math.abs(date2 - date1);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Add-ons calculation
  let addonCost = 0;
  if (butlerService) addonCost += 5000 * nights; // 5000 per night
  if (airportYacht) addonCost += 15000; // flat
  if (spaPass) addonCost += 7500; // flat

  const subtotal = room.price * nights;
  const totalAmount = subtotal + addonCost;

  const handleBookRedirect = (e) => {
    e.preventDefault();
    navigate('/book', { 
      state: { 
        roomId: room.id,
        checkIn,
        checkOut,
        guests: guestsCount,
        addons: {
          butler: butlerService,
          yacht: airportYacht,
          spa: spaPass
        },
        amount: totalAmount
      } 
    });
  };

  const isStarred = wishlist.includes(room.id);

  // Similar suites (exclude current one)
  const similarRooms = hotelRooms
    .filter(r => r.id !== room.id)
    .slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {/* Navigation & breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link to="/">Home</Link> / <Link to="/rooms">Suites</Link> / <span>{room.name}</span>
      </div>

      <div className={styles.titleRow}>
        <div>
          <span className="badge-gold" style={{ marginBottom: '8px' }}>{room.type}</span>
          <h1 className={styles.title}>{room.name}</h1>
        </div>
        <div className={styles.metaActions}>
          <button 
            onClick={() => toggleWishlist(room.id)} 
            className={`${styles.wishlistBtn} ${isStarred ? styles.wishlistBtnActive : ''}`}
          >
            <Heart size={16} fill={isStarred ? "currentColor" : "none"} /> 
            {isStarred ? "Starred in Wishlist" : "Star to Wishlist"}
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.mainImgContainer}>
          <img src={activeImg} alt={room.name} className={styles.mainImg} />
        </div>
        <div className={styles.thumbnailRow}>
          {room.images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`${room.name} view ${index + 1}`} 
              onClick={() => setActiveImg(img)}
              className={`${styles.thumbnail} ${activeImg === img ? styles.thumbnailActive : ''}`}
            />
          ))}
        </div>
      </section>

      {/* Main Splits */}
      <div className={styles.splitGrid}>
        <div className={styles.leftCol}>
          {/* Quick Specs */}
          <div className={styles.specsRow}>
            <div className={styles.specCard}>
              <div className={styles.specTitle}>Room Size</div>
              <div className={styles.specValue}>{room.size}</div>
            </div>
            <div className={styles.specCard}>
              <div className={styles.specTitle}>Bed Type</div>
              <div className={styles.specValue}>{room.bedType}</div>
            </div>
            <div className={styles.specCard}>
              <div className={styles.specTitle}>Occupancy</div>
              <div className={styles.specValue}>{room.occupancy}</div>
            </div>
            <div className={styles.specCard}>
              <div className={styles.specTitle}>Sanctuary View</div>
              <div className={styles.specValue}>{room.view.split(' ')[0]} View</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 style={{ marginBottom: '16px' }}>Sanctuary Heritage</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--color-text-dark)' }}>{room.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h3 style={{ marginBottom: '20px' }}>In-Suite Amenities</h3>
            <ul className={styles.amenitiesList}>
              {room.amenities.map((amenity, index) => (
                <li key={index} className={styles.amenityItem}>
                  <CheckCircle size={16} className={styles.amenityIcon} />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 style={{ marginBottom: '20px' }}>Imperial Terms & Policies</h3>
            <div className={styles.policyGrid}>
              <div className={styles.policyItem}>
                <span className={styles.policyLabel}>Royal Check-In</span>
                <span className={styles.policyText}>{room.policies.checkIn}</span>
              </div>
              <div className={styles.policyItem}>
                <span className={styles.policyLabel}>Royal Check-Out</span>
                <span className={styles.policyText}>{room.policies.checkOut}</span>
              </div>
              <div className={styles.policyItem}>
                <span className={styles.policyLabel}>Butler Cancellation</span>
                <span className={styles.policyText}>{room.policies.cancellation}</span>
              </div>
              <div className={styles.policyItem}>
                <span className={styles.policyLabel}>Pet Policy</span>
                <span className={styles.policyText}>{room.policies.pets}</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 style={{ marginBottom: '20px' }}>Guest Memoirs ({room.reviewsCount} reviews)</h3>
            <div className={styles.reviewsList}>
              {room.reviews.map((rev, index) => (
                <div key={index} className={styles.reviewItem}>
                  <div className={styles.reviewHead}>
                    <div>
                      <div className={styles.reviewer}>{rev.author}</div>
                      <span className={styles.reviewDate}>{rev.date}</span>
                    </div>
                    <div className={styles.reviewStars}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className={styles.reviewBody}>"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Calculator card */}
        <aside className={`${styles.sidebar} glass`}>
          <div className={styles.sidebarPrice}>
            <div>
              <span className={styles.priceLabel}>Rates Starting At</span>
              <div className={styles.sidebarPriceValue}>
                ₹{room.price.toLocaleString('en-IN')} <span>/ Night</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
              <Star size={14} fill="var(--color-secondary)" style={{ color: 'var(--color-secondary)' }} />
              <span>{room.rating}</span>
            </div>
          </div>

          <form onSubmit={handleBookRedirect} className={styles.sidebarForm}>
            <div>
              <label className={styles.sidebarLabel}><Calendar size={12} /> Check-In</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.sidebarLabel}><Calendar size={12} /> Check-Out</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.sidebarLabel}><Users size={12} /> Guests</label>
              <select value={guestsCount} onChange={(e) => setGuestsCount(e.target.value)}>
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                <option value="4 Adults">4 Adults</option>
              </select>
            </div>

            {/* Custom Butler Addons */}
            <div>
              <span className={styles.addonTitle}>Bespoke Luxuries & Addons</span>
              
              <label className={styles.addonOption}>
                <input 
                  type="checkbox" 
                  checked={butlerService}
                  onChange={(e) => setButlerService(e.target.checked)}
                  className={styles.addonCheckbox}
                />
                <span>Private Royal Butler service (+₹5,000/night)</span>
              </label>

              <label className={styles.addonOption}>
                <input 
                  type="checkbox" 
                  checked={airportYacht}
                  onChange={(e) => setAirportYacht(e.target.checked)}
                  className={styles.addonCheckbox}
                />
                <span>Luxury Airport Yacht Transfer (+₹15,000)</span>
              </label>

              <label className={styles.addonOption}>
                <input 
                  type="checkbox" 
                  checked={spaPass}
                  onChange={(e) => setSpaPass(e.target.checked)}
                  className={styles.addonCheckbox}
                />
                <span>Ayurvedic Couple Spa Day Pass (+₹7,500)</span>
              </label>
            </div>

            {/* Calculations Breakdown */}
            <div className={styles.sidebarMath}>
              <div className={styles.mathRow}>
                <span>₹{room.price.toLocaleString('en-IN')} x {nights} nights</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {addonCost > 0 && (
                <div className={styles.mathRow}>
                  <span>Royal Bespoke Addons</span>
                  <span>₹{addonCost.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className={styles.mathRow}>
                <span>Resort Levy & Service (10%)</span>
                <span>₹{Math.floor(totalAmount * 0.1).toLocaleString('en-IN')}</span>
              </div>
              <div className={`${styles.mathRow} ${styles.mathTotal}`}>
                <span>Estimated Total</span>
                <span>₹{Math.floor(totalAmount * 1.1).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button type="submit" className={styles.bookBtn}>
              Proceed to Book
            </button>
          </form>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '16px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Shield size={12} style={{ color: 'var(--color-accent)' }} />
            <span>Guaranteed Best Rate & Flexible Cancellation</span>
          </div>
        </aside>
      </div>

      {/* Similar Rooms Section */}
      <section className={styles.similarSection}>
        <h2 className={styles.similarTitle}>Similar Heritage Suites</h2>
        <div className={styles.similarGrid}>
          {similarRooms.map(r => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
