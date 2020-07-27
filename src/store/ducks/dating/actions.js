import { createAction } from "redux-actions";
import * as constants from "store/ducks/dating/constants";

/**
 *
 */
export const datingSearchRequest = createAction(constants.DATING_SEARCH_REQUEST);
export const datingSearchSuccess = createAction(constants.DATING_SEARCH_SUCCESS);

/**
 *
 */
export const datingMatchedRequest = createAction(constants.DATING_MATCHED_REQUEST);
export const datingMatchedSuccess = createAction(constants.DATING_MATCHED_SUCCESS);
