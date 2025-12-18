// tailwind.config.js
tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#165DFF',
          secondary: '#0E42B3',
          accent: '#0A2D7A',
          dark: '#1E293B',
        },
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
        fontSize: {
            'xs': ['0.75rem', { lineHeight: '1.25' }],
            'sm': ['0.875rem', { lineHeight: '1.5' }],
            'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.02em' }],
            'lg': ['1.125rem', { lineHeight: '1.75' }],
            'xl': ['1.25rem', { lineHeight: '1.5' }],
            '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
            '3xl': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
            '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        },
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        letterSpacing: {
            tight: '-0.02em',
            normal: '0',
            wide: '0.02em',
        },
        lineHeight: {
            tight: '1.2',
            snug: '1.33',
            normal: '1.5',
            relaxed: '1.6',
            loose: '2',
        }
      }
    }
  }