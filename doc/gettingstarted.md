# Getting started

## Step 1: Create a Project

```shell
$ yarn create quasar
```

```
 What would you like to build? » App with Quasar CLI, let's go!
√ Project folder: ... example-app
√ Pick script type: » Typescript
√ Pick Quasar App CLI variant: » Quasar App CLI with Vite
√ Package name: ... example-app
√ Project product name: (must start with letter if building mobile apps) ... RePoSyD App (Example)
√ Project description: ... An example of an application connecting to a RePoSyD server.
√ Pick a Vue component style: » Composition API with <script setup>
√ Pick your CSS preprocessor: » Sass with SCSS syntax
√ Check the features needed for your project: » Linting (vite-plugin-checker + ESLint + vue-tsc), State Management (Pinia), axios, vue-i18n
√ Add Prettier for code formatting? ... yes

```

## `quasar.config.js`

### Bootstrap Icon Set

Edit the `quasar.config` file:

```typescript
'extras': [
    'bootstrap-icons'
]
```

### Dev Server Settings

## `boot/axios.ts`

Edit the `axios` file:

```typescript
// const api = axios.create({ baseURL: 'https://api.example.com' });
const api = axios.create();
```
