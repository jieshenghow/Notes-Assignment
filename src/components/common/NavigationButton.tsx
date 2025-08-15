import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientIcon from './GradientIcon';
import {
  faChevronRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface NavigationButtonProps {
  title: string;
  leadingIcon: IconDefinition;
  onPress: () => void;
  leadingIconColors?: string[];
  trailingIconColors?: string[];
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  title,
  leadingIcon,
  onPress,
  leadingIconColors = ['#C724E1', '#4E22CC'],
  trailingIconColors = ['#F94695', '#F13A76'],
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <GradientIcon
          icon={leadingIcon}
          size={20}
          colors={leadingIconColors}
          style={styles.leadingIcon}
        />
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <GradientIcon
          icon={faChevronRight}
          size={18}
          colors={trailingIconColors}
          style={styles.trailingIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

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
  leadingIcon: {
    flexShrink: 0,
    marginRight: 12,
  },
  text: {
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  trailingIcon: {
    flexShrink: 0,
    paddingRight: 14,
  },
});

export default NavigationButton;
