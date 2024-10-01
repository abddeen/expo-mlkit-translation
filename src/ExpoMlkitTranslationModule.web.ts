import { EventEmitter } from "expo-modules-core";

import {
  ExpoMlkitTranslationModuleType,
  LanguageTagType,
} from "./ExpoMlkitTranslation.types";

const emitter = new EventEmitter({} as any);

const ExpoMlkitTranslationWebModule: ExpoMlkitTranslationModuleType = {
  async identifyLanguage(text: string) {
    return null;
  },
  async setValueAsync(value: string): Promise<void> {
    emitter.emit("onChange", { value });
  },
  addListener() {},
  removeListeners() {},
  async translate(text: string) {
    return "TODO";
  },
  async getDownloadedModels() {
    return [];
  },
  async hasDownloadedModel(language: LanguageTagType) {
    return false;
  },
};

export { ExpoMlkitTranslationWebModule };
