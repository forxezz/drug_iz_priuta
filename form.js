// === 1. Функция калькулятора ===
function getResult(quantityText, unitAmount, extraAmount) {
    if (quantityText.trim() === "") return "Ошибка: укажите количество";
    const quantity = Number(quantityText);
    if (isNaN(quantity) || !isFinite(quantity)) return "Ошибка: введите число";
    if (quantity <= 0 || !Number.isInteger(quantity)) return "Ошибка: нужно положительное целое количество";
    return "Итого: " + (quantity * unitAmount + extraAmount);
}

// === 2. Константы для расчёта ===
const unitValue = 2;
const extraValue = 3;

// === 3. Работа с формой ===
const form = document.querySelector("form");
const result = document.querySelector("#result");
const quantityInput = document.querySelector("#quantity");

// Очищаем результат при любом изменении полей
form.addEventListener("input", function () { 
    result.textContent = ""; 
});

// Перехватываем отправку формы
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const quantityText = quantityInput.value;
    const select = document.querySelector("#item");
    const itemName = select.options[select.selectedIndex].text;

    // ПРОВЕРКА: если количество не целое или меньше 1, показываем ошибку
    // и очищаем результат (на случай, если браузер пропустил отправку)
    const quantity = Number(quantityText);
    if (quantityText.trim() === "" || isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
        result.textContent = itemName + ". Ошибка: нужно положительное целое количество";
        return;
    }

    // Если всё хорошо — считаем итог
    const message = getResult(quantityText, unitValue, extraValue);
    result.textContent = itemName + ". " + message;
});
