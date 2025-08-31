// ============================================================================
// PERFORMANCE MONITORING UTILITIES
// ============================================================================

export interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  requestCount: number;
  averageRequestTime: number;
}

export class PerformanceMonitor {
  private startTime: number;
  private requestCount: number = 0;
  private requestTimes: number[] = [];

  constructor() {
    this.startTime = performance.now();
  }

  recordRequest(duration: number): void {
    this.requestCount++;
    this.requestTimes.push(duration);
  }

  getMetrics(): PerformanceMetrics {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    const averageRequestTime =
      this.requestTimes.length > 0 ? this.requestTimes.reduce((sum, time) => sum + time, 0) / this.requestTimes.length : 0;

    return {
      startTime: this.startTime,
      endTime,
      duration,
      requestCount: this.requestCount,
      averageRequestTime,
    };
  }
}

// Utility function to measure async operation performance
export async function measurePerformance<T>(operation: () => Promise<T>): Promise<T> {
  try {
    const result = await operation();
    return result;
  } catch (error) {
    throw error;
  }
}
