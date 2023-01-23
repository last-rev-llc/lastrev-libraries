import { GetServerSideProps } from 'next';
import { parseBooleanEnvVar } from '@ias/utils';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);

const SITE = process.env.SITE;

export const getServerSideProps: GetServerSideProps = async ({ res, locales }) => {
  try {
    let robots;
    if (preview || SITE === 'RESOURCE') {
      robots = `User-agent: *
Disallow: /`;
    } else {
      robots = `User-agent: *
Allow: /
Sitemap: ${process.env.DOMAIN}/sitemap.xml`;
    }

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, s-maxage=0');
    res.write(robots);
    res.end();

    return { props: {} };
  } catch (err: any) {
    if (err.name == 'FetchError') {
      console.log('[Error][GetStaticProps]', err.name);
    } else {
      console.log(err);
    }
    throw err;
  }
};

export default function Sitemap() {
  return null;
}
