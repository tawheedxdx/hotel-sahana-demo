import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
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
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1920&q=80" 
            alt="Heritage Palace Exterior Frontage" 
            className={styles.heroImg} 
          />
        </div>
        <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.4)', marginBottom: '8px' }}>
          Palace History
        </span>
        <h1 className={styles.heroTitle}>The Palace Chronicle</h1>
        <p className={styles.heroSub}>A legacy of royal hospitality. Erected in 1894 as a guest lodge, now Udaipur's premier luxury resort.</p>
      </section>

      {/* Narrative Section */}
      <section className="section-padding container">
        <div className={styles.splitGrid}>
          <div className={styles.storyCol}>
            <span className="badge-gold">Heritage Chronicles</span>
            <h2 style={{ color: 'var(--color-primary)' }}>A Century of Royalty</h2>
            <p>
              Constructed at the turn of the 19th century by descendants of Maharana Jagat Singh II, Sahana Palace initially served as a summer sanctuary and private hunting lodge for the Mewar royal household. Its grand arches and white limestone facades were designed to reflect Udaipur's brilliant sun over Pichola waters.
            </p>
            <p>
              In 1984, the palace grounds underwent a meticulous 5-year structural restoration, converting the private court chambers into ultra-luxury guest suites, while preserving the century-old hand-carved pillars, marble fountains, and stained-glass windows.
            </p>
            <p>
              Today, Hotel Sahana balances imperial luxury with modern ecological design, inviting discerning travelers to partake in royal heritage and peaceful wellness.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Link to="/rooms" className="btn-primary">Explore Heritage Suites</Link>
            </div>
          </div>

          <div className={styles.storyImgContainer}>
            <img 
              src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80" 
              alt="Hand carved marble fountains on palace grounds" 
              className={styles.storyImg} 
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto' }}>
            <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.3)' }}>Our Commitments</span>
            <h2 style={{ color: 'white', marginTop: '12px' }}>Imperial Values</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '8px' }}>
              Every interaction at Hotel Sahana is guided by four principles of hospitality and stewardship.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Award size={32} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>Discreet Royal Service</h3>
              <p className={styles.valueDesc}>
                Each suite features a dedicated butler team trained in traditional court etiquette, ensuring absolute privacy and bespoke attention.
              </p>
            </div>

            <div className={styles.valueCard}>
              <ShieldCheck size={32} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>Heritage Preservation</h3>
              <p className={styles.valueDesc}>
                Every restoration effort uses authentic local lime mortar, marble dust, and artisan guild secrets to maintain the structural legacy.
              </p>
            </div>

            <div className={styles.valueCard}>
              <Heart size={32} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>Ecological Stewardship</h3>
              <p className={styles.valueDesc}>
                We employ lake-water cooling, organic waste composting, plastic-free suites, and solar panel grids to protect Lake Pichola's biosphere.
              </p>
            </div>

            <div className={styles.valueCard}>
              <Sparkles size={32} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>Artisan Community Support</h3>
              <p className={styles.valueDesc}>
                We commit 5% of all resort levies to Mewar artisan grants, funding local metalworkers, weavers, and Miniature Painting guilds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className={`${styles.teamSection} container`}>
        <div className="text-center" style={{ maxWidth: '650px', margin: '0 auto' }}>
          <span className="badge-gold">Palace Guardians</span>
          <h2 style={{ color: 'var(--color-primary)', marginTop: '12px' }}>The Leadership Team</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
            Meet the directors devoted to curating your ultra-luxury sanctuary experience.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {/* Director 1 */}
          <div className={styles.teamCard}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" 
              alt="Vikram Singh Mewar" 
              className={styles.teamImg} 
            />
            <div className={styles.teamContent}>
              <span className={styles.teamName}>Vikram Singh Mewar</span>
              <span className={styles.teamRole}>Managing Director</span>
              <p className={styles.teamBio}>
                A direct descendant of the founding family, Vikram supervises the preservation archives and community artisan guilds.
              </p>
            </div>
          </div>

          {/* Director 2 */}
          <div className={styles.teamCard}>
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" 
              alt="Sanjay Raturi" 
              className={styles.teamImg} 
            />
            <div className={styles.teamContent}>
              <span className={styles.teamName}>Chef Sanjay Raturi</span>
              <span className={styles.teamRole}>Executive Culinary Lead</span>
              <p className={styles.teamBio}>
                With 15+ years in Michelin restaurants across London and Mumbai, Sanjay directs the gastronomy programs at Savitri.
              </p>
            </div>
          </div>

          {/* Director 3 */}
          <div className={styles.teamCard}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80" 
              alt="Ananya Sharma" 
              className={styles.teamImg} 
            />
            <div className={styles.teamContent}>
              <span className={styles.teamName}>Ananya Sharma</span>
              <span className={styles.teamRole}>Director of Wellness</span>
              <p className={styles.teamBio}>
                Ananya possesses a Master's degree in Ayurvedic medicine, leading custom herbal therapies and yoga at Prana Spa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
