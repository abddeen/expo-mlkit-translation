import ExpoModulesCore
import MLKitTranslate
import MLKitLanguageID

public class ExpoMlkitTranslationModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ExpoMlkitTranslation')` in JavaScript.
        Name("ExpoMlkitTranslation")
        
        // Defines event names that the module can send to JavaScript.
        Events("onChange")
        
        AsyncFunction("identifyLanguage") {  (text: String, promise: Promise) in
            let languageId = LanguageIdentification.languageIdentification()
            languageId.identifyLanguage(for: text) { (languageCode, error) in
                if let error = error {
                    promise.reject(error)
                    print("Failed with error: \(error)")
                    return
                }
                promise.resolve(languageCode)
            }
        }
        
        AsyncFunction("translate") {  (text: String, source: String, target: String, promise:Promise ) in
            print("source: \(source), target: \(target)")
            
            guard
                let sourceLanguage = TranslateLanguage.fromTag(source),
                let targetLanguage = TranslateLanguage.fromTag(target)
            else {
                promise.reject(NSError(domain: "", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid language provided, source: \(source), target: \(target)"]))
                return
            }
            
            print("sourceLanguage: \(sourceLanguage), \(targetLanguage)")
            
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
        
        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("setValueAsync") { (value: String) in
            // Send an event to JavaScript.
            self.sendEvent("onChange", [
                "value": value
            ])
        }
    }
}

extension TranslateLanguage {
    static func fromTag(_ code: String) -> TranslateLanguage? {
        let allLanguages = TranslateLanguage.allLanguages()
        
        // Print out all the raw values of the languages
        let rawValues = allLanguages.map { $0.rawValue }
        print("Available Languages Raw Values: \(rawValues)")
        
        // Print out the provided code
        print("Provided Code: \(code)")
        
        // Find the matching language by comparing the raw value
        let result = allLanguages.first { $0.rawValue == code }
        
        // Print out the provided code
        print("Found Code: \(code)")
        
        return result
        
    }
}
