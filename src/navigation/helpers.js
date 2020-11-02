export const createPath = (path = [], params = {}) => {
  const [screen, ...rest] = path

  return {
    screen,
    params: rest.length === 0 ? params : createPath(rest, params),
  }
}

export const navigateToPath = (pathString = '') => (navigation, params) => {
  const path = createPath(pathString.split('.'), params)
  navigation.navigate(path.screen, path.params)
}

export const pushToPath = (pathString = '') => (navigation, params) => {
  const path = createPath(pathString.split('.'), params)
  navigation.push(path.screen, path.params)
}
