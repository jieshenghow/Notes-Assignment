import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientIcon from './GradientIcon';

interface CustomHeaderProps {
  title: string;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColors?: string[];
  style?: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  rightIconName,
  rightIconSize = 24,
  rightIconColors = ['#F94695', '#F13A76'],
  style,
}) => {
  return (
    <LinearGradient
      colors={['#280947', '#280841']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      angle={91.15}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {rightIconName && (
          <GradientIcon
            name={rightIconName}
            size={rightIconSize}
            colors={rightIconColors}
            style={styles.rightIcon}
          />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  rightIcon: {
    marginLeft: 12,
  },
});

export default CustomHeader;