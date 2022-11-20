import * as yup from 'yup'

export const schemaCrafts = yup.object().shape({
    firstName: yup.string().required("هذا الحقل مطلوب"),
    
    lastName: yup.string().required("هذا الحقل مطلوب"),
    
    email: yup.string().email("هذا البريد الألكتروني غير صحيح").required("هذا الحقل مطلوب"),
    
    nationelId: yup.string().matches(
    /^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/,
    "هذا الرقم القومي غير صحيح"
    ).required("هذا الحقل مطلوب"),
    
    password: yup.string().matches(/^(?=.*[0-9])(?=.*[a-z]).{8,32}$/,"يجب ان تحتوي كلمة المرور عل حرف صغير وحرف كبير وان لاتقل عن 8 أحرف").required("هذا الحقل مطلوب"),
    
    confirmPassword: yup.string().oneOf([yup.ref('password'),null],"كلمة السر غير متطابقة").required("هذا الحقل مطلوب"),
    
    age: yup.number().optional(),
    
    phoneNumber:yup.string()
    .matches(/^01[0125][0-9]{8}$/,"رقم الهاتف غير صحيح").required("هذا الحقل مطلوب"),

    address: yup.string().required("هذا الحقل مطلوب"),

    skills: yup.string().required("هذا الحقل مطلوب")
})


export const schemaUser = yup.object().shape({
    firstName: yup.string().required("هذا الحقل مطلوب"),
    
    lastName: yup.string().required("هذا الحقل مطلوب"),
    
    email: yup.string().email("هذا البريد الألكتروني غير صحيح").required("هذا الحقل مطلوب"),
    
    nationelId: yup.string().matches(
    /^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/,
    "لا يمكن ان يكون الرقم القومي يحتوي علي حروف"
    ).required("هذا الحقل مطلوب"),
    
    password: yup.string().matches(/^(?=.*[0-9])(?=.*[a-z]).{8,32}$/,"يجب ان تحتوي كلمة المرور عل حرف صغير وحرف كبير وان لاتقل عن 8 أحرف").required("هذا الحقل مطلوب"),
    
    confirmPassword: yup.string().oneOf([yup.ref('password'),null],"كلمة السر غير متطابقة").required("هذا الحقل مطلوب"),
    
    age: yup.number().optional().min(15,"يجب ان لايقل العمر عن 15سنه").max(70,"يجب ان لا يزيد العمر عن 70 سنه"),
    
    phoneNumber:yup.string()
    .matches(/^01[0125][0-9]{8}$/,"رقم الهاتف غير صحيح").required("هذا الحقل مطلوب"),

    address: yup.string().required("هذا الحقل مطلوب"),

})