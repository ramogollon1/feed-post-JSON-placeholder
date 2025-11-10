import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Post } from '../../../shared/types';
import { colors, spacing, typography } from '../../../theme';

interface PostItemProps {
  post: Post;
  onPress: () => void;
  onPressIn: () => void;
}

const PostItemComponent: React.FC<PostItemProps> = ({ post, onPress, onPressIn }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onPressIn={onPressIn}
      activeOpacity={0.7}
      accessibilityLabel={`Post: ${post.title}`}
      accessibilityRole="button"
      accessibilityHint="Opens the full post with comments"
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body} numberOfLines={2}>
        {post.body}
      </Text>
    </TouchableOpacity>
  );
};

export const PostItem = React.memo(PostItemComponent);
PostItem.displayName = 'PostItem';

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  body: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.tight,
  },
});
