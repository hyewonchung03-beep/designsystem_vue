import type { Preview } from '@storybook/vue3-vite';
import '../src-vue/style.css';

const preview: Preview = {
  parameters: {
    // 'centered'는 스토리를 콘텐츠 크기로 shrink-wrap하는 flex 박스로 감싸서,
    // w-full/flex-1로만 너비를 채우는 컴포넌트(ProgressBar 등)가 0px로 collapse된다.
    layout: 'padded',
  },
};

export default preview;
