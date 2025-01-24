"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // حالة لعرض الأخطاء
  const router = useRouter();
  const idToken = localStorage.getItem("userId");

  const handleUpdate = (userId) => {
    router.push(`/update?id=${userId}`);
  };

  useEffect(() => {
  const fetchData = async () => {
    if (!token) {
      setErrorMessage("يجب عليك تسجيل الدخول أولًا");
      return;
    }

    try {
      const response = await fetch('https://test-app-7svt.vercel.app/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      
      if (!response.ok) {
        const text = await response.text();
        console.error(`Network response was not ok: ${text}`);
        setErrorMessage("حدث خطأ في جلب البيانات. يرجى التحقق من الرابط أو المحاولة لاحقًا.");
        return; // إنهاء الدالة هنا بدلاً من إطلاق استثناء
      }

      const result = await response.json();
      setUsers(result);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
    }
  };

  fetchData();
}, [token]);
  return (
    <div className="container">
      <main className="my-5">
        {/* عرض رسالة الخطأ إذا كان هناك خطأ */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* عرض المستخدمين إذا كانت البيانات موجودة */}
        {users.length > 0 ? (
          users.map((user) => (
            <div className="card mb-3" style={{ width: '18rem' }} key={user._id}>
              <div className="card-body">
                <h5 className="card-title">{user.firstname} {user.lastname}</h5>
                <p className="card-text">{new Date(user.createdAt).toLocaleDateString()}</p>
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
        )}
      </main>
    </div>
  );
          }
