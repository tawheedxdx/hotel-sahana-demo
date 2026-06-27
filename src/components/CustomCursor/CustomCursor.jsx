import React, { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Only enable custom cursor on desktop pointing devices
    if (window.matchMedia('(max-width: 1024px)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth easing lag for the outer ring
  useEffect(() => {
    if (isHidden) return;
    
    let animFrame;
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });
      animFrame = requestAnimationFrame(updateRing);
    };
    
    animFrame = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animFrame);
  }, [position, isHidden]);

  // Track hover on clickables
  useEffect(() => {
    if (isHidden) return;

    const addHover = () => setIsHovered(true);
    const removeHover = () => setIsHovered(false);

    const updateListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], [data-hover-glow]'
      );
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    updateListeners();

    // Watch for DOM changes to apply listeners to newly rendered elements
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <>
      <div 
        className={`${styles.cursor} ${isHovered ? styles.cursorHover : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`${styles.ring} ${isHovered ? styles.ringHover : ''}`}
        style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px` }}
      />
    </>
  );
}
