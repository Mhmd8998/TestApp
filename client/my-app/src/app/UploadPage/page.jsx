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
      const res = await fetch('https://test-app-7svt.vercel.app/api/profile/upload-profile-photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setMessage('File uploaded successfully!');
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setIsUploading(false); // Reset uploading state after the process is done
    }
  };

  return (
    <div className="container mt-5">
      <h1>Upload Profile Photo</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <input 
          type="file" 
          name="image"
          onChange={handleFileChange} 
          className="form-control mb-3"
          accept="image/jpeg, image/png, image/gif" // Limit file types for better UX
        />
        <button type="submit" className="btn btn-primary" disabled={isUploading}>Upload</button>
      </form>
      {isUploading && <p>Uploading...</p>} {/* Show message while uploading */}
      {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">{message}</div>}
    </div>
  );
};

export default UploadPage;
