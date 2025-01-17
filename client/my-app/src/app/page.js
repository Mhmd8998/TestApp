"use client"
import Image from "next/image";
import {useCookies} from 'react-cookie';
import styles from "./page.module.css";

export default function Home() {
  const [cookies] =useCookies(["access_token"]);
  const token = cookies.access_token
  return (
    <div className={styles.page}>
    <main className={styles.main}>
    <h1>Hello World</h1>
    <p>{token}</p>
    </main>
    </div>
  );
}
