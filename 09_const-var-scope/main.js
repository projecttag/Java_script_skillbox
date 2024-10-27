let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0; // отслеживаем количество найденных пар
const totalPairs = 8; // общее количество пар

// Этап 1. Создайте функцию, генерирующую массив парных чисел.
function createNumbersArray(count) {
    let numbers = [];
    for (let i = 1; i <= count; i++) {
        numbers.push(i, i); // создаём пары
    }
    return numbers;
}

// Этап 2. Создайте функцию перемешивания массива.
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // меняем местами элементы
    }
    return arr;
}

// Этап 3. Функция для начала игры.
function startGame(count) {
    matchedPairs = 0; // сбрасываем количество найденных пар
    document.getElementById('restart-btn').style.display = 'none'; // скрываем кнопку
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // очищаем игровое поле
    let numbersArray = shuffle(createNumbersArray(count)); // создаём и перемешиваем массив чисел

    numbersArray.forEach(number => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.setAttribute('data-number', number);
        card.addEventListener('click', handleCardClick);
        board.appendChild(card);
    });
}

// Обработка кликов по карточкам
function handleCardClick(event) {
    const clickedCard = event.target;

    if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains('matched')) return;

    clickedCard.classList.remove('hidden');
    clickedCard.textContent = clickedCard.getAttribute('data-number');

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        lockBoard = true;

        if (firstCard.getAttribute('data-number') === secondCard.getAttribute('data-number')) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++; // увеличиваем количество найденных пар
            checkForWin(); // проверяем, победил ли игрок
            resetSelection();
        } else {
            setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                firstCard.textContent = '';
                secondCard.textContent = '';
                resetSelection();
            }, 1000);
        }
    }
}

function resetSelection() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Проверка, все ли пары найдены
function checkForWin() {
    if (matchedPairs === totalPairs) {
        document.getElementById('restart-btn').style.display = 'block'; // показываем кнопку после победы
    }
}

// Инициализация игры при загрузке страницы
window.onload = function() {
    startGame(8); // Начать игру с 8 парами (поле 4x4)
};
