const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        isLoading: true,
        user: null,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        isLoading: false,
        user: action.payload,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        isLoading: false,
        user: null,
        error: true,
      };
    case "LOGOUT":
      return {
        isLoading: false,
        user: null,
        error: false,
      };
    case "UPDATE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        isLoading: false,
        user: action.payload,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        isLoading: false,
        user: null,
        error: true,
      };
    default:
      return state;
  }
};

export default Reducer;
