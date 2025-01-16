"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
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

  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(false);  

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
    setLoading(true);
    setError(null); // Reset error before submitting

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", formData);
      console.log('Response:', response.data);
      setLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      setLoading(false);
      // Check if error response exists and provide a meaningful message
      const errorMessage = error?.response?.data?.message || 'فشل في إرسال البيانات، حاول مرة أخرى';
      console.error('Error:', error);
      setError(errorMessage);
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
            min="18" // Optional: set minimum age limit (e.g., 18)
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
            minLength="6" // Optional: set password length requirement
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'جارٍ التسجيل...' : 'التالي'}
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>} 
    </div>
  );
};

export default Register;
            
