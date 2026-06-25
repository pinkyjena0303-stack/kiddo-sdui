import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BannerHeroBlock } from '../types';
import { handleAction } from '../actions/actionDispatcher';
import { useTheme } from '../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props { block: BannerHeroBlock; }

const BannerHero: React.FC<Props> = ({ block }) => {
  const theme = useTheme();
  const { data } = block;
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
        <TouchableOpacity
          style={[styles.cta, { backgroundColor: data.ctaBgColor ?? theme.primary }]}
          onPress={() => handleAction(data.action)}
          activeOpacity={0.82}
        >
          <Text style={styles.ctaText}>{data.ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 24, marginHorizontal: 12, marginVertical: 8,
    borderRadius: 16, overflow: 'hidden', height: 200, backgroundColor: '#E5E7EB',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 6,
  },
  image: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.38)', padding: 20, justifyContent: 'flex-end' },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 4, color: '#fff', letterSpacing: -0.3 },
  subtitle: { fontSize: 13, fontWeight: '500', marginBottom: 14, color: 'rgba(255,255,255,0.88)' },
  cta: { alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24 },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});

export default memo(BannerHero);
