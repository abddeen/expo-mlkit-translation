import * as React from 'react';

import { ExpoMlkitTranslationViewProps } from './ExpoMlkitTranslation.types';

export default function ExpoMlkitTranslationView(props: ExpoMlkitTranslationViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
