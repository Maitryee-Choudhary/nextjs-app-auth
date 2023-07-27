"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";


export default function SignUp() {
    
  const router = useRouter(); 

  const [buttonDisable, setButtonDisable] =React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = React.useState({
    email:"",
    password:"",
    username:""
  });

  useEffect(()=>{
      if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setButtonDisable(false);
      }
      else{
        setButtonDisable(true);
      }
  },[user]);

  const onSignup = async () => {
      try{
         setLoading(true);
         const response = await axios.post("/api/users/signup", user);
         console.log("Signup Success", response);
         toast.success("Signup Successful");
         router.push("/login");
      }catch(error: any){
         setLoading(false);
         console.log("SignUp failure", error.message);
         toast.error(error.message);
      }finally{
          setLoading(false);
      }     
  }  
   
    return(
        <div className="flex flex-col items-center justify-center min-h-scree py-2">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <hr />
            <label htmlFor="username">UserName </label>
            <input type="text" value={user.username} onChange={(e)=>{setUser({...user, username:e.target.value})}} name="username"  />
            <br />
            <label htmlFor="username">Email </label>
            <input type="email" value={user.email} onChange={(e)=>{setUser({...user, email:e.target.value})}} name="email"  />
            <br />
            <label htmlFor="password">Password </label>
            <input type="password" value={user.password} onChange={(e)=>{setUser({...user, password:e.target.value})}} name="password"  />
            <button 
              onClick={onSignup}
            >{buttonDisable ? "No SignUp" : "SignUp here"} </button>
            <br />
            <Link href="/login">Login here</Link>
        </div>
    )
}