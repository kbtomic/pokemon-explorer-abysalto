import { renderHook } from '@testing-library/react';
import { useStatItem } from '../useStatItem';
import { StatName } from '@/lib/constants/enums';

describe('useStatItem', () => {
  const mockStatRange: [number, number] = [0, 255];
  const mockCurrentFilter: [number, number] = [0, 255];

  it('should return effective range and active state', () => {
    const { result } = renderHook(() => useStatItem(StatName.HP, mockStatRange, mockCurrentFilter));

    expect(result.current.effectiveRange).toEqual(mockStatRange);
    expect(result.current.isActive).toBe(false);
  });

  it('should handle active filter', () => {
    const activeFilter: [number, number] = [50, 200];
    const { result } = renderHook(() => useStatItem(StatName.HP, mockStatRange, activeFilter));

    expect(result.current.effectiveRange).toEqual(activeFilter);
    expect(result.current.isActive).toBe(true);
  });

  it('should handle different stat names', () => {
    const { result } = renderHook(() => useStatItem(StatName.ATTACK, mockStatRange, mockCurrentFilter));

    expect(result.current.effectiveRange).toEqual(mockStatRange);
    expect(result.current.isActive).toBe(false);
  });

  it('should handle edge case with same filter values', () => {
    const sameFilter: [number, number] = [100, 100];
    const { result } = renderHook(() => useStatItem(StatName.DEFENSE, mockStatRange, sameFilter));

    expect(result.current.effectiveRange).toEqual(mockStatRange);
    expect(result.current.isActive).toBe(false);
  });

  it('should handle different stat ranges', () => {
    const customRange: [number, number] = [1, 100];
    const { result } = renderHook(() => useStatItem(StatName.SPEED, customRange, mockCurrentFilter));

    expect(result.current.effectiveRange).toEqual(mockCurrentFilter);
    expect(result.current.isActive).toBe(false);
  });
});
