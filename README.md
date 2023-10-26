<h1 align="center">rspress-plugin-remote-page</h1>

<p align="center">
    An <a href="https://rspress.dev/">Rspress</a> plugin to seamlessly load remote markdown file (e.g. README.md) onto your website.
</p>

<p align="center">
    <a href="https://npmjs.com/package/rspress-plugin-remote-page"><img src="https://img.shields.io/npm/v/rspress-plugin-remote-page.svg?style=flat" alt="NPM version"></a> 
    <a href="https://npmjs.com/package/rspress-plugin-remote-page"><img src="https://img.shields.io/npm/dm/rspress-plugin-remote-page.svg?style=flat" alt="NPM downloads"></a> 
    <a href="https://circleci.com/gh/saojs/rspress-plugin-remote-page"><img src="https://img.shields.io/circleci/project/saojs/rspress-plugin-remote-page/master.svg?style=flat" alt="Build Status"></a> 
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Usage](#usage)
  - [Quickly load a `README.md` file from GitHub using a shortcut](#quickly-load-a-readmemd-file-from-github-using-a-shortcut)
  - [Capable of loading any Markdown file from GitHub](#capable-of-loading-any-markdown-file-from-github)
  - [Supports loading any remote Markdown files](#supports-loading-any-remote-markdown-files)
- [Options](#options)
  - [pages](#pages)
    - [remotePath](#remotepath)
    - [routePath](#routepath)
- [TODOs](#todos)
- [License](#license)

## Install

```bash
npm install rspress-plugin-remote-page -D
```

## Usage

### Quickly load a `README.md` file from GitHub using a shortcut

```ts
// rspress.config.ts
import { remotePage } from 'rspress-plugin-remote-page';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  plugins: [remotePage({
    pages: [
      {
        // This input will load README.md of https://github.com/ulivz/rspress-plugin-remote-page
        remotePath: 'ulivz/rspress-plugin-remote-page',
        routePath: '/readme',
      }
    ]
  })],
});
```

### Capable of loading any Markdown file from GitHub

```ts
// rspress.config.ts
import { remotePage } from 'rspress-plugin-remote-page';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  plugins: [remotePage({
    pages: [
      {
        remotePath: 'https://github.com/ulivz/rspress-plugin-remote-page/blob/main/README.md',
        routePath: '/readme',
      }
    ]
  })],
});
```

### Supports loading any remote Markdown files

```ts
// rspress.config.ts
import { remotePage } from 'rspress-plugin-remote-page';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  plugins: [remotePage({
    pages: [
      {
        remotePath: 'https://path/to/your-markdown.md',
        routePath: '/readme',
      }
    ]
  })],
});
```

## Options

### pages

#### remotePath

- **Type**: `string`
- **Required**: `true`

Specify the remote path, it could be:

1. Github repository shortcut, e.g. `web-infra-dev/deep-dive-into-tla`;
2. Github repository repo path, e.g. `https://github.com/web-infra-dev/deep-dive-into-tla`;
3. Github path, e.g. `https://github.com/web-infra-dev/deep-dive-into-tla/blob/master/README-zh-CN.md`;
4. Any remote path, e.g. `https://path/to/your-markdown.md`;

#### routePath

- **Type**: `string`
- **Default**: `master`

Specify the generated route.

## TODOs

- Support remote `*.mdx`.
- Enhance logging output.
- Enhance error handling when fetching pages.

## License

MIT &copy; [ULIVZ](https://github.com/ulivz)
