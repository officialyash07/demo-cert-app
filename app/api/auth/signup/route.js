import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "@/utils/cognito-config";

// POST method
export const POST = async (req) => {
    // Grab input from frontend i.e. json from request.
    const { fullName, email, password } = await req.json();

    // Input validation
    if (
        !fullName ||
        !fullName.trim() ||
        !email ||
        !email.trim() ||
        !password ||
        !password.trim()
    ) {
        return Response.json(
            { error: true, message: "All fields are required." },
            { status: 400 }
        );
    }

    const emailRegex = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    if (!emailRegex.test(email.trim())) {
        return Response.json(
            { error: true, message: "Wrong email format." },
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

    // Sign up API Logic
    try {
        const signupParams = {
            ClientId: process.env.WEB_CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [
                { Name: "email", Value: email },
                { Name: "custom:fullName", Value: fullName },
            ],
        };

        const command = new SignUpCommand(signupParams);
        const response = await cognitoClient.send(command);
        console.log(response);

        return Response.json(
            {
                error: false,
                message: "Signup successful. Please verify your email.",
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { error: true, message: error.message, details: error.toString() },
            { status: 400 }
        );
    }
};
