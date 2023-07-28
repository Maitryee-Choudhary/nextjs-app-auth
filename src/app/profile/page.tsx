"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function Profile() {

    const router = useRouter();
    const [userData, setUserData] = useState('nothing');

    const logout = async () => {
       try{
         const res = await axios.get("/api/users/logout");
         toast.success("Logout successful");
         router.push("/login");
       }catch(error: any){
         console.log(error.message);
         toast.error(error.message); 
       }
    }

    const getUserDetails = async () => {
       const res = await axios.get('/api/users/me');
       console.log(res.data);
       setUserData(res.data.data._id);

    }

    return(
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{userData === 'nothing' ? "Nothing" : <Link href={`/profile/${userData}`}>View User Details {userData}</Link>
            }</h2>
            <button onClick={getUserDetails}>Get User Details</button>
            <button onClick={logout}>Logout</button>
            <Toaster />
        </div>
    )
}