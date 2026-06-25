import React, { memo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ProductItem } from '../types';
import { handleAction } from '../actions/actionDispatcher';
import { useProductQuantity } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = (SCREEN_WIDTH - 48) / 2;

interface Props { product: ProductItem; }

// Isolated memo boundary — only re-renders when this product's qty changes
const ProductCard: React.FC<Props> = ({ product }) => {
  const theme = useTheme();
  const qty = useProductQuantity(product.id);

  const onAdd = useCallback(() => handleAction(product.action), [product.action]);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      {product.badge && (
        <View style={[styles.badge, { backgroundColor: theme.badge ?? theme.primary }]}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      )}
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.primary }]}>₹{product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: qty > 0 ? theme.primary : theme.surface, borderColor: theme.primary }]}
          onPress={onAdd}
          activeOpacity={0.8}
        >
          <Text style={[styles.addBtnText, { color: qty > 0 ? '#fff' : theme.primary }]}>
            {qty > 0 ? `In Cart (${qty})` : '+ Add'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE, borderRadius: 12, overflow: 'hidden', margin: 6,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10, shadowRadius: 4,
  },
  badge: { position: 'absolute', top: 8, left: 8, zIndex: 1, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  image: { width: '100%', height: 130 },
  info: { padding: 10 },
  name: { fontSize: 13, fontWeight: '600', marginBottom: 4, lineHeight: 18 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  price: { fontSize: 15, fontWeight: '800' },
  originalPrice: { fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through' },
  addBtn: { borderWidth: 1.5, borderRadius: 8, paddingVertical: 7, alignItems: 'center' },
  addBtnText: { fontSize: 13, fontWeight: '700' },
});

export default memo(ProductCard);
