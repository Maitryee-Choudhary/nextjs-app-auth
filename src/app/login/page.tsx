"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function Login() {

  const router = useRouter();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);
    
  const [user, setUser] = React.useState({
    email:"",
    password:"",
  });

  const [data,setData] = React.useState();
  
  useEffect(()=>{
       if(user.email.length > 0 && user.password.length > 0)
       {
        setButtonDisable(false);
       }else{
        setButtonDisable(true);
       }
  },[user]);

  const onLogin = async () => {
      try{
         setLoading(true);
         const response = await axios.post("/api/users/login", user);
         console.log("Login done", response);
         toast.success("Login successful");
         router.push("/profile");
      }catch(error: any){
         console.log("Login failed", error.message);
      }finally{
         setLoading(false);
      }
  }  
   

    return(
        <div className="flex flex-col items-center justify-center min-h-scree py-2">
            <h1>{loading ? "Processing" : "Login"} </h1>
            <hr />
            <label htmlFor="username">Email </label>
            <input type="email" value={user.email} onChange={(e)=>{setUser({...user, email:e.target.value})}} name="email"  />
            <br />
            <label htmlFor="password">Password </label>
            <input type="password" value={user.password} onChange={(e)=>{setUser({...user, password:e.target.value})}} name="password"  />
            <button 
              onClick={onLogin}
            > {buttonDisable ? "No Login" : "Login"}  </button>
            <br />
            <Link href="/signup">SignUp here</Link>
            <Link href="/forgotpassword">Forgot Password</Link>
            <Toaster />
            
        </div>
    )
}