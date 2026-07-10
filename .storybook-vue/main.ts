import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';

// Vue pilot Storybook — separate instance from .storybook (React), since
// Storybook doesn't support mixing framework renderers in one instance.
const config: StorybookConfig = {
  stories: ['../src-vue/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  staticDirs: ['../static'],
  // @storybook/vue3-vite's preset doesn't inject the Vue SFC compiler plugin
  // itself (only docgen/template-compilation helpers), so it must be added here.
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, { plugins: [vue()] });
  },
};

export default config;
