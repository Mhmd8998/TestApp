"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie'; // استيراد useCookies
import styles from './navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null); // لإدارة الـ userId
  const [userImage, setUserImage] = useState(null); // لحفظ صورة المستخدم
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]); // استخدام الكوكيز
  const token = cookies.access_token;

  
    useEffect(()=>{
      if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId); // تعيين الـ userId المسترجع من localStorage
      }
    },[])


  useEffect(() => {
    const fetchData = async () => {
      if(!userId){
        return;
      }
      try {
        const response = await fetch(`https://test-app-7svt.vercel.app/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUserImage("https://test-app-7svt.vercel.app"+result.profilePic); // تعيين رابط الصورة
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
      
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الخروج:', error);
    }
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          {userImage && (
            <Link href="/UploadPage">
              <img src={userImage} alt="User Profile" width={40} height={40} className="d-inline-block align-top" />
            </Link>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                الرئيسية
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                عن الموقع
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/profile" className="nav-link">
                الملف الشخصي
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                اتصل بنا
              </Link>
            </li>
            {userId ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger">
                  تسجيل الخروج
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button onClick={() => router.push('/login')} className="btn btn-outline-primary">
                  تسجيل الدخول
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  
  );
};

export default Navbar;
