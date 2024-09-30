import { StyleSheet, Text, View } from 'react-native';

import * as ExpoMlkitTranslation from 'expo-mlkit-translation';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoMlkitTranslation.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
