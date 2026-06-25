/**
 * Component Registry — Factory Pattern
 *
 * Maps server-declared block type strings to React component renderers.
 * Uses a hash-map (Record<string, Renderer>) rather than switch/case blocks
 * for O(1) lookup, clean scalability, and easy runtime registration.
 *
 * Unknown types are silently dropped — the registry returns null and the
 * engine skips rendering, preserving surrounding view tree stability.
 */

import React from 'react';
import { AnyBlock, BannerHeroBlock, ProductGrid2x2Block, DynamicCollectionBlock } from '../types';
import BannerHero from '../components/BannerHero';
import ProductGrid2x2 from '../components/ProductGrid2x2';
import DynamicCollection from '../components/DynamicCollection';

type BlockRenderer<T extends AnyBlock = AnyBlock> = (block: T) => React.ReactElement | null;

// ─── Registry Map ─────────────────────────────────────────────────────────────

const registry: Record<string, BlockRenderer<any>> = {
  BANNER_HERO: (block: BannerHeroBlock) => <BannerHero block={block} />,
  PRODUCT_GRID_2X2: (block: ProductGrid2x2Block) => <ProductGrid2x2 block={block} />,
  DYNAMIC_COLLECTION: (block: DynamicCollectionBlock) => <DynamicCollection block={block} />,
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Renders a block from the server payload.
 * Returns null if block type is unrecognized — caller decides how to handle null.
 */
export const renderBlock = (block: AnyBlock): React.ReactElement | null => {
  if (!block?.type) {
    console.warn('[ComponentRegistry] Block missing type — dropped');
    return null;
  }

  const renderer = registry[block.type];
  if (!renderer) {
    // RESILIENCE: unknown component types are silently dropped
    console.warn(`[ComponentRegistry] Unknown block type "${block.type}" — dropped gracefully`);
    return null;
  }

  try {
    return renderer(block);
  } catch (err) {
    // RESILIENCE: renderer errors are isolated — surrounding blocks unaffected
    console.error(`[ComponentRegistry] Renderer for "${block.type}" threw:`, err);
    return null;
  }
};

/**
 * Register a new block type at runtime (e.g., from a dynamic import or feature flag).
 * Enables OTA addition of new component types without app releases.
 */
export const registerBlock = <T extends AnyBlock>(
  type: string,
  renderer: BlockRenderer<T>
): void => {
  if (registry[type]) {
    console.warn(`[ComponentRegistry] Overriding existing renderer for "${type}"`);
  }
  registry[type] = renderer;
};
