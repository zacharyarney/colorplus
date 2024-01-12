import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colorplus',
  description: 'A small app to create color palettes from images ',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
