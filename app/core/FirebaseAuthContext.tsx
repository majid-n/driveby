import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { createContext, FC, useEffect, useState, useContext } from 'react';

type User = FirebaseAuthTypes.User | null;
type ContextState = { user: User };

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: FC<any> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const value = { user };

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(setUser);
    return unsubscribe;
  }, []);

  return <FirebaseAuthContext.Provider value={value}>{children}</FirebaseAuthContext.Provider>;
};

const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }
  return context.user;
};

export { FirebaseAuthProvider, useFirebaseAuth };
