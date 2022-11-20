import React, { useEffect, useState } from 'react'
import './BusinesFaire.css'
import * as yup from "yup";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import Busines_Picture from '../../../images/Profile/n2ash_one.jpg'
import { useFormik } from 'formik';
import axios from 'axios';
import Notfind from '../../notfind/Notfind';

function BusinesFaire() {
        const [open, setOpen] = useState(false);
        const [flag, setFlag] = useState(false);
        let [errflag, setErrflag] = useState(false)
        const token = localStorage.getItem("token");
        let headers = {
                'Authorization': token
            }
        const formik = useFormik({
                initialValues:{
                        title:"",
                        description:"",
                        workImage:"",
                },
                onSubmit: (values)=>{
                        const formdata = new FormData()
                        
                        formdata.append("title" ,values.title)
                        formdata.append("description" ,values.description)
                        formdata.append("workImage" ,values.photo)

                        axios.post("http://localhost:7000/sanai3y/addwork",formdata,{headers:headers}).then((res)=>{
                                console.log(res)
                                if(res.status == 200){
                                        window.location.reload(true)
                                }
                        }).catch((err)=>{
                                if(err){
                                        setErrflag(true)
                                }
                        })

                }
        })

        let [data,setData] = useState([])

        useEffect(() => {
          
                axios.get("http://localhost:7000/sanai3y/workstores",{headers:headers}).then(
                        (res)=>{
                                // console.log(res.data.Data)
                                if(res.status == 200){

                                        setData(res.data.Data)
                                
                                }
                        }
                )        
          
        }, [])
        
        return (
                <>
                        <div className="cardinfo3 col-12" id="worke">
                        <div className="container">
                                        <div className="cardinfo3_edit">
                                                <h3 className="special-header"> معرض الاعمال</h3>
                                                <div className="edit">
                                                        {/* <button>
                                                        </button> */}
                                                        <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                                                                <i className="fa-solid fa-plus"></i>
                                                                 أضافة المزيد 
                                                        </Button>
                                                        <Modal
                                                                aria-labelledby="modal-title"
                                                                aria-describedby="modal-desc"
                                                                open={open}
                                                                onClose={() => setOpen(false)}
                                                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:"#ffffff1a",backdropFilter:"blur(2px) " }}
                                                                >
                                                                <Sheet
                                                                        variant="outlined"
                                                                        sx={{
                                                                                maxWidth: 500,
                                                                                borderRadius: 'md',
                                                                                p: 3,
                                                                                boxShadow: 'lg',
                                                                                backgroundColor:"#fff"
                                                                        }}
                                                                >
                                                                        <ModalClose
                                                                                variant="outlined"
                                                                                sx={{
                                                                                        top: 'calc(-0.1/4 * var(--IconButton-size))',
                                                                                        right: 'calc(-1/15 * var(--IconButton-size))',
                                                                                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                                                                        borderRadius: '50%',
                                                                                        bgcolor: 'background.body',
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
                                                                                أضافة صور من أعمالك
                                                                        </Typography>
                                                                        <div>

                                                                                <Typography id="modal-desc" textColor="text.tertiary">
                                                                                {errflag &&<span className="my-4 p-0 d-flex justify-content-center alert alert-danger">هناك خطأ يرجي المحاولة مرة أخري</span>}
                                                                                        <form onSubmit={formik.handleSubmit} className='Add_image_snai3y' encType="multipart/form-data">
                                                                                                <input type="file" 
                                                                                                        accept='image/*'
                                                                                                        // defaultValue="ubload"
                                                                                                        name='workImage'
                                                                                                        // value={formik.values.workImage}
                                                                                                        onChange={(e)=>
                                                                                                                formik.setFieldValue('photo', e.currentTarget.files[0])
                                                                                                        }
                                                                                                ></input>
                                                                                                <input type="text" placeholder='أضف عنوان للصورة' name="title" required
                                                                                                        // value={formik.values.title}
                                                                                                        onChange={formik.handleChange}
                                                                                                ></input>
                                                                                                <textarea type="text" placeholder='أضف وصف للصورة' name="description" required
                                                                                                        // value={formik.values.description}
                                                                                                        onChange={formik.handleChange}
                                                                                                ></textarea>
                                                                                                <div className='w-100 mt-3 text-start'>

                                                                                                        <button type='submit' onClick={()=> flag ? setOpen(false) : null} >إضافة</button>
                                                                                                </div>
                                                                                        </form>
                                                                                </Typography>
                                                                        </div>
                                                                </Sheet>
                                                        </Modal>


                                                </div>
                                        </div>


                                        {/* Slider From Swiper Liprary */}
                                        {data.length > 0 && <Swiper
                                                slidesPerView={3}
                                                spaceBetween={30}
                                                slidesPerGroup={3}
                                                loop={true}
                                                loopFillGroupWithBlank={true}
                                                pagination={{
                                                        clickable: true,
                                                }}
                                                navigation={true}
                                                modules={[Navigation]}
                                                className="mySwiper"
                                        >
                                                <div className='container '>
                                                        {data.map((item,index)=>
                                                        
                                                        <SwiperSlide key={index}>
                                                                <div className="cardWork">
                                                                        <div className='cardWork_img'>
                                                                                <img src={item.img} alt="" />
                                                                        </div>
                                                                        <div className="info_Card_Work">
                                                                                <h3>{item.title}</h3>
                                                                                <p>{item.description}</p>
                                                                        </div>
                                                                </div>

                                                        </SwiperSlide>
                                                        )}
                                                </div>

                                        </Swiper>}
                                        {data.length == 0 &&<Notfind data={"لاتوجد صور حالياً الرجاء إضافة صور"}/>}
                                </div>
                        </div>

                        
                </>
        )
}

export default BusinesFaire


