"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios'; // استيراد axios
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

        setPosts(response.data);
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
        {/* عرض رسالة الخطأ إذا كان هناك خطأ */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* عرض المنشورات إذا كانت البيانات موجودة */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div class="card border-dark mb-3" style="max-width: 18rem;" key={post._id}>
               <div class="card-header">{post.userId.username} <span>{post.createdAt}</span></div>
               <div class="card-body">
                 <h5 class="card-title">{post.title}</h5>
                 <p class="card-text">{post.description}</p>
                </div>
    
            </div>
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            لا توجد منشورات لعرضها
          </div>
        )}
      </main>
    </div>
  );
  }
