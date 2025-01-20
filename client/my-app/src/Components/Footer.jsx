// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // استخدام CSS Modules

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>© 2025 جميع الحقوق محفوظة</p>
        <ul className={styles.footerLinks}>
          <li><a href="/about" className={styles.footerLink}>عن الموقع</a></li>
          <li><a href="/contact" className={styles.footerLink}>اتصل بنا</a></li>
          <li><a href="/privacy" className={styles.footerLink}>سياسة الخصوصية</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
