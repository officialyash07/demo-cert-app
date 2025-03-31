import { serialize } from "cookie";

export const POST = async () => {
    return Response.json(
        { success: true, message: "Logged Out." },
        {
            status: 200,
            headers: {
                "Set-Cookie": serialize("authToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 0,
                    path: "/",
                }),
            },
        }
    );
};
