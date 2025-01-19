"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styles from './update.module.css';

const Update = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

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
      await axios.put(`http://localhost:8000/api/update/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      router.push("/");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <h1>تحديث البيانات</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">الاسم الأول:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
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
      
