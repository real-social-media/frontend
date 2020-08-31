import compose from 'ramda/src/compose'
import pathOr from 'ramda/src/pathOr'
import filter from 'ramda/src/filter'

export const hasActiveStories = compose(
  pathOr(false, 'length'),
  filter((post) => post.viewedStatus === 'NOT_VIEWED'),
  pathOr([], ['stories', 'items']),
)
