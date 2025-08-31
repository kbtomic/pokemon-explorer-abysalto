// Utility functions for generating dynamic enums from API data

// Generate damage class enum values from API data
export const getDamageClassValues = (damageClasses: Array<{ name: string }>) => {
  return damageClasses.map(dc => dc.name);
};

// Generate learn method enum values from API data
export const getLearnMethodValues = (learnMethods: Array<{ name: string }>) => {
  return learnMethods.map(lm => lm.name);
};

// Generate category enum values from API data
export const getCategoryValues = (categories: Array<{ name: string }>) => {
  return categories.map(cat => cat.name);
};

// Type-safe way to check if a value is a valid damage class
export const isValidDamageClass = (value: string, damageClasses: Array<{ name: string }>): value is string => {
  return damageClasses.some(dc => dc.name === value);
};

// Type-safe way to check if a value is a valid learn method
export const isValidLearnMethod = (value: string, learnMethods: Array<{ name: string }>): value is string => {
  return learnMethods.some(lm => lm.name === value);
};

// Type-safe way to check if a value is a valid category
export const isValidCategory = (value: string, categories: Array<{ name: string }>): value is string => {
  return categories.some(cat => cat.name === value);
};

// Get display name for damage class
export const getDamageClassDisplayName = (
  name: string,
  damageClasses: Array<{ name: string; names: Array<{ name: string; language: { name: string } }> }>
): string => {
  const damageClass = damageClasses.find(dc => dc.name === name);
  if (!damageClass) return name;

  const englishName = damageClass.names.find(n => n.language.name === 'en');
  return englishName?.name || name;
};

// Get display name for learn method
export const getLearnMethodDisplayName = (
  name: string,
  learnMethods: Array<{ name: string; names: Array<{ name: string; language: { name: string } }> }>
): string => {
  const learnMethod = learnMethods.find(lm => lm.name === name);
  if (!learnMethod) return name;

  const englishName = learnMethod.names.find(n => n.language.name === 'en');
  return englishName?.name || name;
};

// Get display name for category
export const getCategoryDisplayName = (
  name: string,
  categories: Array<{ name: string; names: Array<{ name: string; language: { name: string } }> }>
): string => {
  const category = categories.find(cat => cat.name === name);
  if (!category) return name;

  const englishName = category.names.find(n => n.language.name === 'en');
  return englishName?.name || name;
};
