import { ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "@/utils/cognito-config";

export const POST = async (req) => {
    // Grab input from frontend i.e. json from request.
    const { email, code } = await req.json();

    //Validation
    if (!email || !code || !code.trim()) {
        return Response.json(
            {
                error: true,
                message: "Email and code are required.",
            },
            { status: 400 }
        );
    }

    // Confirm signup API logic
    try {
        const confirmSignupParams = {
            ClientId: process.env.WEB_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
        };

        const command = new ConfirmSignUpCommand(confirmSignupParams);
        const response = await cognitoClient.send(command);
        console.log(response);

        return Response.json(
            {
                error: false,
                message: "Account verified successfully.",
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
