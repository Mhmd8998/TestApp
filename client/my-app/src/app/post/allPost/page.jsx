"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

export default function Home() {
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // حالة لعرض الأخطاء
  const router = useRouter();
  

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setErrorMessage("يجب عليك تسجيل الدخول أولًا");
        return router.push("/login");
      }

      try {
        const response = await axios.get('https://test-app-7svt.vercel.app/api/post', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setErrorMessage("حدث خطأ في جلب البيانات. يرجى التحقق من الرابط أو المحاولة لاحقًا.");
          return; // إنهاء الدالة هنا بدلاً من إطلاق استثناء
        }

        const result = await response.json();
        setPosts(result);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
      }
    };

    fetchData();
  }, [token,posts]);

  return (
    <div className="container">
      <main className="my-5">
        
      </main>
    </div>
  );
      }
