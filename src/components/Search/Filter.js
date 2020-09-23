import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'

const Filter = ({
  theme,
  trendingFilters: {
    viewedStatus,
    verifiedStatus,
  },
  handlePostsAllFilter,
  handlePostsViewedFilter,
  handlePostsNotViewedFilter,
  handlePostsVerifiedFilter,
  handlePostsNotVerifiedFilter,
  isLoading,
}) => {
  const styling = styles(theme)

  const filters = [
    { title: 'All', isActive: viewedStatus === undefined && verifiedStatus === undefined, onPress: handlePostsAllFilter },
    { title: 'Verified', isActive: verifiedStatus === true, onPress: handlePostsVerifiedFilter },
    { title: 'Unverified', isActive: verifiedStatus === false, onPress: handlePostsNotVerifiedFilter },
    { title: 'Viewed', isActive: viewedStatus === 'VIEWED', onPress: handlePostsViewedFilter },
    { title: 'Unviewed', isActive: viewedStatus === 'NOT_VIEWED', onPress: handlePostsNotViewedFilter },
  ]

  const makeStyles = ({ isActive, isLoading }) => ([
    ...[styling.filter],
    ...(isActive ? [styling.filterSelected] : []),
    ...(isLoading ? [styling.filterDisabled] : []),
  ])

  return (
    <View style={styling.root}>
      <ScrollView style={styling.filters} horizontal>
        {filters.map((filter) => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: filter.isActive }}
            key={filter.title}
            style={makeStyles({ isActive: filter.isActive, isLoading })}
            onPress={filter.onPress}
            disabled={filter.isActive || isLoading}
          >
            <Text style={styling.text}>{filter.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {},
    filters: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    filter: {
      borderRadius: 4,
      marginRight: theme.spacing.base,
      marginBottom: 6,
      padding: 6,
    },
    filterCreate: {
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    filterSelected: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      fontWeight: '500',
    },
    filterDisabled: {
      opacity: 0.4,
    },
  })

Filter.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  trendingFilters: PropTypes.shape({
    viewedStatus: PropTypes.oneOf(['VIEWED', 'NOT_VIEWED']),
    verifiedStatus: PropTypes.bool,
  }).isRequired,
  handlePostsAllFilter: PropTypes.func.isRequired,
  handlePostsViewedFilter: PropTypes.func.isRequired,
  handlePostsNotViewedFilter: PropTypes.func.isRequired,
  handlePostsVerifiedFilter: PropTypes.func.isRequired,
  handlePostsNotVerifiedFilter: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

Filter.defaultProps = {
  values: {},
  isLoading: false,
}

export default withTheme(Filter)
