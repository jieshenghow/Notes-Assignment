import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CircleVector from '@/components/common/CircleVector.tsx';
import SummaryContent from '@/components/common/SummaryContent.tsx';

const SummaryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CircleVector />
      <View style={styles.summaryContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <SummaryContent />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 30,
    flex: 1,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  summaryContainer: {
    flex: 1,
    marginTop: 43,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  robotImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default SummaryScreen;
