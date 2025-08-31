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

  logMetrics(label: string): void {
    const metrics = this.getMetrics();
    console.log(`🚀 ${label} Performance:`, {
      totalDuration: `${metrics.duration.toFixed(2)}ms`,
      requestCount: metrics.requestCount,
      averageRequestTime: `${metrics.averageRequestTime.toFixed(2)}ms`,
      requestsPerSecond: `${(metrics.requestCount / (metrics.duration / 1000)).toFixed(2)}/s`,
    });
  }
}

// Utility function to measure async operation performance
export async function measurePerformance<T>(label: string, operation: () => Promise<T>): Promise<T> {
  const monitor = new PerformanceMonitor();

  try {
    const result = await operation();
    monitor.logMetrics(label);
    return result;
  } catch (error) {
    console.error(`❌ ${label} failed:`, error);
    throw error;
  }
}
