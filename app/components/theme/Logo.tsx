import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => <Image source={require('../../../resources/logo.png')} style={styles.image} />;

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    marginBottom: 12,
  },
});

export default memo(Logo);
