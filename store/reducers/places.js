import { GET_PLACES, LOADING_PLACES } from "../actions/types";

const initState = {
  places: [],
  isLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PLACES:
      return {
        ...state,
        places: action.payload,
        isLoading: false,
      };
    case LOADING_PLACES:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
