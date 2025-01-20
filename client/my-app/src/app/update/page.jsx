"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import axios from 'axios';  // إضافة استيراد axios
import styles from './update.module.css';

const Update = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    age: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setStatusMessage('معرف المستخدم غير موجود.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText} (Status Code: ${response.status})`);
        }

        const result = await response.json();
        setFormData({
          firstname: result.firstname,
          lastname: result.lastname,
          username: result.username,
          age: result.age,
        });

        setLoading(false);
      } catch (error) {
        setStatusMessage('حدث خطأ أثناء جلب البيانات');
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchData();
    }
  }, [token, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const res = await axios.put(`http://localhost:8000/api/update/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setStatusMessage('تم تحديث البيانات بنجاح');
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setStatusMessage(error.response?.data?.message || error.message || 'حدث خطأ أثناء التحديث');
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
          <label htmlFor="age"> العمر:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <button type="submit">حفظ</button>
      </form>

      {statusMessage && (
        <div className={styles['status-message']}>
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default Update;
        
