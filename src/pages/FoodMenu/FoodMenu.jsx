import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { foodMenuItems } from '../../data/mockData';
import FoodCard from '../../components/FoodCard/FoodCard';
import styles from './FoodMenu.module.css';

export default function FoodMenu() {
  const location = useLocation();
  const { cart, getCartCount, getCartTotal } = useApp();

  // Retrieve routing states if pre-filled from Home widget
  const prefill = location.state || {};
  const prefillCategory = prefill.category || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Map home page widget selections to menu categories
  useEffect(() => {
    if (prefillCategory) {
      if (prefillCategory === "Breakfast") {
        setSelectedCategory("Breakfast");
      } else if (prefillCategory === "Lunch" || prefillCategory === "Dinner") {
        setSelectedCategory("Main Course");
      } else if (prefillCategory === "Desserts") {
        setSelectedCategory("Desserts");
      } else if (prefillCategory === "Drinks") {
        setSelectedCategory("Beverages");
      }
    }
  }, [prefillCategory]);

  const categories = ["All", "Appetizers", "Main Course", "Desserts", "Beverages", "Breakfast"];

  const filteredItems = foodMenuItems.filter(item => {
    // Search query matching
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category matching
    const matchesCategory = 
      selectedCategory === "All" || 
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Banner */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80" 
            alt="Palace gourmet delicacies" 
            className={styles.heroImg} 
          />
        </div>
        <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.4)', marginBottom: '8px' }}>
          Gourmet Room Service
        </span>
        <h1 className={styles.heroTitle}>The Imperial Menu</h1>
        <p className={styles.heroSub}>Delivered to your doorstep. Order fresh appetizers, traditional royal Rajasthani mains, and curated cellar wines.</p>
      </section>

      {/* Filter and Search Bar */}
      <div className="container">
        <section className={`${styles.filterBar} glass`}>
          {/* Category Tabs */}
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

          {/* Search bar */}
          <div className={styles.searchGroup}>
            <Search size={16} style={{ color: 'var(--color-text-muted)', marginRight: '-36px', position: 'relative', zIndex: 5 }} />
            <input 
              type="text" 
              placeholder="Search gourmet dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '45px' }}
            />
          </div>
        </section>

        {/* Grid display */}
        {filteredItems.length > 0 ? (
          <div className={styles.grid}>
            {filteredItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>No Culinary Delicacies Found</h3>
            <p style={{ marginTop: '12px' }}>Adjust your filters or query to explore our kitchen's catalog.</p>
          </div>
        )}
      </div>

      {/* Floating Room Service Cart Indicator */}
      <AnimatePresence>
        {getCartCount() > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={styles.cartFloatBanner}
          >
            <ShoppingBag size={20} style={{ color: 'var(--color-secondary)' }} />
            <div className={styles.cartFloatText}>
              {getCartCount()} Delicacies in Cart (₹{getCartTotal().toLocaleString('en-IN')})
            </div>
            {/* We can prompt to click to trigger checkout or simply let them know to click cart at the top */}
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>
              Open Cart in Header to Order
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
