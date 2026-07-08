---
sidebar_position: 5
title: SVG Image Dark Mode Guide
hide_title: true
---

import { DocPageHeader } from '@site/src/components/DocPageHeader';

<DocPageHeader
  section="Foundation"
  title="SVG 이미지 다크모드 대응 가이드"
  description="Figma에서 추출한 SVG 이미지가 하나의 파일로 라이트모드와 다크모드에 자동 대응되도록 등록하는 기준입니다."
/>

## 기본 원칙

SVG 이미지는 라이트모드용 파일과 다크모드용 파일을 따로 만들지 않습니다. 하나의 SVG 파일 안에서 `currentColor` 또는 프로젝트에 등록된 디자인 토큰을 사용해 테마 전환에 자동 대응되도록 작성합니다.

색상만 교체하고 SVG의 구조는 유지합니다. Figma에서 추출된 `viewBox`, `path`, `width`, `height`, 좌표, 레이아웃 구조는 임의로 변경하지 않습니다.

색상은 현재 프로젝트에 등록된 `--sol-*` semantic token을 우선 사용합니다. 적합한 토큰이 확실하지 않으면 임의의 토큰명을 만들지 말고 `프로젝트에 등록된 실제 토큰명으로 교체 필요`라고 표시한 뒤 확인합니다.

## 고정 색상값을 쓰지 않는 이유

SVG 내부에 `#000`, `#fff`, `#161616`, `rgb(0, 0, 0)`, `rgba(255, 255, 255, 0.8)` 같은 고정 색상값이 남아 있으면 테마가 바뀌어도 SVG 색상이 함께 바뀌지 않습니다.

라이트모드에서 잘 보이는 검정 선은 다크모드에서 너무 강하거나 배경에 묻힐 수 있고, 라이트 배경용 흰색 면은 다크모드에서 의도하지 않은 고정 면처럼 보일 수 있습니다. 특히 배경, 선, 텍스트, 아이콘이 섞인 SVG는 일부 요소만 고정 색상으로 남아 있어도 대비와 계층이 깨질 수 있습니다.

## 단색 SVG

단색 아이콘이나 단색 일러스트레이션은 `currentColor`를 우선 사용합니다. SVG를 사용하는 문맥의 `color` 값을 따라가기 때문에, 부모 요소가 테마 토큰으로 색상을 갖고 있으면 SVG도 함께 전환됩니다.

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="..." stroke="currentColor" stroke-width="1.5" />
</svg>
```

MDX에서 직접 SVG를 넣을 때는 React 문법에 맞춰 속성명을 camelCase로 바꿉니다.

```mdx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="..." stroke="currentColor" strokeWidth="1.5" />
</svg>
```

SVG에는 실제 프로젝트 토큰을 연결합니다.

```mdx
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  color="var(--sol-element-primary)"
  aria-hidden="true"
>
  <path d="..." stroke="currentColor" strokeWidth="1.5" />
</svg>
```

## 여러 색상이 필요한 SVG

여러 색상이 필요한 SVG는 각 역할에 맞는 디자인 토큰을 CSS variable로 연결합니다. 현재 프로젝트에 등록된 semantic token 예시는 다음과 같습니다.

| 역할 | 우선 검토할 토큰 |
| --- | --- |
| 주요 아이콘, 텍스트, 라인 | `--sol-element-primary` |
| 보조 아이콘, 보조 라인 | `--sol-element-secondary`, `--sol-element-tertiary`, `--sol-element-quaternary` |
| 브랜드 강조 요소 | `--sol-element-brand`, `--sol-fill-active`, `--sol-primary` |
| 배경, 카드, 컨테이너 | `--sol-surface`, `--sol-surface-container`, `--sol-surface-container-low`, `--sol-surface-base-variant` |
| 경계선 | `--sol-border-solid`, `--sol-border-normal`, `--sol-border-normal-variant` |
| 비활성 요소 | `--sol-element-disabled`, `--sol-fill-disabled` |
| 오류 상태 | `--sol-error`, `--sol-error-container`, `--sol-error-variant` |

색상 의미가 표에 없거나 판단이 애매하면 새 토큰명을 만들지 않습니다. 해당 위치에는 `프로젝트에 등록된 실제 토큰명으로 교체 필요`라고 표시하고 디자인 또는 토큰 담당자에게 확인합니다.

## Figma에서 SVG export

1. SVG로 사용할 프레임 또는 아이콘을 선택합니다.
2. Export 포맷을 `SVG`로 선택합니다.
3. 불필요한 배경 레이어가 포함되지 않았는지 확인합니다.
4. Export 후 VS Code에서 SVG 파일을 열어 색상값을 반드시 확인합니다.
5. Export된 SVG의 `viewBox`, `path`, `width`, `height`, 좌표 구조는 색상 교체 과정에서 변경하지 않습니다.

Figma export 단계에서 색상이 고정값으로 나오는 것은 자연스러운 동작입니다. 등록 전 VS Code에서 고정 색상값을 토큰 또는 `currentColor`로 교체하는 과정이 필요합니다.

## VS Code에서 고정 색상값 검색

SVG 파일을 연 뒤 `Command + F`로 아래 값을 검색합니다.

```text
#
rgb
rgba
fill="
stroke="
stop-color
```

프로젝트 전체에서 확인할 때는 VS Code Search 또는 터미널에서 SVG 파일만 대상으로 검색합니다.

```bash
rg -n '#[0-9A-Fa-f]{3,8}|rgb\\(|rgba\\(' static src docs -g '*.svg' -g '*.md' -g '*.mdx'
```

검색 결과에 고정 색상값이 있으면 그대로 등록하지 않고 역할에 맞는 토큰 또는 `currentColor`로 교체합니다.

## 자동 치환 작업 기준

앞으로 `static/img` 아래에 SVG 이미지를 추가하거나 수정할 때는 SVG의 `path`가 길더라도 직접 눈으로만 고치지 않고, 먼저 실제 색상값 목록을 추출한 뒤 치환 토큰표를 만들어 자동 치환합니다.

작업자는 다음 순서로 처리합니다.

1. 변경 대상 SVG 파일 목록을 확인합니다.
2. SVG 내부의 고정 색상값을 모두 추출합니다.
3. 실제 프로젝트에 등록된 `--sol-*` 토큰과 대조해 치환 토큰표를 만듭니다.
4. `path`, `viewBox`, `width`, `height`, 좌표, 레이아웃 구조는 변경하지 않고 색상 속성만 자동 치환합니다.
5. `mask` 내부의 흑백처럼 렌더링 색상이 아니라 계산용 색상인 경우는 `--sol-static-white`, `--sol-static-black`으로 보존합니다.
6. `<img src="/img/...">`로 로드되는 정적 SVG는 외부 문서의 CSS 변수를 상속받지 못하므로, SVG 파일 내부에서 토큰이 해석되는지 별도로 확인합니다.
7. 로컬 사이트에서 실제 이미지가 뜨는지 라이트모드와 다크모드에서 확인합니다.

색상값 추출 예시는 다음과 같습니다.

```bash
rg -o '#[0-9A-Fa-f]{3,8}|rgb\\([^)]*\\)|rgba\\([^)]*\\)|(fill|stroke|stop-color)="(white|black)"' static/img -g '*.svg'
```

파일별로 확인할 때는 다음처럼 고유 색상값을 먼저 봅니다.

```bash
for file in static/img/components/*.svg; do
  echo "$file"
  rg -o '#[0-9A-Fa-f]{3,8}|rgb\\([^)]*\\)|rgba\\([^)]*\\)|(fill|stroke|stop-color)="(white|black)"' "$file" | sort | uniq -c
done
```

자동 치환 후에는 반드시 고정 색상값이 남았는지 다시 검색합니다.

```bash
rg -n '#[0-9A-Fa-f]{3,8}|rgb\\(|rgba\\(|(fill|stroke|stop-color)="(white|black)"' static/img -g '*.svg'
```

검색 결과가 남아 있다면 그대로 완료하지 않습니다. 단, SVG 내부에 `<style>`로 self-contained token fallback을 넣어야 하는 경우에는 실제 프로젝트 토큰에서 확인한 값만 사용하고, 임의 색상값을 새로 만들지 않습니다.

## 기본 치환 토큰표

아래 표는 현재 프로젝트의 semantic token 구조를 기준으로 한 기본 치환 기준입니다. 새 SVG에서 같은 색상값이 나오더라도 역할이 다르면 무조건 기계적으로 바꾸지 말고, 해당 요소가 어떤 역할인지 확인한 뒤 적용합니다.

| SVG 고정값 | 우선 치환 토큰 | 사용 역할 |
| --- | --- | --- |
| `#161616` | `var(--sol-element-primary)` | 주요 텍스트, 주요 아이콘 |
| `#484848` | `var(--sol-element-secondary)` | 보조 텍스트 |
| `#636363` | `var(--sol-element-tertiary)` | 3순위 텍스트 |
| `#858585` | `var(--sol-element-quaternary)` | 약한 텍스트, 보조 라벨 |
| `#282363`, `#2C2360` | `var(--sol-primary)` | Primary surface, 주요 브랜드 면 |
| `#3A3480` | `var(--sol-element-brand-variant)` | 브랜드 텍스트, 브랜드 아이콘 |
| `#4D469A` | `var(--sol-fill-active)` | 활성 상태 fill |
| `#B5B1E2` | `var(--sol-border-brand)` | 브랜드 연결선, 브랜드 border |
| `#E8E6F8` | `var(--sol-secondary-container)` | 브랜드 계열 연한 container |
| `#F5F4FD` | `var(--sol-selected-container-variant)` | 선택 상태의 약한 container |
| `#EBEBEB` | `var(--sol-border-normal-variant)` | 약한 divider, 약한 border |
| `#E0E0E0` | `var(--sol-border-solid-variant)` | 일반 border variant |
| `#D0D0D0` | `var(--sol-border-solid)` | 일반 solid border |
| `#B84451` | `var(--sol-error-dim)` | 오류/금지 가이드 annotation |
| `white` | `var(--sol-surface)` | 일반 surface, 흰색 배경 역할 |
| `black` | `var(--sol-element-primary)` | 일반 검정 텍스트, 검정 아이콘 역할 |
| `mask` 내부 `white` | `var(--sol-static-white)` | 마스크 계산용 흰색 |
| `mask` 내부 `black` | `var(--sol-static-black)` | 마스크 계산용 검정 |

표에 없는 색상값은 임의로 새 토큰명을 만들지 않습니다. 먼저 `src/styles/tokens/semantic/color.css`와 `src/styles/tokens/primitive/color.css`에서 실제 등록 여부를 확인하고, 확실하지 않으면 `프로젝트에 등록된 실제 토큰명으로 교체 필요`라고 표시합니다.

## 정적 SVG self-contained token 기준

문서에서 SVG를 `<img src="/img/components/example.svg" />`처럼 정적 파일로 불러오면, SVG 파일 내부의 `var(--sol-*)`가 문서 페이지의 CSS 변수 값을 자동으로 상속받지 못할 수 있습니다. 이 경우 SVG가 로컬에서 보이지 않거나 일부 색상이 투명하게 보일 수 있습니다.

정적 SVG 파일 안에서 `var(--sol-*)`를 사용할 때는 다음 중 하나를 선택합니다.

1. SVG를 MDX inline SVG 또는 React 컴포넌트로 렌더링해 문서의 토큰을 상속받게 합니다.
2. 정적 `<img>`로 유지해야 한다면 SVG 내부에 self-contained token fallback을 넣어 파일 자체가 토큰 값을 해석할 수 있게 합니다.

self-contained fallback은 실제 프로젝트 토큰에서 확인한 값만 사용합니다. 이 값은 새로운 디자인 토큰이 아니며, 정적 SVG가 외부 CSS를 상속받지 못하는 상황에서 렌더링을 보장하기 위한 파일 내부 fallback입니다.

```svg
<svg width="900" height="253" viewBox="0 0 900 253" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
:root {
  --sol-primary: #282363;
  --sol-surface: #ffffff;
  --sol-element-primary: #161616;
}
@media (prefers-color-scheme: dark) {
  :root {
    --sol-primary: #9791d4;
    --sol-surface: #161616;
    --sol-element-primary: #ffffff;
  }
}
</style>
  <path d="..." fill="var(--sol-primary)" />
</svg>
```

self-contained fallback을 넣을 때도 `viewBox`, `path`, `width`, `height`, 좌표, 레이아웃 구조는 변경하지 않습니다.

## fill, stroke 교체 예시

고정 색상값이 들어간 SVG는 다음처럼 수정합니다.

```svg
<!-- 변경 전 -->
<path d="..." fill="#FFFFFF" />
<path d="..." stroke="#161616" stroke-width="1.5" />
<rect width="24" height="24" fill="rgb(245, 245, 245)" />
```

```svg
<!-- 변경 후 -->
<path d="..." fill="var(--sol-surface)" />
<path d="..." stroke="var(--sol-element-primary)" stroke-width="1.5" />
<rect width="24" height="24" fill="var(--sol-surface-container-low)" />
```

단색 SVG라면 토큰을 SVG 내부에 직접 넣기보다 `currentColor`를 사용할 수 있습니다.

```svg
<path d="..." fill="currentColor" />
<path d="..." stroke="currentColor" stroke-width="1.5" />
```

gradient를 사용하는 SVG는 `stop-color`에도 고정값을 남기지 않습니다.

```svg
<linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24">
  <stop stop-color="var(--sol-surface-container)" />
  <stop offset="1" stop-color="var(--sol-surface-container-low)" />
</linearGradient>
```

## MD 또는 MDX 문서에서 SVG 삽입

정적 파일로 등록한 SVG는 Markdown 이미지 문법 또는 `<img>`로 삽입할 수 있습니다.

```md
![Button anatomy](/img/components/button-anatomy.svg)
```

```mdx
<img src="/img/components/button-anatomy.svg" alt="Button anatomy" />
```

SVG가 `currentColor`를 사용해야 하는 단색 아이콘이라면, 파일을 이미지로 불러오는 방식보다 MDX에 inline SVG로 넣거나 React 컴포넌트로 렌더링해 부모의 `color`를 상속받게 합니다.

```mdx
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  color="var(--sol-element-secondary)"
  aria-hidden="true"
>
  <path d="..." stroke="currentColor" strokeWidth="1.5" />
</svg>
```

## MDX inline SVG 속성 변환

MDX에 SVG를 직접 넣으면 JSX 문법을 따르므로 일부 SVG 속성명을 React 형식으로 바꿔야 합니다.

| SVG 속성 | MDX / JSX 속성 |
| --- | --- |
| `stroke-width` | `strokeWidth` |
| `stroke-linecap` | `strokeLinecap` |
| `stroke-linejoin` | `strokeLinejoin` |
| `fill-rule` | `fillRule` |
| `clip-rule` | `clipRule` |
| `stop-color` | `stopColor` |
| `stop-opacity` | `stopOpacity` |
| `color-interpolation-filters` | `colorInterpolationFilters` |
| `class` | `className` |

속성명을 바꿀 때도 `viewBox`, `path`, `width`, `height`, 좌표, 레이아웃 구조는 변경하지 않습니다.

## 등록 후 검수 체크리스트

- SVG 렌더링 색상에 고정 `#` 색상값이 남아있지 않은가?
- `rgb` 또는 `rgba` 색상값이 렌더링 색상에 남아있지 않은가?
- 정적 `<img>`용 self-contained fallback이 필요한 경우, fallback 값이 실제 프로젝트 토큰에서 확인한 값인가?
- `fill`과 `stroke`가 `currentColor` 또는 디자인 토큰으로 연결되어 있는가?
- 라이트모드에서 정상적으로 보이는가?
- 다크모드에서 정상적으로 보이는가?
- 배경, 선, 텍스트, 아이콘의 대비가 충분한가?
- `viewBox`, `path`, `width`, `height`가 기존과 동일한가?
- 기존 문서 레이아웃이나 라우팅을 건드리지 않았는가?
- 로컬 사이트에서 SVG 이미지가 실제로 뜨는가?
- SVG를 추가한 페이지를 새로고침했을 때 깨진 이미지 아이콘이 보이지 않는가?
- `npm run build` 또는 필요한 빌드 검증이 통과했는가?
