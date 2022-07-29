import React, { Fragment, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { BackButton, Background, Button, Header, Logo, TextInput } from '../components/theme';
import { passwordValidator, emailValidator } from '../core/utils';
import { spacing, theme } from '../core/variables';
import { NavProps } from '../core/types';
import { Snackbar } from 'react-native-paper';

const LoginScreen = ({ navigation }: NavProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<string>('');
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  useEffect(() => setIsLoading(false), []);

  const doUserLogIn = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    }

    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => navigation.navigate('Root'))
      .catch(error => {
        let message = error.message;
        if (error.code === 'auth/wrong-password') message = 'Invalid credentials!';
        if (error.code === 'auth/user-not-found') message = 'User not found!';
        setSnackbar(message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Fragment>
      <BackButton goBack={() => navigation.navigate('Home')} />
      <Background>
        <Logo />
        <Header>Welcome back.</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
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

        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button loading={isLoading} mode="contained" onPress={doUserLogIn}>
          Login
        </Button>

        <Snackbar visible={!!snackbar} onDismiss={() => setSnackbar('')}>
          {snackbar}
        </Snackbar>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: spacing.huge,
  },
  row: {
    flexDirection: 'row',
    marginTop: spacing.tiny,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default LoginScreen;
