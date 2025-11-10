import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { log } from '../utils';
import { colors, spacing, typography } from '../../theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    log(error, 'ErrorBoundary');
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message ?? 'An unknown error occurred'}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleReset}
            accessibilityLabel="Try again to recover from error"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.background.primary,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxxl,
    backgroundColor: colors.primary,
    borderRadius: spacing.md,
  },
  buttonText: {
    color: colors.background.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
});
