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
      setFile(selectedFile); // Set the file if it's valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Set uploading state to true when the upload starts

    const formData = new FormData();
    formData.append('profilePic', file);
    formData.append('userId', userId);

    try {
      const res = await fetch('http://localhost:8000/api/profile/upload-peofile-photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // Add token to the header
        },
        body: formData,
      });
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
          name="profilePic"
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
    
