import dynamic from 'next/dynamic';

const LiveEditor = dynamic(() => import('@last-rev/contentful-app-components/dist/LiveEditor'), {
  ssr: false
});

export default LiveEditor;
