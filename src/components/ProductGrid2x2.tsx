import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductGrid2x2Block } from '../types';
import ProductCard from './ProductCard';
import { useTheme } from '../context/ThemeContext';

interface Props { block: ProductGrid2x2Block; }

const ProductGrid2x2: React.FC<Props> = ({ block }) => {
  const theme = useTheme();
  const { data } = block;

  // Pair products into rows of 2 for clean 2x2 layout
  const rows: typeof data.products[] = [];
  for (let i = 0; i < data.products.length; i += 2) {
    rows.push(data.products.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{data.title}</Text>
      {rows.map((row, idx) => (
        <View key={idx} style={styles.row}>
          {row.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 6, marginVertical: 8 },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 8, marginLeft: 6, letterSpacing: -0.2 },
  row: { flexDirection: 'row' },
});

export default memo(ProductGrid2x2);
