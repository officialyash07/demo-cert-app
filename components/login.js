"use client";

import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onLogin = () => {};

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
