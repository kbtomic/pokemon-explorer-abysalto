import React from 'react';
import { render, screen } from '@/lib/test-utils';
import { Pagination } from '../Pagination';
import { SortDirection, SortField } from '@/lib/constants/enums';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: React.ComponentProps<'a'>) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('Pagination', () => {
  const baseUrl = '/explorer';
  const defaultFilters = { search: '' };
  const defaultSort = { field: SortField.ID, direction: SortDirection.ASC };

  it('should render pagination with navigation buttons', () => {
    render(<Pagination currentPage={5} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('should render page numbers', () => {
    render(<Pagination currentPage={5} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should build correct URLs for navigation', () => {
    render(<Pagination currentPage={5} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    const firstPageLink = screen.getByLabelText('Go to first page').closest('a');
    const previousPageLink = screen.getByLabelText('Go to previous page').closest('a');
    const nextPageLink = screen.getByLabelText('Go to next page').closest('a');
    const lastPageLink = screen.getByLabelText('Go to last page').closest('a');

    expect(firstPageLink).toHaveAttribute('href', '/explorer');
    expect(previousPageLink).toHaveAttribute('href', '/explorer?page=4');
    expect(nextPageLink).toHaveAttribute('href', '/explorer?page=6');
    expect(lastPageLink).toHaveAttribute('href', '/explorer?page=10');
  });

  it('should handle search parameters in URLs', () => {
    const filters = { search: 'pikachu' };
    const sort = { field: SortField.NAME, direction: SortDirection.ASC };

    render(<Pagination currentPage={5} totalPages={10} baseUrl={baseUrl} filters={filters} sort={sort} />);

    const nextPageLink = screen.getByLabelText('Go to next page').closest('a');
    expect(nextPageLink).toHaveAttribute('href', '/explorer?search=pikachu&sortField=name&page=6');
  });

  it('should disable previous buttons on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    const firstPageButton = screen.getByLabelText('Go to first page');
    const previousPageButton = screen.getByLabelText('Go to previous page');

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
  });

  it('should disable next buttons on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    const nextPageButton = screen.getByLabelText('Go to next page');
    const lastPageButton = screen.getByLabelText('Go to last page');

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it('should not render when total pages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render when total pages is 0', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should handle single page gracefully', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should be accessible with proper ARIA attributes', () => {
    render(<Pagination currentPage={3} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('should render proper styling classes', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        baseUrl={baseUrl}
        filters={defaultFilters}
        sort={defaultSort}
        className="custom-pagination"
      />
    );

    // The className is applied to the nav element
    const nav = screen.getByRole('navigation', { name: 'pagination' });
    expect(nav).toHaveClass('custom-pagination');
  });

  it('should handle edge case with very large page numbers', () => {
    render(<Pagination currentPage={1000} totalPages={10000} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('should build URLs without page parameter for first page', () => {
    render(<Pagination currentPage={1} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    const firstPageLink = screen.getByLabelText('Go to first page').closest('a');
    expect(firstPageLink).toHaveAttribute('href', '/explorer');
  });

  it('should preserve existing search parameters when navigating', () => {
    const filters = { search: 'pikachu' };
    const sort = { field: SortField.NAME, direction: SortDirection.DESC };

    render(<Pagination currentPage={5} totalPages={10} baseUrl={baseUrl} filters={filters} sort={sort} />);

    const nextPageLink = screen.getByLabelText('Go to next page').closest('a');
    expect(nextPageLink).toHaveAttribute('href', '/explorer?search=pikachu&sortField=name&sortDirection=desc&page=6');
  });

  it('should handle empty search parameters', () => {
    render(<Pagination currentPage={5} totalPages={10} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    const nextPageLink = screen.getByLabelText('Go to next page').closest('a');
    expect(nextPageLink).toHaveAttribute('href', '/explorer?page=6');
  });

  it('should render ellipsis for large page counts', () => {
    render(<Pagination currentPage={5} totalPages={20} baseUrl={baseUrl} filters={defaultFilters} sort={defaultSort} />);

    // Check for ellipsis in page numbers
    const pageNumbers = screen.getAllByRole('link').filter(link => link.textContent && /^\d+$/.test(link.textContent));

    // Should show a subset of pages with ellipsis
    expect(pageNumbers.length).toBeLessThan(20);
  });
});
