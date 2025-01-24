"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from "./page.module.css";

export default function Home() {
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // حالة لعرض الأخطاء
  const router = useRouter();
  const idToken = localStorage.getItem("userId"); // تصحيح الأخطاء هنا

  // دالة للانتقال إلى صفحة التعديل
  const handleUpdate = (userId) => {
    router.push(`/update?id=${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      // تحقق من وجود التوكن أولًا
      if (!token) {
        setErrorMessage("يجب عليك تسجيل الدخول أولًا");
        return;
      }

      try {
        const response = await fetch('https://test-app-7svt.vercel.app/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // إرسال التوكن في رأس الطلب
          },
        });

        

        const result = await response.json();
        setUsers(result); // تعيين البيانات إذا كانت الاستجابة ناجحة
        setErrorMessage(""); // إعادة تعيين رسالة الخطأ إذا نجحت العملية

      } catch (error) {
        console.error(error);
        setErrorMessage(error.message); // عرض رسالة الخطأ إذا فشل الطلب
      }
    };

    fetchData(); // استدعاء دالة جلب البيانات عند تحميل الصفحة
  }, [token]); // تحديث عند تغيير التوكن

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* عرض رسالة الخطأ إذا كان هناك خطأ */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
             {errorMessage}
          </div>
        )}

{/* عرض المستخدمين إذا كانت البيانات موجودة */}
{users ? (
  users.map((user) => (
    <div className="card" style={{ width: '18rem' }} key={user._id}>
      <div className="card-body">
        <h5 className="card-title">{user.firstname} {user.lastname}</h5>
        <p className="card-text">{new Date(user.createdAt).toLocaleDateString()}</p>    
        {/* تعديل المستخدم إذا كانت idToken تساوي _id */}
        {idToken === user._id && (
          <button type="button" onClick={() => handleUpdate(user._id)} className="btn btn-primary">
            تعديل
          </button>
        )}
      </div>
    </div>
  ))
) : (
  <div className="alert alert-danger" role="alert">
             لا توجد بيانات لعرضها
          </div>
      </main>
    </div>
  );
          }
            
