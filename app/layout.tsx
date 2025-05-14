import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
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

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const calSans = localFont({
  src: '../fonts/CalSans-Regular.ttf', 
  display: 'swap',
  variable: '--font-cal-sans',
});

export const metadata: Metadata = { 
  title: "Promptly - AI Animations Builder", 
  description: "Create stunning animations with AI in seconds - No coding required", 
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${poppins.variable} ${calSans.variable} scroll-smooth`}>
      <body>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#f8f0e5_1px,transparent_1px),linear-gradient(to_bottom,#f8f0e5_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#ff8e53_5%,transparent_90%)]"></div>
          <div className="bg-gradient-radial-to-tr from-transparent via-orange-100/10 to-amber-100/10 fixed inset-0 z-[-1]"></div>
        </div>
        
        {/* Background animated orbs */}
        <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] opacity-20 blur-[120px] animate-floating-blob"></div>
          <div className="absolute -bottom-[10%] -right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-[#FF8E53] to-[#FF6B6B] opacity-20 blur-[100px] animate-floating-blob-2"></div>
        </div>
        
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
