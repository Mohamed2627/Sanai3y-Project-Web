import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
// Checkout.js
import PaypalCheckoutButton from "../Payment/PaypalCheckoutButton";
import './Payment.css'

function Payment() {

  const product = {
    description: "Design+Code React Hooks Course",
    price: 150,
    
  };

  const token = localStorage.getItem("token")

    return (
        <>
            <section className='Payment_secthion'>
                <div className='pyment_overlay'></div>
                <div className='container parent_payment'> 

                    <div className='row'>
                       
                        <div className='col-lg-4 col-md-6 col-sm-12 m-lg-0 m-md-0 mt-sm-5'  >
                            <div className='parent_payment_details'>

                                <div className='Payment_details'>
                                    <h2 className=' text-center border-bottom border-2 border-dark pb-2 p-3'>150EGB/شهرياً</h2>
                                    <div className='Payment_content'>
                                        <i className="fa-solid fa-square-check"></i>
                                        <p>الوصول إلى كل المميزات</p>
                                    </div>
                                    <div className='Payment_content'>
                                        <i className="fa-solid fa-square-check"></i>
                                        <p>صلاحية التقديم علي الكثير من الأعمال</p>
                                    </div>
                                    <div className='Payment_content'>
                                        <i className="fa-solid fa-square-check"></i>
                                        <p>أقتراح ملفك الشخصي لكثير من العملاء في الموقع</p>
                                    </div>
                                    <div className=' w-100 p-3  d-flex justify-content-center'>
                                        {!token&&<NavLink to="/login">
                                            <button className='showmore py-1'>أشترك الان</button>
                                        </NavLink>}
                                        {token && <PaypalCheckoutButton product={product} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-8 col-md-6 col-sm-12 m-lg-auto m-md-auto my-sm-5'>
                            <div className='Payment_Text'>
                                <h2 className=' '>أشترك في موقعنا الان</h2>
                                <h5>للأستفادة من جميع خدماتنا التي نقدمها</h5>
                                <p>نحن نمنحك فرصة للاستمتاع بالخدمات التي نقدمها لك كحرفي , نمنحك في بداية تسجيلك في موقعنا ان تقوم <span> بخمسة</span>أعمال فقط وبعد ذلك عليك الاشتراك في الموقع</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Payment