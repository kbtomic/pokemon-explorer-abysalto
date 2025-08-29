import { useState, useEffect } from 'react';
import { usePokemonStore } from '@/lib/stores/pokemon-store';

export function useMobileSearch(onClose: () => void) {
  const setSearch = usePokemonStore(state => state.setSearch);
  const search = usePokemonStore(state => state.filters.search);
  const [localSearchValue, setLocalSearchValue] = useState(search);

  useEffect(() => {
    setLocalSearchValue(search);
  }, [search]);

  const handleApplySearch = () => {
    setSearch(localSearchValue);
  };

  const handleClear = () => {
    setLocalSearchValue('');
  };

  const handleApplyAndClose = () => {
    handleApplySearch();
    onClose();
  };

  const handleKeyDownAndClose = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyAndClose();
    }
  };

  return {
    localSearchValue,
    setLocalSearchValue,
    handleApplyAndClose,
    handleClear,
    handleKeyDownAndClose,
  };
}
