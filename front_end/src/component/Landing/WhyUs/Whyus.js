import './Whyus.css'
import whyuscover from '../../../images/landing/cursoal.jpg'
function Whyus() {
    return (
        <div>
            <div className="">

                <div className="whyus-content">
                    <div className="container">
                        <div className="whyus row justify-content-center align-items-center  w-100 mx-sm-0  m-0 p-lg-0 p-md-0">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="">
                                    <div className="whyus-text d-flex  justify-content-center align-items-start pt-4 flex-column">
                                        <h2 className="text-center">لماذا منصة <span>صنايعى؟</span></h2>
                                        <p>نحن الافضل حينما نتكلم عن الحرفيين</p>
                                        <p>منصة صنايعي تتيح لك جميع الحرفيين اللذين من الممكن ان تحتاج لهم في اسرع وقت ممكن<br/>
                                            وتساعد الحرفيين علي الربح وزيادة الدخل</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 p-0 m-lg-0 mt-md-4 whyus-image">

                                <img src={whyuscover} className="w-100" />
                                <div className="overlay-whyus"></div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Whyus