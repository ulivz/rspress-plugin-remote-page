import https from 'https';
import { RspressPlugin } from '@rspress/shared';

function download(url: string): Promise<string | never> {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        const error = new Error(`Request ${url} failed, statusCode: ${statusCode}`);
        console.error(error.message);
        res.resume();
        reject(error);
      }

      res.setEncoding('utf8');
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        resolve(rawData);
      });

      res.on('error', reject);
    });
  });
}

export interface ILoadReadmeOptions {
  repo: string;
  route?: string;
  branch?: string;
}

export function loadReadme(options: ILoadReadmeOptions): RspressPlugin {
  let md: string;

  return {
    name: 'load-readme',
    async beforeBuild(config, isProd) {
      md = await download(`https://raw.githubusercontent.com/${options.repo}/${options.branch ?? 'master'}/README.md`);
    },
    addPages(config, isProd) {
      return [
        {
          routePath: '/post',
          content: md,
        },
      ];
    },
  };
}
