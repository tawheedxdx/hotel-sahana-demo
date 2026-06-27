import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Clock, Compass, Wine, Sparkles, BookOpen, Star } from 'lucide-react';
import { foodMenuItems } from '../../data/mockData';
import styles from './Restaurant.module.css';

export default function Restaurant() {
  // Get 4 popular chef items to showcase
  const signatureDishes = foodMenuItems.filter(item => item.popular).slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cinematic Banner */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80" 
            alt="Savitri Dining Room Interior Setup" 
            className={styles.heroImg} 
          />
        </div>
        <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.4)', marginBottom: '8px' }}>
          Imperial Fine Dining
        </span>
        <h1 className={styles.heroTitle}>Savitri Dining Room</h1>
        <p className={styles.heroSub}>Gastronomy at Pichola. Savor Michelin-standard Indian fusion with absolute water panoramas.</p>
      </section>

      {/* Philosophy & Scheduling splits */}
      <section className="section-padding container">
        <div className={styles.splitGrid}>
          {/* Philosophy Column */}
          <div className={styles.aboutCol}>
            <span className="badge-gold" style={{ width: 'auto', alignSelf: 'flex-start' }}>Gourmet Philosophy</span>
            <h2 style={{ color: 'var(--color-primary)' }}>Heritage Reimagined</h2>
            <p>
              Under the creative direction of Executive Chef Sanjay Raturi, Savitri Dining Room fuses the deep royal culinary traditions of Mewar with advanced progressive cooking techniques. We utilize organic vegetables grown in our palace gardens and hand-ground spices from local cooperative farms.
            </p>
            <p>
              Each dish is structured to tell a story—from our saffron-infused lobster cooked in clay ovens to gold leaf filet mignons roasted on open charcoal pits.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
              <Link to="/menu" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} /> View Gourmet Menu
              </Link>
              <Link to="/reserve-table" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Utensils size={16} /> Book Dining Reservation
              </Link>
            </div>
          </div>

          {/* Operational Hours */}
          <div>
            <div className={styles.hoursCard}>
              <h3 className={styles.hoursTitle}>Reservations & Timing</h3>
              <div className={styles.hoursRow}>
                <span className={styles.hoursLabel}>Royal Breakfast</span>
                <span className={styles.hoursVal}>07:00 AM – 10:30 AM</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.hoursLabel}>Imperial Lunch</span>
                <span className={styles.hoursVal}>12:00 PM – 03:30 PM</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.hoursLabel}>Sunset Afternoon Tea</span>
                <span className={styles.hoursVal}>04:30 PM – 06:00 PM</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.hoursLabel}>Grand Dinner Saloon</span>
                <span className={styles.hoursVal}>07:30 PM – 11:30 PM</span>
              </div>
              <div className={styles.hoursRow} style={{ borderBottom: 0, paddingBottom: 0, marginTop: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className={styles.hoursLabel} style={{ fontSize: '0.85rem' }}>Attire Code</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                    Smart Casual for breakfast and lunch. Formal elegant wear requested for dinner seatings.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.reserveCard}>
              <Wine size={32} style={{ color: 'var(--color-secondary)' }} />
              <h4>Private Culinary Events</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
                Book our private dining chamber or reserve Pichola Floating Deck for custom anniversaries or business banquets.
              </p>
              <Link to="/contact" className={styles.reserveBtn}>
                Inquire with Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Zones Section */}
      <section className={styles.zonesSection}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto 40px auto' }}>
            <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.3)' }}>Luxury Settings</span>
            <h2 style={{ color: 'white', marginTop: '12px' }}>Exquisite Dining Zones</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '8px' }}>
              Choose your sanctuary layout. Each space offers a unique acoustic and visual environment.
            </p>
          </div>

          <div className={styles.zoneGrid}>
            {/* Zone 1 */}
            <div className={styles.zoneCard}>
              <div className={styles.zoneImgContainer}>
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" 
                  alt="Lake Pichola Floating Canopy" 
                  className={styles.zoneImg} 
                />
              </div>
              <div className={styles.zoneContent}>
                <h3 className={styles.zoneTitle}>The Floating Mughal Canopy</h3>
                <p className={styles.zoneDesc}>
                  Set directly over Pichola water, this private deck features low heritage seating, warm torchlights, and a personalized butler. Booking requires a minimum billing, includes private sitar performances.
                </p>
              </div>
            </div>

            {/* Zone 2 */}
            <div className={styles.zoneCard}>
              <div className={styles.zoneImgContainer}>
                <img 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80" 
                  alt="Terrace Dining Overlook" 
                  className={styles.zoneImg} 
                />
              </div>
              <div className={styles.zoneContent}>
                <h3 className={styles.zoneTitle}>The Palace View Terrace</h3>
                <p className={styles.zoneDesc}>
                  Located on the rooftop terrace, offering cool lake breezes and absolute vistas of Udaipur City Palace lit up at night. Excellent spot for romance and evening champagne toastings.
                </p>
              </div>
            </div>

            {/* Zone 3 */}
            <div className={styles.zoneCard}>
              <div className={styles.zoneImgContainer}>
                <img 
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80" 
                  alt="Savitri Indoor Grand Hall" 
                  className={styles.zoneImg} 
                />
              </div>
              <div className={styles.zoneContent}>
                <h3 className={styles.zoneTitle}>Savitri Grand Palace Hall</h3>
                <p className={styles.zoneDesc}>
                  Our indoor hall features majestic archways, gold-accented pillars, crystal chandeliers, and royal portraits. Fully climate-controlled, perfect for corporate banquets and large families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Showcase */}
      <section className={`${styles.signatureSection} container`}>
        <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto' }}>
          <span className="badge-gold">Chef's Highlights</span>
          <h2 style={{ color: 'var(--color-primary)', marginTop: '12px' }}>Signature Masterpieces</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
            A glimpse into the artisan creations that define the Savitri gourmet repertoire.
          </p>
        </div>

        <div className={styles.dishGrid}>
          {signatureDishes.map(dish => (
            <div key={dish.id} className={styles.dishCard}>
              <img src={dish.image} alt={dish.name} className={styles.dishImg} />
              <div className={styles.dishContent}>
                <h4 className={styles.dishTitle}>{dish.name}</h4>
                <p className={styles.dishDesc}>{dish.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)' }}>₹{dish.price}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 600 }}>
                    <Star size={12} fill="var(--color-secondary)" style={{ color: 'var(--color-secondary)' }} />
                    <span>{dish.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/menu" className="btn-primary">
            Explore Full Menu & Order Suite-Service
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
