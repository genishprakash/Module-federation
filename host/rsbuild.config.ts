import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  moduleFederation: {
    options: {
      name: 'host',
      remotes: {
        products: 'products@http://localhost:3001/remoteEntry.js',
        cart: 'cart@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.6',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.6',
        },
      },
    },
  },
});
