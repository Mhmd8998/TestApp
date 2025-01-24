"use client";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); 
  const [cookies] = useCookies(["access_token"]); // useCookies with read-only access
  const token = cookies.access_token;
  const [isUploading, setIsUploading] = useState(false); // State to track the uploading status

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId); // Set the userId retrieved from localStorage
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];  
    if (selectedFile) {
      setFile(selectedFile); // Set the file if it's valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Set uploading state to true when the upload starts

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);

    try {
      const res = await fetch('https://test-app-7svt.vercel.app/api/profile/upload-peofile-photo', {
        method: 'POST',
        headers: {
          'Authorization':
