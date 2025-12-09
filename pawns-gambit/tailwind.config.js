/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // gray-100
        ring: "var(--color-ring)", // amber-600
        background: "var(--color-background)", // white
        foreground: "var(--color-foreground)", // gray-800
        primary: {
          DEFAULT: "var(--color-primary)", // gray-900
          foreground: "var(--color-primary-foreground)", // gray-50
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // gray-100
          foreground: "var(--color-secondary-foreground)", // gray-800
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-700
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // amber-600
          foreground: "var(--color-accent-foreground)", // gray-900
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // green-700
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // yellow-700
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-700
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand-specific colors
        surface: "var(--color-surface)", // gray-100
        'text-primary': "var(--color-text-primary)", // gray-800
        'text-secondary': "var(--color-text-secondary)", // gray-500
        'chess-dark': "var(--color-chess-dark)", // gray-900
        'chess-light': "var(--color-chess-light)", // gray-50
        'wood-accent': "var(--color-wood-accent)", // amber-600
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'sans': ['Source Sans Pro', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "knight-move": "knight-move 0.8s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradientShift 15s ease infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fadeIn": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slideIn": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "knight-move": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(16px, -8px)" },
          "50%": { transform: "translate(32px, -16px)" },
          "75%": { transform: "translate(48px, -8px)" },
          "100%": { transform: "translate(64px, 0)" },
        },
        "gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        'strategic': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'strategic-lg': '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
        'elevation-1': '0 2px 8px rgba(44, 62, 80, 0.1)',
        'elevation-2': '0 4px 16px rgba(44, 62, 80, 0.15)',
      },
      backgroundImage: {
        'chess-pattern': `
          linear-gradient(45deg, transparent 25%, rgba(26, 26, 26, 0.02) 25%),
          linear-gradient(-45deg, transparent 25%, rgba(26, 26, 26, 0.02) 25%),
          linear-gradient(45deg, rgba(26, 26, 26, 0.02) 75%, transparent 75%),
          linear-gradient(-45deg, rgba(26, 26, 26, 0.02) 75%, transparent 75%)
        `,
        'gradient-strategic': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
        'gradient-warm': 'linear-gradient(135deg, var(--color-accent) 0%, #E67E22 100%)',
      },
      backgroundSize: {
        'chess': '32px 32px',
      },
      backgroundPosition: {
        'chess': '0 0, 0 16px, 16px -16px, -16px 0px',
      },
      transitionTimingFunction: {
        'strategic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
        '200': '200ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      gridTemplateColumns: {
        'chess': 'repeat(8, 1fr)',
        'chess-mobile': 'repeat(4, 1fr)',
        'chess-small': 'repeat(2, 1fr)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}