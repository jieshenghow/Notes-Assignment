import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SummaryItem from '@/components/common/SummaryItem';
import { CategoryType, useNoteStore } from '@/store';

const SummaryContent: React.FC = () => {
  const navigation = useNavigation<any>();
  const allNotes = useNoteStore(state => state.notes);

  const categories: { type: CategoryType; title: string }[] = [
    { type: 'work-study', title: 'Work and Study' },
    { type: 'life', title: 'Life' },
    { type: 'health-wellbeing', title: 'Health and Well-being' },
  ];

  return (
    <View style={styles.container}>
      {categories.map(category => {
        const categoryNotes = allNotes.filter(note => note.category === category.type);
        const totalRecords = categoryNotes.length;

        return (
          <SummaryItem
            key={category.type}
            title={category.title}
            content={`The topic has a total of ${totalRecords} records`}
            onPress={() => {
              navigation.navigate('CategoryDetail', {
                category: category.type,
                categoryTitle: category.title,
              });
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
});

export default SummaryContent;
