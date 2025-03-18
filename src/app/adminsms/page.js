// src/app/allChat/page.js
"use client";

import { useState, useEffect } from "react";
import { sendRequest } from "../../utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./allChat.module.css";

export default function ChatPage() {
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");
        if (!auth.token || !auth.id) {
          router.push("/login");
          return;
        }

        const response = await sendRequest("/admin/GetAdminAllMessages", {
          method: "POST",
          body: {},
        }, auth);

        if (response.isSuccess) {
          setChats(response.model);
        } else {
          setError(response.message || "مشکلی پیش آمده");
        }
      } catch (err) {
        if (err.message === "Token is invalid") {
          router.push("/login");
        } else {
          setError(err.message);
        }
      }
    };
    fetchChats();
  }, [router]);

  if (error) {
    return (
      <div className={styles.container}>
        <h1>خطا</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!chats) {
    return (
      <div className={styles.container}>
        <h1>در حال بارگذاری...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>خلاصه چت‌ها</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>فرستنده</th>
            <th>گیرنده</th>
            <th>تعداد پیام‌ها</th>
            <th>پیام‌های خوانده‌نشده</th>
            <th>آخرین تاریخ دریافت</th>
            <th>وضعیت پیام</th>
          </tr>
        </thead>
        <tbody>
          {chats
            .filter((chat) => chat && chat.id) // فقط چت‌هایی که id دارن
            .map((chat) => (
              <tr key={chat.id}>
                <td>
                  <Link href={`/chat/${chat.senderUserId}***${chat.receiverUserId}`}>
                    {chat.senderName}
                  </Link>
                </td>
                <td>
                  <Link href={`/chat/${chat.senderUserId}***${chat.receiverUserId}`}>
                    {chat.receiverName}
                  </Link>
                </td>
                <td>
                  <Link href={`/chat/${chat.senderUserId}***${chat.receiverUserId}`}>
                    {chat.totalMessages}
                  </Link>
                </td>
                <td>
                  <Link href={`/chat/${chat.senderUserId}***${chat.receiverUserId}`}>
                    {chat.unreadMessagesCount}
                  </Link>
                </td>
                <td>
                  <Link href={`/chat/${chat.senderUserId}***${chat.receiverUserId}`}>
                    {chat.lastReceivedMessageDate}
                  </Link>
                </td>
                <td>
                  <Link href={`/chat/${chat.senderUserId}***${chat.receiverUserId}`}>
                    {chat.messageStatusId}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}