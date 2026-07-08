import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import '../src/styles/fonts.css'
import '../src/styles/globals.css'
import '../src/stories/tailwind.css'

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const searchParams = new URLSearchParams(window.location.search);
  const previewTheme = searchParams.get('theme');

  if (previewTheme === 'dark' || previewTheme === 'light') {
    document.documentElement.setAttribute('data-theme', previewTheme);
  }

  if (searchParams.get('docPreview') === 'variant') {
    document.documentElement.setAttribute('data-doc-preview', 'variant');
  }

  if (searchParams.get('embed') === 'component') {
    document.documentElement.setAttribute('data-storybook-embed', 'component');
  }
}

const previewSearchParams =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : undefined;

const isVariantPreview = previewSearchParams?.get('docPreview') === 'variant';
const isComponentEmbed = previewSearchParams?.get('embed') === 'component';
const storyId = previewSearchParams?.get('id');

function applyTheme(theme: string) {
  const root = document.documentElement;
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

function reportEmbedHeight() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !isComponentEmbed) return;

  const content = document.querySelector('.storybook-preview-content');
  const height = Math.max(
    content?.scrollHeight ?? 0,
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );

  window.parent.postMessage({
    type: 'storybook-embed-height',
    storyId,
    height,
  }, '*');
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light',  title: 'Light',  icon: 'sun'     },
        { value: 'dark',   title: 'Dark',   icon: 'moon'    },
        { value: 'system', title: 'System', icon: 'browser' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = (context.globals?.theme as string) ?? 'light';

      // Apply theme to <html data-theme="...">
      useEffect(() => {
        applyTheme(theme);

        if (theme === 'system') {
          const mq = window.matchMedia('(prefers-color-scheme: dark)');
          const handler = () => applyTheme('system');
          mq.addEventListener('change', handler);
          return () => mq.removeEventListener('change', handler);
        }
      }, [theme]);

      // Embed height reporting
      useEffect(() => {
        if (!isComponentEmbed) return;

        const observer = new ResizeObserver(reportEmbedHeight);
        const content = document.querySelector('.storybook-preview-content');
        if (content) observer.observe(content);

        reportEmbedHeight();
        window.addEventListener('load', reportEmbedHeight);

        return () => {
          observer.disconnect();
          window.removeEventListener('load', reportEmbedHeight);
        };
      }, []);

      return (
        <div
          className={`storybook-preview-layout${isVariantPreview ? ' preview' : ''}${isComponentEmbed ? ' storybook-preview-layout--embed' : ''}`}
          style={{ backgroundColor: 'var(--sol-surface)', color: 'var(--sol-element-primary)', transition: 'background-color 0.2s ease, color 0.2s ease' }}
        >
          <div className="storybook-preview-content">
            <Story />
          </div>
        </div>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
