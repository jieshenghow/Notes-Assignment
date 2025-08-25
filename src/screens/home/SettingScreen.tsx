import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationButton from '@/components/common/NavigationButton';
import GradientButton from '@/components/common/GradientButton';
import CustomAlert from '@/components/common/CustomAlert';
import { useNoteStore } from '@/store';
import {
  faFileContract,
  faHeadset,
  faInfoCircle,
  faShieldAlt,
  faSignInAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SettingItem {
  title: string;
  icon: IconDefinition;
  onPress: () => void;
}

const SettingScreen: React.FC = () => {
  const clearAllNotes = useNoteStore(state => state.clearAllNotes);
  const insets = useSafeAreaInsets();
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleDeleteAllNotes = () => {
    Alert.alert(
      'Delete All Notes',
      'Are you sure you want to delete all your notes? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            clearAllNotes();
            setShowCustomAlert(true);
          },
        },
      ],
    );
  };

  const settingItems: SettingItem[] = [
    {
      title: 'Login',
      icon: faSignInAlt,
      onPress: () => {
        navigation.navigate('Login');
      },
    },
    {
      title: 'Online Customer',
      icon: faHeadset,
      onPress: () => {
        // TODO: Navigate to customer support
        Alert.alert('Info', 'Customer support feature coming soon!');
      },
    },
    {
      title: 'User Agreement',
      icon: faFileContract,
      onPress: () => {
        // TODO: Navigate to user agreement
        Alert.alert('Info', 'User agreement feature coming soon!');
      },
    },
    {
      title: 'Privacy Policy',
      icon: faShieldAlt,
      onPress: () => {
        // TODO: Navigate to privacy policy
        Alert.alert('Info', 'Privacy policy feature coming soon!');
      },
    },
    {
      title: 'About Us',
      icon: faInfoCircle,
      onPress: () => {
        // TODO: Navigate to about us
        Alert.alert('Info', 'About us feature coming soon!');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.menuSection}>
          {settingItems.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <NavigationButton
                title={item.title}
                leadingIcon={item.icon}
                onPress={item.onPress}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Center Delete Button */}
      <View style={[styles.bottomButtonArea, { paddingBottom: insets.bottom }]}>
        <GradientButton
          title="Delete All Notes"
          onPress={handleDeleteAllNotes}
          style={styles.bottomCenterButton}
          textStyle={styles.deleteButtonText}
          colors={['#F94695', '#F13A76']}
        />
      </View>

      <CustomAlert
        visible={showCustomAlert}
        message="All notes have been cleared"
        onClose={() => setShowCustomAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Space for bottom button
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 32,
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    marginBottom: 12,
  },
  bottomButtonArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  bottomCenterButton: {
    width: 250,
    height: 50,
    borderRadius: 25,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SettingScreen;
