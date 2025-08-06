import { Analytics } from "@vercel/analytics/next";

import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/contexts/theme-provider";
import { AppContextProvider } from "@/contexts";

import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Gospel Companion",
  description: "A cutting-edge digital assistant designed to enhance the experience of studying bible lessons and gospel materials."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      {/* styles required to prevent horizontal scrolling */}
      <body className="max-w-full overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppContextProvider>
            <Suspense>
              {children}
            </Suspense>

            <Toaster />
          </AppContextProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
