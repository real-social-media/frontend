import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withTheme } from 'react-native-paper';

const DatingMatches = ({ t, theme }) => {
  const styling = styles(theme);

  return (
    <View>
      <View style={styling.header}>
        <Text style={styling.title}>{t('They like you')}</Text>
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
    },
    title: {
      fontSize: 20,
      color: '#ffffff',
      fontWeight: '600',
    },
  });

DatingMatches.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(withTheme(DatingMatches));
