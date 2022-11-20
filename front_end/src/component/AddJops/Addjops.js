import React, { useState } from "react";
import "./Addjops.css";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Addjops({ socket }) {
  // console.log(socket);

  // Used for test only
  // const emitSocket = () => {
  //     // The socket events
  //     socket.emit("addJob", { jobId: "636e2edcc06f241625f4a243", clientName: "Mohamed Ragab" });
  // }

  //////////////////////////////////////////

  let navigate = useNavigate();
 const [val,setVal]=useState(0)
  // token of clint
  let token = localStorage.getItem("token");
  // headers
  let headers = {
    Authorization: token,
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      title: "",
      category: "",
      description: "",
      jobImage: "",
      // files: []
    },
    validationSchema: yup.object().shape({
      address: yup.string().required("الرجاء اختيار العنوان"),
      city: yup.string().required("الرجاء املاء الحقل"),
      title: yup.string().required("الرجاء املاء الحقل"),
      category: yup.string().required("الرجاء اختيار نوع الحرفة"),
      description: yup
        .string()
        .min(15, "الرجاء كتابة اكثر من 15 كلمة")
        .required("الرجاء املاء الحقل"),
      // jobImage: yup.mixed().required("الرجاء اختيار صورة "),
      files: yup.array(),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("jobImage", values.photo);
      formData.append("title", values.title);
      formData.append("address", values.address);
      formData.append("category", values.category);
      formData.append("city", values.city);
      formData.append("description", values.description);
      console.log(values);

      axios.post("http://localhost:7000/jobs/postjob", formData, { headers: headers }).then(
          (result) => {
              if (result.status == 200) {
                  // The socket events
                  let clientName = `${result.data.data.clientData.firstName} ${result.data.data.clientData.lastName}`
                  // console.log(result.data.data)
                  // console.log(clientName)
                  let body  = { type: "addjob", skills: result.data.data.category, jobId: result.data.data._id, notification: ` قام ${clientName} باضافة وظيفة جديدة تتناسب مع مهاراتك  ` }
                  // socket.emit("addJob", {jobId: result.data.data._id, clientName});
                  axios.put("http://localhost:7000/sanai3y/addjobnotification", body).then((res) => {
                      // console.log(res.data.data)
                      socket.emit("addJob", res.data.data);
                  }).catch ((err) => {
                      console.log(err)
                  })

                  navigate("/home")
              }
          }
      ).catch((err) => {
          console.log(err)
      });
    },
  });

  function update()
  {
    let time = setInterval(()=>
    {
        setVal((prev)=>{
            if(prev>=100)
            {
                clearInterval(time)
            }
            
           return prev+40})
      
    },500)

  }
  return (
    <>
      <main className="form_Addjops">
        <div className="container parent_AddJop">
          <form
            method="post"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="Title_Addjops">أضف مشكلتك</h2>
            <div className="detail-addr w-100">
              <label htmlFor="title">عنوان الوظيفة</label>
              <input
                type="text"
                {...formik.getFieldProps("title")}
                id="title"
                name="title"
                placeholder="اكتب شرح بسيط عن ما تقوم به الوظيفة"
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
            </div>

            <div className="business">
              <label htmlFor="business">اختر الحرفة</label>
              <select
                id="business"
                name="category"
                {...formik.getFieldProps("category")}
              >
                <option value="0">أختر الحرفة</option>
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
              {formik.touched.category && formik.errors.category ? (
                <div style={{ color: "red" }}>{formik.errors.category}</div>
              ) : null}
            </div>

            <div className="descript-jop">
              <label htmlFor="descript">تفاصيل مشكلتك</label>
              <textarea
                name="description"
                {...formik.getFieldProps("description")}
                id="descript"
                cols="30"
                rows="5"
                placeholder="اكتب تفاصيل مشكلتك ...."
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="parent-addr">
              <div className="main-addr">
                <label htmlFor="city" name="اختر مدينتك">
                  اختر المدينة
                </label>
                <select id="city" name="city" {...formik.getFieldProps("city")}>
                  <optgroup label="مدينة أسوان">
                    <option value="0" selected>
                      أختر المركز
                    </option>
                    <option value="أسوان">أسوان</option>
                    <option value="أسوان الجديدة">أسوان الجديدة</option>
                    <option value="دراو">دراو</option>
                    <option value="كوم امبو">كوم امبو</option>
                    <option value="نصر النوبة">نصر النوبة</option>
                    <option value="كلابشة">كلابشة</option>
                    <option value="أدفو">أدفو</option>
                  </optgroup>
                </select>
                {formik.touched.city && formik.errors.city ? (
                  <div style={{ color: "red" }}>{formik.errors.city}</div>
                ) : null}
              </div>

              <div className="detail-addr">
                <label htmlFor="address">عنوانك</label>
                <input
                  type="text"
                  {...formik.getFieldProps("address")}
                  id="address"
                  name="address"
                  placeholder="اكتب عنوانك بالتفصيل"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div style={{ color: "red" }}>{formik.errors.address}</div>
                ) : null}
              </div>

              <div className="d-flex flex-column">
                <label
                  htmlFor="upload-files"
                  className=" btn btn-outline-secondary "
                >
                  <i className="fa fa-download " aria-hidden="true">
                    اضف صورة
                  </i>
                </label>

                <input
                  type="file"
                  {...formik.getFieldProps("jobImage")}
                  //   onChange={uploadimage}
                  style={{ display: "none" }}
                  name="jobImage"
                  defaultValue="upload"
                  id="upload-files"
                  accept="image/*"
                  onChange={(e) => {
                    formik.setFieldValue("photo", e.currentTarget.files[0]);
                    update()
                  }}
                />

                  <div className="progress" style={{height:"5px"}}>
                    <div
                      className="progress-bar progress-bar-striped bg-warning"
                      role="progressbar"
                      aria-label="Warning striped example"
                      aria-valuenow="100"
                      aria-valuemin="100"
                      aria-valuemax="100"
                      style={{width:`${val}%`}}
                    ></div>
                  </div>
                {formik.touched.upload && formik.errors.upload ? (
                  <div style={{ color: "red" }}>{formik.errors.upload}</div>
                ) : null}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" id="submit">
                اضف مشكلتك
              </button>
            </div>
          </form>
        </div>
        {/* <button onClick={emitSocket}>socketTest</button> */}
      </main>
    </>
  );
}

export default Addjops;
