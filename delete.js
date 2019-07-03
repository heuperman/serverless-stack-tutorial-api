import * as dynamoDbLib from "./libs/dynamodb-lib";
import {failure, success} from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("delete", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
}
