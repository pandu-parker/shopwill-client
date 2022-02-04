import { EDIT_SEARCH } from "../constants/searchConstants";

export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_SEARCH:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
