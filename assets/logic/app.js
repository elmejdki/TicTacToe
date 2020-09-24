const gameBorad = (function () {
  const board = [];
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
  // TODO: need to be removed
  // TODO: use settimeout to remove this item from the dom.
  // player1Symbols.remove();
  // renderSymbols(player2Symbols, 2);

  intiateButton.addEventListener('click', getPlayer1From);
  player1Submit.addEventListener('click', submitForm1);
  player2Submit.addEventListener('click', submitForm2);

  function getPlayer1From() {
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
      }, 2000);
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
      setTimeout(() => {
        // finalPage.classList.add('show-up');
      }, 2000);
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

  function renderBoard() {
    console.log(board);
  }

  renderBoard();
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
