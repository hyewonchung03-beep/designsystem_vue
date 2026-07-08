import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://solum-design-system.vercel.app';
const baseUrl = '/';

const config: Config = {
  title: 'SOLUM Design System',
  tagline: 'Guidelines, components, and resources for building consistent products',
  favicon: 'img/solum-logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ye-lin-kim', // Usually your GitHub org/user name.
  projectName: 'solum-design-system', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    function tailwindPostcssPlugin() {
      return {
        name: 'tailwind-postcss',
        configurePostCss(postcssOptions: any) {
          postcssOptions.plugins = [
            require('@tailwindcss/postcss'),
          ];
          return postcssOptions;
        },
      };
    },
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'ko'],
        docsRouteBasePath: '/',
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        searchBarPosition: 'right',
        searchBarShortcut: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'SOLUM Design System',
      logo: {
        alt: 'SOLUM Design System Logo',
        src: 'img/solum-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'introductionSidebar',
          position: 'left',
          label: 'Introduction',
        },
        {
          type: 'docSidebar',
          sidebarId: 'foundationSidebar',
          position: 'left',
          label: 'Foundation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'componentsSidebar',
          position: 'left',
          label: 'Components',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Design System',
          items: [
            {
              label: 'Introduction',
              to: '/overview',
            },
            {
              label: 'Foundation',
              to: '/foundation/overview',
            },
            {
              label: 'Components',
              to: '/components/overview',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SOLUM Design System.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
