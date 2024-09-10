/* eslint-disable */
// Define the state type
interface TokenState {
  idToken: string;
  fullName?: string;
}

// Define the action type
interface Action {
  type: string;
  payload?: string; // payload is optional and expected to be a string when present
}

// Set the initial state
const initialState: TokenState = {
  idToken: '',
  fullName: ''
};

// Create the reducer with typed state and action
const tokenReducer = (state: TokenState = initialState, action: Action): TokenState => {
  switch (action.type) {
    case 'STORE_ID_TOKEN':
      return { ...state, idToken: action.payload || '' }; // Ensure payload is handled safely
    case 'STORE_FULLNAME':
      console.log(action.payload);
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
};

export default tokenReducer;
