import {
  ExpoMlkitTranslationModule,
  LanguageTagType,
} from "expo-mlkit-translation";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, Alert } from "react-native";

export default function App() {
  const [value, setValue] = useState("");
  const [downloading, setDownloading] = useState(false);

  const detectLanguage = async (text: string) => {
    return await ExpoMlkitTranslationModule.identifyLanguage(text);
  };
  const translate = async (
    text: string,
    source: LanguageTagType,
    target: LanguageTagType
  ) => {
    try {
      const hasModel =
        await ExpoMlkitTranslationModule.hasDownloadedModel(source);
      if (!hasModel) {
        setDownloading(true);
      }
      const translation = await ExpoMlkitTranslationModule.translate(
        text,
        source,
        target
      );
      setDownloading(false);
      Alert.alert("Translated", translation);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <TextInput value={value} onChangeText={setValue} style={styles.input} />
        <Button
          title="Detect Language"
          onPress={async () => {
            const identifiedLanguage = await detectLanguage(value);
            Alert.alert("Identified Language", identifiedLanguage || "null");
          }}
        />
        <Button
          title="Translate"
          onPress={async () => {
            const source = await detectLanguage(value);
            translate(value, source || "en", "en");
          }}
        />
        {downloading && <Text>Downloading Model...</Text>}
      </View>
      <DownloadedModels />
      <HasDownloadedModels />
    </View>
  );
}

function HasDownloadedModels() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageTagType>();
  return (
    <View style={styles.block}>
      <TextInput
        value={selectedLanguage}
        placeholder="ar, en, etc"
        onChangeText={(v) => setSelectedLanguage(v as LanguageTagType)}
        style={styles.input}
      />
      <Button
        title="Has Downloaded Model"
        disabled={!selectedLanguage}
        onPress={async () => {
          if (!selectedLanguage) return;
          const hasModel =
            await ExpoMlkitTranslationModule.hasDownloadedModel(
              selectedLanguage
            );
          Alert.alert("Has Model", hasModel.toString());
        }}
      />
    </View>
  );
}
function DownloadedModels() {
  const [downloadedModels, setDownloadedModels] = useState<string[]>([]);
  return (
    <View style={styles.block}>
      <Button
        title="Get Downloaded Models"
        onPress={async () => {
          const _downloadedModels =
            await ExpoMlkitTranslationModule.getDownloadedModels();
          setDownloadedModels(_downloadedModels);
        }}
      />
      {downloadedModels.map((model) => (
        <Text key={model}>{model}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  block: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
