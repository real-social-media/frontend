import * as DimensionsService from 'services/Dimensions'
jest.mock('constants/Layout')

test('getScreenAspectRatio calculates coords based on aspect', () => {
  expect(DimensionsService.getScreenAspectRatio('1:1', 900)).toMatchObject({
    x: 900,
    y: 900,
  })
  expect(DimensionsService.getScreenAspectRatio(undefined, 900)).toMatchObject({
    x: 900,
    y: 900,
  })
  expect(DimensionsService.getScreenAspectRatio('4:3', 3024)).toMatchObject({
    x: 3024,
    y: 4032,
  })
})
