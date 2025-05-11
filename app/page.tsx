import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight, CheckCircle, Zap, Shield, Users } from "lucide-react"
import GenerativeAIVisual from "@/components/generative-ai-visual"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF6ED] font-poppins">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-lg"></div>
          <span className="font-bold text-xl text-black">Promptly</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-black/70 hover:text-black transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-black/70 hover:text-black transition-colors">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-black/70 hover:text-black transition-colors">
            Testimonials
          </Link>
          <Link href="#faq" className="text-black/70 hover:text-black transition-colors">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="#" className="hidden md:block px-4 py-2 text-black/70 hover:text-black transition-colors">
            Sign in
          </Link>
          <Link
            href="#"
            className="px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] border-2 border-[#FDF6ED] flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={`/professional-person.png?key=ec74h&height=32&width=32&query=professional person ${i} avatar`}
                    alt={`User ${i}`}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[#FF8E53] text-[#FF8E53]" />
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
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
              <ArrowRight className="h-4 w-4" />
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
          {/* Our updated GenerativeAIVisual component */}
          <GenerativeAIVisual />
        </div>
      </section>

      {/* Rest of the page content remains the same */}
      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Powerful Features</h2>
          <p className="text-black/70 max-w-2xl mx-auto">
            Everything you need to build stunning websites in record time
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-6 w-6 text-[#FF6B6B]" />,
              title: "Lightning Fast",
              description:
                "Build and deploy websites in minutes, not days. Our optimized workflow saves you valuable time.",
            },
            {
              icon: <Shield className="h-6 w-6 text-[#FF8E53]" />,
              title: "Secure & Reliable",
              description:
                "Enterprise-grade security with 99.9% uptime guarantee. Your websites are always safe and available.",
            },
            {
              icon: <Users className="h-6 w-6 text-[#FF6B6B]" />,
              title: "Collaborative",
              description:
                "Work seamlessly with your team in real-time. Share, edit, and deploy together effortlessly.",
            },
            {
              icon: <CheckCircle className="h-6 w-6 text-[#FF8E53]" />,
              title: "SEO Optimized",
              description:
                "Built-in SEO tools to help your websites rank higher in search engines and attract more visitors.",
            },
            {
              icon: <Zap className="h-6 w-6 text-[#FF6B6B]" />,
              title: "Responsive Design",
              description: "Create websites that look stunning on any device with our responsive design framework.",
            },
            {
              icon: <Shield className="h-6 w-6 text-[#FF8E53]" />,
              title: "Custom Domains",
              description: "Connect your own domain in seconds with our simple DNS management system.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-[#FDF6ED]"
            >
              <div className="h-12 w-12 bg-[#FDF6ED] rounded-lg flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:rotate-12">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-16 md:py-24 bg-white rounded-3xl my-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Loved by Thousands</h2>
          <p className="text-black/70 max-w-2xl mx-auto">See what our customers have to say about their experience</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#FDF6ED] p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-[#FF8E53] text-[#FF8E53]" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Promptly has completely transformed how we build websites. What used to take weeks now takes hours. The
                interface is intuitive and the features are exactly what we needed."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center overflow-hidden">
                  <Image
                    src={`/professional-team.png?height=48&width=48&query=professional ${i === 1 ? "woman" : i === 2 ? "man" : "person"} headshot`}
                    alt={`Testimonial ${i}`}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-black">
                    {i === 1 ? "Sarah Johnson" : i === 2 ? "Michael Chen" : "Alex Rodriguez"}
                  </h4>
                  <p className="text-sm text-black/70">
                    {i === 1 ? "Web Developer, TechCorp" : i === 2 ? "Designer, CreativeStudio" : "Founder, StartupX"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute z-0 top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4">
            <div className="relative transform-style-3d">
              <div className="h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 transform rotate-12 animate-float-slow"></div>
              <div className="absolute top-0 left-0 h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF8E53]/10 to-[#FF6B6B]/10 transform -rotate-12 animate-float"></div>
            </div>
          </div>

          <div className="absolute z-0 top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4">
            <div className="relative transform-style-3d">
              <div className="h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 transform rotate-12 animate-float"></div>
              <div className="absolute top-0 left-0 h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF8E53]/10 to-[#FF6B6B]/10 transform -rotate-12 animate-float-slow"></div>
            </div>
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
                <ArrowRight className="h-5 w-5" />
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
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-black mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/70 hover:text-black transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-lg"></div>
              <span className="font-bold text-xl text-black">Promptly</span>
            </div>
            <p className="text-black/70">© 2025 Promptly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
