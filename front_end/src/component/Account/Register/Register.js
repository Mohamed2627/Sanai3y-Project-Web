import './Register.css'
import loginCover from "../../../images/landing/login.jpg";
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { schemaCrafts, schemaUser } from './RegisterSchema';
import axios from 'axios'
import {  NavLink,useNavigate } from 'react-router-dom';


function Register() {
  let navigate = useNavigate()

  let [flag, setFlag] = useState(false);

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
        gender: values.gender
      };

      axios.post("http://localhost:7000/client/signup", data).then(res => {
        if (res.data == "You already have acount, You can signin") {
          console.log(res)
          setFlag(true)
        }
        else {
          navigate("/login")          
        }
        
      }).catch(()=>{
        setFlag(true)
      })
    },
    validationSchema: schemaUser

  })

  useEffect(() => {
    
    var input_user = document.getElementById("input_user");
    var input_crafts = document.getElementById("input_crafts");

    var form_user = document.getElementById("form_user");
    var crafts_form = document.getElementById("crafts_form");
    var form_choose = document.getElementById("form_choose");

    var return_input_user = document.getElementById("return_input_user");
    var return_input_crafts = document.getElementById("return_input_crafts");
    input_user.onclick = function () {
      form_user.style.transform = "translate(-38px,-50%)";
      form_choose.style.transform = "translate(-180%,-50%)";
    }

    input_crafts.onclick = function () {

      crafts_form.style.transform = "translate(74%,-50%)";
      form_choose.style.transform = "translate(90%,-50%)";
    }

    return_input_crafts.onclick = function () {
      crafts_form.style.transform = "translate(-50%,-50%)";
      form_choose.style.transform = "translate(-50%,-50%)";
    }

    return_input_user.onclick = function () {
      form_user.style.transform = "translate(120%,-50%)";
      form_choose.style.transform = "translate(-50%,-50%)";
    }

  })


  return (
    <>
      <div className="big_parent">
        <div className="child_big_parent row p-0">
          <div className="parent_form col-xl-6 col-lg-10  mx-lg-auto col-md-12 p-0">
            {/* start Form crafts  */}
            <form method="post" onSubmit={craftsFormik.handleSubmit}>
              {flag && <div className='row'>
                <div className='col-8 mx-auto mt-2'>
                  <p className='alert alert-danger'>هذا الحساب موجود بالفعل</p>
                </div>
              </div>}
              <div className="form_crafts" id="crafts_form">
                <div className="phead">
                  <h2 className="head_form">إنشاء حساب</h2>
                </div>

                {/* firstName lastName */}
                <div className='row'>
                  <div className='col-6'>
                    <input className="input_form" type="text" onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} value={craftsFormik.values.firstName} placeholder="اسمك الأول" name="firstName" />
                    <small className={craftsFormik.touched.firstName && craftsFormik.errors.firstName ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.firstName && craftsFormik.errors.firstName}</small>
                  </div>

                  <div className='col-6'>
                    <input className="input_form" type="text" onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} value={craftsFormik.values.lastName} placeholder="اسمك الاخير" name="lastName" />
                    <small className={craftsFormik.touched.lastName && craftsFormik.errors.lastName ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.lastName && craftsFormik.errors.lastName}</small>
                  </div>

                </div>

                {/* E-mail */}
                <input className="input_form" type="email" placeholder="أدخل البريد الالكتروني" onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} value={craftsFormik.values.email} name="email" />
                <small className={craftsFormik.touched.email && craftsFormik.errors.email ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.email && craftsFormik.errors.email}</small>

                {/* phoneNumber */}
                <input className="input_form" type="text" placeholder="أدخل رقم الهاتف" onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} value={craftsFormik.values.phoneNumber} name="phoneNumber" />
                <small className={craftsFormik.touched.phoneNumber && craftsFormik.errors.phoneNumber ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.phoneNumber && craftsFormik.errors.phoneNumber}</small>

                {/* nationel Id */}
                <input className="input_form" type="text" placeholder="أدخل الرقم القومي" onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} value={craftsFormik.values.nationelId} name="nationelId" />
                <small className={craftsFormik.touched.nationelId && craftsFormik.errors.nationelId ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.nationelId && craftsFormik.errors.nationelId}</small>


                {/* password */}
                <input className="input_form" type="password" placeholder="أدخل كلمة السر" onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} value={craftsFormik.values.password} name="password" />
                <small className={craftsFormik.touched.password && craftsFormik.errors.password ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.password && craftsFormik.errors.password}</small>


                {/* confirm Password */}
                <input className="input_form" type="password" onChange={craftsFormik.handleChange} value={craftsFormik.values.confirmPassword} onBlur={craftsFormik.handleBlur} name="confirmPassword" placeholder="أعد كتابة كلمة السر" />
                <small className={craftsFormik.touched.confirmPassword && craftsFormik.errors.confirmPassword ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.confirmPassword && craftsFormik.errors.confirmPassword}</small>


                {/* age_and_contry */}
                <div className="age_and_contry">
                  <input type={"number"} placeholder="عمرك" className="age" onChange={craftsFormik.handleChange} value={craftsFormik.values.age} name='age'></input>

                  <select onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} defaultValue={craftsFormik.values.address == 0 ? craftsFormik.values.address = '' : craftsFormik.values.address} name="address" id="country">
                    <optgroup label="مدينة أسوان">
                      <option value="0" selected>أختر المركز</option>
                      <option value="أسوان">أسوان</option>
                      <option value="أسوان الجديدة">أسوان الجديدة</option>
                      <option value="أبو سمبل">أبو سمبل</option>
                      <option value="دراو">دراو</option>
                      <option value="كوم امبو">كوم امبو</option>
                      <option value="نصر النوبة">نصر النوبة</option>
                      <option value="كلابشة">كلابشة</option>
                      <option value="أدفو">أدفو</option>
                    </optgroup>
                  </select>
                </div>
                <small className={craftsFormik.touched.address && craftsFormik.errors.address ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.address && craftsFormik.errors.address}</small>


                {/* Jops  */}
                <div className="skills d-flex justify-content-between align-items-lg-baseline">
                  <div className="jops">
                    <select name="skills" onChange={craftsFormik.handleChange} onBlur={craftsFormik.handleBlur} value={craftsFormik.values.skills == 0 ? craftsFormik.values.skills = '' : craftsFormik.values.skills} id="jops">
                      <option value='0'>أختر المهنة التي تناسبك</option>
                      <option value="نجار">نجار</option>
                      <option value="سباك">سباك</option>
                      <option value="مبيض محارة">مبيض محارة</option>
                      <option value="كهربائي">كهربائي</option>
                      <option value="فني تكييف">فني تكييف</option>
                      <option value="دهانات">دهانات</option>
                      <option value="بناء">بناء</option>
                      <option value="الوميتال">الوميتال</option>
                      <option value="فني ارضيات">فني أرضيات</option>
                    </select>
                  </div>

                  {/* gender  */}
                  <div className="gender">
                    <label htmlFor="gender">
                      <input type="radio" name="gender" onChange={craftsFormik.handleChange} required defaultValue="ذكر" className="gender" />ذكر
                    </label>

                    <label htmlFor="gender">
                      <input type="radio" name="gender" defaultValue="انثى" required onChange={craftsFormik.handleChange} className="gender" />انثي
                    </label>

                  </div>
                </div>
                <small className={craftsFormik.touched.skills && craftsFormik.errors.skills ? 'alert alert-danger py-0 px-1' : null}>{craftsFormik.touched.skills && craftsFormik.errors.skills}</small>

                {/* policy */}
                <div className="w-100 text-start my-0 d-flex flex-row align-items-baseline">
                  <label>
                    <input type="checkbox" onChange={craftsFormik.handleChange} required defaultValue='أوافق عل شروط السياسه والاستخدام' name="policy" id="policy" />
                    أوافق عل شروط السياسه والاستخدام
                  </label>

                </div>

                {/* Supmit Form */}
                <div className="supmit text-center">
                  <button className="submit_btn btn btn-success" type="submit"  >تسجيل</button>
                </div>

                {/* input return */}
                <div className="return_input_crafts" id="return_input_crafts">
                  {/* <input type="button" defaultValue="→ رجوع" id="return_input" /> */}
                  <lord-icon
                    src="https://cdn.lordicon.com/zmkotitn.json"
                    trigger="loop-on-hover"
                    delay="500"
                    colors="primary:#ffb200"
                    style={{ width: '50px', height: '70px' }}>
                  </lord-icon>
                </div>
              </div>
            </form>
            {/* -----------------End Crafts Form----------- */}
            {/* --------------Start Choose Form-------------- */}
            <form method="post">
              <div className="form_choose" id="form_choose">
                <div className="phead">
                  <h2 className="head_form">إنشاء حساب</h2>
                </div>
                <div className="icon_avatar">
                  <i className="fas fa-user" />
                </div>
                <br />
                <br />
                <input type="button" defaultValue="سجل كعميل" className="input_choose" id="input_user" />
                <input type="button" defaultValue="سجل كحرفي" className="input_choose" id="input_crafts" />

                <div className='row mt-4'>
                  <div className='col-12'>
                    <p style={{fontSize:"22px ", marginBottom:"0"}}>
                    لدي حساب بالفعل :

                      <NavLink to='/login'>
                        دخول
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </form>
            {/* --------------End Choose Form-------------- */}



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


                {/* policy */}
                <div className="w-100 text-start my-0 d-flex flex-row align-items-baseline">
                  <label>
                    <input type="checkbox" onChange={userFormik.handleChange} required defaultValue='أوافق عل شروط السياسه والاستخدام' name="policy" id="policy" />
                    أوافق عل شروط السياسه والاستخدام
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
            <div className="image_cover_reg">
              <img src={loginCover} alt={'loginimagecover'} />
              {/* <div className="overlay" ></div> */}
            </div>
          </div>
          {/* overlay from backGround  */}
        </div>
      </div>

    </>
  );
}



export default Register