import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3001
  },
  moduleFederation: {
    options:{
      name: "products",
      filename: 'remoteEntry.js',
      exposes:{
        './ProductPage': './src/ProductPage'
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
    }
  }
});
