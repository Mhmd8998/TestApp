"use client"
// pages/upload.js
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import style from "./upimage.module.css";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); 
  const [cookies] = useCookies(["access_token"]); // useCookies with read-only access
  const token = cookies.access_token;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId); // Set the userId retrieved from localStorage
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Optional file validation (e.g., max file size)
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB max
        setMessage('File is too large. Max size is 5MB.');
        return;
      }
      // Check file type (optional)
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(selectedFile.type)) {
        setMessage('Invalid file type. Please upload an image (JPEG, PNG, or GIF).');
        return;
      }
      setFile(selectedFile); // Set the file if it's valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload!');
      return;
    }

    if (!token) {
      setMessage('No access token found. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const res = await fetch('http://localhost:8000/api/profile/upload-profile-photo', { // Fixed typo in URL
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // Add token to the header
        },
        body: formData,
      });

      let responseMessage = 'Something went wrong.';
      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = await res.json();
          responseMessage = data.message || responseMessage;
        } catch (error) {
          responseMessage = 'Failed to parse response.';
        }
      } else {
        // If not JSON, handle it as text
        const text = await res.text();
        responseMessage = `Unexpected response format: ${text}`;
      }

      if (res.ok) {
        setMessage(responseMessage);
      } else {
        setMessage(responseMessage);
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
  
