import { SDUIPayload } from '../types';

export const MOCK_PAYLOAD: SDUIPayload = {
  version: '2.1.0',
  theme: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#FFF9F0',
    surface: '#FFFFFF',
    text: '#1A1A2E',
    textSecondary: '#6B7280',
    accent: '#FFE66D',
    badge: '#FF3B30',
  },
  campaignId: null, // switched at runtime
  blocks: [
    {
      id: 'banner_001',
      type: 'BANNER_HERO',
      data: {
        imageUrl: 'https://picsum.photos/seed/kiddo1/800/400',
        title: 'Everything Your Little One Needs',
        subtitle: 'Delivered in minutes · Trusted by 2M+ parents',
        ctaLabel: 'Shop Now',
        ctaBgColor: '#FF6B6B',
        action: { type: 'DEEP_LINK', payload: { url: '/category/all' } },
      },
    },
    {
      id: 'collection_summer',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: '☀️ Summer Essentials',
        theme: 'Summer Essentials',
        accentColor: '#FFD93D',
        items: [
          { id: 'se1', name: 'Sun Hat', imageUrl: 'https://picsum.photos/seed/hat1/200/200', price: 299, tag: 'UV Protect', action: { type: 'ADD_TO_CART', payload: { id: 'se1', productName: 'Sun Hat', price: 299 } } },
          { id: 'se2', name: 'Water Bottle', imageUrl: 'https://picsum.photos/seed/bottle1/200/200', price: 449, tag: 'BPA Free', action: { type: 'ADD_TO_CART', payload: { id: 'se2', productName: 'Water Bottle', price: 449 } } },
          { id: 'se3', name: 'Swim Floaties', imageUrl: 'https://picsum.photos/seed/float1/200/200', price: 599, tag: 'Ages 2–6', action: { type: 'ADD_TO_CART', payload: { id: 'se3', productName: 'Swim Floaties', price: 599 } } },
          { id: 'se4', name: 'Beach Towel', imageUrl: 'https://picsum.photos/seed/towel1/200/200', price: 349, action: { type: 'ADD_TO_CART', payload: { id: 'se4', productName: 'Beach Towel', price: 349 } } },
          { id: 'se5', name: 'Sunscreen SPF50', imageUrl: 'https://picsum.photos/seed/sun1/200/200', price: 399, tag: 'Kid-Safe', action: { type: 'ADD_TO_CART', payload: { id: 'se5', productName: 'Sunscreen SPF50', price: 399 } } },
        ],
      },
    },
    {
      id: 'grid_001',
      type: 'PRODUCT_GRID_2X2',
      data: {
        title: '🍭 Snacks Under ₹99',
        products: [
          { id: 'p1', name: 'Makhana Bites', price: 89, originalPrice: 120, imageUrl: 'https://picsum.photos/seed/snack1/300/300', badge: '26% OFF', action: { type: 'ADD_TO_CART', payload: { id: 'p1', productName: 'Makhana Bites', price: 89 } } },
          { id: 'p2', name: 'Fruit Gummies', price: 79, imageUrl: 'https://picsum.photos/seed/snack2/300/300', badge: 'Bestseller', action: { type: 'ADD_TO_CART', payload: { id: 'p2', productName: 'Fruit Gummies', price: 79 } } },
          { id: 'p3', name: 'Cheese Puffs', price: 69, originalPrice: 89, imageUrl: 'https://picsum.photos/seed/snack3/300/300', action: { type: 'ADD_TO_CART', payload: { id: 'p3', productName: 'Cheese Puffs', price: 69 } } },
          { id: 'p4', name: 'Rice Cakes', price: 99, imageUrl: 'https://picsum.photos/seed/snack4/300/300', badge: 'New', action: { type: 'ADD_TO_CART', payload: { id: 'p4', productName: 'Rice Cakes', price: 99 } } },
        ],
      },
    },
    {
      id: 'banner_002',
      type: 'BANNER_HERO',
      data: {
        imageUrl: 'https://picsum.photos/seed/kiddo2/800/400',
        title: 'New Arrivals This Week 🎉',
        subtitle: 'Fresh picks for growing minds',
        ctaLabel: 'Explore',
        ctaBgColor: '#4ECDC4',
        action: { type: 'DEEP_LINK', payload: { url: '/new-arrivals' } },
      },
    },
    {
      id: 'collection_lunchbox',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: '🎒 Lunchboxes & Bags',
        theme: 'Back to School',
        accentColor: '#667EEA',
        items: [
          { id: 'lb1', name: 'Dino Lunchbox', imageUrl: 'https://picsum.photos/seed/lunch1/200/200', price: 799, action: { type: 'ADD_TO_CART', payload: { id: 'lb1', productName: 'Dino Lunchbox', price: 799 } } },
          { id: 'lb2', name: 'Unicorn Bag', imageUrl: 'https://picsum.photos/seed/lunch2/200/200', price: 1299, tag: 'Insulated', action: { type: 'ADD_TO_CART', payload: { id: 'lb2', productName: 'Unicorn Bag', price: 1299 } } },
          { id: 'lb3', name: 'Steel Tiffin', imageUrl: 'https://picsum.photos/seed/lunch3/200/200', price: 549, tag: 'Leakproof', action: { type: 'ADD_TO_CART', payload: { id: 'lb3', productName: 'Steel Tiffin', price: 549 } } },
          { id: 'lb4', name: 'Superhero Bag', imageUrl: 'https://picsum.photos/seed/lunch4/200/200', price: 999, action: { type: 'ADD_TO_CART', payload: { id: 'lb4', productName: 'Superhero Bag', price: 999 } } },
          { id: 'lb5', name: 'Bento Box', imageUrl: 'https://picsum.photos/seed/lunch5/200/200', price: 649, tag: '4 Sections', action: { type: 'ADD_TO_CART', payload: { id: 'lb5', productName: 'Bento Box', price: 649 } } },
        ],
      },
    },
    {
      id: 'grid_002',
      type: 'PRODUCT_GRID_2X2',
      data: {
        title: '🧸 Toy Favourites',
        products: [
          { id: 't1', name: 'Stacking Rings', price: 399, imageUrl: 'https://picsum.photos/seed/toy1/300/300', badge: 'Ages 1+', action: { type: 'ADD_TO_CART', payload: { id: 't1', productName: 'Stacking Rings', price: 399 } } },
          { id: 't2', name: 'Play-Doh Set', price: 599, originalPrice: 799, imageUrl: 'https://picsum.photos/seed/toy2/300/300', badge: '25% OFF', action: { type: 'ADD_TO_CART', payload: { id: 't2', productName: 'Play-Doh Set', price: 599 } } },
          { id: 't3', name: 'Wooden Puzzle', price: 449, imageUrl: 'https://picsum.photos/seed/toy3/300/300', action: { type: 'ADD_TO_CART', payload: { id: 't3', productName: 'Wooden Puzzle', price: 449 } } },
          { id: 't4', name: 'Soft Plushie', price: 699, imageUrl: 'https://picsum.photos/seed/toy4/300/300', badge: 'Top Rated', action: { type: 'ADD_TO_CART', payload: { id: 't4', productName: 'Soft Plushie', price: 699 } } },
        ],
      },
    },
    {
      id: 'collection_petting_zoo',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: '🐾 Petting Zoo Tickets',
        theme: 'Summer Playhouse',
        accentColor: '#06BCC1',
        items: [
          { id: 'pz1', name: 'Morning Slot', imageUrl: 'https://picsum.photos/seed/zoo1/200/200', price: 299, tag: 'Limited!', action: { type: 'BOOK_EVENT', payload: { eventId: 'pz1' } } },
          { id: 'pz2', name: 'Afternoon Slot', imageUrl: 'https://picsum.photos/seed/zoo2/200/200', price: 249, action: { type: 'BOOK_EVENT', payload: { eventId: 'pz2' } } },
          { id: 'pz3', name: 'Family Pack', imageUrl: 'https://picsum.photos/seed/zoo3/200/200', price: 799, tag: '4 tickets', action: { type: 'BOOK_EVENT', payload: { eventId: 'pz3' } } },
        ],
      },
    },
    {
      id: 'grid_003',
      type: 'PRODUCT_GRID_2X2',
      data: {
        title: '🍼 Baby Essentials',
        products: [
          { id: 'b1', name: 'Organic Wipes', price: 199, imageUrl: 'https://picsum.photos/seed/baby1/300/300', badge: 'Organic', action: { type: 'ADD_TO_CART', payload: { id: 'b1', productName: 'Organic Wipes', price: 199 } } },
          { id: 'b2', name: 'Diaper Rash Cream', price: 249, originalPrice: 299, imageUrl: 'https://picsum.photos/seed/baby2/300/300', action: { type: 'ADD_TO_CART', payload: { id: 'b2', productName: 'Diaper Rash Cream', price: 249 } } },
          { id: 'b3', name: 'Silicone Spoons', price: 349, imageUrl: 'https://picsum.photos/seed/baby3/300/300', badge: 'BPA Free', action: { type: 'ADD_TO_CART', payload: { id: 'b3', productName: 'Silicone Spoons', price: 349 } } },
          { id: 'b4', name: 'Teething Ring', price: 299, imageUrl: 'https://picsum.photos/seed/baby4/300/300', action: { type: 'ADD_TO_CART', payload: { id: 'b4', productName: 'Teething Ring', price: 299 } } },
        ],
      },
    },
    // ⚠️ Unknown block — must be silently dropped by the renderer
    {
      id: 'unknown_001',
      type: 'NEW_COMPONENT_V2',
      data: { someField: 'some value' },
    } as BaseBlock,
    {
      id: 'collection_mystery',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: '🎪 Mystery Carnival Deals',
        theme: 'Mystery Gift Carnival',
        accentColor: '#E63946',
        items: [
          { id: 'mc1', name: 'Mystery Box A', imageUrl: 'https://picsum.photos/seed/mystery1/200/200', price: 199, tag: 'Surprise!', action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'MYSTERY_A', id: 'mc1' } } },
          { id: 'mc2', name: 'Mystery Box B', imageUrl: 'https://picsum.photos/seed/mystery2/200/200', price: 299, tag: 'Carnival', action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'MYSTERY_B', id: 'mc2' } } },
          { id: 'mc3', name: 'Carnival Kit', imageUrl: 'https://picsum.photos/seed/mystery3/200/200', price: 499, action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'CARNIVAL_KIT', id: 'mc3' } } },
          { id: 'mc4', name: 'Jackpot Deal', imageUrl: 'https://picsum.photos/seed/mystery4/200/200', price: 149, tag: 'Flash!', action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'JACKPOT', id: 'mc4' } } },
        ],
      },
    },
  ],
};

// ─── Campaign Payloads ────────────────────────────────────────────────────────

import { CampaignConfig } from '../types';

export const CAMPAIGNS: Record<string, CampaignConfig> = {
  back_to_school: {
    id: 'back_to_school',
    name: 'Back to School Mega-Sale',
    theme: {
      primary: '#1E3A8A',
      secondary: '#FBBF24',
      background: '#EFF6FF',
      surface: '#FFFFFF',
      text: '#1E1B4B',
      textSecondary: '#4B5563',
      accent: '#FBBF24',
      badge: '#DC2626',
    },
    overlayAnimationUrl: 'https://assets.lottiefiles.com/packages/lf20_back_to_school.json',
    overlayType: 'lottie',
    badgeText: '📚 BACK TO SCHOOL SALE',
  },
  summer_playhouse: {
    id: 'summer_playhouse',
    name: 'Summer Playhouse Festival',
    theme: {
      primary: '#0891B2',
      secondary: '#34D399',
      background: '#ECFEFF',
      surface: '#FFFFFF',
      text: '#0C4A6E',
      textSecondary: '#6B7280',
      accent: '#F0ABFC',
      badge: '#0891B2',
    },
    overlayAnimationUrl: 'https://assets.example.com/water_splash.webp',
    overlayType: 'webp',
    badgeText: '🌊 SUMMER PLAYHOUSE',
  },
  mystery_carnival: {
    id: 'mystery_carnival',
    name: 'Mystery Gift Carnival',
    theme: {
      primary: '#DC2626',
      secondary: '#7C3AED',
      background: '#FFF1F2',
      surface: '#FFFFFF',
      text: '#1A1A2E',
      textSecondary: '#6B7280',
      accent: '#F59E0B',
      badge: '#DC2626',
    },
    overlayAnimationUrl: 'https://assets.example.com/confetti_carnival.json',
    overlayType: 'confetti',
    badgeText: '🎪 MYSTERY CARNIVAL',
  },
};
