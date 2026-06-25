import React, { createContext, useContext, useState, useMemo } from 'react';
import { CampaignConfig, CampaignId } from '../types';
import { CAMPAIGNS } from '../data/mockPayload';

interface CampaignContextValue {
  campaign: CampaignConfig | null;
  campaignId: CampaignId;
  setCampaign: (id: CampaignId) => void;
}

const CampaignContext = createContext<CampaignContextValue>({
  campaign: null,
  campaignId: null,
  setCampaign: () => {},
});

export const CampaignProvider: React.FC<{
  initialId?: CampaignId;
  children: React.ReactNode;
}> = ({ initialId = null, children }) => {
  const [campaignId, setCampaignId] = useState<CampaignId>(initialId);

  const value = useMemo<CampaignContextValue>(
    () => ({
      campaign: campaignId ? CAMPAIGNS[campaignId] ?? null : null,
      campaignId,
      setCampaign: (id: CampaignId) => setCampaignId(id),
    }),
    [campaignId]
  );

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};

export const useCampaign = () => useContext(CampaignContext);
