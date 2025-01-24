"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios'; // استيراد axios
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

export default function Create() {
  const router = useRouter();
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [post, setPost] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    });
  };

  useEffect(() => {
    if (!token) {
      return router.push("/login");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://test-app-7svt.vercel.app/api/post", post, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      router.push("/"); // الانتقال إلى الصفحة الرئيسية بعد النجاح
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>إنشاء منشور</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">عنوان المنشور:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">وصف المنشور:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={post.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">إرسال</button>
      </form>
    </div>
  );
}
