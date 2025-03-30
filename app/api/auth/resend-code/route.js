import { ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "@/utils/cognito-config";

export const POST = async (req) => {
    // Grab email from frontend
    const { email } = await req.json();

    // Validation
    if (!email) {
        return Response.json(
            { error: true, message: "Email is required" },
            { status: 400 }
        );
    }

    // Resend code API logic
    try {
        const resendCodeParams = {
            ClientId: process.env.WEB_CLIENT_ID,
            Username: email,
        };

        const command = new ResendConfirmationCodeCommand(resendCodeParams);
        await cognitoClient.send(command);

        return Response.json(
            {
                error: false,
                message: "Resent verification code successfully.",
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
