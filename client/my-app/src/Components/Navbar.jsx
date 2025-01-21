"use client"
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie'; // استيراد useCookies
import styles from './navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  // سيتأكد أن الكود سيعمل فقط في المتصفح
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined' && window.localStorage) {
      const userId = localStorage.getItem("userId");
      const [cookies, setCookies, removeCookie] = useCookies(["access_token"]); // استخدام الكوكيز
    }
  }, [isClient]);
  

  const handleLogout = async () => {
    try{
      // مسح الـ userId من localStorage
      localStorage.removeItem('userId');
      // مسح التوكن من الكوكيز بعد تسجيل الخروج
      removeCookie('access_token');
      setTimeout(()=>{
        // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
      router.push('/login');
      },4000)
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
        {userId ? (
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
            
