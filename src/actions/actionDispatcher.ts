import { Alert } from 'react-native';
import { Action, CartItem } from '../types';
import { cartStore } from '../context/CartContext';

type Handler = (payload: Action['payload']) => void;

const handlerRegistry: Record<string, Handler> = {
  ADD_TO_CART: (payload) => {
    if (!payload.id) { console.warn('[ActionDispatcher] ADD_TO_CART missing id'); return; }
    const item: Omit<CartItem, 'quantity'> = {
      id: payload.id,
      name: (payload.productName as string) ?? `Product ${payload.id}`,
      price: (payload.price as number) ?? 0,
    };
    cartStore.addItem(item);
  },
  DEEP_LINK: (payload) => {
    if (!payload.url) { console.warn('[ActionDispatcher] DEEP_LINK missing url'); return; }
    Alert.alert('Navigation', `Deep link: ${payload.url}`);
  },
  APPLY_MYSTERY_GIFT_COUPON: (payload) => {
    if (!payload.couponCode) return;
    Alert.alert('🎪 Mystery Gift!', `Coupon "${payload.couponCode}" applied!`);
  },
  OPEN_CAMPAIGN: (payload) => { console.log(`[Campaign] Open: ${payload.campaignId}`); },
  DISMISS_OVERLAY: () => { console.log('[Overlay] Dismissed'); },
  BOOK_EVENT: (payload) => {
    Alert.alert('🎫 Booked!', `Slot "${payload.eventId}" reserved. Check your email!`);
  },
};

export const handleAction = (action: Action): void => {
  if (!action?.type) { console.warn('[ActionDispatcher] No type — dropped'); return; }
  const handler = handlerRegistry[action.type];
  if (!handler) { console.warn(`[ActionDispatcher] Unknown "${action.type}" — dropped`); return; }
  try { handler(action.payload); } catch (err) { console.error('[ActionDispatcher]', err); }
};
