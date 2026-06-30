---
name: Precision & Ink
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#3d494a'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#6d797b'
  outline-variant: '#bcc9ca'
  surface-tint: '#006970'
  primary: '#006970'
  on-primary: '#ffffff'
  primary-container: '#00a3ad'
  on-primary-container: '#003235'
  inverse-primary: '#5dd8e2'
  secondary: '#555f71'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f6'
  on-secondary-container: '#596376'
  tertiary: '#595f66'
  on-tertiary: '#ffffff'
  tertiary-container: '#8d949b'
  on-tertiary-container: '#262d33'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#5dd8e2'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#d9e3f9'
  secondary-fixed-dim: '#bdc7dc'
  on-secondary-fixed: '#121c2c'
  on-secondary-fixed-variant: '#3d4759'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built for a professional printing service that balances industrial reliability with modern digital convenience. The brand personality is **Precise, Technical, and Dependable**. It avoids unnecessary flourish in favor of clarity and utility, reflecting the high-fidelity output of modern print machinery.

The visual style is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes generous whitespace to mimic a clean canvas or unprinted paper, high-contrast typography for legibility, and a structured grid that evokes the precision of trim lines and registration marks. The emotional response should be one of confidence: the user should feel that their project is in expert, capable hands.

## Colors

The palette is centered around a vibrant **Turquoise Blue (Biru Toska)**, which represents modern ink and digital precision. This primary color is used for key actions, brand accents, and indicating active states.

- **Primary (#00A3AD):** Used for primary buttons, active navigation links, and brand-defining elements.
- **Secondary (#2D3748):** A deep charcoal used for primary headings and heavy text to ensure maximum readability and a professional weight.
- **Neutral / Background (#F7FAFC):** A very light, cool-toned gray that provides a cleaner, more "industrial-chic" feel than pure white, reducing screen glare.
- **Surface / Border (#E2E8F0):** Used for UI borders and secondary containers to maintain structure without adding visual noise.

## Typography

The typography strategy uses **Hanken Grotesk** for its sharp, contemporary geometric forms that feel engineered yet approachable. It provides the high readability required for service lists and pricing tables.

To emphasize the technical aspect of the printing industry (specs, dimensions, and paper weights), **JetBrains Mono** is introduced for labels and metadata. This monospaced font signals precision and mimics technical print job tickets.

- Use **Display** for landing page heroes.
- Use **Headline-lg** for main section titles.
- Use **Body-md** for general descriptive text and instructions.
- Use **Label-md** for technical specifications, dimensions (e.g., "A4 • 210 x 297 mm"), and status indicators.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to maintain a structured, editorial feel, while transitioning to a **Fluid Grid** on mobile.

- **Desktop (1024px+):** 12-column grid with a 1280px max-width. 24px gutters provide breathing room between service cards.
- **Tablet (768px - 1023px):** 8-column grid with 24px margins.
- **Mobile (Up to 767px):** 4-column grid with 16px margins. 

The vertical rhythm is strictly based on a 4px baseline unit. Component internal padding should always be a multiple of 4 (e.g., 12px, 16px, 24px) to ensure technical alignment across the interface.

## Elevation & Depth

This design system uses **Tonal Layers** and **Low-contrast outlines** rather than heavy shadows to convey depth. This mimics the flat, stacked nature of paper and printed media.

- **Level 0 (Background):** Neutral gray (#F7FAFC).
- **Level 1 (Cards/Containers):** Solid White (#FFFFFF) with a 1px border (#E2E8F0). No shadow.
- **Level 2 (Hover/Active):** Primary color border (#00A3AD) or a very subtle, tight ambient shadow (0px 2px 4px rgba(0,0,0,0.05)) to indicate interactivity.
- **Modals/Overlays:** Large, diffused shadow (0px 20px 25px -5px rgba(0,0,0,0.1)) to clearly separate the action from the background grid.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the industrial aesthetic, making the professional service feel accessible. 

- **Buttons & Inputs:** Use the standard 0.25rem (4px) radius.
- **Service Cards:** Use `rounded-lg` (0.5rem / 8px) to softly frame product images (like business cards or banners).
- **Status Pills:** Use `rounded-full` (Pill-shaped) for technical status labels (e.g., "In Production", "Shipped").

## Components

### Buttons
- **Primary:** Background #00A3AD, Text #FFFFFF. Bold, sans-serif, 16px.
- **Secondary:** Transparent background, Border 1px #00A3AD, Text #00A3AD.
- **States:** Hover should darken the primary color by 10%. Active state should show a slight scale-down (98%) to provide tactile feedback.

### Cards
- White background, 1px #E2E8F0 border.
- Headlines in Secondary color (#2D3748).
- Use JetBrains Mono for "Price from" labels in the bottom corner.

### Input Fields
- 1px border (#E2E8F0). On focus, border changes to Primary (#00A3AD) with a 2px outer glow of the same color at 20% opacity.
- Labels use Hanken Grotesk 14px Medium.

### Navigation
- Top-bar navigation with a fixed height (72px).
- Active links marked by a 3px bottom border in Primary color.
- Use a "Request Quote" primary button as the persistent CTA in the top right.

### Technical Specification List
- For product details (Paper weight, Finish, Size), use a horizontal list with JetBrains Mono, separated by light vertical dividers (|) to maintain the technical vibe of a print shop.