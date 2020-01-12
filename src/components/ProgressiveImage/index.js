import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native'
import SimpleCache from 'components/SimpleCache'

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0),
      thumbnailLoaded: false,
    }
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration,
      useNativeDriver: true,
    }).start()
    this.props.onLoadThumbnail()
    this.setState({ thumbnailLoaded: true })
  }

  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration,
      useNativeDriver: true,
    }).start()
    this.props.onLoadImage()
  }

  render() {
    return (
      <View style={this.props.style}>
        <Animated.View style={[styles.image, { opacity: this.state.thumbnailOpacity }]}>
          <SimpleCache
            resizeMode={this.props.resizeMode}
            style={styles.image}
            source={this.props.thumbnailSource}
            onLoad={() => this.onLoadThumbnail()}
            priorityIndex={this.props.priorityIndex}
            {...this.props}
            blurRadius={this.props.thumbnailBlurRadius}
          />
        </Animated.View>

        {this.props.shouldLoadImage ?
          <Animated.View style={[styles.image, { opacity: this.state.imageOpacity }]}>
            <SimpleCache
              resizeMode={this.props.resizeMode}
              style={styles.image}
              source={this.props.imageSource}
              onLoad={() => this.onLoadImage()}
              priorityIndex={this.props.priorityIndex}
              {...this.props}
            />
          </Animated.View>
        : null}
      </View>
    )
  }
}

 const styles = StyleSheet.create({
   image: {
     position: 'absolute',
     top: 0,
     bottom: 0,
     left: 0,
     right: 0,
   },
 })

ProgressiveImage.propTypes = {
  placeHolderColor: PropTypes.string,
  placeHolderSource: PropTypes.number,
  imageSource: PropTypes.object.isRequired,
  imageFadeDuration: PropTypes.number.isRequired,
  onLoadThumbnail: PropTypes.func.isRequired,
  onLoadImage: PropTypes.func.isRequired,
  thumbnailSource: PropTypes.object.isRequired,
  thumbnailFadeDuration: PropTypes.number.isRequired,
  thumbnailBlurRadius: PropTypes.number,
  shouldLoadImage: PropTypes.bool,
}

ProgressiveImage.defaultProps = {
  thumbnailFadeDuration: 250,
  imageFadeDuration: 250,
  thumbnailBlurRadius: 5,
  onLoadThumbnail: Function.prototype,
  onLoadImage: Function.prototype,
  resizeMode: 'cover',
  shouldLoadImage: true,
}
