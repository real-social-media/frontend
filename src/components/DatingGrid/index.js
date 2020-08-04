import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import CacheComponent from 'components/Cache'
import path from 'ramda/src/path'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const DatingGrid = ({
  theme,
  datingGet,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <GridComponent items={path(['data'])(datingGet)}>
        {(dating, priorityIndex) => (
          <GridItemComponent>
            <CacheComponent
              thread="dating"
              images={[
                [path(['picture', 'thumbnail'])(dating), true],
                [path(['picture', 'medium'])(dating), true],
              ]}
              fallback={path(['picture', 'large'])(dating)}
              priorityIndex={priorityIndex}
              resizeMode="cover"
              hideProgress={true}
            />

            <View style={styling.title}>
              <Text numberOfLines={1} style={styling.text}>{dating.name.first}</Text>
            </View>
          </GridItemComponent>
        )}
      </GridComponent>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    position: 'absolute',
    padding: 4,
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

DatingGrid.defaultProps = {
  datingGet: {},
}

DatingGrid.propTypes = {
  theme: PropTypes.any,
  datingGet: PropTypes.any,
}

export default withTranslation()(withTheme(DatingGrid))