import React, { useEffect, useState } from 'react'
import './login.css'
import { useFormik } from 'formik';
import { loginSchema } from './LoginSchema'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import coverLogin from './loginCover.jpeg'
import Loader from '../../Loader/Loader'

function Login() {
    let [err , setErr] = useState(false)
    let [ loader , setLoader] = useState(true)
    let navigate = useNavigate()
    useEffect(() => {
      setTimeout(() => {
        setLoader(false)

      }, 1000);
      window.scrollTo(0,0)
      return () => {
        setLoader(true)
      }
    }, [])
    
    const loginFormik = useFormik(
        {
            initialValues: {
                email: '',
                password: ''
            },
            onSubmit: (values) => {
                console.log(values)
                axios.post("http://localhost:7000/client/signin", values).then((res) => {
                    console.log(res.data.data.rule)
                    if (res.status == 200) {
                        // console.log(res)
                        localStorage.setItem("token", res.headers.authorization);
                        localStorage.setItem("snai3yRole", res.data.data.rule);
                        localStorage.setItem("id", res.data.data._id);
                        navigate("/home")
                        window.location.reload(true);
                    }
                    else {
                        console.log("eror")
                        setErr(true)
                    }
                }).catch((err) => {
                    console.log(err)
                    setErr(true)
                })
            },


            validationSchema: loginSchema

        }
    )
    // console.log(loginFormik.values)
    return (
        <>
            {!loader &&<div className='container parint_login '>

                <div className='row'>
                    <div className='col-12 Title_login'>
                        <h2>تسجيل الدخول</h2>
                    </div>
                </div>

                <div className='row '> {/*Parent Row*/}

                    <div className='col-lg-6 col-md-7 col-sm-12 col-12'>
                        <div className='row rightSide_login'> {/*Child Row in right side*/}
                            <div className='col-12'>
                                <div className='icon_login'>
                                    <i className="fa-solid fa-right-to-bracket fa-flip-horizontal"></i>
                                    <h3>أهلا بك</h3>
                                </div>
                            </div>
                        </div>
                        {err &&<span className='alert alert-danger p-0 d-flex justify-content-center'>البريد الألكتروني او الباسورد غير صحيح</span>}
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

                                    <div class="text-center mb-5">
                                        <p>ليس لدي حساب؟

                                            <NavLink to='/regiser'>
                                                التسجيل
                                            </NavLink>
                                        </p>

                                        {/* <p>or sign up with:</p>
                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-google"></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-github"></i>
                                        </button> */}
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>


                    <div className='col-lg-6 col-md-5  d-sm-none  d-lg-flex d-md-flex leftSide_login'> {/* Left Side Login*/}
                        <img src={coverLogin} alt='Cover Image' />
                    </div>
                </div>
            </div>}
            {loader &&<Loader/>}
        </>
    )
}

export default Login


