import React, { useCallback } from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePosts, usePrefetchPost } from '../hooks';
import { PostItem } from '../components';
import { LoadingSpinner, ErrorView } from '../../../shared/components';
import { getUserFriendlyErrorMessage } from '../../../shared/utils';
import { Post } from '../../../shared/types';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../theme';

type FeedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Feed'>;
};

const ITEM_HEIGHT = 96;

export const FeedScreen: React.FC<FeedScreenProps> = ({ navigation }) => {
  const { data: posts, isLoading, error, refetch } = usePosts();
  const prefetchPost = usePrefetchPost();

  const handlePress = useCallback(
    (postId: number) => {
      navigation.navigate('Detail', { postId });
    },
    [navigation]
  );

  const handlePressIn = useCallback(
    (postId: number) => {
      prefetchPost(postId);
    },
    [prefetchPost]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <PostItem
        post={item}
        onPress={() => handlePress(item.id)}
        onPressIn={() => handlePressIn(item.id)}
      />
    ),
    [handlePress, handlePressIn]
  );

  const keyExtractor = useCallback((item: Post) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (_: Post[] | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  if (isLoading) {
    return <LoadingSpinner accessibilityLabel="Loading posts" />;
  }

  if (error) {
    return (
      <ErrorView
        message={getUserFriendlyErrorMessage(error)}
        onRetry={refetch}
      />
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      onRefresh={refetch}
      refreshing={isLoading}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={11}
      initialNumToRender={10}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
});
