// eslint-disable-next-line no-unused-vars
import *as  yup from 'yup'
 const schema = yup.object().shape({
   
    uEmail: yup.string().email().required('the Email reqierd'),
    uPassword: yup.string().min(8,'Enter More than 8 ').required("the passwors required  ")
   
    })

    export default  schema