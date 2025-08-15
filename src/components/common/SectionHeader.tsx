import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GradientIcon from '@/components/common/GradientIcon.tsx';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SectionHeaderInterface {
  icon: IconDefinition;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderInterface> = props => {
  const { icon, title } = props;

  return (
    <View style={styles.container}>
      <GradientIcon icon={icon} size={20} colors={['#C724E1', '#4E22CC']} />

      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingLeft: 8,
  },
});

export default SectionHeader;
