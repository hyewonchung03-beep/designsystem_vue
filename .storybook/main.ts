import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../static'],
  managerHead: (head) => `
    ${head}
    <script>
      (function () {
        const LOGO_SRC = '/img/foundation/image/img_solum_glass.svg';
        function replaceLogo() {
          const svg = document.querySelector('svg[viewBox="0 0 200 40"]');
          if (!svg) return false;
          const img = document.createElement('img');
          img.src = LOGO_SRC;
          img.alt = 'SOLUM';
          img.style.cssText = 'height:28px;display:block;';
          svg.parentNode.replaceChild(img, svg);
          return true;
        }
        if (!replaceLogo()) {
          const observer = new MutationObserver(function () {
            if (replaceLogo()) observer.disconnect();
          });
          observer.observe(document.documentElement, { childList: true, subtree: true });
        }
      })();
    </script>
  `,
};

export default config;