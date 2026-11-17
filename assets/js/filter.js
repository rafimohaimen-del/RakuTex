/**
 * Raku Tex BD - Filter & Search Controller
 * Handles Product Category filtering and Sustainability standards matrix
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductFilter();
  initSustainabilityFilter();
});

function initProductFilter() {
  const filterPills = document.querySelectorAll('.product-filter-btn');
  const searchInput = document.getElementById('product-search-input');
  const productCards = document.querySelectorAll('.product-grid-item');
  const countDisplay = document.getElementById('product-count-display');

  if (!productCards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function filterProducts() {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const category = card.getAttribute('data-category') || '';
      const keywords = (card.getAttribute('data-keywords') || '') + ' ' + (card.querySelector('.product-card-title')?.textContent || '');
      
      const matchesCategory = (activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase());
      const matchesSearch = !searchQuery || keywords.toLowerCase().includes(searchQuery.toLowerCase());

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} of ${productCards.length} categories`;
    }
  }

  filterPills.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      filterProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      filterProducts();
    });
  }
}

function initSustainabilityFilter() {
  const filterTabs = document.querySelectorAll('.cert-filter-tab');
  const certCards = document.querySelectorAll('.cert-card-item');

  if (!certCards.length || !filterTabs.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-group') || 'all';

      certCards.forEach((card) => {
        const group = card.getAttribute('data-group') || '';
        if (filterVal === 'all' || group.toLowerCase() === filterVal.toLowerCase()) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
