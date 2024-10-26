let firstCard = null;
let secondCard = null;
let lockBoard = false;

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

// Инициализация игры при загрузке страницы
window.onload = function() {
    startGame(8); // Начать игру с 8 парами (поле 4x4)
};
