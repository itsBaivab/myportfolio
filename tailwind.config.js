module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: '#222222',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			commandButton: '0 0 0 3px hsl(0 0% 30%)'
  		},
  		fontFamily: {
  			web3: [
  				'Syncopate',
  				'sans-serif'
  			]
  		},
  		typography: 'theme => ({\n        DEFAULT: {\n          css: {\n            color: theme("colors.gray.300"),\n            "h1, h2, h3, h4, h5, h6": {\n              color: theme("colors.gray.100"),\n              strong: theme("colors.gray.100"),\n              fontWeight: theme("fontWeight.bold"),\n            },\n            h1: {\n              fontSize: theme("fontSize.3xl"),\n              marginBottom: theme("spacing.8"),\n              marginTop: theme("spacing.8"),\n            },\n            h2: {\n              fontSize: theme("fontSize.2xl"),\n              marginBottom: theme("spacing.8"),\n              marginTop: theme("spacing.8"),\n            },\n            h3: {\n              fontSize: theme("fontSize.xl"),\n              marginBottom: theme("spacing.6"),\n              marginTop: theme("spacing.6"),\n            },\n            h4: {\n              fontSize: theme("fontSize.lg"),\n              marginBottom: theme("spacing.6"),\n              marginTop: theme("spacing.6"),\n            },\n            h5: {\n              fontSize: theme("fontSize.lg"),\n              marginBottom: theme("spacing.4"),\n              marginTop: theme("spacing.4"),\n            },\n            h6: {\n              fontSize: theme("fontSize.lg"),\n              marginBottom: theme("spacing.4"),\n              marginTop: theme("spacing.4"),\n            },\n             "--tw-prose-code": theme("colors.red[300]"),\n            "--tw-prose-bold": theme("colors.accent"),\n            "--tw-prose-quotes": theme("colors.accent"),\n          },\n        },\n      })',
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
};
