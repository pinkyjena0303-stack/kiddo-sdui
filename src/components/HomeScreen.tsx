import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, StatusBar,
  TouchableOpacity, Platform,
} from 'react-native';
import { AnyBlock } from '../types';
import { renderBlock } from '../registry/componentRegistry';
import { useTheme } from '../context/ThemeContext';
import { useCampaign } from '../context/CampaignContext';
import { useCartTotalCount } from '../context/CartContext';
import CampaignSwitcher from './CampaignSwitcher';
import CampaignOverlay from './CampaignOverlay';
import CartScreen from './CartScreen';

interface Props { blocks: AnyBlock[]; }

interface BlockItemProps { block: AnyBlock; }
const BlockItem = memo<BlockItemProps>(({ block }) => {
  const rendered = renderBlock(block);
  if (!rendered) return null;
  return rendered;
});

const keyExtractor = (item: AnyBlock) => item.id;
const ItemSeparator = memo(() => <View style={{ height: 4 }} />);

interface HeaderProps {
  campaignBadge?: string;
  cartCount: number;
  primaryColor: string;
  bgColor: string;
  onCartPress: () => void;
}

const Header = memo<HeaderProps>(({ campaignBadge, cartCount, primaryColor, bgColor, onCartPress }) => (
  <View style={[styles.header, { backgroundColor: bgColor }]}>
    <View style={styles.headerLeft}>
      <Text style={styles.logo}>kiddo</Text>
      <Text style={styles.logoTagline}>the best for your kiddo</Text>
    </View>
    <View style={styles.headerRight}>
      {campaignBadge && (
        <View style={[styles.campBadge, { backgroundColor: primaryColor }]}>
          <Text style={styles.campBadgeText}>{campaignBadge}</Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.cartBtn, { borderColor: primaryColor }]}
        onPress={onCartPress}
        activeOpacity={0.8}
      >
        <Text style={styles.cartIcon}>🛒</Text>
        {cartCount > 0 && (
          <View style={[styles.cartCount, { backgroundColor: primaryColor }]}>
            <Text style={styles.cartCountText}>{cartCount > 99 ? '99+' : cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  </View>
));

const HomeScreen: React.FC<Props> = ({ blocks }) => {
  const theme = useTheme();
  const { campaign } = useCampaign();
  const cartCount = useCartTotalCount();
  const [cartVisible, setCartVisible] = useState(false);

  const openCart = useCallback(() => setCartVisible(true), []);
  const closeCart = useCallback(() => setCartVisible(false), []);

  const renderItem = useCallback(
    ({ item }: { item: AnyBlock }) => <BlockItem block={item} />,
    []
  );

  const ListHeaderComponent = useMemo(
    () => (
      <>
        <Header
          campaignBadge={campaign?.badgeText}
          cartCount={cartCount}
          primaryColor={theme.primary}
          bgColor={theme.surface}
          onCartPress={openCart}
        />
        <CampaignSwitcher />
      </>
    ),
    [campaign?.badgeText, cartCount, theme.primary, theme.surface, openCart]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.surface} />
      <FlatList
        data={blocks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparator}
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={3}
        windowSize={7}
        initialNumToRender={4}
        updateCellsBatchingPeriod={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        scrollEventThrottle={16}
      />
      {campaign && <CampaignOverlay campaign={campaign} />}
      <CartScreen visible={cartVisible} onClose={closeCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingBottom: 40 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 52 : 16,
    paddingBottom: 12, elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3,
  },
  headerLeft: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { fontSize: 26, fontWeight: '900', color: '#FF6B6B', letterSpacing: -0.5 },
  logoTagline: { fontSize: 10, color: '#9CA3AF', fontWeight: '500', marginTop: -2 },
  campBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, maxWidth: 150 },
  campBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  cartBtn: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  cartIcon: { fontSize: 18 },
  cartCount: {
    position: 'absolute', top: -4, right: -4,
    minWidth: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3,
  },
  cartCountText: { color: '#fff', fontSize: 10, fontWeight: '800' },
});

export default memo(HomeScreen);
