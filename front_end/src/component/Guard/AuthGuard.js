import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function AuthGuard(props) {
    
    let currentPath = useLocation().pathname
    var token = localStorage.getItem("token")

    if(!token)
    {
        return <Navigate to='/login' state={{pathname:currentPath}}/>
    }
    else{
        return props.children
    }
}

