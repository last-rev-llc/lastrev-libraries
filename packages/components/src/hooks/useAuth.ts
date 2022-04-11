import useSWR from 'swr';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true
});

const fetcher = (url: string) => {
  return instance.get(url);
};

export const useAuth = (isSuperUser = false) => {
  const url = isSuperUser
    ? `${process.env.USER_AUTH_DOMAIN}/api/user/helpCenter/currentUser`
    : `${process.env.OKTA_AUTH_DOMAIN}/api/v1/users/me`;
  return useSWR(url, fetcher);
};
