import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(name, email, password, phone);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <img 
        src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1920&q=80" 
        alt="Sahana Palace Main Saloon" 
        className={styles.bgImage} 
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`${styles.card} glass-dark`}
      >
        <div className={styles.header}>
          <span className="badge-gold" style={{ color: 'var(--color-secondary)', borderColor: 'rgba(212,175,55,0.4)' }}>Imperial Club</span>
          <h1 className={styles.title}>Join the Club</h1>
          <p className={styles.subtitle}>Unlock exclusive suites, earn 5% back in loyalty points, and secure best rates.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.colSpan}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Lady Genevieve"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.colSpan}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. genevieve@monarchy.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>Security Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>Phone Number</label>
              <input 
                type="tel" 
                placeholder="e.g. +91 9988776655"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Register Account
          </button>
        </form>

        <div className={styles.footer}>
          <span>Already have an Imperial Club account? </span>
          <Link to="/login" className={styles.link}>Login Here</Link>
        </div>
      </motion.div>
    </div>
  );
}
