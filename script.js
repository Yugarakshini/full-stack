const gridContainer = document.getElementById('grid-container');
const grid = [
    ['C', 'R', 'W', 'W', 'U', 'T', 'E', 'C', 'I', 'T', 'A', 'P', 'I', 'R', 'A'],
    ['O', 'I', 'T', 'E', 'R', 'M', 'A', 'L', 'I', 'T', 'D', 'M', 'A', 'N', 'B'],
    ['W', 'I', 'E', 'P', 'T', 'E', 'M', 'A', 'L', 'E', 'A', 'R', 'E', 'D', 'C'],
    ['T', 'R', 'R', 'E', 'M', 'E', 'A', 'S', 'I', 'G', 'N', 'R', 'M', 'E', 'F'],
    ['A', 'A', 'R', 'T', 'T', 'L', 'H', 'D', 'A', 'P', 'G', 'D', 'A', 'K', 'G'],
    ['N', 'K', 'E', 'I', 'Y', 'I', 'W', 'U', 'E', 'R', 'S', 'R', 'K', 'N', 'H'],
    ['R', 'R', 'F', 'C', 'R', 'A', 'F', 'C', 'E', 'G', 'M', 'I', 'L', 'I', 'J'],
    ['K', 'E', 'A', 'A', 'A', 'G', 'R', 'R', 'A', 'O', 'N', 'L', 'L', 'K', 'M'],
    ['H', 'E', 'N', 'N', 'T', 'T', 'M', 'G', 'T', 'N', 'R', 'L', 'I', 'S', 'N'],
    ['A', 'M', 'A', 'E', 'L', 'F', 'F', 'U', 'N', 'C', 'M', 'R', 'T', 'O', 'P'],
    ['A', 'L', 'E', 'W', 'G', 'A', 'D', 'I', 'A', 'I', 'R', 'K', 'N', 'N', 'Q'],
    ['I', 'C', 'D', 'T', 'W', 'M', 'T', 'E', 'S', 'N', 'T', 'E', 'A', 'L', 'R'],
    ['A', 'G', 'O', 'H', 'E', 'G', 'D', 'E', 'H', 'E', 'S', 'N', 'H', 'T', 'S'],
    ['I', 'T', 'O', 'H', 'E', 'R', 'O', 'H', 'G', 'T', 'P', 'N', 'R', 'E', 'U']
];

const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]
];

function createGrid() {
    gridContainer.innerHTML = '';
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-item';
            cell.textContent = grid[row][col];
            gridContainer.appendChild(cell);
        }
    }
}

function isValid(x, y) {
    return x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;
}

function searchWord(word, x, y, dx, dy) {
    let posX = x;
    let posY = y;
    for (let i = 0; i < word.length; i++) {
        if (!isValid(posX, posY) || grid[posX][posY] !== word[i]) {
            return false;
        }
        posX += dx;
        posY += dy;
    }
    return true;
}
const colors = ['yellow', 'red', 'blue']; // Add more colors as needed

function highlightWord(word, x, y, dx, dy, color) {
    let posX = x;
    let posY = y;
    for (let i = 0; i < word.length; i++) {
        gridContainer.children[posX * grid[0].length + posY].classList.add(`highlight-${color}`);
        posX += dx;
        posY += dy;
    }
}

function findWord(word, color) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === word[0]) {
                for (const [dx, dy] of directions) {
                    if (searchWord(word, row, col, dx, dy)) {
                        highlightWord(word, row, col, dx, dy, color);
                        return;
                    }
                }
            }
        }
    }
}

function solve() {
    const wordList = document.getElementById('word-list').value.split(',').map(word => word.trim());
    let colorIndex = 0;
    for (const word of wordList) {
        findWord(word, colors[colorIndex % colors.length]);
        colorIndex++;
    }
}

function clearGrid() {
    document.getElementById('word-list').value = '';
    createGrid();
}

createGrid();
