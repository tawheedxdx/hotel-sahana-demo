import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import styles from './Gallery.module.css';

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    title: "Infinity Edge Pool Sunset",
    category: "Ayurvedic Spa & Pools"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    title: "Deluxe Heritage Sanctuary",
    category: "Suites"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    title: "Lakeside Private Canopy Dinner",
    category: "Dining"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    title: "Executive Palace Suite Living Room",
    category: "Suites"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    title: "Ayurvedic Herbal Treatment Bath",
    category: "Ayurvedic Spa & Pools"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    title: "Savitri Palace Hall Archways",
    category: "Gardens & Architecture"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    title: "Maharajah Grand Suite Bedroom",
    category: "Suites"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    title: "Saffron Tandoori Oven Kebabs",
    category: "Dining"
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
    title: "Resort Mughal Archway Entrance",
    category: "Gardens & Architecture"
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    title: "Morning Yoga Deck overlooking Pichola",
    category: "Ayurvedic Spa & Pools"
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    title: "Palace Wine Cellar Tastings",
    category: "Dining"
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    title: "Lake Pichola Sunset Yacht cruise",
    category: "Gardens & Architecture"
  }
];

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState("All Photos");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = ["All Photos", "Suites", "Dining", "Ayurvedic Spa & Pools", "Gardens & Architecture"];

  const filteredImages = galleryImages.filter(img => 
    selectedFilter === "All Photos" || img.category === selectedFilter
  );

  const openLightbox = (index) => {
    // We need to map the index in filteredImages to the index in galleryImages
    const selectedImg = filteredImages[index];
    const originalIndex = galleryImages.findIndex(img => img.id === selectedImg.id);
    setLightboxIndex(originalIndex);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
  };

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
            src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=80" 
            alt="Mughal style palace corridors" 
            className={styles.heroImg} 
          />
        </div>
        <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.4)', marginBottom: '8px' }}>
          Visual Indulgence
        </span>
        <h1 className={styles.heroTitle}>Resort Memories</h1>
        <p className={styles.heroSub}>A photographic showcase of our heritage suites, Michelin dining rooms, holistic spas, and Lake Pichola views.</p>
      </section>

      {/* Categories Bar */}
      <div className="container">
        <section className={`${styles.filterBar} glass`}>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`${styles.catBtn} ${selectedFilter === filter ? styles.catBtnActive : ''}`}
            >
              {filter}
            </button>
          ))}
        </section>

        {/* Masonry Grid */}
        <section className={styles.grid}>
          {filteredImages.map((img, index) => (
            <motion.div 
              key={img.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={styles.card}
              onClick={() => openLightbox(index)}
            >
              <img src={img.url} alt={img.title} className={styles.image} />
              <div className={styles.overlay}>
                <span className={styles.tag}>{img.category}</span>
                <h3 className={styles.title}>{img.title}</h3>
                <Maximize2 size={16} style={{ marginTop: '8px' }} />
              </div>
            </motion.div>
          ))}
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightbox}
            onClick={handleCloseLightbox}
          >
            <button className={styles.closeBtn} onClick={handleCloseLightbox} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={handlePrev} aria-label="Previous Image">
              <ChevronLeft size={24} />
            </button>

            <div className={styles.lightboxImgContainer} onClick={(e) => e.stopPropagation()}>
              <img 
                src={galleryImages[lightboxIndex].url} 
                alt={galleryImages[lightboxIndex].title} 
                className={styles.lightboxImg} 
              />
              <div className={styles.lightboxDetails}>
                <span className={styles.tag} style={{ color: 'var(--color-secondary)' }}>{galleryImages[lightboxIndex].category}</span>
                <h2 className={styles.lightboxTitle}>{galleryImages[lightboxIndex].title}</h2>
              </div>
            </div>

            <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={handleNext} aria-label="Next Image">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
