import { navigateToPath, pushToPath, createPath } from 'navigation/helpers'

const params = { a: 1, b: 2 }

describe('Navigation helpers', () => {
  it('createPath', () => {
    expect(createPath()).toEqual({ screen: undefined, params: {} })
    expect(createPath(['a'])).toEqual({ screen: 'a', params: {} })
    expect(createPath(['a', 'b', 'c'])).toEqual({
      screen: 'a',
      params: {
        screen: 'b',
        params: {
          screen: 'c',
          params: {},
        },
      },
    })
    expect(createPath(['a', 'b', 'c'], params)).toEqual({
      screen: 'a',
      params: {
        screen: 'b',
        params: {
          screen: 'c',
          params,
        },
      },
    })
  })

  it('navigateToPath', () => {
    const navigation = { navigate: jest.fn() }

    const testNavigate = ({ path, params, expected }) => {
      navigateToPath(path)(navigation, params)
      expect(navigation.navigate).toHaveBeenCalledWith(...expected)
      navigation.navigate.mockClear()
    }

    testNavigate({ path: undefined, params: undefined, expected: ['', {}] })
    testNavigate({ path: '', params: {}, expected: ['', {}] })
    testNavigate({ path: 'a.b', params, expected: ['a', { screen: 'b', params }] })
    testNavigate({ path: 'a.b.c', params, expected: ['a', { screen: 'b', params: { screen: 'c', params } }] })
  })

  it('pushToPath', () => {
    const navigation = { push: jest.fn() }

    const testPush = ({ path, params, expected }) => {
      pushToPath(path)(navigation, params)
      expect(navigation.push).toHaveBeenCalledWith(...expected)
      navigation.push.mockClear()
    }

    testPush({ path: undefined, params: undefined, expected: ['', {}] })
    testPush({ path: '', params: {}, expected: ['', {}] })
    testPush({ path: 'a.b', params, expected: ['a', { screen: 'b', params }] })
    testPush({ path: 'a.b.c', params, expected: ['a', { screen: 'b', params: { screen: 'c', params } }] })
  })
})
