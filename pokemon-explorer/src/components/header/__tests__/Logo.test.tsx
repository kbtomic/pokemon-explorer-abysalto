import React from 'react';
import { render, screen } from '@/lib/test-utils';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('should render logo with image and text', () => {
    render(<Logo />);

    // Check for the logo image
    const logoImage = screen.getByAltText('Pokemon Explorer');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/favicon.svg');

    // Check for the logo text (hidden on mobile, visible on lg+ screens)
    const logoText = screen.getByText('Pokemon Explorer');
    expect(logoText).toBeInTheDocument();
  });

  it('should render as a link to homepage', () => {
    render(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should have proper styling classes', () => {
    render(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('flex', 'items-center', 'space-x-2');

    const logoText = screen.getByText('Pokemon Explorer');
    expect(logoText).toHaveClass('text-xl', 'sm:text-2xl', 'font-bold', 'text-red-600');
  });

  it('should have proper image attributes', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText('Pokemon Explorer');
    expect(logoImage).toHaveAttribute('width', '32');
    expect(logoImage).toHaveAttribute('height', '32');
    expect(logoImage).toHaveClass('w-8', 'h-8');
  });

  it('should be accessible', () => {
    render(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    const logoImage = screen.getByAltText('Pokemon Explorer');
    expect(logoImage).toBeInTheDocument();
  });
});
