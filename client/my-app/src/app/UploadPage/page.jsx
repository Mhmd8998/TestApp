"use client"
// pages/upload.js
import { useState ,useEffect} from 'react';
import { useCookies } from 'react-cookie';
import style from "./upimage.module.css"

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); 
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]); // استخدام الكوكيز
  const token = cookies.access_token;
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId); // تعيين الـ userId المسترجع من localStorage
    }
  }, []);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // تعيين الملف المرفوع
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const res = await fetch('http://localhost:8000/api/auth/profile/upload-peofile-photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // إضافة التوكن إلى الهيدر
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className={style.main}>
      <h1>Upload Profile Photo</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPage;
