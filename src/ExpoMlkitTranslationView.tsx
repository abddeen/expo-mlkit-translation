import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoMlkitTranslationViewProps } from './ExpoMlkitTranslation.types';

const NativeView: React.ComponentType<ExpoMlkitTranslationViewProps> =
  requireNativeViewManager('ExpoMlkitTranslation');

export default function ExpoMlkitTranslationView(props: ExpoMlkitTranslationViewProps) {
  return <NativeView {...props} />;
}
