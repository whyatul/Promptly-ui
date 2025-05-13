import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/utils/theme-provider"; 

const ubuntu = localFont({
  src: [
    {
      path: '../fonts/Ubuntu-Regular.ttf', 
      weight: '400',
      style: 'normal',
    },
  ],
  display: "swap",
  variable: "--font-ubuntu", 
});

const calSans = localFont({
  src: '../fonts/CalSans-Regular.ttf', 
  display: 'swap',
  variable: '--font-cal-sans',
});

export const metadata: Metadata = { 
  title: "Promptly", 
  description: "Super fast motion for every team", 
};

export default function RootLayout({ 
  children,
}: Readonly<{ 
  children: React.ReactNode; 
}>) {
  return ( 
    <html lang="en" suppressHydrationWarning> 
      <body
        className={`${ubuntu.variable} ${calSans.variable} font-sans antialiased`} 
        suppressHydrationWarning
      >
        <ThemeProvider
          defaultTheme="light"
          storageKey="promptly-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
