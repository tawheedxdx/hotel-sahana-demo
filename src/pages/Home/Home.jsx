import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import BookingWidget from '../../components/BookingWidget/BookingWidget';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  // Offers Data (matching screenshot 3)
  const offers = [
    {
      id: 1,
      title: "Flat 45% Off",
      sub: "on Hotel bookings",
      code: "Code: FLAT45",
      bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      tag: "Limited Offer"
    },
    {
      id: 2,
      bank: "HSBC",
      title: "Flat 15% Off",
      sub: "On domestic Hotels with HSBC credit card + interest free EMI",
      bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      img: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=400&q=80",
      tag: "HSBC Exclusive"
    },
    {
      id: 3,
      bank: "HDFC BANK",
      title: "Flat ₹700 Off",
      sub: "On domestic Hotels with HDFC credit card + interest free EMI",
      bg: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
      tag: "HDFC Exclusive"
    }
  ];

  // Popular Suites Data (pivoted from destinations)
  const suites = [
    {
      name: "Lakeview Pavilion",
      trains: "From ₹15,000 / Night",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Maharaja Heritage Suite",
      trains: "From ₹28,000 / Night",
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Mewari Pool Villa",
      trains: "From ₹35,000 / Night",
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Royal Garden Suite",
      trains: "From ₹18,000 / Night",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Saffron Lake Room",
      trains: "From ₹12,000 / Night",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Aravalli View Suite",
      trains: "From ₹16,000 / Night",
      img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className={styles.homeContainer}>
      
      {/* Cinematic Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <video 
            className={styles.heroVideo}
            autoPlay={true} 
            loop={true} 
            muted={true} 
            playsInline={true}
            preload="auto"
          >
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.videoOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroTitle}
          >
            Your journey,<br />Just a Tap Away
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.heroSub}
          >
            Search great deals on stays, lakeside dining, spa sessions and more
          </motion.p>
        </div>

        <div className={styles.widgetContainer}>
          <BookingWidget />
        </div>
      </section>

      {/* Popular Suites Section */}
      <section className="section-padding container">
        <div className={styles.sectionHeader}>
          <div>
            <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'var(--color-accent)' }}>Luxury Retreat</span>
            <h2 className={styles.sectionTitle}>Suites & Pavilions</h2>
          </div>
          <button onClick={() => navigate('/rooms')} className={styles.viewAllBtn}>
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className={styles.destinationsGrid}>
          {suites.map((suite, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6 }}
              className={styles.destCard}
              onClick={() => navigate('/rooms')}
            >
              <img src={suite.img} alt={suite.name} className={suite.destImg || styles.destImg} />
              <div className={styles.destOverlay}>
                <h3 className={styles.destName}>{suite.name}</h3>
                <span className={styles.destTrains}>{suite.trains}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hotel Resort Banner */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div className={styles.trainBanner}>
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" 
            alt="Sahana Palace Lakeview Pavilion" 
            className={styles.bannerBg} 
          />
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerLogo}>
                <Sparkles size={16} /> <span>सहना पैलेस</span>
              </div>
              <h2 className={styles.bannerTitle}>Sahana Palace Udaipur 2026</h2>
              <p className={styles.bannerSub}>Special lakeside suites with private pool access from 1 January 2026</p>
              <button onClick={() => navigate('/rooms')} className={styles.bannerBtn}>
                Book a Suite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Offers Section */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className="badge-gold">Best offers for you</span>
              <h2 className={styles.sectionTitle}>Exclusive Deals & Discounts</h2>
            </div>
          </div>

          <div className={styles.offersRow}>
            {offers.map(offer => (
              <div key={offer.id} className={styles.offerCard}>
                <div className={styles.offerTextPart}>
                  <div className={styles.offerTag}>{offer.tag}</div>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerSubText}>{offer.sub}</p>
                  {offer.code && <span className={styles.offerCode}>{offer.code}</span>}
                </div>
                <div className={styles.offerImgPart}>
                  <img src={offer.img} alt={offer.title} className={styles.offerImg} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Saffron Lake Palace Dining */}
      <section className="section-padding container">
        <div className={styles.splitGrid}>
          <div className={styles.collageColumn}>
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" 
              alt="Luxury palace table setting" 
              className={styles.collageFeatured} 
            />
          </div>
          <div className={styles.textColumn}>
            <span className="badge-gold">Michelin Lakeside Dining</span>
            <h2 className={styles.restaurantTitle}>Savitri Dining Room</h2>
            <p className={styles.restaurantDesc}>
              Hovering over the sacred waters of Pichola, Savitri features royal Mewari recipes curated by award-winning chefs. Relish artisanal dishes underneath the moonlit sky.
            </p>
            <div className={styles.restaurantBtnRow}>
              <Link to="/reserve-table" className={styles.goldBtn}>
                Reserve Table
              </Link>
              <Link to="/menu" className={styles.outlineBtn}>
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
