"use client"; // این یک کامپوننت کلاینت‌ساید است

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import {
    GenderDropdown, ProvinceDropdown,
    HealtStatusDropdown, LiveTypeDropdown, MarriageStatusDropdown,
    CarValuesDropdown,
    HomeValueDropDown,
    IncomeAmountDropDown,
    RelationTypeDropDown,
    GhadDropDown,
    VaznDropDown,
    TipDropDown,
    ZibaeeDropDown,
    CheildCountDropDown,
    RangePoostDropDown,
    FirstCheildAgeDown
} from "../../../components/Dropdowns"; // م

import { sendRequest } from "../../../utils/api";
const UpdateProfilePage = ({ }) => {
    const { stringId } = useParams(); // مثلاً "2***1"
    // حالت اولیه فرم
    const [formData, setFormData] = useState({
        currentUserId: "some-user-id", // باید از توکن یا جای دیگری تأمین شود
        userId: stringId,
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        mobile: "",
        myDescription: "",
        rDescription: "",
        BirthDateString: "",
        gender: 0,
        healtStatus: 0,
        liveType: 0,
        marriageStatus: 0,
        province: 0,
        incomeAmount: 0,
        homeValue: 0,
        carValue: 0,
        relationType: 0,
        ghad: 0,
        vazn: 0,
        rangePoost: 0,
        cheildCount: 0,
        firstCheildAge: 0,
        zibaeeNumber: 0,
        tipNumber: 0,
        emailAddress: "",
        userStatusId: 0,
        mobileStatusId: 0,
        emailStatusId: 0,
    });
    // حالت برای دراپ‌دان‌ها
    const [dropdownData, setDropdownData] = useState({
        genders: [],
        healtStatus: [],
        liveTypes: [],
        marriageStatus: [],
        provinces: [],
        incomeAmount: [],
        homeValue: [],
        carValue: [],
        relationType: [],
        ghad: [],
        vazn: [],
        tipNumber: [],
        zibaeeNumber: [],
        cheildCount: [],
        firstCheildAge: [],
        rangePoost: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // دریافت اطلاعات اولیه کاربر و دراپ‌دان‌ها
    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth = JSON.parse(localStorage.getItem("auth") || "{}");
                if (!auth.token || !auth.id) {
                    router.push("/login");
                    return;
                }

                const payload = { stringId: stringId };

                const userRes = await sendRequest("/admin/GetUserProfile", {
                    method: "POST",
                    body: payload,
                }, auth);

                if (userRes.isSuccess) {
                    const { model } = userRes;
                    setFormData((prev) => ({
                        ...prev,
                        userId: model.id,
                        firstName: model.firstName || "",
                        lastName: model.lastName || "",
                        userName: model.userName || "",
                        password: model.password || "",
                        mobile: model.mobile || "",
                        myDescription: model.myDescription || "",
                        rDescription: model.rDescription || "",
                        BirthDateString: `${model.birthDateYear}-${String(model.birthDateMonth).padStart(2, "0")}-${String(model.birthDateDay).padStart(2, "0")}`,
                        gender: model.genderId || 0,
                        healtStatus: model.healtStatus || 0,
                        liveType: model.liveType || 0,
                        marriageStatus: model.marriageStatus || 0,
                        province: model.province || 0,
                        incomeAmount: model.incomeAmount || 0,
                        homeValue: model.homeValue || 0,
                        carValue: model.carValue || 0,
                        relationType: model.relationType || 0,
                        ghad: model.ghad || 0,
                        vazn: model.vazn || 0,
                        rangePoost: model.rangePoost || 0,
                        cheildCount: model.cheildCount || 0,
                        firstCheildAge: model.firstCheildAge || 0,
                        zibaeeNumber: model.zibaeeNumber || 0,
                        tipNumber: model.tipNumber || 0,
                        emailAddress: model.emailAddress || "",
                        userStatusId: model.userStatusId || 0,
                        mobileStatusId: model.mobileStatusId || 0,
                        emailStatusId: model.emailAddressStatusId || 0,
                    }));
                }

                const dropdownRes = await sendRequest("/publicData/GetAllDropDownsItems", { method: "GET" });
                if (dropdownRes.isSuccess) {
                    console.log(dropdownRes.model.genders);
                    setDropdownData({
                        genders: dropdownRes.model.genders || [],
                        healtStatus: dropdownRes.model.healtStatus || [],
                        liveTypes: dropdownRes.model.liveTypes || [],
                        marriageStatus: dropdownRes.model.marriageStatus || [],
                        provinces: dropdownRes.model.provinces || [],
                        incomeAmount: dropdownRes.model.incomeAmount || [],
                        carValue: dropdownRes.model.carValue || [],
                        homeValue: dropdownRes.model.homeValue || [],
                        relationType: dropdownRes.model.relationType || [],
                        ghad: dropdownRes.model.ghad || [],
                        vazn: dropdownRes.model.vazn || [],
                        zibaeeNumber: dropdownRes.model.zibaeeNumber || [],
                        tipNumber: dropdownRes.model.tipNumber || [],
                        cheildCount: dropdownRes.model.cheildCount || [],
                        firstCheildAge: dropdownRes.model.firstCheildAge || [],
                        rangePoost: dropdownRes.model.rangePoost || [],
                    });
                }
            } catch (err) {
                if (err.message === "Token is invalid") {
                    router.push("/login"); // ریدایرکت به لاگین در صورت 401
                }
                setError("خطا دریافت اطلاعات");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [stringId]);

    // مدیریت تغییرات فرم
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ارسال فرم برای آپدیت
    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");
        if (!auth.token || !auth.id) {
            router.push("/login");
            return;
        }

        try {
            const res = await sendRequest("/admin/updateUserInfo", {
                method: "POST",
                body: formData,
            }, auth);

            if (res.isSuccess) {
                alert("پروفایل با موفقیت به‌روزرسانی شد");
            } else {
                alert("خطا: " + res.message);
            }
        } catch (err) {
            console.error(err);
            alert("خطا در ------------ ارسال اطلاعات");
        }
    };

    if (loading) return <Typography>در حال بارگذاری...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Box sx={{ padding: 4, direction: "rtl" }}>
            <Typography variant="h4" gutterBottom>
                ویرایش پروفایل کاربر
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="نام"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="نام خانوادگی"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid> <Grid item xs={12} sm={6}>
                        <TextField
                            label="پسورد"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="mobileStatusId"
                            name="mobileStatusId"
                            value={formData.mobileStatusId}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="emailStatusId"
                            name="emailStatusId"
                            value={formData.emailStatusId}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="userStatusId"
                            name="userStatusId"
                            value={formData.userStatusId}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="نام کاربری"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="موبایل"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="توضیحات من"
                            name="myDescription"
                            value={formData.myDescription}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="توضیحات دیگران"
                            name="rDescription"
                            value={formData.rDescription}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="تاریخ تولد (yyyy-mm-dd)"
                            name="BirthDateString"
                            value={formData.BirthDateString}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ایمیل"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <GenderDropdown
                        gender={formData.gender}
                        handleChange={handleChange}
                        genders={dropdownData.genders}
                    />

                    <ProvinceDropdown
                        province={formData.province}
                        handleChange={handleChange}
                        provinces={dropdownData.provinces}
                    />
                    <HealtStatusDropdown
                        healtStatus={formData.healtStatus}
                        handleChange={handleChange}
                        healtStatusOptions={dropdownData.healtStatus}
                    />
                    <LiveTypeDropdown
                        liveType={formData.liveType}
                        handleChange={handleChange}
                        liveTypes={dropdownData.liveTypes}
                    />
                    <MarriageStatusDropdown
                        marriageStatus={formData.marriageStatus}
                        handleChange={handleChange}
                        marriageStatusOptions={dropdownData.marriageStatus}
                    />
                    <HomeValueDropDown
                        homeValue={formData.homeValue}
                        handleChange={handleChange}
                        homeValues={dropdownData.homeValue}
                    />
                    <CarValuesDropdown
                        carValue={formData.carValue}
                        handleChange={handleChange}
                        carValueOptions={dropdownData.carValue}
                    />
                    <IncomeAmountDropDown
                        incomeAmount={formData.incomeAmount}
                        handleChange={handleChange}
                        incomeAmounts={dropdownData.incomeAmount}
                    />
                    <RelationTypeDropDown
                        relationType={formData.relationType}
                        handleChange={handleChange}
                        relationTypes={dropdownData.relationType}
                    />

                    <RangePoostDropDown
                        values={formData.rangePoost}
                        handleChange={handleChange}
                        options={dropdownData.rangePoost}
                    />
                    <TipDropDown
                        values={formData.tipNumber}
                        handleChange={handleChange}
                        options={dropdownData.tipNumber}
                    />
                    <ZibaeeDropDown
                        values={formData.zibaeeNumber}
                        handleChange={handleChange}
                        options={dropdownData.zibaeeNumber}
                    />
                    <GhadDropDown
                        values={formData.ghad}
                        handleChange={handleChange}
                        options={dropdownData.ghad}
                    />
                    <VaznDropDown
                        values={formData.vazn}
                        handleChange={handleChange}
                        options={dropdownData.vazn}
                    />
                    <CheildCountDropDown
                        values={formData.cheildCount}
                        handleChange={handleChange}
                        options={dropdownData.cheildCount}
                    />

                    <FirstCheildAgeDown
                        values={formData.firstCheildAge}
                        handleChange={handleChange}
                        options={dropdownData.firstCheildAge}

                    />

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            به‌روزرسانی پروفایل
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default UpdateProfilePage;