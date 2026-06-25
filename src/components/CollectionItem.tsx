import React, { memo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CollectionItem as CollectionItemType } from '../types';
import { handleAction } from '../actions/actionDispatcher';
import { useProductQuantity } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface Props {
  item: CollectionItemType;
  accentColor?: string;
}

const CollectionItemCard: React.FC<Props> = ({ item, accentColor }) => {
  const theme = useTheme();
  const qty = useProductQuantity(item.id);
  const onPress = useCallback(() => handleAction(item.action), [item.action]);

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.surface }]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        {item.tag && (
          <View style={[styles.tag, { backgroundColor: accentColor ?? theme.accent }]}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>{item.name}</Text>
      {item.price && <Text style={[styles.price, { color: theme.primary }]}>₹{item.price}</Text>}
      {qty > 0 && (
        <View style={[styles.qtyBadge, { backgroundColor: theme.primary }]}>
          <Text style={styles.qtyText}>{qty}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130, marginRight: 12, borderRadius: 12, overflow: 'hidden',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10, shadowRadius: 4,
  },
  imgContainer: { position: 'relative' },
  image: { width: 130, height: 110 },
  tag: { position: 'absolute', bottom: 6, left: 6, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  tagText: { color: '#1A1A2E', fontSize: 10, fontWeight: '700' },
  name: { fontSize: 12, fontWeight: '600', padding: 8, paddingBottom: 2, lineHeight: 16 },
  price: { fontSize: 13, fontWeight: '800', paddingHorizontal: 8, paddingBottom: 8 },
  qtyBadge: {
    position: 'absolute', top: 6, right: 6, width: 22, height: 22,
    borderRadius: 11, alignItems: 'center', justifyContent: 'center',
  },
  qtyText: { color: '#fff', fontSize: 11, fontWeight: '800' },
});

export default memo(CollectionItemCard);
