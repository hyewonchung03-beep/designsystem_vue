# Changelog

## 0.1.0-alpha.6 (2026-07-06)

### Breaking Changes

#### `./styles` export가 이제 `globals.css`를 가리킵니다

**Before**: `@import "@solum-ds/design-system/styles"` → `tokens.css` (CSS 변수만 포함)  
**After**: `@import "@solum-ds/design-system/styles"` → `globals.css` (CSS 변수 + 전역 리셋 포함)

`globals.css`는 내부적으로 `tokens.css`를 import하므로, 기존에 `./styles`를 통해
토큰을 쓰던 소비자는 **별도 코드 변경 없이 동일하게 동작**합니다.

**추가로 적용되는 전역 선언:**

```css
/* 이제 @import "@solum-ds/design-system/styles" 시 자동 포함 */
html, body {
  font-family: var(--sol-font-family); /* Pretendard 폰트 자동 적용 */
}

*, *::before, *::after {
  box-sizing: border-box;
}
```

**영향:** Tailwind preflight를 함께 사용하는 경우 `box-sizing`은 중복 적용되나 무해합니다.
`font-family`는 소비자 앱의 `html`/`body`에 명시적으로 선언된 값이 있으면 그 값이 우선됩니다.

**변경 배경:** 이전 버전에서는 `./styles`가 순수 CSS 변수만 내보내어, 소비자 앱에서
`html { font-family: var(--sol-font-family) }` 를 별도 선언하지 않으면 Pretendard 폰트가
적용되지 않는 문제가 있었습니다. Storybook 환경에서만 `globals.css`가 로드되어
두 환경 간 렌더링 차이가 발생했습니다.

---

### Internal

- `globals.css`에서 Storybook 전용 규칙 분리
  - `#storybook-root` 스타일 → `src/stories/tailwind.css`로 이동
  - `button[role="tab"]::before/after` 리셋 → `src/stories/tailwind.css`로 이동
- `Card` 컴포넌트 루트에 `text-left` 명시 (부모 `text-align` 상속 방어)
- Mapview 컴포넌트(`MapviewPinBg`, `MapviewPin`, `MapviewPinIcon`) 아이콘을 inline SVG로 전환 — 소비자 앱에서 `/img/` 절대경로 참조로 인한 아이콘 미표시 문제 수정
- `DragAndDrop`, `Upload`, `Header`, `DatePicker`, `StructuredList` 아이콘 동일하게 inline SVG로 전환

---

## 0.1.0-alpha.5 (2026-07-03)

- Mapview 핀 아이콘(18종) inline SVG 전환 완료
- `ds-test` 테스트 페이지에 누락 컴포넌트 추가:
  Header, SideNavigation, DatePickerSingle/Range, Popover, Sidesheet,
  StructuredListGrid, DataToolbar, MapviewPin

## 0.1.0-alpha.4 (2026-06-26)

- `DragAndDrop`, `Upload*`, `Header`, `DatePicker`, `StructuredListBodyCell` 아이콘 inline SVG 전환
- `MapviewPinBg`, `MapviewPin` 아이콘 inline SVG 전환
