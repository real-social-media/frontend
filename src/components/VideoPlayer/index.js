import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import Video from 'react-native-video'
import VideoPlayerService from 'components/VideoPlayer/index.service'
import SoundIcon from 'assets/svg/player/Sound'
import NoSoundIcon from 'assets/svg/player/NoSound'

const VideoPlayer = ({ poster, source, resolution, playing }) => (
  <VideoPlayerService>
    {({
      toggleSound,
      soundVisible,
      onVideoLoad,
      onProgress,
      isMuted,
      timeLeft,
    }) => (
      <TouchableWithoutFeedback onPress={toggleSound}>
        <View style={styles.playerContainer}>
          {playing ? (
            <Text style={styles.progress}>{timeLeft}</Text>
          ) : null}
          {soundVisible ? (
            <View style={styles.volume}>
              {isMuted ? <NoSoundIcon fill="#fff" size={16} /> : <SoundIcon fill="#fff" size={16} />}
            </View>
          ) : null}
          <Video
            poster={poster}
            source={source}
            style={styles.videoStyle(resolution.width, resolution.height)}
            paused={!playing}
            muted={isMuted}
            resizeMode="cover"
            repeat
            onLoad={onVideoLoad}
            onProgress={onProgress}
            progressUpdateInterval={1000}
          />
        </View>
      </TouchableWithoutFeedback>
    )}
  </VideoPlayerService>
)

const styles = StyleSheet.create({
  playerContainer: {
    position: 'relative',
  },
  videoStyle: (width = 1, height = 1) => ({
    width: '100%',
    height: undefined,
    aspectRatio: width / height,
  }),
  progress: {
    color: '#fff',
    fontSize: 12,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  volume: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 2,
  },
})

VideoPlayer.propTypes = {
  poster: PropTypes.string,
  source: PropTypes.shape({
    uri: PropTypes.string,
    headers: PropTypes.object,
  }),
  resolution: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  playing: PropTypes.bool,
}

export default memo(VideoPlayer)