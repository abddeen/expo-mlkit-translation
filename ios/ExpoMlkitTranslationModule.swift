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
      
    AsyncFunction("translate") {  (text: String) in
    // TODO translate
      return "Hello world! 👋"
    }

    AsyncFunction("prepare") { (options: PrepareOptions) in
      // TODO prepare
      return "Prepared"
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

struct PrepareOptions: Record {
  @Field
  var source: String
  @Field
  var target: String
  @Field
  var downloadIfNeeded: Bool
}
