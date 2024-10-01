import { NativeModule } from "react-native";

export interface ExpoMlkitTranslationModuleType extends NativeModule {
  identifyLanguage: (text: string) => Promise<string | null>;
  prepare: (options: PrepareOptions) => Promise<string>;
  translate: (text: string) => Promise<string>;
  setValueAsync: (value: string) => Promise<void>;
}

export interface PrepareOptions {
  source: string;
  target: string;
  downloadIfNeeded: boolean;
}
export type ChangeEventPayload = {
  value: string;
};
