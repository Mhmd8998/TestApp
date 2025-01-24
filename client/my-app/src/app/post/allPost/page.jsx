"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios'; // استيراد axios
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

export default function AllPost() {
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
  }, [token, posts]);

  return (
    <div className="container">
      <main className="my-5  d-flex flex-column align-items-center ">
        {/* عرض رسالة الخطأ إذا كان هناك خطأ */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* عرض المنشورات إذا كانت البيانات موجودة */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="card border-dark mb-3" style={{ maxWidth: '18rem' }} key={post._id}>
              <div className="card-header ">
                {post.userId.username} 
              </div>
              <div className="card-body w-100">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
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
