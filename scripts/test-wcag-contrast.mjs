/**
 * Dynamic Contrast & WCAG 2.1 AA/AAA Compliance Test Suite
 * Tests all text elements and theme color pairings in the Sports Hub design system.
 */

function sRGBtoLin(colorChannel) {
  return colorChannel <= 0.03928
    ? colorChannel / 12.92
    : Math.pow((colorChannel + 0.055) / 1.055, 2.4);
}

function parseHex(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const intVal = parseInt(clean, 16);
  return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
}

function getLuminance([r, g, b]) {
  return (
    0.2126 * sRGBtoLin(r / 255) +
    0.7152 * sRGBtoLin(g / 255) +
    0.0722 * sRGBtoLin(b / 255)
  );
}

function calculateContrast(fgColor, bgColor) {
  const fgRgb = typeof fgColor === 'string' ? parseHex(fgColor) : fgColor;
  const bgRgb = typeof bgColor === 'string' ? parseHex(bgColor) : bgColor;
  const l1 = getLuminance(fgRgb);
  const l2 = getLuminance(bgRgb);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function alphaBlend(fgHex, bgHex, alpha) {
  const [fgR, fgG, fgB] = parseHex(fgHex);
  const [bgR, bgG, bgB] = parseHex(bgHex);
  return [
    Math.round(fgR * alpha + bgR * (1 - alpha)),
    Math.round(fgG * alpha + bgG * (1 - alpha)),
    Math.round(fgB * alpha + bgB * (1 - alpha)),
  ];
}

// 1. Core Design Tokens from globals.css
const TOKENS = {
  light: {
    '--bg-primary': '#F2F3F7',
    '--bg-surface': '#FFFFFF',
    '--bg-elevated': '#F8FAFC',
    '--bg-card': '#FFFFFF',
    '--bg-card-subtle': '#F2F3F7',
    '--text-primary': '#222222',
    '--text-secondary': '#4B5563',
    '--text-muted': '#596372',
    '--text-tertiary': '#5E6877',
    '--accent-neon': '#CDFF00',
    '--accent-subtle': '#F8FFD9',
    '--btn-dark': '#11161B',
  },
  dark: {
    '--bg-primary': '#0E1217',
    '--bg-surface': '#161B22',
    '--bg-elevated': '#1F2530',
    '--bg-card': '#161B22',
    '--bg-card-subtle': '#1C222C',
    '--text-primary': '#F3F4F6', // hsl(210 20% 96%)
    '--text-secondary': '#D5D8DD', // hsl(218 11% 85%)
    '--text-muted': '#A4ABB6', // hsl(218 11% 68%)
    '--text-tertiary': '#94A3B8', // hsl(215 16% 65%)
    '--accent-neon': '#CDFF00',
    '--btn-dark': '#11161B',
  },
};

// 2. Elements under test in the Ecosystem Interactive section
const SECTION_ELEMENTS = [
  {
    name: 'Section Eyebrow Badge',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--accent-subtle'],
    bgDark: alphaBlend('#CDFF00', TOKENS.dark['--bg-primary'], 0.1),
    sampleText: 'Interactive Architecture',
  },
  {
    name: 'Section Heading (H2)',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-surface'],
    bgDark: TOKENS.dark['--bg-primary'],
    sampleText: 'Explore the Connected Sports Ecosystem',
  },
  {
    name: 'Section Subtitle / Description',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-surface'],
    bgDark: TOKENS.dark['--bg-primary'],
    sampleText: 'Click or hover any node below to inspect...',
  },
  {
    name: 'Ecosystem Top Header Status',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-surface'],
    bgDark: TOKENS.dark['--bg-primary'],
    sampleText: 'Connected Sports Ecosystem',
  },
  {
    name: 'Ecosystem Top Action Pill',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--accent-subtle'],
    bgDark: alphaBlend('#CDFF00', TOKENS.dark['--bg-primary'], 0.1),
    sampleText: 'Click or Hover Any Node',
  },
  {
    name: 'Central Core Badge Label',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'THE DIGITAL CORE',
  },
  {
    name: 'Central Core Headline',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'SPORTS HUB',
  },
  {
    name: 'Central Core Subtitle',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'Interconnected Network',
  },
  {
    name: 'Satellite Node Label (Normal)',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-surface'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'Competitions',
  },
  {
    name: 'Satellite Node Label (Selected)',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'Facilities',
  },
  {
    name: 'Callout Eyebrow Category',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'LEAGUES & TOURNAMENTS',
  },
  {
    name: 'Callout Active Node Title',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'Competitions',
  },
  {
    name: 'Callout Highlight Text',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'Tiered tournaments & regional qualifiers',
  },
  {
    name: 'Callout Value Prop Body',
    textVar: '--text-primary',
    bgLight: TOKENS.light['--bg-elevated'],
    bgDark: TOKENS.dark['--bg-surface'],
    sampleText: 'Automated brackets, live scoring, team rosters...',
  },
  {
    name: 'Primary Inquire Button Text',
    textHex: TOKENS.light['--btn-dark'],
    bgLight: TOKENS.light['--accent-neon'],
    bgDark: TOKENS.dark['--accent-neon'],
    sampleText: 'Inquire as Competitions',
  },
  {
    name: 'Secondary Opportunities Button Text',
    textVar: '--text-primary',
    bgLight: alphaBlend('#000000', TOKENS.light['--bg-elevated'], 0.05),
    bgDark: alphaBlend('#FFFFFF', TOKENS.dark['--bg-surface'], 0.1),
    sampleText: 'Explore Opportunities',
  },
];

console.log('='.repeat(80));
console.log('  WCAG 2.1 AA/AAA DYNAMIC CONTRAST TEST REPORT: ECOSYSTEM SECTION');
console.log('='.repeat(80));

let passCount = 0;
let failCount = 0;

for (const el of SECTION_ELEMENTS) {
  const lightText = el.textHex || TOKENS.light[el.textVar];
  const darkText = el.textHex || TOKENS.dark[el.textVar];

  const lightRatio = calculateContrast(lightText, el.bgLight);
  const darkRatio = calculateContrast(darkText, el.bgDark);

  const lightPass = lightRatio >= 4.5;
  const darkPass = darkRatio >= 4.5;
  const lightAAA = lightRatio >= 7.0;
  const darkAAA = darkRatio >= 7.0;

  if (lightPass && darkPass) {
    passCount++;
  } else {
    failCount++;
  }

  const statusLabel =
    lightPass && darkPass
      ? `PASS (${lightAAA && darkAAA ? 'AAA' : 'AA'})`
      : 'FAIL';

  console.log(`\n[${statusLabel}] ${el.name}`);
  console.log(`  Sample: "${el.sampleText}"`);
  console.log(
    `  Light Theme: ${lightRatio.toFixed(2)}:1 [${lightAAA ? 'AAA >= 7.0:1' : lightPass ? 'AA >= 4.5:1' : 'FAIL < 4.5:1'}]`
  );
  console.log(
    `  Dark Theme:  ${darkRatio.toFixed(2)}:1 [${darkAAA ? 'AAA >= 7.0:1' : darkPass ? 'AA >= 4.5:1' : 'FAIL < 4.5:1'}]`
  );
}

console.log('\n' + '='.repeat(80));
console.log(`RESULTS: ${passCount} PASSED, ${failCount} FAILED out of ${SECTION_ELEMENTS.length} elements`);
console.log(`WCAG 2.1 AA Compliance (>= 4.5:1): ${failCount === 0 ? '100% STRICT COMPLIANT' : 'NON-COMPLIANT'}`);
console.log('='.repeat(80));

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
