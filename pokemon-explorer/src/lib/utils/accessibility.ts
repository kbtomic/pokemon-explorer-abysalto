// Accessibility utilities for WCAG compliance and better user experience

export const accessibilityUtils = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Create ARIA labels for interactive elements
  createAriaLabel: (action: string, target: string): string => {
    return `${action} ${target}`;
  },

  // Format stat values for screen readers
  formatStatForScreenReader: (statName: string, value: number): string => {
    const statLabels: Record<string, string> = {
      hp: 'Health Points',
      attack: 'Attack',
      defense: 'Defense',
      speed: 'Speed',
      'special-attack': 'Special Attack',
      'special-defense': 'Special Defense',
    };

    return `${statLabels[statName] || statName}: ${value}`;
  },

  // Create descriptive text for Pokemon cards
  createPokemonCardDescription: (pokemon: {
    name: string;
    types: Array<{ type: { name: string } }>;
    stats: Array<{ base_stat: number }>;
    id: number;
  }): string => {
    const types = pokemon.types.map(t => t.type.name).join(' and ');
    const totalStats = pokemon.stats.reduce((sum: number, stat) => sum + stat.base_stat, 0);

    return `${pokemon.name}, ${types} type Pokemon with ${totalStats} total base stats. Pokemon number ${pokemon.id}.`;
  },

  // Create focus management utilities
  focusManagement: {
    // Trap focus within a container
    trapFocus: (container: HTMLElement, event: KeyboardEvent): void => {
      const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },

    // Move focus to first focusable element
    focusFirstElement: (container: HTMLElement): void => {
      const firstFocusable = container.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;

      if (firstFocusable) {
        firstFocusable.focus();
      }
    },

    // Store and restore focus
    storeFocus: (): HTMLElement | null => {
      return document.activeElement as HTMLElement;
    },

    restoreFocus: (element: HTMLElement | null): void => {
      if (element && typeof element.focus === 'function') {
        element.focus();
      }
    },
  },

  // Color contrast utilities
  colorContrast: {
    // Check if color meets WCAG AA contrast requirements
    meetsWCAGAA: (foreground: string, background: string): boolean => {
      // Simplified contrast check - in production, use a proper color contrast library
      const getLuminance = (color: string): number => {
        // Convert hex to RGB and calculate luminance
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;

        const [rs, gs, bs] = [r, g, b].map(c => {
          if (c <= 0.03928) return c / 12.92;
          return Math.pow((c + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const l1 = getLuminance(foreground);
      const l2 = getLuminance(background);

      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return ratio >= 4.5; // WCAG AA requirement for normal text
    },
  },

  // Keyboard navigation utilities
  keyboardNavigation: {
    // Handle arrow key navigation in grids
    handleGridNavigation: (
      event: KeyboardEvent,
      currentIndex: number,
      totalItems: number,
      columns: number,
      onNavigate: (index: number) => void
    ): void => {
      let newIndex = currentIndex;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          newIndex = Math.max(0, currentIndex - columns);
          break;
        case 'ArrowDown':
          event.preventDefault();
          newIndex = Math.min(totalItems - 1, currentIndex + columns);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          newIndex = Math.min(totalItems - 1, currentIndex + 1);
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = totalItems - 1;
          break;
      }

      if (newIndex !== currentIndex) {
        onNavigate(newIndex);
      }
    },

    // Handle Enter and Space key activation
    handleActivation: (event: KeyboardEvent, onActivate: () => void): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onActivate();
      }
    },
  },

  // Screen reader announcements
  screenReader: {
    // Announce changes to screen readers
    announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', priority);
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;

      document.body.appendChild(announcement);

      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },

    // Create live regions for dynamic content
    createLiveRegion: (id: string, priority: 'polite' | 'assertive' = 'polite'): HTMLElement => {
      const region = document.createElement('div');
      region.id = id;
      region.setAttribute('aria-live', priority);
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      return region;
    },
  },
};

// Common ARIA attributes and roles
export const ariaAttributes = {
  // Common roles
  roles: {
    button: 'button',
    dialog: 'dialog',
    list: 'list',
    listitem: 'listitem',
    grid: 'grid',
    gridcell: 'gridcell',
    tab: 'tab',
    tabpanel: 'tabpanel',
    combobox: 'combobox',
    listbox: 'listbox',
    option: 'option',
  },

  // Common states
  states: {
    expanded: 'aria-expanded',
    selected: 'aria-selected',
    checked: 'aria-checked',
    pressed: 'aria-pressed',
    hidden: 'aria-hidden',
    disabled: 'aria-disabled',
    required: 'aria-required',
    invalid: 'aria-invalid',
  },

  // Common properties
  properties: {
    label: 'aria-label',
    describedby: 'aria-describedby',
    controls: 'aria-controls',
    owns: 'aria-owns',
    current: 'aria-current',
    level: 'aria-level',
    posinset: 'aria-posinset',
    setsize: 'aria-setsize',
  },
};

// WCAG compliance helpers
export const wcagHelpers = {
  // Ensure sufficient color contrast
  ensureContrast: (foreground: string, background: string, fallback: string): string => {
    return accessibilityUtils.colorContrast.meetsWCAGAA(foreground, background) ? foreground : fallback;
  },

  // Validate focus indicators
  hasVisibleFocus: (element: HTMLElement): boolean => {
    const style = window.getComputedStyle(element);
    const outline = style.outline;
    const boxShadow = style.boxShadow;

    return outline !== 'none' || boxShadow !== 'none';
  },

  // Check for proper heading structure
  validateHeadingStructure: (container: HTMLElement): boolean => {
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;

    for (const heading of headings) {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > previousLevel + 1) {
        return false; // Skip levels
      }
      previousLevel = level;
    }

    return true;
  },
};
