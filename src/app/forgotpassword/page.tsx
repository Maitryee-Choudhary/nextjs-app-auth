"use client";

import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import React from "react";


export default function ForgotPassword () {
     
   const [email, setEmail] = React.useState("");
   const [error, setError] = React.useState(false);
   

   const onSubmit = async () => {

        const user = User.findOne({email});
        if(!user){
           setError(true);
        }else{
            setError(false);
            await sendEmail({email, emailType:"RESET", userId: user._id });
        }
      
   }

    return(
        <div>
             <label htmlFor="username">Email </label>
             <input type="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email"  />
             <br />
             <button 
              onClick={onSubmit}> {error ? "User witwith email does not exist" : "Submit"}  </button>
            <br />
        </div>
    )
}