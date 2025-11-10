export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 22,
  },

  fontWeight: {
    regular: '400' as const,
    medium: '600' as const,
    bold: '700' as const,
  },

  lineHeight: {
    tight: 20,
    normal: 24,
  },
} as const;

export type Typography = typeof typography;
