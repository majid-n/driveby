import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './core/variables';
import { FirebaseAuthProvider } from './core/FirebaseAuthContext';
import { Icon } from './components/theme';
import { Navigation } from './components/theme/Navigation';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme} settings={{ icon: props => <Icon {...props} /> }}>
        <FirebaseAuthProvider>
          <Navigation />
        </FirebaseAuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
