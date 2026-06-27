import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail] = useState("alex@mercer.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError("Invalid credentials. Please use the default guest credentials: alex@mercer.com / password123, or create a new account.");
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
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Enter your credentials to access your guest dashboard.</p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <ShieldAlert size={16} style={{ float: 'left', marginRight: '8px', marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
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

          <div>
            <label className={styles.label}>Security Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Login to Dashboard
          </button>
        </form>

        <div className={styles.footer}>
          <span>Don't have an Imperial Club account? </span>
          <Link to="/register" className={styles.link}>Register Here</Link>
        </div>
      </motion.div>
    </div>
  );
}
