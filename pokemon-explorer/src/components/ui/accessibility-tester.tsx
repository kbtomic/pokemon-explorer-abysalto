'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { wcagHelpers } from '@/lib/utils/accessibility';

interface AccessibilityTest {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  details: string;
}

export function AccessibilityTester() {
  const [tests, setTests] = useState<AccessibilityTest[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const runAccessibilityTests = () => {
    const newTests: AccessibilityTest[] = [];

    // Test 1: Check for proper heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingStructureValid = wcagHelpers.validateHeadingStructure(document.body);

    newTests.push({
      id: 'heading-structure',
      name: 'Heading Structure',
      description: 'Check for proper heading hierarchy',
      status: headingStructureValid ? 'pass' : 'fail',
      details: headingStructureValid
        ? `Found ${headings.length} headings with proper hierarchy`
        : 'Heading levels are skipped or improperly nested',
    });

    // Test 2: Check for focus indicators
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    let focusIndicatorsCount = 0;

    focusableElements.forEach(element => {
      if (wcagHelpers.hasVisibleFocus(element as HTMLElement)) {
        focusIndicatorsCount++;
      }
    });

    const focusIndicatorStatus =
      focusIndicatorsCount === focusableElements.length
        ? 'pass'
        : focusIndicatorsCount > focusableElements.length * 0.8
          ? 'warning'
          : 'fail';

    newTests.push({
      id: 'focus-indicators',
      name: 'Focus Indicators',
      description: 'Check for visible focus indicators',
      status: focusIndicatorStatus,
      details: `${focusIndicatorsCount} of ${focusableElements.length} focusable elements have visible focus indicators`,
    });

    // Test 3: Check for alt text on images
    const images = document.querySelectorAll('img');
    let imagesWithAlt = 0;

    images.forEach(img => {
      if (img.alt && img.alt.trim() !== '') {
        imagesWithAlt++;
      }
    });

    const altTextStatus = imagesWithAlt === images.length ? 'pass' : imagesWithAlt > images.length * 0.9 ? 'warning' : 'fail';

    newTests.push({
      id: 'alt-text',
      name: 'Image Alt Text',
      description: 'Check for alternative text on images',
      status: altTextStatus,
      details: `${imagesWithAlt} of ${images.length} images have alternative text`,
    });

    // Test 4: Check for ARIA labels
    const elementsWithAriaLabel = document.querySelectorAll('[aria-label], [aria-labelledby]');
    const ariaLabelStatus = elementsWithAriaLabel.length > 0 ? 'pass' : 'info';

    newTests.push({
      id: 'aria-labels',
      name: 'ARIA Labels',
      description: 'Check for ARIA labels on interactive elements',
      status: ariaLabelStatus,
      details: `Found ${elementsWithAriaLabel.length} elements with ARIA labels`,
    });

    // Test 5: Check for semantic HTML
    const semanticElements = document.querySelectorAll('nav, main, section, article, aside, header, footer');
    const semanticStatus = semanticElements.length > 0 ? 'pass' : 'warning';

    newTests.push({
      id: 'semantic-html',
      name: 'Semantic HTML',
      description: 'Check for semantic HTML elements',
      status: semanticStatus,
      details: `Found ${semanticElements.length} semantic HTML elements`,
    });

    // Test 6: Check for keyboard navigation
    const interactiveElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const keyboardStatus = interactiveElements.length > 0 ? 'pass' : 'warning';

    newTests.push({
      id: 'keyboard-navigation',
      name: 'Keyboard Navigation',
      description: 'Check for keyboard accessible elements',
      status: keyboardStatus,
      details: `Found ${interactiveElements.length} keyboard accessible elements`,
    });

    setTests(newTests);
  };

  useEffect(() => {
    if (isVisible) {
      runAccessibilityTests();
    }
  }, [isVisible]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
      case 'fail':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const passCount = tests.filter(t => t.status === 'pass').length;
  const totalTests = tests.length;

  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)} className="fixed bottom-4 left-4 z-50" variant="outline" size="sm">
        {isVisible ? 'Hide' : 'Show'} Accessibility Tests
      </Button>

      {isVisible && (
        <Card className="fixed bottom-16 left-4 w-96 max-h-96 overflow-y-auto z-50 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Info className="h-4 w-4" />
              <span>Accessibility Tests</span>
              {totalTests > 0 && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {passCount}/{totalTests} Pass
                </span>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {tests.length === 0 ? (
              <div className="text-center py-4 text-gray-500">Click &quot;Run Tests&quot; to check accessibility</div>
            ) : (
              tests.map(test => (
                <div key={test.id} className={`p-3 rounded-lg border ${getStatusColor(test.status)}`}>
                  <div className="flex items-start space-x-2">
                    {getStatusIcon(test.status)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{test.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{test.description}</div>
                      <div className="text-xs mt-2">{test.details}</div>
                    </div>
                  </div>
                </div>
              ))
            )}

            <Button onClick={runAccessibilityTests} className="w-full mt-4" size="sm">
              Run Tests
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
