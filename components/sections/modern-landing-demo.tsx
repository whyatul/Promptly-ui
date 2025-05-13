"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import GenerativeAIVisual from "@/components/ui/generative-ai-visual";

const LucideIcons = dynamic(
  () => import('lucide-react').then((mod) => ({
    Star: mod.Star,
    ArrowRight: mod.ArrowRight,
    CheckCircle: mod.CheckCircle,
    Zap: mod.Zap, 
    Shield: mod.Shield,
    Users: mod.Users
  })),
  {
    ssr: false,
    loading: () => ({}), 
  }
);

const FallbackIcons = {
  Star: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )
};

const Icons = typeof LucideIcons === 'object' && Object.keys(LucideIcons).length > 0 ? LucideIcons : FallbackIcons;

export default function ModernLandingDemo() {
  return (
    <section className="w-full font-sans py-16">
      <div className="container mx-auto px-4">
      
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] border-2 border-[#FDF6ED] flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 w-4 fill-[#FF8E53] text-[#FF8E53]">
                    <Icons.Star />
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight"
            style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
            >
              Build Your Website{" "}
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent transform -rotate-1 inline-block">
                Faster
              </span>
            </h1>

            <p className="text-lg text-gray-700 max-w-xl">
              Elevate your website build with our intuitive tools for faster, more efficient, quality-driven elements for
              a seamless digital experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#"
                className="px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
              >
                Get it now
                <span className="h-4 w-4">
                  <Icons.ArrowRight />
                </span>
              </Link>
              <Link
                href="#"
                className="px-6 py-3 bg-white text-black/70 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <GenerativeAIVisual />
          </div>
        </div>

        <div className="py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Powerful Features</h2>
            <p className="text-black/70 max-w-2xl mx-auto">
              Everything you need to build stunning websites in record time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <div className="h-6 w-6 text-[#FF6B6B]"><Icons.Zap /></div>,
                title: "Lightning Fast",
                description:
                  "Build and deploy websites in minutes, not days. Our optimized workflow saves you valuable time.",
              },
              {
                icon: <div className="h-6 w-6 text-[#FF8E53]"><Icons.Shield /></div>,
                title: "Secure & Reliable",
                description:
                  "Enterprise-grade security with 99.9% uptime guarantee. Your websites are always safe and available.",
              },
              {
                icon: <div className="h-6 w-6 text-[#FF6B6B]"><Icons.Users /></div>,
                title: "Collaborative",
                description:
                  "Work seamlessly with your team in real-time. Share, edit, and deploy together effortlessly.",
              },
              {
                icon: <div className="h-6 w-6 text-[#FF8E53]"><Icons.CheckCircle /></div>,
                title: "SEO Optimized",
                description:
                  "Built-in SEO tools to help your websites rank higher in search engines and attract more visitors.",
              },
              {
                icon: <div className="h-6 w-6 text-[#FF6B6B]"><Icons.Zap /></div>,
                title: "Responsive Design",
                description: "Create websites that look stunning on any device with our responsive design framework.",
              },
              {
                icon: <div className="h-6 w-6 text-[#FF8E53]"><Icons.Shield /></div>,
                title: "Custom Domains",
                description: "Connect your own domain in seconds with our simple DNS management system.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-[#FDF6ED]"
              >
                <div className="h-12 w-12 bg-[#FDF6ED] rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-12">
          <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute z-0 top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4">
              <div className="h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 transform rotate-12"></div>
            </div>

            <div className="absolute z-0 top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4">
              <div className="h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 transform -rotate-12"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Ready to Build{" "}
                <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent transform -rotate-1 inline-block">
                  Faster
                </span>
                ?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Join thousands of developers and designers who are already building amazing websites with Promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#"
                  className="px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
                >
                  Get Started Now
                  <span className="h-5 w-5">
                    <Icons.ArrowRight />
                  </span>
                </Link>
                <Link
                  href="#"
                  className="px-8 py-4 bg-white text-black/70 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
