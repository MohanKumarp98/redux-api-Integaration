import axios from "axios";
import React from "react";

 const loginInstance=axios.create({
    baseURL:"https://mzztvi5w15.execute-api.ap-south-1.amazonaws.com/dev/admin"
})
export default loginInstance;