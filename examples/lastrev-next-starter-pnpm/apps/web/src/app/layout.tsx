import { Metadata } from 'next';

// TODO: Pull the SEO metadata from the Site settings in Contentful
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
      <body>{children}</body>
    </html>
  );
}
