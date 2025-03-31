"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const ConfirmSignup = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (!email) {
            router.push("/signup");
        }
    }, [email, router]);

    const onConfirmSignup = async (data) => {
        try {
            const response = await axios.post("/api/auth/confirm-signup", {
                email,
                code: data.code,
            });
            if (!response.data.error) {
                alert("Acoount verified successfully.");
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    const handleResendCode = async (data) => {
        try {
            const response = await axios.post("/api/auth/resend-code", {
                email,
            });
            console.log(response);
            if (!response.data.error) {
                alert("Verification code resent successfully.");
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.error);
        }
    };

    return email ? (
        <form onSubmit={handleSubmit(onConfirmSignup)}>
            <p>Email: {email}</p>
            <input
                {...register("code", {
                    required: "Code is required",
                })}
                type="number"
                placeholder="Verification Code"
            />
            {errors.code && <p>{errors.code.message}</p>}
            <button type="button" onClick={handleResendCode}>
                Resend
            </button>
            <button type="submit">Verify</button>
        </form>
    ) : null;
};

export default ConfirmSignup;
