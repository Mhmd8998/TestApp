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
        const response = await fetch('http://localhost:8000/api/users', {
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
          <div className={styles.error}>
            {errorMessage}
          </div>
        )}

        {/* عرض المستخدمين إذا كانت البيانات موجودة */}
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className={styles.user}>
              <h1>{user.firstname} {user.lastname}</h1>
              <p>{user.username}</p>
              <p>{user.age}</p>
              <p>{user.createdAt}</p>
              <br />
              {/* تعديل المستخدم إذا كانت idToken تساوي _id */}
              {idToken === user._id && (
                <button type="submit" onClick={() => handleUpdate(user._id)}>
                  تعديل
                </button>
              )}
            </div>
          ))
        ) : (
          <p>لا توجد بيانات مستخدمين لعرضها</p>
        )}
      </main>
    </div>
  );
          }
            
