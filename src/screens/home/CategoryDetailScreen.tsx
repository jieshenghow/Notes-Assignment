import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import NoteItem from '@/components/common/NoteItem';
import { CategoryType, useNoteStore, Note } from '@/store';

interface CategoryDetailScreenProps {
  route: RouteProp<{ CategoryDetail: { category: CategoryType; categoryTitle: string } }, 'CategoryDetail'>;
  onEditNote: (note: Note) => void;
}

const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ route, onEditNote }) => {
  const { category } = route.params;
  const allNotes = useNoteStore(state => state.notes);
  
  const categoryNotes = allNotes
    .filter(note => note.category === category)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.notesSection}>
        {categoryNotes.length > 0 ? (
          categoryNotes.map(note => (
            <View key={note.id} style={styles.itemMargin}>
              <NoteItem 
                content={note.content} 
                onPress={() => onEditNote(note)}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No notes in this category yet</Text>
            <Text style={styles.emptySubtext}>Tap the + button to add your first note</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notesSection: {
    flex: 1,
  },
  itemMargin: {
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
});

export default CategoryDetailScreen;