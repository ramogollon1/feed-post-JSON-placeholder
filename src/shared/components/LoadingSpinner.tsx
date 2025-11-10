import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface LoadingSpinnerProps {
  accessibilityLabel?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  accessibilityLabel = 'Loading',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        accessibilityLabel={accessibilityLabel}
        accessibilityLiveRegion="polite"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
