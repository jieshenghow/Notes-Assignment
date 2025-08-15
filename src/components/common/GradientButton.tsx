// GradientButton.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
  title: string;
  onPress?: () => void;
  colors?: string[];
  borderRadius?: number;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  colors = ['#F94695', '#F13A76'],
  borderRadius = 24,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.gradient, { borderRadius }, style]}
    >
      <TouchableOpacity
        style={[styles.touchable, { borderRadius }]}
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GradientButton;
