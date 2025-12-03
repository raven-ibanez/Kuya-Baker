import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { HeroBanner, HeroBannerFeature } from '../types';

const DEFAULT_HERO_BANNER: HeroBanner = {
  features: [
    {
      id: '1',
      title: 'Freshly Baked Daily',
      description: 'Our bakery starts early every morning to bring you the freshest breads and pastries. Baked with love and served warm, ensuring every bite is perfect.',
      iconType: 'clock'
    },
    {
      id: '2',
      title: 'All-Natural Ingredients',
      description: 'We use only the finest natural ingredients in our recipes. No artificial preservatives, no shortcuts—just pure, wholesome goodness in every bite.',
      iconType: 'star'
    },
    {
      id: '3',
      title: 'Made with Love',
      description: 'Every loaf, every pastry, every treat is crafted with passion and care. Experience the warmth and comfort of traditional baking in every product we offer.',
      iconType: 'heart'
    }
  ],
  autoAdvanceInterval: 5000,
  enabled: true
};

export const useHeroBanner = () => {
  const [heroBanner, setHeroBanner] = useState<HeroBanner>(DEFAULT_HERO_BANNER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroBanner = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if supabase is available
      if (!supabase) {
        console.warn('Supabase not available, using default hero banner');
        setHeroBanner(DEFAULT_HERO_BANNER);
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'hero_banner');

        if (fetchError) {
          // PGRST116 = no rows returned, which is fine - we'll use defaults
          if (fetchError.code !== 'PGRST116') {
            console.warn('Supabase error (non-critical):', fetchError);
            // Don't throw, just use defaults
          }
        }

        if (data && data.length > 0 && data[0].value) {
          try {
            const parsed = JSON.parse(data[0].value);
            // Validate the parsed data has required fields
            if (parsed && Array.isArray(parsed.features) && parsed.features.length > 0) {
              setHeroBanner(parsed);
            } else {
              console.warn('Invalid hero banner data structure, using defaults');
              setHeroBanner(DEFAULT_HERO_BANNER);
            }
          } catch (parseError) {
            console.warn('Failed to parse hero banner data, using defaults');
            setHeroBanner(DEFAULT_HERO_BANNER);
          }
        } else {
          // No data found, use defaults
          setHeroBanner(DEFAULT_HERO_BANNER);
        }
      } catch (supabaseError) {
        // Supabase might not be configured or available
        console.warn('Supabase not available, using default hero banner:', supabaseError);
        setHeroBanner(DEFAULT_HERO_BANNER);
      }
    } catch (err) {
      console.error('Error fetching hero banner:', err);
      // Don't set error state - just use defaults to prevent UI issues
      setError(null);
      // Always use defaults on error to prevent white screen
      setHeroBanner(DEFAULT_HERO_BANNER);
    } finally {
      setLoading(false);
    }
  };

  const updateHeroBanner = async (updates: Partial<HeroBanner>) => {
    try {
      setError(null);

      if (!supabase) {
        throw new Error('Supabase is not available');
      }

      const updatedBanner: HeroBanner = {
        ...heroBanner,
        ...updates
      };

      // Check if record exists
      const { data: existing } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'hero_banner')
        .single();

      const bannerValue = JSON.stringify(updatedBanner);

      if (existing) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('site_settings')
          .update({ value: bannerValue })
          .eq('id', 'hero_banner');

        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert({
            id: 'hero_banner',
            value: bannerValue,
            type: 'text',
            description: 'Hero banner carousel settings'
          });

        if (insertError) throw insertError;
      }

      // Update local state
      setHeroBanner(updatedBanner);
    } catch (err) {
      console.error('Error updating hero banner:', err);
      setError(err instanceof Error ? err.message : 'Failed to update hero banner');
      throw err;
    }
  };

  const addFeature = async (feature: Omit<HeroBannerFeature, 'id'>) => {
    const newFeature: HeroBannerFeature = {
      ...feature,
      id: Date.now().toString()
    };

    await updateHeroBanner({
      features: [...heroBanner.features, newFeature]
    });
  };

  const updateFeature = async (id: string, updates: Partial<HeroBannerFeature>) => {
    const updatedFeatures = heroBanner.features.map(feature =>
      feature.id === id ? { ...feature, ...updates } : feature
    );

    await updateHeroBanner({ features: updatedFeatures });
  };

  const deleteFeature = async (id: string) => {
    if (heroBanner.features.length <= 1) {
      throw new Error('At least one feature must remain');
    }

    const updatedFeatures = heroBanner.features.filter(feature => feature.id !== id);
    await updateHeroBanner({ features: updatedFeatures });
  };

  const reorderFeatures = async (newOrder: HeroBannerFeature[]) => {
    await updateHeroBanner({ features: newOrder });
  };

  useEffect(() => {
    fetchHeroBanner().catch((error) => {
      console.error('Error in useHeroBanner useEffect:', error);
      // Ensure we always have valid state
      setHeroBanner(DEFAULT_HERO_BANNER);
      setLoading(false);
    });
  }, []);

  return {
    heroBanner,
    loading,
    error,
    updateHeroBanner,
    addFeature,
    updateFeature,
    deleteFeature,
    reorderFeatures,
    refetch: fetchHeroBanner
  };
};

