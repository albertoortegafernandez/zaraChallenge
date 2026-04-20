export const theme = {
  colors: {
    bg: '#ffffff',
    surface: '#f4f4f4',
    text: '#000000',
    textMuted: '#6e6e6e',
    border: '#e5e5e5',
    borderStrong: '#000000',
    danger: '#c0392b',
    accent: '#000000',
  },
  fonts: {
    base: "Helvetica, Arial, sans-serif",
  },
  radii: {
    sm: '2px',
    md: '4px',
  },
  sizes: {
    navbarHeight: '64px',
    maxWidth: '1280px',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  transitions: {
    base: '180ms ease-in-out',
  },
} as const;

export type Theme = typeof theme;
