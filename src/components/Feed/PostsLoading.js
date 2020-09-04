import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import * as Animatable from 'react-native-animatable'

import { withTheme } from 'react-native-paper'

const PostsGrid = ({
  theme,
}) => {
  const styling = styles(theme)
  const ref = useRef()

  useEffect(() => {
    ref.current.transitionTo({ opacity: 0.2 })
  }, [])
  
  return (
    <Animatable.View style={styling.root} ref={ref}>
      <GridComponent items={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}>
        {() => (
          <GridItemComponent>
            <View style={styling.item} />
          </GridItemComponent>
        )}
      </GridComponent>
    </Animatable.View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.disabled,
    opacity: 0.8,
  },
})

PostsGrid.defaultProps = {
  postsGet: {},
}

PostsGrid.propTypes = {
  theme: PropTypes.any,
  postsGet: PropTypes.any,
}

export default withTheme(PostsGrid)