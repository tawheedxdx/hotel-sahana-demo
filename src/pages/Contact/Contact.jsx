import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Contact.module.css';

export default function Contact() {
  const { user } = useApp();

  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, submit to backend
    setSubmitted(true);
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
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80" 
            alt="Palace grounds lakefront pool deck" 
            className={styles.heroImg} 
          />
        </div>
        <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.4)', marginBottom: '8px' }}>
          Concierge Services
        </span>
        <h1 className={styles.heroTitle}>Connect with the Palace</h1>
        <p className={styles.heroSub}>Ready to assist. Reach out to our 24/7 guest relations office for arrivals, suite customizations, or events.</p>
      </section>

      {/* Main Splits */}
      <section className="section-padding container">
        <div className={styles.splitGrid}>
          {/* Details Column */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Imperial Office</h2>
              
              <div className={styles.infoItem}>
                <MapPin size={18} className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Address</span>
                  <span className={styles.infoVal}>
                    Lake Pichola Palace Grounds,<br />
                    Udaipur, Rajasthan, 313001, India
                  </span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone size={18} className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Phone Inquiries</span>
                  <span className={styles.infoVal}>+91 294 8876500</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Mail size={18} className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Email Inquiries</span>
                  <span className={styles.infoVal}>concierge@sahana.luxury</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock size={18} className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Service Availability</span>
                  <span className={styles.infoVal}>24 Hours / 7 Days a week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div 
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`${styles.formCard} glass`}
                >
                  <h2 className={styles.formTitle}>Concierge Inquiry</h2>
                  <p className={styles.formDesc}>Submit this form, and our resident butler team will respond within 2 hours.</p>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.grid}>
                      <div>
                        <label className={styles.label}>Your Name</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          required 
                          className={styles.input}
                        />
                      </div>
                      <div>
                        <label className={styles.label}>Email Address</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.colSpan}>
                        <label className={styles.label}>Subject</label>
                        <select 
                          value={subject} 
                          onChange={(e) => setSubject(e.target.value)}
                          className={styles.select}
                        >
                          <option value="General Inquiry">General Concierge Inquiry</option>
                          <option value="Booking Modification">Stay Booking Modification</option>
                          <option value="Dining Event">Dining or Banquet Booking</option>
                          <option value="Ayurvedic Treatment">Ayurvedic Spa Packages</option>
                        </select>
                      </div>
                      <div className={styles.colSpan}>
                        <label className={styles.label}>Detailed Inquiry Message</label>
                        <textarea 
                          rows="6" 
                          required 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)} 
                          placeholder="Please describe how we can elevate your stay..."
                          className={styles.textarea}
                        />
                      </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <Send size={14} /> Send Message to Concierge
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.successBox}
                >
                  <div className={styles.successIcon}>
                    <CheckCircle size={32} />
                  </div>
                  <h2>Message Dispatched</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Thank you for connecting. Your inquiry has been routed to the resident butler desk. A concierge will respond to <strong>{email}</strong> shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary" style={{ marginTop: '12px' }}>
                    Send Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
