import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientIcon from './GradientIcon';
import { CategoryType, useNoteStore, Note } from '@/store';
import { faXmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

interface AddNoteModalProps {
  visible: boolean;
  onClose: () => void;
  editingNote?: Note | null;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ visible, onClose, editingNote }) => {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('work-study');

  const addNote = useNoteStore(state => state.addNote);
  const updateNote = useNoteStore(state => state.updateNote);
  const deleteNote = useNoteStore(state => state.deleteNote);

  // Initialize form with editing note data
  React.useEffect(() => {
    if (editingNote) {
      setContent(editingNote.content);
      setSelectedCategory(editingNote.category);
    } else {
      setContent('');
      setSelectedCategory('work-study');
    }
  }, [editingNote, visible]);

  const categories: { type: CategoryType; title: string; color: string }[] = [
    { type: 'work-study', title: 'Work and Study', color: '#4CAF50' },
    { type: 'life', title: 'Life', color: '#2196F3' },
    { type: 'health-wellbeing', title: 'Health and Well-being', color: '#FF9800' },
  ];

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please fill in the content');
      return;
    }

    if (content.length > 200) {
      Alert.alert('Error', 'Content must be 200 characters or less');
      return;
    }

    if (editingNote) {
      // Update existing note
      await updateNote(editingNote.id, {
        content: content.trim(),
        category: selectedCategory,
      });
    } else {
      // Add new note
      await addNote({
        content: content.trim(),
        category: selectedCategory,
      });
    }

    // Clear form and close modal
    setContent('');
    onClose();
  };

  const handleClose = () => {
    setContent('');
    onClose();
  };

  const handleDelete = () => {
    if (!editingNote) return;
    
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteNote(editingNote.id);
            setContent('');
            onClose();
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <LinearGradient
        colors={['#280947', '#280841']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <GradientIcon
                icon={faXmark}
                size={20}
                colors={['#FFFFFF', '#CCCCCC']}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{editingNote ? 'Edit Note' : 'Add Note'}</Text>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <GradientIcon
                icon={faCheck}
                size={20}
                colors={['#FFFFFF', '#FFFFFF']}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.contentContainer,
              editingNote && styles.contentContainerWithDelete
            ]}
            showsVerticalScrollIndicator={false}
          >

            {/* Category Picker */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryContainer}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.type}
                    style={[
                      styles.categoryOption,
                      selectedCategory === category.type &&
                        styles.selectedCategory,
                      { borderColor: category.color },
                    ]}
                    onPress={() => setSelectedCategory(category.type)}
                  >
                    <View
                      style={[
                        styles.categoryIndicator,
                        { backgroundColor: category.color },
                      ]}
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category.type &&
                          styles.selectedCategoryText,
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
              <View style={styles.contentInputContainer}>
                <TextInput
                  style={styles.contentInput}
                  value={content}
                  onChangeText={setContent}
                  placeholder="Enter note content..."
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  multiline
                  textAlignVertical="top"
                  maxLength={200}
                />
                <View style={styles.characterCountContainer}>
                  <Text style={[
                    styles.characterCount,
                    content.length >= 200 && styles.characterCountLimit
                  ]}>
                    {content.length}/200
                  </Text>
                </View>
              </View>
            </View>

          </ScrollView>
          
          {/* Delete Button - Only show when editing */}
          {editingNote && (
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <GradientIcon
                  icon={faTrash}
                  size={18}
                  colors={['#FFFFFF', '#FFFFFF']}
                />
                <Text style={styles.deleteButtonText}>Delete Note</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  contentContainerWithDelete: {
    paddingBottom: 120,
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
    gap: 8,
  },
  categoryOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 48,
  },
  selectedCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    flexShrink: 0,
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentInputContainer: {
    position: 'relative',
  },
  contentInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    paddingBottom: 35,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 180,
    maxHeight: 250,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  characterCountContainer: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  characterCount: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    fontWeight: '500',
  },
  characterCountLimit: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  deleteButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 34,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4444',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddNoteModal;
