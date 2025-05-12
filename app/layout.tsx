import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ubuntu = localFont({
  src: [
    {
      // This path tells Next.js to look in /home/whyatul/promptly-ui/fonts/
      path: '../fonts/Ubuntu-Regular.ttf', 
      weight: '400',
      style: 'normal',
    },
  ],
  display: "swap",
  variable: "--font-ubuntu", 
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
      {/* Body class includes font variable and antialiasing. Background and text color come from globals.css */}
      <body
        className={`${ubuntu.variable} font-sans antialiased`} 
        suppressHydrationWarning
      >
        {children} 
      </body>
    </html>
  );
}
