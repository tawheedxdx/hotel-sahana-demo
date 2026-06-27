import React from 'react';
import { Star, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './FoodCard.module.css';

export default function FoodCard({ item }) {
  const { addToCart } = useApp();

  return (
    <div className={`${styles.card} glass`}>
      <div className={styles.imgContainer}>
        <img src={item.image} alt={item.name} className={styles.image} />
        {item.popular && (
          <div className={styles.popularBadge}>Chef's Special</div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h4 className={styles.name}>{item.name}</h4>
          <div className={styles.rating}>
            <Star size={12} fill="currentColor" className={styles.ratingIcon} />
            <span>{item.rating}</span>
          </div>
        </div>

        <p className={styles.desc}>{item.description}</p>

        <div className={styles.footerRow}>
          <div className={styles.price}>
            ₹{item.price.toLocaleString('en-IN')}
          </div>
          <button onClick={() => addToCart(item)} className={styles.addBtn}>
            <Plus size={14} /> Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
