import { EventEmitter } from "expo-modules-core";

import { ExpoMlkitTranslationModuleType } from "./ExpoMlkitTranslation.types";

const emitter = new EventEmitter({} as any);

const ExpoMlkitTranslationWebModule: ExpoMlkitTranslationModuleType = {
  async identifyLanguage(text: string) {
    return "";
  },
  async setValueAsync(value: string): Promise<void> {
    emitter.emit("onChange", { value });
  },
  addListener() {},
  removeListeners() {},
  async translate(text: string) {
    return "TODO";
  },
};

export { ExpoMlkitTranslationWebModule };
