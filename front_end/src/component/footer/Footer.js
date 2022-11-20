import './Footer.css'
import FooterBackGround from '../../images/landing/location_footer.png'
function Footer() {
    return (
        <div>
            <footer>
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-4 col-md-10 mx-md-auto my-sm-4">
                            <div className=" contint_about_page w-100  d-sm-flex justify-content-sm-center align-items-sm-center flex-sm-column align-items-lg-baseline">
                                <h5>حول</h5>
                                <h4>الموقع</h4>
                                <small>صنايعي هو موقع مختص بالحرف يجمع الحرفى بين الشباب المستعد لتقديم الخدمات وبين فئة العملاء الذين
                                    يريدون ان يصلحوا اى شئ لديهم، وبذلك يوفر عمل مناسباً للشباب وخدمات مميزة بسعر اقتصادي للأفراد .
                                </small>
                                <div className="sochial">
                                    <a href="#">
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                    <a href="#">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href="#">
                                        <i className="fa-brands fa-linkedin"></i>
                                    </a>
                                    <a href="#">
                                        <i className="fa-brands fa-google-plus"></i>
                                    </a>
                                    <a href="#">
                                        <i className="fa-brands fa-pinterest"></i>
                                    </a>
                                    <a href="#">
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-10 mx-md-auto my-sm-4">
                            <div className="contint_location contint_about_page d-sm-flex justify-content-sm-center align-items-sm-center flex-sm-column align-items-lg-baseline">
                                <h5>موقعنا</h5>
                                <h4 className='footer_locathion'>أسوان</h4>
                                <img src={FooterBackGround} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-10 mx-md-auto my-sm-4">
                            <div className="contint_about_page align-content-center d-sm-flex justify-content-sm-center align-items-sm-center flex-sm-column align-items-lg-baseline">
                                <h5>معلومات</h5>
                                <h4 className='footer_about'>حول الموقع</h4>
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-square"></i>
                                        <a href="#">الخدمات</a>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-square"></i>
                                        <a href="#">سياسة الاستخدام</a>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-square"></i>
                                        <a href="#">من نحن</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="finall">
                <p>© Copyrights 2022 Made By <span>ATM Team</span> All rights reserved</p>
            </div>

        </div>
    )
}

export default Footer