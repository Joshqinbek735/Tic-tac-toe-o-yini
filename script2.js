/* Bu faylning nomi endi sayt_logikam.js */
/* Content (ichidagi kod) oldingi script.js bilan bir xil bo'ladi */

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', '']; // 9 ta bo'sh katakni ifodalaydi

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Xabar funksiyalari
    const messagePlayerTurn = () => `Navbat: ${currentPlayer}`;
    const messagePlayerWon = () => `G'alaba: ${currentPlayer}!`;
    const messageDraw = () => `O'yin durang bilan tugadi!`;

    // Boshlang'ich holatni sozlash
    statusDisplay.innerHTML = messagePlayerTurn();

    // Katakni bosish funksiyasi
    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        // Agar o'yin faol bo'lmasa yoki katak band bo'lsa, hech narsa qilmaymiz
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Katakni yangilash va o'yin holatini saqlash
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase()); // Rang berish uchun sinf qo'shish

        handleResultValidation();
    };

    // Natijani tekshirish funksiyasi
    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue; // Agar biron katak bo'sh bo'lsa, bu shartni o'tkazib yuboramiz
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = messagePlayerWon();
            gameActive = false;
            disableCells(); // O'yin tugaganda boshqa kataklarni bosishni o'chirish
            return;
        }

        // Durangni tekshirish (agar bo'sh katak qolmasa)
        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.innerHTML = messageDraw();
            gameActive = false;
            disableCells();
            return;
        }

        // Navbatni almashtirish
        changePlayer();
    };

    // O'yinchi navbatini almashtirish
    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = messagePlayerTurn();
    };

    // Kataklarni o'chirish (bosilmaydigan qilish)
    const disableCells = () => {
        cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    };

    // O'yinni qayta boshlash funksiyasi
    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerHTML = messagePlayerTurn();

        cells.forEach(cell => {
            cell.innerHTML = ''; // Katak ichidagi X/O ni tozalash
            cell.classList.remove('x', 'o', 'disabled'); // Klasslarni olib tashlash
        });
    };

    // Hodisa tinglovchilari
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});