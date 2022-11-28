import Login from "../component/Login/Login";
import Http from '../component/Login/Http';
import { useFormik } from 'formik';
import React, { useState, createRef, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css';
import { loginSchema } from './LoginSchema';
import { Fragment } from "react";
import coverLogin from './loginCover.jpeg';
function LoginPAge()
{
    const [logErr, setLogErr] = useState(false)
    let navigate = useNavigate()
    const loginFormik = useFormik(
        {
            initialValues: {
                email: '',
                password: ''
            },
            onSubmit: (values) => {
                
                axios.post("http://localhost:7000/client/signin", values).then((res) => {
                    console.log(res.status)
                    // console.log(res.data.data.rule)
                    if (res.status == 200) {
                        if (res.data.data.rule=="admin") {
                            console.log("object");
                            localStorage.setItem("token",res.headers.authorization);
                            navigate("/Dashboard")
                            setLogErr(false)
                        } else {
                            console.log("erorr admin")
                            setLogErr(true)
                        }
                            //   console.log("object");
                            // localStorage.setItem("token",res.headers.authorization);
                            // navigate("/Dashboard")
                            // setLogErr(false)
                        // console.log(res.data.data.token)
                   
                        // localStorage.setItem("snai3yRole", res.data.data.rule);
                        // localStorage.setItem("Name", res.data.data.firstName +" "+ res.data.data.lastName);
                        // localStorage.setItem("image", res.data.data.image);
                      
                    }
                    else {
                        console.log("eror")
                        setLogErr(true)

                    }
                }).catch((err) => {
                    console.log(err)
                    console.log("err")
                    setLogErr(true)
                })
            },


            validationSchema: loginSchema

        })
        // console.log(loginFormik.errors)
    return(
        <Fragment>
        <div className='container parint_login '>

<div className='row'>
    <div className='col-12 Title_login'>
        <h2>تسجيل الدخول</h2>
    </div>
</div>

<div className='row ' dir="rtl"> {/*Parent Row*/}

    <div className='col-lg-6 col-md-7 col-sm-12 col-12'>
        <div className='row rightSide_login'> {/*Child Row in right side*/}
            <div className='col-12'>
                <div className='icon_login'>
                    <i className="fa-solid fa-right-to-bracket fa-flip-horizontal"></i>
                    <h3>أهلا بك</h3>
                    {logErr==true?<h4 className='alert alert-danger py-0 px-1 mb-2'>الايميل او الرقم السرى غير صحيح</h4>:null}
                </div>
            </div>
        </div>

        <div className='row'>
            <div className='col-12'>

                {/* Login Form  */}

                <form className='login_form ' method='post' onSubmit={loginFormik.handleSubmit} >
                    {/* Email input */}

                    <div class="form-outline mb-4">
                        {/* <label class="form-label" for="form2Example1">البريد الألكتروني</label> */}

                        
                    </div>

                    {/* Password input  */}
                    <div class="form-outline mb-4">
                        {/* <label class="form-label" for="form2Example2">كلمة السر</label> */}
                        <box component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off">

                            <input
                             className=' mb-2'
                                type="email" 
                                placeholder='البريد الألكتروني'
                                name='email'
                                style={loginFormik.touched.email && loginFormik.errors.email ? {border:"2px solid #ff01187d",borderRadius:"5px"} : null}
                                value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
                            <small className={loginFormik.touched.email && loginFormik.errors.email ? 'alert alert-danger py-0 px-1' : null}>{loginFormik.touched.email && loginFormik.errors.email}</small>
                            <input
                                className='mb-2 mt-3'
                                type="password"
                                placeholder='كلمة المرور'
                                name='password'
                                style={loginFormik.touched.password && loginFormik.errors.password ? {border:"2px solid #ff01187d",borderRadius:"5px"} : null}
                                value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
                        </box>
                        {/* <input  /> */}
                        <small className={loginFormik.touched.password && loginFormik.errors.password ? 'alert alert-danger py-0 px-1 mb-2' : null}>{loginFormik.touched.password && loginFormik.errors.password}</small>
                        
                    </div>

                    {/* 2 column grid layout for inline styling */}
                    <div class="row mb-4">
                        <div class="col d-flex justify-content-center">
                            {/* Checkbox  */}
                            {/* <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                <label class="form-check-label" for="form2Example31"> Remember me </label>
                            </div> */}
                        </div>

                        <div class="col">
                            {/* Simple link  */}



                        </div>
                    </div>

                    {/* Submit button  */}
                    <div className='text-center mb-4'>

                        <button type="submit" class="login_btn btn btn-success" disabled={!loginFormik.isValid}>
                            دخول
                        <i className="fa-solid fa-right-to-bracket fa-flip-horizontal"></i>
                        
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>


         {/* Left Side Login */}
    <div className='col-lg-6 col-md-5  d-sm-none  d-lg-flex d-md-flex leftSide_login'>
         <img src={coverLogin} alt='Cover Image' />
    </div> 
</div>
</div>

</Fragment>
    )
}
export default LoginPAge