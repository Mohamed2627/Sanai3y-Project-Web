// import './Register.css'
// import loginCover from "../../../images/landing/login.jpg";
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
// import { schemaCrafts, schemaUser } from './RegisterSchema';
import axios from 'axios'
import {  NavLink,useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import './AddNewAdmin.css'

function Register() {
  // console.log(window.location.pathname.split('/')[1]);
  let navigate = useNavigate()

  let [flag, setFlag] = useState(false);

   const schemaCrafts = yup.object().shape({
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
  
  
   const schemaUser = yup.object().shape({
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
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  // crafts formik Data
  const craftsFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      nationelId: "",
      age: '',
      address: "",
      skills: "",
      gender: false,
      confirmPassword: "",
      policy: false
    },
    onSubmit: (values) => {
      var data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        nationalId: values.nationelId,
        age: values.age,
        address: values.address,
        skills: values.skills,
        password: values.password,
        gender: values.gender
      };

      console.log(data)
      axios.post("http://localhost:7000/sanai3y/signup", data).then(res => {
        console.log(res)
        if (res.status != 200) {
          setFlag(true)
          window.scrollTo(0,0)
        }
        else {
          navigate("/login")
        }
      }).catch(() => {
        setFlag(true)
      })
    },
    validationSchema: schemaCrafts

  })

  // user Formik Data 
  const userFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      nationelId: "",
      age: '',
      address: "",
      gender: false,
      confirmPassword: "",
      policy: false
    },
    onSubmit: (values) => {
      var data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        nationalId: values.nationelId,
        age: values.age,
        address: values.address,
        password: values.password,
        gender: values.gender,
        rule:'admin'
      };

      axios.post("http://localhost:7000/client/signup", data).then(res => {
        if (res.data == "You already have acount, You can signin") {
          console.log(res)
          setFlag(true)
        }
        else {
          navigate("/dashboard")
          console.log("error");
        }
        
      }).catch(()=>{
        setFlag(true)
      })
    },
    validationSchema: schemaUser

  })

 


  return (
    <>
      <div className="big_parent">
      

            {/* start Form crafts  */}
       
            {/* -----------------End Crafts Form----------- */}
       



            {/* --------------Start User Form-------------- */}
            <form method="post" onSubmit={userFormik.handleSubmit} onReset={userFormik.handleReset}>
              <div className="form_user" id="form_user">
                <div className="phead">
                  <h2 className="head_form">إنشاء حساب</h2>
                </div>
                {/* firstName lastName */}
                <div className='row'>
                  <div className='col-6'>
                    <input className="input_form" type="text" onChange={userFormik.handleChange} onBlur={userFormik.handleBlur} value={userFormik.values.firstName} placeholder="اسمك الأول" name="firstName" />
                    <small className={userFormik.touched.firstName && userFormik.errors.firstName ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.firstName && userFormik.errors.firstName}</small>
                  </div>

                  <div className='col-6'>
                    <input className="input_form" type="text" onChange={userFormik.handleChange} onBlur={userFormik.handleBlur} value={userFormik.values.lastName} placeholder="اسمك الاخير" name="lastName" />
                    <small className={userFormik.touched.lastName && userFormik.errors.lastName ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.lastName && userFormik.errors.lastName}</small>
                  </div>

                </div>
                {/* E-mail */}
                <input className="input_form" type="email" placeholder="أدخل البريد الالكتروني" onChange={userFormik.handleChange} onBlur={userFormik.handleBlur} value={userFormik.values.email} name="email" />
                <small className={userFormik.touched.email && userFormik.errors.email ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.email && userFormik.errors.email}</small>


                {/* phoneNumber */}
                <input className="input_form" type="text" placeholder="أدخل رقم الهاتف" onChange={userFormik.handleChange} onBlur={userFormik.handleBlur} value={userFormik.values.phoneNumber} name="phoneNumber" />
                <small className={userFormik.touched.phoneNumber && userFormik.errors.phoneNumber ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.phoneNumber && userFormik.errors.phoneNumber}</small>

                {/* nationel Id */}
                <input className="input_form" type="text" placeholder="أدخل الرقم القومي" onChange={userFormik.handleChange} onBlur={userFormik.handleBlur} value={userFormik.values.nationelId} name="nationelId" />
                <small className={userFormik.touched.nationelId && userFormik.errors.nationelId ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.nationelId && userFormik.errors.nationelId}</small>



                {/* password */}
                <input className="input_form" type="password" placeholder="أدخل كلمة السر" onChange={userFormik.handleChange} onBlur={userFormik.handleBlur} value={userFormik.values.password} name="password" />
                <small className={userFormik.touched.password && userFormik.errors.password ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.password && userFormik.errors.password}</small>


                {/* confirm Password */}
                <input className="input_form" type="password" onChange={userFormik.handleChange} value={userFormik.values.confirmPassword} onBlur={userFormik.handleBlur} name="confirmPassword" placeholder="أعد كتابة كلمة السر" />
                <small className={userFormik.touched.confirmPassword && userFormik.errors.confirmPassword ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.confirmPassword && userFormik.errors.confirmPassword}</small>


                {/* age_and_contry */}
                <div className="age_and_contry">
                  <input type={"number"} placeholder="عمرك" className="age" onChange={userFormik.handleChange} value={userFormik.values.age} name='age'></input>

                  <select onChange={userFormik.handleChange} onBlur={userFormik.handleBlur} defaultValue={userFormik.values.address === 0 ? userFormik.values.address = '' : userFormik.values.address} name="address" id="country">
                    <optgroup label="مدينة أسوان">
                      <option value="0" selected>أختر المركز</option>
                      <option value="أسوان">أسوان</option>
                      <option value="أسوان الجديدة">أسوان الجديدة</option>
                      <option value="دراو">دراو</option>
                      <option value="كوم امبو">كوم امبو</option>
                      <option value="نصر النوبة">نصر النوبة</option>
                      <option value="كلابشة">كلابشة</option>
                      <option value="أدفو">أدفو</option>
                    </optgroup>
                  </select>
                </div>
                <small className={userFormik.touched.address && userFormik.errors.address ? 'alert alert-danger py-0 px-1' : null}>{userFormik.touched.address && userFormik.errors.address}</small>


                {/* gender  */}
                <div className="gender">
                  <label htmlFor="gender">
                    <input type="radio" name="gender" onChange={userFormik.handleChange} required defaultValue="ذكر" className="gender" />ذكر
                  </label>

                  <label htmlFor="gender">
                    <input type="radio" name="gender" defaultValue="انثى" required onChange={userFormik.handleChange} className="gender" />انثي
                  </label>

                </div>


      

                {/* Supmit Form */}
                <div className="supmit text-center">
                  <button className="submit_btn btn" type="submit" id="submit_crafts">تسجيل</button>
                </div>

                {/* <div className="return_input_user" id=""> */}
                <div className="return_input_user" id="return_input_user">
                  {/* <input type="button" defaultValue="→ رجوع" id="return_input" /> */}
                  <lord-icon
                    src="https://cdn.lordicon.com/zmkotitn.json"
                    trigger="loop-on-hover"
                    delay="500"
                    colors="primary:#ffb200"
                    style={{ width: '50px', height: '70px', transform: "rotate(180deg)" }}>
                  </lord-icon>
                </div>
                {/* <input type="reset" value="رجوع ←" id="return_input_user" onReset={userFormik.handleReset} /> */}
                {/* </div> */}
              </div>
            </form>
          </div>
          <div className="col-lg-6  d-md-none d-sm-none d-lg-none d-xl-block d-none p-0">
          
          </div>
          {/* overlay from backGround  */}
       
    

    </>
  );
}



export default Register