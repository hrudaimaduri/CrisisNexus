import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/providers/theme-provider";
import { LocationsProvider } from "../context/locations-context";
import { SearchProvider } from "../context/search-context";
import CrisisMateWidget from "../components/crisismate/crisismate-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrisisNexus",
  description: "Stay safe. Stay informed. Real-time disaster alerts and instructions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          key="theme-provider"
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="crisisnexus-theme"
          themes={["light", "dark", "system"]}
        >
          <LocationsProvider>
            <SearchProvider>
              {/* Page content */}
              {children}
            </SearchProvider>
          </LocationsProvider>

          {/* Chatbot pinned bottom-right (self-positioned) */}
          <CrisisMateWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
