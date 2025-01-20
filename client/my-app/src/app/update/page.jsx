"use client";
import { useState, useEffect } from 'react';
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
  const [statusMessage, setStatusMessage] = useState(''); // حالة لتخزين الرسالة
  const [loading, setLoading] = useState(true); // حالة لتحميل البيانات
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // إرسال التوكن في رأس الطلب
        },
      });

      const result = await response.json();
      setUsers(result);
    };

    if (token) {
      fetchData();
    }
  }, [token]);
  // جلب بيانات المستخدم عند تحميل الصفحة
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // إعادة تعيين الرسالة عند بداية الإرسال

    try {
      const res = await axios.put(`http://localhost:8000/api/update/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setStatusMessage('تم تحديث البيانات بنجاح');
      setTimeout(() => {
        router.push("/");
      }, 2000); // الانتظار لعرض الرسالة قبل الانتقال
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setStatusMessage(`خطأ: ${error.response.data.message}`);
      } else {
        setStatusMessage('حدث خطأ غير متوقع، حاول مرة أخرى');
      }
    }
  };

  if (loading) {
    return <div>جاري تحميل البيانات...</div>;
  }

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
            value={response.firstname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastname">الاسم الأخير:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={response.lastname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="username">اسم المستخدم:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={response.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">كلمة المرور:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={response.password}
            onChange={handleChange}
            minLength="6" // Optional: set password length requirement
          />
        </div>

        <button type="submit">
          حفظ
        </button>
      </form>

      {statusMessage && <div className={styles['status-message']}>{statusMessage}</div>} 
    </div>
  );
};

export default Update;
      
