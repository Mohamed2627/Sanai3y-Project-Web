import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "./Snai3yReducer";

const ClientReducer = createSlice({
    name:"ClientData",
    initialState:{clintdata:{}},
    reducers:{
        setDataClient: (state,action)=>{
            state.clintdata = action.payload
        }
    }
})

const id = localStorage.getItem("id")

export const getDataClient = ()=> async (dispatch)=>{
    const res = await axios.get(`http://localhost:7000/client/clients/${id}`)

    dispatch(setDataClient(res.data.Data))
    // console.log(res.data.Data)
}

export const {setDataClient} = ClientReducer.actions

export default ClientReducer.reducer