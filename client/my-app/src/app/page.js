"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from "./page.module.css";

export default function Home() {
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [users, setUsers] = useState([]);
  const router = useRouter();
  
  const handleUpdate = (userId) => {
    router.push(`/update?id=${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/users', {
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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hello World</h1>
        <div>
          {
            users.map((user) => (
              <div key={user._id} className={styles.user}> 
                <h1>{user.firstname} {user.lastname}</h1>
                <p>{user.username}</p>
                <p>{user.age}</p>
                <p>{user.createdAt}</p>
                <br />
                <button type="submit" onClick={() => handleUpdate(user._id)}>
                  تعديل
                </button>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
    }
  
