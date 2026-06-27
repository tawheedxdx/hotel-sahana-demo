import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, CloudSun, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './LuxuryPanel.module.css';

export default function LuxuryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState("");
  const audioRef = useRef(null);

  // Update Udaipur Local Time (IST is UTC +5:30)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play blocked by browser policy"));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.wrapperOpen : ''}`}>
      {/* Hidden audio element with royalty-free Indian sitar/flute luxury background music */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" 
        loop 
      />

      {/* Main Glass Widget Panel */}
      <div className={`${styles.panel} glass`}>
        {/* Udaipur Weather */}
        <div className={styles.section}>
          <CloudSun className={styles.icon} size={16} />
          <div>
            <span className={styles.label}>Udaipur Sky</span>
            <span className={styles.value}>Sunny, 28°C</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Local Palace Time */}
        <div className={styles.section}>
          <Clock className={styles.icon} size={16} />
          <div>
            <span className={styles.label}>Local Palace Time</span>
            <span className={styles.value} style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Ambient Sitar Audio Controller */}
        <div className={styles.audioSection} onClick={togglePlay}>
          <button className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ''}`}>
            {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <div>
            <span className={styles.label}>Resort Ambience</span>
            <span className={styles.value}>{isPlaying ? 'Savitri Raga (Playing)' : 'Savitri Raga (Muted)'}</span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`${styles.toggleBtn} glass`}
        aria-label="Toggle Luxury Panel"
      >
        <span className={styles.togglePulse} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
        {isOpen ? <ChevronRight size={18} /> : <Music size={18} />}
      </button>
    </div>
  );
}
