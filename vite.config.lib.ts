import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve, join } from 'path';
import { cpSync, rmSync, readdirSync, statSync } from 'fs';

function walkDir(dir: string): string[] {
  const result: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) result.push(...walkDir(full));
    else result.push(full);
  }
  return result;
}

const copyStylesPlugin = (): Plugin => ({
  name: 'copy-styles',
  buildStart() {
    // src/styles/ CSS 변경도 watch 재빌드 대상으로 등록
    for (const file of walkDir(resolve(__dirname, 'src/styles'))) {
      this.addWatchFile(file);
    }
  },
  closeBundle() {
    cpSync(
      resolve(__dirname, 'src/styles'),
      resolve(__dirname, 'dist/styles'),
      { recursive: true },
    );
    try { rmSync(resolve(__dirname, 'dist/styles/figma-tokens.json')); } catch { /* 없으면 무시 */ }
  },
});

export default defineConfig({
  plugins: [
    react(),
    copyStylesPlugin(),
    dts({
      include: ['src/index.ts', 'src/components/**/*.ts', 'src/components/**/*.tsx'],
      exclude: [
        'src/**/*.stories.*',
        'src/**/*.test.*',
        'src/components/*GuidelineContent.tsx',
        'src/components/*Examples.tsx',
        'src/components/Doc*.tsx',
        'src/components/ColorContent.tsx',
        'src/components/ElevationContent.tsx',
        'src/components/IconographyContent.tsx',
        'src/components/TypographyContent.tsx',
        'src/components/ColorPickerGuidelineContent.tsx',
        'src/components/ComponentGuidelinePrimitives.tsx',
        'src/components/ComponentsOverviewContent.tsx',
        'src/components/ComponentsPreview.tsx',
        'src/components/ExampleCard.tsx',
        'src/components/GenericGuidelineContent.tsx',
        'src/components/StorybookExampleList.tsx',
        'src/components/storyRegistry.tsx',
        'src/components/storybookStoryManifest.ts',
        'src/components/storybookUrls.ts',
        'src/components/storySourceMap.ts',
        'src/components/HomepageFeatures/**',
      ],
      outDir: 'dist',
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SolumDS',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    outDir: 'dist',
  },
});
