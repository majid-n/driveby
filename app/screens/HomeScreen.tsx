import React from 'react';
import { NavProps } from '../core/types';
import { Background, Button, Header, Logo, Paragraph } from '../components/theme';

const HomeScreen = ({ navigation }: NavProps) => {
  return (
    <Background>
      <Logo />
      <Header>Home Fix</Header>

      <Paragraph>The easiest way to fix you house problems.</Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
        Sign Up
      </Button>
    </Background>
  );
};

export default HomeScreen;
