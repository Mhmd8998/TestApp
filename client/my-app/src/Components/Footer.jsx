// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start fixed-bottom">
      <div className="container p-4">
        <p className="text-center">© 2025 جميع الحقوق محفوظة</p>
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="mx-3">
            <Link href="/about" className="text-dark">
              عن الموقع
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/contact" className="text-dark">
              اتصل بنا
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/privacy" className="text-dark">
              سياسة الخصوصية
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
