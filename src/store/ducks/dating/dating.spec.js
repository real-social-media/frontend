import { combineReducers } from "redux";
import dating, { initialState } from "./reducer";
import * as actions from "./actions";
import * as selectors from "./selectors";
import * as sagas from "./saga";

const reducer = combineReducers({ dating });
const items = [{ id: 1 }, { id: 2 }];

describe("Dating users search", () => {
  it("should be empty by default", () => {
    const state = reducer(undefined, { type: "MOCK_ACTION" });

    expect(selectors.datingSearchItemsSelector(state)).toEqual([]);
  });

  it("should save items on success request", () => {
    const state = reducer(undefined, actions.datingSearchSuccess({ data: items }));

    expect(selectors.datingSearchItemsSelector(state)).toEqual(items);
  });

  it("should clear state on logout", () => {
    const state = reducer(undefined, actions.datingSearchSuccess({ data: items }));
    const next = reducer(state, { type: "AUTH_SIGNOUT_REQUEST" });

    expect(selectors.rootSelector(next)).toEqual(initialState);
  });
});
