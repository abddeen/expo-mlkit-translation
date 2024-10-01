import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoMlkitTranslation.web.ts
// and on native platforms to ExpoMlkitTranslation.ts
import {
  ChangeEventPayload,
  LanguageTagType,
} from "./ExpoMlkitTranslation.types";
import ExpoMlkitTranslationModule from "./ExpoMlkitTranslationModule";

export async function setValueAsync(value: string) {
  return await ExpoMlkitTranslationModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  ExpoMlkitTranslationModule ?? NativeModulesProxy.ExpoMlkitTranslation
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ExpoMlkitTranslationModule, ChangeEventPayload, LanguageTagType };
