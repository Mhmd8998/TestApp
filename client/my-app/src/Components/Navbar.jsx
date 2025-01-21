"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './navbar.module.css';  // سيتم استيراد التنسيقات من ملف CSS خارجي

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const userId = localStorage.getItem("userId");

  // تحقق مما إذا كانت قيمة userId موجودة وليست فارغة أو null
  const isUserIdValid = userId && userId.trim() !== '';

  const handleLogout = async () => {
    // مسح التوكن من الكوكيز عن طريق إرسال طلب إلى الخادم
    await fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // إرسال الكوكيز مع الطلب
    });

    // مسح الـ userId من localStorage
    if (userId) {
      localStorage.removeItem('userId');
    }

    // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h2>BlogDb</h2>
      </div>
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <li><a href="/" className={styles.navLink}>الرئيسية</a></li>
        <li><a href="/about" className={styles.navLink}>عن الموقع</a></li>
        <li><a href="/profile" className={styles.navLink}>الملف الشخصي</a></li>
        <li><a href="/contact" className={styles.navLink}>اتصل بنا</a></li>
        {isUserIdValid ? (
          <li><button onClick={handleLogout} className={styles.logoutBtn}>تسجيل الخروج</button></li>
        ) : (
          <li><button onClick={() => router.push('/login')} className={styles.logoutBtn}>تسجيل الدخول</button></li>
        )}
      </ul>
      <button className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
      
