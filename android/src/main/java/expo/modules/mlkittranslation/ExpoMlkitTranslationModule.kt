package expo.modules.mlkittranslation

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import com.google.mlkit.nl.languageid.LanguageIdentification
import com.google.mlkit.common.model.RemoteModelManager
import com.google.mlkit.nl.translate.TranslateRemoteModel
import expo.modules.kotlin.exception.toCodedException
import android.util.Log
import com.google.mlkit.nl.translate.TranslateLanguage
import com.google.mlkit.nl.translate.Translation
import com.google.mlkit.nl.translate.TranslatorOptions
class ExpoMlkitTranslationModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoMlkitTranslation")

    AsyncFunction("identifyLanguage") { text: String, promise: Promise ->
      val languageIdentifier = LanguageIdentification.getClient()
      languageIdentifier.identifyLanguage(text).addOnSuccessListener { languageCode ->
        if (languageCode == "und") {
          promise.resolve(null)
          return@addOnSuccessListener
        }
        promise.resolve(languageCode)
      }.addOnFailureListener {
        promise.reject(it.toCodedException())
      }
    }

    AsyncFunction("translate") { text: String, source: String, target: String, promise: Promise ->
      val sourceLangCode = TranslateLanguage.fromLanguageTag(source)!!
      val targetLangCode = TranslateLanguage.fromLanguageTag(target)!!
        val options = TranslatorOptions.Builder()
            .setSourceLanguage(sourceLangCode)
            .setTargetLanguage(targetLangCode)
            .build()
        val translator = Translation.getClient(options)
        translator.downloadModelIfNeeded()
          .addOnSuccessListener {
              translator.translate(text)
                .addOnSuccessListener { translatedText ->
                    promise.resolve(translatedText)
                }
                .addOnFailureListener { exception ->
                    promise.reject(exception.toCodedException())
                }
          }
          .addOnFailureListener { exception ->
              promise.reject(exception.toCodedException())
          }
    }

    AsyncFunction("getDownloadedModels") { promise: Promise ->
      val modelManager = RemoteModelManager.getInstance()

      // Get translation models stored on the device.
      modelManager.getDownloadedModels(TranslateRemoteModel::class.java)
          .addOnSuccessListener { models ->
              promise.resolve(models.map { it.language })
          }
          .addOnFailureListener {
              promise.reject(it.toCodedException())
          }
    }

    AsyncFunction("hasDownloadedModel") { language: String, promise: Promise ->
      val modelManager = RemoteModelManager.getInstance()
      // Get translation models stored on the device.
      modelManager.getDownloadedModels(TranslateRemoteModel::class.java)
          .addOnSuccessListener { models ->
              val hasModel = models.any { it.language == language }
              promise.resolve(hasModel)
          }
          .addOnFailureListener {
              promise.reject(it.toCodedException())
          }
    }
  }
}