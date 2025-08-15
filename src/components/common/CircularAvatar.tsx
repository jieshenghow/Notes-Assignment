import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface CircularAvatarProps {
  imageSource?: any;
  text?: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  style?: any;
}

const CircularAvatar: React.FC<CircularAvatarProps> = ({
  imageSource,
  text,
  size = 40,
  backgroundColor = '#F94695',
  textColor = '#FFFFFF',
  style,
}) => {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const getInitial = () => {
    if (text && text.length > 0) {
      return text.charAt(0).toUpperCase();
    }
    return '?';
  };

  const fontSize = size * 0.4; // Scale font size based on avatar size

  return (
    <View style={[styles.container, containerStyle, style]}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} />
      ) : (
        <View style={[styles.placeholder, { backgroundColor }]}>
          <Text style={[styles.placeholderText, { color: textColor, fontSize }]}>
            {getInitial()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CircularAvatar;