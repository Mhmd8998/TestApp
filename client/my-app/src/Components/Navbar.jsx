"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie'; // استيراد useCookies
import styles from './navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null); // لإدارة الـ userId
  const [userImage, setUserImage] = useState(null); // لحفظ صورة المستخدم
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]); // استخدام الكوكيز
  const token = cookies.access_token;

  
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId); // تعيين الـ userId المسترجع من localStorage
    }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUserImage(result.profilePic); // تعيين رابط الصورة
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
      }
    };

    if (token && userId) {
      fetchData();
    }
  }, [token, userId]);

  const handleLogout = async () => {
    try {
      // مسح الـ userId من localStorage
      localStorage.removeItem('userId');
      // مسح التوكن من الكوكيز بعد تسجيل الخروج
      removeCookie('access_token');
      
      // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
      router.push('/login');
      console.log(userImage);
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الخروج:', error);
    }
  };
  

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h2>BlogDb</h2>
      </div>
      {userImage && (
        <img src={userImage} alt="User Profile" width={40} height={40} />
      )}
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
