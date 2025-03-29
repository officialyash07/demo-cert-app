"use client";

import { useForm } from "react-hook-form";

const Signup = () => {
    const { register, handleSubmit } = useForm();

    const onSignup = () => {};

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
