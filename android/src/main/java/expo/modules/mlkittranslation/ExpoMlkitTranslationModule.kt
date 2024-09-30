package expo.modules.mlkittranslation

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class ExpoMlkitTranslationModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoMlkit')` in JavaScript.
    Name("ExpoMlkitTranslation")

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    AsyncFunction("translate") { text: String ->
      // TODO translate
      return@AsyncFunction "Hello world! 👋"
    }

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    AsyncFunction("prepare") { options: PrepareOptions ->
      // TODO prepare
      return@AsyncFunction "Prepared"
    }
  }
}
 class PrepareOptions : Record {
   @Field
   val source: String = "utf8"

   @Field
   val target: String = "utf8"

   @Field
   val downloadIfNeeded: Boolean = false
 }