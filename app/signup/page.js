"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSignup = async (data) => {
        try {
            const response = await axios.post("/api/auth/signup", data);
            console.log(response);
            if (!response.data.error) {
                alert("Signup successful. Please verify your email.");
                router.push(
                    `/confirm-signup?email=${encodeURIComponent(data.email)}`
                );
            }
        } catch (error) {
            alert(error.response?.data?.message);
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
            {errors.fullName && <p>{errors.fullName.message}</p>}
            <input
                {...register("email", {
                    required: "Email is required",
                })}
                type="email"
                placeholder="Email Address"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
                {...register("password", {
                    required: "Password is required",
                })}
                type="password"
                placeholder="********"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
