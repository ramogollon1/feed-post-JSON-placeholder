import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}
          accessibilityLabel="Retry"
          accessibilityHint="Tries to load the data again"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  message: {
    fontSize: typography.fontSize.md,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    paddingVertical: spacing.md + spacing.xs,
    paddingHorizontal: spacing.xxl,
    backgroundColor: colors.primary,
    borderRadius: spacing.md,
  },
  buttonText: {
    color: colors.background.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
});
