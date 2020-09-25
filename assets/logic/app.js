const gameBorad = (function () {
  const board = [];
  const player1 = { score: 0 };
  const player2 = { score: 0 };

  function setPlayersInfo(p1, p2) {
    player1.name = p1.getName();
    player1.symbol = p1.getSymbol();

    player2.name = p2.getName();
    player2.symbol = p2.getSymbol();

    displayController.renderPlayersInfo(player1, player2);
    const boardContainer = displayController.renderBoard(board);
    activateBoard(boardContainer);
  }

  function activateBoard(boardDOM) {
    const squares = boardDOM.querySelectorAll('span');
    console.log(squares);
  }

  return { setPlayersInfo };
}());

const displayController = (function () {
  const symbols = [
    { value: '⭐', selected: false },
    { value: '✌', selected: false },
    { value: '♚', selected: false },
    { value: '♛', selected: false },
    { value: '♞', selected: false },
    { value: '♈', selected: false },
    { value: '♓', selected: false },
    { value: '❤️️', selected: false },
    { value: '💔', selected: false },
    { value: '✘', selected: false },
    { value: '❌', selected: false },
    { value: '💯', selected: false },
    { value: 'ツ', selected: false },
    { value: '♂', selected: false },
    { value: '♀', selected: false },
    { value: '⌛', selected: false },
    { value: '⌚', selected: false },
    { value: '〇', selected: false },
    { value: '☢', selected: false },
    { value: '⚫', selected: false },
    { value: '⚔️', selected: false },
    { value: '📌', selected: false },
  ];

  let player1;
  let player2;

  const intiateButton = document.getElementById('game-initiator');
  const firstPage = document.querySelector('.first-page');
  const secondPage = document.querySelector('.second-page');
  const thirdPage = document.querySelector('.third-page');
  const finalPage = document.querySelector('.final-page');

  const player1Symbols = document.getElementById('player1-symbols');
  const player2Symbols = document.getElementById('player2-symbols');

  const player1Submit = document.getElementById('player1-submit-btn');
  const player2Submit = document.getElementById('player2-submit-btn');

  const player1Name = document.getElementById('player1-name');
  const player1NameWarning = document.querySelector('.second-page .name-warning');
  const player2NameWarning = document.querySelector('.third-page .name-warning');
  const player2Name = document.getElementById('player2-name');
  let player1Symbol;
  let player2Symbol;
  const player1SymbolWarning = document.querySelector('.second-page .symbol-warning');
  const player2SymbolWarning = document.querySelector('.third-page .symbol-warning');

  const p1NameHolder = document.querySelector('#player1-info .name');
  const p2NameHolder = document.querySelector('#player2-info .name');
  const p1SymbolHolder = document.querySelector('#player1-info .symbol');
  const p2SymbolHolder = document.querySelector('#player2-info .symbol');
  const p1Score = document.querySelector('#player1-info .score span');
  const p2Score = document.querySelector('#player2-info .score span');

  const boardHolder = document.querySelector('#board-container .board');

  intiateButton.addEventListener('click', getPlayer1Form);
  player1Submit.addEventListener('click', submitForm1);
  player2Submit.addEventListener('click', submitForm2);

  function getPlayer1Form() {
    firstPage.classList.add('hide-up');
    secondPage.classList.add('show-right');

    renderSymbols(player1Symbols, 1);
  }

  function submitForm1(event) {
    event.preventDefault();

    player1Symbol = document.querySelector(
      ".second-page form input[type='radio']:checked",
    );

    if (player1Name.value === '') {
      player1NameWarning.classList.add('active');
      setTimeout(() => { player1NameWarning.classList.remove('active'); }, 4000);
    }

    if (player1Symbol === null) {
      player1SymbolWarning.classList.add('active');
      setTimeout(() => { player1SymbolWarning.classList.remove('active'); }, 4000);
    }

    if (!!player1Name.value && !!player1Symbol) {
      player1 = playerFactory(player1Name.value, player1Symbol.value);
      symbols[Number(player1Symbol.getAttribute('data-id'))].selected = true;
      secondPage.classList.remove('show-right');
      setTimeout(() => {
        thirdPage.classList.add('show-right');
        renderSymbols(player2Symbols, 2);
      }, 500);
    }
  }

  function submitForm2(event) {
    event.preventDefault();

    player2Symbol = document.querySelector(
      ".third-page form input[type='radio']:checked",
    );

    if (player2Name.value === '') {
      player2NameWarning.classList.add('active');
      setTimeout(() => { player2NameWarning.classList.remove('active'); }, 4000);
    }

    if (player2Symbol === null) {
      player2SymbolWarning.classList.add('active');
      setTimeout(() => { player2SymbolWarning.classList.remove('active'); }, 4000);
    }

    if (!!player2Name.value && !!player2Symbol) {
      player2 = playerFactory(player2Name.value, player2Symbol.value);
      symbols[Number(player2Symbol.getAttribute('data-id'))].selected = true;
      thirdPage.classList.remove('show-right');

      gameBorad.setPlayersInfo(player1, player2);

      setTimeout(() => {
        finalPage.classList.add('show-up');
      }, 500);
    }
  }

  function renderSymbols(parent, name) {
    let radioContainer;
    let input;
    let label;

    symbols.forEach((symbol, index) => {
      radioContainer = document.createElement('div');
      input = document.createElement('input');
      label = document.createElement('label');

      radioContainer.className = 'radio-input';
      input.id = `sym-${name}-${index}`;
      input.setAttribute('data-id', index);
      input.setAttribute('type', 'radio');
      input.setAttribute('name', `symbols-${name}`);
      input.setAttribute('value', symbol.value);
      if (symbol.selected) {
        input.setAttribute('disabled', true);
        label.classList.add('disabled');
      }
      label.setAttribute('for', `sym-${name}-${index}`);
      label.textContent = symbol.value;
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      parent.appendChild(radioContainer);
    });
  }

  function renderBoard(board) {
    boardHolder.innerHTML = `<span data-index="0">${board[0] ? board[0] : ''}</span>
      <span data-index="1" class="middle-y">${board[1] ? board[1] : ''}</span>
      <span data-index="2">${board[2] ? board[2] : ''}</span>
      <span data-index="3" class="middle-x">${board[3] ? board[3] : ''}</span>
      <span data-index="4" class="middle-y middle-x">${board[4] ? board[4] : ''}</span>
      <span data-index="5" class="middle-x">${board[5] ? board[5] : ''}</span>
      <span data-index="6">${board[6] ? board[6] : ''}</span>
      <span data-index="7" class="middle-y">${board[7] ? board[7] : ''}</span>
      <span data-index="8">${board[8] ? board[8] : ''}</span>`;

    return boardHolder;
  }

  function renderPlayersInfo(p1, p2) {
    p1NameHolder.textContent = p1.name;
    p1SymbolHolder.textContent = p1.symbol;
    p1Score.textContent = p1.score;

    p2NameHolder.textContent = p2.name;
    p2SymbolHolder.textContent = p2.symbol;
    p2Score.textContent = p2.score;
  }

  return { renderBoard, renderPlayersInfo };
}());

const playerFactory = function (name, symbol) {
  const getName = function () {
    return name;
  };

  const getSymbol = function () {
    return symbol;
  };

  return { getName, getSymbol };
};
