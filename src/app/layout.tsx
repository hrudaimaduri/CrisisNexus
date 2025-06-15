import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocationsProvider } from "@/context/locations-context";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SearchProvider } from "@/context/search-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrisisNexus",
  description: "Crisis management and alert system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          key="theme-provider"
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="crisisnexus-theme"
          themes={['light', 'dark', 'system']}
        >
          <LocationsProvider>
            <SearchProvider>
              {children}
            </SearchProvider>
          </LocationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}