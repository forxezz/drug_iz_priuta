// === 1. Функция калькулятора (из пары 20) ===
function getResult(quantityText, unitAmount, extraAmount) {
    if (quantityText.trim() === "") return "Ошибка: укажите количество";
    const quantity = Number(quantityText);
    if (isNaN(quantity) || !isFinite(quantity)) return "Ошибка: введите число";
    if (quantity <= 0 || !Number.isInteger(quantity)) return "Ошибка: нужно положительное целое количество";
    return "Итого: " + (quantity * unitAmount + extraAmount);
}

// === 2. Константы для расчёта (из пары 20) ===
const unitValue = 2;
const extraValue = 3;

// === 3. Работа с формой ===
const form = document.querySelector("form");
const result = document.querySelector("#result"); // Наш абзац для вывода

// Перехватываем отправку формы
form.addEventListener("submit", function (event) {
    // Отменяем перезагрузку страницы
    event.preventDefault();

    // 1. Читаем количество посетителей (это всегда строка)
    const quantityText = document.querySelector("#quantity").value;

    // 2. Получаем название выбранного питомца
    const select = document.querySelector("#item");
    const itemName = select.options[select.selectedIndex].text;

    // 3. Считаем итог через нашу функцию
    const message = getResult(quantityText, unitValue, extraValue);

    // 4. Выводим сообщение на страницу (название + результат)
    result.textContent = itemName + ". " + message;
});