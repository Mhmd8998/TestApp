"use client"
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import style from "./upimage.module.css";

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

    if (!userId) {
      setMessage('User ID not found. Please log in.');
      return;
    }

    if (!token) {
      setMessage('No access token found. Please log in.');
      return;
    }

    setIsUploading(true); // Set uploading state to true when the upload starts

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);

    try {
      const res = await fetch('http://localhost:8000/api/profile/upload-peofile-photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // Add token to the header
        },
        body: formData,
      });

      let responseMessage = 'Something went wrong.';
      const contentType = res.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        try {
          const data = await res.json();
          responseMessage = data.message || responseMessage;
        } catch (error) {
          responseMessage = 'Failed to parse response.';
        }
      } else {
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
    } finally {
      setIsUploading(false); // Reset uploading state after the process is done
    }
  };

  return (
    <div className={style.main}>
      <h1>Upload Profile Photo</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/jpeg, image/png, image/gif" // Limit file types for better UX
        />
        <button type="submit" disabled={isUploading}>Upload</button>
      </form>
      {isUploading && <p>Uploading...</p>} {/* Show message while uploading */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPage;
    
