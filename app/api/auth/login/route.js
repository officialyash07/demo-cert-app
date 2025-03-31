import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "@/utils/cognito-config";
import { serialize } from "cookie";

export const POST = async (req) => {
    // Grab email and password from frontend
    const { email, password } = await req.json();
    console.log("Incoming Request:", { email, password }); // ✅ Debug log

    // Input validation
    if (!email || !email.trim() || !password || !password.trim()) {
        return Response.json(
            { error: true, message: "All fields are required." },
            { status: 400 }
        );
    }

    if (password.trim().length < 6) {
        return Response.json(
            {
                error: true,
                message: "Minimum password length should be 6 characters.",
            },
            { status: 400 }
        );
    }

    // Login API logic
    try {
        const loginParams = {
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: process.env.WEB_CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        };

        const command = new InitiateAuthCommand(loginParams);
        const response = await cognitoClient.send(command);
        console.log(response);

        if (!response.AuthenticationResult) {
            throw new Error("Authentication failed.");
        }

        const headers = new Headers();
        headers.append(
            "Set-Cookie",
            serialize("authToken", response.AuthenticationResult.IdToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            })
        );

        return Response.json(
            {
                success: true,
                message: "Login Successful",
                token: response.AuthenticationResult.IdToken,
            },
            { status: 200, headers }
        );
    } catch (error) {
        return Response.json(
            { error: true, message: error.message, details: error.toString() },
            { status: 400 }
        );
    }
};
