"use client";


import React from "react";

import axios from "axios";

export default function ForgotPassword () {
     
   const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(false);
   

   const onSubmit = async () => {

        try{
            const res = await axios.post("/api/users/forgotpassword",{email});
            setError(false);
            console.log(res);
        }catch(error:any){
            console.log(error);
            setError(true);
        }
   }

    return(
        <div>
             <label htmlFor="username">Email </label>
             <input type="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email"  />
             <br />
             <button 
              onClick={onSubmit}> {error ? "User doesnt exist with email" : "Submit"} </button>
              
            <br />
        </div>
    )
}