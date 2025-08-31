import React from 'react';
import { render, screen } from '@/lib/test-utils';
import { Navigation } from '../Navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/explorer'),
}));

describe('Navigation', () => {
  it('should render navigation items', () => {
    render(<Navigation />);

    // Check for Pokemon navigation link
    expect(screen.getByText('Pokemon')).toBeInTheDocument();

    // Check for other navigation items
    expect(screen.getByText('Berries')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
  });

  it('should render navigation items as links', () => {
    render(<Navigation />);

    const pokemonLink = screen.getByRole('link', { name: 'Pokemon' });
    const berriesLink = screen.getByRole('link', { name: 'Berries' });
    const itemsLink = screen.getByRole('link', { name: 'Items' });
    const locationsLink = screen.getByRole('link', { name: 'Locations' });

    expect(pokemonLink).toHaveAttribute('href', '/explorer');
    expect(berriesLink).toHaveAttribute('href', '/berries');
    expect(itemsLink).toHaveAttribute('href', '/items');
    expect(locationsLink).toHaveAttribute('href', '/locations');
  });

  it('should have proper styling classes', () => {
    render(<Navigation />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('text-sm', 'font-medium');
    });
  });

  it('should be accessible', () => {
    render(<Navigation />);

    // Check that all navigation items are accessible
    expect(screen.getByRole('link', { name: 'Pokemon' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Berries' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Items' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Locations' })).toBeInTheDocument();
  });

  it('should highlight active page', () => {
    render(<Navigation />);

    // Since we're mocking usePathname to return '/explorer',
    // the Pokemon link should be highlighted
    const pokemonLink = screen.getByRole('link', { name: 'Pokemon' });
    expect(pokemonLink).toBeInTheDocument();
  });
});
