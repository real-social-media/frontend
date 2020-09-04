import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native'
import { getDimensionsFromPostSize } from 'services/Dimensions'
import CacheComponent from 'components/Cache'
import ContextComponent from 'components/Feed/Context'

export class PinchZoom extends React.Component {
  render() {
    const styling = styles

    if (!this.props.draggedImage || !this.props.draggedImage.image) {
      return null
    }

    return (
      <View style={[StyleSheet.absoluteFill, styling.root]}>
        <Animated.View style={[
          getDimensionsFromPostSize({
            width: this.props.draggedImage.image.width,
            height: this.props.draggedImage.image.height,
          }), {
            transform: this.props.draggedImage.transform,
          }]}
        >
          <CacheComponent
            thread="zoom"
            images={[
              [this.props.draggedImage.image.url480p, true],
              [this.props.draggedImage.image.url4k, true],
              [this.props.draggedImage.image.url, true],
            ]}
            fallback={this.props.draggedImage.image.url4k}
            priorityIndex={-1}
            resizeMode="contain"
            hideLabel={false}
          />
        </Animated.View>
      </View>
    )
  }
}

PinchZoom.defaultProps = {
}

PinchZoom.propTypes = {
  draggedImage: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000095',
  },
})

export default (props) => (
  <ContextComponent.Consumer>
    {(contextProps) => (
      <PinchZoom {...contextProps} {...props} />
    )}
  </ContextComponent.Consumer>
)

