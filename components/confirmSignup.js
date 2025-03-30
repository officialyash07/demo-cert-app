"use client";

import { useForm } from "react-hook-form";

const ConfirmSignup = () => {
    const { register, handleSubmit } = useForm();

    const onConfirmSignup = () => {};

    return (
        <form onSubmit={handleSubmit(onConfirmSignup)}>
            <input
                {...register("code", {
                    required: "Code is required",
                })}
                type="number"
                placeholder="Verification Code"
            />
            <button type="button">Resend</button>
            <button type="submit">Verify</button>
        </form>
    );
};

export default ConfirmSignup;
