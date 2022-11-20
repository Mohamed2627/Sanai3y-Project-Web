
import './Totop.css'
import imageTop from './Top.gif'
function Totop() {
    // let [show,setShow] =useState(false)

    // Creat use Effect in functhion To Top
    // useEffect(()=>{
    //     window.addEventListener("scroll",()=>{
    //         if (window.pageYOffset > 400) {
    //             setShow(true)
    //         }
    //         else {
    //             setShow(false)
    //         }
    //     })
    // },[])

    function Totop() {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
        <>
           <div className='Top_btn'>
                <button onClick={Totop}>
                    <img src={imageTop} alt="image To Top "/>
                </button>
            </div>
        </>
    )
}

export default Totop