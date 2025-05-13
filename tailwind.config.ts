import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ubuntu)', 'sans-serif'], 
        calSans: ['var(--font-cal-sans)', 'sans-serif'],
      },
      colors: {
        'sky-blue': 'var(--accent-sky-blue)',
        'sky-blue-darker': 'var(--accent-sky-blue-darker)',
        'lavender': 'var(--accent-lavender)',
        'mint-green': 'var(--accent-mint-green)',
        'soft-coral': 'var(--accent-soft-coral)',
        'border-soft': 'var(--border-color-soft)',
        'card-bg': 'var(--card-background)',
        'card-bg-translucent': 'var(--card-background-translucent)',
        'ui-hover': 'var(--ui-background-hover)',
        'promptly-background': 'var(--background)',
        'promptly-foreground': 'var(--foreground)',
        'promptly-heading': 'var(--heading-color)',
        'cream': '#FFF8E1',
        'peach': '#FFCCBC',
        'blue': '#3D5AFE',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
        'coral-gradient': 'linear-gradient(to right, #ffecd2, #fcb69f)',
      },
      boxShadow: {
        'gentle': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'gentle-lift': '0 6px 16px rgba(0, 0, 0, 0.12)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color-soft)',
        soft: 'var(--border-color-soft)',
      },
      rotate: {
        '-30': '-30deg',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
