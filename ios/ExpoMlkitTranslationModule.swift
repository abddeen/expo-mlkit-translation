import ExpoModulesCore
import MLKitTranslate

public class ExpoMlkitModule: Module {
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

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    AsyncFunction("translate") {  (text: String) in
    // TODO translate
      return "Hello world! 👋"
    }

    AsyncFunction("prepare") { (options: PrepareOptions) in
      // TODO prepare
        // Create an English-German translator:
        let options = TranslatorOptions(sourceLanguage: .english, targetLanguage: .german)
        let englishGermanTranslator = Translator.translator(options: options)
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
