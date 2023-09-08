import AppProvider from '@ui/AppProvider/AppProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | LastRev Next Starter',
    default: 'LastRev Next Starter'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
