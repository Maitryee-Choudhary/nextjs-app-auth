"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function ResetPassword(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const verifyUserEmail = async() => {
        try{
            await axios.post("/api/users/resetpassword", {token,password,cpassword});
            setVerified(true);
        }catch(error:any){
            setError(true)
            console.log(error.response.data);
        }
    }

    

    useEffect(()=>{
     const urlToken = window.location.search.split("=")[1];
     setToken(urlToken || "");
    },[]);

    // useEffect(()=>{
    //   if(token.length > 0)
    //     verifyUserEmail();
    // },[token]);

    return(
        <div>
            <h1>Verify Email for Resetting Password</h1>
            <h2>{token ? `Token: ${token}` : "no token"}</h2>
            <label htmlFor="password">Password </label>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password"  />
            <label htmlFor="password">Confirm Password </label>
            <input type="password" value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} name="password"  />
            <button 
            onClick={verifyUserEmail}
            >Submit </button>
            
            {verified && (
                <div>
                    <h2>Email Verified</h2>
                
                    <Link href="/login">
                       Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>{`Email Not Verified ${error}`}</h2>
                </div>
            )}
            
        </div>
    )
}