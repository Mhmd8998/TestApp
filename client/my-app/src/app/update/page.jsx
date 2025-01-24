"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import axios from 'axios';  // إضافة استيراد axios
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

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
        const response = await fetch(`https://test-app-7svt.vercel.app/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
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
      const res = await axios.put(`https://test-app-7svt.vercel.app/api/update/${userId}`, formData, {
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
    <div className="container mt-5">
      <h1>تحديث البيانات</h1>
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

        <button type="submit" className="btn btn-primary">حفظ</button>
      </form>

      {statusMessage && (
        <div className={`alert ${statusMessage.includes('خطأ') ? 'alert-danger' : 'alert-success'}`} role="alert">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default Update;
