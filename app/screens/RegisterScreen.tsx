import React, { Fragment, memo, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BackButton, Background, Button, Header, Logo, TextInput } from '../components/theme';
import { emailValidator, nameValidator, passwordValidator } from '../core/utils';
import { spacing, theme } from '../core/variables';
import { NavProps } from '../core/types';
import { Snackbar } from 'react-native-paper';

const RegisterScreen = ({ navigation }: NavProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<string>('');
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  useEffect(() => setIsLoading(false), []);

  const doUserRegistration = async function () {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (nameError || emailError || passwordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        updateProfile();
      })
      .catch(error => {
        let message = error.message;
        if (error.code === 'auth/email-already-in-use') message = 'Email address already in use!';
        if (error.code === 'auth/invalid-email') message = 'Invalid email address!';
        setSnackbar(message);
        setIsLoading(false);
      });
  };

  const updateProfile = () => {
    auth()
      .currentUser?.updateProfile({ displayName: name.value })
      .finally(() => {
        setIsLoading(false);
        navigation.navigate('Root');
        sendVerificationMail();
      })
      .catch(error => {
        setSnackbar(error.message);
      });
  };

  const sendVerificationMail = () => {
    auth()
      .currentUser?.sendEmailVerification({ url: '', handleCodeInApp: true })
      .then(() => {})
      .catch(error => {
        setSnackbar(error.message);
      });
  };

  return (
    <Fragment>
      <BackButton goBack={() => navigation.navigate('Home')} />
      <Background>
        <Logo />
        <Header>Create Account</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          // autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <Button loading={isLoading} mode="contained" onPress={doUserRegistration} style={styles.button}>
          Sign Up
        </Button>

        <Snackbar visible={!!snackbar} onDismiss={() => setSnackbar('')}>
          {snackbar}
        </Snackbar>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: spacing.huge,
  },
  row: {
    flexDirection: 'row',
    marginTop: spacing.tiny,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
