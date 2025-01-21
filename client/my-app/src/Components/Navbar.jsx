"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie'; // استيراد useCookies
import styles from './navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]); // استخدام الكوكيز
  const userId = localStorage.getItem("userId");

  // تحقق مما إذا كانت قيمة userId موجودة وليست فارغة أو null
  const isUserIdValid = userId && userId.trim() !== '';

  const handleLogout = async () => {
    try {
      // مسح التوكن من الكوكيز عن طريق إرسال طلب إلى الخادم مع الكوكيز
      const response = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // إرسال الكوكيز مع الطلب
        headers: {
          'Authorization': `Bearer ${cookies.access_token}` // إرسال التوكن في الهيدر
        }
      });

      if (!response.ok) {
        throw new Error('فشل في تسجيل الخروج');
      }

      // مسح الـ userId من localStorage
      localStorage.removeItem('userId');

      // مسح التوكن من الكوكيز بعد تسجيل الخروج
      removeCookie('access_token');

      // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
      router.push('/login');
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الخروج:', error);
      // هنا يمكنك إظهار رسالة خطأ للمستخدم إذا أردت
    }
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
            
