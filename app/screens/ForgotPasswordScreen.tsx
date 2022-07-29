import React, { Fragment, memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { emailValidator } from '../core/utils';
import { spacing, theme } from '../core/variables';
import { NavProps } from '../core/types';
import { BackButton, Background, Button, Header, Logo, TextInput } from '../components/theme';
import { Snackbar } from 'react-native-paper';

const ForgotPasswordScreen = ({ navigation }: NavProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<string>('');
  const [email, setEmail] = useState({ value: '', error: '' });

  const sendResetPassword = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setIsLoading(true);
    auth()
      .sendPasswordResetEmail(email.value)
      .then(() => navigation.navigate('Login'))
      .catch(error => setSnackbar(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <Fragment>
      <BackButton goBack={() => navigation.navigate('Login')} />
      <Background>
        <Logo />
        <Header>Restore Password</Header>

        <TextInput
          label="E-mail address"
          returnKeyType="done"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <Button
          loading={isLoading}
          mode="contained"
          onPress={sendResetPassword}
          style={styles.button}>
          Send Reset Instructions
        </Button>

        <Snackbar visible={!!snackbar} onDismiss={() => setSnackbar('')}>
          {snackbar}
        </Snackbar>

        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.label}>← Back to login</Text>
        </TouchableOpacity>
      </Background>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: spacing.medium,
  },
  button: {
    marginTop: spacing.medium,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
