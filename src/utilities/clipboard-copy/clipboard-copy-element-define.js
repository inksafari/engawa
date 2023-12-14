import { ClipboardCopyElement } from './clipboard-copy-element.js';

const root = typeof globalThis === 'undefined' ? window : globalThis;
try {
  root.ClipboardCopyElement = ClipboardCopyElement.define();
} catch (error) {
  if (
    !(
      root.DOMException &&
      error instanceof DOMException &&
      error.name === 'NotSupportedError'
    ) &&
    !(error instanceof ReferenceError)
  ) {
    throw error;
  }
}

export * from './clipboard-copy-element.js';
export { ClipboardCopyElement as default } from './clipboard-copy-element.js';
