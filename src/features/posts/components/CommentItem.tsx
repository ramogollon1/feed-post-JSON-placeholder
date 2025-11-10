import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Comment } from '../../../shared/types';
import { colors, spacing, typography } from '../../../theme';

interface CommentItemProps {
  comment: Comment;
}

const CommentItemComponent: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <View
      style={styles.container}
      accessibilityRole="article"
      accessibilityLabel={`Comment by ${comment.name}`}
    >
      <Text style={styles.name}>{comment.name}</Text>
      <Text style={styles.email} accessibilityLabel={`Email: ${comment.email}`}>
        {comment.email}
      </Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
};

export const CommentItem = React.memo(CommentItemComponent);
CommentItem.displayName = 'CommentItem';

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    backgroundColor: colors.background.tertiary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  name: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    lineHeight: typography.lineHeight.tight,
  },
});
