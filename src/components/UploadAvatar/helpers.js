import pathOr from 'ramda/src/pathOr'
import includes from 'ramda/src/includes'
import compose from 'ramda/src/compose'

export const isAvatarEmpty = compose(includes('placeholder-photos/'), pathOr('', ['photo', 'url']))
