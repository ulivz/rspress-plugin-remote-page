/**
 * @license
 * Copyright (c) ULIVZ. All Rights Reserved.
 */

// Import necessary modules
import https from 'https';
import { RspressPlugin, AdditionalPage } from '@rspress/shared';

// Define the IRemotePageOptions interface
export interface IRemotePageOptions {
  /**
   * Remote URLs list
   */
  pages: Array<{
    /**
     * Remote path, e.g., ulivz/rspress-plugin-load-remote-markdown
     */
    remotePath: string;

    /**
     * Page route path
     */
    routePath: string;
  }>
}

// Define AdditionalRemotePage type
type AdditionalRemotePage = AdditionalPage & {
  remoteUrl: string;
}

/**
 * A simple fetch method without dependencies
 *
 * @param url - The URL to download from
 * @returns - Promise that resolves with the downloaded data or rejects with an error
 */
function download(url: string): Promise<string | never> {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const { statusCode } = res;

      // Check for non-200 status codes
      if (statusCode !== 200) {
        const error = new Error(`Request ${url} failed, statusCode: ${statusCode}`);
        console.error(error.message);
        res.resume();
        reject(error);
      }

      res.setEncoding('utf8');
      let rawData = '';

      // Concatenate chunks of data
      res.on('data', chunk => {
        rawData += chunk;
      });

      // Resolve with the final data
      res.on('end', () => {
        resolve(rawData);
      });

      // Reject on any error
      res.on('error', reject);
    });
  });
}

// Utility functions
const isExternal = (input: string) => /^https?:/.test(input);
const isMarkdown = (input: string) => /\.md/.test(input);

// Define GitHubInfo type
type GitHubInfo = {
  repo: string | void;
  branch?: string;
  filePath?: string;
};

/**
 * Extract GitHub URL information
 *
 * @param input - The input URL or short name
 * @returns - An object containing repo, branch, and file path or null if no match found
 */
function extractGitHubUrl(input: string): GitHubInfo | null {
  const fullUrlPattern = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)(?:\/blob\/([a-zA-Z0-9_-]+)\/(.*))?/;
  const shortUrlPattern = /^([a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)$/;

  const fullMatch = input.match(fullUrlPattern);
  if (fullMatch) {
    return {
      repo: fullMatch[1],
      branch: fullMatch[2],
      filePath: fullMatch[3],
    };
  }

  const shortMatch = input.match(shortUrlPattern);
  if (shortMatch) {
    return {
      repo: shortMatch[0],
    };
  }

  return null;
}

// Define logging prefix
const PREFIX = '[REMOTE_PAGE]';

// remotePage main function
export function remotePage(options: IRemotePageOptions): RspressPlugin {
  let additionalPages: Array<AdditionalRemotePage>;

  return {
    name: 'load-remote-markdown',
    async beforeBuild(config, isProd) {
      const tasks = options.pages.reduce<Array<Promise<AdditionalRemotePage>>>((pages, page) => {
        if (isExternal(page.remotePath)) {
          if (isMarkdown(page.remotePath)) {
            pages.push((async function (): Promise<AdditionalRemotePage> {
              return {
                routePath: page.routePath,
                content: await download(page.remotePath),
                remoteUrl: page.remotePath,
              };
            })());
          } else {
            console.error(`${PREFIX} Only *.md is supported as input for remote page, got: ${page.remotePath}`);
          }
        } else {
          const info = extractGitHubUrl(page.remotePath);
          if (info && info.repo) {
            // eslint-disable-next-line max-len
            const url = `https://raw.githubusercontent.com/${info.repo}/${info.branch ?? 'master'}/${info.filePath ?? 'README.md'}`;
            if (isMarkdown(url)) {
              pages.push((async function (): Promise<AdditionalRemotePage> {
                return {
                  routePath: page.routePath,
                  content: await download(url),
                  remoteUrl: url,
                };
              })());
            } else {
              console.error(`${PREFIX} Only *.md is supported as input for remote page, got: ${url}`);
            }
          }
        }
        return pages;
      }, []);

      additionalPages = await Promise.all(tasks);
    },

    // Add additional pages to RspressPlugin
    addPages(config, isProd) {
      additionalPages.forEach(page => {
        console.error(`${PREFIX} route: "${page.routePath}" (remote: ${page.remoteUrl})`);
      });
      return additionalPages;
    },
  };
}
