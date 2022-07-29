import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../core/variables';
import Button from './Button';

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => (
  <View style={styles.container}>
    <Button style={styles.button} labelStyle={styles.label} icon="chevron-left" onPress={goBack} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    top: 35,
    zIndex: 1,
    left: spacing.large,
    position: 'absolute',
    justifyContent: 'flex-start',
  },
  button: {},
  label: {
    fontSize: 25,
  },
});

export default memo(BackButton);
