import topLevelAwait from 'vite-plugin-top-level-await';
import { splitVendorChunkPlugin } from 'vite';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [topLevelAwait(), splitVendorChunkPlugin()]
};
