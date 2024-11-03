/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            scale: {
                "1200": "12.0"
            },
            height: {
                content: 'calc(100vh - 70px)'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                'balloon-flower-purple': '#7149FF',
                'honeysuckle-yellow': '#E1FF6B',
                'marigold-yellow': '#FFE875',
                'mint-green': '#93D9B7',
                'blossom-pink': '#FFB0E7',
                'hibiscus-orange': '#FF8B6B',
                'black-pepper': '#222222',
                'dusty-miller-gray': '#6B6969',
                'cotton-light-gray': '#A9A9A9',
                'peach-cream': '#FFEDE8',
                'cornflower-blue': '#4274FF'
            },
            fontFamily: {
                sans: ['Schoolbell', 'cursive'],
                chalkboard: 'Chalkboard',
            },
            backgroundImage: {
                circled: "url('/button-stroke.svg')"
            }
        },
    },
    plugins: [require('tailwindcss-animate')],
};
