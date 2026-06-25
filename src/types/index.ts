// ─── Action Types ─────────────────────────────────────────────────────────────

export type ActionType =
  | 'ADD_TO_CART'
  | 'DEEP_LINK'
  | 'APPLY_MYSTERY_GIFT_COUPON'
  | 'OPEN_CAMPAIGN'
  | 'DISMISS_OVERLAY'
  | 'BOOK_EVENT';

export interface ActionPayload {
  id?: string;
  url?: string;
  couponCode?: string;
  eventId?: string;
  campaignId?: string;
  productName?: string;
  price?: number;
  [key: string]: unknown;
}

export interface Action {
  type: ActionType;
  payload: ActionPayload;
}

// ─── Theme Types ──────────────────────────────────────────────────────────────

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  badge?: string;
}

// ─── Campaign Types ───────────────────────────────────────────────────────────

export type CampaignId = 'back_to_school' | 'summer_playhouse' | 'mystery_carnival' | null;

export interface CampaignConfig {
  id: CampaignId;
  name: string;
  theme: Theme;
  overlayAnimationUrl: string;
  overlayType: 'lottie' | 'webp' | 'confetti';
  badgeText?: string;
}

// ─── Component Block Types ────────────────────────────────────────────────────

export type BlockType =
  | 'BANNER_HERO'
  | 'PRODUCT_GRID_2X2'
  | 'DYNAMIC_COLLECTION'
  | 'FULL_SCREEN_OVERLAY'
  | string;

export interface BaseBlock {
  id: string;
  type: BlockType;
  action?: Action;
}

export interface BannerHeroBlock extends BaseBlock {
  type: 'BANNER_HERO';
  data: {
    imageUrl: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaBgColor?: string;
    action: Action;
  };
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: string;
  action: Action;
}

export interface ProductGrid2x2Block extends BaseBlock {
  type: 'PRODUCT_GRID_2X2';
  data: {
    title: string;
    products: ProductItem[];
  };
}

export interface CollectionItem {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
  tag?: string;
  action: Action;
}

export interface DynamicCollectionBlock extends BaseBlock {
  type: 'DYNAMIC_COLLECTION';
  data: {
    title: string;
    theme: string;
    accentColor?: string;
    items: CollectionItem[];
  };
}

export type KnownBlock = BannerHeroBlock | ProductGrid2x2Block | DynamicCollectionBlock;
export type AnyBlock = KnownBlock | BaseBlock;

// ─── Payload Root ─────────────────────────────────────────────────────────────

export interface SDUIPayload {
  version: string;
  theme: Theme;
  campaignId: CampaignId;
  blocks: AnyBlock[];
}

// ─── Cart State ───────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartState {
  items: Record<string, CartItem>;
  totalCount: number;
}
