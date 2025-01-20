"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import styles from './update.module.css';

const Update = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    age: '',
  });
  const [statusMessage, setStatusMessage] = useState(''); // Store error/success message
  const [loading, setLoading] = useState(true); // Loading state
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Send token in request header
          },
        });

        if (!response.ok) {
          // If response is not okay, throw an error
          throw new Error(`API Error: ${response.statusText} (Status Code: ${response.status})`);
        }

        const result = await response.json();
        // Update form data with the fetched result
        setFormData({
          firstname: result.firstname,
          lastname: result.lastname,
          username: result.username,
          age: result.age,
        });

        setLoading(false);

      } catch (error) {
        console.error("Error during fetching:", error); // Log detailed error
        setStatusMessage('حدث خطأ أثناء جلب البيانات'); // Display error message
        setLoading(false);
      }
    };

    if (token) {
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
    setStatusMessage(''); // Reset status message before submitting

    try {
      const res = await axios.put(`http://localhost:8000/api/update/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setStatusMessage('تم تحديث البيانات بنجاح');
      setTimeout(() => {
        router.push("/");
      }, 2000); // Wait to show success message before redirect
    } catch (error) {
      setStatusMessage('حدث خطأ أثناء التحديث');
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
          
