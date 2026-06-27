import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { hotelRooms } from '../../data/mockData';
import RoomCard from '../../components/RoomCard/RoomCard';
import styles from './Rooms.module.css';

export default function Rooms() {
  const location = useLocation();

  // Retrieve initial states from Home Booking Widget if available
  const initialRoomType = location.state?.roomType || '';

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(90000);
  const [sortBy, setSortBy] = useState("rating-desc");

  // If a roomType was selected in the Home widget, pre-fill filters
  useEffect(() => {
    if (initialRoomType) {
      // Find room detail to check if it's a suite or room
      const targetRoom = hotelRooms.find(r => r.id === initialRoomType);
      if (targetRoom) {
        setSearchQuery(targetRoom.name);
      }
    }
  }, [initialRoomType]);

  const categories = ["All", "Rooms", "Suites", "Lake View"];

  const filteredRooms = hotelRooms.filter(room => {
    // Search query matching
    const matchesSearch = 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.view.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category matching
    let matchesCategory = true;
    if (selectedCategory === "Rooms") {
      matchesCategory = room.type.includes("Room");
    } else if (selectedCategory === "Suites") {
      matchesCategory = room.type.includes("Suite");
    } else if (selectedCategory === "Lake View") {
      matchesCategory = room.view.toLowerCase().includes("lake");
    }

    // Price matching
    const matchesPrice = room.price <= priceRange;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Apply sorting
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    } else if (sortBy === "price-desc") {
      return b.price - a.price;
    } else if (sortBy === "rating-desc") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Banner Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Suite Balcony overlooking the gardens" 
            className={styles.heroImg} 
          />
        </div>
        <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.4)', marginBottom: '8px' }}>
          Imperial Accommodations
        </span>
        <h1 className={styles.heroTitle}>Suites & Private Villas</h1>
        <p className={styles.heroSub}>Escape to absolute sanctuary. Discover space, light, and detailed Indian craftsmanship designed to soothe your senses.</p>
      </section>

      {/* Filter and Search Bar Section */}
      <div className="container">
        <section className={`${styles.filterBar} glass`}>
          <div className={styles.filtersRow}>
            {/* Category tabs */}
            <div className={styles.categoryGroup}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className={styles.searchGroup}>
              <Search size={18} style={{ color: 'var(--color-text-muted)', marginRight: '-40px', position: 'relative', zIndex: 5 }} />
              <input 
                type="text" 
                placeholder="Search views, suites, or amenities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '50px' }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  style={{ marginLeft: '-40px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', position: 'relative', zIndex: 5 }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className={styles.controlsRow}>
            {/* Price Slider */}
            <div className={styles.rangeGroup}>
              <span>Max Rate:</span>
              <input 
                type="range" 
                min="10000" 
                max="90000" 
                step="5000"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                ₹{priceRange.toLocaleString('en-IN')} / Night
              </span>
            </div>

            {/* Sorting Select */}
            <div className={styles.sortGroup}>
              <span>Sort By:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="rating-desc">Highest Rated</option>
                <option value="price-asc">Rates: Low to High</option>
                <option value="price-desc">Rates: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* Room Grid Display */}
        {sortedRooms.length > 0 ? (
          <div className={styles.grid}>
            {sortedRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2>No Suites Found</h2>
            <p style={{ marginTop: '12px' }}>We couldn't find any rooms matching your search filters. Try widening your price range or adjusting keywords.</p>
            <button 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setPriceRange(90000); }}
              className={styles.primaryBtn}
              style={{ marginTop: '24px' }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
