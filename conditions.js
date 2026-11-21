// === Исходные данные для Варианта 22 ===
const itemName = "Барсик";        // Имя питомца
const quantityText = "2";         // Количество посетителей (строка из поля)
const unitValue = 2;              // Игрушек для занятия одного посетителя
const extraValue = 3;             // Игрушек общего резерва
const isTraining = true;          // Учебный признак

// === Самостоятельно собранная функция ===
function getResult(quantityText, unitAmount, extraAmount) {
    // 1. Проверка на пустую строку или одни пробелы
    if (quantityText.trim() === "") {
        return "Ошибка: укажите количество";
    }

    // 2. Преобразование строки в число
    const quantity = Number(quantityText);

    // 3. Проверка: не число или бесконечность
    if (isNaN(quantity) || !isFinite(quantity)) {
        return "Ошибка: введите число";
    }

    // 4. Проверка: должно быть положительным и целым
    if (quantity <= 0 || !Number.isInteger(quantity)) {
        return "Ошибка: нужно положительное целое количество";
    }

    // 5. Вычисление итога
    const totalAmount = quantity * unitAmount + extraAmount;

    // 6. Возврат сообщения
    return "Итого: " + totalAmount;
}

// === Сохраненные испытания (11 штук) ===
console.log("--- ИСПЫТАНИЯ ИЗ ТАБЛИЦЫ ---");
console.log('Мой вариант ("2"):', getResult("2", unitValue, extraValue));
console.log('Одна единица ("1"):', getResult("1", unitValue, extraValue));
console.log('Три единицы ("3"):', getResult("3", unitValue, extraValue));
console.log('Пустое поле (""):', getResult("", unitValue, extraValue));
console.log('Только пробелы (" "):', getResult(" ", unitValue, extraValue));
console.log('Слово ("два"):', getResult("два", unitValue, extraValue));
console.log('Бесконечность ("Infinity"):', getResult("Infinity", unitValue, extraValue));
console.log('Ноль ("0"):', getResult("0", unitValue, extraValue));
console.log('Отрицательное ("-1"):', getResult("-1", unitValue, extraValue));
console.log('Дробное ("1.5"):', getResult("1.5", unitValue, extraValue));
console.log('Пробелы вокруг числа (" 2 "):', getResult(" 2 ", unitValue, extraValue));

// === Два дополнительных испытания (12 и 13) ===
// Меняем ТОЛЬКО один аргумент, исходные константы (quantityText="2") не трогаем!
console.log("--- ДОПОЛНИТЕЛЬНЫЕ ИСПЫТАНИЯ ---");
console.log('Величина на единицу больше на 10 (12, 3):', getResult("2", 12, 3)); // Должно быть Итого: 27
console.log('Общая добавка больше на 10 (2, 13):', getResult("2", 2, 13));   // Должно быть Итого: 17