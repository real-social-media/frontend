import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'store/ducks/dating/constants';

export const initialState = {
  datingSearch: {
    data: [],
  },
  datingMatched: {
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

/**
 *
 */
const datingMatchedSuccess = (state, action) =>
  update(state, {
    datingMatched: {
      data: { $set: action.payload.data },
    },
  });

export default handleActions(
  {
    [constants.DATING_SEARCH_SUCCESS]: datingSearchSuccess,

    [constants.DATING_MATCHED_SUCCESS]: datingMatchedSuccess,

    /**
     * Clear on logout
     */
    ['AUTH_SIGNOUT_REQUEST']: () => initialState,
  },
  initialState,
);
