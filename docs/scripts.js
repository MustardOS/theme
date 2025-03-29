document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Primary colors corresponding to each filter category
    const filterColors = {
        'all': '#c7af26',
        'RG28XX': '#ba5a31',
        'RG34XX': '#7cafc4',
        'RG35XX': '#243e36',
        'RG40XX': '#9e778f',
        'RGCUBEXX': '#870058',
        'TrimUIBrick': '#F25F5C',
        'TrimUISmartPro': '#243e36',
        'Legacy': '#c7af26'
    };

    // Updates the UI to reflect the filter category set in the URL
    function updateUI() {
        // Get filter category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const filterCategory = urlParams.get('filter') ?? 'all';

        // Reset theme colors
        const color = filterColors[filterCategory];
        document.documentElement.style.setProperty('--primary-color', color);

        // Show or hide portfolio items
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' '); // Get the categories as an array
            const parentItem = item.closest('a'); // Find the parent <a> element
            const isVisible = filterCategory === 'all' || categories.includes(filterCategory);
            parentItem.style.display = isVisible ? 'block' : 'none';
        });

        // Update filter button styles
        filterButtons.forEach(button => {
            const buttonFilter = button.getAttribute('data-filter');
            button.classList.toggle('applied', buttonFilter === filterCategory);
        });
    }

    // Update URL + UI when button is clicked
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = new URL(window.location);
            url.searchParams.set("filter", this.getAttribute('data-filter'));
            window.history.replaceState(null, '', url);
            updateUI();
        });
    });
    
    // Update UI on initial page load
    updateUI();
});
