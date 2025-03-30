import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "@/utils/cognito-config";

export const POST = async (req) => {
    // Grab email and password from frontend
    const { email, password } = req.json();

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
        const loginparams = {
            AuthFlow: "USER_SRP_AUTH",
            ClientId: process.env.WEB_CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        };

        const command = new InitiateAuthCommand(loginparams);
        const response = await cognitoClient.send(command);
        console.log(response);

        return Response.json(
            {
                error: false,
                message: "Login Successful.",
                token: response.AuthenticationResult.IdToken,
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
