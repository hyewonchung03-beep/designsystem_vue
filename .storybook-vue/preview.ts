import type { Preview } from '@storybook/vue3-vite';
import { onUnmounted } from 'vue';
import '../src-vue/style.css';
import './docs-dark.css';

// React storybook(.storybook/preview.tsx)과 동일한 Theme 툴바 — data-theme을
// <html>에 설정하면 tokens/semantic/color.css의 [data-theme='dark'] 값으로 전환된다.
function applyTheme(theme: string) {
  const root = document.documentElement;
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
        { value: 'system', title: 'System', icon: 'browser' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  decorators: [
    (story, context) => {
      // Vue의 setup()은 컴포넌트 인스턴스당 한 번만 실행되므로, 그 안에서
      // theme을 읽으면 툴바로 globals가 바뀌어도(리마운트 없이 patch되는 경우)
      // 반영되지 않는다. 데코레이터 함수 본문은 globals가 바뀔 때마다 Storybook이
      // 다시 호출해주므로, 여기서 매번 직접 적용해야 실시간 토글이 동작한다.
      const theme = (context.globals?.theme as string) ?? 'light';
      applyTheme(theme);

      return {
        setup() {
          if (theme === 'system') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = () => applyTheme('system');
            mq.addEventListener('change', handler);
            onUnmounted(() => mq.removeEventListener('change', handler));
          }
        },
        template: '<story />',
      };
    },
  ],
  parameters: {
    // 'centered'는 스토리를 콘텐츠 크기로 shrink-wrap하는 flex 박스로 감싸서,
    // w-full/flex-1로만 너비를 채우는 컴포넌트(ProgressBar 등)가 0px로 collapse된다.
    layout: 'padded',
  },
};

export default preview;
