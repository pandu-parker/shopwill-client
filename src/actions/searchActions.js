import { EDIT_SEARCH } from "../constants/searchConstants";

export const editSearch = (term) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_SEARCH,
    payload: term,
  });
};
