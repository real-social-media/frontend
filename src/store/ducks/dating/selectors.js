import path from "ramda/src/path";
import { createSelector } from "reselect";

export const rootSelector = path(["dating"]);

/**
 *
 */
const datingSearch = createSelector(rootSelector, path(["datingSearch"]));
export const datingSearchItemsSelector = createSelector(datingSearch, path(["data"]));
