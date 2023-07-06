"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import {axios} from "axios";


export default function SignUp() {
    
  const [user, setUser] = React.useState({
    email:"",
    password:"",
    username:""
  });

  const onSignup = async () => {
     
  }  
   
    return(
        <div className="flex flex-col items-center justify-center min-h-scree py-2">
            <h1>Sign Up</h1>
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
            >Sign Up </button>
            <Link href="/login">Login here</Link>
        </div>
    )
}