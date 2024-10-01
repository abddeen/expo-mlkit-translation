import { NativeModule } from "react-native";

export interface ExpoMlkitTranslationModuleType extends NativeModule {
  identifyLanguage: (text: string) => Promise<LanguageTagType | null>;
  translate: (
    text: string,
    source: LanguageTagType,
    target: LanguageTagType
  ) => Promise<string>;
  downloadedTranslateModels: () => string[];
  hasDownloadedTranslateModel: (language: LanguageTagType) => boolean;
  setValueAsync: (value: string) => Promise<void>;
}
export type ChangeEventPayload = {
  value: string;
};

export type LanguageTagType =
  | "af" //	Afrikaans
  | "ar" //	Arabic
  | "be" //	Belarusian
  | "bg" //	Bulgarian
  | "bn" //	Bengali
  | "ca" //	Catalan
  | "cs" //	Czech
  | "cy" //	Welsh
  | "da" //	Danish
  | "de" //	German
  | "el" //	Greek
  | "en" //	English
  | "eo" //	Esperanto
  | "es" //	Spanish
  | "et" //	Estonian
  | "fa" //	Persian
  | "fi" //	Finnish
  | "fr" //	French
  | "ga" //	Irish
  | "gl" //	Galician
  | "gu" //	Gujarati
  | "he" //	Hebrew
  | "hi" //	Hindi
  | "hr" //	Croatian
  | "ht" //	Haitian
  | "hu" //	Hungarian
  | "id" //	Indonesian
  | "is" //	Icelandic
  | "it" //	Italian
  | "ja" //	Japanese
  | "ka" //	Georgian
  | "kn" //	Kannada
  | "ko" //	Korean
  | "lt" //	Lithuanian
  | "lv" //	Latvian
  | "mk" //	Macedonian
  | "mr" //	Marathi
  | "ms" //	Malay
  | "mt" //	Maltese
  | "nl" //	Dutch
  | "no" //	Norwegian
  | "pl" //	Polish
  | "pt" //	Portuguese
  | "ro" //	Romanian
  | "ru" //	Russian
  | "sk" //	Slovak
  | "sl" //	Slovenian
  | "sq" //	Albanian
  | "sv" //	Swedish
  | "sw" //	Swahili
  | "ta" //	Tamil
  | "te" //	Telugu
  | "th" //	Thai
  | "tl" //	Tagalog
  | "tr" //	Turkish
  | "uk" //	Ukrainian
  | "ur" //	Urdu
  | "vi" //	Vietnamese
  | "zh"; //	Chinese
