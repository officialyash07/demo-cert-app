"use client";

import Signup from "@/components/signup";
import Login from "@/components/login";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mode = searchParams.get("mode");

    useEffect(() => {
        if (!mode) {
            router.replace("/auth?mode=login");
        }
    }, [mode, router]);

    return (
        <main>
            <h1>Auth Page</h1>
            {mode === "signup" ? <Signup /> : <Login />}
        </main>
    );
};

export default AuthPage;
