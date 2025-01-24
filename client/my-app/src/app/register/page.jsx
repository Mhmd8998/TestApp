"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    age: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://test-app-7svt.vercel.app/api/auth/register", formData);
    router.push("/login");
  };

  return (
    <div className="container mt-5">
      <h1>إنشاء حساب</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">الاسم الأول:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="form-control"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">الاسم الأخير:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="form-control"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">اسم المستخدم:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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
          <label htmlFor="age" className="form-label">العمر:</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
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
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default Register;
