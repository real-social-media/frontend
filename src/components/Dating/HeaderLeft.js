import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';
import HeartIcon from 'assets/svg/header/Heart';

const HeaderLeft = ({ count, onPress }) => {
  const styling = styles();

  return (
    <TouchableOpacity style={styling.button} onPress={onPress}>
      <HeartIcon />
      {count > 0 && <Badge style={styling.badge}>{count}</Badge>}
    </TouchableOpacity>
  );
};

HeaderLeft.propTypes = {
  count: PropTypes.number,
};

HeaderLeft.defaultProps = {
  count: 0,
};

const styles = () =>
  StyleSheet.create({
    button: {
      paddingHorizontal: 12,
    },
    badge: {
      backgroundColor: '#F3A0F0',
      color: '#ffffff',
      position: 'absolute',
      top: -5,
      right: 1,
    },
  });

export default HeaderLeft;
