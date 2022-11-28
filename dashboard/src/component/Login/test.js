import axios from "axios";
import React from "react";
const baseURL = "http://localhost:7000/sanai3y/all";
export default function Test() {
  const [data, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    // invalid url will trigger an 404 error
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      console.log(response.data)  
  }, []);


  

  })
 
}
