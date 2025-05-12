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
        sans: ['var(--font-ubuntu)', 'sans-serif'], // Use the CSS variable for Ubuntu
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
        // Retain existing theme colors if they are still used or for gradients
        'promptly-background': 'var(--background)', // maps to new background
        'promptly-foreground': 'var(--foreground)', // maps to new foreground
        'promptly-heading': 'var(--heading-color)',   // maps to new heading
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #a1c4fd, #c2e9fb)', // Example gradient
        'coral-gradient': 'linear-gradient(to right, #ffecd2, #fcb69f)', // Example gradient
      },
      boxShadow: {
        'gentle': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'gentle-lift': '0 6px 16px rgba(0, 0, 0, 0.12)',
      },
      borderColor: { // Ensure this is available if not covered by 'colors'
        DEFAULT: 'var(--border-color-soft)', // Default border color for components
        soft: 'var(--border-color-soft)',
      }
    },
  },
  plugins: [],
}
export default config
