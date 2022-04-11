import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';

const redirectKey = 'sign_in_redirect';
const superUserKey = 'is_super_user';

export const AuthContext = React.createContext<
  | {
      initializing: boolean;
      authenticated: boolean;
      error: boolean;
      isSuperUser: boolean;
      setRedirect: (redirect: string) => void;
      getRedirect: () => string | null;
      clearRedirect: () => void;
      setSuperUser: (value: boolean) => void;
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

function getSuperUser(): boolean {
  try {
    return window.sessionStorage.getItem(superUserKey) === 'true';
  } catch {
    return false;
  }
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
  const [isSuperUser, setIsSuperUser] = useState(getSuperUser());

  const { data, error: apiError } = useAuth(isSuperUser);
  useEffect(() => {
    setInitializing(!data && !apiError);
    setAuthenticated(!!data);
    setError(!!apiError);
  }, [data, apiError]);

  // reset auth status when changing from normal(okta) to superuser(internal)
  useEffect(() => {
    setInitializing(true);
    setAuthenticated(false);
  }, [isSuperUser]);

  const setSuperUser = (value: boolean) => {
    setIsSuperUser(value);
    window.sessionStorage.setItem(superUserKey, value.toString());
  };

  const value = {
    authenticated,
    error,
    initializing,
    isSuperUser,
    setRedirect,
    getRedirect,
    clearRedirect,
    setSuperUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
