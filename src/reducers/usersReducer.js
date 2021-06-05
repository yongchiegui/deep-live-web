import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from "../actions/usersActions";

const INITIAL_STATE = {
  users: [],
  usersPending: false,
  usersError: null
}

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return {
        ...state,
        usersPending: true,
        usersError: null
      };
    
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        usersPending: false,
        users: action.payload.users
      };
    
    case FETCH_USERS_ERROR:
      return {
        ...state,
        usersPending: false,
        usersError: action.payload.error
      };
    
    default:
      return state;
  }
}