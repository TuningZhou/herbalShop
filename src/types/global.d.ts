import type { WebApp } from '@telegram-apps/sdk';

declare global {
  interface Window {
    Telegram?: { // Make Telegram optional
      WebApp?: WebApp; // Make WebApp optional
    };
  }
}

declare module '*.svg?react' {
  import * as React from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  export default ReactComponent;
}