import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, Maximize2, Users, Compass } from 'lucide-react';
import styles from './RoomCard.module.css';

export default function RoomCard({ room }) {
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/book', { state: { roomId: room.id } });
  };

  return (
    <div 
      className={`${styles.card} glass`}
      onClick={() => navigate(`/rooms/${room.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.imgContainer}>
        <img src={room.image} alt={room.name} className={styles.image} />
        <div className={styles.badge}>{room.type}</div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{room.name}</h3>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" className={styles.ratingIcon} />
            <span>{room.rating}</span>
          </div>
        </div>

        <p className={styles.desc}>
          {room.description.length > 120 
            ? `${room.description.substring(0, 115)}...` 
            : room.description
          }
        </p>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <Maximize2 size={14} className={styles.detailIcon} />
            <span>{room.size}</span>
          </div>
          <div className={styles.detailItem}>
            <Users size={14} className={styles.detailIcon} />
            <span>{room.occupancy}</span>
          </div>
          <div className={styles.detailItem} style={{ gridColumn: 'span 2' }}>
            <Compass size={14} className={styles.detailIcon} />
            <span>{room.view}</span>
          </div>
        </div>

        <div className={styles.footerRow}>
          <div className={styles.priceCol}>
            <span className={styles.priceLabel}>Rates From</span>
            <div className={styles.price}>
              ₹{room.price.toLocaleString('en-IN')} <span>/ Night</span>
            </div>
          </div>
          <button onClick={handleBookNow} className={styles.bookBtn}>
            Book Suite
          </button>
        </div>
      </div>
    </div>
  );
}
