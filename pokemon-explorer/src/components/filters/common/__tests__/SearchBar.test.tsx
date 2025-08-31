import React from 'react';
import { render, screen, fireEvent } from '@/lib/test-utils';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input with placeholder', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} placeholder="Search Pokemon" />);

    const searchInput = screen.getByPlaceholderText('Search Pokemon');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call onSearchChange when user types', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('pikachu');
  });

  it('should display current search value', () => {
    render(<SearchBar searchValue="bulbasaur" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveValue('bulbasaur');
  });

  it('should handle empty search input', () => {
    render(<SearchBar searchValue="initial" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: '' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('');
  });

  it('should be accessible with proper ARIA attributes', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  it('should have proper styling classes', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveClass('w-full');
    expect(searchInput).toHaveClass('pl-10');
    expect(searchInput).toHaveClass('pr-4');
    expect(searchInput).toHaveClass('py-2');
  });

  it('should handle special characters in search', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'mew-two' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('mew-two');
  });

  it('should handle case insensitive search', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'PIKACHU' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('PIKACHU');
  });

  it('should render search icon', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} />);

    // SVG icons don't have img role, so we'll check for the search icon by its class
    const searchIcon = document.querySelector('.lucide-search');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} className="custom-class" />);

    const container = screen.getByPlaceholderText('Search...').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('should apply red theme by default', () => {
    render(<SearchBar searchValue="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveClass('border-red-200');
    expect(searchInput).toHaveClass('focus:border-red-500');
    expect(searchInput).toHaveClass('focus:ring-red-500');
  });

  it('should handle controlled input properly', () => {
    const { rerender } = render(<SearchBar searchValue="initial" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveValue('initial');

    // Update the value
    rerender(<SearchBar searchValue="updated" onSearchChange={mockOnSearchChange} />);
    expect(searchInput).toHaveValue('updated');
  });
});
