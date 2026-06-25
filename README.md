# Kiddo — Server-Driven UI (SDUI) Renderer

A production-ready, configuration-driven React Native homepage renderer built for Kiddo, a Q-commerce platform for kids & baby essentials.

---

## Architecture Overview

```
App.tsx
 └── CartProvider (external store — zero tree re-renders on cart mutation)
      └── CampaignProvider (runtime campaign switcher)
           └── ThemeProvider (OTA theme injection from payload)
                └── HomeScreen
                     ├── Header (cart badge, campaign badge)
                     ├── CampaignSwitcher (runtime campaign toggle)
                     ├── FlatList (single vertical master feed)
                     │    ├── BlockItem (memo boundary per block)
                     │    │    ├── BannerHero
                     │    │    ├── ProductGrid2x2
                     │    │    │    └── ProductCard × 4 (each isolated memo)
                     │    │    └── DynamicCollection
                     │    │         └── FlatList (horizontal, nestedScrollEnabled)
                     │    │              └── CollectionItemCard × N (each isolated)
                     │    └── [unknown types silently dropped]
                     └── CampaignOverlay (pointerEvents="none", animated confetti)
```

---

## Core Requirements Coverage

### A. JSON Schema & Component Registry

- **Mock Payload** (`src/data/mockPayload.ts`): 10 blocks including all 3 types + 1 unknown block (`NEW_COMPONENT_V2`) to test resilience.
- **Component Registry** (`src/registry/componentRegistry.tsx`): Hash-map `Record<string, BlockRenderer>` — no switch/case. O(1) lookup. Unknown types are **silently dropped** with a `console.warn`, preserving full view tree stability.
- **Extensibility**: `registerBlock()` allows runtime registration of new component types without app releases.

### B. Dynamic Collections & Virtualization

`DynamicCollection.tsx` renders a **horizontal FlatList nested inside the vertical master FlatList** with:

| Optimization | Implementation |
|---|---|
| Nested scroll decoupling | `nestedScrollEnabled` prop + `isHorizontalScrolling` ref tracking |
| Fixed item layout | `getItemLayout` returns constant `{length: 142, offset: 142*index}` — eliminates dynamic measurement |
| Batch rendering | `maxToRenderPerBatch={4}`, `windowSize={5}`, `initialNumToRender={4}` |
| Memory management | `removeClippedSubviews` on Android |
| Stable keys | `keyExtractor` uses item `id`, not index — prevents unnecessary remounts |

### C. Universal Action Dispatcher

`src/actions/actionDispatcher.ts` — centralized `handleAction(action)`:

- **Hash-map handler registry** — no switch blocks, easily extensible
- **Type-safe** — TypeScript `ActionType` discriminated union
- **Defensive** — unknown action types logged and dropped without crash
- **Decoupled** — UI components are completely ignorant of business logic

**Supported actions:**
- `ADD_TO_CART` — updates external cart store
- `DEEP_LINK` — navigation (router.push in production)
- `APPLY_MYSTERY_GIFT_COUPON` — campaign coupon logic
- `BOOK_EVENT` — event booking
- `OPEN_CAMPAIGN` / `DISMISS_OVERLAY` — campaign management

### D. High Frame-Rate Optimization

| Technique | Details |
|---|---|
| Single vertical FlatList | All blocks rendered in one `FlatList` — no nested vertical lists |
| `React.memo` boundaries | Every component wrapped: `HomeScreen`, `BlockItem`, `BannerHero`, `ProductGrid2x2`, `ProductCard`, `DynamicCollection`, `CollectionItemCard`, `CampaignSwitcher`, `CampaignOverlay` |
| `keyExtractor` stability | Uses `item.id` — prevents index-based remounts on data changes |
| `maxToRenderPerBatch` | 3 blocks per batch — smooth 60fps scroll |
| `windowSize={7}` | 7 screen heights of content kept in memory |
| `scrollEventThrottle={16}` | 60fps scroll event sampling |

---

## Advanced Deliverables

### Campaign Engine (3 Campaigns)

Switch campaigns at runtime via the pill switcher at the top of the screen:

| Campaign | Theme Colors | Overlay |
|---|---|---|
| **Back to School Mega-Sale** | Yellow + Deep Blue | Lottie (paper airplanes/pencils) |
| **Summer Playhouse** | Ocean Blue + Teal | WebP water splash animation |
| **Mystery Gift Carnival** | Carnival Red + Purple | Native Animated confetti burst |

Each campaign:
1. Injects its `Theme` into `ThemeContext` — all child components update colors via `useTheme()`
2. Renders a `CampaignOverlay` with `pointerEvents="none"` — zero input occlusion
3. Displays a campaign badge in the header

### OTA Runtime Theming

The payload's `theme` object is injected into `ThemeContext` at the root. Every child component uses `useTheme()` — no hardcoded colors anywhere. Campaign themes override the base theme via a `useMemo` merge in `App.tsx`.

### Local State Collocation — The Key Architecture

```
Cart mutation flow:
  ProductCard.onPress → handleAction(ADD_TO_CART) → cartStore.addItem()
                                                          ↓
                                               cartStore.notify() [set of listeners]
                                                          ↓
                              ┌─────────────────────────────────────────────┐
                              │  useProductQuantity('p1') listener → setQty │  ← Only THIS card re-renders
                              │  useProductQuantity('p2') listener → compare │  ← No change, NO re-render
                              │  useCartTotalCount() listener → setCount     │  ← Only header badge re-renders
                              │  All other 30+ blocks → NOT subscribed       │  ← ZERO re-renders
                              └─────────────────────────────────────────────┘
```

**The `CartStore` is an external store (not React state)** — it holds state in a plain class with a listener Set. Components subscribe only to their specific slice:
- `useProductQuantity(id)` — re-renders only when that specific product's quantity changes
- `useCartTotalCount()` — re-renders only the cart badge

This is the same pattern used by Zustand, Redux, and Jotai — **bypassing the React tree entirely**.

---

## Structural Resilience

Tested with an unknown block type `NEW_COMPONENT_V2` in the payload:

```
[ComponentRegistry] Unknown block type "NEW_COMPONENT_V2" — dropped gracefully
```

The surrounding view tree is completely unaffected. Each renderer is wrapped in try/catch for additional fault isolation.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Type-check (strict mode)
npm run type-check
```

### Flash List (Recommended Upgrade)

The app is architected to swap `FlatList` for `@shopify/flash-list` with zero component changes:

```tsx
// In HomeScreen.tsx — replace:
import { FlatList } from 'react-native';
// with:
import { FlashList } from '@shopify/flash-list';
// Add estimatedItemSize={200} prop
```

---

## File Structure

```
kiddo-sdui/
├── App.tsx                          # Root: providers hierarchy
├── src/
│   ├── types/index.ts               # Full TypeScript strict definitions
│   ├── data/
│   │   └── mockPayload.ts           # SDUI payload + 3 campaign configs
│   ├── context/
│   │   ├── ThemeContext.tsx          # OTA theme injection
│   │   ├── CartContext.tsx           # External store — zero re-render cart
│   │   └── CampaignContext.tsx       # Runtime campaign switcher
│   ├── actions/
│   │   └── actionDispatcher.ts      # Universal action handler (hash-map)
│   ├── registry/
│   │   └── componentRegistry.tsx    # Factory pattern block renderer
│   └── components/
│       ├── HomeScreen.tsx            # Master vertical FlatList engine
│       ├── BannerHero.tsx            # BANNER_HERO block
│       ├── ProductGrid2x2.tsx        # PRODUCT_GRID_2X2 block
│       ├── ProductCard.tsx           # Isolated memo card (cart-aware)
│       ├── DynamicCollection.tsx     # DYNAMIC_COLLECTION (nested horiz. FlatList)
│       ├── CollectionItem.tsx        # Horizontal item card
│       ├── CampaignOverlay.tsx       # Full-screen confetti (pointerEvents=none)
│       ├── CampaignSwitcher.tsx      # Runtime campaign toggle UI
│       └── CartBadge.tsx             # Isolated cart count badge
```
