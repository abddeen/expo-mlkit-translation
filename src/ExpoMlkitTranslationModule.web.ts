import { EventEmitter } from "expo-modules-core";

import {
  ExpoMlkitTranslationModuleType,
  PrepareOptions,
} from "./ExpoMlkitTranslation.types";

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
    return "Hello Web! 👋";
  },
  async prepare(options: PrepareOptions) {
    return "Prepared";
  },
};

export { ExpoMlkitTranslationWebModule };
