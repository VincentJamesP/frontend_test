"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import Gallery from "./gallery";
import { User } from "./types/user";
import { GET } from "./api/users/route";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: User[] = await GET();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className={styles.main}>
      {users.length > 0 ? <Gallery users={users} /> : <p>Loading...</p>}
    </main>
  );
}
