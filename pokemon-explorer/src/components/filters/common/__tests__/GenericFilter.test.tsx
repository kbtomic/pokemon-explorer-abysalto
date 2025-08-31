import React from 'react';
import { render, screen, fireEvent } from '@/lib/test-utils';
import { GenericFilter } from '../GenericFilter';
import { FilterItem } from '@/types/filters';

describe('GenericFilter', () => {
  const mockItems: FilterItem[] = [
    { id: '1', name: 'Fire' },
    { id: '2', name: 'Water' },
    { id: '3', name: 'Grass' },
  ];

  const mockOnToggle = jest.fn();
  const mockOnClearAll = jest.fn();
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter button with title', () => {
    render(<GenericFilter title="Types" items={mockItems} selectedItems={[]} onToggle={mockOnToggle} onClearAll={mockOnClearAll} />);

    expect(screen.getByText('Types')).toBeInTheDocument();
  });

  it('should show selected count when items are selected', () => {
    render(
      <GenericFilter title="Types" items={mockItems} selectedItems={['1', '2']} onToggle={mockOnToggle} onClearAll={mockOnClearAll} />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should open dropdown when button is clicked', () => {
    render(<GenericFilter title="Types" items={mockItems} selectedItems={[]} onToggle={mockOnToggle} onClearAll={mockOnClearAll} />);

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    // After clicking, the dropdown should be open and show items
    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.getByText('Grass')).toBeInTheDocument();
  });

  it('should call onToggle when item is clicked', async () => {
    render(<GenericFilter title="Types" items={mockItems} selectedItems={[]} onToggle={mockOnToggle} onClearAll={mockOnClearAll} />);

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    const fireItem = screen.getByText('Fire');
    fireEvent.click(fireItem);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should call onClearAll when clear all is clicked', () => {
    render(
      <GenericFilter title="Types" items={mockItems} selectedItems={['1', '2']} onToggle={mockOnToggle} onClearAll={mockOnClearAll} />
    );

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    const clearButton = screen.getByText(/clear all/i);
    fireEvent.click(clearButton);

    expect(mockOnClearAll).toHaveBeenCalled();
  });

  it('should show search input when search props are provided', () => {
    render(
      <GenericFilter
        title="Types"
        items={mockItems}
        selectedItems={[]}
        onToggle={mockOnToggle}
        onClearAll={mockOnClearAll}
        searchTerm=""
        onSearchChange={mockOnSearchChange}
      />
    );

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText('Search types...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call onSearchChange when search input changes', () => {
    render(
      <GenericFilter
        title="Types"
        items={mockItems}
        selectedItems={[]}
        onToggle={mockOnToggle}
        onClearAll={mockOnClearAll}
        searchTerm=""
        onSearchChange={mockOnSearchChange}
      />
    );

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText('Search types...');
    fireEvent.change(searchInput, { target: { value: 'fire' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('fire');
  });

  it('should show loading state when isLoading is true', () => {
    render(
      <GenericFilter
        title="Types"
        items={mockItems}
        selectedItems={[]}
        onToggle={mockOnToggle}
        onClearAll={mockOnClearAll}
        isLoading={true}
      />
    );

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should show error state when error is provided', () => {
    const error = new Error('Failed to load types');
    render(
      <GenericFilter title="Types" items={mockItems} selectedItems={[]} onToggle={mockOnToggle} onClearAll={mockOnClearAll} error={error} />
    );

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    const errorElements = screen.getAllByText('Failed to load types');
    expect(errorElements.length).toBeGreaterThan(0);
  });

  it('should handle empty items list', () => {
    render(<GenericFilter title="Types" items={[]} selectedItems={[]} onToggle={mockOnToggle} onClearAll={mockOnClearAll} />);

    const button = screen.getByRole('button', { name: /types/i });
    fireEvent.click(button);

    // When there are no items, the grid container should be present but empty
    const gridContainer = screen.getByText('Types').closest('div')?.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <GenericFilter
        title="Types"
        items={mockItems}
        selectedItems={[]}
        onToggle={mockOnToggle}
        onClearAll={mockOnClearAll}
        className="custom-filter"
      />
    );

    const container = screen.getByRole('button', { name: /types/i }).closest('div');
    expect(container).toHaveClass('custom-filter');
  });

  it('should be accessible with proper ARIA attributes', () => {
    render(<GenericFilter title="Types" items={mockItems} selectedItems={[]} onToggle={mockOnToggle} onClearAll={mockOnClearAll} />);

    const button = screen.getByRole('button', { name: /types/i });
    expect(button).toBeInTheDocument();
  });
});
