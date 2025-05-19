/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		container: {
			center: true,
			padding: '15px'
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '960px',
			xl: '1200px'
		},
		colors: {
			primary: '#1C1C22',
			accent: {
				DEFAULT: '#00FF99',
				hover: '#00E187'
			}
		},
		fontFamily: {
			primary: 'var(--font-jetbrainsMono)',
		},
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height' },
					to: { height: '0' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
