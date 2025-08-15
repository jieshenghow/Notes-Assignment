import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import GradientButton from '@/components/common/GradientButton';
import { useNoteStore, CategoryType } from '@/store';

const AddScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('study');
  
  const addNote = useNoteStore((state) => state.addNote);

  const categories: { type: CategoryType; title: string; color: string }[] = [
    { type: 'study', title: 'Study', color: '#4CAF50' },
    { type: 'work', title: 'Work', color: '#2196F3' },
    { type: 'personal', title: 'Personal', color: '#FF9800' },
  ];

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    addNote({
      title: title.trim(),
      content: content.trim(),
      category: selectedCategory,
    });

    // Clear form
    setTitle('');
    setContent('');
    
    Alert.alert('Success', 'Note added successfully!', [
      { text: 'OK' }
    ]);
  };

  return (
    <View style={styles.container}>
      <BlurView
        style={styles.formContainer}
        blurType="dark"
        blurAmount={42}
        reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.05)"
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.screenTitle}>Add New Note</Text>
          
          {/* Title Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter note title..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline={false}
            />
          </View>

          {/* Category Picker */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.type}
                  style={[
                    styles.categoryOption,
                    selectedCategory === category.type && styles.selectedCategory,
                    { borderColor: category.color },
                  ]}
                  onPress={() => setSelectedCategory(category.type)}
                >
                  <View
                    style={[styles.categoryIndicator, { backgroundColor: category.color }]}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category.type && styles.selectedCategoryText,
                    ]}
                  >
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Content Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Content</Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Enter note content..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <GradientButton
              title="Save Note"
              onPress={handleSave}
              style={styles.saveButton}
              textStyle={styles.saveButtonText}
            />
          </View>
        </ScrollView>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  titleInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  categoryIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  contentInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
    height: 56,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default AddScreen;