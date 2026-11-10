import { useCallback, useMemo, useState } from 'react';
import AuthContext from './AuthContext';

const ACCOUNTS_KEY = 'dishdeck-demo-users';
const LEGACY_ACCOUNT_KEY = 'dishdeck-demo-user';
const SESSION_KEY = 'dishdeck-demo-session';

function readStorage(key, fallback = null) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readAccounts() {
  const savedAccounts = readStorage(ACCOUNTS_KEY, null);
  if (savedAccounts && typeof savedAccounts === 'object' && !Array.isArray(savedAccounts)) {
    return savedAccounts;
  }

  // Migrate the previous single-account demo format without losing that account.
  const legacyAccount = readStorage(LEGACY_ACCOUNT_KEY);
  if (legacyAccount?.email) {
    const migrated = { [legacyAccount.email.toLowerCase()]: legacyAccount };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(migrated));
    return migrated;
  }
  return {};
}

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(readAccounts);
  const [user, setUser] = useState(() => readStorage(SESSION_KEY));

  const register = useCallback(({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (accounts[normalizedEmail]) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const newUser = { name: name.trim(), email: normalizedEmail, demoPassword: password };
    const updatedAccounts = { ...accounts, [normalizedEmail]: newUser };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, [accounts]);

  const login = useCallback(({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const savedUser = accounts[normalizedEmail];

    if (!savedUser || savedUser.demoPassword !== password) {
      throw new Error('Email or password is incorrect. Register a demo account first.');
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(savedUser));
    setUser(savedUser);
    return savedUser;
  }, [accounts]);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, register, login, logout }),
    [user, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
