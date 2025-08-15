import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientIconProps {
  icon: IconDefinition;
  size: number;
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: any;
}

const GradientIcon: React.FC<GradientIconProps> = ({
  icon,
  size,
  colors,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  style,
}) => {
  const dynamicStyles = StyleSheet.create({
    container: {
      width: size,
      height: size,
    },
    innerContainer: {
      width: size,
      height: size,
      overflow: 'hidden',
    },
    maskedView: {
      width: size,
      height: size,
      transform: [{ translateX: 0 }, { translateY: 0 }],
    },
    maskElement: {
      backgroundColor: 'transparent',
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradient: {
      width: size,
      height: size,
    },
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      <View style={dynamicStyles.innerContainer}>
        <MaskedView
          style={dynamicStyles.maskedView}
          maskElement={
            <View style={dynamicStyles.maskElement}>
              <FontAwesomeIcon icon={icon} size={size} color="black" />
            </View>
          }
        >
          <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={dynamicStyles.gradient}
          />
        </MaskedView>
      </View>
    </View>
  );
};

export default GradientIcon;
