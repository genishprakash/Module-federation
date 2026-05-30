# Microfrontend Learning with Module Federation & Rsbuild

This repository is a learning project demonstrating a modern Microfrontend architecture built using [Rsbuild](https://rsbuild.rs/) and [Module Federation](https://module-federation.io/).

It consists of a **Host** shell application and two remote microfrontends: **Products** and **Cart**.

---

## Architecture Overview

```mermaid
graph TD
    Host[Host Shell - Port 3000]
    Products[Products MFE - Port 3001]
    Cart[Cart MFE - Port 3002]
    
    Host -- "Dynamic Import" --> ProductsPage["products/ProductPage"]
    Host -- "Dynamic Import" --> CartPage["cart/CartPage"]
    
    Products -- "Exposes" --> ProductsPage
    Cart -- "Exposes" --> CartPage
```

* **Host Shell (`host`):** Listens on port `3000`. It dynamically loads and renders the products page and cart page using React lazy loading and Module Federation.
* **Products Microfrontend (`products`):** Listens on port `3001`. It exposes its `./ProductPage` component to be consumed by the Host.
* **Cart Microfrontend (`cart`):** Listens on port `3002`. It exposes its `./CartPage` component to be consumed by the Host.

---

## Repository Structure

```
microfrontend-learning/
├── host/          # Host (Shell) Application
├── products/      # Products Remote Microfrontend
└── cart/          # Cart Remote Microfrontend
```

---

## Setup & Running the Application

### 1. Install Dependencies
You need to install dependencies in all three application directories:

```bash
# Install in Host
cd host && npm install

# Install in Products MFE
cd ../products && npm install

# Install in Cart MFE
cd ../cart && npm install
```

### 2. Run in Development Mode
To see the microfrontends working together, you must run all three dev servers concurrently:

* **Start the Products MFE (Port 3001):**
  ```bash
  cd products && npm run dev
  ```

* **Start the Cart MFE (Port 3002):**
  ```bash
  cd cart && npm run dev
  ```

* **Start the Host Shell (Port 3000):**
  ```bash
  cd host && npm run dev
  ```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the Host application consuming the remote Products and Cart pages.

---

## Technical Highlights

### ⚡ Module Federation & Asynchronous Bootstrap
The workspace uses the **Asynchronous Bootstrap Pattern** to dynamically resolve shared dependencies (like `react` and `react-dom` singletons) at runtime. This avoids `RUNTIME-006` errors and facilitates correct version negotiation.

The host's `rsbuild.config.ts` connects to both microfrontends using the following federation settings:
```typescript
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
}
```

### 📘 TypeScript Integration
Since remote components are loaded dynamically over the network, TypeScript is configured in the host with wildcard module declarations in `src/env.d.ts` to provide seamless, type-safe development support:
```typescript
declare module 'products/*' {
  import type React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module 'cart/*' {
  import type React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}
```
