"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

export default function Create() {
  const [post,setPost] = useState({
    title:"",
    description:""
  });


  const handleChange =(e) => {
    const {name, value} = e.target
    setPost({
      ...post,
      [name]:value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://test-app-7svt.vercel.app/api/post",
                     post,
                     headers:{
                       Authorization:`Bearer ${token}`
                     }
                    );
   // router.push("/login");
  };

  return (
    <div className="container">
      
    </div>
  );
}
