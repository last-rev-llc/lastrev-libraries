import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';

const redirectKey = 'sign_in_redirect';

export const AuthContext = React.createContext<
  | {
      initializing: boolean;
      authenticated: boolean;
      error: boolean;
      setRedirect: (redirect: string) => void;
      getRedirect: () => string | null;
      clearRedirect: () => void;
    }
  | undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

function setRedirect(redirect: string) {
  window.sessionStorage.setItem(redirectKey, redirect);
}

function getRedirect(): string | null {
  try {
    return window.sessionStorage.getItem(redirectKey);
  } catch {
    return null;
  }
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey);
}

export function useAuthContext() {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return auth;
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const { data, error: apiError } = useAuth();
  useEffect(() => {
    setInitializing(!data && !apiError);
    setAuthenticated(!!data);
    setError(!!apiError);
  }, [data, apiError]);

  // reset auth status when changing from normal(okta) to superuser(internal)
  useEffect(() => {
    setInitializing(true);
    setAuthenticated(false);
  }, []);

  const value = {
    authenticated,
    error,
    initializing,

    setRedirect,
    getRedirect,
    clearRedirect
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
