<h1 align="center">rspress-plugin-load-readme</h1>

<p align="center">
    An <a href="https://rspress.dev/">Rspress</a>  plugin designed to seamlessly load your <code>README.md</code> file onto your website.
</p>

<p align="center">
    <a href="https://npmjs.com/package/rspress-plugin-load-readme"><img src="https://img.shields.io/npm/v/rspress-plugin-load-readme.svg?style=flat" alt="NPM version"></a> 
    <a href="https://npmjs.com/package/rspress-plugin-load-readme"><img src="https://img.shields.io/npm/dm/rspress-plugin-load-readme.svg?style=flat" alt="NPM downloads"></a> 
    <a href="https://circleci.com/gh/saojs/rspress-plugin-load-readme"><img src="https://img.shields.io/circleci/project/saojs/rspress-plugin-load-readme/master.svg?style=flat" alt="Build Status"></a> 
</p>

## Install

```bash
npm install rspress-plugin-load-readme -D
```

## Usage

```ts
// rspress.config.ts
import { loadReadme } from 'rspress-plugin-load-readme';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  plugins: [loadReadme({
    repo: 'ulivz/rspress-plugin-load-readme'
  })],
});
```

## Options

### repo

- **Type**: `string`
- **Required**: `true`

Specify the Github repository to load, in the format `<username><repo>`.

### branch

- **Type**: `string`
- **Default**: `master`

Specify the branch.

### route

- **Type**: `string`
- **Default**: `/readme`

Specify the generated route.

## License

MIT &copy; [ULIVZ](https://github.com/ulivz)
