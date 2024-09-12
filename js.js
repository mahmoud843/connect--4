const board = document.getElementById('board');
    const message = document.getElementById('message');
    const rows = 6;
    const cols = 7;
    let currentPlayer = 'X';
    const gameBoard = Array.from({ length: rows }, () => Array(cols).fill(''));

    function createBoard() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.column = c;
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        const column = event.target.dataset.column;
        for (let r = rows - 1; r >= 0; r--) {
            if (!gameBoard[r][column]) {
                gameBoard[r][column] = currentPlayer;
                event.target.parentNode.children[r * cols + column].classList.add(currentPlayer);
                if (checkWin(r, column)) {
                    message.textContent = 'Player$ {currentPlayer}wins!';
                    board.removeEventListener('click', handleCellClick);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
                break;
            }
        }
    }

    function checkWin(row, col) {
        return (
            checkDirection(row, col, 1, 0) || // horizontal
            checkDirection(row, col, 0, 1) || // vertical
            checkDirection(row, col, 1, 1) || // diagonal \
            checkDirection(row, col, 1, -1)   // diagonal /
        );
    }

    function checkDirection(row, col, rowIncrement, colIncrement) {
        let count = 1;

        for (let i = 1; i < 4; i++) {
            const newRow = row + i * rowIncrement;
            const newCol = col + i * colIncrement;
            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || gameBoard[newRow][newCol] !== currentPlayer) {
                break;
            }
            count++;
        }

        for (let i = 1; i < 4; i++) {
            const newRow = row - i * rowIncrement;
            const newCol = col - i * colIncrement;
            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || gameBoard[newRow][newCol] !== currentPlayer) {
                break;
            }
            count++;
        }

        return count >= 4;
    }

    createBoard();