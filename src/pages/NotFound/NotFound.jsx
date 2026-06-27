import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, HelpCircle, ArrowLeft } from 'lucide-react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      {/* Background Overlay */}
      <div className={styles.overlay} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`${styles.container} glass`}
      >
        <span className={styles.errorNum}>404</span>
        
        <h1 className={styles.heading}>Sanctuary Not Found</h1>
        
        <div className={styles.goldDivider} />

        <p className={styles.desc}>
          The suite, culinary experience, or pathway you are seeking is currently private or does not exist in our lake palace database.
        </p>

        <div className={styles.actions}>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Return to Oasis
          </Link>
          <Link to="/contact" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={16} /> Contact Concierge
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
