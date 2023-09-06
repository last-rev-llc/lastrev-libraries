import dynamic from 'next/dynamic';

const Link = dynamic(() => import('./Link'));
const Media = dynamic(() => import('./Media'));
const Text = dynamic(() => import('./Text'));

const contentMapping: {
  [key: string]: any;
} = {
  Text,
  Media,
  Link
};

export default contentMapping;
