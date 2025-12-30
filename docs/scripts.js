document.querySelectorAll('.portfolio-item').forEach(item => {
    const img = item.querySelector('img');
    if (!img.dataset.images) return;
    const base = img.dataset.imageBase || '';
    const images = img.dataset.images.split(',');
    let index = 0;
  
    item.querySelector('.prev').addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        img.src = base + images[index];
    });
  
    item.querySelector('.next').addEventListener('click', () => {
        index = (index + 1) % images.length;
        img.src = base + images[index];
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // UI elements
    const deviceFilterMenu = document.getElementById('device-filter');
    const versionFilterMenu = document.getElementById('version-filter');
    const hdmiFilterCheckbox = document.getElementById('hdmi-filter');
    const gridFilterCheckbox = document.getElementById('grid-filter');
    const languageFilterCheckbox = document.getElementById('language-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioItemsContainer = document.querySelector('.portfolio');
    const randomiseButton = document.getElementById('randomiser');
    const searchFilterInput = document.getElementById('search-filter');

    // Updates the UI to reflect the URL query params
    function updateUI() {
        // Get filters from query params
        const versionFilter = getQueryParm(queryParams.version) ?? 'Goose';
        const deviceFilter = getQueryParm(queryParams.device) ?? 'all';
        const isHdmiFilterEnabled = getQueryParm(queryParams.hdmi) === 'true';
        const isGridFilterEnabled = getQueryParm(queryParams.grid) === 'true';
        const isLanguageFilterEnabled = getQueryParm(queryParams.language) === 'true';
        const searchFilter = getQueryParm(queryParams.search) ?? '';
        const groupIdQuery = getQueryParm(queryParams.groupid) ?? '';

        // Update filter UI
        versionFilterMenu.value = versionFilter;
        deviceFilterMenu.value = deviceFilter;
        hdmiFilterCheckbox.checked = isHdmiFilterEnabled;
        gridFilterCheckbox.checked = isGridFilterEnabled;
        languageFilterCheckbox.checked = isLanguageFilterEnabled;
        searchFilterInput.value = searchFilter;

        // Update page color scheme
        const color = primaryColors[deviceFilter];
        document.documentElement.style.setProperty('--primary-color', color);

        // Show or hide portfolio items
        portfolioItems.forEach(item => {
            // E.g. "RG35XX RG40XX HDMI Grid"
            const version = item.getAttribute('data-version');
            const categories = item.getAttribute('data-category').split(' ');
            const groupid = item.getAttribute('data-groupid') ?? '';
            const itemText = item.textContent;
            
            const isMatchingVersionFilter = versionFilter === version;
            const isMatchingDeviceFilter = deviceFilter === 'all' || categories.includes(deviceFilter);
            const isMatchingHdmiFilter = !isHdmiFilterEnabled || categories.includes('HDMI');
            const isMatchingGridFilter = !isGridFilterEnabled || categories.includes('Grid');
            const isMatchingLanguageFilter = !isLanguageFilterEnabled || categories.includes('Language');
            const isMatchingSearchFilter = searchFilter.length === 0 || itemText.toLowerCase().includes(searchFilter.toLowerCase());
            const isMatchingGroupIDFilter = groupIdQuery === groupid || (groupIdQuery === '' && groupid === '');
            
            const isMatchingAllFilters =
                isMatchingVersionFilter &&
                isMatchingDeviceFilter &&
                isMatchingHdmiFilter &&
                isMatchingGridFilter &&
                isMatchingLanguageFilter &&
                isMatchingSearchFilter &&
                isMatchingGroupIDFilter;
            
            // Only show items that match all filters
            item.style.display = isMatchingAllFilters ? 'block' : 'none';
        });
    }

    // Update URL & UI when user interactions occur
    versionFilterMenu.addEventListener('change', function() {
        setQueryParam(queryParams.version, this.value);
        updateUI();
    });
    deviceFilterMenu.addEventListener('change', function() {
        setQueryParam(queryParams.device, this.value);
        updateUI();
    });
    hdmiFilterCheckbox.addEventListener('change', function() {
        setQueryParam(queryParams.hdmi, this.checked);
        updateUI();
    });
    gridFilterCheckbox.addEventListener('change', function() {
        setQueryParam(queryParams.grid, this.checked);
        updateUI();
    });
    languageFilterCheckbox.addEventListener('change', function() {
        setQueryParam(queryParams.language, this.checked);
        updateUI();
    });
    randomiseButton.addEventListener('click', function() {
        const items = Array.from(portfolioItemsContainer.children);
        const shuffledItems = items.sort(() => Math.random() - 0.5);
        portfolioItemsContainer.innerHTML = '';
        shuffledItems.forEach(item => portfolioItemsContainer.appendChild(item));
    });
    searchFilterInput.addEventListener('input', function() {
        setQueryParam(queryParams.search, this.value);
        updateUI();
    });

    // Update UI on initial page load
    updateUI();
});

const getQueryParm = (key) =>
    new URLSearchParams(window.location.search).get(key);

const setQueryParam = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
        params.set(key, value);
    } else {
        params.delete(key);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
}

const queryParams = {
    version: 'version',
    device: 'device',
    hdmi: 'hdmi',
    grid: 'grid',
    language: 'language',
    search: 'search',
    groupid: 'groupid'
}

const primaryColors = {
    all: '#c7af26',
    RG28XX: '#ba5a31',
    RG34XX: '#7cafc4',
    RG35XX: '#243e36',
    RG40XX: '#9e778f',
    RGCUBEXX: '#870058',
    TrimUIBrick: '#F25F5C',
    TrimUISmartPro: '#243e36',
};
