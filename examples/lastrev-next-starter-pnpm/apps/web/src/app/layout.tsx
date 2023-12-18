import { Metadata } from 'next';

// TODO: Pull the SEO metadata from the Site settings in Contentful
if (!process.env.DOMAIN) throw new Error('DOMAIN environment variable is required');
export const metadata: Metadata = {
  metadataBase: new URL(process.env.DOMAIN!),
  title: {
    template: '%s | Starter',
    default: 'Starter'
  },
  other: {
    contentful_space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
    contentful_environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENV ?? ''
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
