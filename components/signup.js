"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = () => {
    const { register, handleSubmit } = useForm();

    const onSignup = async (data) => {
        try {
            const response = await axios.post("/api/auth/signup", data);
            console.log(response);
            if (!response.data.error) {
                alert("Signup successful. Please verify your email.");
                window.location.href = "/auth?mode=confirmSignup";
            }
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSignup)}>
            <input
                {...register("fullName", {
                    required: "Full Name is required",
                })}
                placeholder="Full Name"
            />
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
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
