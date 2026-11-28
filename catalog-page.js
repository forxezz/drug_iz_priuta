// === 1. Массив данных ===
const catalog = [
    { 
        position: 1, 
        name: "Барсик", 
        specs: "Кот · 2 года", 
        description: "Любит спокойное общение и мягкую лежанку",
        image: "p/images(3).jfif" 
    },
    { 
        position: 2, 
        name: "Луна", 
        specs: "Кошка · 1 год", 
        description: "Любопытная и внимательная к игрушкам",
        image: "p/images(4).jfif" 
    },
    { 
        position: 3, 
        name: "Рыжик", 
        specs: "Пёс · 3 года", 
        description: "Рад прогулкам и подвижным играм",
        image: "p/images(5).jfif" 
    }
];

// === 2. Функция фильтрации ===
function filterByText(items, query) {
    const normalized = query.trim().toLowerCase();
    if (normalized === "") return items;
    return items.filter(item => item.name.toLowerCase().includes(normalized));
}

// === 3. Работа с DOM ===
const catalogList = document.querySelector("#catalog-list");
const statusText = document.querySelector("#status");
const searchInput = document.querySelector("#search");

// Функция отрисовки карточек
function renderCatalog(items) {
    catalogList.replaceChildren(); 

    for (const item of items) {
        const card = document.createElement("article");
        card.className = "card";

        const title = document.createElement("h2");
        title.className = "card-name"; 
        title.textContent = item.name;

        const imageContainer = document.createElement("div");
        imageContainer.className = "card-image";
        
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        
        imageContainer.append(img); 

        const specs = document.createElement("p");
        specs.className = "card-badge"; 
        specs.textContent = item.specs;

        const description = document.createElement("p");
        description.className = "card-desc"; 
        description.textContent = item.description;

        card.append(title, imageContainer, specs, description);
        catalogList.append(card);
    }

    if (items.length === 0) {
        statusText.textContent = "Ничего не найдено";
    } else {
        statusText.textContent = "Показано: " + items.length + " из " + catalog.length;
    }
}

// === 4. Сохранение и восстановление поиска ===

// Восстанавливаем запрос при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedQuery = localStorage.getItem('catalogSearchQuery');
    if (savedQuery) {
        searchInput.value = savedQuery;
        const found = filterByText(catalog, savedQuery);
        renderCatalog(found);
    } else {
        renderCatalog(catalog); // Если запроса нет, показываем всё
    }
});

// Обработчик ввода в поиск
searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    
    // Сохраняем или удаляем запрос
    if (query.trim() === "") {
        localStorage.removeItem('catalogSearchQuery');
    } else {
        localStorage.setItem('catalogSearchQuery', query);
    }
    
    // Фильтруем и перерисовываем
    const found = filterByText(catalog, query);
    renderCatalog(found);
});
