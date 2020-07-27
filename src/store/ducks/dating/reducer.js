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

const datingMatchedRemove = (state, action) =>
  update(state, {
    datingMatched: {
      data: { $set: state.datingMatched.data.filter(({ id }) => id !== action.payload.id) },
    },
  });

export default handleActions(
  {
    [constants.DATING_SEARCH_SUCCESS]: datingSearchSuccess,

    [constants.DATING_MATCHED_SUCCESS]: datingMatchedSuccess,
    [constants.DATING_MATCHED_REMOVE]: datingMatchedRemove,

    /**
     * Clear on logout
     */
    ['AUTH_SIGNOUT_REQUEST']: () => initialState,
  },
  initialState,
);
