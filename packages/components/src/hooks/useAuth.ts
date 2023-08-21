import useSWR from 'swr';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true
});

const fetcher = (url: string) => {
  return instance.get(url);
};

export const useAuth = () => {
  const url = `${process.env.USER_AUTH_DOMAIN}/me`;
  return useSWR(url, fetcher);
};
