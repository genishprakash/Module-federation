import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  moduleFederation: {
    options: {
      name: 'host',
      remotes: {
        products: 'Products@http://localhost:3001/remoteEntry.js',
      },
    },
  },
});
