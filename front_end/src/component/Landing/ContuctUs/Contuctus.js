import './Contuctus.css'
import ContuctImg from '../../../images/landing/ContuctUs.svg'
function Contuctus() {
    return (
        <>
            <div className='Contuct_us'>
                    <h2 className='Contuct_Title'>تواصل معنا</h2>
                <div className='container'>
                    <div className='row'>

                        <div className=' col-lg-5 col-md-6 col-sm-12 text-center m-auto'>
                            <form>
                               <div>
                                    <input type={'text'} className=' form-control mb-3' placeholder='أدخل أسمك بالكامل'></input>
                                    <input type={'email'} className=' form-control mb-3' placeholder='أدخل الإيميل'></input>
                                    <textarea style={{maxHeight:"150px"}} className=' form-control mb-3' placeholder='أدخل رسالتك'></textarea>
                               </div>
                               <button className='btn btn-outline-dark  mt-3' type='supmit'>إرسال</button>
                            </form>
                        </div>

                        <div className='col-lg-7 col-md-6 col-sm-12 mb-md-5'>

                            <img src={ContuctImg} style={{width:"100%" ,height:"100%"}} alt="Contuct img"/>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Contuctus