import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Header height from TabNavigator
const HEADER_HEIGHT = 125;

interface CircleVectorProps {
  size?: number;
  style?: any;
}

const CircleVector: React.FC<CircleVectorProps> = ({ size = 269, style }) => {
  const dynamicStyles = StyleSheet.create({
    outerCircle: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    innerCircle: {
      width: size - 2,
      height: size - 2,
      borderRadius: (size - 2) / 2,
      margin: 1,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {/* Border gradient circle */}
      <LinearGradient
        colors={['#2E1756', 'rgba(127, 59, 138, 0.16)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        angle={166.49}
        style={[styles.borderGradient, dynamicStyles.outerCircle]}
      >
        {/* Main gradient circle */}
        <LinearGradient
          colors={['#1B284F', '#351159', '#713294']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          angle={176}
          style={[dynamicStyles.innerCircle]}
        >
          {/* Overlay gradient */}
          <LinearGradient
            colors={['#240D38', 'rgba(51, 15, 82, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            angle={180.06}
            style={styles.overlay}
          />
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -HEADER_HEIGHT - 110,
    right: -60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderGradient: {
    shadowColor: 'rgba(113, 50, 148, 0.38)',
    shadowOffset: {
      width: 4,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 15,
  },
  overlay: {
    flex: 1,
    borderRadius: 999,
  },
});

export default CircleVector;
