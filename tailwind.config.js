const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
        './safelist.txt'
      ],
      
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          background: {
            DEFAULT: '#34495e',
            dark: '#2c3e50'
          },
          pallette: {
            primary: '#2ecc71',
            dark: '#27ae60',
            error: '#e74c3c'
          },
          palleteHover: {
            primary: 'rgba(46,204,113,.7)',
            dark: 'rgba(39,174,96,.8)',
            error: 'rgba(231, 76, 60, .9)'
          },
          podium: {
            gold: '#c9b037',
            silver: '#b4b4b4',
            bronze: '#ad8a56'
          }
        },
        fontFamily: {
          sourceCode: ['Source Code Pro', 'monospace']
        },
        width: {
          mobile: '280px',
          tablet: '380px'
        }
      },
    },
    variants: {
      extend: {
        backgroundColor: ['disabled'],
        opacity: ['disabled'],
        cursor: ['disabled']
      },
    },
    plugins: [],
};
