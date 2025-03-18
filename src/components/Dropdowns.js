import React from 'react';


import { FormControl, InputLabel, Select, MenuItem, Grid, FormHelperText } from '@mui/material';

const Dropdowns = ({ label, name, value, onChange, options, error, helperText, isRequired = false }) => {
  // اگر error و helperText هر دو پاس شده باشند، دراپ‌دان اجباری است
  return (
    <Grid item xs={12}>
      <FormControl fullWidth error={error} sx={{
        fontFamily: 'Vazir, sans-serif',
        direction: 'rtl',
        textAlign: 'right',
      }}>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          value={value || ''} // مقدار پیش‌فرض خالی برای جلوگیری از undefined
          onChange={onChange}
        >
          {/* اگر اجباری نباشد، گزینه "انتخاب کنید" با id: -1 اضافه می‌شود */}
          {!isRequired && (
            <MenuItem value={-1}>
              انتخاب کنید
            </MenuItem>
          )}
          {options && options.length > 0 ? (
            options.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.itemValue}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>داده‌ای موجود نیست</MenuItem>
          )}
        </Select>
        {error && helperText && (
          <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};


const GenderDropdown = ({ gender, handleChange, genders, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="جنسیت"
    name="gender"
    value={gender}
    onChange={handleChange}
    options={genders}
    error={error}
    helperText={helperText}
    isRequired={isRequired}
  />
);

const AgeFromDropdown = ({ ageRange, handleChange, ages, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="سن از"
    name="ageFrom"
    value={ageRange}
    onChange={handleChange}
    options={ages}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);
const AgeRangeDropdown = ({ ageRange, handleChange, ages, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="سن"
    name="ageRange"
    value={ageRange}
    onChange={handleChange}
    options={ages}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);
const AgeToDropdown = ({ ageRange, handleChange, ages, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="سن تا"
    name="ageTo"
    value={ageRange}
    onChange={handleChange}
    options={ages}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const ProvinceDropdown = ({ province, handleChange, provinces, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="شهر"
    name="province"
    value={province}
    onChange={handleChange}
    options={provinces}
    error={error}
    helperText={helperText}
    isRequired={isRequired}
  />
);

const HealtStatusDropdown = ({ healtStatus, handleChange, healtStatusOptions, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="وضعیت سلامت"
    name="healtStatus"
    value={healtStatus}
    onChange={handleChange}
    options={healtStatusOptions}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const LiveTypeDropdown = ({ liveType, handleChange, liveTypes, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="نوع زندگی"
    name="liveType"
    value={liveType}
    onChange={handleChange}
    options={liveTypes}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const MarriageStatusDropdown = ({ marriageStatus, handleChange, marriageStatusOptions, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="وضعیت تاهل"
    name="marriageStatus"
    value={marriageStatus}
    onChange={handleChange}
    options={marriageStatusOptions}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const CarValuesDropdown = ({ carValue, handleChange, carValueOptions, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="ارزش خودرو"
    name="carValue"
    value={carValue}
    onChange={handleChange}
    options={carValueOptions}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);
const IncomeAmountDropDown = ({ incomeAmount, handleChange, incomeAmounts, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="میزان درآمد ماهانه"
    name="incomeAmount"
    value={incomeAmount}
    onChange={handleChange}
    options={incomeAmounts}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const OnlineStatusDropDown = ({ onlineStatus, handleChange, onlineStatuss, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="وضعیت آنلاین"
    name="onlineStatus"
    value={onlineStatus}
    onChange={handleChange}
    options={onlineStatuss}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);
const ProfilePhotoStatusDropDown = ({ profilePhotoStatus, handleChange, profilePhotoStatuss, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="تصویر پروفایل"
    name="profilePhoto"
    value={profilePhotoStatus}
    onChange={handleChange}
    options={profilePhotoStatuss}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);
const HomeValueDropDown = ({ homeValue, handleChange, homeValues, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="ارزش خانه"
    name="homeValue"
    value={homeValue}
    onChange={handleChange}
    options={homeValues}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);
const RelationTypeDropDown = ({ relationType, handleChange, relationTypes, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="نوع ارتباط مورد نظر"
    name="relationType"
    value={relationType}
    onChange={handleChange}
    options={relationTypes}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const GhadDropDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="قد"
    name="ghad"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const VaznDropDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="وزن"
    name="vazn"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const TipDropDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="تیپ - 5 بیشترین"
    name="tipNumber"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const ZibaeeDropDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="زیبایی - 1 کمترین"
    name="zibaeeNumber"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const CheildCountDropDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="تعداد فرزندان"
    name="cheildCount"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);
const MaxCheildCountDropDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="حداکثر تعداد فرزندان"
    name="cheildCount"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const RangePoostDropDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="رنگ پوست"
    name="rangePoost"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

const FirstCheildAgeDown = ({ values, handleChange, options, error, helperText, isRequired = false }) => (
  <Dropdowns
    label="سن فرزند اول"
    name="firstCheildAge"
    value={values}
    onChange={handleChange}
    options={options}
    error={error}
    helperText={helperText}
    isRequired={isRequired} />
);

export {
  GenderDropdown,
  AgeFromDropdown,
  AgeToDropdown,
  ProvinceDropdown,
  HealtStatusDropdown,
  LiveTypeDropdown,
  MarriageStatusDropdown,
  CarValuesDropdown,
  HomeValueDropDown,
  IncomeAmountDropDown,
  OnlineStatusDropDown,
  ProfilePhotoStatusDropDown,
  RelationTypeDropDown,
  AgeRangeDropdown,
  GhadDropDown,
  VaznDropDown,
  TipDropDown,
  ZibaeeDropDown,
  CheildCountDropDown,
  RangePoostDropDown,
  FirstCheildAgeDown,
  MaxCheildCountDropDown
};
