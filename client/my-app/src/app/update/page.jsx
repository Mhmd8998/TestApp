"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import styles from './Register.model.css';

const Update = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
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
    await axios.post("http://localhost:8000/api/auth/update", formData);
    router.push("/");
  };

  return (
    <div className={styles['form-container']}>
      <h1>تحديث البيانات </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">الاسم الأول:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastname">الاسم الأخير:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
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
          حفظ
        </button>
      </form>
    </div>
  );
};

export default Update;
            
