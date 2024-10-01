import { ExpoMlkitTranslationModule } from "expo-mlkit-translation";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, Alert } from "react-native";

export default function App() {
  const [value, setValue] = useState("");

  const detectLanguage = async (text: string) => {
    return await ExpoMlkitTranslationModule.identifyLanguage(text);
  };
  const translate = async (text: string, source: string, target: string) => {
    console.log({ text, source, target });
    try {
      const translation = await ExpoMlkitTranslationModule.translate(
        text,
        source,
        target
      );
      console.log({ translation });
      Alert.alert("Translated", translation);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={setValue} style={styles.input} />
      <Button
        title="Detect Language"
        onPress={async () => {
          const identifiedLanguage = await detectLanguage(value);
          Alert.alert(
            "Identified Language",
            identifiedLanguage || "Undetermined"
          );
        }}
      />
      <Button
        title="Translate"
        onPress={async () => {
          const source = await detectLanguage(value);
          translate(value, source || "en", "en");
        }}
      />
      <DownloadedModels />
    </View>
  );
}

function DownloadedModels() {
  return (
    <View>
      <Text>Downloaded Models:</Text>
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
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
