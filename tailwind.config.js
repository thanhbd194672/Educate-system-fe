/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/client/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                'green-main-custom' : '#98CFC3',
                'custom-navi' : '#D1F7F7',
                'green-sub-custom' : '#DAFAFA',
            }
        },
    },
    plugins: [],
}
