import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './providers'

// "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoNotFail.ai",
  description: "donotfail.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={openSans.className}>
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
