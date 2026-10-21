---
name: Linguistic Clarity
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff3ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fd'
  surface-container-highest: '#d9e3f7'
  on-surface: '#121c2a'
  on-surface-variant: '#404940'
  inverse-surface: '#273140'
  inverse-on-surface: '#ebf1ff'
  outline: '#707a6f'
  outline-variant: '#bfc9bd'
  surface-tint: '#1f6c3a'
  primary: '#004c22'
  on-primary: '#ffffff'
  primary-container: '#166534'
  on-primary-container: '#93e0a2'
  inverse-primary: '#8bd79b'
  secondary: '#006d3e'
  on-secondary: '#ffffff'
  secondary-container: '#8cf5b2'
  on-secondary-container: '#007241'
  tertiary: '#38443d'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f5b54'
  on-tertiary-container: '#c5d2ca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f4b5'
  primary-fixed-dim: '#8bd79b'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#8ff8b4'
  secondary-fixed-dim: '#73db9a'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522d'
  tertiary-fixed: '#d9e6dd'
  tertiary-fixed-dim: '#bdcac1'
  on-tertiary-fixed: '#131e19'
  on-tertiary-fixed-variant: '#3e4943'
  background: '#f9f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f7'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1100px
  gutter: 24px
---

## Brand & Style

The brand personality focuses on cognitive ease, clarity, and encouragement. Designed for learners who find traditional educational tools overwhelming, this design system prioritizes a distraction-free environment that fosters focus and long-term retention. 

The style is **Refined Minimalism** with a **Tactile Softness**. It utilizes generous whitespace to reduce visual noise, ensuring that the vocabulary content remains the sole hero of the interface. While the aesthetic is clean and systematic, the use of large corner radii and soft mint accents prevents the UI from feeling clinical, instead evoking a sense of growth, freshness, and accessibility.

## Colors

The palette is built on a "Green Growth" foundation. 
- **Primary (#166534):** Used for high-contrast text on light backgrounds and for icons that require immediate recognition.
- **Secondary (#86EFAC):** The action color. Used for primary button backgrounds and active states to provide a fresh, energetic feel.
- **Tertiary (#F0FDF4):** A soft wash used for card backgrounds, highlights, and subtle containers to differentiate sections without adding heavy borders.
- **Neutral (#374151):** Reserved for body text to ensure AA/AAA accessibility compliance against white backgrounds.
- **Borders (#E5E7EB):** Extremely subtle to maintain the minimalist "borderless" aesthetic where possible.

## Typography

This design system employs **Inter** for its exceptional legibility and neutral, modern tone. 

- **Headlines:** Use tighter letter spacing and heavier weights to create a strong visual anchor for vocabulary words.
- **Body Text:** Uses a generous line height (1.5x+) to improve readability for learners who may be unfamiliar with certain character combinations.
- **Labels:** Utilized for metadata (e.g., part of speech, word origin). Small labels use a slightly heavier weight to ensure they remain legible at 12px.

## Layout & Spacing

The layout follows a **Fixed Centered Grid** for desktop to prevent line lengths from becoming too long, which preserves reading focus. 

- **Desktop:** 12-column grid within an 1100px container.
- **Tablet:** 8-column fluid grid with 32px side margins.
- **Mobile:** Single column with 20px side margins and increased vertical rhythm to prevent accidental taps.

The spacing philosophy uses a base-8 scale. Larger vertical gaps (48px+) are encouraged between different learning modules to signal a clear mental "break" or transition.

## Elevation & Depth

Depth is handled with extreme restraint to maintain the minimalist ethos.
- **Level 0 (Base):** Pure white (#FFFFFF) for the main background.
- **Level 1 (Cards):** Uses a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)) and a subtle #E5E7EB border. This makes interactive learning cards feel "lifted" and touchable.
- **Level 2 (Active/Hover):** When a user interacts with a card, the shadow deepens slightly (0px 8px 30px rgba(0, 0, 0, 0.08)) to provide tactile feedback.

Avoid using heavy inner shadows or dark overlays. Use **Tertiary Green (#F0FDF4)** fills to indicate containment instead of shadows whenever possible.

## Shapes

The shape language is defined by **Large Radii**. 
- **Standard Elements:** Buttons and input fields use 0.5rem (8px).
- **Cards & Containers:** Learning cards and progress panels use 1rem (16px) or 1.5rem (24px) for larger desktop views.

This roundedness communicates friendliness and reduces the "formality" of the learning process, making the application feel more like a supportive tool than a rigid textbook.

## Components

### Buttons
- **Primary:** Background #86EFAC, Text #166534. Solid fill, no border. High contrast and highly visible.
- **Secondary/Outlined:** Background transparent, Border 1.5px #E5E7EB, Text #374151. Used for less critical actions like "View Examples."

### Progress Trackers
- **Linear Progress:** A thick 8px bar with a light gray background and a #86EFAC fill. The "cap" of the progress bar should be rounded.
- **Success Indicators:** Use a small circular badge with the Tertiary Green background and a Primary Green checkmark.

### Vocabulary Cards
The core component. A white background with Level 1 elevation. The target word should be in `headline-lg`, while the definition sits in `body-md`. 

### Data Tables
Used for "Word Lists." Keep these exceptionally clean: remove vertical grid lines. Use horizontal separators in #E5E7EB only. The header row should use `label-sm` in a medium-gray shade.

### Inputs
Search bars and text entries use a 1.5px border in #E5E7EB. On focus, the border transitions to #86EFAC with a soft glow (ring) to guide the user's attention.