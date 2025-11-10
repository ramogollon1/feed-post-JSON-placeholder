import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PostItem } from '../../../src/features/posts/components/PostItem';
import { Post } from '../../../src/shared/types';

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Test Post Title',
  body: 'Test post body content',
};

describe('PostItem', () => {
  it('renders post title and body correctly', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();

    const { getByText } = render(
      <PostItem post={mockPost} onPress={onPress} onPressIn={onPressIn} />
    );

    expect(getByText('Test Post Title')).toBeTruthy();
    expect(getByText('Test post body content')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();

    const { getByA11yRole } = render(
      <PostItem post={mockPost} onPress={onPress} onPressIn={onPressIn} />
    );

    const button = getByA11yRole('button');
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('calls onPressIn when press starts', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();

    const { getByA11yRole } = render(
      <PostItem post={mockPost} onPress={onPress} onPressIn={onPressIn} />
    );

    const button = getByA11yRole('button');
    fireEvent(button, 'pressIn');

    expect(onPressIn).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility properties', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();

    const { getByA11yRole } = render(
      <PostItem post={mockPost} onPress={onPress} onPressIn={onPressIn} />
    );

    const button = getByA11yRole('button');
    expect(button).toBeTruthy();
  });
});
