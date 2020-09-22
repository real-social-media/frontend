import * as CameraService from 'services/providers/Camera'

describe('Camera provider', () => {
  it('generates correct asset', () => {
    expect(CameraService.generateAssetFormat('.heic')).toEqual('HEIC')
    expect(CameraService.generateAssetFormat('file.jpeg')).toEqual('JPEG')
    expect(CameraService.generateAssetFormat('JPG')).toEqual('JPEG')
  })
})
