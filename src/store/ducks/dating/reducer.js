import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "store/ducks/dating/constants";

export const initialState = {
  datingSearch: {
    data: [],
  },
};

/**
 *
 */
const datingSearchSuccess = (state, action) =>
  update(state, {
    datingSearch: {
      data: { $set: action.payload.data },
    },
  });

export default handleActions(
  {
    [constants.DATING_SEARCH_SUCCESS]: datingSearchSuccess,
    /**
     * Clear on logout
     */
    ["AUTH_SIGNOUT_REQUEST"]: () => initialState,
  },
  initialState,
);
