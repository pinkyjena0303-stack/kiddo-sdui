import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { CampaignConfig } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  campaign: CampaignConfig;
}

// ─── Confetti Particle ────────────────────────────────────────────────────────

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotate: Animated.Value;
  color: string;
  size: number;
}

const CONFETTI_COLORS = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#A855F7', '#F97316', '#06B6D4'];

const createParticle = (): Particle => ({
  x: new Animated.Value(Math.random() * SCREEN_WIDTH),
  y: new Animated.Value(-30),
  opacity: new Animated.Value(1),
  rotate: new Animated.Value(0),
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  size: 6 + Math.random() * 8,
});

const PARTICLE_COUNT = 30;

const CampaignOverlay: React.FC<Props> = ({ campaign }) => {
  const particles = useRef<Particle[]>(
    Array.from({ length: PARTICLE_COUNT }, createParticle)
  );
  const animsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    const anims = particles.current.map((p) => {
      p.y.setValue(-30);
      p.x.setValue(Math.random() * SCREEN_WIDTH);
      p.opacity.setValue(1);
      p.rotate.setValue(0);

      const duration = 2500 + Math.random() * 2000;
      const delay = Math.random() * 1500;

      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(p.y, { toValue: SCREEN_HEIGHT + 30, duration, useNativeDriver: true }),
            Animated.timing(p.rotate, { toValue: 1, duration, useNativeDriver: true }),
            Animated.sequence([
              Animated.timing(p.opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
              Animated.timing(p.opacity, { toValue: 0, duration: 300, delay: duration - 600, useNativeDriver: true }),
            ]),
          ]),
        ])
      );
    });

    animsRef.current = anims;
    anims.forEach((a) => a.start());

    return () => {
      anims.forEach((a) => a.stop());
    };
  }, [campaign.id]);

  return (
    // pointerEvents="none" — overlay is purely visual, all touches pass through
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.current.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 4,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                {
                  rotate: p.rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '720deg'],
                  }),
                },
              ],
              opacity: p.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  particle: { position: 'absolute' },
});

export default memo(CampaignOverlay);
