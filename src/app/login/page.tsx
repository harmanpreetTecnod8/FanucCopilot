"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <div className="border flex flex-col  p-2">

                <h1>LOGIN</h1>
                <hr />

                <label htmlFor="email p-2 m-2">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="abc@tecnod8.com"
                />
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
                    onClick={onLogin}
                    disabled={loading || buttonDisabled}
                    className="p-2  shadow-md inset-2 shadow-gray-600 disabled:bg-green-400  bg-green-600 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{loading ? <div className="w-full flex justify-center items-center"><span className="animate-spin ">.</span></div>  : "Login"}
                </button>

                <div>

                <span>don't have account? </span> <Link className="text-blue-500 underline" href="/signup">Sign up</Link>
                </div>
            </div>
        </div>

    )

}