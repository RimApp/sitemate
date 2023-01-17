import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Home} from './src/screens/Home';

const App = () => {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default App;
