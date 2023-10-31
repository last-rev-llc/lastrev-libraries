import { Metadata } from 'next';

// TODO: Pull the SEO metadata from the Site settings in Contentful
if (!process.env.DOMAIN) throw new Error('DOMAIN environment variable is required');
export const metadata: Metadata = {
  metadataBase: new URL(process.env.DOMAIN!),
  title: {
    template: '%s | LastRev Next Starter',
    default: 'LastRev Next Starter'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="contentful_space" content="{process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}" />
        <meta name="contentful_environment" content="{process.env.NEXT_PUBLIC_CONTENTFUL_ENV}" />
      </head>
      <body>{children}</body>
    </html>
  );
}
