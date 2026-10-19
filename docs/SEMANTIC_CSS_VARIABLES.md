# Sports Hub Semantic CSS Variable System

This document outlines the architectural design, token catalog, component usage patterns, and accessibility standards for the semantic CSS variable system implemented in `src/globals.css` and `src/index.css`.

---

## 1. Architectural Overview & Design Philosophy

The Sports Hub portal implements a centralized, tokenized theme architecture supporting seamless toggling between **Light Mode** (established Sports Hub neon-lime brand identity) and **Dark Mode** (layered charcoal/slate athletic substrate).

### Core Principles
1. **Strict Semantic Abstraction**: Components consume semantic role tokens (`--bg-surface`, `--text-secondary`, `--border-default`) rather than hardcoded hex values.
2. **WCAG AA/AAA Verified Contrast**: Every typography token is mathematically verified against all resting and elevated background surfaces.
3. **Color-Only Interpolation**: Theme switching transitions exclusively interpolate color properties (`background-color`, `border-color`, `color`, `fill`, `stroke`, `box-shadow`) over 200–220ms with `cubic-bezier(0.4, 0, 0.2, 1)`, eliminating layout shifts and GPU thrashing.
4. **Dual Ecosystem Compatibility**: Standard CSS custom properties are mirrored into Tailwind CSS v4 `@theme` tokens and Shadcn HSL channel tokens.

---

## 2. Complete Token Map

### 2.1 Background Surfaces (`--bg-*`)

| Token | Light Theme Value | Dark Theme Value | Semantic Role & Typical Component Usage |
|---|---|---|---|
| `--bg-primary` | `#F2F3F7` | `#0E1217` | Page viewport canvas, primary background, full-bleed body backdrops. |
| `--bg-surface` | `#FFFFFF` | `#161B22` | Resting cards, modals, sheets, navigation bar containers, dropdowns. |
| `--bg-elevated` | `#F8FAFC` | `#1F2530` | Hovered cards, table headers, elevated badges, active segmented tabs. |
| `--bg-card` | `#FFFFFF` | `#161B22` | Standard card container surface. |
| `--bg-card-subtle`| `#F2F3F7` | `#1C222C` | Secondary inner card wells, statistic chips, nested list items. |
| `--bg-input` | `#FFFFFF` | `#12161E` | Form inputs, select dropdowns, textareas. |
| `--bg-overlay` | `rgba(10, 13, 20, 0.75)` | `rgba(5, 7, 10, 0.85)` | Modal backdrops, drawer overlays, dialog scrims (with backdrop-blur). |

---

### 2.2 Typography (`--text-*`)

| Token | Light Theme Value | Dark Theme Value (HSL) | Semantic Role & Hierarchy |
|---|---|---|---|
| `--text-primary` | `#222222` | `hsl(210 20% 96%)` (`#F3F4F6`) | Primary headings (H1–H3), high-emphasis titles, active tab labels. |
| `--text-secondary`| `#4B5563` | `hsl(218 11% 85%)` (`#D5D8DD`) | Section descriptions, body paragraphs, card subheadings, metadata. |
| `--text-muted` | `#596372` | `hsl(218 11% 68%)` (`#A4ABB6`) | Secondary captions, timestamps, placeholder text, inactive filter counts. |
| `--text-tertiary` | `#5E6877` | `hsl(215 16% 65%)` (`#94A3B8`) | Table column headers, subtle footnotes, technical specs. |
| `--text-inverse` | `#FFFFFF` | `hsl(213 24% 9%)` (`#11161B`) | Text on contrasting fills (e.g., dark text on `--accent-neon`). |

> **Raw HSL Tokens**: For alpha transparency and Tailwind composition, raw channel tokens are also exported:
> `--text-primary-hsl: 210 20% 96%`
> `--text-secondary-hsl: 218 11% 85%`
> `--text-muted-hsl: 218 11% 68%`
> `--text-tertiary-hsl: 215 16% 65%`

---

### 2.3 Borders & Dividers (`--border-*`)

| Token | Light Theme Value | Dark Theme Value | Semantic Role & Typical Usage |
|---|---|---|---|
| `--border-default` | `#E5EAED` | `#2A313C` | Standard card outlines, navbar border, table cell dividers. |
| `--border-subtle` | `#F2F3F7` | `#1F252E` | Subtle inner card dividers, quiet section separators. |
| `--border-strong` | `#64748B` | `#64748B` | Hovered card borders, active input boundaries, emphasized outlines. |

---

### 2.4 Brand & Accent Colors (`--accent-*`)

| Token | Light Theme Value | Dark Theme Value | Semantic Role & Contrast Rule |
|---|---|---|---|
| `--accent-neon` | `#CDFF00` | `#CDFF00` | Signature Sports Hub neon-lime primary action & active indicator. |
| `--accent-neon-hover`| `#B8E600` | `#D6FF33` | Hover/press state for neon-filled buttons and action pills. |
| `--accent-dark` | `#9ECC00` | `#B8E600` | High-definition border contour for neon buttons on light surfaces. |
| `--accent-subtle` | `#F8FFD9` | `rgba(205, 255, 0, 0.12)` | Subtle pill background, active navigation indicator, card hover tint. |
| `--accent-text` | `#222222` | `#CDFF00` | Accent text color (dark text in light mode, neon-lime in dark mode). |

> **Critical Brand Rule**: Any element utilizing `--accent-neon` (`#CDFF00`) as a solid background fill MUST use dark text (`#11161B` or `#222222`) for guaranteed legibility. White text on `#CDFF00` violates WCAG standards.

---

### 2.5 Status & Feedback

| Token | Light Value | Dark Value | Semantic Purpose |
|---|---|---|---|
| `--danger` | `#DC2626` | `#EF4444` | Error banners, cancellation badges, destructive actions. |
| `--danger-subtle` | `#FEE2E2` | `rgba(239, 68, 68, 0.18)` | Alert background tint. |
| `--danger-text` | `#B91C1C` | `#FCA5A5` | Accessible error message text. |
| `--warning` | `#D97706` | `#F59E0B` | Slot under maintenance, pending verification. |
| `--warning-subtle`| `#FEF3C7` | `rgba(245, 158, 11, 0.18)` | Warning background tint. |
| `--warning-text` | `#B45309` | `#FDE047` | Accessible warning/maintenance message text. |
| `--success` | `#16A34A` | `#22C55E` | Booking confirmed, active pass, verified ground badge. |
| `--success-subtle`| `#DCFCE7` | `rgba(34, 197, 94, 0.18)` | Confirmation background tint. |
| `--success-text` | `#136E34` | `#86EFAC` | Accessible success message text. |

---

## 3. WCAG Contrast Compliance & Calculations

Web Content Accessibility Guidelines (WCAG 2.1) require:
- **Level AA**: Minimum contrast ratio of **4.5:1** for normal text (< 18pt or < 14pt bold) and **3:1** for large text or graphical UI components.
- **Level AAA**: Minimum contrast ratio of **7.0:1** for normal text and **4.5:1** for large text.

### 3.1 Dark Mode Surface Luminance Reference
- Canvas Background (`--bg-primary`: `#0E1217`): Relative Luminance $L = 0.0059$
- Card Surface (`--bg-surface`: `#161B22`): Relative Luminance $L = 0.0107$
- Elevated Surface (`--bg-elevated`: `#1F2530`): Relative Luminance $L = 0.0183$

$$\text{Contrast Ratio} = \frac{L_{\text{lighter}} + 0.05}{L_{\text{darker}} + 0.05}$$

### 3.2 Contrast Verification Matrix

| Dark Theme Variable | Formula / HSL | Contrast on `--bg-primary` | Contrast on `--bg-surface` | Contrast on `--bg-elevated` | WCAG Rating |
|---|---|---|---|---|---|
| `--text-primary` | `hsl(210 20% 96%)` | **17.19 : 1** | **15.83 : 1** | **14.07 : 1** | **Passes AAA** |
| `--text-secondary` | `hsl(218 11% 85%)` | **13.15 : 1** | **12.11 : 1** | **10.76 : 1** | **Passes AAA** |
| `--text-muted` | `hsl(218 11% 68%)` | **8.12 : 1** | **7.48 : 1** | **6.65 : 1** | **Passes AAA / AA** |
| `--text-tertiary` | `hsl(215 16% 65%)` | **7.33 : 1** | **6.75 : 1** | **6.00 : 1** | **Passes AA** |
| `--accent-neon` | `#CDFF00` | **15.34 : 1** | **14.13 : 1** | **12.56 : 1** | **Passes AAA** |

### 3.3 Light Mode Contrast Reference
- Primary Headings (`#222222`) on White Surface (`#FFFFFF`): **16.06 : 1** (Passes AAA)
- Secondary Body (`#4B5563`) on White Surface (`#FFFFFF`): **7.56 : 1** (Passes AAA)
- Secondary Body (`#4B5563`) on Primary Canvas (`#F2F3F7`): **6.82 : 1** (Passes AA)
- Muted Text (`#596372`) on Primary Canvas (`#F2F3F7`): **5.49 : 1** (Passes AA)

---

## 4. Component Usage Guidelines

### 4.1 Applying Variables in CSS & Tailwind

#### Recommended: Standard CSS Variables
```css
.sports-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sports-card:hover {
  background-color: var(--bg-elevated);
  border-color: var(--accent-neon);
  box-shadow: 0 10px 24px -4px var(--shadow-color), 0 0 0 1px var(--accent-neon);
}
```

#### Tailwind Classes (Mapped via `@theme` in `index.css`)
```tsx
// Card Component
<div className="bg-bg-surface hover:bg-bg-elevated border border-border-default hover:border-accent-neon rounded-2xl p-6 transition-colors duration-200">
  <h3 className="text-text-primary font-bold text-lg">Morning Tournament</h3>
  <p className="text-text-secondary text-sm mt-1">Court 3 · Multi-sport arena</p>
  <span className="text-text-muted text-xs font-mono">08:00 AM - 10:00 AM</span>
</div>
```

### 4.2 Buttons with Brand Accents
Always follow the dual-contrast rule for primary action buttons:

```tsx
// Correct: Neon lime background paired strictly with dark text
<button className="px-5 py-2.5 bg-[#CDFF00] hover:bg-[#D6FF33] active:bg-[#B8E600] text-[#11161B] font-extrabold text-sm rounded-xl border border-[#9ECC00] shadow-xs active:scale-[0.98] transition-all">
  Book Venue
</button>

// Anti-pattern: DO NOT use white text or transparent text on neon lime
// <button className="bg-[#CDFF00] text-white"> ❌ FAILS WCAG (1.3:1)
```

### 4.3 Form Controls
Form inputs must preserve crisp focus definition in both themes without causing layout jumps:

```css
input, textarea, select {
  background-color: var(--bg-input);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  border-radius: var(--radius);
  transition-property: border-color, box-shadow, background-color;
  transition-duration: 200ms;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--accent-neon) !important;
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-subtle);
}

input::placeholder {
  color: var(--text-muted);
}
```

---

## 5. Transition & Animation Architecture

### 5.1 The `theme-transitioning` State
Theme switches are orchestrated via `useTheme.ts`:
1. `html.theme-transitioning` is appended to the root document.
2. `data-theme="dark"` (or `"light"`) and `.dark` class are updated.
3. For **220ms**, the following scoped transition rule guarantees smooth color blending across all elements (including active hover states):

```css
html.theme-transitioning,
html.theme-transitioning * {
  transition-property: 
    background-color,
    border-color,
    color,
    fill,
    stroke,
    box-shadow,
    outline-color,
    opacity !important;
  transition-duration: 220ms !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
  transition-delay: 0s !important;
}
```
4. After **250ms**, `theme-transitioning` is automatically stripped, restoring native micro-interactions and Framer Motion spring physics.

### 5.2 Floating Action Buttons (FAB) & Micro-Interactions
The floating back-to-top button uses `.floating-btn`:
- **Resting**: Smooth elevation and transform hints.
- **Hover**: Subtle lift (`translateY(-2px) scale(1.02)`).
- **Active**: Constrained scale (`scale(0.98)` with a rapid 100ms `cubic-bezier(0.2, 0, 0, 1)` response) designed to handle rapid clicking without layout stutter.

---

## 6. How to Maintain WCAG Contrast Standards for Future Updates

When adding new color variables or adjusting existing tokens, follow this 4-step checklist:

### Step 1: Compute Relative Luminance ($L$)
For any sRGB color $R, G, B \in [0, 255]$:
1. Normalize channels: $c = C / 255$.
2. Linearize:
   $$c_{\text{linear}} = \begin{cases} \frac{c}{12.92} & \text{if } c \le 0.04045 \\ \left(\frac{c + 0.055}{1.055}\right)^{2.4} & \text{otherwise} \end{cases}$$
3. Compute luminance:
   $$L = 0.2126 \cdot r_{\text{linear}} + 0.7152 \cdot g_{\text{linear}} + 0.0722 \cdot b_{\text{linear}}$$

### Step 2: Validate Against Dark Surfaces
- Calculate contrast against `--bg-surface` ($L = 0.0107$) and `--bg-primary` ($L = 0.0059$).
- To pass **WCAG AA (4.5:1)** against `--bg-surface`:
  $$L_{\text{text}} \ge 4.5 \times (0.0107 + 0.05) - 0.05 = 0.2232$$
  In HSL with $H \approx 218^{\circ}, S \approx 11\%$, this requires lightness $L_{\text{hsl}} \ge 60\%$.
  Setting `--text-muted` to $L_{\text{hsl}} = 68\%$ gives $L_{\text{linear}} = 0.4037$, comfortably achieving **7.48:1** contrast.

### Step 3: Synchronize Dual Tokens
Whenever a semantic variable is adjusted in `src/globals.css`:
- Update the functional CSS property (e.g., `--text-muted: hsl(218 11% 68%);`).
- Update the raw HSL token (e.g., `--text-muted-hsl: 218 11% 68%;`).
- Update the corresponding Shadcn mapping in dark mode (e.g., `--muted-foreground: 218 11% 68%;`).

### Step 4: Run Verification
Run the compiler and linter to confirm zero build errors:
```bash
npm run build
npm run lint
```
