import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';  // سيتم استيراد التنسيقات من ملف CSS خارجي

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // من الممكن إضافة منطق تسجيل الخروج هنا مثل مسح الكوكيز أو التوجيه
    router.push('/login');  // إعادة التوجيه إلى صفحة تسجيل الدخول
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h2>موقعي</h2>
      </div>
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <li><a href="/" className={styles.navLink}>الرئيسية</a></li>
        <li><a href="/about" className={styles.navLink}>عن الموقع</a></li>
        <li><a href="/profile" className={styles.navLink}>الملف الشخصي</a></li>
        <li><a href="/contact" className={styles.navLink}>اتصل بنا</a></li>
        <li><button onClick={handleLogout} className={styles.logoutBtn}>تسجيل الخروج</button></li>
      </ul>
      <button className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
  
