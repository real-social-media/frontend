import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 372,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    overflow: 'hidden'
  },
  nameTxt: {
    fontSize: 30,
    fontFamily: 'System',
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  yearOldsTxt: {
    fontWeight: 'normal',
  },
  backgroundImages: {
    ...StyleSheet.absoluteFillObject,
  },
  cardInfo: {
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 5,
    left: 0,
    zIndex: 100,
    paddingHorizontal: 5,

  },
});
