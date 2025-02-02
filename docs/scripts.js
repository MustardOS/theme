document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterCategory = this.getAttribute('data-filter');

            // Reset theme colors based on the category
            if (filterCategory === 'all') {
                document.documentElement.style.setProperty('--primary-color', '#c7af26');
            } else if (filterCategory === 'RG28XX') {
                document.documentElement.style.setProperty('--primary-color', '#ba5a31');
            } else if (filterCategory === 'RG34XX') {
                document.documentElement.style.setProperty('--primary-color', '#7cafc4');
            } else if (filterCategory === 'RG35XX') {
                document.documentElement.style.setProperty('--primary-color', '#243e36');    
            } else if (filterCategory === 'RG40XX') {
                document.documentElement.style.setProperty('--primary-color', '#9e778f');
            } else if (filterCategory === 'RGCUBEXX') {
                document.documentElement.style.setProperty('--primary-color', '#870058');
            } else if (filterCategory === 'TrimUIBrick') {
                document.documentElement.style.setProperty('--primary-color', '#F25F5C');
            } else if (filterCategory === 'TrimUISmartPro') {
                document.documentElement.style.setProperty('--primary-color', '#243e36');        
            } else if (filterCategory === 'Legacy') {
                document.documentElement.style.setProperty('--primary-color', '#c7af26');        
            } else {
                document.documentElement.style.setProperty('--primary-color', '#c7af26'); // Default color
            }

            // Show or hide portfolio items based on the selected filter
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' '); // Get the categories as an array
                if (filterCategory === 'all' || categories.includes(filterCategory)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
