import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import NoteItem from '@/components/common/NoteItem';
import SectionHeader from '@/components/common/SectionHeader';
import { CategoryType, useNoteStore, Note } from '@/store';
import { faGraduationCap, faHome, faHeartbeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface HomeScreenProps {
  onEditNote: (note: Note) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onEditNote }) => {
  const allNotes = useNoteStore(state => state.notes);

  const categories: { type: CategoryType; title: string; icon: IconDefinition }[] = useMemo(() => [
    { type: 'work-study', title: 'Work and Study', icon: faGraduationCap },
    { type: 'life', title: 'Life', icon: faHome },
    { type: 'health-wellbeing', title: 'Health and Well-being', icon: faHeartbeat },
  ], []);

  const categorizedNotes = useMemo(() => {
    return categories.map(category => ({
      ...category,
      notes: allNotes
        .filter(note => note.category === category.type)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
    }));
  }, [allNotes, categories]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        {categorizedNotes.map(categoryData => (
            <View key={categoryData.type} style={styles.categorySection}>
              <View style={styles.itemMargin}>
                <SectionHeader
                  icon={categoryData.icon}
                  title={categoryData.title}
                />
              </View>
              {categoryData.notes.map(note => (
                <View key={note.id} style={styles.itemMargin}>
                  <NoteItem 
                    content={note.content} 
                    onPress={() => onEditNote(note)}
                  />
                </View>
              ))}
            </View>
          ))}
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
    paddingBottom: 120,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categorySection: {
    marginBottom: 27,
  },
  itemMargin: {
    marginBottom: 12,
  },
});

export default HomeScreen;
