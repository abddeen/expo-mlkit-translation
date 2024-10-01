import ExpoModulesCore
import MLKitTranslate
import MLKitLanguageID

public class ExpoMlkitTranslationModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoMlkitTranslation")
        
        AsyncFunction("identifyLanguage") {  (text: String, promise: Promise) in
            let languageId = LanguageIdentification.languageIdentification()
            languageId.identifyLanguage(for: text) { (languageCode, error) in
                if let error = error {
                    promise.reject(error)
                    print("Failed with error: \(error)")
                    return
                }
                // If und, return nil
                if languageCode == "und" {
                    promise.resolve(nil)
                    return
                }
                promise.resolve(languageCode)
            }
        }
        
        AsyncFunction("translate") {  (text: String, source: String, target: String, promise:Promise ) in
            guard
                let sourceLanguage = TranslateLanguage.fromTag(source),
                let targetLanguage = TranslateLanguage.fromTag(target)
            else {
                promise.reject(NSError(domain: "", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid language provided, source: \(source), target: \(target)"]))
                return
            }

            let translatorOptions = TranslatorOptions(sourceLanguage: sourceLanguage, targetLanguage: targetLanguage)
            let translator = Translator.translator(options: translatorOptions)
            
            // Check and download models
            let conditions = ModelDownloadConditions(
                allowsCellularAccess: true,
                allowsBackgroundDownloading: true
            )
            translator.downloadModelIfNeeded(with: conditions) { error in
                guard error == nil else { return }
                
                translator.translate(text) { translatedText, error in
                    guard error == nil, let translatedText = translatedText else { return }
                    
                    // Translation succeeded.
                    promise.resolve(translatedText)
                }
            }
        }
        
        AsyncFunction("getDownloadedModels") {
            return ModelManager.modelManager().downloadedTranslateModels.map{ $0.language.rawValue }
        }
        
        
        AsyncFunction("hasDownloadedModel") { (language: String) in
            let modelsTags = ModelManager.modelManager().downloadedTranslateModels.map{ $0.language.rawValue }
            
            guard let languageTag = TranslateLanguage.fromTag(language) else {
                return false
            }
            
            return modelsTags.contains(language)
        }
    }
}

extension TranslateLanguage {
    static func fromTag(_ code: String) -> TranslateLanguage? {
        return TranslateLanguage.allLanguages().first { $0.rawValue == code }
    }
}
