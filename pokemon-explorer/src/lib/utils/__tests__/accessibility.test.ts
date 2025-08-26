import { accessibilityUtils, ariaAttributes, wcagHelpers } from '../accessibility';
import { mockPokemon } from '@/lib/test-utils';

describe('Accessibility Utilities', () => {
  describe('generateId', () => {
    it('should generate unique IDs with prefix', () => {
      const id1 = accessibilityUtils.generateId('test');
      const id2 = accessibilityUtils.generateId('test');

      expect(id1).toMatch(/^test-/);
      expect(id2).toMatch(/^test-/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('createAriaLabel', () => {
    it('should create proper ARIA labels', () => {
      const label = accessibilityUtils.createAriaLabel('View details for', 'bulbasaur');
      expect(label).toBe('View details for bulbasaur');
    });
  });

  describe('formatStatForScreenReader', () => {
    it('should format stat names correctly', () => {
      expect(accessibilityUtils.formatStatForScreenReader('hp', 45)).toBe('Health Points: 45');
      expect(accessibilityUtils.formatStatForScreenReader('attack', 49)).toBe('Attack: 49');
      expect(accessibilityUtils.formatStatForScreenReader('defense', 49)).toBe('Defense: 49');
      expect(accessibilityUtils.formatStatForScreenReader('speed', 45)).toBe('Speed: 45');
      expect(accessibilityUtils.formatStatForScreenReader('special-attack', 65)).toBe('Special Attack: 65');
      expect(accessibilityUtils.formatStatForScreenReader('special-defense', 65)).toBe('Special Defense: 65');
    });

    it('should handle unknown stat names', () => {
      expect(accessibilityUtils.formatStatForScreenReader('unknown-stat', 100)).toBe('unknown-stat: 100');
    });
  });

  describe('createPokemonCardDescription', () => {
    it('should create descriptive text for Pokemon cards', () => {
      const description = accessibilityUtils.createPokemonCardDescription(mockPokemon);
      expect(description).toContain('bulbasaur');
      expect(description).toContain('grass and poison type');
      expect(description).toContain('318 total base stats');
      expect(description).toContain('Pokemon number 1');
    });
  });

  describe('focusManagement', () => {
    let container: HTMLElement;
    let button1: HTMLButtonElement;
    let button2: HTMLButtonElement;
    let button3: HTMLButtonElement;

    beforeEach(() => {
      container = document.createElement('div');
      button1 = document.createElement('button');
      button2 = document.createElement('button');
      button3 = document.createElement('button');

      button1.textContent = 'Button 1';
      button2.textContent = 'Button 2';
      button3.textContent = 'Button 3';

      container.appendChild(button1);
      container.appendChild(button2);
      container.appendChild(button3);
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    describe('focusFirstElement', () => {
      it('should focus the first focusable element', () => {
        const focusSpy = jest.spyOn(button1, 'focus');
        accessibilityUtils.focusManagement.focusFirstElement(container);
        expect(focusSpy).toHaveBeenCalled();
      });
    });

    describe('storeFocus and restoreFocus', () => {
      it('should store and restore focus', () => {
        button1.focus();
        const storedFocus = accessibilityUtils.focusManagement.storeFocus();
        expect(storedFocus).toBe(button1);

        button2.focus();
        const focusSpy = jest.spyOn(button1, 'focus');
        accessibilityUtils.focusManagement.restoreFocus(storedFocus);
        expect(focusSpy).toHaveBeenCalled();
      });
    });
  });

  describe('colorContrast', () => {
    describe('meetsWCAGAA', () => {
      it('should return true for high contrast colors', () => {
        expect(accessibilityUtils.colorContrast.meetsWCAGAA('#000000', '#FFFFFF')).toBe(true);
        expect(accessibilityUtils.colorContrast.meetsWCAGAA('#FFFFFF', '#000000')).toBe(true);
      });

      it('should return false for low contrast colors', () => {
        expect(accessibilityUtils.colorContrast.meetsWCAGAA('#CCCCCC', '#FFFFFF')).toBe(false);
        expect(accessibilityUtils.colorContrast.meetsWCAGAA('#999999', '#CCCCCC')).toBe(false);
      });
    });
  });

  describe('keyboardNavigation', () => {
    describe('handleGridNavigation', () => {
      it('should handle arrow key navigation', () => {
        const onNavigate = jest.fn();
        const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

        accessibilityUtils.keyboardNavigation.handleGridNavigation(event, 0, 10, 3, onNavigate);

        expect(onNavigate).toHaveBeenCalledWith(1);
      });

      it('should handle boundary conditions', () => {
        const onNavigate = jest.fn();
        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

        accessibilityUtils.keyboardNavigation.handleGridNavigation(event, 0, 10, 3, onNavigate);

        // Should not call onNavigate when already at boundary
        expect(onNavigate).not.toHaveBeenCalled();
      });

      it('should handle Home and End keys', () => {
        const onNavigate = jest.fn();
        const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
        const endEvent = new KeyboardEvent('keydown', { key: 'End' });

        accessibilityUtils.keyboardNavigation.handleGridNavigation(homeEvent, 5, 10, 3, onNavigate);
        expect(onNavigate).toHaveBeenCalledWith(0);

        onNavigate.mockClear();

        accessibilityUtils.keyboardNavigation.handleGridNavigation(endEvent, 5, 10, 3, onNavigate);
        expect(onNavigate).toHaveBeenCalledWith(9);
      });
    });

    describe('handleActivation', () => {
      it('should handle Enter key activation', () => {
        const onActivate = jest.fn();
        const event = new KeyboardEvent('keydown', { key: 'Enter' });

        accessibilityUtils.keyboardNavigation.handleActivation(event, onActivate);

        expect(onActivate).toHaveBeenCalled();
      });

      it('should handle Space key activation', () => {
        const onActivate = jest.fn();
        const event = new KeyboardEvent('keydown', { key: ' ' });

        accessibilityUtils.keyboardNavigation.handleActivation(event, onActivate);

        expect(onActivate).toHaveBeenCalled();
      });

      it('should not handle other keys', () => {
        const onActivate = jest.fn();
        const event = new KeyboardEvent('keydown', { key: 'Tab' });

        accessibilityUtils.keyboardNavigation.handleActivation(event, onActivate);

        expect(event.defaultPrevented).toBe(false);
        expect(onActivate).not.toHaveBeenCalled();
      });
    });
  });

  describe('screenReader', () => {
    describe('announce', () => {
      it('should create and remove announcement element', () => {
        const originalBodyChildren = document.body.children.length;

        accessibilityUtils.screenReader.announce('Test announcement');

        expect(document.body.children.length).toBe(originalBodyChildren + 1);

        // Wait for the timeout to complete
        return new Promise(resolve => {
          setTimeout(() => {
            expect(document.body.children.length).toBe(originalBodyChildren);
            resolve(undefined);
          }, 1100);
        });
      });
    });

    describe('createLiveRegion', () => {
      it('should create live region with correct attributes', () => {
        const region = accessibilityUtils.screenReader.createLiveRegion('test-region', 'assertive');

        expect(region.id).toBe('test-region');
        expect(region.getAttribute('aria-live')).toBe('assertive');
        expect(region.getAttribute('aria-atomic')).toBe('true');
        expect(region.className).toBe('sr-only');
      });
    });
  });

  describe('ariaAttributes', () => {
    it('should have correct role definitions', () => {
      expect(ariaAttributes.roles.button).toBe('button');
      expect(ariaAttributes.roles.dialog).toBe('dialog');
      expect(ariaAttributes.roles.grid).toBe('grid');
      expect(ariaAttributes.roles.list).toBe('list');
    });

    it('should have correct state definitions', () => {
      expect(ariaAttributes.states.expanded).toBe('aria-expanded');
      expect(ariaAttributes.states.selected).toBe('aria-selected');
      expect(ariaAttributes.states.checked).toBe('aria-checked');
      expect(ariaAttributes.states.hidden).toBe('aria-hidden');
    });

    it('should have correct property definitions', () => {
      expect(ariaAttributes.properties.label).toBe('aria-label');
      expect(ariaAttributes.properties.describedby).toBe('aria-describedby');
      expect(ariaAttributes.properties.controls).toBe('aria-controls');
      expect(ariaAttributes.properties.owns).toBe('aria-owns');
    });
  });

  describe('wcagHelpers', () => {
    describe('ensureContrast', () => {
      it('should return foreground color when contrast is sufficient', () => {
        const result = wcagHelpers.ensureContrast('#000000', '#FFFFFF', '#FF0000');
        expect(result).toBe('#000000');
      });

      it('should return fallback color when contrast is insufficient', () => {
        const result = wcagHelpers.ensureContrast('#CCCCCC', '#FFFFFF', '#000000');
        expect(result).toBe('#000000');
      });
    });

    describe('hasVisibleFocus', () => {
      it('should detect visible focus indicators', () => {
        const element = document.createElement('button');
        element.style.outline = '2px solid blue';

        expect(wcagHelpers.hasVisibleFocus(element)).toBe(true);
      });

      it('should detect box-shadow focus indicators', () => {
        const element = document.createElement('button');
        element.style.boxShadow = '0 0 0 2px blue';

        expect(wcagHelpers.hasVisibleFocus(element)).toBe(true);
      });

      it('should return false for elements without focus indicators', () => {
        const element = document.createElement('button');
        element.style.outline = 'none';
        element.style.boxShadow = 'none';

        expect(wcagHelpers.hasVisibleFocus(element)).toBe(false);
      });
    });

    describe('validateHeadingStructure', () => {
      it('should validate proper heading hierarchy', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <h1>Title</h1>
          <h2>Subtitle</h2>
          <h3>Section</h3>
          <h2>Another Subtitle</h2>
          <h3>Another Section</h3>
        `;

        expect(wcagHelpers.validateHeadingStructure(container)).toBe(true);
      });

      it('should detect skipped heading levels', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <h1>Title</h1>
          <h3>Section</h3>
        `;

        expect(wcagHelpers.validateHeadingStructure(container)).toBe(false);
      });

      it('should handle empty container', () => {
        const container = document.createElement('div');
        expect(wcagHelpers.validateHeadingStructure(container)).toBe(true);
      });
    });
  });
});
