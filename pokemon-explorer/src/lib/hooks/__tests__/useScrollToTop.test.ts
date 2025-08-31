import { renderHook, act } from '@testing-library/react';
import { useScrollToTop } from '../ui/useScrollToTop';

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('useScrollToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return scrollToTop function', () => {
    const { result } = renderHook(() => useScrollToTop());

    expect(typeof result.current.scrollToTop).toBe('function');
  });

  it('should call window.scrollTo when scrollToTop is called', () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.scrollToTop();
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should call window.scrollTo multiple times', () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.scrollToTop();
      result.current.scrollToTop();
      result.current.scrollToTop();
    });

    expect(mockScrollTo).toHaveBeenCalledTimes(3);
  });

  it('should use smooth scrolling behavior', () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.scrollToTop();
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should scroll to top (0, 0) coordinates', () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.scrollToTop();
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should work in browser environment', () => {
    // Ensure we're in a browser-like environment
    expect(typeof window).toBe('object');
    expect(typeof window.scrollTo).toBe('function');

    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.scrollToTop();
    });

    expect(mockScrollTo).toHaveBeenCalled();
  });
});
