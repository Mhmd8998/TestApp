"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import styles from './Register.model.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
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
    await axios.post("http://localhost:8000/api/auth/login", formData);
    router.push("/");
  };

  return (
    <div className={styles['form-container']}>
      <h1>تسجيل الدخول</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          تسجيل دخول
        </button>
      </form>
    </div>
  );
};

export default Login;
            
