declare module 'react-gtm-module' {
  export interface TagManagerArgs {
    gtmId: string;
    auth?: string;
    preview?: string;
    dataLayerName?: string;
    events?: Record<string, unknown>;
  }

  const TagManager: {
    initialize(args: TagManagerArgs): void;
    dataLayer(args: Record<string, unknown>): void;
  };

  export default TagManager;
} 