import React, { Fragment, memo } from 'react';
import auth from '@react-native-firebase/auth';
import { Avatar, Text } from 'react-native-paper';
import { AppBar, Background, Button, Header, Icon, Logo, Paragraph } from '../components/theme';
import { DrawerNavProps } from '../core/types';
import { useFirebaseAuth } from '../core/FirebaseAuthContext';

const Dashboard = ({ navigation }: DrawerNavProps) => {
  const user = useFirebaseAuth();

  const onAppbarPress = id =>
    ({
      logout: handleLogOut,
      menu: navigation.toggleDrawer,
    }[id]());
  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => navigation.getParent()?.navigate('Login'));
  };

  return (
    <Fragment>
      <AppBar
        title="Dashboard"
        onPress={onAppbarPress}
        actions={[
          { id: 'menu', icon: 'menu', side: 'left' },
          { id: 'logout', icon: 'log-out' },
        ]}
      />
      <Background>
        {/* <Logo /> */}
        <Avatar.Image size={150} source={{ uri: 'https://via.placeholder.com/150' }} />
        <Header>Welcome {user?.displayName || user?.email}</Header>
        {!user?.emailVerified && <Paragraph>Varify your Email.</Paragraph>}

        <Button mode="outlined" onPress={handleLogOut} icon="camera">
          Logout
        </Button>
      </Background>
    </Fragment>
  );
};

export default memo(Dashboard);
