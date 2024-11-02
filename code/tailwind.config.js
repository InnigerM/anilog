/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			'balloon-flower-purple': '#7149FF',
			"honeysuckle-yellow": '#E1FF6B',
			"marigold-yellow": '#FFE875',
			"mint-green": '#93D9B7',
			"blossom-pink": '#FFB0E7',
			"hibiscus-orange": '#FF8B6B',
			"black-pepper": '#222222',
			"dusty-miller-gray": '#6B6969',
			"cotton-light-gray": '#A9A9A9'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
