"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onLogin = async (data) => {
        try {
            const response = await axios.post("/api/auth/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log(response);
            if (!response.data.error) {
                alert("Loggedin Successfully.");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <input
                {...register("email", {
                    required: "Email is required",
                })}
                type="email"
                placeholder="Email Address"
            />
            <input
                {...register("password", {
                    required: "Password is required",
                })}
                type="password"
                placeholder="********"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
