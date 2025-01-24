// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // استيراد Bootstrap

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <p className="text-center">© 2025 جميع الحقوق محفوظة</p>
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="mx-3">
            <Link href="/about" passHref>
              <a className="text-dark">عن الموقع</a>
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/contact" passHref>
              <a className="text-dark">اتصل بنا</a>
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/privacy" passHref>
              <a className="text-dark">سياسة الخصوصية</a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
