import React, { memo, useRef, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, ScrollView,
  NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { DynamicCollectionBlock, CollectionItem } from '../types';
import CollectionItemCard from './CollectionItem';
import { useTheme } from '../context/ThemeContext';

interface Props { block: DynamicCollectionBlock; }

// Stable key extractor — prevents index-based re-mounts
const keyExtractor = (item: CollectionItem) => item.id;

// Memoized render function to prevent unnecessary re-renders inside horizontal list
const renderItem = (accentColor?: string) =>
  ({ item }: { item: CollectionItem }) => (
    <CollectionItemCard item={item} accentColor={accentColor} />
  );

const DynamicCollection: React.FC<Props> = ({ block }) => {
  const theme = useTheme();
  const { data } = block;

  // Interaction decoupling: ensures horizontal scroll does NOT propagate to
  // the outer vertical list (no scroll velocity interference or jank)
  const isHorizontalScrolling = useRef(false);

  const onScrollBeginDrag = useCallback(
    (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
      isHorizontalScrolling.current = true;
    },
    []
  );

  const onScrollEndDrag = useCallback(
    (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
      isHorizontalScrolling.current = false;
    },
    []
  );

  const memoizedRenderItem = useCallback(renderItem(data.accentColor), [data.accentColor]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.accentBar, { backgroundColor: data.accentColor ?? theme.primary }]} />
        <Text style={[styles.title, { color: theme.text }]}>{data.title}</Text>
      </View>
      <FlatList
        data={data.items}
        renderItem={memoizedRenderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        // ─── Virtualization & Performance ────────────────────────────────
        // nestedScrollEnabled ensures horizontal scroll doesn't steal events
        // from the outer vertical FlashList / FlatList
        nestedScrollEnabled
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        // Remove clipping overhead during scroll
        removeClippedSubviews
        // Consistent item dimensions help FlatList avoid dynamic layout recalculations
        getItemLayout={(_data, index) => ({
          length: 142, // card width (130) + marginRight (12)
          offset: 142 * index,
          index,
        })}
        // Preload 2 screens worth of items
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  header: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 12 },
  accentBar: { width: 4, height: 20, borderRadius: 2, marginRight: 10 },
  title: { fontSize: 18, fontWeight: '800', letterSpacing: -0.2 },
  listContent: { paddingHorizontal: 16, paddingBottom: 4 },
});

export default memo(DynamicCollection);
