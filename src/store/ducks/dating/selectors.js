import path from 'ramda/src/path';
import length from 'ramda/src/length';
import { createSelector } from 'reselect';

export const rootSelector = path(['dating']);

/**
 *
 */
const datingSearch = createSelector(rootSelector, path(['datingSearch']));
export const datingSearchItemsSelector = createSelector(datingSearch, path(['data']));

/**
 *
 */
const datingMatched = createSelector(rootSelector, path(['datingMatched']));
export const datingMatchedItemsSelector = createSelector(datingMatched, path(['data']));
export const datingMatchedCounter = createSelector(datingMatchedItemsSelector, length);
