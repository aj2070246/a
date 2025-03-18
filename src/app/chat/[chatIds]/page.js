// src/app/chat/[chatIds]/page.js
"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { sendRequest } from "../../../utils/api";
import { useRouter, useParams } from "next/navigation";
import styles from "./chat.module.css";

export default function ChatDetailPage() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [messageText, setMessageText] = useState("");
  const router = useRouter();
  const { chatIds } = useParams(); // مثلاً "2***1"

  const fetchChat = useCallback(async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      if (!auth.token || !auth.id) {
        router.push("/login");
        return;
      }

      const [senderId, receiverId] = chatIds.split("***");
      const payload = { SenderUserId: senderId, ReceiverUserId: receiverId };
      const response = await sendRequest("/admin/getOneUserChat", {
        method: "POST",
        body: payload,
      }, auth);

      if (response.isSuccess) {
        setMessages(response.model || []); // اگه model null باشه، آرایه خالی بذار
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
  }, [router, chatIds]); // اضافه کردن وابستگی‌ها

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  const handleAdminMessage2 = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const [_, receiverId] = chatIds.split("***");
      const payload = { messageText, ReceiverUserId: receiverId };
      const response = await sendRequest("/admin/sendAdminMessage", {
        method: "POST",
        body: payload,
      }, auth);

      if (response.isSuccess) {
        setMessages([...messages, response.model]);
        setMessageText("");
        fetchChat();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdminMessage = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const [senderId, _] = chatIds.split("***");
      const payload = { messageText, ReceiverUserId: senderId };
      const response = await sendRequest("/admin/sendAdminMessage", {
        method: "POST",
        body: payload,
      }, auth);

      if (response.isSuccess) {
        setMessages([...messages, response.model]);
        setMessageText("");
        fetchChat();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUserMessage = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const [senderId, receiverId] = chatIds.split("***");
      const payload = { messageText, SenderUserId: senderId, ReceiverUserId: receiverId };
      const response = await sendRequest("/admin/SendUserMessage", {
        method: "POST",
        body: payload,
      }, auth);

      if (response.isSuccess) {
        setMessages([...messages, response.model]);
        setMessageText("");
        fetchChat();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUserMessage2 = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const [senderId, receiverId] = chatIds.split("***");
      const payload = { messageText, SenderUserId: receiverId, ReceiverUserId: senderId };
      const response = await sendRequest("/admin/SendUserMessage", {
        method: "POST",
        body: payload,
      }, auth);

      if (response.isSuccess) {
        setMessages([...messages, response.model]);
        setMessageText("");
        fetchChat();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const response = await sendRequest("/connection/deleteMessage", {
        method: "POST",
        body: { StringId: messageId },
      }, auth);

      if (response.isSuccess) {
        setMessages(messages.filter((msg) => msg.id !== messageId));
      } else {
        setError("حذف پیام ناموفق بود");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className={styles.container}>
        <h1>خطا</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!messages.length) { // تغییر به چک کردن طول آرایه
    return (
      <div className={styles.container}>
        <h1>در حال بارگذاری...</h1>
      </div>
    );
  }

  const senderId = chatIds.split("***")[0];

  return (
    <div className={styles.container}>
      <h1>
        گفتگو بین {messages[0]?.senderName || "ناشناس"} و {messages[0]?.receiverName || "ناشناس"}
      </h1>
      <div className={styles.chatBox}>
        {messages
          .filter((message) => message && message.id) // فقط پیام‌هایی که id دارن
          .map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.senderUserId === senderId ? styles.sent : styles.received
              }`}
            >
              <Link href={`/user/${message.senderUserId}`} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  <span className={styles.sender}>
                    {message.senderName}: {message.message}
                  </span>
                </a>
              </Link>
              <p>
                <span>{message.sendDateTime}</span> <span> ---- </span>{" "}
                <span>{message.messageStatusId}</span>
              </p>
              <button
                onClick={() => handleDelete(message.id)}
                className={styles.deleteButton}
                title="حذف پیام"
              >
                🗑️
              </button>
            </div>
          ))}
      </div>
      <div className={styles.inputSection}>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="پیام خود را وارد کنید"
          className={styles.textBox}
          rows="5"
        />
        <button onClick={handleUserMessage} className={styles.userButton}>
          ارسال پیام از طرف {messages[0]?.senderName || "کاربر"}
        </button>
        <button onClick={handleAdminMessage} className={styles.adminButton}>
          ارسال پیام از طرف ادمین به {messages[0]?.senderName || "کاربر"}
        </button>
        <button onClick={handleUserMessage2} className={styles.userButton}>
          ارسال پیام از طرف اون یکی کاربر
        </button>
        <button onClick={handleAdminMessage2} className={styles.adminButton}>
          ارسال پیام از طرف ادمین به اون یکی کاربر
        </button>
      </div>
    </div>
  );
}