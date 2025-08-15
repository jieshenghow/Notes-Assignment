import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
// @ts-ignore
import HomeSelectedIcon from '../assets/icons/home-selected.svg';
// @ts-ignore
import AddIcon from '../assets/icons/add.svg';
// @ts-ignore
import SummaryDefault from '../assets/icons/summary-default.svg';
import HomeDefaultIcon from '../assets/icons/home-default.svg';
import SummarySelected from '../assets/icons/summary-selected.svg';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#F94695' : '#A6A6A6';

    switch (routeName) {
      case 'Home':
        return isFocused ? (
          <HomeSelectedIcon width={45} height={45} color={color} />
        ) : (
          <HomeDefaultIcon width={45} height={45} color={color} />
        );
      case 'Add':
        return <AddIcon width={30} height={30} color={color} />;
      case 'Summary':
        return isFocused ? (
          <SummarySelected width={45} height={45} color={color} />
        ) : (
          <SummaryDefault width={45} height={45} color={color} />
        );
      default:
        return <HomeDefaultIcon width={45} height={45} color={color} />;
    }
  };

  return (
    <LinearGradient
      colors={['rgba(28, 11, 55, 0.85)', 'rgba(29, 8, 55, 0.85)']}
      start={{ x: -0.0339, y: 0 }}
      end={{ x: 1.0244, y: 1 }}
      angle={104.46}
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 5) }]}
    >
      <BlurView
        style={styles.blurView}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tab}
              >
                <View style={styles.iconContainer}>
                  {getIcon(route.name, isFocused)}
                </View>
                {route.name !== 'Add' && (
                  <Text style={[
                    styles.label,
                    { color: isFocused ? '#F94695' : '#A6A6A6' }
                  ]}>
                    {typeof label === 'string' ? label : route.name}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    marginLeft: -125,
    // width: 250,
    borderRadius: 25,
    overflow: 'hidden',
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 50,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CustomTabBar;
