/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pigment-green': '#4caf50', //#4caf50 Primary CTAs and buttons (pigment-green)
        'neon-green': '#31c48d',
        'onyx': '#36393b', // Navigation, footer, dark sidebars
        'snow': '#fcf7f8', // Main content background
        'lake-blue': '#6c91c2', // Hover effects, links, secondary buttons
        'neon-blue': '#3f83f8',
        'gamboge': '#f39c12', // Accent for key info (skills, projects)
        'midnight-blue': '#2c3e50', // Headings, section titles
        'cloud-gray': '#bdc3c7', // Dividers, borders
        'flame-red': '#e74c3c', // Error messages, form warnings
        'ash-gray': '#95a5a6', // Body text, descriptions
        'charcoal-gray': '#34495e', // Alternative dark gray for text or backgrounds
        
        // Section-specific colors:
        'about-text': '#f2f3f4', // Light background for "About Me" section
        'projects-bg': '#e3f2fd', // Soft blue background for "Projects" section
        'contact-bg': '#fafafa', // Neutral background for "Contact" section
        'about-bg': '#34495e', // Dark text for "About Me" section
        'projects-text': '#2c3e50', // Dark blue text for "Projects" section
        'contact-text': '#7f8c8d', // Muted text for "Contact" section
      }
    },
  },
  plugins: [],
}
