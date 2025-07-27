// Shared tag mappings for admin panel and product filtering
export const tagMappings: { [key: string]: { category: string; bodyBenefits: string[] } } = {
  'vitamin': { category: 'Nutritional Supplements', bodyBenefits: ['Total Body Health', 'Immune Health', 'Foundational Health'] },
  'mineral': { category: 'Nutritional Supplements', bodyBenefits: ['Total Body Health', 'Bone and Joint Health', 'Foundational Health'] },
  'protein': { category: 'Protein, Shakes & Bars', bodyBenefits: ['Muscle Health', 'Healthy Energy', 'Healthy Weight'] },
  'shake': { category: 'Protein, Shakes & Bars', bodyBenefits: ['Muscle Health', 'Healthy Energy', 'Healthy Weight'] },
  'bar': { category: 'Protein, Shakes & Bars', bodyBenefits: ['Muscle Health', 'Healthy Energy', 'Healthy Weight'] },
  'skincare': { category: 'Skin Care', bodyBenefits: ['Skin Health', 'Postbiotic Skincare'] },
  'moisturizer': { category: 'Skin Care', bodyBenefits: ['Skin Health', 'Postbiotic Skincare'] },
  'cleanser': { category: 'Skin Care', bodyBenefits: ['Skin Health', 'Postbiotic Skincare'] },
  'serum': { category: 'Skin Care', bodyBenefits: ['Skin Health', 'Postbiotic Skincare'] },
  'omega': { category: 'Nutritional Supplements', bodyBenefits: ['Heart Health', 'Brain and Nerve Health', 'Eye Health'] },
  'probiotic': { category: 'Nutritional Supplements', bodyBenefits: ['Digestive Health', 'Immune Health'] },
  'antioxidant': { category: 'Nutritional Supplements', bodyBenefits: ['Total Body Health', 'Immune Health', 'Detox Support'] },
  'calcium': { category: 'Nutritional Supplements', bodyBenefits: ['Bone and Joint Health', 'Foundational Health'] },
  'magnesium': { category: 'Nutritional Supplements', bodyBenefits: ['Bone and Joint Health', 'Sleep Health', 'Stress, Mood & Relaxation'] },
  'vitamin d': { category: 'Nutritional Supplements', bodyBenefits: ['Bone and Joint Health', 'Immune Health', 'Foundational Health'] },
  'vitamin c': { category: 'Nutritional Supplements', bodyBenefits: ['Immune Health', 'Skin Health'] },
  'b-complex': { category: 'Nutritional Supplements', bodyBenefits: ['Healthy Energy', 'Brain and Nerve Health', 'Stress, Mood & Relaxation'] },
  'prenatal': { category: 'Nutritional Supplements', bodyBenefits: ['Prenatal Health', 'Foundational Health'] },
  'men': { category: 'Nutritional Supplements', bodyBenefits: ['Men\'s Health', 'Total Body Health'] },
  'women': { category: 'Nutritional Supplements', bodyBenefits: ['Women\'s Health', 'Total Body Health'] },
  'sleep': { category: 'Nutritional Supplements', bodyBenefits: ['Sleep Health', 'Stress, Mood & Relaxation'] },
  'stress': { category: 'Nutritional Supplements', bodyBenefits: ['Stress, Mood & Relaxation', 'Sleep Health'] },
  'weight': { category: 'Nutritional Supplements', bodyBenefits: ['Healthy Weight', 'Healthy Energy'] },
  'energy': { category: 'Nutritional Supplements', bodyBenefits: ['Healthy Energy', 'Muscle Health'] },
  'heart': { category: 'Nutritional Supplements', bodyBenefits: ['Heart Health', 'Total Body Health'] },
  'heart health': { category: 'Nutritional Supplements', bodyBenefits: ['Heart Health', 'Total Body Health'] },
  'immune': { category: 'Nutritional Supplements', bodyBenefits: ['Immune Health', 'Total Body Health'] },
  'immune health': { category: 'Nutritional Supplements', bodyBenefits: ['Immune Health', 'Total Body Health'] },
  'digestive': { category: 'Nutritional Supplements', bodyBenefits: ['Digestive Health', 'Immune Health'] },
  'digestive health': { category: 'Nutritional Supplements', bodyBenefits: ['Digestive Health', 'Immune Health'] },
  'eye': { category: 'Nutritional Supplements', bodyBenefits: ['Eye Health', 'Brain and Nerve Health'] },
  'eye health': { category: 'Nutritional Supplements', bodyBenefits: ['Eye Health', 'Brain and Nerve Health'] },
  'detox': { category: 'Nutritional Supplements', bodyBenefits: ['Detox Support', 'Total Body Health'] },
  'detox support': { category: 'Nutritional Supplements', bodyBenefits: ['Detox Support', 'Total Body Health'] },
  'joint': { category: 'Nutritional Supplements', bodyBenefits: ['Bone and Joint Health', 'Muscle Health'] },
  'bone': { category: 'Nutritional Supplements', bodyBenefits: ['Bone and Joint Health', 'Foundational Health'] },
  'bone health': { category: 'Nutritional Supplements', bodyBenefits: ['Bone and Joint Health', 'Foundational Health'] },
  'brain': { category: 'Nutritional Supplements', bodyBenefits: ['Brain and Nerve Health', 'Eye Health'] },
  'brain health': { category: 'Nutritional Supplements', bodyBenefits: ['Brain and Nerve Health', 'Eye Health'] },
  'teen': { category: 'Nutritional Supplements', bodyBenefits: ['Child & Teen Health', 'Foundational Health'] },
  'child': { category: 'Nutritional Supplements', bodyBenefits: ['Child & Teen Health', 'Foundational Health'] },
  'skin': { category: 'Skin Care', bodyBenefits: ['Skin Health', 'Postbiotic Skincare'] },
  'skin health': { category: 'Skin Care', bodyBenefits: ['Skin Health', 'Postbiotic Skincare'] },
  'muscle': { category: 'Protein, Shakes & Bars', bodyBenefits: ['Muscle Health'] },
  'muscle health': { category: 'Protein, Shakes & Bars', bodyBenefits: ['Muscle Health'] }
};

// Helper function to get category from tag
export function getCategoryFromTag(tag: string): string | null {
  const tagLower = tag.toLowerCase().trim();
  
  // First try exact match
  if (tagMappings[tagLower]) {
    return tagMappings[tagLower].category;
  }
  
  // If no exact match, try partial match
  for (const [key, value] of Object.entries(tagMappings)) {
    if (tagLower.includes(key) || key.includes(tagLower)) {
      return value.category;
    }
  }
  
  return null;
}

// Helper function to get body benefits from tag
export function getBodyBenefitsFromTag(tag: string): string[] {
  const tagLower = tag.toLowerCase().trim();
  
  // First try exact match
  if (tagMappings[tagLower]) {
    return tagMappings[tagLower].bodyBenefits;
  }
  
  // If no exact match, try partial match
  for (const [key, value] of Object.entries(tagMappings)) {
    if (tagLower.includes(key) || key.includes(tagLower)) {
      return value.bodyBenefits;
    }
  }
  
  return [];
} 