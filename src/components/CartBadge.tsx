import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCartTotalCount } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const CartBadge: React.FC = () => {
  const count = useCartTotalCount();
  const theme = useTheme();

  if (count === 0) return null;

  return (
    <View style={[styles.badge, { backgroundColor: theme.badge ?? theme.primary }]}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    minWidth: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4, marginLeft: 4,
  },
  text: { color: '#fff', fontSize: 11, fontWeight: '800' },
});

export default memo(CartBadge);
