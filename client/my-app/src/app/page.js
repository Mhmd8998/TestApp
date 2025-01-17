"use client"
import Image from "next/image";
import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import styles from "./page.module.css";

export default function Home() {
  const [cookies] =useCookies(["access_token"]);
  const token = cookies.access_token
  const [users, setUsers] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      // إذا كنت تخزن التوكن في localStorage أو أي مكان آخر
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // إرسال التوكن في رأس الطلب
        },
      });
      const result = await response.json();
      setData(result);
    };
    
    fetchData();
  }, []);
  return (
    <div className={styles.page}>
    <main className={styles.main}>
    <h1>Hello World</h1>
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
    </main>
    </div>
  );
}
