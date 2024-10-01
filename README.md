# expo-mlkit-translation

Wrapper for Google MLKit Translation

## Installation

```bash
npx expo add expo-mlkit-translation
npx expo prebuild --clean
# Create a dev client
npx expo run:ios
npx expo run:android
```

## Usage

### Identify Language

```tsx
// returns a BCP-47 Code
const identifiedLanguage =
  await ExpoMlkitTranslationModule.identifyLanguage(text);
```

### Check if model is downloaded

```ts
// returns a BCP-47 Code
const hasModel = await ExpoMlkitTranslationModule.hasDownloadedModel(source);
```

### Translate

```tsx
const text = "اهلا";
const source = "ar";
const target = "en";
const translation = await ExpoMlkitTranslationModule.translate(
  text,
  source,
  target
);
```

### Full example

```tsx
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
    <View>
      <View>
        <TextInput value={value} onChangeText={setValue} />
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
    </View>
  );
}
```
