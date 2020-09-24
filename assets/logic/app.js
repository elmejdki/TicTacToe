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
  const player1Symbols = document.getElementById('player1-symbols');
  const player1Submit = document.getElementById('player1-submit-btn');
  const player1Name = document.getElementById('player1-name');
  const player1NameWarning = document.querySelector('.second-page .name-warning');
  let player1Symbol;
  const player1SymbolWarning = document.querySelector('.second-page .symbol-warning');
  // TODO: need to be removed
  renderSymbols(player1Symbols);

  intiateButton.addEventListener('click', getPlayer1From);
  player1Submit.addEventListener('click', submitForm1);

  function getPlayer1From() {
    firstPage.classList.add('hide-up');
    secondPage.classList.add('show-right');

    // renderSymbols(player1Symbols);
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
      secondPage.classList.remove('show-right');
    }
  }

  function renderSymbols(parent) {
    let radioContainer;
    let input;
    let label;

    symbols.forEach((symbol, index) => {
      radioContainer = document.createElement('div');
      input = document.createElement('input');
      label = document.createElement('label');

      radioContainer.className = 'radio-input';
      input.id = `sym-${index}`;
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'symbols');
      input.setAttribute('value', symbol.value);
      label.setAttribute('for', `sym-${index}`);
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
