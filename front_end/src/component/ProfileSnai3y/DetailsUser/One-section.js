import axios from "axios";
import PaypalCheckoutButton from "../../Landing/Payment/PaypalCheckoutButton";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import "./One-section.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { color } from "@mui/system";
import * as yup from 'yup'
import { getSnai3y } from "../../../Redux/Slices/Snai3yReducer";
// function Pay With Paypal
function OneSection() {
  const product = {
    description: "Design+Code React Hooks Course",
    price: 150,
  };

  // Toastify When Edite Profile With User 
  const notify = () => toast.success("جاري التعديل علي البيانات ...", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const notifyErr = () => toast.error("من فضلك تاكد من كلمة السر الحالية", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const [open, setOpen] = useState(false); // state with modal
  const [oopeen, setOpenUp] = useState(false);
  const [opeenPass, setOpenPass] = useState(false);
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("snai3yRole");
  let [errflag, setErrflag] = useState(false);
  const dispatch = useDispatch()
  let Profile = useSelector((state) => state.Snai3yReducer.data); // redux for snai3y Data
  // console.log(Profile.jobs)
  // Formik in use add profile pictchre
  const formik = useFormik({
    initialValues: {
      sanai3yImage: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("sanai3yImage", values.photo);

      let header = {
        Authorization: token,
      };
      // console.log(values);
      axios
        .post("http://localhost:7000/sanai3y/addimage", formData, {
          headers: header,
        })
        .then((res) => {
          notify()
          if (res.status == 200) {
            setTimeout(() => {
              setOpen(false)
              dispatch(getSnai3y())
              // window.location.reload(true);
            }, 3000);
          }
        })
        .catch((err) => {
          if (err) {
            setErrflag(true);
          }
        });
    },
  });



  // Start Formik Used Edite Profile
  const formikEdite = useFormik({

    // step one  
    initialValues: {
      firstName: Profile.firstName,
      lastName:Profile.lastName,
      email:Profile.email,
      phoneNumber:Profile.phoneNumber,
      address:Profile.address
    },
    // step two
    onSubmit: (values) => {

      // console.log(values)

      let header = {
        Authorization: token,
      };
      // console.log(values);
      axios
        .put("http://localhost:7000/sanai3y/updateprofile", values, {
          headers: header,
        })
        .then((res) => {
          notify()
          if (res.status == 200) {
            // console.log(res)
            // showToasts()
            setTimeout(() => {
              window.scrollTo(0,0) 
              setOpenUp(false)     
              dispatch(getSnai3y())  
              // window.location.reload(true);
            }, 3000);
          }
        })
        .catch((err) => {
          if (err) {
          console.log(err)
          }
        });
      



    }
  });
  
  // Formik Change Password
  const formikPass = useFormik({
    initialValues:{
      currentPassword:"",
      newPassword:"",
      confirmPass:""
    },
    validationSchema: yup.object().shape({
      currentPassword: yup.string().required("هذا الحقل مطلوب"),
      newPassword: yup.string().matches(/^(?=.*[0-9])(?=.*[a-z]).{8,32}$/,"يجب ان تحتوي كلمة المرور عل حرف صغير وحرف كبير وان لاتقل عن 8 أحرف").required("هذا الحقل مطلوب"),
      confirmPass: yup.string().oneOf([yup.ref('newPassword'),null],"كلمة السر غير متطابقة").required("هذا الحقل مطلوب"),
    }),
    onSubmit:(values)=>{
      console.log(values)
      let data ={
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }
      let header = {
        Authorization: token,
      };
      axios.put("http://localhost:7000/sanai3y/changepassword",data,{headers:header})
      .then((res)=>{
        if(res.status == 200){
          notify()
          setTimeout(() => {
            setOpenPass(false)
            
          }, 1800);
          console.log(res)
        }
      }).catch((err)=> {
        notifyErr()
        console.log(err)})
    }
  })
  return (
    <>
      <div className="container">
        {Profile && (
          <div
            className="row"
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "20px",
            }}
          >
            <div className="col-lg-4 col-sm-12">
              <div className="image_profile">
                <img src={Profile.img} />
                <span className="text-center">
                  {/* start Modal Change Photo */}
                  <Button
                    variant=""
                    color="neutral"
                    onClick={() => setOpen(true)}
                  >
                    <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
                    <lord-icon
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      src="https://cdn.lordicon.com/vixtkkbk.json"
                      trigger="hover"
                      colors="primary:#121331,secondary:#ffb200"
                      style={{ width: "50px", height: "50px" }}
                    ></lord-icon>
                  </Button>
                </span>
                <div>
                  <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ffffff1a",
                      backdropFilter: "blur(2px) ",
                    }}
                  >
                    <Sheet
                      variant="outlined"
                      sx={{
                        maxWidth: 500,
                        borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                        backgroundColor: "#fff",
                      }}
                    >
                      <ModalClose
                        variant="outlined"
                        sx={{
                          top: "calc(-0.1/4 * var(--IconButton-size))",
                          right: "calc(-1/15 * var(--IconButton-size))",
                          boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                          borderRadius: "50%",
                          bgcolor: "background.body",
                        }}
                      />
                      <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                        className="titleForm_Snai3y"
                      >
                        أضف صورتك الشخصية
                      </Typography>
                      <div>
                        <Typography id="modal-desc" textColor="text.tertiary">
                          {errflag && 
                            <span className="my-4 p-0 d-flex justify-content-center alert alert-danger">
                              هناك خطأ يرجي المحاولة مرة أخري
                            </span>
                          }

                          <form
                            onSubmit={formik.handleSubmit}
                            className="Add_image_snai3y"
                            encType="multipart/form-data"
                          >
                            <input
                              type="file"
                              accept="image/*"
                              // defaultValue="ubload"
                              name="workImage"
                              // value={formik.values.workImage}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "photo",
                                  e.currentTarget.files[0]
                                )
                              }
                            ></input>

                            <div className="w-100 mt-3 text-start">
                              <button type="submit" disabled={!formik.isValid}>
                                إضافة
                              </button>
                            </div>
                          </form>
                        </Typography>
                        <ToastContainer />
                      </div>
                    </Sheet>
                  </Modal>
                </div>
              </div>
            </div>

            <div className="col-lg-8  col-sm-12">
              <div className="data_profile_client test">
                <h4>{Profile.firstName + " " + Profile.lastName}</h4>
                <ul>
                  <div className="row">
                    <div className="col-md-8 col-xl-6 bordr_box_data">
                      <li>
                        <i className="fa-solid fa-at ed_fonts"></i>
                        <strong className="ed_text_c">
                          {" "}
                          البريد الالكتروني :
                        </strong>
                        <span className="data_client">
                          <span> {Profile.email}</span>
                        </span>
                      </li>
                      <li>
                        <i className="fa-solid fa-circle-info ed_fonts"></i>
                        <strong className="ed_text_c"> تاريخ التسجيل :</strong>
                        <span className="data_client">
                          <span>
                            {" "}
                            {dateFormat(Profile.joinedDate, "fullDate")}
                          </span>
                        </span>
                      </li>
                      <li>
                        <i className="fa-solid fa-mobile-screen-button ed_fonts"></i>
                        <strong className="ed_text_c"> رقم الهاتف :</strong>
                        <span className="data_client">
                          <span> {Profile.phoneNumber}</span>
                        </span>
                      </li>
                    </div>

                    <div className="col-md-4 col-xl-6" style={{borderTop:'1px solid #EEE', borderRight:'1px solid #EEE'}}>
                      <li>
                        <i class="fa-solid fa-screwdriver-wrench ed_fonts"></i>
                        <strong className="ed_text_c">الحرفة : </strong>
                        <span className="data_client">
                          <span> {Profile.skills}</span>
                        </span>
                      </li>

                      <li>
                        <i className="fa-solid fa-circle-info ed_fonts"></i>
                        <strong className="ed_text_c"> العمر :</strong>
                        <span className="data_client">
                          <span> {Profile.age} </span>
                        </span>
                      </li>
                      <li>
                        <i className="fa-solid fa-location-dot ed_fonts"></i>
                        <strong className="ed_text_c"> العنوان :</strong>
                        <span className="data_client">
                          <span> {Profile.address}</span>
                        </span>
                      </li>
                    </div>
                  </div>
                  <div
                    className="row"
                  >
                    {/* Start Icon And Text About PayPal */}
                    <div className="col-10">
                    <li
                      style={{ borderTop: "2px solid #EEE", paddingTop: "5px" }}
                    >
                      <script src="https://cdn.lordicon.com/qjzruarw.js"></script>
                      <lord-icon
                        src="https://cdn.lordicon.com/uqpazftn.json"
                        trigger={Profile.jobcount > 0 ? "loop":""}
                        delay="500"
                        colors="primary:#121331,secondary:#ffb200"
                        style={{ width: "50px", height: "50px" }}
                      ></lord-icon>

                      <strong className="ed_text_c">
                        {" "}
                        المتبقي من فرص العمل :
                      </strong>
                      <span className="data_client">
                        <strong>
                          {" "}
                          ({" "}
                          {Profile?.jobcount && Profile.jobcount > 5
                            ? "unlimted"
                            : Profile.jobcount}{" "}
                          )
                        </strong>
                      </span>
                    </li>
                    </div>
                    {/* Start Icon Top Rate */}
                    <div className="col-2">
                    <li style={{textAlign:'left'}}>
                      <i
                        class="fa-solid fa-award"
                        style={{
                          paddingTop: 10,
                          color: Profile.jobs.length >= 3 ? "#ffb200" : "#999",
                        }}
                      ></i>
                    </li>
                    </div>
                  </div>
                        {/* Number Talapat  */}
                  <div style={{paddingRight:'5px', fontWeight:'bold'}}>
                    <span style={{padding:'5px', paddingRight:'5px'}}>
                    <lord-icon
                  src="https://cdn.lordicon.com/zpxybbhl.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#ffb200"
                  style={{ width: "30px", height: "30px" }}
                >
                  
                </lord-icon>
                    </span>
                    <span style={{paddingRight:'10px', fontSize:'15px'}}>عدد الطلبات المقبولة : </span>
                    <span>( {Profile.jobs.length} )</span>
                  </div>
                </ul>

                {/* Edite Data In Profile  */}
                <div className=" d-flex flex-row justify-content-between align-items-baseline">
                  <div
                    className="child_edite_in_profile"
                    onClick={() => setOpenUp(true)}
                  >
                    <i class="fa-solid fa-gear"></i>
                  </div>
                  <div className="child_pass_in_profile"
                    onClick={()=> setOpenPass(true)}
                  >
                    <i class="fa-solid fa-key"></i>
                  </div>
                </div>
                <PaypalCheckoutButton product={product} />



                {/* Start Edite Profile */}
                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={oopeen}
                  onClose={() => setOpenUp(false)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffffff1a",
                    backdropFilter: "blur(2px) ",
                  }}
                >
                  <Sheet
                    variant="outlined"
                    sx={{
                      maxWidth: 500,
                      borderRadius: "md",
                      p: 3,
                      boxShadow: "lg",
                      backgroundColor: "#fff",
                    }}
                  >
                    <ModalClose
                      variant="outlined"
                      sx={{
                        top: "calc(-0.1/4 * var(--IconButton-size))",
                        right: "calc(-1/15 * var(--IconButton-size))",
                        boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                        borderRadius: "50%",
                        bgcolor: "background.body",
                      }}
                    />
                    <Typography
                      component="h2"
                      id="modal-title"
                      level="h4"
                      textColor="inherit"
                      fontWeight="lg"
                      mb={1}
                      className="titleForm_Snai3y"
                    >
                      تعديل البيانات الشخصية
                    </Typography>
                    <div>
                      <Typography id="modal-desc" textColor="text.tertiary">
                        <form
                          onSubmit={formikEdite.handleSubmit}
                          className="Add_image_snai3yy"
                          encType="multipart/form-data"
                        >
                          <div className="row">
                            <input
                              className="col-5"
                              type="text"
                              placeholder="اسمك الاول"
                              name="firstName"
                              required
                              value={formikEdite.values.firstName}
                              onChange={formikEdite.handleChange}
                              onBlur={formikEdite.handleBlur}
                            ></input>
                            <input
                              className="col-5"
                              type="text"
                              placeholder="اسمك الاخير"
                              name="lastName"
                              required
                              value={formikEdite.values.lastName}
                              onChange={formikEdite.handleChange}
                              onBlur={formikEdite.handleBlur}
                            ></input>
                          </div>
                          <input
                            className="fullfill"
                            type="email"
                            placeholder="البريد الالكتروني"
                            name="email"
                            required
                            value={formikEdite.values.email}
                            onChange={formikEdite.handleChange}
                            onBlur={formikEdite.handleBlur}
                          ></input>
                          
                          <input
                          className="fullfill"
                            type="text"
                            placeholder="رقم الهاتف"
                            name="phoneNumber"
                            required
                            value={formikEdite.values.phoneNumber}
                            onChange={formikEdite.handleChange}
                            onBlur={formikEdite.handleBlur}
                          ></input>
                          <select
                            value={formikEdite.values.address}
                            onChange={formikEdite.handleChange}
                            onBlur={formikEdite.handleBlur}
                            // defaultValue={
                            //   formikEdite.values.address == 0
                            //     ? (formikEdite.values.address = "")
                            //     : formikEdite.values.address
                            // }
                            name="address"
                            id="country"
                            className="optionCity"
                          >
                            <optgroup label="مدينة أسوان">
                              <option value="0" selected>
                                أختر المركز
                              </option>
                              <option value="أسوان">أسوان</option>
                              <option value="أسوان الجديدة">
                                أسوان الجديدة
                              </option>
                              <option value="أبو سمبل">أبو سمبل</option>
                              <option value="دراو">دراو</option>
                              <option value="كوم امبو">كوم امبو</option>
                              <option value="نصر النوبة">نصر النوبة</option>
                              <option value="كلابشة">كلابشة</option>
                              <option value="أدفو">أدفو</option>
                            </optgroup>
                          </select>
        

                          <div className="w-100 mt-3 text-start">
                            <button
                            // onClick={() => {updateJobWithClient(d._id)}}
                            >
                              تعديل
                            </button>
                          </div>
                        </form>
                      </Typography>
                    </div>
                <ToastContainer />
                  </Sheet>
                </Modal>

                {/* Start Modal Change PAss */}
                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={opeenPass}
                  onClose={() => setOpenPass(false)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffffff1a",
                    backdropFilter: "blur(2px) ",
                  }}
                >
                  <Sheet
                    variant="outlined"
                    sx={{
                      maxWidth: 500,
                      borderRadius: "md",
                      p: 3,
                      boxShadow: "lg",
                      backgroundColor: "#fff",
                    }}
                  >
                    <ModalClose
                      variant="outlined"
                      sx={{
                        top: "calc(-0.1/4 * var(--IconButton-size))",
                        right: "calc(-1/15 * var(--IconButton-size))",
                        boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                        borderRadius: "50%",
                        bgcolor: "background.body",
                      }}
                    />
                    <Typography
                      component="h2"
                      id="modal-title"
                      level="h4"
                      textColor="inherit"
                      fontWeight="lg"
                      mb={1}
                      className="titleForm_Snai3y"
                    >
                      تعديل كلمة السر
                    </Typography>
                    <div>
                      <Typography id="modal-desc" textColor="text.tertiary">
                        <form
                          onSubmit={formikPass.handleSubmit}
                          className="Add_image_snai3yy"
                          encType="multipart/form-data"
                        >
                            <input
                              className="col-12"
                              type="password"
                              placeholder="كلمة السر الحالية"
                              name="currentPassword"
                              required
                              value={formikPass.values.currentPassword}
                              onChange={formikPass.handleChange}
                              onBlur={formikPass.handleBlur}
                            ></input>
                            <small style={{color:"red",fontSize:"15px", padding:0 , margin:0 , marginRight:"10px"}}>{formikPass.touched.currentPassword && formikPass.errors.currentPassword}</small>
                          <input
                            className="fullfill"
                            type="password"
                            placeholder="كلمة السر الجديدة"
                            name="newPassword"
                            required
                            value={formikPass.values.newPassword}
                            onChange={formikPass.handleChange}
                            onBlur={formikPass.handleBlur}
                          ></input>
                          <small style={{color:"red",fontSize:"15px", padding:0 , margin:0 , marginRight:"10px"}}>{formikPass.touched.newPassword && formikPass.errors.newPassword}</small>
                          <input
                            className="fullfill"
                            type="password"
                            placeholder="أعد كتابة كلمة السر"
                            name="confirmPass"
                            required
                            value={formikPass.values.confirmPass}
                            onChange={formikPass.handleChange}
                            onBlur={formikPass.handleBlur}
                          ></input>
                          <small style={{color:"red",fontSize:"15px", padding:0 , margin:0 , marginRight:"10px"}}>{formikPass.touched.confirmPass && formikPass.errors.confirmPass}</small>
                          <div className="w-100 mt-3 text-start">
                            <button
                              type="submit"
                            >
                              تعديل
                            </button>
                          </div>
                        </form>
                      </Typography>
                    </div>
                <ToastContainer />
                  </Sheet>
                </Modal>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OneSection;
