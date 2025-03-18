// src/app/login/page.js
"use client";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { sendRequest } from "../../utils/api";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [captchaImage, setCaptchaImage] = useState(null);
  const [captchaId, setCaptchaId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchCaptcha = async () => {
    const response = await sendRequest("/publicData/getCaptcha", { method: "GET" });
    setCaptchaImage(response.image);
    setCaptchaId(response.guid);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { userName, password, captchaValue, CaptchaId: captchaId };
    const response = await sendRequest("/admin/adminlogin", { method: "POST", body: payload });

    if (response.isSuccess) {
      const auth = { token: response.model.token, id: response.model.id };
      localStorage.setItem("auth", JSON.stringify(auth)); // ذخیره در localStorage
      router.push("/lastusers");
    } else {
      setError(response.message);
      fetchCaptcha();
    }
  };

  return (
    <div className={styles.container}>
      <h1>ورود</h1>
      {error && <p className={styles.error}>{error}</p>}
      {captchaImage && <Image src={captchaImage} alt="Captcha" className={styles.captcha} />}
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="userName">نام کاربری</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">رمز عبور</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="captchaValue">کپچا</label>
          <input
            id="captchaValue"
            type="text"
            value={captchaValue}
            onChange={(e) => setCaptchaValue(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          ورود
        </button>
      </form>
    </div>
  );
}