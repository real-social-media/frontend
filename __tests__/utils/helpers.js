export const sleep = () => new Promise((r) => setTimeout(r, 0))

export const getRandomId = () => Math.floor(Math.random() * 1000)

export const generateRandomItems = (prefix) =>
  [1, 2, 3].reduce((acc) => {
    const id = getRandomId()
    const key = `${prefix}-${id}`

    return { ...acc, [key]: { id } }
  }, {})

export const generateValues = (keys) => keys.reduce((acc, key) => ({ ...acc, [key]: generateRandomItems(key) }), {})

export const applyActions = (actions, reducer) => {
  let state

  actions.forEach((action) => {
    state = reducer(state, action)
  })

  return state
}
