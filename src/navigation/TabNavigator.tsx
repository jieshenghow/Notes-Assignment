import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // @ts-ignore
import HomeSelectedIcon from '../assets/icons/home-selected.svg'; // @ts-ignore
import AddIcon from '../assets/icons/add.svg'; // @ts-ignore
import SummaryDefault from '../assets/icons/summary-default.svg';
import HomeDefaultIcon from '../assets/icons/home-default.svg';
import SummarySelected from '../assets/icons/summary-selected.svg'; // @ts-ignore
import SettingIcon from '../assets/icons/setting.svg';
import HomeScreen from '../screens/home/HomeScreen';
import AddScreen from '../screens/home/AddScreen';
import SummaryScreen from '../screens/home/SummaryScreen';
import AddNoteModal from '../components/common/AddNoteModal';
import type { TabParamList } from './types';
import { Note } from '@/store';

const Tab = createBottomTabNavigator<TabParamList>();

const TabBarComponent = (props: any) => (
  <LinearGradient
    colors={['rgba(28, 11, 55, 0.85)', 'rgba(29, 8, 55, 0.85)']}
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 0 }}
    style={styles.gradient}
  >
    <BottomTabBar {...props} style={styles.bottomTabBar} />
  </LinearGradient>
);

const HeaderBackground = () => (
  <LinearGradient
    colors={['#280947', '#280841']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    angle={91.15}
    style={styles.headerBackground}
  />
);

const HeaderRight = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <SettingIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const EmptyLabel = () => null;

const SummaryHeaderRight = () => (
  <Image
    source={require('@/assets/images/robot.png')}
    style={[styles.headerRightRobot, styles.headerRight]}
  />
);

const getTabBarIcon = ({
  focused,
  route,
}: {
  focused: boolean;
  route: { name: keyof TabParamList };
}) => {
  switch (route.name) {
    case 'Home':
      return focused ? (
        <HomeSelectedIcon width={45} height={45} />
      ) : (
        <HomeDefaultIcon width={45} height={45} />
      );
    case 'Add':
      return <AddIcon width={30} height={30} />;
    case 'Summary':
      return focused ? (
        <SummarySelected width={45} height={45} />
      ) : (
        <SummaryDefault width={45} height={45} />
      );
    default:
      return <HomeDefaultIcon width={45} height={45} />;
  }
};

// Base header options to reduce duplication
const baseHeaderOptions = {
  headerTitleAlign: 'left' as const,
  headerBackground: HeaderBackground,
  headerStyle: {
    backgroundColor: 'transparent',
    height: 125,
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {
    fontWeight: '600' as const,
    fontSize: 24,
  },
};

interface TabNavigatorProps {
  onEditNote: (note: Note) => void;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ onEditNote }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <Tab.Navigator
        tabBar={TabBarComponent}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => getTabBarIcon({ focused, route }),
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#F94695',
          tabBarInactiveTintColor: '#A6A6A6',
          tabBarStyle: styles.tabBarStyle,
          ...baseHeaderOptions,
        })}
      >
        <Tab.Screen
          name="Home"
          options={{
            ...baseHeaderOptions,
            title: 'Home',
            tabBarLabel: 'Home',
            headerRight: HeaderRight,
          }}
        >
          {() => <HomeScreen onEditNote={onEditNote} />}
        </Tab.Screen>
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            ...baseHeaderOptions,
            title: 'Add',
            tabBarLabel: EmptyLabel,
            tabBarItemStyle: styles.addTabBarItem,
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              setShowAddModal(true);
            },
          }}
        />
        <Tab.Screen
          name="Summary"
          children={() => <SummaryScreen />}
          options={{
            ...baseHeaderOptions,
            headerBackground: () => null,
            title: 'Summary',
            tabBarLabel: 'Summary',
            headerRight: SummaryHeaderRight,
          }}
        />
      </Tab.Navigator>

      <AddNoteModal visible={showAddModal} onClose={handleCloseModal} />
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 20,
  },
  bottomTabBar: {
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  blurView: {
    position: 'absolute',
  },
  headerRight: {
    marginRight: 20,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: 100,
    paddingHorizontal: 60,
    paddingTop: 15,
    paddingBottom: 15,
  },
  headerBackground: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'rgba(31,7,49,0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  headerStyle: {
    backgroundColor: 'transparent',
    height: 125,
  },
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 24,
  },
  addTabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
  },
  headerRightRobot: {
    width: 97,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default TabNavigator;
