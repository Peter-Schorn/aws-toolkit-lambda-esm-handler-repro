import type {
    APIGatewayProxyEventV2,
    APIGatewayProxyResultV2,
} from "aws-lambda";

export async function handler(
    event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Lambda ran successfully",
            requestId: event.requestContext.requestId,
        }),
    };
}
