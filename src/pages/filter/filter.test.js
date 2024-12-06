import { createFilterUI } from './filter';

describe('createFilterUI', () => {
  let containerElement;
  let onFilterChange;

  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = '<div id="filter-container"></div>';
    containerElement = document.getElementById('filter-container');
    onFilterChange = jest.fn();
  });

  test('should create filter buttons for each category', () => {
    const products = [
      { id: 1, category: 'electronics' },
      { id: 2, category: 'jewelery' },
      { id: 3, category: "men's clothing" },
      { id: 4, category: "women's clothing" },
    ];

    createFilterUI(products, containerElement, onFilterChange);

    const buttons = containerElement.querySelectorAll('.filter-button');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent).toBe('Electronics');
    expect(buttons[1].textContent).toBe('Jewelery');
    expect(buttons[2].textContent).toBe("Men's clothing");
    expect(buttons[3].textContent).toBe("Women's clothing");
  });

  test('should call onFilterChange with the correct category when a button is clicked', () => {
    const products = [
      { id: 1, category: 'electronics' },
      { id: 2, category: 'jewelery' },
    ];

    createFilterUI(products, containerElement, onFilterChange);

    const buttons = containerElement.querySelectorAll('.filter-button');
    buttons[0].click();
    buttons[1].click();

    expect(onFilterChange).toHaveBeenCalledTimes(2);
    expect(onFilterChange).toHaveBeenNthCalledWith(1, 'electronics');
    expect(onFilterChange).toHaveBeenNthCalledWith(2, 'jewelery');
  });
});