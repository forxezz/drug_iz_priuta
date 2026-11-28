// === 4. Сохранение и восстановление поиска ===

// При загрузке страницы проверяем, есть ли сохраненный запрос
window.addEventListener('DOMContentLoaded', () => {
    const savedQuery = localStorage.getItem('catalogSearchQuery');
    if (savedQuery) {
        searchInput.value = savedQuery;
        const found = filterByText(catalog, savedQuery);
        renderCatalog(found);
    }
});

// При вводе текста сохраняем запрос и фильтруем
searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    
    // Сохраняем в localStorage
    if (query.trim() === "") {
        localStorage.removeItem('catalogSearchQuery'); // Если пусто - удаляем
    } else {
        localStorage.setItem('catalogSearchQuery', query); // Иначе - сохраняем
    }
    
    // Фильтруем и перерисовываем
    const found = filterByText(catalog, query);
    renderCatalog(found);
});
