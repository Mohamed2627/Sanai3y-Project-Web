
import {Navigate} from 'react-router-dom'

function Garud(props)

 {   let token=localStorage.getItem("token");
     if(!token)
{
    return <Navigate to='login'/>
} else{
    return props.children
}   
}export default  Garud
