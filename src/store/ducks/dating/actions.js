import { createAction } from "redux-actions";
import * as constants from "store/ducks/dating/constants";

/**
 *
 */
export const datingSearchRequest = createAction(constants.DATING_SEARCH_REQUEST);
export const datingSearchSuccess = createAction(constants.DATING_SEARCH_SUCCESS);
