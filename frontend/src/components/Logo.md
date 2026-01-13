# Logo Component Documentation

## Overview

The Logo component is a flexible, animated logo component for LatamFi with multiple variants and customization options.

## Usage

### Basic Usage

```tsx
import { Logo } from "@/components/Logo";

// Full logo (icon + text)
<Logo />

// With custom size
<Logo size="lg" />

// Icon only
<Logo variant="iconOnly" />

// Text only
<Logo variant="textOnly" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the logo |
| `variant` | `"full" \| "iconOnly" \| "textOnly"` | `"full"` | Logo variant |
| `animated` | `boolean` | `false` | Enable subtle animations |
| `showGlow` | `boolean` | `false` | Show glow effect (only with animated) |
| `className` | `string` | - | Additional CSS classes |

## Variants

### Full Logo
Shows both icon and text (default).

```tsx
<Logo variant="full" />
```

### Icon Only
Shows only the "L" with growth arrow icon.

```tsx
<Logo variant="iconOnly" />
```

### Text Only
Shows only "LatamFi" text.

```tsx
<Logo variant="textOnly" />
```

## Convenience Exports

For easier usage, you can import specific variants:

```tsx
import { LogoIcon, LogoText } from "@/components/Logo";

// Icon only
<LogoIcon size="md" animated={true} />

// Text only
<LogoText size="lg" />
```

## Sizes

- `sm`: 32px icon, `text-lg`
- `md`: 48px icon, `text-xl` (default)
- `lg`: 64px icon, `text-2xl`
- `xl`: 96px icon, `text-3xl`

## Animations

When `animated={true}`, the logo includes:

1. **Fade In**: Smooth entrance animation
2. **Pulse**: Subtle pulsing effect on the icon circle
3. **Shimmer**: Gentle brightness animation on the logo icon
4. **Glow**: Optional glow effect around the icon (requires `showGlow={true}`)

### Animation Details

- **Pulse**: 3s infinite, subtle scale and opacity changes
- **Glow**: 3s infinite, soft shadow animation
- **Fade In**: 0.6s one-time entrance
- **Shimmer**: 2s infinite, brightness variation

## Examples

### Animated Logo with Glow

```tsx
<Logo 
  size="xl" 
  variant="full" 
  animated={true} 
  showGlow={true} 
/>
```

### Icon Only for Favicon/App Icon

```tsx
<LogoIcon size="sm" />
```

### Text Only for Footer

```tsx
<LogoText size="sm" />
```

### Header Logo

```tsx
<Logo size="md" variant="full" animated={true} />
```

## SVG Optimization

The lightning bolt SVG is optimized with:
- Clean path definition
- Proper viewBox
- Minimal code
- Accessibility attributes

## Performance

- Animations use CSS transforms (GPU accelerated)
- No JavaScript animations (pure CSS)
- Respects `prefers-reduced-motion` (can be added)

