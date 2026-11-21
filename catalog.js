// === 1. Функция калькулятора (из пары 20) ===
function getResult(quantityText, unitAmount, extraAmount) {
    if (quantityText.trim() === "") return "Ошибка: укажите количество";
    const quantity = Number(quantityText);
    if (isNaN(quantity) || !isFinite(quantity)) return "Ошибка: введите число";
    if (quantity <= 0 || !Number.isInteger(quantity)) return "Ошибка: нужно положительное целое количество";
    return "Итого: " + (quantity * unitAmount + extraAmount);
}

// === 2. Массив карточек (из пары 21) ===
const catalog = [
    { position: 1, name: "Барсик", specs: "Кот · 2 года", description: "Любит спокойное общение и мягкую лежанку" },
    { position: 2, name: "Рыжик", specs: "Пёс · 3 года", description: "Рад прогулкам и подвижным играм" },
    { position: 3, name: "Луна", specs: "Кошка · 1 год", description: "Любопытная и внимательная к игрушкам" }
];

// === 3. Работа с DOM (страницей) ===
const status = document.querySelector("#status");
const namesList = document.querySelector("#names");
const showButton = document.querySelector("#show-names");

// Выводим число записей при загрузке страницы
status.textContent = "Записей в каталоге: " + catalog.length;

// Функция для создания списка имен
function renderNames() {
    namesList.replaceChildren();
    for (const item of catalog) {
        const line = document.createElement("li");
        line.textContent = item.name;
        namesList.append(line);
    }
}

// Вешаем событие клика на кнопку
showButton.addEventListener("click", renderNames);

// === 4. Смена заголовка страницы ===
const mainHeading = document.querySelector("#main-heading");
mainHeading.textContent = "Наши пушистые друзья"; 