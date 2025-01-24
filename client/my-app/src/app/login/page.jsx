"use client";
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [, setCookies] = useCookies(["access_token"]); // استخدم [, setCookies] بدلاً من [_, setCookies]
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://test-app-7svt.vercel.app/api/auth/login", formData);

      // تحقق من حالة الاستجابة بواسطة `res.status`
      if (res.status === 200) {
        setCookies("access_token", res.data.token); // تعيين التوكن في الكوكيز
        localStorage.setItem('userId', res.data.userId); // تعيين userId في localStorage
        router.push("/"); // الانتقال إلى الصفحة الرئيسية بعد النجاح
      } else {
        setStatusMessage("حدث خطأ أثناء تسجيل الدخول.");
      }
    } catch (error) {
      setStatusMessage(error.response?.data?.message || error.message); // التعامل مع الأخطاء بشكل أكثر مرونة
    }
  };

  return (
    <div className="container mt-5">
      <h1>تسجيل الدخول</h1>
      {statusMessage && (
        <div className="alert alert-danger" role="alert">
          {statusMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">الإيميل:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">كلمة المرور:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6" // فرض الحد الأدنى لطول كلمة المرور
          />
        </div>

        <button type="submit" className="btn btn-primary">
          تسجيل دخول
        </button>
      </form>
    </div>
  );
};

export default Login;
