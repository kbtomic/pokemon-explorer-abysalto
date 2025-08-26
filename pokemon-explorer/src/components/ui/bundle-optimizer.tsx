'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Package, Clock, TrendingUp } from 'lucide-react';

interface BundleOptimizerProps {
  isVirtualized: boolean;
  itemCount: number;
  originalRenderCount: number;
  virtualizedRenderCount: number;
}

export function BundleOptimizer({ isVirtualized, itemCount, originalRenderCount, virtualizedRenderCount }: BundleOptimizerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderCount = isVirtualized ? virtualizedRenderCount : originalRenderCount;
  const performanceGain = originalRenderCount - virtualizedRenderCount;
  const performancePercentage = Math.round((performanceGain / originalRenderCount) * 100);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
          <Zap className="h-5 w-5" />
          <span>Performance Optimization</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <Package className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{itemCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
          </div>

          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{renderCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Rendered</div>
          </div>
        </div>

        {isVirtualized && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">Performance Mode Active</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              {performanceGain} fewer items rendered ({performancePercentage}% improvement)
            </p>
          </div>
        )}

        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="w-full">
          {isExpanded ? 'Hide' : 'Show'} Details
        </Button>

        {isExpanded && (
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong>Virtualization:</strong> Only renders visible items and a small buffer
            </div>
            <div>
              <strong>Memory Usage:</strong> Reduced from {originalRenderCount} to {virtualizedRenderCount} DOM nodes
            </div>
            <div>
              <strong>Scroll Performance:</strong> Smooth scrolling even with thousands of items
            </div>
            <div>
              <strong>Responsive:</strong> Automatically adjusts based on screen size and device type
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
