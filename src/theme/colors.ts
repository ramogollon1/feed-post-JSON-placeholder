export const colors = {
  primary: '#2196F3',
  error: '#d32f2f',
  success: '#4caf50',

  text: {
    primary: '#000',
    secondary: '#666',
    tertiary: '#333',
  },

  background: {
    primary: '#fff',
    secondary: '#f5f5f5',
    tertiary: '#f9f9f9',
  },

  border: {
    light: '#e0e0e0',
  },
} as const;

export type Colors = typeof colors;
