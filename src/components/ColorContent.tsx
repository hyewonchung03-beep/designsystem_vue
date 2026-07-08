import React from "react";
import { useColorMode } from "@docusaurus/theme-common";

const opacityBgStyle: React.CSSProperties = {
  backgroundImage: "url('/img/foundation/color/opacity.png')",
  backgroundRepeat: "repeat",
  backgroundSize: "48px 48px",
};

const font = "Pretendard, sans-serif";

function hexToRgb(hex: string): string | null {
  const expanded = hex.replace(/^#([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => r + r + g + g + b + b);
  const m = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expanded);
  if (!m) return null;
  return `rgb(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)})`;
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" stroke="#858585" strokeWidth="1.2" />
      <path d="M10.5 5.5V4C10.5 3.17 9.83 2.5 9 2.5H4C3.17 2.5 2.5 3.17 2.5 4V9C2.5 9.83 3.17 10.5 4 10.5H5.5" stroke="#858585" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ColorChip({ color, name, token, dark = false }: {
  color: string; name: string; token: string; dark?: boolean;
}) {
  const { colorMode } = useColorMode();
  const isDark = dark || colorMode === "dark";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: 16,
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
        border: isDark ? "none" : `1px solid var(--sol-border-solid-variant)`,
        background: dark ? "var(--color-neutral-750)" : "var(--sol-surface)",
      }}
    >
      <button
        className="color-chip-copy"
        title="Copy token name"
        onClick={() => navigator.clipboard.writeText(name)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          borderRadius: 4,
          opacity: 0,
          transition: "opacity 150ms",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <CopyIcon />
      </button>

      <div
        style={{
          position: "relative",
          borderRadius: 4,
          flexShrink: 0,
          width: 48,
          height: 48,
          overflow: "hidden",
          border: isDark ? "none" : `1px solid var(--color-alpha-black-8)`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, ...opacityBgStyle }} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: color }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 0%", minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "22px",
            color: dark ? "var(--color-common-white)" : "var(--sol-element-primary)",
            fontFamily: font,
          }}
        >
          {name}
        </p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: "20px",
              color: dark ? "var(--color-alpha-white-70)" : "var(--sol-element-secondary)",
              fontFamily: font,
              flexShrink: 0,
            }}
          >
            {token}
          </p>
          {token.startsWith('#') && hexToRgb(token) && (
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: "20px",
                color: dark ? "var(--color-alpha-white-36)" : "var(--sol-element-tertiary)",
                fontFamily: font,
                flexShrink: 0,
              }}
            >
              {hexToRgb(token)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ColorChipGroup({ chips, dark = false }: {
  chips: { color: string; name: string; token: string }[]; dark?: boolean;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 12 }}>
      {chips.map((chip) => (
        <ColorChip key={chip.name} color={chip.color} name={chip.name} token={chip.token} dark={dark} />
      ))}
    </div>
  );
}

export function ColorSubSection({ label, description, chips, dark = false }: {
  label: string; description?: string; chips: { color: string; name: string; token: string }[]; dark?: boolean;
}) {
  const { colorMode } = useColorMode();
  const isDark = dark || colorMode === "dark";
  return (
    <div className={description ? "color-subsection color-subsection--described" : "color-subsection"} style={{ display: "flex", flexDirection: "column", gap: description ? 30 : 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "22px",
            color: isDark ? "var(--color-common-white)" : "var(--sol-element-primary)",
            fontFamily: font,
          }}
        >
          {label}
        </p>
        {description && (
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: "20px",
              color: isDark ? "var(--color-alpha-white-70)" : "var(--sol-element-secondary)",
              fontFamily: font,
            }}
          >
            {description}
          </p>
        )}
      </div>
      <ColorChipGroup chips={chips} dark={isDark} />
    </div>
  );
}

export function ColorSurfaceGroup({ mode, chips }: {
  mode: 'light' | 'dark';
  chips: { color: string; name: string; token: string }[];
}) {
  const dark = mode === 'dark';
  return (
    <div
      style={{
        background: dark ? "var(--color-neutral-800)" : "var(--sol-surface)",
        border: `1px solid ${dark ? "var(--color-neutral-650)" : "var(--sol-border-solid)"}`,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: "36px 36px 48px",
        borderRadius: 8,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          margin: 0,
          fontWeight: 600,
          color: dark ? "var(--color-common-white)" : "var(--sol-element-primary)",
          fontSize: 14,
          lineHeight: "20px",
          fontFamily: font,
        }}
      >
        {mode === "light" ? "Light" : "Dark"}
      </p>
      <ColorChipGroup chips={chips} dark={dark} />
    </div>
  );
}

function ColorSection({ title, description, children, childrenGap = 60 }: {
  title: string; description: string; children: React.ReactNode; childrenGap?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p
          style={{
            margin: 0,
            color: "#161616",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "26px",
            fontFamily: font,
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: 0,
            color: "#484848",
            fontSize: 16,
            lineHeight: "22px",
            fontFamily: font,
          }}
        >
          {description}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: childrenGap }}>{children}</div>
    </div>
  );
}

function PrimitiveOpacitySection() {
  function OpacityRow({ items, textColor }: { items: { v: number; c: string }[]; textColor: string }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex' }}>
          {items.map(({ v, c }) => (
            <div key={v} style={{ flex: '1 1 0%', height: 40, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, ...opacityBgStyle }} />
              <div style={{ position: 'absolute', inset: 0, background: c }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          {items.map(({ v }) => (
            <p key={v} style={{ flex: '1 1 0%', margin: 0, fontSize: 14, lineHeight: '20px', fontWeight: 600, color: textColor, fontFamily: font }}>{v}</p>
          ))}
        </div>
      </div>
    );
  }

  const blackRow1 = [0, 4, 8, 12, 16, 24, 36].map(v => ({ v, c: `rgba(0,0,0,${v / 100})` }));
  const blackRow2 = [50, 60, 70, 80, 90, 96].map(v => ({ v, c: `rgba(0,0,0,${v / 100})` }));
  const whiteRow1 = [0, 4, 8, 12, 16, 24, 36].map(v => ({ v, c: `rgba(255,255,255,${v / 100})` }));
  const whiteRow2 = [50, 60, 70, 80, 90, 96].map(v => ({ v, c: `rgba(255,255,255,${v / 100})` }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0, fontWeight: 600, fontSize: 16, lineHeight: '22px', color: '#161616', fontFamily: font }}>Opacity</p>
      <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '36px 36px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 16, lineHeight: '22px', color: '#161616', fontFamily: font }}>Black</p>
        <OpacityRow items={blackRow1} textColor="#858585" />
        <OpacityRow items={blackRow2} textColor="#858585" />
      </div>
      <div style={{ background: '#161616', border: '1px solid #3d3d3d', borderRadius: 8, padding: '36px 36px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 16, lineHeight: '22px', color: '#fff', fontFamily: font }}>White</p>
        <OpacityRow items={whiteRow1} textColor="#d0d0d0" />
        <OpacityRow items={whiteRow2} textColor="#d0d0d0" />
      </div>
    </div>
  );
}

export default function ColorContent() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", width: "100%", padding: "60px 0 120px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 60, alignItems: "flex-start", width: "100%", maxWidth: 900 }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <p style={{ margin: 0, color: "#858585", fontWeight: 600, fontSize: 14, lineHeight: "20px", fontFamily: font }}>
            Foundation
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h1 style={{ margin: 0, color: "#161616", fontWeight: 600, fontSize: 48, lineHeight: "52px", fontFamily: font }}>
              Color
            </h1>
            <p style={{ margin: 0, color: "#484848", fontSize: 16, lineHeight: "22px", fontFamily: font }}>
              Color는 브랜드 아이덴티티와 시각적 일관성을 유지하며 정보의 위계와 의미를 효과적으로 전달합니다.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ position: "relative", display: "flex", height: 48, alignItems: "center", padding: "0 4px" }}>
                <p style={{ margin: 0, fontWeight: 600, color: "#282363", fontSize: 16, lineHeight: "22px", fontFamily: font }}>
                  Guideline
                </p>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#282363" }} />
              </div>
              <div style={{ display: "flex", height: 48, alignItems: "center", padding: "0 4px" }}>
                <p style={{ margin: 0, color: "#858585", fontSize: 16, lineHeight: "22px", fontFamily: font }}>
                  Preview
                </p>
              </div>
            </div>
            <div style={{ height: 1, background: "#e0e0e0", width: "100%" }} />
          </div>
        </div>

        {/* Content: naming guide + all color sections (100px gap) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 100, width: "100%" }}>

        {/* Token naming guide */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <p style={{ margin: 0, fontWeight: 600, color: "#161616", fontSize: 16, lineHeight: "22px", fontFamily: font }}>
            How to read design token names
          </p>
          <div style={{ background: "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 36px" }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#161616", fontSize: 20, lineHeight: "26px", fontFamily: font }}>
              {"color.[영역].[역할].[속성]"}
            </p>
          </div>
        </div>

        {/* Primitive Token */}
        <ColorSection title="Primitive Token" description="디자인 시스템의 기반이 되는 원시 색상 팔레트입니다. Semantic Token의 값으로 참조되며, 컴포넌트에 직접 사용하지 않습니다." childrenGap={30}>
          <ColorSubSection label="Common" chips={[
            { color: '#FFFFFF', name: 'color.common.white', token: '#FFFFFF' },
            { color: '#000000', name: 'color.common.black', token: '#000000' },
          ]} />
          <ColorSubSection label="Neutral" chips={[
            { color: '#FAFAFA', name: 'color.neutral.25', token: '#FAFAFA' },
            { color: '#F5F5F5', name: 'color.neutral.50', token: '#F5F5F5' },
            { color: '#EBEBEB', name: 'color.neutral.100', token: '#EBEBEB' },
            { color: '#E0E0E0', name: 'color.neutral.150', token: '#E0E0E0' },
            { color: '#D0D0D0', name: 'color.neutral.200', token: '#D0D0D0' },
            { color: '#ABABAB', name: 'color.neutral.300', token: '#ABABAB' },
            { color: '#858585', name: 'color.neutral.400', token: '#858585' },
            { color: '#636363', name: 'color.neutral.500', token: '#636363' },
            { color: '#484848', name: 'color.neutral.600', token: '#484848' },
            { color: '#3D3D3D', name: 'color.neutral.650', token: '#3D3D3D' },
            { color: '#333333', name: 'color.neutral.700', token: '#333333' },
            { color: '#2A2A2A', name: 'color.neutral.750', token: '#2A2A2A' },
            { color: '#222222', name: 'color.neutral.800', token: '#222222' },
            { color: '#1C1C1C', name: 'color.neutral.850', token: '#1C1C1C' },
            { color: '#161616', name: 'color.neutral.900', token: '#161616' },
            { color: '#111111', name: 'color.neutral.950', token: '#111111' },
          ]} />
          <ColorSubSection label="Brand" chips={[
            { color: '#F5F4FD', name: 'color.brand.25', token: '#F5F4FD' },
            { color: '#E8E6F8', name: 'color.brand.50', token: '#E8E6F8' },
            { color: '#B5B1E2', name: 'color.brand.100', token: '#B5B1E2' },
            { color: '#9791D4', name: 'color.brand.200', token: '#9791D4' },
            { color: '#7B74C4', name: 'color.brand.300', token: '#7B74C4' },
            { color: '#6058B4', name: 'color.brand.400', token: '#6058B4' },
            { color: '#4D469A', name: 'color.brand.500', token: '#4D469A' },
            { color: '#3A3480', name: 'color.brand.600', token: '#3A3480' },
            { color: '#282363', name: 'color.brand.700', token: '#282363' },
          ]} />
          <ColorSubSection label="Red" chips={[
            { color: '#FDEAEB', name: 'color.red.100', token: '#FDEAEB' },
            { color: '#F9C8CA', name: 'color.red.200', token: '#F9C8CA' },
            { color: '#F4A0A4', name: 'color.red.300', token: '#F4A0A4' },
            { color: '#EE7A80', name: 'color.red.400', token: '#EE7A80' },
            { color: '#E76067', name: 'color.red.500', token: '#E76067' },
            { color: '#B84451', name: 'color.red.600', token: '#B84451' },
            { color: '#8A2E38', name: 'color.red.700', token: '#8A2E38' },
          ]} />
          <ColorSubSection label="Orange" chips={[
            { color: '#FEF0E6', name: 'color.orange.100', token: '#FEF0E6' },
            { color: '#FBCFA4', name: 'color.orange.200', token: '#FBCFA4' },
            { color: '#F6A96A', name: 'color.orange.300', token: '#F6A96A' },
            { color: '#F08438', name: 'color.orange.400', token: '#F08438' },
            { color: '#E06418', name: 'color.orange.500', token: '#E06418' },
            { color: '#B34C0C', name: 'color.orange.600', token: '#B34C0C' },
            { color: '#833606', name: 'color.orange.700', token: '#833606' },
          ]} />
          <ColorSubSection label="Yellow" chips={[
            { color: '#FDF8DC', name: 'color.yellow.100', token: '#FDF8DC' },
            { color: '#FAEDAA', name: 'color.yellow.200', token: '#FAEDAA' },
            { color: '#F5DC6A', name: 'color.yellow.300', token: '#F5DC6A' },
            { color: '#ECC824', name: 'color.yellow.400', token: '#ECC824' },
            { color: '#D4AE00', name: 'color.yellow.500', token: '#D4AE00' },
            { color: '#A88900', name: 'color.yellow.600', token: '#A88900' },
            { color: '#7A6400', name: 'color.yellow.700', token: '#7A6400' },
          ]} />
          <ColorSubSection label="Green" chips={[
            { color: '#ECF8ED', name: 'color.green.100', token: '#ECF8ED' },
            { color: '#C9EDCC', name: 'color.green.200', token: '#C9EDCC' },
            { color: '#96DA9C', name: 'color.green.300', token: '#96DA9C' },
            { color: '#5CC066', name: 'color.green.400', token: '#5CC066' },
            { color: '#35A142', name: 'color.green.500', token: '#35A142' },
            { color: '#217D2C', name: 'color.green.600', token: '#217D2C' },
            { color: '#125A1B', name: 'color.green.700', token: '#125A1B' },
          ]} />
          <ColorSubSection label="Teal" chips={[
            { color: '#E0F6F5', name: 'color.teal.100', token: '#E0F6F5' },
            { color: '#B0E8E4', name: 'color.teal.200', token: '#B0E8E4' },
            { color: '#6DD4CC', name: 'color.teal.300', token: '#6DD4CC' },
            { color: '#1FBDB3', name: 'color.teal.400', token: '#1FBDB3' },
            { color: '#05A09A', name: 'color.teal.500', token: '#05A09A' },
            { color: '#007D78', name: 'color.teal.600', token: '#007D78' },
            { color: '#005852', name: 'color.teal.700', token: '#005852' },
          ]} />
          <ColorSubSection label="Light Blue" chips={[
            { color: '#DAF0FA', name: 'color.blue.100', token: '#DAF0FA' },
            { color: '#C2E6F7', name: 'color.blue.200', token: '#C2E6F7' },
            { color: '#7BCCF5', name: 'color.blue.300', token: '#7BCCF5' },
            { color: '#5CB3DF', name: 'color.blue.400', token: '#5CB3DF' },
            { color: '#3E9BCA', name: 'color.blue.500', token: '#3E9BCA' },
            { color: '#2483B3', name: 'color.blue.600', token: '#2483B3' },
            { color: '#16658D', name: 'color.blue.700', token: '#16658D' },
          ]} />
          <ColorSubSection label="Indigo" chips={[
            { color: '#DDE4FA', name: 'color.indigo.100', token: '#DDE4FA' },
            { color: '#B8C6F5', name: 'color.indigo.200', token: '#B8C6F5' },
            { color: '#8EA4EE', name: 'color.indigo.300', token: '#8EA4EE' },
            { color: '#6280E4', name: 'color.indigo.400', token: '#6280E4' },
            { color: '#3D5ED6', name: 'color.indigo.500', token: '#3D5ED6' },
            { color: '#2644B8', name: 'color.indigo.600', token: '#2644B8' },
            { color: '#142E96', name: 'color.indigo.700', token: '#142E96' },
          ]} />
          <ColorSubSection label="Pink" chips={[
            { color: '#FCE6F4', name: 'color.pink.100', token: '#FCE6F4' },
            { color: '#F8C4E4', name: 'color.pink.200', token: '#F8C4E4' },
            { color: '#F296CC', name: 'color.pink.300', token: '#F296CC' },
            { color: '#E865B0', name: 'color.pink.400', token: '#E865B0' },
            { color: '#D03E94', name: 'color.pink.500', token: '#D03E94' },
            { color: '#A82278', name: 'color.pink.600', token: '#A82278' },
            { color: '#7E0D5C', name: 'color.pink.700', token: '#7E0D5C' },
          ]} />
          <ColorSubSection label="Purple" chips={[
            { color: '#F0E6FC', name: 'color.purple.100', token: '#F0E6FC' },
            { color: '#DFC8F8', name: 'color.purple.200', token: '#DFC8F8' },
            { color: '#C9A4F2', name: 'color.purple.300', token: '#C9A4F2' },
            { color: '#B07EE8', name: 'color.purple.400', token: '#B07EE8' },
            { color: '#955DD6', name: 'color.purple.500', token: '#955DD6' },
            { color: '#783FC0', name: 'color.purple.600', token: '#783FC0' },
            { color: '#5A25A4', name: 'color.purple.700', token: '#5A25A4' },
          ]} />
          <PrimitiveOpacitySection />
        </ColorSection>

        {/* Semantic Token */}
        {/* Accent */}
        <ColorSection title="Accent" description="브랜드 경험 전반에서 강조와 인터랙션 hierarchy를 표현하는 색상입니다." childrenGap={60}>
          <ColorSubSection
            label="Primary"
            description="Primary 버튼 등 핵심 액션에 사용하는 기본 브랜드 색상입니다."
            chips={[
              { color: "#7b74c4", name: "color.accent.primary", token: "color.brand.700" },
              { color: "#7b74c4", name: "color.accent.primary-inverse", token: "color.brand.300" },
            ]}
          />
          <ColorSubSection
            label="Secondary"
            description="Secondary 버튼 등 보조 액션에 사용하는 색상입니다. Primary와 함께 배치될 때 시각적 우선순위를 구분하며, 보조 CTA를 표현하는 데 사용합니다."
            chips={[
              { color: "#ffffff", name: "color.accent.secondary", token: "color.common.white" },
              { color: "#e8e6f8", name: "color.accent.secondary-container", token: "color.brand.50" },
            ]}
          />
          <ColorSubSection
            label="Tertiary"
            description="보조 액션에 사용하는 색상입니다. 강조는 필요하지만 시각적 부담을 줄여야 하는 액션에 적합합니다."
            chips={[
              { color: "#4d469a", name: "color.accent.tertiary", token: "color.brand.500" },
              { color: "#f5f4fd", name: "color.accent.tertiary-container", token: "color.brand.25" },
            ]}
          />
        </ColorSection>

        {/* Surface */}
        <ColorSection title="Surface" description="화면의 기본 배경으로 사용되며 레이어 위계에 따라 깊이를 표현하는 색상입니다.">
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <div style={{ background: "#fff", border: "1px solid #e0e0e0", display: "flex", flexDirection: "column", gap: 24, padding: "36px 36px 48px", borderRadius: 8, width: "100%", boxSizing: "border-box" }}>
              <p style={{ margin: 0, fontWeight: 600, color: "#161616", fontSize: 14, lineHeight: "20px", fontFamily: font }}>Light</p>
              <ColorChipGroup chips={[
                { color: "#ffffff", name: "color.surface", token: "color.common.white" },
                { color: "#ffffff", name: "color.surface-bright", token: "color.common.white" },
                { color: "#ffffff", name: "color.surface-container", token: "color.common.white" },
                { color: "#ffffff", name: "color.surface-container-high", token: "color.common.white" },
                { color: "#ffffff", name: "color.surface-container-highest", token: "color.common.white" },
                { color: "rgba(0,0,0,0.8)", name: "color.surface-inverse", token: "color.alpha.black.80" },
              ]} />
            </div>
            <div style={{ background: "#222", border: "1px solid #3d3d3d", display: "flex", flexDirection: "column", gap: 24, padding: "36px 36px 48px", borderRadius: 8, width: "100%", boxSizing: "border-box" }}>
              <p style={{ margin: 0, fontWeight: 600, color: "#fff", fontSize: 14, lineHeight: "20px", fontFamily: font }}>Dark</p>
              <ColorChipGroup dark chips={[
                { color: "#161616", name: "color.surface", token: "color.common.900" },
                { color: "#484848", name: "color.surface-bright", token: "color.neutral.600" },
                { color: "#222222", name: "color.surface-container", token: "color.neutral.800" },
                { color: "#333333", name: "color.surface-container-high", token: "color.neutral.700" },
                { color: "#484848", name: "color.surface-container-highest", token: "color.neutral.600" },
                { color: "rgba(255,255,255,0.8)", name: "color.surface-inverse", token: "color.alpha.white.80" },
              ]} />
            </div>
          </div>
        </ColorSection>

        {/* Fill */}
        <ColorSection title="Fill" description="컨트롤 요소의 상태 변화와 강조 표현에 사용되는 색상입니다." childrenGap={30}>
          <ColorSubSection label="State" chips={[
            { color: "rgba(0,0,0,0.24)", name: "color.fill.inactive", token: "color.alpha.black.24" },
            { color: "#4d469a", name: "color.fill.active", token: "color.brand.300" },
            { color: "rgba(0,0,0,0.08)", name: "color.fill.disabled", token: "color.alpha.black.8" },
          ]} />
          <ColorSubSection label="Emphasis" chips={[
            { color: "#ffffff", name: "color.element.inverse", token: "color.common.white" },
            { color: "rgba(255,255,255,0.8)", name: "color.element.inverse-variant", token: "color.alpha.white.80" },
            { color: "#282363", name: "color.element.brand", token: "color.brand.700" },
            { color: "#3a3480", name: "color.element.brand-variant", token: "color.brand.600" },
          ]} />
        </ColorSection>

        {/* Element */}
        <ColorSection title="Element" description="텍스트, 텍스트 버튼, 아이콘, 노드, 콘텐츠 등 surface와 fill 위에 배치되는 요소에 사용하는 색상입니다." childrenGap={30}>
          <ColorSubSection label="Hierarchy" chips={[
            { color: "#161616", name: "color.element.primary", token: "color.neutral.900" },
            { color: "#484848", name: "color.element.secondary", token: "color.neutral.600" },
            { color: "#636363", name: "color.element.tertiary", token: "color.neutral.500" },
            { color: "#858585", name: "color.element.quaternary", token: "color.neutral.400" },
          ]} />
          <ColorSubSection label="State" chips={[
            { color: "rgba(0,0,0,0.24)", name: "color.element.disabled", token: "color.alpha.black.24" },
          ]} />
          <ColorSubSection label="Contextual" chips={[
            { color: "#ffffff", name: "color.element.inverse", token: "color.common.white" },
            { color: "rgba(255,255,255,0.8)", name: "color.element.inverse-variant", token: "color.alpha.white.80" },
            { color: "#282363", name: "color.element.brand", token: "color.brand.700" },
            { color: "#3a3480", name: "color.element.brand-variant", token: "color.brand.600" },
          ]} />
        </ColorSection>

        {/* Status */}
        <ColorSection title="Status" description="Status color는 상태의 의미와 심각도를 즉각적으로 전달해 사용자가 빠르게 인지하고 적절한 조치를 취하도록 돕기 위한 색상입니다.">
          <ColorSubSection label="Critical" chips={[
            { color: "#fdeaeb", name: "color.error-container", token: "color.red.100" },
            { color: "#f9c8ca", name: "color.error-variant", token: "color.red.200" },
            { color: "#e76067", name: "color.error", token: "color.red.500" },
            { color: "#b84451", name: "color.error-dim", token: "color.red.600" },
          ]} />
        </ColorSection>

        {/* Border */}
        <ColorSection title="Border" description="Border는 배경과 컨테이너를 시각적으로 구분하기 위해 사용되는 아웃라인 색상입니다." childrenGap={30}>
          <ColorSubSection label="Normal" chips={[
            { color: "rgba(0,0,0,0.16)", name: "color.border-normal", token: "color.alpha.black.16" },
            { color: "rgba(0,0,0,0.08)", name: "color.border-normal.variant", token: "color.alpha.black.8" },
          ]} />
          <ColorSubSection label="Solid" chips={[
            { color: "#e0e0e0", name: "color.border-solid", token: "color.neutral.150" },
            { color: "#ebebeb", name: "color.border-solid.variant", token: "color.neutral.100" },
          ]} />
          <ColorSubSection label="State (공통)" chips={[
            { color: "rgba(0,0,0,0.04)", name: "color.border-normal.disabled", token: "color.alpha.black.4" },
          ]} />
        </ColorSection>

        {/* Interaction */}
        <ColorSection title="Interaction" description="Surface 위에 레이어 형태로 적용되는 반투명 색상으로, 사용자의 입력 상태(hover, pressed)를 시각적으로 피드백합니다." childrenGap={30}>
          <ColorSubSection label="Neutral" chips={[
            { color: "rgba(0,0,0,0)", name: "interaction.neutral.normal", token: "color.alpha.black.0" },
            { color: "rgba(0,0,0,0.08)", name: "interaction.neutral.hover", token: "color.alpha.black.8" },
            { color: "rgba(0,0,0,0.12)", name: "interaction.neutral.pressed", token: "color.alpha.black.12" },
          ]} />
          <ColorSubSection label="Inverse" chips={[
            { color: "rgba(255,255,255,0)", name: "interaction.inverse.normal", token: "color.alpha.white.0" },
            { color: "rgba(255,255,255,0.08)", name: "interaction.inverse.hover", token: "color.alpha.white.8" },
            { color: "rgba(255,255,255,0.12)", name: "interaction.inverse.pressed", token: "color.alpha.white.12" },
          ]} />
        </ColorSection>

        </div>{/* end content sections (gap:100) */}

      </div>

      {/* Hover style for copy button */}
      <style>{`
        .color-chip-copy { opacity: 0 !important; }
        div:hover > .color-chip-copy { opacity: 1 !important; }
        .color-chip-copy:hover { background: rgba(0,0,0,0.06) !important; }
      `}</style>
    </div>
  );
}
