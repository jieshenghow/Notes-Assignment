import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientIcon from './GradientIcon';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface NoteItemInterface {
  content: string;
  onPress?: () => void;
}

const NoteItem: React.FC<NoteItemInterface> = React.memo(props => {
  const { content, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {content}
        </Text>
        <GradientIcon
          icon={faChevronRight}
          size={18}
          colors={['#F94695', '#F13A76']}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  blurContainer: {
    borderRadius: 16,
  },
  text: {
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  icon: {
    flexShrink: 0,
    paddingRight: 14,
  },
});

export default NoteItem;
