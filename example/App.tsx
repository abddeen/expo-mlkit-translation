import { ExpoMlkitTranslationModule } from "expo-mlkit-translation";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, Alert } from "react-native";

const LANGUAGE_MAP = {
  ar: "Arabic",
  en: "English",
};

export default function App() {
  const [value, setValue] = useState("");

  const detectLanguage = async (text: string) => {
    // TODO
    const identifiedLanguage =
      (await ExpoMlkitTranslationModule.identifyLanguage(text)) as
        | keyof typeof LANGUAGE_MAP
        | null;
    Alert.alert("Identified Language", identifiedLanguage || "Undetermined");
    return identifiedLanguage ? LANGUAGE_MAP[identifiedLanguage] || null : null;
  };
  const translate = async (text: string, source: string) => {
    const r = await ExpoMlkitTranslationModule.prepare({
      source,
      target: "English",
      downloadIfNeeded: false,
    });
    console.log({ r });
  };
  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={setValue} style={styles.input} />
      <Button title="Detect Language" onPress={() => detectLanguage(value)} />
      <Button
        title="Translate"
        onPress={async () => {
          const source = await detectLanguage(value);
          translate(value, source || "English");
        }}
      />
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
