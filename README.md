<h1 align="center">rspress-plugin-remote-page</h1>

<p align="center">
    An <a href="https://rspress.dev/">Rspress</a> plugin to seamlessly load remote markdown file (e.g. README.md) onto your website.
</p>

<p align="center">
    <a href="https://npmjs.com/package/rspress-plugin-remote-page"><img src="https://img.shields.io/npm/v/rspress-plugin-remote-page.svg?style=flat" alt="NPM version"></a> 
    <a href="https://npmjs.com/package/rspress-plugin-remote-page"><img src="https://img.shields.io/npm/dm/rspress-plugin-remote-page.svg?style=flat" alt="NPM downloads"></a> 
    <a href="https://circleci.com/gh/saojs/rspress-plugin-remote-page"><img src="https://img.shields.io/circleci/project/saojs/rspress-plugin-remote-page/master.svg?style=flat" alt="Build Status"></a> 
</p>

## Features

- Load any remote Markdowns.
- Load Github Markdowns by detecting.

## Install

```bash
npm install rspress-plugin-remote-page -D
```

## Usage

### Load Github `README.md`

```ts
// rspress.config.ts
import { remotePage } from 'rspress-plugin-remote-page';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  plugins: [remotePage({
    pages: [
      {
        remotePath: 'ulivz/rspress-plugin-remote-page',
        routePath: '/readme',
      }
    ]
  })],
});
```

### Load Github Markdown

```ts
// rspress.config.ts
import { remotePage } from 'rspress-plugin-remote-page';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  plugins: [remotePage({
    pages: [
      {
        remotePath: 'ulivz/rspress-plugin-remote-page',
        routePath: '/readme',
      }
    ]
  })],
});
```

### Load Github Markdown

```ts
// rspress.config.ts
import { remotePage } from 'rspress-plugin-remote-page';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  plugins: [remotePage({
    pages: [
      {
        remotePath: 'https://github.com/web-infra-dev/deep-dive-into-tla/blob/master/README-zh-CN.md',
        routePath: '/readme',
      }
    ]
  })],
});
```

### Load any Remote Markdown

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

## Page Options

### remotePath

- **Type**: `string`
- **Required**: `true`

Specify the remote path, it could be:

1. Github repository shortcut, e.g. `web-infra-dev/deep-dive-into-tla`;
2. Github repository repo path, e.g. `https://github.com/web-infra-dev/deep-dive-into-tla`;
3. Github path, e.g. `https://github.com/web-infra-dev/deep-dive-into-tla/blob/master/README-zh-CN.md`;
4. Any remote path, e.g. `https://path/to/your-markdown.md`;

### routePath

- **Type**: `string`
- **Default**: `master`

Specify the generated route.

## TODOs

- Support remote `*.mdx`.

## License

MIT &copy; [ULIVZ](https://github.com/ulivz)
