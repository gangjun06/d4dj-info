module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#6366f1' /* Primary color */,
        'primary-focus': '#4F46E5' /* Primary color - focused */,
        'primary-content':
          '#ffffff' /* Foreground content color to use on primary color */,
        secondary: '#f000b8',
        'secondary-focus': '#bd0091',
        'secondary-content': '#ffffff',
        accent: '#37cdbe',
        'accent-focus': '#2aa79b',
        'accent-content': '#ffffff',
        neutral: '#3d4451',
        'neutral-focus': '#2a2e37',
        'neutral-content': '#ffffff',
        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#d1d5db',
        'base-content': '#1f2937',
        info: '#2094f3',
        success: '#009485',
        warning: '#ff9900',
        error: '#ff5724',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
