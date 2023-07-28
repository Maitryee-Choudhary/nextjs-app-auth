"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function Profile() {

    const router = useRouter();

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

    return(
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <button onClick={logout}>Logout</button>
            <Toaster />
        </div>
    )
}