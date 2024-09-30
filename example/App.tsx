import { ExpoMlkitTranslationModule } from "expo-mlkit-translation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          const r = await ExpoMlkitTranslationModule.prepare({
            source: "Arabic",
            target: "English",
            downloadIfNeeded: false,
          });
          console.log({ r });
        }}
      >
        <Text>Prepare</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          const r = await ExpoMlkitTranslationModule.translate("Hello");
          console.log({ r });
        }}
      >
        <Text>Translate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
