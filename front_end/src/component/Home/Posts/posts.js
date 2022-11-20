import "./posts.css";
import { useState, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";

function Posts({ datas }) {
  const sanai3y = useSelector((state) => state.Snai3yReducer.data);
  // console.log(sanai3y);
  let role = localStorage.getItem("snai3yRole");
  let token = localStorage.getItem("token");
  const [data, setData] = useState(datas);
  // console.log(datas)
  useEffect(() => {
    setData(datas);
  }, [datas]);

  // Hidden of jops
  function showAndHidden(index) {
    data[index].show = !data[index].show;
    setData([...data]);
  }
  // Function Delete Post
  function delet(id) {
    setData((prev) => prev.filter((item) => item._id != id));
  }

  const [dis, setDis] = useState("");

  function disChange(event) {
    setDis(event.target.value);
    // console.log(dis)
  }
  ///////////////////////////////////////////////

  // The socket
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:7000", {
      transport: ['websocket', 'polling', 'flashsocket'],
      // withCredentials: true 
    }))
  }, [])
  // The current User
  const currentUser = useSelector((state) => state.userReducer.userData);
  let headers = {
    Authorization: token,
  };

  const notifyErr = () =>
  toast.error("التقديم بعد الانتهاء من العمل الحالي", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  function sendid(id) {
    let body = {
      sanai3yProposal: dis,
    };
    // console.log(body);
    if(sanai3y.status == "free"){

      axios
        .put(`http://localhost:7000/jobs/addproposal/${id}`, body, {
          headers: headers,
        })
        .then((result) => {
  
          console.log(result.data.data._id)
          let sanai3yName = `${currentUser.firstName} ${currentUser.lastName}`;
          let body = {
            clientId: result.data.data.clientId,
            jobId: result.data.data._id,
            type: "addproposal",
            notification: `قام ${sanai3yName} باضافة عرض جديد على وظيفتك`
          }
  
          if (result.status == 200) {
            console.log("nnnnnnnnn")
            axios.put("http://localhost:7000/client/addproposalnotification", body).then((res) => {
              console.log(res.data.data);
              socket.emit("addproposal", res.data.data)
  
              window.location.reload(true);
            }).catch((err) => {
              console.log(err)
            })
  
          }
        });
    }else{

      notifyErr()


    }
  }

  /////////////////////////////////////////
  return (
    <>
      {data.map((data, index) => (
        <div className="post" key={index}>
          <div className="bolets">
            {/* Button Toggle Bettwen False And True  */}
            <span className="one" onClick={() => delet(data?._id)}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>

          <NavLink to={`/showprofileC/${data.clientData?._id}`}>
            <div className="img_name" style={{ color: "#000" }}>
              <div className="images">
                <img src={data.clientData?.img} alt="" />
              </div>

              <div className="name">
                <span>{`${data.clientData?.firstName} ${data.clientData?.lastName}`}</span>
                <span>{dateFormat(data?.hiredDate, " h:MM  TT")}</span>
                {/* <span>{data.adressuder}</span> */}
              </div>
            </div>
          </NavLink>

          <div
            className="app_di_img"
            data-bs-toggle="modal"
            data-bs-target={`#Taha${data?._id}`}
          >
            <div className="row p-2 ">
              <div className="dis">
                <strong>{data?.title} </strong>
                <p>{data?.description}</p>
                <p>
                  <strong>العنوان : </strong>
                  {data?.city}
                </p>
                <p className="len">
                  عدد الطلبات المقدمه  :
                  <strong> ( {data?.proposals.length} )</strong>
                </p>
              </div>

              <div className="col-12 post_image"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="suggestion_me">
                <span>{data?.category}</span>
                {/* <span>{data.optiontwo}</span> */}
              </div>
            </div>

            {/* Chuck About Sanai3y  */}
            {role == "sanai3y" && (
              <div className="buttons col-6">
                {sanai3y.jobcount > 0 ?
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={`#abdo${data?._id}`}
                    data-bs-whatever="@getbootstrap"
                  >
                    طلب
                  </button>
                  :
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    اشتراك
                  </button>
                }
              </div>
            )}

            {/* {sanai3y.jobcount ? (
              <div className="buttons col-6">
                {role == "sanai3y" && (
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={`#abdo${data?._id}`}
                    data-bs-whatever="@getbootstrap"
                  >
                    طلب
                  </button>
                )}
              </div>
            ) : (
              <div className="buttons col-6">
                {role == "sanai3y" && (
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={`#abdo${data?._id}`}
                    data-bs-whatever="@getbootstrap"
                  >
                    اشتراك
                  </button>
                )}
              </div>
            )} */}

            {/* Modal Show When Sanai3y Click Pay With Paypal */}
            <div
              class="modal fade box_paypal"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content p-2 pb-0">
                  <div class="modal-headerr">
                    <h1 class="modal-title" id="staticBackdropLabel">
                      نحن نمنحك فرصة للاستمتاع بالخدمات التي نقدمها لك كحرفي
                    </h1>
                    {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                  </div>
                  <div class="modal-body">
                    <strong> بطاقة الدفع 150EGB/شهرياً </strong>
                    <p> صلاحية التقديم علي الكثير من الأعمال </p>
                    <p> أقتراح ملفك الشخصي لكثير من العملاء في الموقع </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn  btn-secondary edit_close_button "
                      data-bs-dismiss="modal"
                      style={{ fontSize: "18px" }}
                    >
                      اغلاق
                    </button>

                    <NavLink to={"/profileS"}>
                      <button
                        type="button"
                        class="btn btn-outline-success "
                        data-bs-dismiss="modal"
                      >
                        التسجيل
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

<ToastContainer />

          <div
            className="modal fade"
            id={`abdo${data?._id}`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header justify-content-center border-bottom-0 mode_me">
                  <h5 className="modal-title" id="exampleModalLabel">
                    تفاصيل الطلب{" "}
                  </h5>
                </div>
                <div className="modal-body pb-0">
                  {/* Add probosal Form */}
                  <form>
                    <div className="mb-2">
                      <label
                        htmlFor="message-text"
                        className="col-form-label label_me"
                      >
                        ( وقت البدء - المتطلبات لتنفيذ العمل - وقت التنفيذ )
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        name="description"
                        onChange={disChange}
                        value={dis}
                        style={{ maxHeight: "200px" }}
                      ></textarea>
                    </div>

                    <div className="modal-footer p-0">
                      <button
                        type="button"
                        className="btn btn-secondary close_me"
                        data-bs-dismiss="modal"
                      >
                        اغلاق
                      </button>
                      <button
                        onClick={() => sendid(data._id)}
                        type="button"
                        className="btn btn-primary button_me test"
                      >
                        ارسال الطلب
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Show Details */}
          <div
            className="modal modal-xl fade"
            id={`Taha${data._id}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog  modal-lg">
              <div className="modal-content">
                <div className="modal-header align-items-start p-3 border-bottom-0 ">
                  <div className=" text-center edit_header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      التفاصيل حول العمل
                    </h1>

                  </div>
                  <div className="edit_close">
                    <button
                      type="button"
                      className="btn-close "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                </div>

                <div className="modal-body">
                  {/* data Snai3y In Details */}
                  <div className="some_edit_about_snai3y">
                    <div className="d-flex">
                      <div className="ms-2">
                        <div className="edit_image_about_job">
                          <img src={data.clientData?.img} />
                        </div>
                      </div>

                      <div className="col-5">
                        <div className="edit_data_about_job">
                          <h5>{`${data.clientData?.firstName} ${data.clientData?.lastName}`}</h5>
                          <p>{data.clientData?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="card-body">
                        <strong className="m-0 mt-3">عنوان الطلب : </strong>
                        <h5 className="card-title">{`${data.title}`}</h5>
                        <br />
                        <strong className="m-0 mt-5">وصف الطلب :</strong>
                        <p className="card-text">{`${data.description}`}</p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <img
                        className="img-thumbnail"
                        src={data.image}
                        alt="image talap"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer edit_footer_job p-0">
                  <button
                    type="button"
                    className="btn btn-secondary edit_close_button"
                    style={{ fontSize: "1rem !important" }}
                    data-bs-dismiss="modal"
                  >
                    اغلاق
                  </button>

                  {role == "snai3y" && (
                    <button
                      type="button"
                      className="btn btn-primary edit_button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@getbootstrap"
                    >
                      طلب
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Posts;
