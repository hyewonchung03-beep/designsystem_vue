# SOLUM Design System

## 프로젝트 구조
- React + TypeScript + Vite + Tailwind v4
- Tailwind v4: @theme {} 방식 사용, tailwind.config.js 없음
- 디자인 토큰: tokens/primitive/, tokens/semantic/ (CSS 파일 형식)
- Storybook으로 컴포넌트 문서화

## Token 사용 원칙 (필수)
- 모든 color, spacing, typography 값은 반드시 기존 --sol-* 토큰을 사용해야 한다.
- 절대 raw hex 값이나 px 숫자를 하드코딩하지 않는다.
- inline style(style={{ }})로 색상/spacing/폰트 값을 직접 넣지 않는다.
  Tailwind 클래스 또는 CSS 변수 참조 방식만 사용한다.
- 적합한 토큰이 없는 경우, 새로 만들지 말고 반드시 먼저 사용자에게 확인을 요청한다.

## Icon 사용 원칙 (필수)

Figma 아이콘은 사용 방식에 따라 세 가지 카테고리로 분류한다.

### ic_responsive (소비자 교체 가능 슬롯)
- Figma에서 인스턴스 스왑으로 32/28/24/20/16/14/12px 중 하나로 고정되는 슬롯.
- 점선 박스나 빈 사각형처럼 보여도 그건 placeholder 모양일 뿐 새로
  SVG를 그려서 채우면 안 된다.
- 반드시 IcBlank 컴포넌트를 사용한다.

### ic_trigger (독립 인터랙션 아이콘)
- 아이콘 자체가 독립 인터랙션을 가지는 경우 (예: 닫기 버튼의 X 아이콘).
- IcTrigger 컴포넌트 또는 별도 아이콘 컴포넌트로 구현한다.

### ic_state (상태 결합형 아이콘) ← 예외 허용
- 컴포넌트의 특정 상태(open/close, checked 등)와 1:1 매핑되어 고정되는 아이콘.
- 인터랙션은 부모 컴포넌트가 소유하지만, 콘텐츠(아이콘 모양)는 상태에 따라
  결정되어 소비자가 자유롭게 교체할 수 없는 구조.
- 예: DatatableTreeCell의 expand/collapse chevron, Accordion의 chevron,
  Checkbox의 체크 아이콘 등.
- IcBlank 대신 상태별 SVG 또는 아이콘 컴포넌트를 직접 구현해도 된다.
  단, 임의 SVG를 새로 그리기 전에 사용자에게 먼저 확인을 요청한다.

### 공통 규칙
- 아이콘 사이즈는 7개 고정값(32/28/24/20/16/14/12px) 중 하나만 허용하며,
  임의 px 값을 prop으로 받지 않는다.
- 카테고리가 불확실한 경우, 직접 판단하지 말고 반드시 먼저 사용자에게 확인을 요청한다.

## 상속 속성 선언 원칙 (필수)
- 컴포넌트는 text-align, line-height, font 등 CSS 상속 가능한 속성을
  부모에 의존하지 않고 컴포넌트 루트 또는 해당 요소에 항상 명시적으로 선언한다.
- text-align의 경우, 좌측 정렬이 기본값이더라도 `text-left`를 루트에 명시한다.
  (소비자 환경의 전역 CSS가 text-align을 override할 수 있기 때문)

## 예외
- 디자인 시스템 문서/데모용 컴포넌트(컬러 팔레트를 그대로 보여주는 페이지 등)는
  토큰의 실제 값을 보여주는 게 목적이므로 예외로 허용한다. 
  헷갈리면 작업 전에 먼저 물어볼 것.

## Lib 빌드 / npm link 개발 워크플로우

### 스크립트
- `npm run build:lib` — 프로덕션 빌드 (JS/TS + styles 한 번에 출력)
- `npm run build:lib:watch` — 개발용 watch 빌드
  - JS/TS 변경: 즉시 감지 → 재빌드
  - `src/styles/` CSS 변경: 감지 → 재빌드 + `dist/styles/` 자동 복사
  - `src/styles/`에 **새 파일을 추가**한 경우: watch를 재시작해야 새 파일이 감지 대상에 등록됨

### npm link 설정 (최초 1회)
```bash
# 1. design-system 전역 링크
cd ~/Documents/GitHub/solum-design-system
npm link

# 2. 소비자 앱에서 로컬 참조
cd ~/ds-test
npm link @solum-ds/design-system
```

소비자 앱 `vite.config.ts`에 아래 설정이 필요하다:
```ts
resolve: { preserveSymlinks: true },
server: { watch: { ignored: ['!**/node_modules/@solum-ds/design-system/dist/**'] } }
```

### 일반적인 개발 흐름
```bash
# 터미널 1 — design-system watch
npm run build:lib:watch

# 터미널 2 — 소비자 앱 dev server
cd ~/ds-test && npm run dev
```

컴포넌트나 스타일을 수정하면 watch가 재빌드하고, 소비자 앱 Vite dev server가 HMR로 반영한다. 재설치 불필요.
