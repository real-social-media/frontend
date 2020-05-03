import { 
    initialState,
    cameraCaptureRequest,
    cameraCaptureSuccess,
    cameraCaptureFailure,
    cameraCaptureIdle,
} from '../src/store/ducks/camera/reducer'

test('Camera State successfuly changes on captureFail with exact data', () => {
    expect(cameraCaptureRequest(initialState, { payload : {
        
        uri: "/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/50732A61-DBB2-4081-A42C-5CAA61AD29CD/tmp/react-native-image-crop-picker/C9F3B621-BD3C-4235-BCF8-7A537F47F786.jpg",
        photoSize: "4:3",
        takenInReal: true,
        originalFormat: "jpg",
        originalMetadata: [],
      }})).toMatchObject({
        cameraCapture: {
            data: [],
            payload: {
                uri: expect.stringMatching("/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/50732A61-DBB2-4081-A42C-5CAA61AD29CD/tmp/react-native-image-crop-picker/C9F3B621-BD3C-4235-BCF8-7A537F47F786.jpg"),
                // uri: "/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/50732A61-DBB2-4081-A42C-5CAA61AD29CD/tmp/react-native-image-crop-picker/C9F3B621-BD3C-4235-BCF8-7A537F47F786.jpg",
                photoSize: expect.stringMatching("4:3"),
                // photoSize: "4:3",
                takenInReal: true,
                originalFormat: "jpg",
                originalMetadata: [],
            },
            status: 'loading',
        }
    });
});

test('Camera State successfuly changes on captureSuccess with exact data', () => {
    expect(cameraCaptureSuccess(initialState, { payload : { 
        data : [
            {
                uri : "/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/DC5615B3-F50E-4136-BA38-BBE8B7621281/tmp/react-native-image-crop-picker/0C5BC9F9-5AE6-41D6-B5D8-95EF6E1A611D.jpg",
                takenInReal : true,
                originalFormat : "jpg",
            },
        ]
     }})).toMatchObject({
        cameraCapture: {
            data: [
                {
                    uri: "/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/DC5615B3-F50E-4136-BA38-BBE8B7621281/tmp/react-native-image-crop-picker/0C5BC9F9-5AE6-41D6-B5D8-95EF6E1A611D.jpg",
                    takenInReal: true,
                    originalFormat: "jpg",
                }
            ],
            payload: [
                // {
                //     uri: "/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/DC5615B3-F50E-4136-BA38-BBE8B7621281/tmp/react-native-image-crop-picker/0C5BC9F9-5AE6-41D6-B5D8-95EF6E1A611D.jpg",
                //     photoSize: "4:3",
                //     takenInReal: true,
                //     originalFormat: "jpg",
                // }
            ],
            status: 'success',
        }
    });
});

test('Camer State successfuly changes on captureFail', () => {
    expect(cameraCaptureFailure(initialState)).toStrictEqual({
        cameraCapture: {
          data: [],
          payload: [],
          status: 'failure',
        },
      });
});


// Netu gotowogo state kotoryi mozhno otfiltrowat otnositelno payload
test('Camera State successfuly changes in captureIdle', () => {
    expect(cameraCaptureIdle(initialState, {payload : {
        payload : { 
            uri : "/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/200ADD1F-9819-4478-8388-E33F60BAA56F/tmp/react-native-image-crop-picker/BD3A6C51-15CE-4ADA-9C28-42FE6F708747.jpg",
        }
    }})).toMatchObject({
        cameraCapture: {
          data: [
            // {
            //     // uri : "/Users/bayram/Library/Developer/CoreSimulator/Devices/A3536882-3D03-428A-859D-651775D28EEE/data/Containers/Data/Application/200ADD1F-9819-4478-8388-E33F60BAA56F/tmp/react-native-image-crop-picker/BD3A6C51-15CE-4ADA-9C28-42FE6F708747.jpg",
            //     // photoSize : "4:3",
            //     // takenInReal : false, 
            //     // originalFormat : "JPG",
            //     // originalMetadata :"{"{Exif}":{"PixelYDimension":2224,"ColorSpace":1,"PixelXDimension":1668},"{TIFF}":{"Orientation":1},"ProfileName":"sRGB IEC61966-2.1","{JFIF}":{"XDensity":72,"YDensity":72,"JFIFVersion":[1,0,1],"DensityUnit":0},"PixelHeight":2224,"ColorModel":"RGB","Depth":8,"Orientation":1,"PixelWidth":1668}",
            // }
        ],
          payload: [],
          status: 'idle',
        },
      });
});

