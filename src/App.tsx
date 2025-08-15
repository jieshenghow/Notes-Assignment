/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import RootNavigator from './navigation/RootNavigator';
import { useNoteStore } from './store';

function App() {
  const loadNotes = useNoteStore(state => state.loadNotes);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          useAngle={true}
          colors={['#1B284F', '#351159', '#421C45', '#3B184E']}
          locations={[0.1445, 0.4917, 0.7482, 1]}
          angle={155.28}
          style={styles.gradient}
        />
        <LinearGradient
          colors={['#240D38', 'rgba(51, 15, 82, 0)']}
          locations={[0, 0.1375]}
          angle={179.98}
          style={styles.secondGradient}
        />
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              background: 'transparent',
              card: 'transparent',
              text: '#fff',
              border: 'transparent',
              notification: '#fff',
              primary: '#F94695',
            },
            fonts: {
              regular: { fontFamily: 'System', fontWeight: '400' },
              medium: { fontFamily: 'System', fontWeight: '500' },
              bold: { fontFamily: 'System', fontWeight: '700' },
              heavy: { fontFamily: 'System', fontWeight: '900' },
            },
          }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  secondGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;
