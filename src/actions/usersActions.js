import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import config from "../config.json";

export const FETCH_USERS_PENDING = "FETCH_USERS_PENDING";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

export function fetchUsers() {
  return async dispatch => {
    dispatch({ type: FETCH_USERS_PENDING });

    try {
      const dynamoDbClient = new DynamoDBClient({
        credentials: {
          accessKeyId: config.AWS.ACCESS_KEY_ID,
          secretAccessKey: config.AWS.SECRET_ACCESS_KEY
        },
        region: config.AWS.REGION
      });
    
      const params = {
        TableName: "TwitterUsers"
      };
    
      const results = await dynamoDbClient.send(new ScanCommand(params));

      const users = results.Items.map((user) => {
        return {
          id: user.Id["S"],
          name: user.Name["S"]
        }
      });

      dispatch({ type: FETCH_USERS_SUCCESS, payload: { users } } );
    } catch (error) {
      dispatch({ type: FETCH_USERS_ERROR, payload: { error } } );
    }
  }
}