import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import TabNavigator from './TabNavigator';
import SettingScreen from '../screens/home/SettingScreen';
import CategoryDetailScreen from '../screens/home/CategoryDetailScreen';
import AddNoteModal from '../components/common/AddNoteModal';
import type { RootStackParamList } from './types';
import { StyleSheet } from 'react-native';
import { Note } from '@/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingsHeaderBackground = () => (
  <LinearGradient
    colors={['#280947', '#280841']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    angle={91.15}
    style={styles.headerBackground}
  />
);

const RootNavigator: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingNote(null);
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleAlign: 'left',
        }}
      >
        <Stack.Screen name="TabNavigator">
          {() => <TabNavigator onEditNote={handleEditNote} />}
        </Stack.Screen>
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerShown: true,
            title: 'Settings',
            headerTitleAlign: 'left',
            headerStyle: styles.headerStyle,
            headerTintColor: '#FFFFFF',
            headerTitleStyle: styles.headerTitleStyle,
            headerBackground: SettingsHeaderBackground,
          }}
        />
        <Stack.Screen
          name="CategoryDetail"
          options={({ route }) => ({
            headerShown: true,
            title: route.params.categoryTitle,
            headerTitleAlign: 'left',
            headerStyle: styles.headerStyle,
            headerTintColor: '#FFFFFF',
            headerTitleStyle: styles.headerTitleStyle,
            headerBackground: SettingsHeaderBackground,
          })}
        >
          {({ route }) => <CategoryDetailScreen route={route} onEditNote={handleEditNote} />}
        </Stack.Screen>
      </Stack.Navigator>

      <AddNoteModal
        visible={showAddModal}
        onClose={handleCloseModal}
        editingNote={editingNote}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
});

export default RootNavigator;
