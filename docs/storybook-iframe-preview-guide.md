# Storybook iframe preview guide

이 문서는 Storybook에 추가된 story를 Docusaurus 컴포넌트 가이드라인 페이지에 iframe으로 연동할 때 지켜야 하는 기준입니다.

기준 구현은 `Components > Button > Button` 페이지입니다. 앞으로 variants 섹션과 Example 탭에서 Storybook story를 가져올 때는 Button 페이지와 같은 방식으로 다크모드, 중앙 정렬, Storybook 원본 반영을 유지합니다.

## 목표

- Storybook에서 story를 수정하면 사이트 iframe preview에도 같은 story가 그대로 반영되어야 합니다.
- Docusaurus 다크모드일 때 iframe 내부 Storybook 문서에도 `data-theme="dark"`가 설정되어야 합니다.
- iframe 내부 preview는 가로와 세로 모두 중앙 정렬되어야 합니다.
- Storybook story id 오류, 중복 story id, 누락된 args 때문에 iframe preview가 깨지지 않아야 합니다.
- Button 페이지의 guideline layout, example card 구조, CSS 구조는 변경하지 않습니다.

## 기준 파일

- `src/components/ButtonGuidelineContent.tsx`
  - Button variants 섹션에서 Storybook iframe URL을 직접 생성합니다.
- `src/components/ExampleCard.tsx`
  - Example 탭의 공통 iframe preview 진입점입니다.
- `.storybook/preview.tsx`
  - Storybook iframe 문서 내부의 전역 decorator, `data-theme`, variants preview 플래그를 설정합니다.
- `src/stories/tailwind.css`
  - Storybook iframe 내부 preview wrapper의 중앙 정렬과 preview surface 스타일을 담당합니다.
- `src/components/storybookStoryManifest.ts`
  - ExampleCard에서 Storybook source/code 정보를 찾는 manifest입니다.

## Example 탭 연동 기준

Example 탭에서는 `ExampleCard`를 사용합니다.

```tsx
<ExampleCard title="Basic example" storyId="components-example--basic" />
```

`ExampleCard`는 `storyId`를 기준으로 Storybook iframe을 생성합니다.

```tsx
const storybookIframeSrc =
  `${storybookBaseUrl}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story&theme=${storybookTheme}`;
```

반드시 지켜야 할 점:

- `storyId`는 실제 Storybook에 등록된 id여야 합니다.
- Storybook 서버 기준으로 `http://localhost:6006/index.json`에서 존재 여부를 확인합니다.
- docs 쪽에서 임의로 컴포넌트를 다시 만들지 않습니다.
- Storybook story의 args, render, decorators를 기준으로 preview가 보이게 합니다.
- 컴포넌트 수정은 Storybook story에 반영하고, 사이트는 iframe으로 그 결과를 가져옵니다.

## Variants 섹션 연동 기준

variants 섹션에서 Storybook iframe을 직접 만들 때는 Button 페이지처럼 `iframe.html` URL을 사용합니다.

```tsx
const storybookSrc =
  `http://localhost:6006/iframe.html?id=${storyId}&viewMode=story&args=${encodeURIComponent(storybookArgs)}&theme=${storybookTheme}&docPreview=variant`;
```

필수 query:

- `id`: 실제 Storybook story id
- `viewMode=story`: Storybook canvas story iframe으로 표시
- `args`: variants control 값이 Storybook story args로 전달되어야 할 때 사용
- `theme`: Docusaurus color mode를 Storybook iframe 내부로 전달
- `docPreview=variant`: variants 섹션 전용 중앙 정렬 preview로 표시

`docPreview=variant`는 variants 섹션에만 사용합니다. Example 탭의 `ExampleCard`에는 붙이지 않습니다.

## 다크모드 기준

Docusaurus 페이지에서 현재 테마를 읽고 iframe URL에 `theme=dark` 또는 `theme=light`를 전달합니다.

```tsx
const {colorMode} = useColorMode();
const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
```

Storybook iframe 내부에서는 `.storybook/preview.tsx`가 query 값을 읽어 `<html>`에 `data-theme`를 설정합니다.

```tsx
const searchParams = new URLSearchParams(window.location.search);
const previewTheme = searchParams.get('theme');

if (previewTheme === 'dark' || previewTheme === 'light') {
  document.documentElement.setAttribute('data-theme', previewTheme);
}
```

토큰 override는 `[data-theme='dark']` 기준으로 동작하므로, `data-theme`는 wrapper div가 아니라 `document.documentElement`에 설정해야 합니다.

## 중앙 정렬 기준

Storybook iframe 내부 preview는 `.storybook/preview.tsx`의 decorator wrapper를 기준으로 정렬합니다.

```tsx
<div className={`storybook-preview-layout${isVariantPreview ? ' preview' : ''}`}>
  <div className="storybook-preview-content">
    <Story />
  </div>
</div>
```

공통 Storybook preview wrapper는 가운데 정렬을 유지합니다.

```css
.storybook-preview-layout {
  display: flex;
  width: 100%;
  min-height: fit-content;
  padding: 2rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
```

variants 전용 preview는 `.preview` 클래스로 위아래와 좌우 중앙 정렬을 보장합니다.

```css
.preview {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
```

Storybook preview content는 story 자체가 wrap되거나 여러 개의 컴포넌트를 렌더링해도 중앙에 모이도록 유지합니다.

```css
.storybook-preview-content {
  display: flex;
  width: fit-content;
  max-width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
```

## Storybook 원본 반영 기준

사이트에서 story를 별도로 복제하지 않습니다.

해야 하는 것:

- Storybook story를 source of truth로 둡니다.
- 사이트 preview는 `iframe.html?id=...`로 story를 직접 가져옵니다.
- variants control이 필요하면 `args` query로 Storybook args를 전달합니다.
- story code/source 표시는 Storybook manifest 또는 source map을 사용합니다.

하지 말아야 하는 것:

- 사이트 전용으로 같은 컴포넌트 예시를 새로 하드코딩하지 않습니다.
- Storybook story 이름이나 sidebar 구조를 사이트 연동 때문에 바꾸지 않습니다.
- Button 페이지의 layout, spacing, example card 구조를 변경하지 않습니다.
- iframe 내부 정렬 문제를 `ExampleCard` 크기 조정으로 해결하지 않습니다.

## 새 story 연동 절차

1. Storybook에 story를 추가합니다.
2. `npm run storybook`을 실행합니다.
3. `http://localhost:6006/index.json`에서 실제 story id를 확인합니다.
4. Example 탭이면 `ExampleCard`에 확인한 `storyId`를 넣습니다.
5. variants 섹션이면 Button 페이지처럼 `iframe.html` URL을 만들고 `theme`과 `docPreview=variant`를 포함합니다.
6. Storybook iframe preview가 다크모드에서 `data-theme="dark"`를 받는지 확인합니다.
7. preview가 iframe 내부에서 가로/세로 중앙 정렬되는지 확인합니다.
8. `npm run build-storybook`으로 Storybook indexing 오류가 없는지 확인합니다.

## 확인 명령어

```bash
npm run storybook
```

```bash
curl -I http://localhost:6006/iframe.html
```

```bash
npm run build-storybook
```

필요하면 사이트 빌드도 함께 확인합니다.

```bash
npm run build
```

## 오류 방지 체크리스트

- `storyId`가 `index.json`에 실제로 존재한다.
- 중복 story id가 없다.
- Storybook story의 필수 props는 `args` 또는 `render`에서 빠지지 않았다.
- iframe URL에 `theme=${storybookTheme}`가 포함되어 있다.
- variants iframe URL에는 `docPreview=variant`가 포함되어 있다.
- `.storybook/preview.tsx`가 `theme` query를 읽어 `document.documentElement`에 `data-theme`를 설정한다.
- `src/stories/tailwind.css`의 `.preview`와 `.storybook-preview-content` 중앙 정렬 규칙이 유지되어 있다.
- Button 페이지의 layout, tab, example card, bottom navigation 구조를 변경하지 않았다.
