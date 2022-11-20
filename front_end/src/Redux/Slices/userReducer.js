/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const userReducer = createSlice({
    name:"userData",
    initialState:{userData:{}, recieverId: ""},
    reducers:{
        setUserData: (state,action)=>{

            state.userData=action.payload
        },
        setRecieverId: (state, action) => {
            state.recieverId = action.payload
        }
        
    }
})


const token = localStorage.getItem("token")
// console.log(token)
export const getUserData =()=> async (dispatch) =>{
    const res = await axios.get(`http://localhost:7000/client/user`, {headers: {Authorization: token}});
    // console.log("iiiiiiiiiiiiiii");
    // console.log(res.data.data);
    dispatch(setUserData(res.data.data));
}



export const {setUserData, setRecieverId} = userReducer.actions
// export const showSnai3yData = (state)=> state.Snai3yData.data
export default userReducer.reducer