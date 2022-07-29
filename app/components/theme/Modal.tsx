import React, { memo, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Modal as NativeModal, TouchableWithoutFeedback, View, Animated, SafeAreaView } from 'react-native';
import { Modal as PaperModal, overlay, Portal, useTheme } from 'react-native-paper';
import { spacing } from '../../core/variables';

// type Props = React.ComponentProps<typeof PaperModal> & {
type Props = React.ComponentProps<typeof NativeModal> & {
  children: React.ReactNode;
};

const Modal = ({ children, ...props }: Props) => {
  const theme = useTheme();

  return (
    <NativeModal
      animationType={props.animationType || 'fade'}
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onDismiss}
      presentationStyle={props.presentationStyle || 'overFullScreen'}
      // supportedOrientations={supportedOrientations}
      //@ts-ignore
      statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={props.onDismiss}>
        <View style={[StyleSheet.absoluteFill, styles.modalBackground, { backgroundColor: theme.colors.backdrop }]} />
      </TouchableWithoutFeedback>

      <SafeAreaView style={[styles.modalRoot]} pointerEvents="box-none">
        <KeyboardAvoidingView style={[styles.modalRoot]} behavior={'padding'}>
          <Animated.View
            // contentContainerStyle={{ flexGrow: 1 }}
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.dark ? overlay(10, theme.colors.surface) : theme.colors.surface,
                borderRadius: theme.roundness,
              },
            ]}>
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NativeModal>
    //   <Portal>
    //     <PaperModal contentContainerStyle={styles.modal} {...props}>
    //       {children}
    //     </PaperModal>
    //   </Portal>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//   },
//   modal: {
//     flex: 1,
//     backgroundColor: 'white',
//     margin: 20,
//     padding: 20,
//   },
// });

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalContent: {
    padding: spacing.large,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    minWidth: '80%',
  },
  modalBackground: {
    flex: 1,
  },
});

export default memo(Modal);
