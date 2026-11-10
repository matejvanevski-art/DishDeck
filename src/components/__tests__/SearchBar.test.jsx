import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('submits the trimmed search query', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    await user.type(screen.getByRole('searchbox', { name: 'Search recipes' }), '  pasta  ');
    await user.click(screen.getByRole('button', { name: 'Search recipes' }));

    expect(onSearch).toHaveBeenCalledWith('pasta');
  });

  it('does not submit an empty query', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    await user.click(screen.getByRole('button', { name: 'Search recipes' }));

    expect(onSearch).not.toHaveBeenCalled();
  });
});
