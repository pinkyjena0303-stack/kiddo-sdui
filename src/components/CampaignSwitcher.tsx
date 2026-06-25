import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useCampaign } from '../context/CampaignContext';
import { CampaignId } from '../types';

const CAMPAIGNS: { id: CampaignId; label: string; emoji: string }[] = [
  { id: null, label: 'Default', emoji: '🏠' },
  { id: 'back_to_school', label: 'Back to School', emoji: '📚' },
  { id: 'summer_playhouse', label: 'Summer', emoji: '🌊' },
  { id: 'mystery_carnival', label: 'Carnival', emoji: '🎪' },
];

const CampaignSwitcher: React.FC = () => {
  const { campaignId, setCampaign } = useCampaign();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Live Campaign:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
        {CAMPAIGNS.map((c) => (
          <TouchableOpacity
            key={String(c.id)}
            style={[styles.pill, campaignId === c.id && styles.pillActive]}
            onPress={() => setCampaign(c.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.pillText}>{c.emoji} {c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, backgroundColor: '#F3F4F6', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  label: { fontSize: 11, fontWeight: '700', color: '#6B7280', marginLeft: 16, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  pills: { paddingHorizontal: 16, gap: 8 },
  pill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#D1D5DB',
  },
  pillActive: { backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' },
  pillText: { fontSize: 12, fontWeight: '600', color: '#374151' },
});

export default memo(CampaignSwitcher);
