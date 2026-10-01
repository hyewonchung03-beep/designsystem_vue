import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';
import { UPDATE_GLOBALS } from 'storybook/internal/core-events';

// 좌측 사이드바/툴바(매니저 프레임)는 preview.ts의 데코레이터가 닿지 않는
// 별도 문서라, 프리뷰 쪽 Theme 토글과 동기화하려면 channel 이벤트를 들어야 한다.
function resolveIsDark(theme: string | undefined) {
  if (theme === 'dark') return true;
  if (theme === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches;
  return false;
}

addons.setConfig({ theme: themes.light });

addons.register('solum/sync-theme', (api) => {
  api.on(UPDATE_GLOBALS, (payload: { globals?: Record<string, unknown> }) => {
    const theme = payload?.globals?.theme as string | undefined;
    if (theme === undefined) return;
    addons.setConfig({ theme: resolveIsDark(theme) ? themes.dark : themes.light });

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => addons.setConfig({ theme: mq.matches ? themes.dark : themes.light });
      mq.addEventListener('change', handler, { once: true });
    }
  });
});
