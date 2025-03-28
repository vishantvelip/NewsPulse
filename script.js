const mybody =document.body;
mybody.style.backgroundColor ="red";

const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            result.textContent = `${currentPlayer} wins!`;
            disableCells();
            return;
        }
    }

    if (Array.from(cells).every(cell => cell.textContent)) {
        result.textContent = "It's a draw!";
    }
}

function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function disableCells() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    result.textContent = '';
    currentPlayer = 'X';
    enableCells();
}

function enableCells() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);