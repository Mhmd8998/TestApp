"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from './Register.model.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    age: '',
    password: '',
  });

  const [error, setError] = useState(null);  // لحفظ الأخطاء
  const [loading, setLoading] = useState(false);  // لحالة التحميل

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // تعيين حالة التحميل على true عند إرسال البيانات

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", formData);
      console.log('Response:', response.data);  // التعامل مع الاستجابة هنا
      setLoading(false);  // تعيين حالة التحميل على false بعد الانتهاء
    } catch (error) {
      console.error('Error:', error);
      setError('فشل في إرسال البيانات، حاول مرة أخرى');  // تعيين رسالة الخطأ
      setLoading(false);
    }
  };

  return (
    <div className={styles['form-container']}>
      <h1>إنشاء حساب</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">الاسم الأول:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastName">الاسم الأخير:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="username">اسم المستخدم:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">الإيميل:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="age">العمر:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">كلمة المرور:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'جارٍ التسجيل...' : 'التالي'}
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}  {/* عرض الخطأ إذا حدث */}
    </div>
  );
};

export default Register;
