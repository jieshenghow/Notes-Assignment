// SummaryItem.tsx
// SummaryItem.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GradientButton from './GradientButton';
import CircularAvatar from './CircularAvatar';

interface SummaryItemInterface {
  title: string;
  content: string;
  avatarImage?: any;
  onPress?: () => void;
}

const SummaryItem: React.FC<SummaryItemInterface> = props => {
  const { title, content, avatarImage } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <CircularAvatar
            imageSource={avatarImage}
            text={title}
            size={40}
            style={styles.avatar}
          />
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <GradientButton title="Detail" onPress={props.onPress} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  avatar: {
    marginRight: 4,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    flexShrink: 1,
    marginRight: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  content: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
});

export default SummaryItem;
