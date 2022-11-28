/* eslint-disable no-undef */
import React, { useState } from "react";
import { useFormik } from "formik";

import schema from './yuplogin'
import "./Login.css";
function Login() {
     const formik=useFormik({
        initialValues:{
            uEmail:'',
            uPassword:''
        },
        onSubmit:(values)=>
        {
          
        }  ,
        validationSchema:schema
       
     })
   
  return (
    <>
      <div className="container w-75">
        <div class="tab-content w-50 p-5 m-5 ">
          <div
            class="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form onSubmit={formik.handleSubmit}>
              <div class="form-outline mb-4">
                <input 
                type="email" 
                id="loginName" 
                name="uEmail"
                style={{borderColor:formik.touched.uEmail&&formik.errors.uEmail?"red":'black'}}
                value={formik.values.uEmail}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                class="form-control" /> 
                <label class="form-label"
                 htmlFor="loginName">
                  Email or username
                </label>
                {formik.touched.uEmail&&<small style={{color:"red"}}>{formik.errors.uEmail}</small>}
              </div>
              <div class="form-outline mb-4">
              <label class="form-label" htmlFor="loginPassword">
                  Password
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="uPassword"
                  style={{borderColor:formik.errors.uPassword?"red":'black'}}
                  value={formik.values.uPassword}
                  onChange={formik.handleChange}
                  class="form-control"
                />
              <small style={{color:"red"}}>{formik.errors.uPassword}</small>
              </div>
           
              <button type="submit" 
              class="btn btn-primary btn-block mb-4"
              disabled={!formik.isValid&&formik.touched} >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
