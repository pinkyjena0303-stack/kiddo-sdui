import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { CartProvider } from './src/context/CartContext';
import { CampaignProvider } from './src/context/CampaignContext';
import { useCampaign } from './src/context/CampaignContext';
import HomeScreen from './src/components/HomeScreen';
import { MOCK_PAYLOAD } from './src/data/mockPayload';

// ─── Theme Merger: merges campaign theme over base theme when active ───────────

const AppContent: React.FC = () => {
  const { campaign } = useCampaign();
  const activeTheme = useMemo(
    () => (campaign ? { ...MOCK_PAYLOAD.theme, ...campaign.theme } : MOCK_PAYLOAD.theme),
    [campaign]
  );

  return (
    <ThemeProvider theme={activeTheme}>
      <HomeScreen blocks={MOCK_PAYLOAD.blocks} />
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <CartProvider>
      <CampaignProvider initialId={null}>
        <AppContent />
      </CampaignProvider>
    </CartProvider>
  );
}
