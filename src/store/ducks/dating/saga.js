import path from "ramda/src/path";
import { put, takeLatest } from "redux-saga/effects";
import * as actions from "store/ducks/dating/actions";
import * as constants from "store/ducks/dating/constants";

/**
 *
 */
function normalizeItems(items) {
  return items.map((item) => ({
    photo: path(["picture", "large"], item),
    name: path(["name", "first"], item),
    age: path(["dob", "age"], item),
    city: path(["location", "city"], item),
  }));
}

function* datingSearchRequest() {
  try {
    const response = yield fetch("https://randomuser.me/api/?page=1&results=100&seed=abc");
    const { results } = yield response.json();

    yield put(actions.datingSearchSuccess({ data: normalizeItems(results) }));
  } catch (error) {
    alert(error.message);
  }
}

export default () => [takeLatest(constants.DATING_SEARCH_REQUEST, datingSearchRequest)];
