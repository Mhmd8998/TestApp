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

  const handleChange
