const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;
    let mode = 'player';

    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    document.querySelectorAll('input[name="mode"]').forEach(radio => {
      radio.addEventListener('change', () => {
        mode = radio.value;
        resetGame();
      });
    });

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (board[index] === '' && gameActive) {
          makeMove(index, currentPlayer);
          if (mode === 'computer' && currentPlayer === 'O' && gameActive) {
            setTimeout(computerMove, 400);
          }
        }
      });
    });

    function makeMove(index, player) {
      board[index] = player;
      cells[index].textContent = player;
      cells[index].style.cursor = 'default';
      if (checkWin(player)) {
        statusText.innerHTML = ` Player ${player} wins! `;
        gameActive = false;
      } else if (board.every(cell => cell !== '')) {
        statusText.innerHTML = ` It's a draw! `;
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerHTML = ` Player ${currentPlayer}'s turn `;
      }
    }

    function checkWin(player) {
      return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
      );
    }

    function computerMove() {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          makeMove(i, 'O');
          break;
        }
      }
    }

    function resetGame() {
      for (let i = 0; i < board.length; i++) {
        board[i] = '';
        cells[i].textContent = '';
        cells[i].style.cursor = 'pointer';
      }
      currentPlayer = 'X';
      gameActive = true;
      statusText.innerHTML = ` Player ${currentPlayer}'s turn `;
    }