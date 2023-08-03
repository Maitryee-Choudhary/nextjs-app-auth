"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function VerifyEmailPage(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() => {
        try{
            await axios.post("/api/users/verifyEmail", {token});
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

    useEffect(()=>{
      if(token.length > 0)
        verifyUserEmail();
    },[token]);

    return(
        <div>
            <h1>Verify Email</h1>
            <h2>{token ? `Token: ${token}` : "no token"}</h2>
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