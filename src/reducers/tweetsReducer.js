import {
  FETCH_TWEETS_PENDING,
  FETCH_TWEETS_SUCCESS,
  FETCH_TWEETS_ERROR
} from "../actions/tweetsActions";

const INITIAL_STATE = {
  tweets: [],
  tweetsPending: false,
  tweetsError: null
}

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FETCH_TWEETS_PENDING:
      return {
        ...state,
        tweetsPending: true,
        tweetsError: null
      };
    
    case FETCH_TWEETS_SUCCESS:
      return {
        ...state,
        tweetsPending: false,
        tweets: [...state.tweets, ...action.payload.tweets]
      };
    
    case FETCH_TWEETS_ERROR:
      return {
        ...state,
        tweetsPending: false,
        tweetsError: action.payload.error
      };
    
    default:
      return state;
  }
}