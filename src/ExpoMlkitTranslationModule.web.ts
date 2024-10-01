import {
  ExpoMlkitTranslationModuleType,
  LanguageTagType,
} from "./ExpoMlkitTranslation.types";

const ExpoMlkitTranslationWebModule: ExpoMlkitTranslationModuleType = {
  async identifyLanguage(text: string) {
    return null;
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
