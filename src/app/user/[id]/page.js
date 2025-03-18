// src/app/user/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { sendRequest } from "../../../utils/api";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import styles from "./user.module.css"; // استایل جدا

export default function UserPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = useParams(); // گرفتن id از URL

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const auth = JSON.parse(localStorage.getItem("auth") || "{}");
                if (!auth.token || !auth.id) {
                    router.push("/login");
                    return;
                }

                const payload = { stringId: id }; // فرض بر اینه که API به UserId نیاز داره
                const response = await sendRequest("/admin/getUserInfo", {
                    method: "POST",
                    body: payload,
                }, auth);

                if (response.isSuccess) {
                    setUser(response.model);
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
        fetchUser();
    }, [id, router]);

    if (error) {
        return (
            <div className={styles.container}>
                <h1>خطا</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.container}>
                <h1>در حال بارگذاری...</h1>
            </div>
        );
    }

    return (
             <div sx={{ textAlign: "center" }}>

                <div className={styles.container}>
                    <h1 className={styles.name}>{user.firstName} - {user.lastName}</h1>

                    {/* درباره من */}
                    <div className={styles.box}>
                        <h2 className={styles.boxTitle}>درباره من</h2>
                        <p className={styles.description}>{user.myDescription}</p>
                    </div>
 
                    <div className={styles.box}>
                        <h2 className={styles.boxTitle}>درباره تو</h2>
                        <p className={styles.description}>{user.rDescription}</p>
                    </div>

                    {/* اطلاعات کاربر */}
                    <div className={styles.info}>
                        <p>📅 تاریخ تولد: {user.birthDate.split("T")[0]}</p>
                        <p>🎂 سن: {user.age} سال</p>
                        <p>💙 وضعیت سلامت: {user.healthStatus}</p>
                        <p>🏡 نوع زندگی: {user.liveType}</p>
                        <p>❤️ وضعیت تأهل: {user.marriageStatus}</p>
                        <p>📍 استان: {user.province}</p>
                        <p>💰 درآمد: {user.incomeAmount}</p>
                        <p>🚗 ارزش خودرو: {user.carValue}</p>
                        <p>🏠 ارزش خانه: {user.homeValue}</p>
                        <p>🕒 آخرین فعالیت: {user.lastActivityDate.split("T")[0]}</p>
                        <p>🤝 نوع رابطه مورد نظر: {user.relationType}</p>
                        <p>📏 قد: {user.ghad}</p>
                        <p>⚖️ وزن: {user.vazn}</p>
                        <p>👶 تعداد فرزندان: {user.cheildCount}</p>
                        <p>👦 سن فرزند بزرگتر: {user.firstCheildAge}</p>
                        <p>🌕 رنگ پوست: {user.rangePoost}</p>
                        <p>💄 میزان زیبایی: {user.zibaeeNumber}</p>
                        <p>🧑‍🦱 میزان خوش‌تیپی: {user.tipNUmber}</p>
                        <p>📱 وضعیت موبایل: {user.mobileStatus}</p>
                        <p>📧 وضعیت ایمیل: {user.emailStatus}</p>
                        <p>📅 تاریخ عضویت: {user.memberDate}</p>
                        <p>📅 ایمیل: {user.mobileNumber}</p>
                        <p>📅 موبایل : {user.emailAddress}</p>
                    </div>

                    <Link href={`/chat/${user.id}`} className={styles.button}>
                        شروع گفتگو
                    </Link> 
                     <Link href={`/update/${user.id}`} className={styles.button}>
                        ویرایش کاربر
                    </Link>
                </div>
            </div>
    );
}