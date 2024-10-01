import { NativeModule } from "react-native";

export interface ExpoMlkitTranslationModuleType extends NativeModule {
  identifyLanguage: (text: string) => Promise<string | null>;
  translate: (text: string, source: string, target: string) => Promise<string>;
  setValueAsync: (value: string) => Promise<void>;
}
export type ChangeEventPayload = {
  value: string;
};
