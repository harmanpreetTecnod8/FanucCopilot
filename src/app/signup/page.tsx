"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/signup", user);

            console.log("Signup success", response.data);

            router.push("/login");


        } catch (error: any) {
            console.log("Signup failed", error.message);
            

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0 && user.email.endsWith("@tecnod8.com")) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="border flex flex-col  p-4">
                <h1 className="mb-2">Signup</h1>
                <hr />
                <label htmlFor="username">Username</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                />
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="abc@tecnod8.com"
                />
                <div className="text-xs text-red-400 mb-4">* use @tecnod8.com official email Id</div>
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your Password"
                />
                <button
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    className="p-2 shadow disabled:bg-blue-400 bg-blue-600 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{loading ? <div className="w-full flex justify-center items-center"><span className="animate-spin ">.</span></div> : "Signup"}</button>

                <div>

                    <span>Already have account? </span> <Link className="text-green-500 underline" href="/login">Login</Link>
                </div>


            </div>

            <hr />

        </div>
    )

}