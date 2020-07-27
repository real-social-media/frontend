import React from 'react';
import PropTypes from 'prop-types';
import path from 'ramda/src/path';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withTheme } from 'react-native-paper';
import DatingMatchesEmpty from 'components/DatingMatches/Empty';
import DatingMatchesRow from 'components/DatingMatches/Row';

const DatingMatches = ({ t, theme, users, goBack, datingMatchedRemove }) => {
  const styling = styles(theme);
  const isEmpty = users.length === 0;

  if (isEmpty) {
    return <DatingMatchesEmpty goBack={goBack} />;
  }

  const renderItem = ({ item }) => (
    <View style={styling.row}>
      <DatingMatchesRow {...item} onRemove={datingMatchedRemove} />
    </View>
  );

  return (
    <View>
      <View style={styling.header}>
        <Text style={styling.title}>{t('They like you')}</Text>
      </View>
      <View style={styling.inner}>
        <FlatList data={users} renderItem={renderItem} keyExtractor={path['id']} />
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      height: 70,
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      color: '#ffffff',
      fontWeight: '600',
    },
    inner: {
      padding: 15,
    },
    row: {
      marginBottom: 15,
    },
  });

DatingMatches.propTypes = {
  t: PropTypes.any.isRequired,
  goBack: PropTypes.func.isRequired,
  datingMatchedRemove: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      age: PropTypes.number,
      matchedDate: PropTypes.string,
      photo: PropTypes.string,
    }),
  ),
  row: {
    marginBottom: 10,
  },
};

DatingMatches.defaultProps = {
  users: [],
};

export default withTranslation()(withTheme(DatingMatches));
