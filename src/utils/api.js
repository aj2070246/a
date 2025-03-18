// src/utils/api.js

// src/utils/api.js
const BASE_API = "https://api.hamsaryar.com";

// لیست متدهایی که هدر نمی‌خوان
const NO_AUTH_ENDPOINTS = ["/publicData/getCaptcha", "admin/adminlogin"];

export const sendRequest = async (endpoint, options = {}, auth = {}) => {
  const isNoAuthEndpoint = NO_AUTH_ENDPOINTS.includes(endpoint);
  const defaultHeaders = {
    "Content-Type": "application/json",
    // فقط برای متدهایی که هدر می‌خوان، token و id رو اضافه کن
    ...(!isNoAuthEndpoint && auth.token && { token: auth.token }),
    ...(!isNoAuthEndpoint && auth.id && { currentUserId: auth.id }),
  };

  // اضافه کردن currentUserId به body برای درخواست‌های POST
  const bodyWithUserId =
    options.method === "POST" && !isNoAuthEndpoint && auth.id
      ? JSON.stringify({ ...options.body, currentUserId: auth.id })
      : options.body
      ? JSON.stringify(options.body)
      : null;

  const response = await fetch(`${BASE_API}${endpoint}`, {
    method: options.method || "GET",
    headers: isNoAuthEndpoint ? { "Content-Type": "application/json" } : { ...defaultHeaders, ...options.headers },
    body: bodyWithUserId,
  });

  // چک کردن 401 Unauthorized
  if (response.status === 401) {
    if (typeof window !== "undefined") { // مطمئن شو فقط توی کلاینت اجرا بشه
      localStorage.removeItem("auth"); // پاک کردن کانتکس (اگه از localStorage استفاده می‌کنی)
      window.location.href = "/login"; // ریدایرکت به لاگین
    }
    throw new Error("Token is invalid");
  }

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

// فانکشن برای چک کردن auth و ریدایرکت
export const checkAuthAndRedirect = (auth) => {
  if (!auth.token || !auth.id) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return false;
  }
  return true;
};