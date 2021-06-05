import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import config from "../config.json";

export const FETCH_TWEETS_PENDING = "FETCH_TWEETS_PENDING";
export const FETCH_TWEETS_SUCCESS = "FETCH_TWEETS_SUCCESS";
export const FETCH_TWEETS_ERROR = "FETCH_TWEETS_ERROR";

export function fetchTweets(date) {
  return async dispatch => {
    dispatch({ type: FETCH_TWEETS_PENDING });

    try {
      const dynamoDbClient = new DynamoDBClient({
        credentials: {
          accessKeyId: config.AWS.ACCESS_KEY_ID,
          secretAccessKey: config.AWS.SECRET_ACCESS_KEY
        },
        region: config.AWS.REGION
      });

      const params = {
        TableName: "TranslatedTweets",
        IndexName: "DateAndId",
        KeyConditionExpression: "CreatedAtDate = :s",
        ExpressionAttributeValues: {
          ":s": { S: date.toISOString().slice(0, 10) } // yyyy-mm-dd format
        },
        ProjectionExpression: "Id, CreatedAtDate, AuthorId, TranslatedText",
        ScanIndexForward: false
      };
    
      const results = await dynamoDbClient.send(new QueryCommand(params));

      const tweets = results.Items.map((tweet) => {
        return {
          id: tweet.Id["S"],
          createdAtDate: tweet.CreatedAtDate["S"],
          authorId: tweet.AuthorId["S"],
          translatedText: (tweet.TranslatedText !== undefined) ? 
            tweet.TranslatedText["S"] : ""
        }
      });

      dispatch({ type: FETCH_TWEETS_SUCCESS, payload: { tweets } } );
    } catch (error) {
      dispatch({ type: FETCH_TWEETS_ERROR, payload: { error } } );
    }
  }
}