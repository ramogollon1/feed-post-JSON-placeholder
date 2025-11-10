import React, { useCallback } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { usePost, useComments } from '../hooks';
import { CommentItem } from '../components';
import { LoadingSpinner, ErrorView } from '../../../shared/components';
import { getUserFriendlyErrorMessage } from '../../../shared/utils';
import { Comment } from '../../../shared/types';
import { RootStackParamList } from '../../../navigation/types';
import { colors, spacing, typography } from '../../../theme';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type DetailScreenProps = {
  route: DetailScreenRouteProp;
};

export const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const { data: post, isLoading: postLoading, error: postError } = usePost(postId);
  const { data: comments, isLoading: commentsLoading, error: commentsError, refetch: refetchComments } = useComments(postId);

  const renderComment = useCallback(
    ({ item }: ListRenderItemInfo<Comment>) => <CommentItem comment={item} />,
    []
  );

  const keyExtractor = useCallback((item: Comment) => item.id.toString(), []);

  if (postLoading) {
    return <LoadingSpinner accessibilityLabel="Loading post details" />;
  }

  if (postError) {
    return <ErrorView message={getUserFriendlyErrorMessage(postError)} />;
  }

  if (!post) {
    return <ErrorView message="Post not found" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments</Text>
        {commentsLoading ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={styles.loader}
            accessibilityLabel="Loading comments"
          />
        ) : commentsError ? (
          <View style={styles.commentsErrorContainer}>
            <ErrorView
              message={getUserFriendlyErrorMessage(commentsError)}
              onRetry={refetchComments}
            />
          </View>
        ) : (
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={keyExtractor}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  postContainer: {
    padding: spacing.xl,
    borderBottomWidth: 8,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  body: {
    fontSize: typography.fontSize.md,
    color: colors.text.tertiary,
    lineHeight: typography.lineHeight.normal,
  },
  commentsSection: {
    marginTop: spacing.md,
  },
  commentsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    padding: spacing.xl,
    backgroundColor: colors.background.secondary,
  },
  loader: {
    marginVertical: spacing.xxl,
  },
  commentsErrorContainer: {
    minHeight: 200,
  },
});
