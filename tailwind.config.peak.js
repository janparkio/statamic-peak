//--------------------------------------------------------------------------
// Tailwind custom Peak configuration
//--------------------------------------------------------------------------
//
// Here we define base styles, components and utilities used by Peak. 
//

const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    // Here we define the default colors available. You should extend 
    // these in tailwind.config.site.js for the current project colors.
    colors: {
      transparent: 'transparent',
      black:   '#000',
      white:  '#fff',
      // Error styling colors: red (TW Red)
      error: {
        50: '#FDF2F2',
        100: '#FCE8E8',
        200: '#FBD5D5',
        300: '#F8B4B3',
        400: '#F88080',
        500: '#F05252',
        600: '#E02423',
        700: '#C81F1D',
        800: '#9B1D1C',
        900: '#771D1D',
      },
      // Notice styling colors: yellow (TW Yellow)
      notice: {
        50: '#FDFDEA',
        100: '#FDF5B2',
        200: '#FCE96B',
        300: '#FACA16',
        400: '#E3A009',
        500: '#C27805',
        600: '#9F580B',
        700: '#8E4B10',
        800: '#723A14',
        900: '#643112',
      },
      // Success styling colors: green (TW Green)
      success: {
        50: '#F3FAF7',
        100: '#DEF7EC',
        200: '#BBF0DA',
        300: '#84E1BC',
        400: '#30C48D',
        500: '#0D9F6E',
        600: '#047A55',
        700: '#036C4E',
        800: '#06543F',
        900: '#024737',
      },
    },
    extend: {
      padding: {
        // Used to generate responsive video embeds.
        'video': '56.25%',
      },
      screens: {
        // Add a slightly wider breakpoint.
        '2xl': '1440px',
      },
      spacing: {
        // Used for the mobile navigation toggle.
        'safe': 'calc(env(safe-area-inset-bottom, 0rem) + 2rem)',
      },
      zIndex: {
        // Z-index stuff behind it's parent.
        'behind': '-1',
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          // Fluid typography from 1 rem to 1.15 rem with fallback to 16px. 
          fontSize: '16px',
          'font-size': 'clamp(1rem, 1.6vw, 1.2rem)',
          // Safari resize fix. 
          minHeight: '0vw',
        },
        // Used to hide alpine elements before being rendered.
        '[x-cloak]': { 
          display: 'none !important'
        },
        // Display screen breakpoints in debug environment.
        'body.debug::before': {
          display: 'block',
          position: 'fixed',
          zIndex: '99',
          top: theme('spacing.1'),
          right: theme('spacing.1'),
          padding: theme('spacing.1'),
          border: '1px',
          borderStyle: 'solid',
          borderColor: theme('colors.notice.300'),
          borderRadius: theme('borderRadius.full'),
          backgroundColor: theme('colors.notice.200'),
          fontSize: '.5rem',
          color: theme('colors.notice.900'),
          textTransform: 'uppercase',
          fontWeight: theme('fontWeight.bold'),
          content: '"-"',
          pointerEvents: 'none',
        },
      })
    }),

    // Render screen names in the breakpoint display.
    plugin(function({ addBase, theme}) {
      const breakpoints = _.map(theme('screens'), (value, key) => {
        return {
          [`@media (min-width: ${value})`]: {
            'body.debug::before': {
              content: `"${key}"`,
            }
          }
        }
      })
      addBase(breakpoints)
    }),

    plugin(function({ addComponents, theme }) {
      const components = {
        // The main wrapper for all sections on our website. Has a max width and is centered. 
        '.fluid-container': {
          width: '100%',
          maxWidth: theme('screens.2xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          // Use safe-area-inset together with default padding for Apple devices with a notch.
          paddingLeft: 'calc(env(safe-area-inset-left, 0rem) + ' + theme('padding.8') + ')',
          paddingRight: 'calc(env(safe-area-inset-right, 0rem) + ' + theme('padding.8') + ')',
        },
        // Disable scroll e.g. when a modal is open. Should be used on the <body>
        '.no-scroll': {
          height: '100%',
          overflow: 'hidden',
        },
        // The outer grid where all block builder blocks are a child of. Spreads out all blocks 
        // vertically with a uniform space between them.
        '.outer-grid': {
          width: '100%',
          display: 'grid',
          rowGap: theme('spacing.12'),
          paddingTop: theme('spacing.12'),
          paddingBottom: theme('spacing.12'),
          // If the last child of the outer grid is full width (e.g. when it has a full width 
          // colored background), give it negative margin bottom to get it flush to your 
          // sites footer.
          '& > *:last-child:has(.w-full)': {
            marginBottom: theme('spacing.12') * -1,
          },
        },
        [`@media (min-width: ${theme('screens.md')})`]: {
          // Larger vertical spacing between blocks on larger screens.
          '.outer-grid': {
            rowGap: theme('spacing.16'),
            paddingTop: theme('spacing.16'),
            paddingBottom: theme('spacing.16'),
            '& > *:last-child:has(.w-full)': {
              marginBottom: theme('spacing.16') * -1,
            },
          },
        },
        [`@media (min-width: ${theme('screens.lg')})`]: {
          // Larger horizontal padding on larger screens.
          '.fluid-container': {
            // Use safe-area-inset together with default padding for Apple devices with a notch.
            paddingLeft: 'calc(env(safe-area-inset-left, 0rem) + ' + theme('padding.12') + ')',
            paddingRight: 'calc(env(safe-area-inset-right, 0rem) + ' + theme('padding.12') + ')',
          },
          // Larger vertical spacing between blocks on larger screens.
          '.outer-grid': {
            rowGap: theme('spacing.24'),
            paddingTop: theme('spacing.24'),
            paddingBottom: theme('spacing.24'),
            '& > *:last-child:has(.w-full)': {
              marginBottom: theme('spacing.24') * -1,
            },
          },
        },
      }
      addComponents(components)
    }),

    plugin(function({ addUtilities, theme, variants }) {
      const newUtilities = {
        // Break words only when needed.
        '.break-decent': {
          wordBreak: 'break-word',
        },
        // Sizing utilities for sets in our bard (long form content).
        // On small devices they're full width.
        '.size-sm, .size-md, .size-lg, .size-xl': {
          gridColumn: 'span 12 / span 12',
        },
        [`@media (min-width: ${theme('screens.md')})`]: {
          // Sizing utilities for sets in our bard (long form content).
          // On larger devices they go from small to extra large.
          // (E.g. an image wider then text in an article.)
          '.size-sm': {
            gridColumn: 'span 4 / span 4',
            gridColumnStart: '3',
          },
          '.size-md': {
            gridColumn: 'span 8 / span 8',
            gridColumnStart: '3',
          },
          '.size-lg': {
            gridColumn: 'span 8 / span 8',
            gridColumnStart: '3',
          }, 
          '.size-xl': {
            gridColumn: 'span 10 / span 10',
            gridColumnStart: '2',
          },
        },
        [`@media (min-width: ${theme('screens.lg')})`]: {
          // Sizing utilities for sets in our bard (long form content).
          // On larger devices they go from small to extra large.
          '.size-sm': {
            gridColumn: 'span 4 / span 4',
            gridColumnStart: '4',
          },
          '.size-md': {
            gridColumn: 'span 6 / span 6',
            gridColumnStart: '4',
          },
          '.size-lg': {
            gridColumn: 'span 8 / span 8',
            gridColumnStart: '3',
          }, 
          '.size-xl': {
            gridColumn: 'span 10 / span 10',
            gridColumnStart: '2',
          },
        },
      }
      addUtilities(newUtilities)
    }),
  ]
}