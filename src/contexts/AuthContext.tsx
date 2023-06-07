import React, {
  FC, PropsWithChildren, createContext, useState, useMemo,
} from 'react';

interface IAuthContext {
  loggedIn: true | false;
  logOut: () => void;
  logIn: (id: string, token: string) => void;
  instanceId: string;
  apiToken: string;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [instanceId, setInstanceId] = useState(localStorage.getItem('instanceId') || '');
  const [apiToken, setApiToken] = useState(localStorage.getItem('apiToken') || '');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('stateInstance') === 'true');

  const logIn = (id: string, token: string) => {
    setLoggedIn(true);
    setInstanceId(id);
    setApiToken(token);
    localStorage.setItem('stateInstance', 'true');
    localStorage.setItem('instanceId', id);
    localStorage.setItem('apiToken', token);
  };

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          instanceId,
          apiToken,
          loggedIn,
          logOut,
          logIn,
        }),
        [loggedIn, apiToken, instanceId],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
