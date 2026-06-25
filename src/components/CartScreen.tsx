import React, { memo, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Modal, SafeAreaView, Dimensions
} from 'react-native';
import { cartStore } from '../context/CartContext';
import { CartItem } from '../types';
import { useTheme } from '../context/ThemeContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
}

const CartScreen: React.FC<Props> = ({ visible, onClose }) => {
  const theme = useTheme();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const update = () => {
      const state = cartStore.getState();
      const itemList = Object.values(state.items);
      setItems(itemList);
      setTotal(itemList.reduce((acc, i) => acc + i.price * i.quantity, 0));
    };
    update();
    const unsub = cartStore.subscribe(update);
    return unsub;
  }, []);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.cartItem, { backgroundColor: theme.surface }]}>
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.itemPrice, { color: theme.textSecondary }]}>
          ₹{item.price} × {item.quantity}
        </Text>
      </View>
      <Text style={[styles.itemTotal, { color: theme.primary }]}>
        ₹{item.price * item.quantity}
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: theme.background }]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: '#E5E7EB' }]}>
            <Text style={[styles.title, { color: theme.text }]}>🛒 My Cart</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {items.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🛍️</Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Your cart is empty!
              </Text>
              <Text style={[styles.emptySubText, { color: theme.textSecondary }]}>
                Add some items to get started
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
              />
              {/* Footer */}
              <View style={[styles.footer, { borderTopColor: '#E5E7EB', backgroundColor: theme.surface }]}>
                <View style={styles.totalRow}>
                  <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
                  <Text style={[styles.totalAmount, { color: theme.primary }]}>₹{total}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.checkoutBtn, { backgroundColor: theme.primary }]}
                  activeOpacity={0.85}
                >
                  <Text style={styles.checkoutText}>Proceed to Checkout →</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    height: SCREEN_HEIGHT * 0.75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  closeText: { fontSize: 18, color: '#6B7280' },
  list: { padding: 16, gap: 10 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  itemPrice: { fontSize: 13 },
  itemTotal: { fontSize: 15, fontWeight: '800' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyEmoji: { fontSize: 56 },
  emptyText: { fontSize: 18, fontWeight: '700' },
  emptySubText: { fontSize: 14 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    gap: 14,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalAmount: { fontSize: 22, fontWeight: '900' },
  checkoutBtn: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default memo(CartScreen);
