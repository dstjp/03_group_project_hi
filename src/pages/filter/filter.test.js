import { createFilterUI } from './filter';

describe('createFilterUI', () => {
  let containerElement;
  let products;
  let onFilterChange;

  beforeEach(() => {
    document.body.innerHTML = '<div id="filter-container"></div>';
    containerElement = document.getElementById('filter-container');
    products = [
      { id: 1, category: 'electronics', price: 100 },
      { id: 2, category: 'jewelery', price: 200 },
      { id: 3, category: "men's clothing", price: 50 },
      { id: 4, category: "women's clothing", price: 150 },
    ];
    onFilterChange = jest.fn();
  });

  test('should create filter buttons for each category', () => {
    createFilterUI(products, containerElement, onFilterChange);

    const buttons = containerElement.querySelectorAll('.filter-button');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent).toBe('Electronics');
    expect(buttons[1].textContent).toBe('Jewelery');
    expect(buttons[2].textContent).toBe("Men's clothing");
    expect(buttons[3].textContent).toBe("Women's clothing");
  });

  test('should create a sort dropdown', () => {
    createFilterUI(products, containerElement, onFilterChange);

    const sortSelect = containerElement.querySelector('#sort-select');
    expect(sortSelect).not.toBeNull();
    expect(sortSelect.options.length).toBe(3);
    expect(sortSelect.options[0].value).toBe('default');
    expect(sortSelect.options[1].value).toBe('price-asc');
    expect(sortSelect.options[2].value).toBe('price-desc');
  });


  test('should update filter state on button click', () => {
    createFilterUI(products, containerElement, onFilterChange);

    const button = containerElement.querySelector('.filter-button');
    button.click();

    expect(button.classList.contains('active')).toBe(true);
    expect(onFilterChange).toHaveBeenCalled();
  });

  test('should update filter state on sort change', () => {
    createFilterUI(products, containerElement, onFilterChange);

    const sortSelect = containerElement.querySelector('#sort-select');
    sortSelect.value = 'price-asc';
    sortSelect.dispatchEvent(new Event('change'));

    expect(onFilterChange).toHaveBeenCalled();
  });

});