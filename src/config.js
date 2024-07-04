import { useState } from 'react';

const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleAuthToken = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    setAuthToken(token);
  };

  return {
    authToken,
    handleAuthToken,
  };
};

export default useAuth;

export const GRAPHQL_URL = 'https://nice-ram-81.hasura.app/v1/graphql';
export const HEADERS = {
  'x-hasura-admin-secret': '99pvCFYaiL6rgN5epY18rzFwDUNrCBPADN5bCPdEhbEm9itozWBmTcZgPpVMRZA5',
};

